import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import SupabaseConfigBanner from '../../components/common/SupabaseConfigBanner';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { login, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (apiError) setApiError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isConfigured) {
      setApiError('Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to sign in.');
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const { user, profile } = await login({
        email: formData.email,
        password: formData.password,
      });

      // Role-based redirection
      const userRole = profile?.role || user?.user_metadata?.role;
      if (userRole === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/candidate/dashboard');
      }
    } catch (err) {
      setApiError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9FE] flex flex-col justify-between">
      <SupabaseConfigBanner />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-soft">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-purple-950">
              ReBloom
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Sign in to continue your career comeback
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white border-purple-100/90 shadow-soft-lg">
          {apiError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{apiError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password <span className="text-purple-600">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-purple-700 hover:text-purple-900 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                loading={loading}
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-purple-50 text-center text-xs text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-purple-700 hover:text-purple-900 underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>

      <div className="text-center py-6 text-xs text-gray-400">
        ReBloom Platform • Your career deserves another beginning
      </div>
    </div>
  );
}
