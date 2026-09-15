import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut, 
  Save, 
  ShieldCheck, 
  Sparkles,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { orders } = useOrders();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-espresso-900">Please Sign In</h2>
        <p className="text-xs text-espresso-600">You must be signed in to view your profile settings and saved addresses.</p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 rounded-full bg-espresso-800 text-cream-50 font-bold text-xs"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-bakery-caramel shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-bakery-peach text-bakery-carameldark font-serif text-3xl font-bold flex items-center justify-center border-2 border-bakery-pink shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl font-bold text-espresso-900">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-bakery-peach text-bakery-carameldark text-[10px] font-bold uppercase">
                Sweet Club Member
              </span>
            </div>
            <p className="text-xs text-espresso-500 mt-1">{user.email}</p>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1 justify-center sm:justify-start">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Account
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Grid: Quick Stats & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cream-100 text-bakery-caramel flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-espresso-900">{orders.length}</span>
            <p className="text-xs text-espresso-500">Past Orders Placed</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cream-100 text-bakery-rose flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-espresso-900">Sweet Club</span>
            <p className="text-xs text-espresso-500">Tier: Gold Pâtisserie</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cream-100 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-espresso-900">10% OFF</span>
            <p className="text-xs text-espresso-500">Code: SWEET10 Active</p>
          </div>
        </div>

      </div>

      {/* Account Settings / Address Management */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-cream-200">
          <div>
            <h2 className="font-serif text-xl font-bold text-espresso-900">Personal Information & Delivery Address</h2>
            <p className="text-xs text-espresso-500">Used to pre-fill your checkout details for fast ordering.</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-full text-xs font-bold bg-cream-100 hover:bg-cream-200 text-espresso-800 transition"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Information'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1">Default Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs shadow transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-espresso-700">
            <div>
              <span className="text-espresso-400 font-semibold block uppercase text-[10px]">Full Name</span>
              <p className="font-bold text-sm text-espresso-900 mt-0.5">{user.name}</p>
            </div>

            <div>
              <span className="text-espresso-400 font-semibold block uppercase text-[10px]">Email Address</span>
              <p className="font-bold text-sm text-espresso-900 mt-0.5">{user.email}</p>
            </div>

            <div>
              <span className="text-espresso-400 font-semibold block uppercase text-[10px]">Phone</span>
              <p className="font-bold text-sm text-espresso-900 mt-0.5">{user.phone || 'Not set'}</p>
            </div>

            <div>
              <span className="text-espresso-400 font-semibold block uppercase text-[10px]">Saved Delivery Address</span>
              <p className="font-bold text-sm text-espresso-900 mt-0.5">
                {user.address ? `${user.address}, ${user.city} ${user.postalCode}` : 'No address saved yet'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* My Orders Quick Nav */}
      <div className="text-center pt-4">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cream-50 hover:bg-white text-espresso-900 border border-cream-300 font-bold text-xs shadow-sm transition"
        >
          <Package className="w-4 h-4 text-bakery-caramel" />
          <span>View All My Orders & Receipts</span>
        </Link>
      </div>

    </div>
  );
};
