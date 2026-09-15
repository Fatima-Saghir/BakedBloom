import { Product, Order, Review, User } from '../types';
import { mockProducts } from '../data/mockProducts';
import { initialReviews } from '../data/mockReviews';
import { initialOrders } from '../data/mockOrders';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// LocalStorage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'bakedbloom_products',
  ORDERS: 'bakedbloom_orders',
  REVIEWS: 'bakedbloom_reviews',
  USER: 'bakedbloom_user',
  CART: 'bakedbloom_cart',
};

// Helper to initialize local data if not yet seeded
function initializeLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialReviews));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initialOrders));
  }
}

initializeLocalStorage();

export const apiService = {
  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API fetch failed, falling back to local products store:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return local ? JSON.parse(local) : mockProducts;
  },

  async getProductById(id: string): Promise<Product | null> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API fetch failed, falling back to local product store:', err);
      }
    }
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  // REVIEWS
  async getReviews(): Promise<Review[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API fetch failed, falling back to local reviews store:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return local ? JSON.parse(local) : initialReviews;
  },

  async submitReview(review: Omit<Review, 'id' | 'date'>): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      verifiedPurchase: true
    };

    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview)
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API post failed, saving review locally:', err);
      }
    }

    const currentReviews = await this.getReviews();
    const updated = [newReview, ...currentReviews];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
    return newReview;
  },

  // ORDERS
  async getOrders(): Promise<Order[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API fetch failed, falling back to local orders store:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return local ? JSON.parse(local) : initialOrders;
  },

  async getOrderById(id: string): Promise<Order | null> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API fetch failed, falling back to local order store:', err);
      }
    }
    const orders = await this.getOrders();
    return orders.find(o => o.id.toLowerCase() === id.toLowerCase()) || null;
  },

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `BB-${randomNum}`,
      status: 'Confirmed',
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
    };

    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API post failed, saving order locally:', err);
      }
    }

    const currentOrders = await this.getOrders();
    const updated = [newOrder, ...currentOrders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    return newOrder;
  },

  // USER / AUTH
  getCurrentUser(): User | null {
    const local = localStorage.getItem(STORAGE_KEYS.USER);
    if (!local) return null;
    try {
      return JSON.parse(local);
    } catch {
      return null;
    }
  },

  saveUser(user: User | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }
};
