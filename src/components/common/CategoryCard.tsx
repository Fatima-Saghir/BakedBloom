import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  itemCount: number;
  image: string;
  path: string;
  tagline: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  itemCount,
  image,
  path,
  tagline,
}) => {
  return (
    <Link
      to={path}
      className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square flex flex-col justify-end p-6 border border-cream-200/60 shadow-soft hover:shadow-soft-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/images/berry-velvet-hero.svg';
        }}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Warm Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-900/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-cream-50 flex flex-col">
        <span className="text-[11px] font-bold uppercase tracking-wider text-bakery-peach mb-1">
          {itemCount} Delicacies
        </span>
        <h3 className="font-serif text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-bakery-peach transition-colors">
          {name}
        </h3>
        <p className="text-xs text-cream-200 line-clamp-1 mb-3">
          {tagline}
        </p>

        <div className="flex items-center gap-1.5 text-xs font-bold text-bakery-caramel group-hover:text-white transition-colors">
          <span>Discover Category</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
