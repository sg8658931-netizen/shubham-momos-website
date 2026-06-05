# Shubham Momos - Frontend

Modern, premium frontend built with Next.js 14, React 18, and Tailwind CSS for the Shubham Momos momo restaurant website.

## Features

✅ **Premium UI/UX Design** - Modern, clean, conversion-focused interface
✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
✅ **Fast Loading** - Image optimization, code splitting, lazy loading
✅ **SEO Optimized** - Meta tags, Open Graph, structured data
✅ **Product Browsing** - Menu with filters, search, categories
✅ **Shopping Cart** - Real-time cart management with Zustand
✅ **Checkout** - Secure checkout with form validation
✅ **Payment Integration** - Razorpay payment gateway
✅ **User Authentication** - Login, register, user profiles
✅ **Order Tracking** - Real-time order status tracking
✅ **Blog Section** - Content marketing and SEO
✅ **Gallery** - Image showcase of products and store
✅ **Reviews** - Customer testimonials and ratings
✅ **Location Finder** - Store locator with Google Maps
✅ **Franchise Inquiry** - Franchise partnership inquiries

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS + Tailwind UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Animations**: Framer Motion (optional)
- **Toast Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Image Carousel**: Swiper

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── (routes)         # Route groups
├── components/          # Reusable components
│   ├── common/          # Common components (Header, Footer, etc.)
│   ├── product/         # Product-related components
│   ├── cart/            # Cart components
│   ├── checkout/        # Checkout components
│   ├── auth/            # Authentication components
│   └── ui/              # UI components
├── pages/               # API routes and special pages
├── styles/              # Global styles
│   └── globals.css      # Tailwind imports
├── hooks/               # Custom React hooks
│   ├── useCart.ts       # Cart hook
│   ├── useAuth.ts       # Authentication hook
│   └── useApi.ts        # API hook
├── context/             # Context API
│   ├── AuthContext.tsx  # Authentication context
│   └── CartContext.tsx  # Cart context
├── lib/                 # Utilities and helpers
│   ├── api.ts           # API client
│   ├── constants.ts     # Constants
│   └── validators.ts    # Zod validators
├── utils/               # Helper functions
│   ├── format.ts        # Formatting utilities
│   └── validation.ts    # Validation helpers
├── types/               # TypeScript types
│   ├── api.ts           # API response types
│   ├── product.ts       # Product types
│   └── order.ts         # Order types
└── public/              # Static assets
    ├── images/
    ├── icons/
    └── fonts/
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Development

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting errors
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

### Code Style

- **Formatter**: Prettier (configured in `.prettierrc`)
- **Linter**: ESLint (configured in `.eslintrc.json`)
- **Type Checking**: TypeScript

Run formatting before committing:
```bash
npm run format
npm run lint:fix
```

## Component Library

### Common Components

- `Header` - Navigation header with logo, menu, cart
- `Footer` - Footer with links, social media, contact
- `Navbar` - Responsive navigation bar
- `Container` - Max-width container wrapper
- `Button` - Primary, secondary, outline button variants
- `Card` - Reusable card component

### Product Components

- `ProductCard` - Product display card
- `ProductGrid` - Grid layout for products
- `ProductFilter` - Category and filter sidebar
- `ProductSearch` - Search component

### Cart Components

- `CartIcon` - Shopping cart icon with item count
- `CartSidebar` - Cart drawer/sidebar
- `CartItem` - Individual cart item
- `CartSummary` - Cart total and checkout button

### Forms

- `LoginForm` - User login form
- `RegisterForm` - User registration form
- `AddressForm` - Delivery address form
- `CheckoutForm` - Checkout form

## API Integration

### API Client Setup

The API client is configured in `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Usage Example

```typescript
import api from '@/lib/api';

const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

## State Management

### Zustand Store Example

```typescript
// src/store/cartStore.ts
import create from 'zustand';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.productId !== productId),
  })),
  clearCart: () => set({ items: [], total: 0 }),
}));
```

## SEO Optimization

### Meta Tags

Use `next/head` or layout metadata:

```typescript
export const metadata = {
  title: 'Shubham Momos - Premium Momo Restaurant',
  description: 'Experience premium momos with our world-class recipes. Order online for delivery or pickup.',
  keywords: 'momos, dumplings, food delivery, restaurant',
  openGraph: {
    title: 'Shubham Momos',
    description: 'Premium momo restaurant',
    url: 'https://shubhammomos.com',
    siteName: 'Shubham Momos',
    images: [
      {
        url: 'https://shubhammomos.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### Structured Data

Add JSON-LD for search engines:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Restaurant',
      name: 'Shubham Momos',
      // ... more fields
    }),
  }}
/>
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/momos.jpg"
  alt="Delicious momos"
  width={400}
  height={300}
  priority // For above-the-fold images
/>
```

### Code Splitting

Use dynamic imports for large components:

```typescript
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <p>Loading...</p>,
});
```

### CSS Optimization

Tailwind CSS automatically removes unused styles in production.

## Testing

Setup Jest and React Testing Library:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables for Production

Set in Vercel dashboard:
- `NEXT_PUBLIC_API_URL` - Production API URL
- `NEXT_PUBLIC_RAZORPAY_KEY` - Production Razorpay key

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### API Connection Issues
Check:
1. Backend server is running
2. `NEXT_PUBLIC_API_URL` is correctly set
3. CORS is enabled on backend

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run format && npm run lint:fix`
4. Commit and push
5. Create a Pull Request

## License

Private and proprietary to Shubham Momos.

---

**Happy coding! 🚀**
