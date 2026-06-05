import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      logger.warn('Validation error:', details);

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details,
        },
      });
    }

    req.body = value;
    next();
  };
};

// Common validators
export const validators = {
  // User validators
  register: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  }),

  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Product validators
  createProduct: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().positive().required(),
    originalPrice: Joi.number().positive(),
    category: Joi.string().required(),
    stock: Joi.number().integer().default(100),
    image: Joi.string(),
  }),

  // Order validators
  createOrder: Joi.object().keys({
    items: Joi.array()
      .items(
        Joi.object().keys({
          productId: Joi.string().required(),
          quantity: Joi.number().positive().required(),
          variantId: Joi.string(),
        })
      )
      .required(),
    deliveryAddressId: Joi.string().required(),
    deliveryType: Joi.string().valid('PICKUP', 'DELIVERY').default('DELIVERY'),
    couponCode: Joi.string(),
    notes: Joi.string(),
  }),

  // Address validators
  createAddress: Joi.object().keys({
    type: Joi.string().valid('HOME', 'OFFICE', 'OTHER').required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    label: Joi.string(),
    isDefault: Joi.boolean().default(false),
    latitude: Joi.number(),
    longitude: Joi.number(),
  }),

  // Coupon validators
  validateCoupon: Joi.object().keys({
    code: Joi.string().required(),
    orderValue: Joi.number().positive().required(),
  }),

  // Review validators
  createReview: Joi.object().keys({
    productId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    title: Joi.string(),
    comment: Joi.string().required(),
    image: Joi.string(),
  }),

  // Franchise validators
  createFranchiseInquiry: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    city: Joi.string().required(),
    experience: Joi.string(),
    investment: Joi.string(),
    message: Joi.string(),
  }),
};
