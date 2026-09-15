import React from 'react';
import { Cake } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Freshly baking your view...',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" role="status">
      <div className="relative flex items-center justify-center mb-3">
        <div className="absolute inset-0 rounded-full border-2 border-bakery-pink border-t-bakery-caramel animate-spin" />
        <div className="p-3 bg-cream-50 rounded-full text-bakery-rose animate-pulse">
          <Cake className={iconSizes[size]} />
        </div>
      </div>
      {text && <p className="text-sm font-medium text-espresso-600 font-sans tracking-wide">{text}</p>}
    </div>
  );
};
