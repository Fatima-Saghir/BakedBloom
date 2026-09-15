import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Truck, 
  Store, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, discount, total, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const { showToast } = useToast();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Bloomfield',
    postalCode: user?.postalCode || '90210',
    specialInstructions: '',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    deliveryTimeSlot: '11:00 AM - 2:00 PM',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'Home Delivery' | 'Pickup'>('Home Delivery');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Online Payment'>('Online Payment');

  // Simulated card fields
  const [cardData, setCardData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardName: user?.name || 'Fatima Al-Zahra',
    expiry: '08/28',
    cvv: '888',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync user details if user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone || '',
        address: prev.address || user.address || '',
        city: prev.city || user.city || 'Bloomfield',
        postalCode: prev.postalCode || user.postalCode || '90210',
      }));
    }
  }, [user]);

  const validateForm = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7) errs.phone = 'Valid phone number is required';

    if (deliveryMethod === 'Home Delivery') {
      if (!formData.address.trim()) errs.address = 'Street address is required';
      if (!formData.city.trim()) errs.city = 'City is required';
      if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';
    }

    if (paymentMethod === 'Online Payment') {
      if (!cardData.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      if (!cardData.expiry.trim()) errs.expiry = 'Expiry date is required';
      if (!cardData.cvv.trim()) errs.cvv = 'CVV is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const effectiveDeliveryFee = deliveryMethod === 'Pickup' ? 0 : deliveryFee;
  const finalTotal = Math.max(0, Math.round((subtotal + effectiveDeliveryFee - discount) * 100) / 100);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the errors in the form before proceeding.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const createdOrder = await placeOrder({
        customer: formData,
        items,
        subtotal,
        deliveryFee: effectiveDeliveryFee,
        discount,
        total: finalTotal,
        deliveryMethod,
        paymentMethod,
        paymentStatus: paymentMethod === 'Online Payment' ? 'Paid' : 'Pending COD',
        estimatedDelivery: `${formData.deliveryDate} during ${formData.deliveryTimeSlot}`,
      });

      // Clear cart
      clearCart();

      // Navigate to order confirmation page
      navigate('/order-success', { state: { order: createdOrder } });
    } catch (err) {
      console.error(err);
      showToast('Order placement failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-espresso-600 hover:text-bakery-caramel transition mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Sweet Basket</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900">
          Checkout & Finalize Order
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* STEP 1: DELIVERY METHOD */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-4">
            <h2 className="font-serif text-xl font-bold text-espresso-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-bakery-peach text-bakery-carameldark text-xs flex items-center justify-center font-bold">1</span>
              Delivery Option
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setDeliveryMethod('Home Delivery')}
                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                  deliveryMethod === 'Home Delivery'
                    ? 'border-bakery-caramel bg-bakery-peach/20 shadow-sm'
                    : 'border-cream-300 hover:bg-cream-100/50'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-bakery-peach/50 text-bakery-carameldark shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-espresso-900">Doorstep Delivery</h3>
                  <p className="text-xs text-espresso-600 mt-1">
                    Temperature-controlled courier direct to your doorstep.
                  </p>
                  <span className="inline-block mt-2 text-xs font-bold text-bakery-carameldark">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('Pickup')}
                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                  deliveryMethod === 'Pickup'
                    ? 'border-bakery-caramel bg-bakery-peach/20 shadow-sm'
                    : 'border-cream-300 hover:bg-cream-100/50'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-bakery-peach/50 text-bakery-carameldark shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-espresso-900">In-Store Bakery Pickup</h3>
                  <p className="text-xs text-espresso-600 mt-1">
                    Ready for pickup at 42 Blossom Blvd boutique.
                  </p>
                  <span className="inline-block mt-2 text-xs font-bold text-emerald-700">
                    Complimentary (Free)
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* STEP 2: CUSTOMER CONTACT & ADDRESS */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-bold text-espresso-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-bakery-peach text-bakery-carameldark text-xs flex items-center justify-center font-bold">2</span>
              Customer Details & Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className={`w-full px-4 py-2.5 rounded-2xl bg-cream-50 border text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-cream-300'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. eleanor@example.com"
                  className={`w-full px-4 py-2.5 rounded-2xl bg-cream-50 border text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition ${
                    errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-cream-300'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Phone Number * (for delivery SMS updates)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 (555) 234-5678"
                  className={`w-full px-4 py-2.5 rounded-2xl bg-cream-50 border text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition ${
                    errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-cream-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Address fields only needed if Home Delivery */}
            {deliveryMethod === 'Home Delivery' && (
              <div className="space-y-4 pt-2 border-t border-cream-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                    Street Address & Apartment / Suite *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className={`w-full px-4 py-2.5 rounded-2xl bg-cream-50 border text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition ${
                      errors.address ? 'border-rose-400 bg-rose-50/40' : 'border-cream-300'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bloomfield"
                      className={`w-full px-4 py-2.5 rounded-2xl bg-cream-50 border text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition ${
                        errors.city ? 'border-rose-400 bg-rose-50/40' : 'border-cream-300'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                      Postal Code / ZIP *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="e.g. 90210"
                      className={`w-full px-4 py-2.5 rounded-2xl bg-cream-50 border text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition ${
                        errors.postalCode ? 'border-rose-400 bg-rose-50/40' : 'border-cream-300'
                      }`}
                    />
                    {errors.postalCode && <p className="text-[11px] text-rose-600 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-cream-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Requested Date *
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                  Preferred Time Window *
                </label>
                <select
                  value={formData.deliveryTimeSlot}
                  onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition cursor-pointer"
                >
                  <option value="9:00 AM - 12:00 PM">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="12:00 PM - 3:00 PM">Afternoon (12:00 PM - 3:00 PM)</option>
                  <option value="3:00 PM - 6:00 PM">Late Afternoon (3:00 PM - 6:00 PM)</option>
                  <option value="6:00 PM - 8:00 PM">Evening (6:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
                Special Delivery Notes or Gate Codes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                placeholder="e.g. Ring bell twice, leave with concierge if unavailable"
                className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
              />
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-5">
            <h2 className="font-serif text-xl font-bold text-espresso-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-bakery-peach text-bakery-carameldark text-xs flex items-center justify-center font-bold">3</span>
              Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('Online Payment')}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                  paymentMethod === 'Online Payment'
                    ? 'border-bakery-caramel bg-bakery-peach/20 shadow-sm'
                    : 'border-cream-300 hover:bg-cream-100/50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-bakery-carameldark shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-espresso-900">Online Card / Digital Pay</h4>
                  <p className="text-[11px] text-espresso-500">Instant & contactless</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-bakery-caramel bg-bakery-peach/20 shadow-sm'
                    : 'border-cream-300 hover:bg-cream-100/50'
                }`}
              >
                <Banknote className="w-5 h-5 text-bakery-carameldark shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-espresso-900">Cash on Delivery</h4>
                  <p className="text-[11px] text-espresso-500">Pay when order arrives</p>
                </div>
              </button>
            </div>

            {/* Online payment card fields simulation */}
            {paymentMethod === 'Online Payment' && (
              <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between text-xs text-espresso-600">
                  <span className="font-bold uppercase tracking-wider text-espresso-800">Simulated Card Gateway</span>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> 256-bit Encrypted
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-espresso-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-cream-300 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-espresso-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-xl bg-white border border-cream-300 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-espresso-700 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white border border-cream-300 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Review Sidebar & Place Order Button */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-5 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-espresso-900 pb-3 border-b border-cream-200">
              Order Review ({items.length} item{items.length !== 1 ? 's' : ''})
            </h3>

            {/* Items list preview */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-cream-100">
              {items.map((it) => (
                <div key={it.id} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={it.image} alt={it.name} className="w-10 h-10 rounded-lg object-cover border shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-espresso-900 truncate">{it.name}</p>
                      <p className="text-[10px] text-espresso-500">Qty: {it.quantity} {it.selectedSize ? `• ${it.selectedSize}` : ''}</p>
                    </div>
                  </div>
                  <span className="font-bold text-espresso-900 shrink-0 ml-2">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-cream-200 text-xs text-espresso-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-espresso-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold text-espresso-900">
                  {effectiveDeliveryFee === 0 ? 'FREE' : `$${effectiveDeliveryFee.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-cream-200 text-base font-serif font-extrabold text-espresso-900">
                <span>Total Due</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full bg-bakery-caramel hover:bg-bakery-carameldark disabled:bg-cream-400 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <span>Place Order • ${finalTotal.toFixed(2)}</span>
              )}
            </button>

            <p className="text-[11px] text-center text-espresso-500 leading-snug">
              By placing your order, you agree to BakedBloom’s baking policy and freshness terms.
            </p>
          </div>
        </div>

      </form>

    </div>
  );
};
