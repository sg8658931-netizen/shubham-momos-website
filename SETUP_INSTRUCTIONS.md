# Project Setup Instructions

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/sg8658931-netizen/shubham-momos-website.git
cd shubham-momos-website
```

### Step 2: Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration:
# - DATABASE_URL
# - JWT_SECRET
# - RAZORPAY keys
# - SendGrid API key
# - Twilio credentials

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

Backend will be available at: `http://localhost:5000`

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

### Step 4: Admin Dashboard Setup

```bash
cd ../admin
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Admin dashboard will be available at: `http://localhost:3001`

## Development Workflow

### Start All Services (3 Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Admin:**
```bash
cd admin
npm run dev
```

### Database Management

```bash
# View database
npx prisma studio

# Create new migration
npx prisma migrate dev --name feature_name

# Reset database (development only)
npx prisma migrate reset
```

## Configuration Files

### Backend .env
```
DATABASE_URL=postgresql://user:password@localhost:5432/shubham_momos
JWT_SECRET=your-super-secret-key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
SENDGRID_API_KEY=your_api_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY=your_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_ENV=development
```

### Admin .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ENV=development
```

## Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # or :3000, :3001

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Test PostgreSQL
psql -U postgres -d shubham_momos -c "SELECT 1"

# Recreate database
dropdb shubham_momos
createdb shubham_momos
npx prisma migrate dev
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
shubham-momos-website/
├── backend/          # Node.js + Express API
├── frontend/         # Next.js customer website
├── admin/            # Next.js admin dashboard
├── docs/             # Documentation
└── README.md
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Setup database
4. ✅ Start development servers
5. 📝 Build API controllers (backend/src/controllers/)
6. 📝 Build pages and components (frontend/src/)
7. 📝 Build admin dashboard pages (admin/src/)
8. 🧪 Test all features
9. 🚀 Deploy to production

## Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Setup Guide](./docs/SETUP.md)

## Support

For issues or questions:
1. Check documentation
2. Review error messages in terminal/logs
3. Check GitHub issues
4. Contact development team

---

**Your project is ready! Start developing! 🚀**
