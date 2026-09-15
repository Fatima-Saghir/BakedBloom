export type ProductCategory = 
  | 'All'
  | 'Cakes'
  | 'Cupcakes'
  | 'Pastries'
  | 'Cookies'
  | 'Brownies'
  | 'Desserts';

export interface ProductSizeOption {
  name: string;
  priceMultiplier: number;
  serves?: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  description: string;
  fullDescription: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  ingredients: string[];
  allergens: string[];
  availableSizes?: ProductSizeOption[];
  availableFlavors?: string[];
  allowCustomMessage?: boolean;
  dietary?: string[];
  prepTime?: string;
}

export interface CartItem {
  id: string; // unique item instance id in cart (combination of product + options)
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  customMessage?: string;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  specialInstructions?: string;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryMethod: 'Home Delivery' | 'Pickup';
  paymentMethod: 'Cash on Delivery' | 'Online Payment';
  paymentStatus: 'Paid' | 'Pending COD';
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  avatar?: string;
}
