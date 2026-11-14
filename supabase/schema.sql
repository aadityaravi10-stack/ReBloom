-- ==============================================================================
-- ReBloom: Women's Career Comeback Platform
-- Database Schema for Supabase (PostgreSQL with RLS)
-- ==============================================================================

-- 1. Create PROFILES table (Base table linked directly to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('candidate', 'employer', 'admin')) DEFAULT 'candidate',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create CANDIDATE_PROFILES table
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    education TEXT,
    previous_role TEXT,
    previous_company TEXT,
    years_of_experience NUMERIC(4, 1) DEFAULT 0,
    break_duration_months INTEGER DEFAULT 0,
    break_reason TEXT,
    existing_skills TEXT[] DEFAULT '{}',
    career_interests TEXT[] DEFAULT '{}',
    preferred_work_type TEXT DEFAULT 'Remote' CHECK (preferred_work_type IN ('Remote', 'Hybrid', 'On-site', 'Flexible')),
    preferred_hours TEXT DEFAULT 'Flexible hours' CHECK (preferred_hours IN ('Full-time', 'Part-time', 'Flexible hours', 'Project-based')),
    location TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create EMPLOYER_PROFILES table
CREATE TABLE IF NOT EXISTS public.employer_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    company_logo TEXT,
    industry TEXT,
    company_description TEXT,
    website TEXT,
    location TEXT,
    contact_email TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;

-- PROFILES Policies
-- Anyone authenticated can view user profiles
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

-- Users can only insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- CANDIDATE_PROFILES Policies
-- Candidates can view their own profile, Employers can view candidate profiles
CREATE POLICY "Candidate profiles viewable by authenticated users"
ON public.candidate_profiles FOR SELECT
TO authenticated
USING (true);

-- Candidates can insert their own profile
CREATE POLICY "Candidates can insert their own profile"
ON public.candidate_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Candidates can update their own profile
CREATE POLICY "Candidates can update their own profile"
ON public.candidate_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- EMPLOYER_PROFILES Policies
-- Everyone (including public candidates) can view employer profiles
CREATE POLICY "Employer profiles are viewable by authenticated users"
ON public.employer_profiles FOR SELECT
TO authenticated
USING (true);

-- Employers can insert their own profile
CREATE POLICY "Employers can insert their own profile"
ON public.employer_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Employers can update their own profile
CREATE POLICY "Employers can update their own profile"
ON public.employer_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ==============================================================================
-- Triggers for automatic profile creation on Supabase Auth SignUp
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
    user_full_name TEXT;
BEGIN
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'candidate');
    user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Member');

    -- Insert into profiles
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, user_full_name, user_role)
    ON CONFLICT (id) DO NOTHING;

    -- Pre-create candidate or employer record
    IF user_role = 'candidate' THEN
        INSERT INTO public.candidate_profiles (id)
        VALUES (NEW.id)
        ON CONFLICT (id) DO NOTHING;
    ELSIF user_role = 'employer' THEN
        INSERT INTO public.employer_profiles (id, company_name)
        VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'company_name', user_full_name || ' Organization'))
        ON CONFLICT (id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_candidate_profiles_timestamp
    BEFORE UPDATE ON public.candidate_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employer_profiles_timestamp
    BEFORE UPDATE ON public.employer_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
