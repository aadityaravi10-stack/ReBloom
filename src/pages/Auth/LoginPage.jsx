import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ReBloomLogo from '../../components/common/ReBloomLogo';
import ThemeToggle from '../../components/common/ThemeToggle';
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
      setApiError(
        'Database connection is being initialized. Please make sure your Supabase keys are active.'
      );
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
      console.error('Login error:', err);
      let errorMsg = err.message || 'Invalid email or password. Please verify your credentials.';
      if (errorMsg.includes('Failed to fetch')) {
        errorMsg = 'Network connection failed. Please check your internet or disable Vercel deployment protection.';
      }
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FE] dark:bg-[#0B0813] text-slate-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <SupabaseConfigBanner />

      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle size="sm" showLabel />
      </div>

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-3">
            <ReBloomLogo size="lg" />
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              ReBloom
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 font-medium">
            Sign in to continue your career comeback
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white dark:bg-[#130E24] border border-purple-200/80 dark:border-purple-800/40 shadow-xl dark:shadow-none">
          {apiError && (
            <div className="mb-5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 font-medium leading-relaxed">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>{apiError}</div>
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
                <label htmlFor="password" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Password <span className="text-purple-600 dark:text-purple-400">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
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

          <div className="mt-6 pt-6 border-t border-purple-100 dark:border-purple-900/40 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-bold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 underline ml-1"
            >
              Create an account
            </Link>
          </div>
        </Card>
      </div>

      <div className="text-center py-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
        ReBloom Platform • Your career deserves another beginning
      </div>
    </div>
  );
}
