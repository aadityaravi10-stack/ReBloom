import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, AlertCircle, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import ReBloomLogo from '../../components/common/ReBloomLogo';
import ThemeToggle from '../../components/common/ThemeToggle';
import SupabaseConfigBanner from '../../components/common/SupabaseConfigBanner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetPassword, isConfigured } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address');
      return;
    }

    if (!isConfigured) {
      setError('Database is not initialized. Please configure credentials.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FE] dark:bg-[#0B0813] text-slate-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <SupabaseConfigBanner />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
        <ThemeToggle size="sm" showLabel />
      </div>

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-3">
            <ReBloomLogo size="lg" />
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              ReBloom
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 font-medium">
            Enter your registered email to receive recovery instructions
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white dark:bg-[#130E24] border border-purple-200/80 dark:border-purple-800/40 shadow-xl dark:shadow-none">
          {success ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Check your inbox</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                If an account exists with <span className="font-bold text-purple-700 dark:text-purple-300">{email}</span>, instructions have been sent.
              </p>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="outline" size="md" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 font-medium leading-relaxed">
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <Input
                label="Registered Email"
                id="email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                icon={Mail}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  Send Recovery Link
                </Button>
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>

      <div className="text-center py-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
        ReBloom Platform • Your career deserves another beginning
      </div>
    </div>
  );
}
