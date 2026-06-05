# Deployment Guide - Shubham Momos Website

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Email/SMS services configured
- [ ] Payment gateway configured
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented
- [ ] SEO optimized
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Disaster recovery plan ready

## Frontend Deployment (Vercel)

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Select `frontend` folder as root directory

### Step 2: Environment Variables

Add to Vercel project settings:

```
NEXT_PUBLIC_API_URL=https://api.shubhammomos.com/api
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
```

### Step 3: Deploy

```bash
cd frontend
vercel --prod
```

**Your site will be live at:** `https://shubhammomos.vercel.app`

### Custom Domain

1. Go to Vercel project settings
2. Add custom domain: `shubhammomos.com`
3. Update DNS records with Vercel's nameservers

## Backend Deployment

### Option 1: Railway.app (Easiest)

1. Go to [railway.app](https://railway.app)
2. Connect GitHub account
3. Create new project from repository
4. Select `backend` folder
5. Add PostgreSQL plugin
6. Configure environment variables

**Cost:** ~$5/month for starter plan

### Option 2: AWS EC2 + RDS

#### Setup EC2 Instance

```bash
# SSH into EC2
ssh -i key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone <repo-url>
cd shubham-momos-website/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with production values

# Run migrations
npx prisma migrate deploy

# Start with PM2
pm2 start src/server.js --name "shubham-momos-api"
pm2 save
pm2 startup
```

#### Setup RDS Database

1. Go to AWS RDS console
2. Create PostgreSQL database
3. Configure security groups to allow EC2 access
4. Add connection string to `.env`

#### Setup Nginx Reverse Proxy

```bash
sudo apt-get install nginx

# Edit /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name api.shubhammomos.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### Option 3: Docker Deployment

#### Build Docker Image

```bash
cd backend
docker build -t shubham-momos-api:latest .
docker tag shubham-momos-api:latest your-registry/shubham-momos-api:latest
docker push your-registry/shubham-momos-api:latest
```

#### Deploy to Docker Hub

```bash
docker login
docker push your-registry/shubham-momos-api:latest
```

#### Deploy on AWS ECS

1. Create ECS cluster
2. Create task definition with image from Docker registry
3. Create service with load balancer
4. Configure auto-scaling

## Database Deployment

### PostgreSQL Managed Services

**Options:**
- AWS RDS (Most features)
- DigitalOcean Managed Databases (Easiest)
- Railway.app (Included with backend)
- ElephantSQL (Free tier available)

### Backup Strategy

```bash
# Automated daily backups
# For AWS RDS: Enable automated backups in console
# For DigitalOcean: Enable automated backups

# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Restore from backup
psql $DATABASE_URL < backup.sql
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
sudo apt-get install certbot python3-certbot-nginx

sudo certbot certonly --nginx -d api.shubhammomos.com -d shubhammomos.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Update Nginx Config

```nginx
server {
    listen 443 ssl http2;
    server_name api.shubhammomos.com;

    ssl_certificate /etc/letsencrypt/live/api.shubhammomos.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.shubhammomos.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... rest of config
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.shubhammomos.com;
    return 301 https://$server_name$request_uri;
}
```

## Admin Dashboard Deployment

### Deploy to Vercel

```bash
cd admin
vercel --prod --name shubham-momos-admin
```

**Note:** Protect admin routes with authentication

## Monitoring & Logging

### Setup Application Monitoring

#### Using Sentry for Error Tracking

```bash
npm install @sentry/node
```

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'https://your-sentry-dsn@sentry.io/project-id',
  environment: process.env.NODE_ENV,
});
```

#### Using Datadog for Monitoring

1. Sign up at [datadog.com](https://datadog.com)
2. Install agent
3. Configure dashboard
4. Set up alerts

### Logging Strategy

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});
```

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Performance Optimization

### Database Optimization

```sql
-- Add indexes
CREATE INDEX idx_order_user_id ON orders(user_id);
CREATE INDEX idx_order_created_at ON orders(created_at DESC);
CREATE INDEX idx_product_category ON products(category);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = $1;
```

### Frontend Optimization

- Enable image optimization
- Minify CSS/JS
- Compress assets
- Use CDN for static files

### API Performance

- Enable caching headers
- Implement rate limiting
- Use pagination
- Add API request logging

## Rollback Plan

### For Vercel

1. Go to Vercel dashboard
2. Select deployment
3. Click "Rollback"

### For EC2/Server

```bash
# Check PM2 logs
pm2 logs

# Restart application
pm2 restart all

# Rollback code
git revert <commit-hash>
git push origin main
```

## Monitoring Checklist

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Datadog/New Relic)
- [ ] Uptime monitoring (Pingdom/Uptime Robot)
- [ ] Database backups working
- [ ] Email notifications working
- [ ] Payment gateway functioning
- [ ] API response times < 200ms
- [ ] Database response times < 100ms
- [ ] Zero 5xx errors in logs
- [ ] CDN cache hit rate > 80%

## Post-Deployment

1. Run smoke tests
2. Verify all integrations (Razorpay, Email, SMS)
3. Check SEO indexing
4. Monitor error logs
5. Get stakeholder sign-off
6. Plan monitoring schedule
7. Document any issues

---

**Deployment complete! Your site is now live.** 🎉
