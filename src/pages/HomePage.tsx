import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  HeartHandshake, 
  Star, 
  Cake as CakeIcon,
  ChevronRight
} from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { RatingStars } from '../components/common/RatingStars';
import { apiService } from '../services/api';
import { Product, Review } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { BakeryImage } from '../components/common/BakeryImage';

export const HomePage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [productsData, reviewsData] = await Promise.all([
          apiService.getProducts(),
          apiService.getReviews(),
        ]);
        setBestSellers(productsData.filter((p) => p.isBestSeller).slice(0, 4));
        setReviews(reviewsData.slice(0, 3));
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const categories = [
    {
      name: 'Artisan Cakes',
      tagline: 'Celebration gateaux & bespoke layered creations',
      itemCount: 8,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=Cakes',
    },
    {
      name: 'Gourmet Cupcakes',
      tagline: 'Velvety swirls with handcrafted fillings',
      itemCount: 6,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=Cupcakes',
    },
    {
      name: 'French Pastries',
      tagline: '72-hour laminated flaky viennoiseries',
      itemCount: 6,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=Pastries',
    },
    {
      name: 'Warm Cookies',
      tagline: 'Brown butter doughs & Belgian choc puddles',
      itemCount: 4,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=Cookies',
    },
    {
      name: 'Fudge Brownies',
      tagline: 'Dense, crackly-topped Valrhona chocolate slabs',
      itemCount: 4,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=Brownies',
    },
    {
      name: 'Handcrafted Desserts',
      tagline: 'Roman tiramisù, tarts & creamy panna cottas',
      itemCount: 5,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=Desserts',
    },
  ];

  const pillars = [
    {
      icon: Sparkles,
      title: 'Fresh Ingredients',
      desc: '100% organic unbleached flours, French cultured butter, Madagascar bourbon vanilla, and cage-free eggs.',
    },
    {
      icon: Clock,
      title: 'Freshly Baked Daily',
      desc: 'Our ovens fire before sunrise every morning so your orders are warm, fragrant, and never pre-frozen.',
    },
    {
      icon: HeartHandshake,
      title: 'Custom Orders',
      desc: 'Personalized cake messages, custom flavor profiles, dietary adaptations, and celebration sizes made to order.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      desc: 'Temperature-controlled delivery vehicles ensuring delicate cream frostings and tarts arrive in pristine condition.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bakery-peach/70 border border-bakery-pink text-espresso-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-bakery-caramel" />
                <span>Handcrafted Luxury Bakery</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-espresso-900 tracking-tight leading-[1.15]">
                Baked With Love, <br className="hidden sm:inline" />
                <span className="text-bakery-carameldark italic font-normal">Served With Joy</span>
              </h1>

              <p className="text-base sm:text-lg text-espresso-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Welcome to BakedBloom. From delicate French viennoiseries to decadent custom celebration gateaux, every single bite is an unforgettable moment of sweetness.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-sm tracking-wide shadow-soft-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-cream-50 hover:bg-white text-espresso-900 border border-cream-300 font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Menu</span>
                  <ChevronRight className="w-4 h-4 text-bakery-caramel" />
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-espresso-600 border-t border-cream-200/80">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={5} size="sm" />
                  <span className="font-bold text-espresso-900 ml-1">4.9/5</span>
                  <span>(1,200+ Reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Freshness Guarantee</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visuals */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Decorative glow / backdrop blob */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-bakery-pink/50 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-bakery-peach/60 rounded-full blur-3xl -z-10" />

                {/* Main Hero Image */}
                <div className="relative rounded-4xl overflow-hidden shadow-soft-xl border-4 border-white aspect-[4/3] sm:aspect-[5/4]">
                  <BakeryImage
                    src="/images/berry-velvet-hero.svg"
                    fallbackSrcs={[
                      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
                      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80',
                      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=80'
                    ]}
                    alt="Artisanal Berry Velvet Cake by BakedBloom"
                    className="w-full h-full transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Highlight Card 1 */}
                <div className="absolute -bottom-6 -left-4 sm:bottom-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-soft-xl border border-cream-200 flex items-center gap-3.5 max-w-xs animate-float">
                  <div className="w-12 h-12 rounded-xl bg-bakery-peach text-bakery-carameldark flex items-center justify-center shrink-0">
                    <CakeIcon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-espresso-900">Bespoke Celebration Cakes</p>
                    <p className="text-[11px] text-espresso-500">Baked fresh for your special moments</p>
                  </div>
                </div>

                {/* Floating Highlight Card 2 */}
                <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-soft-lg border border-cream-200 items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-espresso-800">Freshly Baking Now</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
            Artisanal Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 mt-2 mb-3">
            Explore By Category
          </h2>
          <p className="text-sm text-espresso-600">
            Handmade morning pastries, signature layered cakes, and delicate European desserts crafted with the finest ingredients.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      {/* SECTION 2: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
              Crowd Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 mt-1">
              Bakery Best Sellers
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-bakery-carameldark hover:text-espresso-900 transition group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Fetching freshly baked favorites..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="bg-white/80 py-16 sm:py-20 border-y border-cream-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
              Our Commitment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 mt-2 mb-3">
              Why Customers Love BakedBloom
            </h2>
            <p className="text-sm text-espresso-600">
              We never take shortcuts. Every crumb is baked from scratch with artisan recipes and pure ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-cream-50 border border-cream-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-2xl bg-bakery-peach/70 text-bakery-carameldark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 stroke-[1.8]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-espresso-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
            Kind Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 mt-2 mb-3">
            What Our Sweet Lovers Say
          </h2>
          <p className="text-sm text-espresso-600">
            Real experiences from verified customers celebrating their special moments with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-200/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <RatingStars rating={rev.rating} size="sm" />
                  <span className="text-[11px] text-espresso-400">{rev.date}</span>
                </div>
                <p className="text-xs text-bakery-carameldark font-semibold mb-2">
                  Reviewed: {rev.productName}
                </p>
                <p className="text-sm text-espresso-700 italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-cream-100">
                {rev.customerAvatar ? (
                  <img
                    src={rev.customerAvatar}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-bakery-pink"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-bakery-pink text-bakery-carameldark font-bold flex items-center justify-center text-sm">
                    {rev.customerName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-espresso-900">
                    {rev.customerName}
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cream-50 hover:bg-white text-espresso-900 border border-cream-300 font-bold text-sm shadow-sm hover:shadow transition"
          >
            <span>View All Reviews ({reviews.length > 0 ? '140+' : '0'})</span>
            <ArrowRight className="w-4 h-4 text-bakery-caramel" />
          </Link>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl overflow-hidden bg-gradient-to-r from-espresso-900 via-espresso-800 to-espresso-900 text-cream-50 p-8 sm:p-14 lg:p-16 shadow-soft-xl">
          {/* Background image & subtle gradient */}
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80"
            alt="Bakery dessert"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-bakery-caramel/30 border border-bakery-caramel/50 text-bakery-peach text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-bakery-peach text-bakery-peach" /> Baked Fresh To Order
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Ready for Something Sweet?
            </h2>

            <p className="text-sm sm:text-base text-cream-200 leading-relaxed">
              Whether celebrating a birthday or indulging in your morning coffee treat, our ovens are ready. Order now for doorstep delivery.
            </p>

            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-bakery-caramel hover:bg-bakery-carameldark text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
