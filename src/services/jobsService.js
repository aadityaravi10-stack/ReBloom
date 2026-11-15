// ReBloom Returnship & Job Matching Service
// Manages curated returnship listings, 30-60-90 day ramp-up flightpaths,
// applications, and employer cohort postings.

const SEED_JOBS = [
  {
    id: 'job-1',
    title: 'Full Stack Engineer (Returnship)',
    company: 'Intuit',
    logo: '💼',
    location: 'Bangalore / Remote',
    workType: 'Remote',
    hours: 'Flexible hours',
    duration: '16-Week Paid Fellowship',
    stipend: '₹1,25,000 / mo',
    conversionRate: '89% Conversion',
    acceptedBreak: '1+ Years Break',
    department: 'Engineering',
    postedDate: '2 days ago',
    featured: true,
    description:
      'The Intuit Again Returnship is dedicated to supporting technologists who have taken a break of 1 year or more. You will be paired with a senior mentor, given a gentle onboarding ramp-up, and work on high-visibility React and cloud microservices.',
    requiredSkills: ['React.js', 'JavaScript', 'Node.js', 'SQL'],
    bonusSkills: ['TypeScript', 'GraphQL', 'AWS'],
    empathyScorecard: {
      coreHours: '10:00 AM – 3:00 PM',
      mentorPairing: 'Dedicated Returnee Senior Buddy',
      familyLeave: 'Up to 5 Days Paid Caregiver Emergency Leave',
      flexibleSchedule: 'Async Daily Standups & No Meetings on Fridays',
    },
    flightpath: {
      month1: {
        title: 'Month 1 (Days 1–30): The Gentle Ramp-Up',
        description:
          'Set up local development environments, complete modern React 19 and cloud tooling refreshers, and shadow your designated mentor on real sprint tickets.',
      },
      month2: {
        title: 'Month 2 (Days 31–60): Collaborative Squad Impact',
        description:
          'Take co-ownership of user-facing components, participate in pull request reviews, and present feature demos in bi-weekly sprint reviews.',
      },
      month3: {
        title: 'Month 3 (Days 61–90+): Full Flight & PPO Pathway',
        description:
          'Drive an independent micro-feature from architecture to staging deployment. Complete mid-cohort feedback and full-time conversion evaluation with leadership.',
      },
    },
  },
  {
    id: 'job-2',
    title: 'Technical Project & Agile Manager',
    company: 'Deloitte Encore',
    logo: '🏢',
    location: 'Hyderabad / Hybrid',
    workType: 'Hybrid',
    hours: 'Flexible hours',
    duration: '20-Week Returnship',
    stipend: '₹1,40,000 / mo',
    conversionRate: '92% Conversion',
    acceptedBreak: '2+ Years Break',
    department: 'Operations & Management',
    postedDate: '3 days ago',
    featured: true,
    description:
      'Deloitte Encore welcomes women professionals returning from career pauses for childcare, eldercare, or relocation. Lead digital transformation squads with structured executive sponsorship and empathetic onboarding.',
    requiredSkills: ['Project Management', 'Scrum / Agile', 'Jira', 'Stakeholder Management'],
    bonusSkills: ['PMP', 'CSM', 'Risk Assessment'],
    empathyScorecard: {
      coreHours: '10:30 AM – 3:30 PM',
      mentorPairing: 'Senior Director Executive Sponsor',
      familyLeave: 'Flexible work-from-home during school exams',
      flexibleSchedule: 'Hybrid (2 days office, 3 days remote)',
    },
    flightpath: {
      month1: {
        title: 'Month 1 (Days 1–30): Agile & Framework Refresh',
        description:
          'Orientation with Deloitte methodologies, team workflow analysis, and pairing with an Agile Coach.',
      },
      month2: {
        title: 'Month 2 (Days 31–60): Facilitating Sprint Ceremonies',
        description:
          'Lead daily standups, backlog grooming, and sprint retrospective sessions for a 12-person engineering team.',
      },
      month3: {
        title: 'Month 3 (Days 61–90+): Enterprise Client Governance',
        description:
          'Manage end-to-end client milestone deliverables, risk matrices, and present roadmap progress to leadership.',
      },
    },
  },
  {
    id: 'job-3',
    title: 'Cloud & DevOps Associate',
    company: 'Microsoft Leap',
    logo: '☁️',
    location: 'Remote (Pan India)',
    workType: 'Remote',
    hours: 'Full-time',
    duration: '16-Week Apprenticeship',
    stipend: '₹1,15,000 / mo',
    conversionRate: '86% Conversion',
    acceptedBreak: '1.5+ Years Break',
    department: 'Engineering',
    postedDate: '5 days ago',
    featured: false,
    description:
      'Microsoft Leap provides non-traditional pathways back into tech. Specifically designed for career relaunchers, combining real-world Azure engineering projects with personalized mentorship.',
    requiredSkills: ['Python', 'Linux', 'Git', 'Cloud Basics'],
    bonusSkills: ['Docker', 'Kubernetes', 'CI/CD Pipelines'],
    empathyScorecard: {
      coreHours: '11:00 AM – 4:00 PM',
      mentorPairing: 'Principal Cloud Solution Architect',
      familyLeave: 'Comprehensive Health & Caregiver Concierge',
      flexibleSchedule: '100% Remote with Flexible Core Hours',
    },
    flightpath: {
      month1: {
        title: 'Month 1: Hands-on Sandbox Labs',
        description: 'Azure cloud architecture labs, infrastructure as code tutorials, and pair programming.',
      },
      month2: {
        title: 'Month 2: Pipeline Modernization',
        description: 'Automate build and deployment pipelines for testing environments.',
      },
      month3: {
        title: 'Month 3: Production Reliability & Assessment',
        description: 'Monitor cloud reliability metrics and present an internal tool demo to the hiring committee.',
      },
    },
  },
  {
    id: 'job-4',
    title: 'Product Designer (UI/UX Returnship)',
    company: 'Razorpay',
    logo: '⚡',
    location: 'Bangalore / Hybrid',
    workType: 'Hybrid',
    hours: 'Flexible hours',
    duration: '16-Week Returnship',
    stipend: '₹1,20,000 / mo',
    conversionRate: '88% Conversion',
    acceptedBreak: '1+ Years Break',
    department: 'Product Design',
    postedDate: '1 week ago',
    featured: false,
    description:
      'Re-enter design with the fintech leader powering payments for millions of businesses. We value your real-world empathy, life experience, and problem-solving perspective.',
    requiredSkills: ['Figma', 'UI/UX Design', 'Wireframing', 'User Research'],
    bonusSkills: ['Design Systems', 'Prototyping', 'Usability Testing'],
    empathyScorecard: {
      coreHours: '10:00 AM – 3:30 PM',
      mentorPairing: 'Staff Product Designer',
      familyLeave: 'Wellness & mental health days monthly',
      flexibleSchedule: 'Flexible start and finish times',
    },
    flightpath: {
      month1: {
        title: 'Month 1: Design System Immersion',
        description: 'Get acquainted with Blade design system tokens, components, and user research repositories.',
      },
      month2: {
        title: 'Month 2: Merchant Checkout Experiments',
        description: 'Design A/B test variants for merchant dashboard onboarding flows with user research support.',
      },
      month3: {
        title: 'Month 3: Strategic Feature Hand-off',
        description: 'Deliver production-ready specs to engineering and present impact metrics to the Head of Design.',
      },
    },
  },
  {
    id: 'job-5',
    title: 'Data Analyst & Insights Specialist',
    company: 'Target Elevate',
    logo: '🎯',
    location: 'Bangalore / Remote',
    workType: 'Remote',
    hours: 'Part-time',
    duration: '12-Week Fellowship',
    stipend: '₹95,000 / mo',
    conversionRate: '85% Conversion',
    acceptedBreak: '2+ Years Break',
    department: 'Data Science & BI',
    postedDate: 'Just now',
    featured: true,
    description:
      'A part-time returnship designed specifically for mothers and caregivers wanting to ease back with a 25-hour week before committing to full-time.',
    requiredSkills: ['SQL', 'Data Analysis', 'Excel', 'Data Visualization'],
    bonusSkills: ['Tableau', 'PowerBI', 'Python for Data'],
    empathyScorecard: {
      coreHours: '10:00 AM – 3:00 PM (25 hrs)',
      mentorPairing: 'Lead Analytics Manager',
      familyLeave: 'Parental & Caregiver Peer Network',
      flexibleSchedule: 'Zero Overtime Guarantee & Async Deliverables',
    },
    flightpath: {
      month1: {
        title: 'Month 1: Data Modeling & SQL Ramp-Up',
        description: 'Modern data stack training on Snowflake, dbt, and Target reporting standards.',
      },
      month2: {
        title: 'Month 2: Customer Behavioral Dashboards',
        description: 'Build automated performance dashboards for retail merchandising managers.',
      },
      month3: {
        title: 'Month 3: Predictive Analytics & Portfolio Review',
        description: 'Deliver actionable revenue insights to retail category directors.',
      },
    },
  },
  {
    id: 'job-6',
    title: 'HR & People Operations Returnee Cohort',
    company: 'Infosys Restart',
    logo: '🌐',
    location: 'Pune / Remote',
    workType: 'Remote',
    hours: 'Full-time',
    duration: '24-Week Transition Program',
    stipend: '₹1,10,000 / mo',
    conversionRate: '91% Conversion',
    acceptedBreak: '3+ Years Break',
    department: 'Human Resources',
    postedDate: '4 days ago',
    featured: false,
    description:
      'Join the People Operations team to champion diversity and talent acquisition. We actively welcome women who took extended pauses of 3 to 7 years.',
    requiredSkills: ['Human Resources', 'Talent Acquisition', 'Communication', 'Employee Engagement'],
    bonusSkills: ['HRIS Systems', 'Diversity & Inclusion Metrics', 'LinkedIn Recruiter'],
    empathyScorecard: {
      coreHours: '10:00 AM – 3:00 PM',
      mentorPairing: 'HR Director Returnee Sponsor',
      familyLeave: 'Flexible Childcare Subsidy & Healthcare',
      flexibleSchedule: 'Remote with Optional Hub Coworking',
    },
    flightpath: {
      month1: {
        title: 'Month 1: Culture & Modern HR Tech',
        description: 'Master new automated screening platforms, talent analytics, and company culture tenets.',
      },
      month2: {
        title: 'Month 2: Candidate Pipeline Sourcing',
        description: 'Drive diversity hiring pipelines and conduct empathetic introductory interviews.',
      },
      month3: {
        title: 'Month 3: Onboarding Program Design',
        description: 'Design onboarding modules for new joiners and transition to a permanent People Partner role.',
      },
    },
  },
];

const STORAGE_KEYS = {
  JOBS: 'rebloom_jobs_list_v3',
  APPLICATIONS: 'rebloom_job_applications',
  BOOKMARKS: 'rebloom_saved_jobs',
};

// Initialize storage
function getStoredJobs() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(SEED_JOBS));
      return SEED_JOBS;
    }
    return JSON.parse(data);
  } catch {
    return SEED_JOBS;
  }
}

function getStoredApplications() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function getStoredBookmarks() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export const jobsService = {
  // Fetch all returnship jobs with optional filtering
  getAllJobs(filters = {}) {
    const all = getStoredJobs();
    let results = [...all];

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.department.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.workType && filters.workType !== 'All') {
      results = results.filter((job) => job.workType === filters.workType);
    }

    if (filters.department && filters.department !== 'All') {
      results = results.filter((job) => job.department === filters.department);
    }

    if (filters.breakDuration && filters.breakDuration !== 'All') {
      results = results.filter((job) => {
        if (filters.breakDuration === '1+ Years') return true;
        if (filters.breakDuration === '2+ Years') return job.acceptedBreak.includes('2+') || job.acceptedBreak.includes('3+');
        if (filters.breakDuration === '3+ Years') return job.acceptedBreak.includes('3+');
        return true;
      });
    }

    return results;
  },

  getJobById(id) {
    const all = getStoredJobs();
    return all.find((j) => j.id === id) || null;
  },

  // Save new job (from employer)
  createJob(jobData, employerProfile = {}) {
    const all = getStoredJobs();
    const newJob = {
      id: `job-${Date.now()}`,
      title: jobData.title || 'Returnship Role',
      company: employerProfile.company_name || employerProfile.full_name || 'Partner Company',
      logo: '✨',
      location: jobData.location || 'Remote',
      workType: jobData.workType || 'Remote',
      hours: jobData.hours || 'Flexible hours',
      duration: jobData.duration || '16-Week Returnship',
      stipend: jobData.stipend || 'Competitive Stipend',
      conversionRate: jobData.conversionRate || '85%+ Conversion Potential',
      acceptedBreak: jobData.acceptedBreak || '1+ Years Break',
      department: jobData.department || 'Engineering',
      postedDate: 'Just now',
      featured: true,
      description: jobData.description || 'Exciting returnship opportunity supporting women relaunching their careers.',
      requiredSkills: Array.isArray(jobData.requiredSkills) ? jobData.requiredSkills : ['Communication', 'Agile'],
      bonusSkills: Array.isArray(jobData.bonusSkills) ? jobData.bonusSkills : [],
      empathyScorecard: {
        coreHours: jobData.coreHours || '10:00 AM – 3:30 PM',
        mentorPairing: jobData.mentorPairing || 'Designated Returnee Mentor',
        familyLeave: jobData.familyLeave || 'Flexible Family & Emergency Leave',
        flexibleSchedule: jobData.flexibleSchedule || 'Flexible Work Hours',
      },
      flightpath: {
        month1: {
          title: 'Month 1: Ramp-Up & Tooling',
          description: jobData.flightpathMonth1 || 'Tooling onboarding, team pairing, and tech stack refresher.',
        },
        month2: {
          title: 'Month 2: Squad Collaboration',
          description: jobData.flightpathMonth2 || 'Collaborative project execution and sprint delivery.',
        },
        month3: {
          title: 'Month 3: Full Ownership & Transition',
          description: jobData.flightpathMonth3 || 'Autonomous project ownership and full-time role conversion review.',
        },
      },
      employerId: employerProfile.id || null,
    };

    all.unshift(newJob);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(all));
    return newJob;
  },

  // Candidate applications
  applyToJob(jobId, candidateData = {}) {
    const applications = getStoredApplications();
    const job = this.getJobById(jobId);

    // Check if already applied
    const existing = applications.find(
      (app) => app.jobId === jobId && app.candidateEmail === candidateData.email
    );
    if (existing) {
      return { success: false, message: 'You have already applied to this returnship cohort.' };
    }

    const newApp = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job?.title || 'Returnship Role',
      company: job?.company || 'Partner Company',
      candidateName: candidateData.full_name || 'Candidate Member',
      candidateEmail: candidateData.email || 'candidate@rebloom.org',
      appliedAt: new Date().toISOString(),
      breakDuration: candidateData.break_duration_months ? `${candidateData.break_duration_months} Months` : '24 Months',
      breakReason: candidateData.break_reason || 'Caregiving & Career Sabbatical',
      yearsExperience: candidateData.years_of_experience || '3.5 Years',
      previousRole: candidateData.previous_role || 'Previous Tech Role',
      skills: candidateData.existing_skills || [],
      education: candidateData.education || 'Bachelor Degree',
      coverNote: candidateData.coverNote || 'Excited to bring my problem solving, maturity, and renewed energy back into tech.',
      status: 'Reviewing', // 'Reviewing' | 'Interview Scheduled' | 'Cohort Accepted'
    };

    applications.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    return { success: true, application: newApp };
  },

  getMyApplications(candidateEmail) {
    const apps = getStoredApplications();
    if (!candidateEmail) return apps;
    return apps.filter((a) => a.candidateEmail === candidateEmail);
  },

  isJobApplied(jobId, candidateEmail) {
    const apps = getStoredApplications();
    return apps.some((a) => a.jobId === jobId && (!candidateEmail || a.candidateEmail === candidateEmail));
  },

  // Bookmarks
  getBookmarks() {
    return getStoredBookmarks();
  },

  toggleBookmark(jobId) {
    let bookmarks = getStoredBookmarks();
    if (bookmarks.includes(jobId)) {
      bookmarks = bookmarks.filter((id) => id !== jobId);
    } else {
      bookmarks.push(jobId);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return bookmarks;
  },

  isBookmarked(jobId) {
    const bookmarks = getStoredBookmarks();
    return bookmarks.includes(jobId);
  },

  // Employer ATS view
  getEmployerJobs(employerId) {
    const all = getStoredJobs();
    if (!employerId) return all;
    return all.filter((j) => j.employerId === employerId);
  },

  getJobApplicants(jobId) {
    const applications = getStoredApplications();
    return applications.filter((app) => app.jobId === jobId);
  },

  updateApplicantStatus(applicationId, newStatus) {
    const apps = getStoredApplications();
    const updated = apps.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    return true;
  },
};
