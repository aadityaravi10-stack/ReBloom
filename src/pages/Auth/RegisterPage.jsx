import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, User, Building2, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ThemeToggle from '../../components/common/ThemeToggle';
import SupabaseConfigBanner from '../../components/common/SupabaseConfigBanner';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'employer' ? 'employer' : 'candidate';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole,
    companyName: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successNotice, setSuccessNotice] = useState(null);

  const { register, isConfigured } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (apiError) setApiError(null);
  };

  const setRole = (newRole) => {
    setFormData((prev) => ({ ...prev, role: newRole }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'employer' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for employers';
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
    setSuccessNotice(null);

    try {
      const { user, profile } = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        companyName: formData.role === 'employer' ? formData.companyName : null,
      });

      // Check if session was created immediately
      if (user && user.confirmed_at) {
        setSuccessNotice('Account successfully created! Redirecting to your dashboard...');
        setTimeout(() => {
          if (formData.role === 'employer') {
            navigate('/employer/dashboard');
          } else {
            navigate('/candidate/dashboard');
          }
        }, 1000);
      } else {
        // Auto sign-in or immediate profile access
        setSuccessNotice('Account created! Welcome to ReBloom.');
        setTimeout(() => {
          if (formData.role === 'employer') {
            navigate('/employer/dashboard');
          } else {
            navigate('/candidate/dashboard');
          }
        }, 1200);
      }
    } catch (err) {
      console.error('Registration error:', err);
      let errorMsg = err.message || 'An error occurred during registration.';
      if (errorMsg.includes('Failed to fetch')) {
        errorMsg = 'Network connection to authentication server failed. Please check your internet connection or verify Vercel deployment protection settings.';
      } else if (errorMsg.includes('already registered')) {
        errorMsg = 'This email address is already registered. Please sign in instead.';
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

      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              ReBloom
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 font-medium">
            Begin your career comeback with supportive tools, AI coaching, and verified partners
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white dark:bg-[#130E24] border border-purple-200/80 dark:border-purple-800/40 shadow-xl dark:shadow-none">
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-2.5">
              Select Your Role:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  formData.role === 'candidate'
                    ? 'border-purple-600 bg-purple-100/70 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 ring-2 ring-purple-600'
                    : 'border-purple-100 dark:border-purple-900/50 bg-purple-50/40 dark:bg-[#18132C] hover:border-purple-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    formData.role === 'candidate'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold leading-tight">Candidate</div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    Returning to work
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  formData.role === 'employer'
                    ? 'border-purple-600 bg-purple-100/70 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 ring-2 ring-purple-600'
                    : 'border-purple-100 dark:border-purple-900/50 bg-purple-50/40 dark:bg-[#18132C] hover:border-purple-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    formData.role === 'employer'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold leading-tight">Employer</div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    Hiring returners
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {apiError && (
            <div className="mb-5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 font-medium leading-relaxed">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>{apiError}</div>
            </div>
          )}

          {successNotice && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5 font-medium leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>{successNotice}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="fullName"
              name="fullName"
              placeholder="e.g. Priya Sharma"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />

            {formData.role === 'employer' && (
              <Input
                label="Company Name"
                id="companyName"
                name="companyName"
                placeholder="e.g. Acme Tech Solutions"
                value={formData.companyName}
                onChange={handleChange}
                error={errors.companyName}
                required
              />
            )}

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

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

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
                Register as {formData.role === 'candidate' ? 'Candidate' : 'Employer'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-purple-100 dark:border-purple-900/40 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 underline ml-1"
            >
              Sign In
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
