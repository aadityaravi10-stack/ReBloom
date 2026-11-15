export const CAREER_BREAK_REASONS = [
  'Maternity & Childcare',
  'Elderly / Family Care',
  'Health & Personal Wellness',
  'Marriage & Relocation',
  'Higher Education / Upskilling',
  'Bereavement / Family Emergency',
  'Other Personal Reasons',
];

export const EDUCATION_DEGREES = [
  'B.Tech / B.E. (Engineering)',
  'B.Sc (Bachelor of Science)',
  'B.Com (Bachelor of Commerce)',
  'B.A. (Bachelor of Arts)',
  'BBA / BMS (Business Administration)',
  'BCA (Computer Applications)',
  'M.Tech / M.E. (Engineering)',
  'MBA / PGDM (Management)',
  'M.Sc (Master of Science)',
  'M.Com (Master of Commerce)',
  'M.A. (Master of Arts)',
  'MCA (Computer Applications)',
  'Ph.D. / Doctorate',
  'Diploma / Polytechnic',
  'Chartered Accountant (CA) / CFA / CS',
  'MBBS / BDS / B.Pharm / Nursing',
  'LLB / LLM (Law)',
  'B.Des / M.Des / Fine Arts',
  'Other',
];

export const WORK_TYPES = [
  { id: 'Remote', label: 'Remote (Work from Anywhere)' },
  { id: 'Hybrid', label: 'Hybrid (Partially in Office)' },
  { id: 'On-site', label: 'On-site' },
  { id: 'Flexible', label: 'Flexible / Asynchronous' },
];

export const WORK_HOURS = [
  { id: 'Full-time', label: 'Full-time (40 hrs/wk)' },
  { id: 'Part-time', label: 'Part-time (20-30 hrs/wk)' },
  { id: 'Flexible hours', label: 'Flexible Hours (Mornings/Evenings)' },
  { id: 'Project-based', label: 'Project-based / Milestone Work' },
];

export const POPULAR_SKILLS = [
  'React.js', 'JavaScript', 'Python', 'Product Management', 'Data Analysis',
  'UI/UX Design', 'Digital Marketing', 'Content Strategy', 'Project Management',
  'Human Resources', 'Financial Accounting', 'Customer Success', 'Salesforce',
  'Figma', 'SQL', 'Scrum / Agile', 'SEO / SEM', 'Technical Writing'
];

export const POPULAR_INTERESTS = [
  'Software Development', 'Product Design', 'Marketing & Communications',
  'Operations & Management', 'Data Science & BI', 'Human Resources',
  'Customer Experience', 'Finance & FinTech', 'Education & EdTech'
];

export const INDUSTRIES = [
  'Technology & Software',
  'Financial Services & FinTech',
  'Healthcare & Life Sciences',
  'Education & EdTech',
  'E-Commerce & Retail',
  'Media, Design & Advertising',
  'Consulting & Professional Services',
  'Non-Profit & Social Impact',
];

export const FEATURE_PREVIEWS = [
  {
    id: 'resume-builder',
    title: 'AI Resume Builder',
    tagline: 'Reframes your gap into an asset',
    description: 'Transform your career break into powerful transferrable skills and achievements with specialized AI tailoring.',
    icon: 'FileText',
    badge: 'Coming in Phase 2',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'job-matching',
    title: 'Smart Job Matching',
    tagline: 'Opportunities that fit your real life',
    description: 'Find comeback-friendly employers offering returnships, remote flexibility, and mentorship from day one.',
    icon: 'Briefcase',
    badge: 'Coming in Phase 3',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'skill-dev',
    title: 'Skill Development',
    tagline: 'Bridge the technology and industry gap',
    description: 'Bite-sized, curated micro-courses and practical sandboxes designed specifically for professionals returning to work.',
    icon: 'GraduationCap',
    badge: 'Coming in Phase 3',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    tagline: '1-on-1 mentorship with women leaders',
    description: 'Get paired with accomplished mentors who made the same comeback journey and can open doors for you.',
    icon: 'Compass',
    badge: 'Coming in Phase 4',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'mock-interviews',
    title: 'AI Mock Interviews',
    tagline: 'Practice answering gap questions with poise',
    description: 'Simulate behavioral and technical interviews with empathetic AI coaching to build unshakeable confidence.',
    icon: 'Sparkles',
    badge: 'Coming in Phase 4',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'returnships',
    title: 'Returnship Opportunities',
    tagline: 'Structured on-ramps to high-impact roles',
    description: 'Paid 3 to 6-month transitional programs with supportive onboarding, cohort camaraderie, and full-time conversion paths.',
    icon: 'Repeat',
    badge: 'Coming in Phase 3',
    color: 'from-blue-500 to-cyan-600',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'Senior Product Designer',
    company: 'FinFlow Tech',
    breakDuration: '4 Years Career Break (Childcare)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'Returning to tech after four years away seemed impossible. ReBloom gave me the confidence and clarity I needed to pitch my lived experience as an asset. I landed a senior role with full remote flexibility within 2 months.',
    isIllustrative: true,
  },
  {
    id: 2,
    name: 'Priyanka Patel',
    role: 'Lead Full-Stack Engineer',
    company: 'CloudNova Systems',
    breakDuration: '5 Years Break (Elderly Care)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    quote: 'The returnship program helped me brush up on modern React architecture without feeling judged for my gap. Today I lead a team of 8 engineers.',
    isIllustrative: true,
  },
  {
    id: 3,
    name: 'Sunita Reddy',
    role: 'HR Director & People Lead',
    company: 'TalentSphere Global',
    breakDuration: '3 Years Break (Relocation & Maternity)',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    quote: 'As both a mother who took a break and now a hiring leader, I see ReBloom as the bridge our industry desperately needed. The talent here is phenomenal.',
    isIllustrative: true,
  },
];
