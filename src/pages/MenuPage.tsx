import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Sparkles,
  Cake,
  RefreshCw
} from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { apiService } from '../services/api';
import { Product, ProductCategory } from '../types';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Controls
  const categoryParam = (searchParams.get('category') as ProductCategory) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [dietaryFilter, setDietaryFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync category param with URL
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load menu products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories: ProductCategory[] = [
    'All',
    'Cakes',
    'Cupcakes',
    'Pastries',
    'Cookies',
    'Brownies',
    'Desserts',
  ];

  const handleCategorySelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setVisibleCount(8);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('popularity');
    setDietaryFilter('All');
    setVisibleCount(8);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        // Dietary filter
        if (dietaryFilter !== 'All') {
          if (!product.dietary || !product.dietary.some(d => d.includes(dietaryFilter))) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default: popularity / best sellers first
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategory, searchQuery, sortBy, dietaryFilter]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bakery-peach/70 border border-bakery-pink text-espresso-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bakery-caramel" />
          <span>Our Complete Artisanal Collection</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-900 mb-3">
          Fresh From Our Bakery
        </h1>
        <p className="text-sm sm:text-base text-espresso-600 leading-relaxed">
          Explore our handcrafted cakes, flaky morning pastries, soft cookies, and delicate desserts. Made fresh each day using authentic recipes and European butter.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-espresso-800 text-cream-50 shadow-md scale-105'
                  : 'bg-white hover:bg-cream-200/80 text-espresso-700 border border-cream-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search, Sort, and Filter Controls Card */}
      <div className="bg-white rounded-3xl border border-cream-200 p-4 sm:p-6 shadow-soft mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-espresso-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              placeholder="Search cakes, cookies, croissants..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-bakery-caramel transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-espresso-400 hover:text-espresso-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-espresso-400 shrink-0 hidden sm:block" />
            <span className="text-xs font-semibold text-espresso-600 shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-2xl bg-cream-50 border border-cream-200 text-xs font-medium text-espresso-900 focus:outline-none focus:border-bakery-caramel transition cursor-pointer"
            >
              <option value="popularity">Most Popular & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Dietary Filter */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-xs font-semibold text-espresso-600 shrink-0">Diet:</span>
            <select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-2xl bg-cream-50 border border-cream-200 text-xs font-medium text-espresso-900 focus:outline-none focus:border-bakery-caramel transition cursor-pointer"
            >
              <option value="All">All Dietary Options</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Eggless">Eggless Options</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

        </div>

        {/* Active Filters Summary & Reset */}
        {(selectedCategory !== 'All' || searchQuery || dietaryFilter !== 'All' || sortBy !== 'popularity') && (
          <div className="mt-4 pt-4 border-t border-cream-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-espresso-500 font-medium">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="px-2.5 py-1 bg-cream-200 rounded-full font-semibold text-espresso-800">
                  {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 bg-cream-200 rounded-full font-semibold text-espresso-800">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              {dietaryFilter !== 'All' && (
                <span className="px-2.5 py-1 bg-cream-200 rounded-full font-semibold text-espresso-800">
                  {dietaryFilter}
                </span>
              )}
            </div>

            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-bakery-caramel hover:text-espresso-900 flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between mb-6 text-xs text-espresso-500 font-medium">
        <p>
          Showing <span className="font-bold text-espresso-900">{displayedProducts.length}</span> of{' '}
          <span className="font-bold text-espresso-900">{filteredProducts.length}</span> bakery items
        </p>
      </div>

      {/* Product Grid */}
      {loading ? (
        <LoadingSpinner text="Arranging our pastry display..." />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={Cake}
          title="No Pastries Found"
          description="We couldn't find any products matching your current filters. Try resetting the filters or searching for something else!"
          actionText="Reset All Filters"
          onAction={handleClearFilters}
        />
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-cream-50 text-espresso-900 border border-cream-300 font-bold text-xs tracking-wider uppercase shadow-soft hover:shadow transition-all"
              >
                Load More Delicacies (+4)
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
