import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 border-b border-cream-200/80 last:border-b-0 transition-colors">
      {/* Product Image */}
      <Link
        to={`/product/${item.productId}`}
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-cream-200 shrink-0 border border-cream-300 group"
      >
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/berry-velvet-hero.svg';
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase font-bold text-bakery-caramel tracking-wider">
          {item.category}
        </span>
        <Link
          to={`/product/${item.productId}`}
          className="block font-serif font-bold text-base text-espresso-900 hover:text-bakery-caramel transition truncate"
        >
          {item.name}
        </Link>

        {/* Selected Options */}
        <div className="flex flex-wrap gap-2 mt-1 text-xs text-espresso-600">
          {item.selectedSize && (
            <span className="bg-cream-200 px-2 py-0.5 rounded-full font-medium">
              Size: {item.selectedSize}
            </span>
          )}
          {item.selectedFlavor && (
            <span className="bg-cream-200 px-2 py-0.5 rounded-full font-medium">
              Flavor: {item.selectedFlavor}
            </span>
          )}
        </div>

        {item.customMessage && (
          <p className="text-xs text-bakery-rose italic mt-1 bg-bakery-pink/30 px-2 py-0.5 rounded-md inline-block">
            Message: &ldquo;{item.customMessage}&rdquo;
          </p>
        )}

        <div className="text-sm font-semibold text-espresso-500 mt-1 sm:hidden">
          ${item.price.toFixed(2)} each
        </div>
      </div>

      {/* Quantity Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 mt-2 sm:mt-0">
        
        {/* Quantity buttons */}
        <div className="flex items-center border border-cream-300 rounded-full bg-white px-2 py-1 shadow-sm">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 text-espresso-600 hover:text-espresso-900 transition hover:bg-cream-100 rounded-full"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-espresso-900">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 text-espresso-600 hover:text-espresso-900 transition hover:bg-cream-100 rounded-full"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[70px]">
          <span className="block text-base font-extrabold text-espresso-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <span className="hidden sm:block text-[11px] text-espresso-400">
            ${item.price.toFixed(2)} / ea
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(item.id)}
          className="p-2 text-espresso-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition"
          aria-label="Remove item"
          title="Remove"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
