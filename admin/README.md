# Shubham Momos - Admin Dashboard

Powerful admin dashboard for managing all aspects of Shubham Momos restaurant business.

## Features

✅ **Dashboard Analytics** - Real-time sales, orders, and revenue tracking
✅ **Order Management** - View, update status, and track orders
✅ **Menu Management** - Add, edit, delete products and categories
✅ **Inventory Management** - Track stock levels and availability
✅ **Customer Management** - View customer profiles and history
✅ **Content Management** - Manage banners, blogs, gallery, testimonials
✅ **Franchise Inquiries** - Manage partnership inquiries
✅ **Coupon Management** - Create and manage discount coupons
✅ **Store Management** - Manage multiple store locations
✅ **Settings** - Configure site settings and integrations
✅ **User Management** - Manage admin users and permissions
✅ **Analytics & Reports** - Detailed business insights
✅ **Email & SMS Logs** - Track all notifications
✅ **Payment Records** - View all transactions

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18 + Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Chart.js + React ChartJS 2
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── (dashboard)/
│       ├── orders/
│       ├── products/
│       ├── customers/
│       ├── content/
│       ├── franchise/
│       ├── settings/
│       └── analytics/
├── components/
│   ├── common/
│   │   ├── Header
│   │   ├── Sidebar
│   │   └── Footer
│   ├── dashboard/
│   │   ├── StatsCard
│   │   ├── OrdersTable
│   │   └── ChartComponents
│   └── forms/
│       ├── ProductForm
│       ├── CouponForm
│       └── SettingsForm
├── hooks/
├── context/
├── lib/
│   └── api.ts
├── styles/
└── types/
```

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Admin dashboard runs on `http://localhost:3001`

## Dashboard Sections

### 1. Overview/Analytics
- Total orders and revenue
- Today's performance
- Top products
- Recent orders
- Customer insights

### 2. Orders
- View all orders
- Filter by status, date, payment status
- Update order status
- Add delivery notes
- Print invoice/receipt

### 3. Products
- Add new products
- Edit product details
- Manage product variants
- Upload product images
- Set pricing and discounts
- Manage inventory

### 4. Categories
- Create product categories
- Edit categories
- Manage category images
- Set display order

### 5. Customers
- View all customers
- Customer profiles
- Order history
- Addresses
- Contact information

### 6. Content Management

#### Banners
- Create promotional banners
- Set banner positions
- Schedule banners
- Upload banner images

#### Blog Posts
- Create and publish blog posts
- Rich text editor
- SEO optimization
- Category management
- Featured image

#### Gallery
- Upload gallery images
- Organize by categories
- Set display order
- Add alt text for SEO

#### Testimonials
- View customer testimonials
- Approve/reject reviews
- Feature testimonials

### 7. Franchise Inquiries
- View partnership requests
- Contact information
- Business details
- Track inquiry status
- Send responses

### 8. Coupons & Offers
- Create discount coupons
- Set validity period
- Usage tracking
- Set discount type (percentage/fixed)
- Manage active/inactive coupons

### 9. Stores/Locations
- Add store locations
- Store details (address, contact)
- Business hours
- View store ratings
- Manage store status

### 10. Settings
- General settings
- Payment settings (Razorpay)
- Email settings (SendGrid)
- SMS settings (Twilio)
- Delivery settings
- SEO settings
- Social media links

### 11. Admin Users
- Create admin accounts
- Set user roles and permissions
- Manage access levels
- View activity logs

### 12. Analytics & Reports
- Sales analytics
- Revenue charts
- Order trends
- Customer analytics
- Product performance
- Custom date ranges
- Export reports

## Authentication

Admin dashboard requires authentication. Users must login with:
- Email
- Password

Tokens are stored securely and passed in API requests.

## Key Pages

| Page | Route | Features |
|------|-------|----------|
| Dashboard | `/` | Overview, stats, recent orders |
| Orders | `/orders` | List, filter, search, update |
| Products | `/products` | CRUD, bulk actions |
| Categories | `/categories` | Manage product categories |
| Customers | `/customers` | View profiles, order history |
| Banners | `/content/banners` | Create, edit, schedule |
| Blog | `/content/blog` | Create posts, manage content |
| Gallery | `/content/gallery` | Upload, organize images |
| Testimonials | `/content/testimonials` | Approve, feature reviews |
| Franchises | `/franchise` | View inquiries, track status |
| Coupons | `/coupons` | Create, manage discounts |
| Stores | `/stores` | Manage locations |
| Settings | `/settings` | Global configuration |
| Users | `/users` | Manage admin accounts |
| Analytics | `/analytics` | Reports, charts, insights |

## API Integration

AdminAPI calls are made to the backend at `NEXT_PUBLIC_API_URL`:

```typescript
import api from '@/lib/api';

// Get orders
const response = await api.get('/admin/orders');

// Create product
await api.post('/admin/products', { name, price, ... });

// Update order status
await api.put(`/admin/orders/${orderId}`, { status });
```

## Protected Routes

All admin routes are protected by authentication. Unauthorized users are redirected to login.

## Customization

The dashboard is fully customizable:
- Modify theme colors in `tailwind.config.js`
- Add new admin routes in `src/app/(dashboard)/`
- Create custom components as needed
- Extend API integration

## Deployment

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod
```

Or deploy to your own server with the built files.

## Security

- JWT-based authentication
- Protected API endpoints
- Environment variables for sensitive data
- CORS configuration
- Rate limiting on backend

## Performance

- Optimized images
- Code splitting
- Lazy loading
- Caching strategies
- Efficient database queries

## Support

For issues or feature requests, create an issue in the repository.

---

**Admin dashboard ready to manage your momo business! 🚀**
