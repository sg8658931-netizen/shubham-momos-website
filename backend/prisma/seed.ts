import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Steamed Vegetable Momos',
        description: 'Delicious steamed dumplings filled with fresh vegetables',
        price: 199,
        originalPrice: 249,
        category: 'steamed',
        stock: 100,
        isAvailable: true,
        isPopular: true,
        slug: 'steamed-vegetable-momos',
        metaTitle: 'Steamed Vegetable Momos - Premium Quality',
        metaDesc: 'Fresh steamed dumplings with seasonal vegetables',
      },
      {
        name: 'Fried Chicken Momos',
        description: 'Crispy fried momos with tender chicken filling',
        price: 249,
        originalPrice: 299,
        category: 'fried',
        stock: 100,
        isAvailable: true,
        isPopular: true,
        slug: 'fried-chicken-momos',
        metaTitle: 'Fried Chicken Momos - Crispy & Delicious',
        metaDesc: 'Golden crispy fried dumplings with chicken',
      },
      {
        name: 'Paneer & Corn Momos',
        description: 'Delightful combination of paneer and corn in steamed momos',
        price: 219,
        originalPrice: 269,
        category: 'steamed',
        stock: 80,
        isAvailable: true,
        slug: 'paneer-corn-momos',
        metaTitle: 'Paneer & Corn Momos',
        metaDesc: 'Vegetarian delight with paneer and sweet corn',
      },
      {
        name: 'Tandoori Chicken Momos',
        description: 'Exotic tandoori spiced chicken in crispy fried momos',
        price: 279,
        originalPrice: 329,
        category: 'fried',
        stock: 60,
        isAvailable: true,
        isPopular: true,
        slug: 'tandoori-chicken-momos',
        metaTitle: 'Tandoori Chicken Momos',
        metaDesc: 'Spicy tandoori flavored fried momos',
      },
      {
        name: 'Chocolate Momos',
        description: 'Sweet dessert momos with rich chocolate filling',
        price: 149,
        originalPrice: 199,
        category: 'dessert',
        stock: 50,
        isAvailable: true,
        slug: 'chocolate-momos',
        metaTitle: 'Chocolate Momos - Sweet Treat',
        metaDesc: 'Delicious chocolate filled dessert dumplings',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${products.count} products`);

  // Create sample stores
  const stores = await prisma.store.createMany({
    data: [
      {
        name: 'Shubham Momos - MG Road',
        slug: 'shubham-momos-mg-road',
        description: 'Our flagship store at the heart of the city',
        street: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        phone: '+91-80-XXXX-XXXX',
        email: 'mgroad@shubhammomos.com',
        latitude: 12.9716,
        longitude: 77.5946,
        openingTime: '10:00',
        closingTime: '22:00',
        isOpen: true,
        isActive: true,
      },
      {
        name: 'Shubham Momos - Koramangala',
        slug: 'shubham-momos-koramangala',
        description: 'Modern outlet in the trendy Koramangala area',
        street: '456 Koramangala',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560034',
        phone: '+91-80-YYYY-YYYY',
        email: 'koramangala@shubhammomos.com',
        latitude: 12.9352,
        longitude: 77.6245,
        openingTime: '11:00',
        closingTime: '23:00',
        isOpen: true,
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${stores.count} stores`);

  // Create sample coupons
  const coupons = await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        description: 'Welcome discount for new customers',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderValue: 200,
        maxUsageCount: null,
        validFrom: new Date(),
        validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: 'SAVE20',
        description: '20% off on orders above 500',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        minOrderValue: 500,
        maxDiscount: 100,
        maxUsageCount: 100,
        validFrom: new Date(),
        validTill: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: 'FLAT50',
        description: 'Flat 50 off on all orders',
        discountType: 'FIXED',
        discountValue: 50,
        minOrderValue: 300,
        maxUsageCount: 50,
        validFrom: new Date(),
        validTill: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${coupons.count} coupons`);

  // Create sample banners
  const banners = await prisma.banner.createMany({
    data: [
      {
        title: 'Grand Opening Offer',
        image: '/images/banner-grand-opening.jpg',
        description: 'Get 30% off on your first order',
        link: '/menu',
        buttonText: 'Order Now',
        position: 'HERO',
        displayOrder: 1,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: 'New Tandoori Momos',
        image: '/images/banner-tandoori.jpg',
        description: 'Try our exclusive tandoori flavored momos',
        link: '/menu?category=fried',
        buttonText: 'View Menu',
        position: 'FEATURED',
        displayOrder: 2,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${banners.count} banners`);

  // Create sample testimonials
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: 'Raj Kumar',
        designation: 'Food Blogger',
        content: 'The best momos I have ever tasted! Absolutely delicious and authentic.',
        rating: 5,
        isApproved: true,
        displayOrder: 1,
      },
      {
        name: 'Priya Singh',
        designation: 'Regular Customer',
        content: 'Amazing quality, fast delivery, and great customer service!',
        rating: 5,
        isApproved: true,
        displayOrder: 2,
      },
      {
        name: 'Amit Patel',
        designation: 'Food Enthusiast',
        content: 'Premium quality ingredients with authentic taste. Highly recommended!',
        rating: 5,
        isApproved: true,
        displayOrder: 3,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${testimonials.count} testimonials`);

  // Create sample settings
  const settings = await prisma.settings.createMany({
    data: [
      {
        key: 'SITE_NAME',
        value: 'Shubham Momos',
        type: 'STRING',
        description: 'Website name',
      },
      {
        key: 'SITE_DESCRIPTION',
        value: 'Premium momo restaurant with world-class recipes',
        type: 'STRING',
        description: 'Website description',
      },
      {
        key: 'DELIVERY_FEE',
        value: '50',
        type: 'NUMBER',
        description: 'Default delivery fee',
      },
      {
        key: 'MIN_ORDER_VALUE',
        value: '200',
        type: 'NUMBER',
        description: 'Minimum order value',
      },
      {
        key: 'SUPPORT_EMAIL',
        value: 'support@shubhammomos.com',
        type: 'STRING',
        description: 'Support email address',
      },
      {
        key: 'SUPPORT_PHONE',
        value: '+91-80-XXXX-XXXX',
        type: 'STRING',
        description: 'Support phone number',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${settings.count} settings`);

  console.log('✨ Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
