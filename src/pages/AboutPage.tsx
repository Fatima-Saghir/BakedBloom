import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Award, 
  Clock, 
  Users, 
  Leaf, 
  ArrowRight,
  Cake
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Chef Camille Laurent',
      role: 'Executive Pastry Chef & Co-Founder',
      bio: 'Trained at Le Cordon Bleu Paris with 15 years crafting viennoiseries and tiered celebration cakes across Europe and New York.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chef David Sterling',
      role: 'Master Chocolatier',
      bio: 'Specialist in single-origin cocoa fermentation, praline crunches, and mirror glazes with a dedication to zero artificial dyes.',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Nadia Rostova',
      role: 'Head of Artisan Lamination',
      bio: 'Oversees our signature 72-hour sourdough croissants and slow-proved brioches using Normandy cultured butter.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Purity of Ingredients',
      desc: 'Stone-ground unbleached organic flours, cage-free pasture eggs, Bourbon vanilla pods from Madagascar, and pure French butter.',
    },
    {
      icon: Clock,
      title: 'Slow Artisan Craft',
      desc: 'We never rush sourdough levains or sponge cooling. Each layer is rested at precision temperatures to lock in moisture and flavor.',
    },
    {
      icon: Heart,
      title: 'Bespoke Warmth',
      desc: 'Whether an intimate tea with friends or a grand wedding, every box leaves our bakery with personalized attention and love.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Artificial Shortcuts',
      desc: 'No high-fructose corn syrups, no commercial dough conditioners, and no artificial flavorings. Pure honest baking.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-bakery-peach/70 border border-bakery-pink text-espresso-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-bakery-caramel" />
              <span>Our Heritage & Philosophy</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-espresso-900 tracking-tight leading-tight">
              Baking Joy, One Layer At A Time
            </h1>
            <p className="text-base sm:text-lg text-espresso-700 leading-relaxed">
              Founded in 2018, BakedBloom began with a vintage brick hearth, a cherished copper whisk, and an unwavering commitment to restoring genuine artistry to modern pastry making.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                alt="Flour and baking preparation"
                className="rounded-3xl shadow-soft object-cover aspect-[4/5] w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                alt="Freshly baked croissants"
                className="rounded-3xl shadow-soft object-cover aspect-square w-full"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80"
                alt="Artisan cake decoration"
                className="rounded-3xl shadow-soft object-cover aspect-square w-full"
              />
              <div className="p-6 rounded-3xl bg-espresso-900 text-cream-50 flex flex-col justify-center space-y-2">
                <Cake className="w-8 h-8 text-bakery-caramel" />
                <p className="font-serif text-2xl font-bold">Over 50,000</p>
                <p className="text-xs text-cream-200">Celebration cakes baked and hand-delivered with love.</p>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 leading-tight">
              From A Cozy Kitchen Dream To Your Favorite Bakery
            </h2>
            <p className="text-sm sm:text-base text-espresso-700 leading-relaxed">
              BakedBloom was born from a simple realization: in an era of mass-produced frozen cakes, the world had lost the aroma of butter browning in morning pans and fruit compotes simmering slowly on the stove.
            </p>
            <p className="text-sm sm:text-base text-espresso-700 leading-relaxed">
              We set out to create a sanctuary of taste. Every recipe we bake honours traditional French and Viennese techniques while celebrating fresh local farm ingredients: sweet cream from grass-fed cows, fragrant clover honey, and wild berries picked at the height of summer.
            </p>
            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs tracking-wider uppercase shadow-soft hover:shadow transition"
              >
                <span>Taste Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* CORE VALUES / QUALITY PROMISE */}
      <section className="bg-white py-16 sm:py-24 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 mt-2 mb-3">
              The BakedBloom Quality Promise
            </h2>
            <p className="text-sm text-espresso-600">
              Four sacred rules that guide every single baker at our ovens each morning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-cream-50 border border-cream-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-bakery-peach/70 text-bakery-carameldark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-espresso-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEET OUR CHEFS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bakery-carameldark">
            Artisans Behind The Flour
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-espresso-900 mt-2 mb-3">
            Meet The Master Pâtissiers
          </h2>
          <p className="text-sm text-espresso-600">
            Decades of combined classical European training poured into every single dessert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-cream-200 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-cream-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-espresso-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-bakery-carameldark mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
