import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateSlug } from '../utils/helpers';
import logger from '../config/logger';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, limit = 20, page = 1, sort = 'createdAt', order = 'desc' } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { isAvailable: true };

    if (category) {
      where.category = category as string;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { [sort as string]: order as any },
        include: {
          reviews: true,
          variants: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_PRODUCTS_ERROR',
        message: 'Failed to get products',
      },
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        variants: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found',
        },
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error('Get product by id error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_PRODUCT_ERROR',
        message: 'Failed to get product',
      },
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, originalPrice, category, stock, image, metaTitle, metaDesc } = req.body;

    const slug = generateSlug(name);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        originalPrice: originalPrice || price,
        category,
        stock: stock || 100,
        image,
        slug,
        metaTitle: metaTitle || name,
        metaDesc: metaDesc || description,
      },
    });

    logger.info(`Product created: ${product.id}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error: any) {
    logger.error('Create product error:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_SLUG',
          message: 'A product with this name already exists',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'CREATE_PRODUCT_ERROR',
        message: 'Failed to create product',
      },
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, originalPrice, category, stock, image, isAvailable } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price }),
        ...(originalPrice && { originalPrice }),
        ...(category && { category }),
        ...(stock !== undefined && { stock }),
        ...(image && { image }),
        ...(isAvailable !== undefined && { isAvailable }),
      },
    });

    logger.info(`Product updated: ${product.id}`);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error: any) {
    logger.error('Update product error:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_PRODUCT_ERROR',
        message: 'Failed to update product',
      },
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    logger.info(`Product deleted: ${id}`);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    logger.error('Delete product error:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found',
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'DELETE_PRODUCT_ERROR',
        message: 'Failed to delete product',
      },
    });
  }
};
