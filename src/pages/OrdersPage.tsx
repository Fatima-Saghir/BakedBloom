import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, ShoppingBag, Eye, Calendar, Sparkles } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { OrderStatus } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';

export const OrdersPage: React.FC = () => {
  const { orders, loading } = useOrders();
  const [filter, setFilter] = useState<string>('All');

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Preparing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pending':
        return 'bg-cream-300 text-espresso-800 border-cream-400';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-cream-200 text-espresso-700';
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'All') return true;
    if (filter === 'Active') {
      return ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(order.status);
    }
    if (filter === 'Completed') return order.status === 'Delivered';
    if (filter === 'Cancelled') return order.status === 'Cancelled';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-cream-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bakery-peach/60 text-bakery-carameldark text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order History</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900">
            My Bakery Orders
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 mt-1">
            Track real-time baking progress, view past receipts, and leave product reviews.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Active', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                filter === f
                  ? 'bg-espresso-800 text-cream-50 shadow-sm'
                  : 'bg-white hover:bg-cream-200 text-espresso-700 border border-cream-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Retrieving your orders..." />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="You don't have any orders matching this filter. Explore our menu to place your first order!"
          actionText="Explore Bakery Menu"
          actionLink="/menu"
        />
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-cream-200/90 shadow-soft hover:shadow-soft-lg transition-all p-6 sm:p-8"
            >
              {/* Order Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cream-100">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-espresso-400 block">Order ID</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-espresso-900">{order.id}</span>
                  </div>

                  <div className="border-l border-cream-200 pl-3 sm:pl-6">
                    <span className="text-[10px] uppercase font-bold text-espresso-400 block">Date Placed</span>
                    <span className="text-xs sm:text-sm font-semibold text-espresso-700">{order.createdAt}</span>
                  </div>

                  <div className="border-l border-cream-200 pl-3 sm:pl-6">
                    <span className="text-[10px] uppercase font-bold text-espresso-400 block">Total</span>
                    <span className="text-xs sm:text-sm font-bold text-espresso-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>

                  <Link
                    to={`/orders/${order.id}`}
                    className="px-4 py-2 rounded-full bg-cream-100 hover:bg-espresso-800 hover:text-cream-50 text-espresso-800 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>

              {/* Order Products Preview */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-x-auto py-1 max-w-xl">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 bg-cream-50 rounded-2xl p-2 border border-cream-200 shrink-0">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div className="text-xs">
                        <p className="font-bold text-espresso-900 truncate max-w-[130px]">{item.name}</p>
                        <p className="text-espresso-500 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs font-bold text-bakery-carameldark px-2 shrink-0">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>

                <div className="text-right text-xs text-espresso-500">
                  <p>Method: <strong className="text-espresso-800">{order.deliveryMethod}</strong></p>
                  <p>Est: {order.estimatedDelivery}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
