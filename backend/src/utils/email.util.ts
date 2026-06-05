import nodemailer from 'nodemailer';
import logger from '../config/logger';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

// Create transporter based on environment
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM_NAME || 'Shubham Momos <noreply@shubhammomos.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${options.to}`);
    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${options.to}:`, error);
    return false;
  }
};

// Email Templates
export const emailTemplates = {
  orderConfirmation: (orderNumber: string, total: number, customerName: string) => ({
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Order Confirmed!</h2>
        <p>Hello ${customerName},</p>
        <p>Your order <strong>#${orderNumber}</strong> has been confirmed.</p>
        <p>Order Total: <strong>₹${total}</strong></p>
        <p>You will receive updates about your order via SMS and email.</p>
        <p>Thank you for your order!</p>
        <hr>
        <p>Shubham Momos Team</p>
      </div>
    `,
  }),

  orderDelivered: (orderNumber: string, customerName: string) => ({
    subject: `Order Delivered - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Your Order Has Been Delivered!</h2>
        <p>Hello ${customerName},</p>
        <p>Your order <strong>#${orderNumber}</strong> has been delivered.</p>
        <p>We hope you enjoyed your meal. Please share your feedback with us!</p>
        <hr>
        <p>Shubham Momos Team</p>
      </div>
    `,
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetLink}" style="background-color: #D4A574; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr>
        <p>Shubham Momos Team</p>
      </div>
    `,
  }),

  welcomeEmail: (customerName: string, welcomeCode: string) => ({
    subject: 'Welcome to Shubham Momos!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Welcome to Shubham Momos!</h2>
        <p>Hello ${customerName},</p>
        <p>Thank you for joining us. Use code <strong>${welcomeCode}</strong> to get 10% off on your first order!</p>
        <p>Start exploring our premium menu now.</p>
        <hr>
        <p>Shubham Momos Team</p>
      </div>
    `,
  }),
};
