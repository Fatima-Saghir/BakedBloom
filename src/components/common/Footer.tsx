import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Heart,
  Send
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Thank you for subscribing! Check your inbox for 10% off coupon.', 'success');
    setNewsletterEmail('');
  };

  const categories = [
    { name: 'Artisan Cakes', path: '/menu?category=Cakes' },
    { name: 'Gourmet Cupcakes', path: '/menu?category=Cupcakes' },
    { name: 'French Pastries', path: '/menu?category=Pastries' },
    { name: 'Warm Cookies', path: '/menu?category=Cookies' },
    { name: 'Fudge Brownies', path: '/menu?category=Brownies' },
    { name: 'Handcrafted Desserts', path: '/menu?category=Desserts' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Menu', path: '/menu' },
    { name: 'Our Story & Philosophy', path: '/about' },
    { name: 'Customer Reviews', path: '/reviews' },
    { name: 'Contact & Orders', path: '/contact' },
    { name: 'Track My Order', path: '/orders' },
  ];

  return (
    <footer className="bg-espresso-900 text-cream-100 pt-16 pb-8 border-t-4 border-bakery-caramel/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-espresso-700/60">
          
          {/* Brand & Story (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bakery-rose to-bakery-caramel text-white flex items-center justify-center shadow-md">
                <Cake className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-cream-50">
                BakedBloom
              </span>
            </Link>
            <p className="text-sm text-espresso-200 leading-relaxed max-w-sm">
              Crafting joy through artisanal baking. We use stone-ground organic flours, pure French butter, and single-origin chocolates to make every celebration memorable.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-bakery-caramel mb-2">
                Join Our Sweet Circle
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-full bg-espresso-800 border border-espresso-700 text-cream-50 text-xs placeholder-espresso-400 focus:outline-none focus:border-bakery-caramel transition"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-bakery-caramel hover:bg-bakery-carameldark text-white transition shadow-md flex items-center justify-center shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-bakery-caramel mb-4 font-serif">
              Our Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-espresso-200">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="hover:text-bakery-peach transition inline-block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-bakery-caramel mb-4 font-serif">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-espresso-200">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-bakery-peach transition inline-block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-bakery-caramel mb-4 font-serif">
              Visit & Contact
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-espresso-200">
              <MapPin className="w-4 h-4 text-bakery-caramel shrink-0 mt-0.5" />
              <span>42 Blossom Boulevard, Gourmet Quarter, Bloomfield</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-espresso-200">
              <Phone className="w-4 h-4 text-bakery-caramel shrink-0" />
              <span>+1 (555) 234-CAKE (2253)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-espresso-200">
              <Mail className="w-4 h-4 text-bakery-caramel shrink-0" />
              <span>hello@bakedbloom.com</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-espresso-200 pt-2 border-t border-espresso-800">
              <Clock className="w-4 h-4 text-bakery-caramel shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cream-100">Mon - Sat: 8:00 AM – 8:00 PM</p>
                <p>Sunday: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-espresso-400">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} BakedBloom Pâtisserie. Baked with{' '}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for sweet lovers.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-espresso-800 hover:bg-espresso-700 text-espresso-200 hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-espresso-800 hover:bg-espresso-700 text-espresso-200 hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-espresso-800 hover:bg-espresso-700 text-espresso-200 hover:text-white transition"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
