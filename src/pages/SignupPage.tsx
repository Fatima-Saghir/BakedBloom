import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cake, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/');
    } catch {
      showToast('Account creation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white rounded-3xl border border-cream-200 p-8 sm:p-10 shadow-soft space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-bakery-rose to-bakery-caramel text-white flex items-center justify-center mx-auto shadow-md">
            <Cake className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-espresso-900">
            Join BakedBloom
          </h1>
          <p className="text-xs text-espresso-600">
            Create an account to track delivery progress and earn sweet reward perks.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. eleanor@example.com"
              className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Password * (min 6 chars)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Confirm Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs tracking-wider uppercase shadow-md hover:shadow transition flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-espresso-600 pt-2 border-t border-cream-200">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-bakery-carameldark hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
