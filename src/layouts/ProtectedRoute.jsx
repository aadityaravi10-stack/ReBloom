import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, profile, role, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9FE] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-soft mb-4 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-purple-900 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
          Loading ReBloom...
        </p>
      </div>
    );
  }

  // If Supabase is not configured or user is not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required and does not match
  const userRole = role || profile?.role || user?.user_metadata?.role || 'candidate';
  if (allowedRole && userRole !== allowedRole) {
    // Redirect to their appropriate dashboard
    const redirectPath = userRole === 'employer' ? '/employer/dashboard' : '/candidate/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
