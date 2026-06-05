# Setup Guide - Shubham Momos Website

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL 14+
- Git
- Visual Studio Code (optional but recommended)

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sg8658931-netizen/shubham-momos-website.git
cd shubham-momos-website
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# nano .env  # or use your editor

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with backend API URL
# nano .env.local

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:3000`

### 4. Admin Dashboard Setup

```bash
cd ../admin
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

**Admin will run on:** `http://localhost:3001`

## Database Setup

### PostgreSQL Configuration

```bash
# Create database
createdb shubham_momos

# Or using psql
psql -U postgres -c "CREATE DATABASE shubham_momos;"

# Connection URL for .env
DATABASE_URL=postgresql://user:password@localhost:5432/shubham_momos
```

### Prisma Migrations

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# View database with Prisma Studio
npx prisma studio
```

## Third-Party Services

### Razorpay Setup

1. Sign up at https://razorpay.com
2. Get your API keys from the dashboard
3. Add to backend `.env`:
   ```
   RAZORPAY_KEY_ID=your-key-id
   RAZORPAY_KEY_SECRET=your-key-secret
   ```
4. Add to frontend `.env.local`:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY=your-key-id
   ```

### SendGrid Setup (Email)

1. Sign up at https://sendgrid.com
2. Create API key
3. Add to backend `.env`:
   ```
   SENDGRID_API_KEY=your-api-key
   SENDGRID_FROM_EMAIL=noreply@shubhammomos.com
   ```

### Twilio Setup (SMS)

1. Sign up at https://twilio.com
2. Get Account SID and Auth Token
3. Add to backend `.env`:
   ```
   TWILIO_ACCOUNT_SID=your-sid
   TWILIO_AUTH_TOKEN=your-token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## Development Workflow

### Starting Development Servers

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Admin**
```bash
cd admin
npm run dev
```

### Code Style & Linting

```bash
# Run linter
npm run lint

# Fix linting errors
npm run lint:fix

# Format code
npm run format
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## Debugging

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/src/server.js",
      "cwd": "${workspaceFolder}/backend"
    }
  ]
}
```

## Build for Production

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd ../backend
npm run build
NODE_ENV=production npm start
```

## Docker Setup (Optional)

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Database Connection Error

```bash
# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT 1"

# Check Prisma setup
cd backend
npx prisma validate
```

### Node Modules Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Review [API Documentation](./API.md)
2. Check [Database Schema](./DATABASE.md)
3. Read [Deployment Guide](./DEPLOYMENT.md)
4. Start building features!

Happy coding! 🚀
