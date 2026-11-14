import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [employerProfile, setEmployerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured] = useState(isSupabaseConfigured);

  // Fetch full profile and role-specific details from Supabase
  const fetchUserProfile = async (userId) => {
    if (!supabase || !userId) return null;
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.warn('Error fetching profile:', profileError.message);
        return null;
      }

      setProfile(profileData);

      if (profileData?.role === 'candidate') {
        const { data: candData } = await supabase
          .from('candidate_profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (candData) setCandidateProfile(candData);
      } else if (profileData?.role === 'employer') {
        const { data: empData } = await supabase
          .from('employer_profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (empData) setEmployerProfile(empData);
      }

      return profileData;
    } catch (err) {
      console.error('Unexpected error loading profile:', err);
      return null;
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // Check current active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setUser(null);
        setProfile(null);
        setCandidateProfile(null);
        setEmployerProfile(null);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setCandidateProfile(null);
        setEmployerProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up new user
  const register = async ({ email, password, fullName, role, companyName }) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
          company_name: companyName || '',
        },
      },
    });

    if (error) throw error;

    // If session immediately returned (email confirmation disabled in Supabase)
    if (data.user) {
      setUser(data.user);
      await fetchUserProfile(data.user.id);
    }

    return data;
  };

  // Sign in user
  const login = async ({ email, password }) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      setUser(data.user);
      const userProf = await fetchUserProfile(data.user.id);
      return { user: data.user, profile: userProf };
    }

    return data;
  };

  // Sign out user
  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    setCandidateProfile(null);
    setEmployerProfile(null);
  };

  // Password Reset
  const resetPassword = async (email) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw error;
    return data;
  };

  // Refresh profile state
  const refreshProfile = async () => {
    if (user?.id) {
      return await fetchUserProfile(user.id);
    }
  };

  const value = {
    user,
    profile,
    candidateProfile,
    employerProfile,
    role: profile?.role || user?.user_metadata?.role || null,
    loading,
    isConfigured,
    register,
    login,
    logout,
    resetPassword,
    refreshProfile,
    setCandidateProfile,
    setEmployerProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
