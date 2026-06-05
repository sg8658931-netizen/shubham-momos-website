# Shubham Momos - Backend API

Robust Node.js + Express backend for Shubham Momos premium momo restaurant website.

## Features

✅ **RESTful API** - Clean, documented endpoints
✅ **Authentication** - JWT-based user authentication
✅ **Database** - PostgreSQL with Prisma ORM
✅ **Payments** - Razorpay integration
✅ **Notifications** - Email (SendGrid) and SMS (Twilio)
✅ **File Uploads** - Product images, gallery
✅ **Admin Panel** - Complete admin API
✅ **Order Management** - Full order lifecycle
✅ **Coupons & Discounts** - Discount management
✅ **Rate Limiting** - DDoS protection
✅ **Error Handling** - Comprehensive error management
✅ **Logging** - Winston logging system
✅ **Security** - CORS, Helmet, bcrypt

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Language**: TypeScript
- **Authentication**: JWT
- **Validation**: Joi
- **Payment**: Razorpay
- **Email**: SendGrid/Nodemailer
- **SMS**: Twilio
- **File Upload**: Multer
- **Logging**: Winston
- **API Security**: Helmet, CORS, Rate Limiting

## Project Structure

```
src/
├── server.ts              # Main application entry
├── config/
│   ├── database.ts        # Database configuration
│   ├── logger.ts          # Winston logger setup
│   └── env.ts             # Environment variables
├── routes/
│   ├── auth.routes.ts     # Authentication endpoints
│   ├── products.routes.ts # Product endpoints
│   ├── orders.routes.ts   # Order endpoints
│   ├── payments.routes.ts # Payment endpoints
│   ├── users.routes.ts    # User endpoints
│   ├── addresses.routes.ts# Address endpoints
│   ├── coupons.routes.ts  # Coupon endpoints
│   ├── reviews.routes.ts  # Review endpoints
│   ├── stores.routes.ts   # Store endpoints
│   ├── franchise.routes.ts# Franchise endpoints
│   ├── admin.routes.ts    # Admin endpoints
│   └── index.ts           # Route aggregator
├── controllers/
│   ├── auth.controller.ts
│   ├── product.controller.ts
│   ├── order.controller.ts
│   ├── payment.controller.ts
│   ├── user.controller.ts
│   ├── admin.controller.ts
│   └── ... (other controllers)
├── middleware/
│   ├── auth.middleware.ts # JWT verification
│   ├── errorHandler.ts    # Global error handler
│   ├── validation.ts      # Request validation
│   ├── rateLimit.ts       # Rate limiting
│   └── upload.ts          # File upload handling
├── models/
│   └── (Prisma schemas in prisma/schema.prisma)
├── utils/
│   ├── jwt.util.ts        # JWT utilities
│   ├── validators.ts      # Joi validators
│   ├── email.util.ts      # Email sending
│   ├── sms.util.ts        # SMS sending
│   ├── payment.util.ts    # Payment processing
│   └── helpers.ts         # Helper functions
├── types/
│   ├── api.types.ts       # API request/response types
│   ├── database.types.ts  # Database types
│   └── errors.types.ts    # Error types
prism/
├── schema.prisma          # Database schema
├── seed.ts                # Database seeding
└── migrations/            # Database migrations
```

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration

3. **Database Setup**
   ```bash
   # Create database
   createdb shubham_momos

   # Run migrations
   npx prisma migrate dev

   # Seed data (optional)
   npx prisma db seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Database migrations
npm run db:migrate

# Deploy migrations
npm run db:deploy

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Run tests
npm test

# Watch tests
npm run test:watch
```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Products
- `GET /products` - List products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)
- `GET /products/:id/reviews` - Get product reviews

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details
- `PUT /orders/:id` - Update order
- `POST /orders/:id/cancel` - Cancel order

### Payments
- `POST /payments/initiate` - Initiate payment
- `POST /payments/verify` - Verify payment
- `GET /payments/:orderId` - Get payment details

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users/addresses` - Get addresses
- `POST /users/addresses` - Create address
- `DELETE /users/addresses/:id` - Delete address

### Coupons
- `GET /coupons` - Get active coupons
- `POST /coupons/validate` - Validate coupon

### Reviews
- `POST /reviews` - Create review
- `GET /reviews/pending` - Get pending reviews (Admin)
- `PUT /reviews/:id/approve` - Approve review (Admin)

### Admin
- `GET /admin/dashboard` - Dashboard stats
- `GET /admin/orders` - Manage orders
- `GET /admin/customers` - Manage customers
- `POST /admin/banners` - Manage banners
- `GET /admin/settings` - Get settings
- `PUT /admin/settings` - Update settings

See [API Documentation](../docs/API.md) for complete endpoints.

## Authentication

JWT tokens are used for authentication. Include token in headers:

```
Authorization: Bearer <token>
```

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Validation

Joi schemas for all endpoints:

```typescript
// Example: User registration validation
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});
```

## Database Seeding

Seed initial data:

```bash
npm run db:seed
```

Create `prisma/seed.ts` for custom seeding:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed products
  await prisma.product.createMany({
    data: [
      {
        name: 'Steamed Momos',
        price: 199,
        // ... more fields
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

## Payment Integration

### Razorpay Setup

```typescript
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

## Email/SMS Notifications

### SendGrid (Email)

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'user@example.com',
  from: process.env.SENDGRID_FROM_EMAIL,
  subject: 'Order Confirmation',
  html: '<h1>Order placed successfully!</h1>',
});
```

### Twilio (SMS)

```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await client.messages.create({
  body: 'Your order has been confirmed!',
  from: process.env.TWILIO_PHONE_NUMBER,
  to: '+91999999999',
});
```

## Logging

Winston logger configuration:

```typescript
import logger from '@/config/logger';

logger.info('User logged in', { userId: '123' });
logger.error('Payment failed', { error: 'Insufficient funds' });
```

## Testing

Setup Jest for testing:

```bash
npm install --save-dev jest @types/jest ts-jest
```

Example test:

```typescript
describe('Auth Controller', () => {
  test('should register user', async () => {
    const result = await authController.register({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toHaveProperty('token');
  });
});
```

## Deployment

### Using Docker

```bash
# Build image
docker build -t shubham-momos-api .

# Run container
docker run -p 5000:5000 --env-file .env shubham-momos-api
```

### Deploy to Railway/AWS/DigitalOcean

See [Deployment Guide](../docs/DEPLOYMENT.md)

## Security Best Practices

- ✅ Use HTTPS in production
- ✅ Rotate JWT secrets regularly
- ✅ Implement rate limiting
- ✅ Sanitize user inputs
- ✅ Use environment variables
- ✅ Enable CORS only for trusted origins
- ✅ Hash passwords with bcrypt
- ✅ Validate all API requests
- ✅ Use helmet for security headers
- ✅ Keep dependencies updated

## Performance Optimization

- Database indexing for frequent queries
- Caching strategies with Redis
- Request pagination
- Query optimization with Prisma
- Compression middleware
- CDN for static files

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License

Private and proprietary to Shubham Momos.

---

**Happy coding! 🚀**
