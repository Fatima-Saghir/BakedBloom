import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Package, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Truck
} from 'lucide-react';
import { Order } from '../types';
import { useOrders } from '../context/OrdersContext';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useOrders();

  // Get order from state or most recent order from context
  const order: Order | undefined = location.state?.order || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-espresso-900 mb-4">No recent order found</h2>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso-800 text-cream-50 font-bold text-xs"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Celebration Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft animate-bounce-short">
          <CheckCircle className="w-10 h-10 stroke-[2.2]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Confirmed & Scheduled for Baking</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-900">
          Order Placed Successfully!
        </h1>

        <p className="text-sm sm:text-base text-espresso-600 max-w-lg mx-auto">
          Thank you, <strong className="text-espresso-900">{order.customer.fullName}</strong>. Your artisanal treats have entered our baking schedule.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden mb-8">
        
        {/* Top Info Banner */}
        <div className="bg-cream-100 p-6 border-b border-cream-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-espresso-500 block uppercase font-bold text-[10px]">Order ID</span>
            <span className="font-mono text-base font-extrabold text-espresso-900">{order.id}</span>
          </div>

          <div>
            <span className="text-espresso-500 block uppercase font-bold text-[10px]">Order Status</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs inline-block">
              {order.status}
            </span>
          </div>

          <div>
            <span className="text-espresso-500 block uppercase font-bold text-[10px]">Est. Arrival / Pickup</span>
            <span className="font-bold text-espresso-900">{order.estimatedDelivery}</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Ordered Products */}
          <div>
            <h3 className="font-serif text-lg font-bold text-espresso-900 mb-4 pb-2 border-b border-cream-200">
              Ordered Confections ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>

            <div className="divide-y divide-cream-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border shrink-0" />
                    <div>
                      <p className="font-bold text-espresso-900 text-sm">{item.name}</p>
                      <p className="text-espresso-500">
                        Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''} {item.selectedFlavor ? `• ${item.selectedFlavor}` : ''}
                      </p>
                      {item.customMessage && (
                        <p className="text-bakery-carameldark italic text-[11px]">&ldquo;{item.customMessage}&rdquo;</p>
                      )}
                    </div>
                  </div>

                  <span className="font-bold text-espresso-900 text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-cream-200 text-xs">
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-espresso-900 text-sm">
                <Truck className="w-4 h-4 text-bakery-caramel" />
                <span>Delivery Method: {order.deliveryMethod}</span>
              </div>
              {order.deliveryMethod === 'Home Delivery' ? (
                <div className="text-espresso-600 space-y-1">
                  <p className="font-semibold text-espresso-800">{order.customer.fullName}</p>
                  <p>{order.customer.address}</p>
                  <p>{order.customer.city}, {order.customer.postalCode}</p>
                  <p>Phone: {order.customer.phone}</p>
                </div>
              ) : (
                <p className="text-espresso-600">
                  Bakery Boutique: 42 Blossom Boulevard, Gourmet Quarter, Bloomfield.
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-espresso-900 text-sm">
                <Clock className="w-4 h-4 text-bakery-caramel" />
                <span>Payment Summary</span>
              </div>
              <div className="text-espresso-600 space-y-1">
                <p>Method: <strong className="text-espresso-800">{order.paymentMethod}</strong></p>
                <p>Payment Status: <span className="font-bold text-emerald-700">{order.paymentStatus}</span></p>
                <div className="pt-2 flex justify-between font-bold text-sm text-espresso-900 border-t border-cream-200">
                  <span>Total Amount</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/orders"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs tracking-wider uppercase shadow-soft hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" />
          <span>View My Orders</span>
        </Link>

        <Link
          to="/menu"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-cream-50 text-espresso-900 border border-cream-300 font-bold text-xs tracking-wider uppercase shadow-sm transition flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 text-bakery-caramel" />
          <span>Continue Shopping</span>
        </Link>
      </div>

    </div>
  );
};
