import { Request, Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../middleware/auth.middleware';
import { generateOrderNumber, calculateDiscount, calculateTax } from '../utils/helpers';
import { sendEmail, emailTemplates } from '../utils/email.util';
import { sendSms, smsTemplates } from '../utils/sms.util';
import logger from '../config/logger';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
    }

    const { items, deliveryAddressId, deliveryType = 'DELIVERY', couponCode, notes } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'EMPTY_CART',
          message: 'Cart is empty',
        },
      });
    }

    // Get product details and calculate subtotal
    let subtotal = 0;
    const orderItems = await Promise.all(
      items.map(async (item: any) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const price = product.price;
        const totalPrice = price * item.quantity;
        subtotal += totalPrice;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price,
          totalPrice,
          notes: item.notes,
        };
      })
    );

    // Apply coupon if provided
    let discount = 0;
    let coupon = null;

    if (couponCode) {
      coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (coupon && coupon.isActive && new Date() >= coupon.validFrom && new Date() <= coupon.validTill) {
        if (subtotal >= coupon.minOrderValue) {
          discount = calculateDiscount(subtotal, coupon.discountType, coupon.discountValue);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        }
      }
    }

    // Calculate tax and total
    const tax = calculateTax(subtotal - discount);
    const deliveryFee = deliveryType === 'DELIVERY' ? 50 : 0;
    const total = subtotal - discount + tax + deliveryFee;

    // Create order
    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: req.user.id,
        items: {
          create: orderItems,
        },
        deliveryAddressId: deliveryType === 'DELIVERY' ? deliveryAddressId : undefined,
        deliveryType,
        subtotal,
        tax,
        deliveryFee,
        discount,
        total,
        couponCode: coupon ? couponCode : undefined,
        notes,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        items: true,
        deliveryAddress: true,
      },
    });

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Send order confirmation email
    if (user) {
      await sendEmail({
        to: user.email,
        ...emailTemplates.orderConfirmation(order.orderNumber, order.total, user.firstName || 'Customer'),
      });

      // Send SMS
      if (user.phone) {
        await sendSms({
          to: user.phone,
          message: smsTemplates.orderConfirmation(order.orderNumber),
        });
      }
    }

    logger.info(`Order created: ${order.id}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CREATE_ORDER_ERROR',
        message: 'Failed to create order',
      },
    });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
    }

    const { status, limit = 10, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { userId: req.user.id };

    if (status) {
      where.status = status as string;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          deliveryAddress: true,
        },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_ORDERS_ERROR',
        message: 'Failed to get orders',
      },
    });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
    }

    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        deliveryAddress: true,
        payment: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found',
        },
      });
    }

    // Check if order belongs to user
    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this order',
        },
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error('Get order by id error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_ORDER_ERROR',
        message: 'Failed to get order',
      },
    });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
    }

    const { id } = req.params;
    const { reason } = req.body;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found',
        },
      });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this order',
        },
      });
    }

    if (order.status !== 'PENDING' && order.status !== 'CONFIRMED') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CANNOT_CANCEL',
          message: 'Order cannot be cancelled at this stage',
        },
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelReason: reason,
      },
    });

    logger.info(`Order cancelled: ${id}`);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: updatedOrder,
    });
  } catch (error) {
    logger.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CANCEL_ORDER_ERROR',
        message: 'Failed to cancel order',
      },
    });
  }
};
