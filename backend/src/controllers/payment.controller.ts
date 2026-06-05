import { Request, Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../middleware/auth.middleware';
import { createRazorpayOrder, verifyRazorpayPayment } from '../utils/payment.util';
import logger from '../config/logger';

export const initiatePayment = async (req: AuthRequest, res: Response) => {
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

    const { orderId } = req.body;

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(
      order.total,
      order.id,
      user.email,
      user.phone || ''
    );

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: order.total,
        status: 'PENDING',
      },
    });

    logger.info(`Payment initiated for order: ${orderId}`);

    res.json({
      success: true,
      message: 'Payment initiated',
      data: {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: Math.round(order.total * 100), // In paise
        currency: 'INR',
        key: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    logger.error('Initiate payment error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'PAYMENT_INITIATION_ERROR',
        message: 'Failed to initiate payment',
      },
    });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response) => {
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

    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Get payment
    const payment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PAYMENT_NOT_FOUND',
          message: 'Payment not found',
        },
      });
    }

    // Verify payment signature
    const isValid = verifyRazorpayPayment(
      payment.razorpayOrderId!,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      logger.warn(`Invalid payment signature for order: ${orderId}`);
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_SIGNATURE',
          message: 'Payment verification failed',
        },
      });
    }

    // Update payment and order
    await Promise.all([
      prisma.payment.update({
        where: { orderId },
        data: {
          razorpayId: razorpayPaymentId,
          status: 'COMPLETED',
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CONFIRMED',
          paymentStatus: 'COMPLETED',
        },
      }),
    ]);

    logger.info(`Payment verified for order: ${orderId}`);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId,
        paymentStatus: 'COMPLETED',
      },
    });
  } catch (error) {
    logger.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'PAYMENT_VERIFICATION_ERROR',
        message: 'Failed to verify payment',
      },
    });
  }
};
