# Database Schema - Shubham Momos

## Overview

The database is built with PostgreSQL and managed with Prisma ORM. Below is the complete schema.

## Tables & Models

### 1. User
Stores customer information and authentication details.

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  phone         String?   @unique
  password      String
  firstName     String?
  lastName      String?
  avatar        String?
  role          Role      @default(CUSTOMER)
  
  // Relations
  addresses     Address[]
  orders        Order[]
  reviews       Review[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 2. Admin
Stores admin user information.

```prisma
model Admin {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  firstName     String
  lastName      String
  role          AdminRole @default(EDITOR)
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 3. Product
Stores menu items/products.

```prisma
model Product {
  id            String    @id @default(cuid())
  name          String
  description   String?
  image         String?
  price         Float
  originalPrice Float?
  category      String
  
  // Inventory
  stock         Int       @default(999)
  isAvailable   Boolean   @default(true)
  
  // SEO
  slug          String    @unique
  metaTitle     String?
  metaDesc      String?
  
  // Relations
  orderItems    OrderItem[]
  reviews       Review[]
  variants      ProductVariant[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 4. ProductVariant
Stores product variations (size, type, etc.).

```prisma
model ProductVariant {
  id            String    @id @default(cuid())
  productId     String
  product       Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  name          String    // e.g., "Small", "Medium", "Large"
  price         Float
  description   String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 5. Order
Stores customer orders.

```prisma
model Order {
  id            String    @id @default(cuid())
  orderNumber   String    @unique
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  // Order Details
  items         OrderItem[]
  subtotal      Float
  tax           Float
  deliveryFee   Float     @default(0)
  discount      Float     @default(0)
  total         Float
  
  // Delivery
  deliveryAddressId String?
  deliveryAddress   Address? @relation(fields: [deliveryAddressId], references: [id])
  deliveryType  DeliveryType @default(DELIVERY) // PICKUP, DELIVERY
  
  // Status
  status        OrderStatus @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)
  
  // Notes
  notes         String?
  cancelReason  String?
  
  // Tracking
  estimatedTime DateTime?
  completedAt   DateTime?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 6. OrderItem
Stores individual items in an order.

```prisma
model OrderItem {
  id            String    @id @default(cuid())
  orderId       String
  order         Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId     String
  product       Product   @relation(fields: [productId], references: [id])
  
  quantity      Int
  price         Float
  totalPrice    Float
  
  // Customizations
  notes         String?
  
  createdAt     DateTime  @default(now())
}
```

### 7. Address
Stores delivery/billing addresses.

```prisma
model Address {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type          AddressType // HOME, OFFICE, OTHER
  label         String?
  
  street        String
  city          String
  state         String
  zipCode       String
  country       String    @default("India")
  
  latitude      Float?
  longitude     Float?
  
  isDefault     Boolean   @default(false)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 8. Payment
Stores payment transaction details.

```prisma
model Payment {
  id            String    @id @default(cuid())
  orderId       String
  order         Order     @relation(fields: [orderId], references: [id])
  
  razorpayId    String?
  amount        Float
  currency      String    @default("INR")
  method        PaymentMethod // CARD, UPI, NETBANKING, WALLET
  
  status        PaymentStatus // PENDING, COMPLETED, FAILED
  failureReason String?
  
  receiptUrl    String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 9. Coupon
Stores discount coupons and offers.

```prisma
model Coupon {
  id            String    @id @default(cuid())
  code          String    @unique
  description   String?
  
  discountType  DiscountType // PERCENTAGE, FIXED
  discountValue Float
  maxDiscount   Float?
  
  minOrderValue Float     @default(0)
  maxUsageCount Int?
  usageCount    Int       @default(0)
  
  validFrom     DateTime
  validTill     DateTime
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 10. Store
Stores location/branch information.

```prisma
model Store {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  description   String?
  image         String?
  
  // Address
  street        String
  city          String
  state         String
  zipCode       String
  country       String    @default("India")
  latitude      Float
  longitude     Float
  
  // Contact
  phone         String
  email         String
  
  // Hours
  openingTime   String    @default("10:00")
  closingTime   String    @default("22:00")
  
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 11. Review
Stores customer reviews and ratings.

```prisma
model Review {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  productId     String
  product       Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  rating        Int       // 1-5
  title         String?
  comment       String
  image         String?
  
  isApproved    Boolean   @default(false)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 12. Blog
Stores blog posts and articles.

```prisma
model Blog {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  content       String    // Rich text/markdown
  excerpt       String?
  featuredImage String?
  
  author        String
  category      String
  tags          String[]
  
  // SEO
  metaTitle     String?
  metaDesc      String?
  
  published     Boolean   @default(false)
  viewCount     Int       @default(0)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 13. Gallery
Stores gallery images.

```prisma
model Gallery {
  id            String    @id @default(cuid())
  title         String
  image         String
  description   String?
  category      String?
  
  displayOrder  Int
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 14. FranchiseInquiry
Stores franchise partnership inquiries.

```prisma
model FranchiseInquiry {
  id            String    @id @default(cuid())
  name          String
  email         String
  phone         String
  city          String
  
  experience    String?
  investment    String?
  message       String?
  
  status        InquiryStatus @default(PENDING)
  notes         String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 15. Banner
Stores homepage banners.

```prisma
model Banner {
  id            String    @id @default(cuid())
  title         String
  image         String
  description   String?
  link          String?
  
  displayOrder  Int
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 16. Settings
Stores global website settings.

```prisma
model Settings {
  id            String    @id @default(cuid())
  key           String    @unique
  value         String
  description   String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## Enums

```prisma
enum Role {
  CUSTOMER
  ADMIN
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
  VIEWER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CARD
  UPI
  NETBANKING
  WALLET
  CASH
}

enum DeliveryType {
  PICKUP
  DELIVERY
}

enum AddressType {
  HOME
  OFFICE
  OTHER
}

enum DiscountType {
  PERCENTAGE
  FIXED
}

enum InquiryStatus {
  PENDING
  CONTACTED
  QUALIFIED
  REJECTED
}
```

## Indexes

Key indexes for performance:

```sql
-- User indexes
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_phone ON "User"(phone);

-- Order indexes
CREATE INDEX idx_order_user_id ON "Order"("userId");
CREATE INDEX idx_order_status ON "Order"(status);
CREATE INDEX idx_order_created_at ON "Order"("createdAt");

-- Product indexes
CREATE INDEX idx_product_category ON "Product"(category);
CREATE INDEX idx_product_slug ON "Product"(slug);

-- Blog indexes
CREATE INDEX idx_blog_slug ON "Blog"(slug);
CREATE INDEX idx_blog_published ON "Blog"(published);
```

## Relationships

```
User (1) ---> (Many) Order
User (1) ---> (Many) Address
User (1) ---> (Many) Review

Order (1) ---> (Many) OrderItem
Order (1) ---> (1) Payment
Order (1) ---> (1) Address

Product (1) ---> (Many) OrderItem
Product (1) ---> (Many) Review
Product (1) ---> (Many) ProductVariant

Admin (1) ---> (Many) Actions (Implicit)
```

## Database Seeding

Seed script location: `backend/prisma/seed.js`

Run seeding:
```bash
cd backend
npx prisma db seed
```

## Migrations

Create new migration:
```bash
cd backend
npx prisma migrate dev --name migration_name
```

View schema:
```bash
npx prisma studio
```

This comprehensive schema supports all features mentioned in the requirements. Adjust as needed based on specific business logic.
