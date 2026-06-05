import Razorpay from 'razorpay';
import logger from '../config/logger';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = async (
  amount: number,
  orderId: string,
  customerEmail: string,
  customerPhone: string
) => {
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: orderId,
      notes: {
        orderId,
      },
    });

    logger.info(`Razorpay order created: ${order.id}`);
    return order;
  } catch (error) {
    logger.error('Failed to create Razorpay order:', error);
    throw error;
  }
};

export const verifyRazorpayPayment = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean => {
  try {
    const message = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(message)
      .digest('hex');

    const isValid = expectedSignature === razorpaySignature;
    logger.info(`Payment verification: ${isValid ? 'success' : 'failed'}`);
    return isValid;
  } catch (error) {
    logger.error('Payment verification error:', error);
    return false;
  }
};

export const getRazorpayPaymentDetails = async (paymentId: string) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    logger.error('Failed to fetch payment details:', error);
    throw error;
  }
};

export const refundPayment = async (paymentId: string, amount?: number) => {
  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    logger.info(`Refund created: ${refund.id}`);
    return refund;
  } catch (error) {
    logger.error('Failed to create refund:', error);
    throw error;
  }
};
