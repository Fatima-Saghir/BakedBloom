import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  MessageSquarePlus, 
  Sparkles, 
  Filter, 
  Send,
  Lock,
  UserCheck
} from 'lucide-react';
import { useReviews } from '../context/ReviewsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { RatingStars } from '../components/common/RatingStars';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { apiService } from '../services/api';
import { Product } from '../types';

export const ReviewsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedProductId = searchParams.get('productId') || '';

  const { reviews, loading, addReview, averageRating, totalReviews, distribution } = useReviews();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Review Form State
  const [formData, setFormData] = useState({
    productId: preselectedProductId,
    productName: '',
    rating: 5,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiService.getProducts();
      setProducts(data);
      if (preselectedProductId) {
        const found = data.find((p) => p.id === preselectedProductId);
        if (found) {
          setFormData((prev) => ({
            ...prev,
            productId: found.id,
            productName: found.name,
          }));
          setIsModalOpen(true);
        }
      }
    };
    fetchProducts();
  }, [preselectedProductId]);

  const handleProductChange = (productId: string) => {
    const found = products.find((p) => p.id === productId);
    setFormData((prev) => ({
      ...prev,
      productId,
      productName: found ? found.name : 'Artisanal Selection',
    }));
  };

  const handleOpenReviewModal = () => {
    if (!isAuthenticated) {
      showToast('Please log in to submit a verified customer review.', 'info');
      return;
    }
    if (!formData.productName && products.length > 0) {
      setFormData((prev) => ({
        ...prev,
        productId: products[0].id,
        productName: products[0].name,
      }));
    }
    setIsModalOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comment.trim()) {
      showToast('Please enter your review text.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await addReview({
        productId: formData.productId || undefined,
        productName: formData.productName || 'Artisanal Delight',
        customerName: user?.name || 'Verified Sweet Lover',
        customerAvatar: user?.avatar,
        rating: formData.rating,
        comment: formData.comment,
      });

      setFormData({
        productId: '',
        productName: '',
        rating: 5,
        comment: '',
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (starFilter === null) return true;
    return Math.round(r.rating) === starFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-bakery-peach/70 border border-bakery-pink text-espresso-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-bakery-caramel" />
          <span>Real Experiences & Testimonials</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-900">
          Customer Love & Reviews
        </h1>
        <p className="text-sm sm:text-base text-espresso-600">
          Read verified feedback from patrons across the country who have shared their birthdays, weddings, and morning coffee rituals with BakedBloom.
        </p>
      </div>

      {/* TOP RATING SUMMARY CARD */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Overall Score */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center lg:border-r border-cream-200 lg:pr-8">
          <span className="font-serif text-6xl font-extrabold text-espresso-900">
            {averageRating.toFixed(1)}
          </span>
          <div className="my-2">
            <RatingStars rating={averageRating} size="lg" />
          </div>
          <p className="text-xs font-semibold text-espresso-600">
            Overall score based on <strong className="text-espresso-900">{totalReviews} verified reviews</strong>
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> 100% Verified Customers
          </div>
        </div>

        {/* Center: 5-Star Distribution Bars */}
        <div className="lg:col-span-5 space-y-2.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const pct = distribution[stars] || 0;
            return (
              <button
                key={stars}
                onClick={() => setStarFilter(starFilter === stars ? null : stars)}
                className={`w-full flex items-center gap-3 text-xs p-1.5 rounded-xl transition hover:bg-cream-100 ${
                  starFilter === stars ? 'bg-bakery-peach/40 font-bold' : ''
                }`}
              >
                <span className="w-12 text-left font-semibold text-espresso-700">{stars} Stars</span>
                <div className="flex-1 bg-cream-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-espresso-500 font-mono text-[11px]">{pct}%</span>
              </button>
            );
          })}
        </div>

        {/* Right: Write Review CTA */}
        <div className="lg:col-span-3 flex flex-col items-center text-center space-y-4 lg:border-l border-cream-200 lg:pl-8">
          <div className="w-12 h-12 rounded-2xl bg-bakery-peach text-bakery-carameldark flex items-center justify-center shadow-sm">
            <MessageSquarePlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-espresso-900">Enjoyed Our Bakes?</h3>
            <p className="text-xs text-espresso-500 mt-1">
              Help fellow dessert lovers find their next craving.
            </p>
          </div>

          <button
            onClick={handleOpenReviewModal}
            className="w-full py-3 px-5 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs shadow-sm hover:shadow transition flex items-center justify-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

      </div>

      {/* REVIEWS LIST SECTION */}
      <div className="space-y-6">
        
        {/* Filter bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-cream-200">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-espresso-800 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            <button
              onClick={() => setStarFilter(null)}
              className={`px-3 py-1.5 rounded-full font-semibold transition ${
                starFilter === null
                  ? 'bg-espresso-800 text-cream-50'
                  : 'bg-cream-200 text-espresso-700 hover:bg-cream-300'
              }`}
            >
              All Stars ({totalReviews})
            </button>
            {[5, 4, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStarFilter(starFilter === s ? null : s)}
                className={`px-3 py-1.5 rounded-full font-semibold transition ${
                  starFilter === s
                    ? 'bg-espresso-800 text-cream-50'
                    : 'bg-cream-200 text-espresso-700 hover:bg-cream-300'
                }`}
              >
                {s} Stars
              </button>
            ))}
          </div>

          <p className="text-xs text-espresso-500 font-medium">
            Showing <strong className="text-espresso-900">{filteredReviews.length}</strong> reviews
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading verified customer reviews..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-cream-200/90 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <RatingStars rating={rev.rating} size="sm" />
                    <span className="text-[11px] text-espresso-400 font-medium">{rev.date}</span>
                  </div>

                  {rev.productName && (
                    <div className="mb-2">
                      <span className="text-[10px] uppercase font-bold text-bakery-carameldark block">Purchased</span>
                      <p className="text-xs font-bold text-espresso-900 truncate">{rev.productName}</p>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed italic mt-3">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-5 mt-5 border-t border-cream-100">
                  {rev.customerAvatar ? (
                    <img
                      src={rev.customerAvatar}
                      alt={rev.customerName}
                      className="w-9 h-9 rounded-full object-cover border border-bakery-pink shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-bakery-peach text-bakery-carameldark font-bold text-xs flex items-center justify-center shrink-0">
                      {rev.customerName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-espresso-900 truncate">
                      {rev.customerName}
                    </h4>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* WRITE REVIEW MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Customer Review"
        maxWidth="md"
      >
        <form onSubmit={handleSubmitReview} className="space-y-5">
          
          <div className="p-3 bg-cream-100 rounded-2xl flex items-center gap-3 text-xs text-espresso-700">
            <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Posting as <strong>{user?.name || 'Verified Customer'}</strong></span>
          </div>

          {/* Product Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Select Product *
            </label>
            <select
              value={formData.productId}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition cursor-pointer"
            >
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} ({prod.category})
                </option>
              ))}
            </select>
          </div>

          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-2">
              Your Rating *
            </label>
            <div className="flex items-center gap-3 bg-cream-50 p-3 rounded-2xl border border-cream-200">
              <RatingStars
                rating={formData.rating}
                interactive={true}
                size="lg"
                onRatingChange={(newVal) => setFormData({ ...formData, rating: newVal })}
              />
              <span className="text-xs font-bold text-espresso-800">
                {formData.rating} Star{formData.rating !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Review Comments *
            </label>
            <textarea
              rows={4}
              required
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Tell us about the flavor, texture, freshness, and delivery experience..."
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-cream-300 text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-espresso-600 hover:bg-cream-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-espresso-800 hover:bg-espresso-900 disabled:bg-cream-400 text-cream-50 text-xs font-bold shadow-md hover:shadow transition flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Publishing...' : 'Submit Review'}</span>
            </button>
          </div>

        </form>
      </Modal>

    </div>
  );
};
