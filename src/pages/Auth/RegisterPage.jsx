import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, User, Building2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
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
      setApiError('Supabase is not configured yet. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file to register accounts.');
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        companyName: formData.companyName,
      });

      // If Supabase requires email verification
      if (result?.user && !result?.session) {
        setSuccessNotice('Registration successful! Please check your email inbox to confirm your account before logging in.');
      } else {
        // Logged in immediately
        if (formData.role === 'employer') {
          navigate('/employer/dashboard');
        } else {
          navigate('/candidate/dashboard');
        }
      }
    } catch (err) {
      setApiError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9FE] flex flex-col justify-between">
      <SupabaseConfigBanner />

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full">
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
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create your account</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Begin your career comeback with supportive tools and partners
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white border-purple-100/90 shadow-soft-lg">
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Select Your Role:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  formData.role === 'candidate'
                    ? 'border-purple-600 bg-purple-50/60 text-purple-950 ring-1 ring-purple-600'
                    : 'border-gray-200 hover:border-purple-200 text-gray-600'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    formData.role === 'candidate'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Candidate</div>
                  <div className="text-[10px] text-gray-500">Returning to work</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  formData.role === 'employer'
                    ? 'border-purple-600 bg-purple-50/60 text-purple-950 ring-1 ring-purple-600'
                    : 'border-gray-200 hover:border-purple-200 text-gray-600'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    formData.role === 'employer'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Employer</div>
                  <div className="text-[10px] text-gray-500">Hiring returners</div>
                </div>
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {apiError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{apiError}</div>
            </div>
          )}

          {successNotice && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{successNotice}</div>
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
              placeholder="Re-enter password"
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

          <div className="mt-6 pt-6 border-t border-purple-50 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-purple-700 hover:text-purple-900 underline">
              Sign In
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
