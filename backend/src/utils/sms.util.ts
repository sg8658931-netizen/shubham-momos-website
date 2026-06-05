import twilio from 'twilio';
import logger from '../config/logger';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface SmsOptions {
  to: string;
  message: string;
}

export const sendSms = async (options: SmsOptions): Promise<boolean> => {
  try {
    await client.messages.create({
      body: options.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: options.to,
    });
    logger.info(`SMS sent to ${options.to}`);
    return true;
  } catch (error) {
    logger.error(`Failed to send SMS to ${options.to}:`, error);
    return false;
  }
};

// SMS Templates
export const smsTemplates = {
  orderConfirmation: (orderNumber: string) =>
    `Hi! Your order #${orderNumber} is confirmed. You'll receive updates soon. - Shubham Momos`,

  orderReady: (orderNumber: string) =>
    `Your order #${orderNumber} is ready for pickup! - Shubham Momos`,

  orderDelivered: (orderNumber: string) =>
    `Your order #${orderNumber} has been delivered. Thank you! - Shubham Momos`,

  passwordReset: (resetCode: string) =>
    `Your password reset code is: ${resetCode}. Valid for 1 hour. - Shubham Momos`,

  otp: (otp: string) =>
    `Your OTP is: ${otp}. Do not share with anyone. - Shubham Momos`,
};
