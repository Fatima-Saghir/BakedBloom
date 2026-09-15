import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Tag, ArrowRight, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface OrderSummaryCardProps {
  showCheckoutButton?: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  showCheckoutButton = true,
}) => {
  const {
    subtotal,
    deliveryFee,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    total,
    items,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  const freeDeliveryThreshold = 50.0;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="bg-white rounded-3xl border border-cream-200/80 shadow-soft p-6 sm:p-8 sticky top-24">
      <h3 className="font-serif text-xl font-bold text-espresso-900 mb-5 pb-3 border-b border-cream-200">
        Order Summary
      </h3>

      {/* Free Delivery Meter */}
      <div className="mb-6 p-3.5 bg-cream-100 rounded-2xl border border-cream-200">
        {deliveryFee === 0 ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>You have qualified for <strong>FREE Delivery!</strong></span>
          </div>
        ) : (
          <div>
            <div className="flex justify-between text-xs text-espresso-700 font-medium mb-1.5">
              <span>Add <strong>${amountToFreeDelivery.toFixed(2)}</strong> for Free Delivery</span>
              <span>${subtotal.toFixed(2)} / $50.00</span>
            </div>
            <div className="w-full bg-cream-300 h-2 rounded-full overflow-hidden">
              <div
                className="bg-bakery-caramel h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3.5 text-sm text-espresso-700 pb-5 border-b border-cream-200">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-espresso-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            Delivery Fee
            {deliveryFee === 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                FREE
              </span>
            )}
          </span>
          <span className="font-bold text-espresso-900">
            {deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Discount ({couponCode})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Promo Code Input */}
      <div className="my-5">
        {couponCode ? (
          <div className="flex items-center justify-between p-3 bg-bakery-peach/40 border border-bakery-pink rounded-2xl text-xs font-semibold text-espresso-900">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-bakery-caramel" />
              <span>Promo &ldquo;<strong>{couponCode}</strong>&rdquo; applied</span>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 hover:text-rose-600 transition"
              title="Remove promo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Promo code (e.g. SWEET10)"
              className="flex-1 px-4 py-2.5 rounded-full border border-cream-300 text-xs text-espresso-900 placeholder-espresso-400 bg-cream-50 focus:outline-none focus:border-bakery-caramel transition uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-espresso-800 text-xs font-bold transition"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Total */}
      <div className="flex items-baseline justify-between py-4 border-t border-cream-200 mb-6">
        <div>
          <span className="font-serif text-lg font-bold text-espresso-900 block">Total</span>
          <span className="text-[11px] text-espresso-500">Including local taxes</span>
        </div>
        <span className="font-serif text-3xl font-extrabold text-espresso-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Action Buttons */}
      {showCheckoutButton && (
        <div className="space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            disabled={items.length === 0}
            className="w-full py-3.5 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 disabled:bg-espresso-300 text-cream-50 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/menu"
            className="block text-center text-xs font-bold text-espresso-600 hover:text-bakery-caramel transition py-1"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-6 pt-5 border-t border-cream-100 flex items-center justify-center gap-2 text-xs text-espresso-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Freshness Guaranteed & Secure Checkout</span>
      </div>
    </div>
  );
};
