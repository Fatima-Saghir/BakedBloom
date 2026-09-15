import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review } from '../types';
import { apiService } from '../services/api';
import { useToast } from './ToastContext';

interface ReviewsContextType {
  reviews: Review[];
  loading: boolean;
  addReview: (data: {
    productId?: string;
    productName: string;
    customerName: string;
    customerAvatar?: string;
    rating: number;
    comment: string;
  }) => Promise<Review>;
  averageRating: number;
  totalReviews: number;
  distribution: { [stars: number]: number }; // percentage for 5, 4, 3, 2, 1
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await apiService.getReviews();
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async (data: {
    productId?: string;
    productName: string;
    customerName: string;
    customerAvatar?: string;
    rating: number;
    comment: string;
  }): Promise<Review> => {
    try {
      const created = await apiService.submitReview({
        ...data,
        verifiedPurchase: true,
      });
      setReviews((prev) => [created, ...prev]);
      showToast('Thank you! Your review has been published.', 'success');
      return created;
    } catch (err) {
      showToast('Could not submit review. Please try again.', 'error');
      throw err;
    }
  };

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? Math.round(
          (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews) * 10
        ) / 10
      : 5.0;

  const counts: { [stars: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    counts[star] = (counts[star] || 0) + 1;
  });

  const distribution: { [stars: number]: number } = {
    5: totalReviews ? Math.round((counts[5] / totalReviews) * 100) : 0,
    4: totalReviews ? Math.round((counts[4] / totalReviews) * 100) : 0,
    3: totalReviews ? Math.round((counts[3] / totalReviews) * 100) : 0,
    2: totalReviews ? Math.round((counts[2] / totalReviews) * 100) : 0,
    1: totalReviews ? Math.round((counts[1] / totalReviews) * 100) : 0,
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        loading,
        addReview,
        averageRating,
        totalReviews,
        distribution,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = (): ReviewsContextType => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
