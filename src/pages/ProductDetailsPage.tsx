import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Heart,
  CheckCircle2,
  Info
} from 'lucide-react';
import { apiService } from '../services/api';
import { Product } from '../types';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/common/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { useCart } from '../context/CartContext';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Customization state
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'allergens' | 'storage'>('details');

  useEffect(() => {
    const loadProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [foundProduct, allProducts] = await Promise.all([
          apiService.getProductById(id),
          apiService.getProducts(),
        ]);

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.image);
          setSelectedSizeIndex(0);
          if (foundProduct.availableFlavors && foundProduct.availableFlavors.length > 0) {
            setSelectedFlavor(foundProduct.availableFlavors[0]);
          } else {
            setSelectedFlavor('');
          }
          setCustomMessage('');
          setQuantity(1);

          // Find related products in same category (excluding current)
          const related = allProducts
            .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Preparing product details..." size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Pastry Not Found"
          description="The confection you are looking for might have retired or moved to another section."
          actionText="Back to Menu"
          actionLink="/menu"
        />
      </div>
    );
  }

  // Calculate current price based on size option
  const currentSizeOption = product.availableSizes ? product.availableSizes[selectedSizeIndex] : null;
  const currentMultiplier = currentSizeOption ? currentSizeOption.priceMultiplier : 1.0;
  const unitPrice = Math.round(product.price * currentMultiplier * 100) / 100;
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const handleAddToCart = () => {
    addItem(product, {
      selectedSize: currentSizeOption?.name,
      priceMultiplier: currentMultiplier,
      selectedFlavor: selectedFlavor || undefined,
      customMessage: customMessage.trim() || undefined,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-espresso-500 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-bakery-carameldark transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-espresso-400 shrink-0" />
        <Link to="/menu" className="hover:text-bakery-carameldark transition">Menu</Link>
        <ChevronRight className="w-3.5 h-3.5 text-espresso-400 shrink-0" />
        <Link to={`/menu?category=${product.category}`} className="hover:text-bakery-carameldark transition">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-espresso-400 shrink-0" />
        <span className="text-espresso-900 font-bold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream-200 border border-cream-200 shadow-soft-lg">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/berry-velvet-hero.svg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-bakery-caramel text-white shadow-md">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-bakery-rose text-white shadow-md">
                New Arrival
              </span>
            )}
          </div>

          {/* Alternate Images Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                    selectedImage === img
                      ? 'border-bakery-caramel shadow-md scale-105'
                      : 'border-cream-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Bakery Promise Bar */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center gap-2.5 text-xs text-espresso-700">
              <Clock className="w-4 h-4 text-bakery-caramel shrink-0" />
              <span>{product.prepTime || 'Freshly baked to order'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center gap-2.5 text-xs text-espresso-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Artisan Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Customizer */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <RatingStars rating={product.rating} size="sm" />
                <span className="text-xs font-semibold text-espresso-600">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-espresso-700 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-espresso-400 uppercase font-bold tracking-wider block">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-extrabold text-espresso-900">
                  ${unitPrice.toFixed(2)}
                </span>
                {currentMultiplier > 1 && (
                  <span className="text-xs text-espresso-500">
                    (${product.price.toFixed(2)} base)
                  </span>
                )}
              </div>
            </div>

            {quantity > 1 && (
              <div className="text-right">
                <span className="text-xs text-espresso-400 uppercase font-bold tracking-wider block">Subtotal</span>
                <span className="text-lg font-bold text-bakery-carameldark">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* CUSTOMIZER SECTION */}
          <div className="space-y-5 pt-2 border-t border-cream-200">
            
            {/* Size Selector */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-800 mb-2">
                  Select Size / Serving:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.availableSizes.map((size, idx) => {
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={size.name}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-bakery-carameldark bg-bakery-peach/30 shadow-sm'
                            : 'border-cream-300 bg-white hover:bg-cream-100/60'
                        }`}
                      >
                        <p className="text-xs font-bold text-espresso-900">{size.name}</p>
                        {size.serves && (
                          <p className="text-[10px] text-espresso-500 mt-0.5">{size.serves}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor Selector */}
            {product.availableFlavors && product.availableFlavors.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-800 mb-2">
                  Select Flavor Profile:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableFlavors.map((flavor) => {
                    const isSelected = selectedFlavor === flavor;
                    return (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                          isSelected
                            ? 'bg-espresso-800 text-cream-50 shadow-sm'
                            : 'bg-white border border-cream-300 text-espresso-700 hover:bg-cream-100'
                        }`}
                      >
                        {flavor}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Cake Message */}
            {product.allowCustomMessage && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-800">
                    Custom Cake Inscription (Complimentary):
                  </label>
                  <span className="text-[10px] text-espresso-400">Max 35 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={35}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday Sophia! ✨"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-cream-300 text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-bakery-caramel transition shadow-sm"
                />
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Quantity */}
                <div className="flex items-center border border-cream-300 rounded-full bg-white px-3 py-2 shadow-sm shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-1 text-espresso-600 hover:text-espresso-900 disabled:opacity-40 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-espresso-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-espresso-600 hover:text-espresso-900 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Add to Cart • ${totalPrice.toFixed(2)}</span>
                </button>

              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-full bg-bakery-caramel hover:bg-bakery-carameldark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Tabs: Details, Ingredients, Allergens, Storage */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-4 overflow-x-auto no-scrollbar">
          {(['details', 'ingredients', 'allergens', 'storage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                activeTab === tab
                  ? 'bg-bakery-peach/60 text-espresso-900 border border-bakery-pink'
                  : 'text-espresso-600 hover:bg-cream-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="pt-6 text-sm text-espresso-700 leading-relaxed">
          {activeTab === 'details' && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-espresso-900">Pastry Chef’s Note</h4>
              <p>{product.fullDescription}</p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-espresso-900">Wholesome Artisanal Ingredients</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'allergens' && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-espresso-900">Allergen Information</h4>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((all, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    Contains: {all}
                  </span>
                ))}
              </div>
              <p className="text-xs text-espresso-500 mt-2">
                Baked in an artisan facility that handles nuts, dairy, wheat, and eggs.
              </p>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-espresso-900">Care & Serving Recommendations</h4>
              <p className="text-xs">
                For optimum flavor and texture, keep refrigerated until 30 minutes before serving to allow creams and butter sponges to soften to room temperature. Consume within 3-4 days.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
              You May Also Relish
            </h3>
            <Link
              to={`/menu?category=${product.category}`}
              className="text-xs font-bold text-bakery-carameldark hover:text-espresso-900 transition flex items-center gap-1"
            >
              <span>More in {product.category}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
