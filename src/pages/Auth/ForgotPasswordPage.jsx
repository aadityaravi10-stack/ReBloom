import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, AlertCircle, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
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
      setError('Supabase is not configured. Please set your credentials in .env.');
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
    <div className="min-h-screen bg-[#FBF9FE] flex flex-col justify-between">
      <SupabaseConfigBanner />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-soft">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-purple-950">
              ReBloom
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Reset Password</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Enter your registered email to receive recovery instructions
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white border-purple-100/90 shadow-soft-lg">
          {success ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Check your inbox</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                If an account exists with <span className="font-semibold text-purple-900">{email}</span>, we have sent password reset instructions to that email.
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
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>

      <div className="text-center py-6 text-xs text-gray-400">
        ReBloom Platform • Your career deserves another beginning
      </div>
    </div>
  );
}
