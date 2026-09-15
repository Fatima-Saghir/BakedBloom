import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = ShoppingBag,
  title,
  description,
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-14 bg-white/70 backdrop-blur-sm rounded-3xl border border-cream-300 max-w-md mx-auto my-8 shadow-soft">
      <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center text-bakery-caramel mb-5 border border-cream-200 shadow-inner">
        <Icon className="w-10 h-10 stroke-[1.5]" />
      </div>
      <h3 className="text-2xl font-serif font-bold text-espresso-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-espresso-600 mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 text-sm font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 text-sm font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
