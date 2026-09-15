import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  User as UserIcon, 
  ChevronDown, 
  LogOut, 
  Package, 
  Sparkles,
  Cake
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const { totalItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll shadow/blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-soft border-b border-cream-200/80 py-3'
          : 'bg-cream-100/90 backdrop-blur-sm border-b border-cream-200/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bakery-rose to-bakery-caramel text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Cake className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-espresso-900 leading-none group-hover:text-bakery-caramel transition-colors">
                BakedBloom
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-bakery-caramel mt-0.5">
                Artisanal Bakery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-bakery-carameldark font-bold'
                      : 'text-espresso-700 hover:text-bakery-caramel'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bakery-caramel rounded-full animate-fade-in" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons (Cart, Auth, Mobile toggle) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full bg-cream-50 hover:bg-cream-200/80 text-espresso-800 hover:text-bakery-caramel border border-cream-200 transition-all duration-200 shadow-sm group"
              aria-label={`View Cart (${totalItemsCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-rose text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce-short">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* User Auth Section (Desktop) */}
            <div className="hidden md:block relative">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-3 rounded-full bg-cream-50 hover:bg-cream-200/70 border border-cream-200 text-espresso-800 transition shadow-sm"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover border border-bakery-caramel/30"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-bakery-pink text-bakery-carameldark flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-espresso-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-xl border border-cream-200 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-cream-100">
                        <p className="text-xs text-espresso-400">Signed in as</p>
                        <p className="text-sm font-bold text-espresso-900 truncate">{user.name}</p>
                        <p className="text-xs text-espresso-500 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-espresso-700 hover:bg-cream-100 transition"
                      >
                        <UserIcon className="w-4 h-4 text-espresso-500" />
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-espresso-700 hover:bg-cream-100 transition"
                      >
                        <Package className="w-4 h-4 text-espresso-500" />
                        My Orders
                      </Link>

                      <div className="border-t border-cream-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-bold text-espresso-800 hover:text-bakery-carameldark transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-espresso-800 hover:bg-cream-200/70 border border-cream-200 transition"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-50 bg-espresso-950/40 backdrop-blur-sm">
          <div className="bg-cream-50 border-b border-cream-200 shadow-soft-xl px-6 py-6 animate-slide-down max-h-[85vh] overflow-y-auto">
            
            {/* User status banner in mobile */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 p-3 bg-cream-200/50 rounded-2xl border border-cream-300 mb-5">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-bakery-pink text-bakery-carameldark flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-bold text-espresso-900">{user.name}</p>
                  <p className="text-xs text-espresso-500 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mb-5">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2.5 rounded-full border border-espresso-800 text-espresso-800 font-bold text-xs hover:bg-cream-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center py-2.5 rounded-full bg-espresso-800 text-cream-50 font-bold text-xs hover:bg-espresso-900 shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl font-semibold text-base transition ${
                      isActive
                        ? 'bg-bakery-peach/50 text-bakery-carameldark font-bold'
                        : 'text-espresso-800 hover:bg-cream-200/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {isAuthenticated && (
                <>
                  <div className="border-t border-cream-200 my-2 pt-2">
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-espresso-800 hover:bg-cream-200/60"
                    >
                      <Package className="w-5 h-5 text-bakery-caramel" />
                      My Orders
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-espresso-800 hover:bg-cream-200/60"
                    >
                      <UserIcon className="w-5 h-5 text-bakery-caramel" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-5 h-5 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Bakery Promotion banner */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-bakery-peach/60 to-bakery-pink/40 border border-bakery-pink flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-bakery-caramel shrink-0" />
              <p className="text-xs text-espresso-800 leading-snug">
                Use code <strong className="font-bold text-bakery-carameldark">SWEET10</strong> for 10% off your first luxury order!
              </p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
