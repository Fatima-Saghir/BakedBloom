import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Cake, Sparkles, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('fatima@bakedbloom.com');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white rounded-3xl border border-cream-200 p-8 sm:p-10 shadow-soft space-y-6">
        
        {/* Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-bakery-rose to-bakery-caramel text-white flex items-center justify-center mx-auto shadow-md">
            <Cake className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-espresso-900">
            Welcome Back
          </h1>
          <p className="text-xs text-espresso-600">
            Sign in to track orders, manage preferences, and review your favorite sweets.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-espresso-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. fatima@bakedbloom.com"
              className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso-700">
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to demo email.', 'info'); }} className="text-[11px] text-bakery-carameldark hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs text-espresso-900 focus:outline-none focus:border-bakery-caramel transition"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="rounded border-cream-300 text-bakery-caramel focus:ring-bakery-caramel"
            />
            <label htmlFor="remember" className="text-xs text-espresso-600 cursor-pointer">
              Remember me on this browser
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 text-cream-50 font-bold text-xs tracking-wider uppercase shadow-md hover:shadow transition flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="pt-3 border-t border-cream-200">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-full bg-bakery-peach/50 hover:bg-bakery-peach text-bakery-carameldark text-xs font-bold transition flex items-center justify-center gap-2 border border-bakery-pink"
          >
            <UserCheck className="w-4 h-4" />
            <span>Instant Demo Sign In (1-Click)</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-espresso-600">
          <span>Don&rsquo;t have an account? </span>
          <Link to="/signup" className="font-bold text-bakery-carameldark hover:underline">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
};
