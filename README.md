# 🌸 ReBloom – Women's Career Comeback Platform

> **"Your career deserves another beginning."**

ReBloom is a career re-entry web platform designed for women returning to professional life after career pauses due to maternity, childcare, family caregiving, relocation, or personal reasons.

---

## 🚀 Phase 1 Implementation Summary

Phase 1 establishes the rock-solid foundation, branding, and role-based access architecture:

1. **Modern, Welcoming Landing Page**:
   - Sticky responsive **Navbar** with brand identity, smooth scroll links, and role-aware CTA buttons.
   - **Hero Section**: Main heading *"Your Career Deserves Another Beginning"*, supporting copy, *"Restart Your Career"* & *"Explore Opportunities"* actions, and curated professional visual representation.
   - **About Section**: Deep-dive into systemic career break friction (outdated tooling, gap stigma, impostor syndrome) vs ReBloom's solutions.
   - **How It Works**: 4 clear comeback steps (Profile, Skill Rediscovery, Preparation, Restart).
   - **Features Preview**: 6 architectural preview cards (AI Resume Builder, Smart Job Matching, Skill Lab, Career Guidance, AI Mock Interviews, Returnship Opportunities).
   - **Success Stories**: Realistically framed illustrative comeback testimonials across Tech, Design, and HR.
   - **Call To Action (CTA)**: Prominent *"Your next chapter starts today"* section.
   - **Footer**: Brand links, contact information, privacy policy dialog, and social channels.

2. **Supabase Authentication & Role-Based Access Control**:
   - Candidate & Employer registration with role selection.
   - Full validation, password visibility toggles, and feedback alerts.
   - Role-based automatic routing after sign-in.
   - Protected routes preventing cross-role access.
   - Clear banner and modal guidance when Supabase environment variables need to be configured.

3. **Candidate Experience**:
   - **Candidate Profile Setup & Editor**: Full Name, Location, Bio, Education, Prior Role, Prior Employer, Years of Experience, Career Break Duration (months), Break Reason, Existing Skills selector, Career Interests selector, Work Mode, and Working Hours.
   - **Candidate Dashboard**: Personalized welcome greeting, Dynamic Profile Readiness calculation score (0-100%), 4-step Career Journey Roadmap timeline, Actionable Next Steps checklist, Recent Activity log, Feature Shortcuts, and respectful Phase 3 architecture placeholders for Job Recommendations and Skill Lab.

4. **Employer Experience**:
   - **Employer Profile Setup & Editor**: Company Name, Industry Sector, Location, Recruitment Email, Company Description, Website, and Logo.
   - **Employer Dashboard**: Organization overview, partner verification metrics, returnship benefits breakdown, and Phase 3 Job Posting Engine placeholder.

---

## 📁 Modular Folder Structure

```
├── public/
├── src/
│   ├── assets/               # Media and branding assets
│   ├── components/
│   │   ├── common/           # Button, Input, Card, Badge, Modal, SupabaseConfigBanner
│   │   ├── layout/           # Navbar, Footer, DashboardLayout
│   │   ├── forms/            # CandidateProfileForm, EmployerProfileForm
│   │   └── dashboard/        # StatCard, ProfileCompletionCard, CareerJourneyTimeline, NextStepsCard, FeatureShortcutCard, RecentActivityCard, JobRecommendationsPlaceholder, LearningProgressPlaceholder
│   ├── pages/
│   │   ├── Home/             # HomePage & sections (Hero, About, HowItWorks, FeaturesPreview, SuccessStories, Cta)
│   │   ├── Auth/             # LoginPage, RegisterPage, ForgotPasswordPage
│   │   ├── Candidate/        # CandidateDashboardPage, CandidateProfilePage
│   │   ├── Employer/         # EmployerDashboardPage, EmployerProfilePage
│   │   └── NotFoundPage.jsx  # 404 handler
│   ├── layouts/              # ProtectedRoute wrapper
│   ├── hooks/                # useAuth hook
│   ├── contexts/             # AuthContext (Supabase Auth & Session State)
│   ├── services/             # supabaseClient.js, profileService.js
│   ├── lib/                  # constants.js (Skills, Industries, Work Modes, Previews)
│   ├── utils/                # helpers.js (Score calculations, date and duration formatters)
│   ├── App.jsx               # React Router routes
│   ├── main.jsx              # Application bootstrap
│   └── index.css             # Tailwind CSS & theme tokens
├── supabase/
│   └── schema.sql            # PostgreSQL schema with Row Level Security & Triggers
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── tailwind.config.js        # Custom palette (soft purple, lavender, pink, peach)
├── vite.config.js            # Vite configuration with chunk splitting
└── package.json              # Dependencies
```

---

## 🛠️ How to Run Locally

### 1. Prerequisites
- Node.js `v18+` or higher (tested on Node `v25.9.0`)
- npm `v9+` or higher

### 2. Installation
Clone or navigate to the project directory:
```bash
cd "WIE HACKTHON"
npm install
```

### 3. Environment Configuration
Copy the template `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials (see Supabase Setup below):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🗄️ Supabase Database & SQL Setup

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Under **Project Settings -> API**, copy:
   - **Project URL** -> `VITE_SUPABASE_URL`
   - **Project API Anon Key** -> `VITE_SUPABASE_ANON_KEY`
3. Navigate to **SQL Editor** -> **New Query** in your Supabase dashboard.
4. Copy and execute the complete script located in `supabase/schema.sql`.

### Tables Created:
- `public.profiles`: Stores core user metadata (id, email, full_name, role: candidate | employer | admin, avatar_url).
- `public.candidate_profiles`: Stores background (education, previous_role, previous_company, years_of_experience, break_duration_months, break_reason, existing_skills, career_interests, preferred_work_type, preferred_hours, location, bio).
- `public.employer_profiles`: Stores company details (company_name, company_logo, industry, company_description, website, location, contact_email, verified).

### Row Level Security (RLS) & Triggers:
- RLS is **enabled** on all tables.
- Authenticated users can read public company profiles and their own profiles.
- Users can **only** edit and update their own records (`auth.uid() = id`).
- A PostgreSQL trigger (`on_auth_user_created`) automatically populates the `profiles` table and role-specific profile when a new user signs up in `auth.users`.

---

## 🔒 Security Best Practices
- **Zero Exposed Keys**: Only the public Supabase Anon key is used in frontend code; the Supabase Service Role Key is never bundled or referenced.
- **Row Level Security**: Authorization is strictly enforced at the database level through PostgreSQL RLS policies.
- **No Mock Auth Fallback**: Per guidelines, live auth requires real credentials; when unconfigured, a helpful setup banner guides the developer.
