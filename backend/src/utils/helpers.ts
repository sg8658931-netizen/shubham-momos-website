export const generateOrderNumber = (): string => {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `OM-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${timestamp}${random}`;
};

export const generateCouponCode = (prefix = 'SAVE'): string => {
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}${random}`;
};

export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const calculateDiscount = (
  originalPrice: number,
  discountType: 'PERCENTAGE' | 'FIXED',
  discountValue: number
): number => {
  if (discountType === 'PERCENTAGE') {
    return (originalPrice * discountValue) / 100;
  }
  return discountValue;
};

export const calculateTax = (amount: number, taxRate = 5): number => {
  return (amount * taxRate) / 100;
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
};

export const getDistanceFromLatLng = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
