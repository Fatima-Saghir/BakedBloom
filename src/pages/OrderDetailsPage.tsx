import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Truck, 
  Package, 
  Printer, 
  MapPin, 
  CreditCard, 
  Star,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { OrderStatus } from '../types';
import { EmptyState } from '../components/common/EmptyState';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();

  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={Package}
          title="Order Not Found"
          description={`We couldn't locate order "${id}". Please check your order ID or view your orders history.`}
          actionText="Back to My Orders"
          actionLink="/orders"
        />
      </div>
    );
  }

  const timelineSteps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Confirmed', label: 'Order Placed & Confirmed', desc: 'Order reviewed & ingredients reserved' },
    { status: 'Preparing', label: 'In the Oven & Decorating', desc: 'Handcrafted by our pastry team' },
    { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'In climate-controlled transport' },
    { status: 'Delivered', label: 'Delivered / Picked Up', desc: 'Enjoy your sweet indulgence' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Preparing':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      case 'Cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex(order.status);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header & Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream-200">
        <div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-espresso-600 hover:text-bakery-caramel transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-extrabold text-espresso-900">
              Order {order.id}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cream-200 text-espresso-800">
              {order.status}
            </span>
          </div>
          <p className="text-xs text-espresso-500 mt-1">Placed on {order.createdAt}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-espresso-800 text-xs font-bold transition flex items-center gap-1.5 border border-cream-300"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          {order.status === 'Delivered' && (
            <Link
              to={`/reviews?productId=${order.items[0]?.productId || ''}`}
              className="px-4 py-2 rounded-full bg-bakery-caramel hover:bg-bakery-carameldark text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Write a Review</span>
            </Link>
          )}
        </div>
      </div>

      {/* PROGRESS TRACKER / TIMELINE */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft">
        <h2 className="font-serif text-lg font-bold text-espresso-900 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-bakery-caramel" />
          <span>Live Order Tracking</span>
        </h2>

        {order.status === 'Cancelled' ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            This order was cancelled. If you have questions, please contact our support team.
          </div>
        ) : (
          <div className="relative">
            {/* Horizontal Timeline on Desktop */}
            <div className="hidden md:grid grid-cols-4 gap-4 relative">
              {/* Connecting Bar */}
              <div className="absolute top-5 left-8 right-8 h-1 bg-cream-200 -z-0">
                <div
                  className="bg-bakery-caramel h-full transition-all duration-500"
                  style={{
                    width: `${Math.max(0, Math.min(100, ((currentStep - 1) / 3) * 100))}%`,
                  }}
                />
              </div>

              {timelineSteps.map((step, idx) => {
                const isPassed = currentStep > idx;
                const isCurrent = currentStep === idx + 1;
                return (
                  <div key={step.label} className="flex flex-col items-center text-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                        isPassed
                          ? 'bg-bakery-carameldark text-white'
                          : isCurrent
                          ? 'bg-bakery-caramel text-white ring-4 ring-bakery-peach animate-pulse'
                          : 'bg-cream-200 text-espresso-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-5 h-5 stroke-[2.5]" /> : idx + 1}
                    </div>
                    <p className="font-bold text-xs text-espresso-900 mt-3">{step.label}</p>
                    <p className="text-[10px] text-espresso-500 mt-0.5 max-w-[130px]">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Vertical Timeline on Mobile */}
            <div className="md:hidden space-y-6 relative pl-6 border-l-2 border-cream-300">
              {timelineSteps.map((step, idx) => {
                const isPassed = currentStep > idx;
                const isCurrent = currentStep === idx + 1;
                return (
                  <div key={step.label} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPassed
                          ? 'bg-bakery-carameldark text-white'
                          : isCurrent
                          ? 'bg-bakery-caramel text-white ring-2 ring-bakery-peach'
                          : 'bg-cream-200 text-espresso-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
                    </div>
                    <p className="font-bold text-xs text-espresso-900">{step.label}</p>
                    <p className="text-[11px] text-espresso-500">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ITEMS LIST */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft">
        <h2 className="font-serif text-lg font-bold text-espresso-900 mb-4 pb-2 border-b border-cream-200">
          Items in this Order
        </h2>

        <div className="divide-y divide-cream-100">
          {order.items.map((it) => (
            <div key={it.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <img src={it.image} alt={it.name} className="w-16 h-16 rounded-2xl object-cover border border-cream-200 shrink-0" />
                <div>
                  <Link
                    to={`/product/${it.productId}`}
                    className="font-bold text-sm text-espresso-900 hover:text-bakery-caramel transition"
                  >
                    {it.name}
                  </Link>
                  <p className="text-espresso-500 text-xs mt-0.5">
                    Category: {it.category}
                  </p>
                  {it.selectedSize && (
                    <span className="inline-block bg-cream-100 px-2 py-0.5 rounded text-[11px] text-espresso-700 mr-2 mt-1">
                      Size: {it.selectedSize}
                    </span>
                  )}
                  {it.selectedFlavor && (
                    <span className="inline-block bg-cream-100 px-2 py-0.5 rounded text-[11px] text-espresso-700 mr-2 mt-1">
                      Flavor: {it.selectedFlavor}
                    </span>
                  )}
                  {it.customMessage && (
                    <p className="text-bakery-carameldark italic mt-1">
                      Message: &ldquo;{it.customMessage}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right sm:min-w-[120px]">
                <span className="block font-bold text-sm text-espresso-900">
                  ${(it.price * it.quantity).toFixed(2)}
                </span>
                <span className="text-espresso-500 text-[11px]">
                  {it.quantity} × ${it.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 pt-4 border-t border-cream-200 max-w-xs ml-auto space-y-2 text-xs text-espresso-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-espresso-900">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="font-semibold text-espresso-900">
              {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Discount</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-cream-200 text-base font-serif font-extrabold text-espresso-900">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Customer, Delivery & Payment Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-3 text-xs">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-espresso-900 pb-2 border-b border-cream-100">
            <MapPin className="w-4 h-4 text-bakery-caramel" />
            <span>Delivery & Customer Details</span>
          </div>
          <p className="font-bold text-espresso-900">{order.customer.fullName}</p>
          <p className="text-espresso-600">{order.customer.email}</p>
          <p className="text-espresso-600">{order.customer.phone}</p>
          {order.deliveryMethod === 'Home Delivery' ? (
            <div className="pt-2 text-espresso-700 border-t border-cream-100">
              <p className="font-semibold">Shipping Address:</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.postalCode}</p>
            </div>
          ) : (
            <p className="text-espresso-600">Bakery In-Store Pickup</p>
          )}
          {order.customer.specialInstructions && (
            <p className="pt-2 text-bakery-carameldark italic border-t border-cream-100">
              Notes: &ldquo;{order.customer.specialInstructions}&rdquo;
            </p>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-3 text-xs">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-espresso-900 pb-2 border-b border-cream-100">
            <CreditCard className="w-4 h-4 text-bakery-caramel" />
            <span>Payment & Delivery Window</span>
          </div>
          <p><span className="text-espresso-500">Payment Method:</span> <strong className="text-espresso-900">{order.paymentMethod}</strong></p>
          <p><span className="text-espresso-500">Payment Status:</span> <strong className="text-emerald-700">{order.paymentStatus}</strong></p>
          <p><span className="text-espresso-500">Estimated Slot:</span> <strong className="text-espresso-900">{order.estimatedDelivery}</strong></p>
          <p><span className="text-espresso-500">Method:</span> <strong className="text-espresso-900">{order.deliveryMethod}</strong></p>
        </div>
      </div>

    </div>
  );
};
