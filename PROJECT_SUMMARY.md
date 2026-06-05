# Shubham Momos - Project Summary

## Project Overview

A premium, modern, conversion-focused website for **Shubham Momos** - a world-class momo restaurant business with complete admin dashboard, online ordering system, and multiple integrations.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 + React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **UI Components**: Heroicons

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: JWT
- **Payments**: Razorpay
- **Email**: SendGrid/Nodemailer
- **SMS**: Twilio
- **File Upload**: Multer
- **Logging**: Winston

### Admin Dashboard
- **Framework**: Next.js 14 + React 18
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + React ChartJS 2
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## Key Features

### Frontend Features
✅ Premium, responsive UI/UX design
✅ Fast-loading pages with image optimization
✅ SEO-friendly architecture
✅ Menu browsing with filters and search
✅ Shopping cart with real-time updates
✅ Secure checkout process
✅ Multiple payment methods (UPI, Cards, Wallets)
✅ Order tracking
✅ User authentication & profiles
✅ Blog section for content marketing
✅ Gallery and testimonials
✅ Location/store finder
✅ Franchise inquiry system
✅ Customer reviews and ratings

### Backend Features
✅ RESTful API with comprehensive documentation
✅ JWT-based authentication
✅ Product management
✅ Order management system
✅ Payment processing (Razorpay)
✅ Email notifications (SendGrid)
✅ SMS notifications (Twilio)
✅ User management
✅ Coupon and discount system
✅ Store location management
✅ Admin operations
✅ Error handling & logging
✅ Rate limiting & security

### Admin Dashboard Features
✅ Real-time dashboard analytics
✅ Order management (view, update, track)
✅ Menu management (add, edit, delete products)
✅ Inventory tracking
✅ Customer management
✅ Content management (banners, blogs, gallery)
✅ Franchise inquiry management
✅ Coupon management
✅ Store management
✅ Settings configuration
✅ Admin user management
✅ Analytics and reports
✅ Email & SMS logs
✅ Payment records

## Database Schema

### Core Tables
- **Users**: Customer accounts and authentication
- **Admins**: Admin user accounts and permissions
- **Products**: Menu items with variants and pricing
- **Orders**: Customer orders with items and status tracking
- **Payments**: Transaction details and Razorpay integration
- **Addresses**: Delivery and billing addresses
- **Coupons**: Discount codes and offers
- **Reviews**: Customer reviews and ratings
- **Stores**: Multiple location management
- **Blog**: Article content for SEO
- **Gallery**: Image showcase
- **Banners**: Promotional banners
- **Testimonials**: Customer testimonials
- **Franchise Inquiries**: Partnership requests
- **Notifications**: Notification logs
- **Analytics**: Event tracking

## API Endpoints (Preview)

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details
- `POST /orders/:id/cancel` - Cancel order

### Payments
- `POST /payments/initiate` - Initiate payment
- `POST /payments/verify` - Verify payment

### Admin
- `GET /admin/dashboard` - Dashboard analytics
- `GET /admin/orders` - Manage orders
- `GET /admin/customers` - Manage customers
- `POST /admin/banners` - Manage banners

*See [API Documentation](./docs/API.md) for complete endpoints*

## Directory Structure

```
shubham-momos-website/
├── backend/
│   ├── src/
│   │   ├── server.ts              # Main entry point
│   │   ├── config/                # Configuration files
│   │   ├── routes/                # API routes
│   │   ├── controllers/           # Business logic (to be implemented)
│   │   ├── middleware/            # Express middleware
│   │   ├── utils/                 # Utility functions
│   │   └── types/                 # TypeScript types
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   ├── seed.ts                # Database seeding
│   │   └── migrations/            # Database migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/                   # Next.js pages
│   │   ├── components/            # React components
│   │   ├── styles/                # Global styles
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── context/               # Context API
│   │   ├── lib/                   # Utilities and helpers
│   │   └── types/                 # TypeScript types
│   ├── public/                    # Static assets
│   └── package.json
├── admin/
│   ├── src/
│   │   ├── app/                   # Next.js pages
│   │   ├── components/            # React components
│   │   ├── lib/                   # Utilities
│   │   └── types/                 # TypeScript types
│   └── package.json
├── docs/
│   ├── API.md                     # API documentation
│   ├── DATABASE.md                # Database schema
│   ├── SETUP.md                   # Setup guide
│   └── DEPLOYMENT.md              # Deployment guide
└── README.md
```

## Getting Started

### Quick Start

1. **Clone Repository**
   ```bash
   git clone https://github.com/sg8658931-netizen/shubham-momos-website.git
   cd shubham-momos-website
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npx prisma migrate dev
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

4. **Setup Admin**
   ```bash
   cd ../admin
   npm install
   cp .env.example .env.local
   npm run dev
   ```

### URLs in Development
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`
- Admin Dashboard: `http://localhost:3001`
- Database Studio: `npx prisma studio` (backend folder)

## Configuration Requirements

### Third-Party Services

1. **Razorpay** (Payments)
   - Get API keys from https://razorpay.com
   - Add to backend `.env`

2. **SendGrid** (Email)
   - Get API key from https://sendgrid.com
   - Add to backend `.env`

3. **Twilio** (SMS)
   - Get credentials from https://twilio.com
   - Add to backend `.env`

4. **PostgreSQL** (Database)
   - Setup local PostgreSQL or cloud database
   - Update `DATABASE_URL` in `.env`

## Development Commands

### Backend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run format       # Format code
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run format       # Format code
```

### Admin
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
```

## Project Phases

### ✅ Phase 1: Setup (Completed)
- Project structure created
- Dependencies configured
- Database schema designed
- Configuration files setup

### 📝 Phase 2: Core Development (In Progress)
- Backend controllers implementation
- API route handlers
- Database operations
- Frontend pages and components
- Admin dashboard pages

### ⏳ Phase 3: Integrations
- Razorpay payment integration
- SendGrid email integration
- Twilio SMS integration
- Google Maps integration

### ⏳ Phase 4: Testing
- Unit tests
- Integration tests
- E2E tests
- Performance testing

### ⏳ Phase 5: Deployment
- Frontend deployment (Vercel)
- Backend deployment (Railway/AWS)
- Database setup (AWS RDS/DigitalOcean)
- CDN configuration
- SSL/HTTPS setup

## Brand Identity

### Color Palette
- **Primary**: #D4A574 (Warm Gold/Copper)
- **Secondary**: #2C3E2F (Deep Forest Green)
- **Accent**: #E8D4C4 (Light Beige)
- **Dark**: #1A1A1A (Near Black)
- **Light**: #F9F7F4 (Off White)

### Typography
- **Headlines**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Code**: Fira Code (Monospace)

## Security Best Practices

✅ JWT-based authentication
✅ Password hashing with bcrypt
✅ HTTPS/SSL encryption
✅ CORS configuration
✅ Rate limiting
✅ Input validation
✅ SQL injection prevention (Prisma ORM)
✅ XSS protection (Helmet)
✅ Environment variables for secrets
✅ Secure payment handling

## Performance Optimization

✅ Image optimization (Next.js Image)
✅ Code splitting and lazy loading
✅ Database indexing
✅ API request caching
✅ CDN for static assets
✅ Compression middleware
✅ Database query optimization

## Documentation

- [Full API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Instructions](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Admin README](./admin/README.md)

## Support & Contact

For issues, questions, or feature requests:
1. Check documentation
2. Review README files
3. Create GitHub issue
4. Contact development team

## License

This project is private and proprietary to Shubham Momos.

---

**Built with ❤️ for Shubham Momos - Premium Momo Restaurant**

*Last Updated: June 5, 2026*
