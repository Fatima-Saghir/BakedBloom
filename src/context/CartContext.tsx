import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    options?: {
      selectedSize?: string;
      priceMultiplier?: number;
      selectedFlavor?: string;
      customMessage?: string;
      quantity?: number;
    }
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bakedbloom_cart_items';
const COUPON_STORAGE_KEY = 'bakedbloom_cart_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>(() => {
    return localStorage.getItem(COUPON_STORAGE_KEY) || '';
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart items', e);
    }
  }, [items]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [couponCode]);

  const addItem = (
    product: Product,
    options?: {
      selectedSize?: string;
      priceMultiplier?: number;
      selectedFlavor?: string;
      customMessage?: string;
      quantity?: number;
    }
  ) => {
    const qty = options?.quantity || 1;
    const multiplier = options?.priceMultiplier || 1.0;
    const finalPrice = Math.round(product.price * multiplier * 100) / 100;

    // Create unique key for item instance based on product id, size, flavor, and message
    const instanceKey = `${product.id}-${options?.selectedSize || 'default'}-${options?.selectedFlavor || 'default'}-${options?.customMessage || 'none'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === instanceKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        const newItem: CartItem = {
          id: instanceKey,
          productId: product.id,
          name: product.name,
          price: finalPrice,
          originalPrice: product.price,
          image: product.image,
          category: product.category,
          quantity: qty,
          selectedSize: options?.selectedSize,
          selectedFlavor: options?.selectedFlavor,
          customMessage: options?.customMessage,
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`Added "${product.name}" to your basket!`, 'success');
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from basket', 'info');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'SWEET10' || normalized === 'FIRSTBITE') {
      setCouponCode(normalized);
      showToast(`Coupon "${normalized}" applied for 10% off!`, 'success');
      return true;
    } else if (normalized === 'FREESHIP') {
      setCouponCode(normalized);
      showToast('Coupon "FREESHIP" applied for free shipping!', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try "SWEET10" for 10% off!', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    showToast('Coupon code removed', 'info');
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = Math.round(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
  ) / 100;

  // Free delivery over $50 or with FREESHIP coupon
  const deliveryFee =
    subtotal === 0
      ? 0
      : subtotal >= 50 || couponCode === 'FREESHIP'
      ? 0
      : 5.0;

  // Calculate discount
  let discount = 0;
  if (couponCode === 'SWEET10' || couponCode === 'FIRSTBITE') {
    discount = Math.round(subtotal * 0.1 * 100) / 100;
  }

  const total = Math.max(0, Math.round((subtotal + deliveryFee - discount) * 100) / 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
