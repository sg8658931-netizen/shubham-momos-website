# API Documentation - Shubham Momos Backend

## Base URL

```
https://api.shubhammomos.com/api
http://localhost:5000/api (Development)
```

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "error": null
}
```

## Error Codes

| Code | Message |
|------|----------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91999999999"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "firstName": "John",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login User
```
POST /auth/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user123",
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### Products

#### Get All Products
```
GET /products
```

**Query Parameters:**
- `category` - Filter by category
- `search` - Search by name
- `limit` - Items per page (default: 20)
- `page` - Page number (default: 1)
- `sort` - Sort field (price, rating, createdAt)
- `order` - asc or desc

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod123",
      "name": "Steamed Momos",
      "description": "Delicious steamed dumplings",
      "price": 199,
      "originalPrice": 249,
      "category": "steamed",
      "image": "https://...",
      "rating": 4.5,
      "reviews": 45,
      "stock": 100,
      "isAvailable": true
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

#### Get Product by ID
```
GET /products/:id
```

#### Create Product (Admin)
```
POST /products
```

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**
```json
{
  "name": "Steamed Momos",
  "description": "Delicious steamed dumplings",
  "price": 199,
  "category": "steamed",
  "stock": 100,
  "image": "image_url"
}
```

#### Update Product (Admin)
```
PUT /products/:id
```

#### Delete Product (Admin)
```
DELETE /products/:id
```

---

### Orders

#### Create Order
```
POST /orders
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "items": [
    {
      "productId": "prod123",
      "quantity": 2,
      "variantId": "var123" (optional)
    }
  ],
  "deliveryAddressId": "addr123",
  "deliveryType": "DELIVERY",
  "couponCode": "SAVE10" (optional),
  "notes": "Extra spice please"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order123",
    "orderNumber": "OM-20240101-001",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "total": 450,
    "items": [...],
    "razorpayOrderId": "order_ABC123"
  }
}
```

#### Get Order Details
```
GET /orders/:id
```

**Headers:** `Authorization: Bearer <token>`

#### Get User Orders
```
GET /orders
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` - Filter by status
- `limit` - Items per page
- `page` - Page number

#### Cancel Order
```
POST /orders/:id/cancel
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "reason": "Changed my mind"
}
```

---

### Payment

#### Initiate Payment
```
POST /payments/initiate
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "orderId": "order123",
  "method": "CARD"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_ABC123",
    "amount": 45000,
    "currency": "INR",
    "key": "rzp_live_123..."
  }
}
```

#### Verify Payment
```
POST /payments/verify
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "orderId": "order123",
  "razorpayPaymentId": "pay_123",
  "razorpaySignature": "9ef4dffbfd84f1318f6..."
}
```

---

### Addresses

#### Get User Addresses
```
GET /addresses
```

**Headers:** `Authorization: Bearer <token>`

#### Create Address
```
POST /addresses
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "type": "HOME",
  "street": "123 Main St",
  "city": "Bangalore",
  "state": "Karnataka",
  "zipCode": "560001",
  "isDefault": true,
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

#### Update Address
```
PUT /addresses/:id
```

#### Delete Address
```
DELETE /addresses/:id
```

---

### Coupons

#### Get Active Coupons
```
GET /coupons
```

#### Validate Coupon
```
POST /coupons/validate
```

**Request:**
```json
{
  "code": "SAVE10",
  "orderValue": 500
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "SAVE10",
    "discountType": "PERCENTAGE",
    "discountValue": 10,
    "discount": 50,
    "valid": true
  }
}
```

---

### Reviews

#### Get Product Reviews
```
GET /products/:id/reviews
```

#### Create Review
```
POST /reviews
```

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "productId": "prod123",
  "rating": 5,
  "title": "Absolutely delicious!",
  "comment": "Best momos I've ever had",
  "image": "image_url" (optional)
}
```

---

### Stores

#### Get All Stores
```
GET /stores
```

#### Get Store by ID
```
GET /stores/:id
```

#### Find Nearest Store
```
GET /stores/nearest
```

**Query Parameters:**
- `latitude` - User latitude
- `longitude` - User longitude

---

### Franchise

#### Submit Franchise Inquiry
```
POST /franchise/inquiries
```

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91999999999",
  "city": "Bangalore",
  "experience": "5 years in food business",
  "investment": "50 lakhs",
  "message": "Interested in opening a franchise"
}
```

---

### Admin Endpoints

#### Dashboard Stats
```
GET /admin/dashboard/stats
```

**Headers:** `Authorization: Bearer <admin-token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 1250,
    "totalRevenue": 625000,
    "totalCustomers": 450,
    "pendingOrders": 23,
    "todayRevenue": 45000
  }
}
```

#### Get All Orders (Admin)
```
GET /admin/orders
```

#### Update Order Status (Admin)
```
PUT /admin/orders/:id/status
```

**Request:**
```json
{
  "status": "PREPARING"
}
```

#### Create Banner (Admin)
```
POST /admin/banners
```

#### Get Blog Posts (Admin)
```
GET /admin/blog
```

#### Create/Update Settings (Admin)
```
PUT /admin/settings/:key
```

---

## Rate Limiting

- General endpoints: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Admin endpoints: 50 requests per 15 minutes

## Pagination

All list endpoints support pagination with query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

## Sorting

Sort parameter format: `-fieldName` for descending, `fieldName` for ascending

Example: `/products?sort=-createdAt` (latest first)

## Filtering

Multiple filters can be combined:

Example: `/orders?status=PENDING&paymentStatus=COMPLETED`

---

For more details, see the Postman collection: [Shubham Momos API]()
