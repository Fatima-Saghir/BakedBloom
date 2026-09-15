import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { RatingStars } from './RatingStars';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl border border-cream-200/80 shadow-soft hover:shadow-soft-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-cream-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/berry-velvet-hero.svg';
          }}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-bakery-caramel text-white shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-bakery-rose text-white shadow-sm">
              New
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-espresso-700 shadow-sm border border-white/40">
            {product.category}
          </span>
        </div>

        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-espresso-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-espresso-900 text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-bakery-caramel" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-1.5">
            <RatingStars rating={product.rating} size="sm" />
            <span className="text-xs text-espresso-400 font-medium">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-bold text-espresso-900 line-clamp-1 group-hover:text-bakery-carameldark transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-espresso-600 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 mt-2 border-t border-cream-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-espresso-400 tracking-wider block">
              From
            </span>
            <span className="text-xl font-extrabold text-espresso-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-espresso-700 hover:text-espresso-900 transition"
              title="View Details"
              aria-label="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleAddToCart}
              className={`px-3.5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shadow-sm ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-espresso-800 hover:bg-espresso-900 text-cream-50 hover:shadow-md'
              }`}
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
