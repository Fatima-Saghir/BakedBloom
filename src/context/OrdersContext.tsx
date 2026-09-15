import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '../types';
import { apiService } from '../services/api';
import { useToast } from './ToastContext';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  getOrderById: (id: string) => Order | undefined;
  refreshOrders: () => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    try {
      const created = await apiService.createOrder(orderData);
      setOrders((prev) => [created, ...prev]);
      showToast(`Order ${created.id} placed successfully!`, 'success');
      return created;
    } catch (err) {
      showToast('Failed to place order. Please try again.', 'error');
      throw err;
    }
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
        getOrderById,
        refreshOrders: fetchOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
