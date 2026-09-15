import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { OrderSummaryCard } from '../components/cart/OrderSummaryCard';
import { EmptyState } from '../components/common/EmptyState';

export const CartPage: React.FC = () => {
  const { items, clearCart, totalItemsCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Pastry Basket is Empty"
          description="It looks like you haven't added any sweet confections to your basket yet. Our fresh batch is waiting for you!"
          actionText="Explore Our Menu"
          actionLink="/menu"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-cream-200">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900">
            Your Sweet Basket
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 mt-1">
            You have <strong className="text-espresso-900">{totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''}</strong> ready for baking & delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-espresso-700 hover:text-bakery-caramel transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Basket</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-cream-200/80 shadow-soft p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-cream-200 text-xs font-bold uppercase tracking-wider text-espresso-400">
            <span>Product Details</span>
            <span className="hidden sm:inline">Quantity & Total</span>
          </div>

          <div className="divide-y divide-cream-100">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Delivery Note Banner */}
          <div className="mt-8 p-4 rounded-2xl bg-cream-100/70 border border-cream-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-bakery-caramel shrink-0 mt-0.5" />
            <div className="text-xs text-espresso-700 leading-relaxed">
              <strong className="text-espresso-900 font-bold block mb-0.5">Custom Baking & Care</strong>
              Cakes and tarts are boxed in heavy thermal cake carriers with ice packs to ensure 100% pristine arrival at your doorstep.
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4">
          <OrderSummaryCard showCheckoutButton={true} />
        </div>

      </div>

    </div>
  );
};
