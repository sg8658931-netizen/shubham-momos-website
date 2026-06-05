# Shubham Momos - Premium Momo Restaurant Website

🥟 A modern, premium, conversion-focused website for a world-class momo business with complete admin dashboard, online ordering, and Razorpay payment integration.

## 📋 Project Overview

This is a full-stack web application designed for **Shubham Momos**, featuring:
- Premium, responsive frontend (Mobile, Tablet, Desktop)
- Seamless online ordering system with cart & checkout
- Razorpay payment gateway integration
- Complete admin dashboard for content management
- Order tracking and management
- Blog, Gallery, and Testimonials
- Franchise inquiry system
- SEO-optimized architecture

## 🏗️ Project Structure

```
shubham-momos-website/
├── frontend/                 # Next.js + React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Next.js pages
│   │   ├── styles/          # Global styles & Tailwind CSS
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context API (Cart, Auth)
│   │   ├── lib/             # Utility functions
│   │   └── public/          # Static assets (images, fonts)
│   ├── .env.local           # Environment variables
│   ├── next.config.js       # Next.js configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend documentation
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models (Prisma)
│   │   ├── middleware/      # Authentication, validation
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Express server setup
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies
│   └── README.md            # Backend documentation
├── admin/                   # Admin Dashboard (React)
│   ├── src/
│   │   ├── components/      # Admin UI components
│   │   ├── pages/           # Admin pages
│   │   ├── styles/          # Styles
│   │   ├── hooks/           # Custom hooks
│   │   └── lib/             # Utilities
│   ├── package.json         # Dependencies
│   └── README.md            # Admin documentation
├── docs/                    # Documentation
│   ├── API.md               # API documentation
│   ├── SETUP.md             # Setup guide
│   ├── DATABASE.md          # Database schema
│   └── DEPLOYMENT.md        # Deployment guide
├── .gitignore               # Git ignore file
├── docker-compose.yml       # Docker setup (optional)
└── README.md                # This file
```

## 🎯 Key Features

### Frontend
- ✅ Premium, modern UI/UX design
- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Fast-loading pages with image optimization
- ✅ SEO-friendly architecture
- ✅ Menu browsing with filters and search
- ✅ Shopping cart with real-time updates
- ✅ Secure checkout with multiple payment options
- ✅ Order tracking
- ✅ User authentication & profiles
- ✅ Blog section with recipe content
- ✅ Gallery and testimonials
- ✅ Location/store finder
- ✅ Franchise inquiry form

### Backend
- ✅ RESTful API with Express.js
- ✅ PostgreSQL database with Prisma ORM
- ✅ JWT authentication
- ✅ Razorpay payment integration
- ✅ Email/SMS notifications (Twilio/SendGrid)
- ✅ Order management system
- ✅ Coupons and discounts
- ✅ Admin operations
- ✅ Error handling & logging

### Admin Dashboard
- ✅ Content management (banners, menu items, offers)
- ✅ Order management and tracking
- ✅ Customer data analytics
- ✅ Blog & Gallery management
- ✅ Testimonials management
- ✅ Store locations management
- ✅ Franchise inquiries
- ✅ Payment records
- ✅ SEO settings
- ✅ Email/SMS templates

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Context API / Zustand
- **HTTP Client**: Axios / Fetch API
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Heroicons / Tabler Icons
- **Image Optimization**: Next.js Image

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Payment**: Razorpay
- **Email**: SendGrid / Nodemailer
- **SMS**: Twilio
- **Validation**: Joi
- **Logging**: Winston

### Infrastructure
- **Frontend Hosting**: Vercel
- **Backend Hosting**: AWS EC2 / DigitalOcean / Railway
- **Database**: AWS RDS / DigitalOcean Managed DB
- **CDN**: Cloudflare
- **Version Control**: Git

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Quick Start

1. **Clone the repository**
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
   # Edit .env.local with backend API URL
   npm run dev
   ```

4. **Setup Admin Dashboard**
   ```bash
   cd ../admin
   npm install
   cp .env.example .env.local
   npm run dev
   ```

For detailed setup instructions, see [SETUP.md](./docs/SETUP.md)

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Admin README](./admin/README.md)

## 🎨 Brand Identity

### Color Palette
- **Primary**: #D4A574 (Warm Gold/Copper)
- **Secondary**: #2C3E2F (Deep Forest Green)
- **Accent**: #E8D4C4 (Light Beige)
- **Dark**: #1A1A1A (Near Black)
- **Light**: #F9F7F4 (Off White)

### Typography
- **Headlines**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Monospace**: Fira Code (Code)

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Docker)
```bash
cd backend
docker build -t shubham-momos-api .
docker run -p 5000:5000 shubham-momos-api
```

For detailed deployment instructions, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 🔒 Environment Variables

Create `.env` files in backend and frontend directories:

**Backend .env**
```
DATABASE_URL=postgresql://user:password@localhost:5432/shubham_momos
JWT_SECRET=your-secret-key
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
NODE_ENV=development
```

**Frontend .env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY=your-razorpay-key
```

## 📊 Project Timeline

- **Phase 1**: Design System & Component Library (Week 1-2)
- **Phase 2**: Frontend Development (Week 2-4)
- **Phase 3**: Backend & Database Setup (Week 3-4)
- **Phase 4**: Admin Dashboard (Week 4-5)
- **Phase 5**: Payment & Notification Integration (Week 5-6)
- **Phase 6**: Testing & Optimization (Week 6-7)
- **Phase 7**: Deployment & Launch (Week 7-8)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is private and proprietary to Shubham Momos.

## 📞 Support

For issues and questions, please create an GitHub issue in this repository.

---

**Built with ❤️ for Shubham Momos**
