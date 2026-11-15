import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  LayoutDashboard,
  UserCheck,
  Building2,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Sparkle,
  Quote,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ReBloomLogo from '../common/ReBloomLogo';
import ThemeToggle from '../common/ThemeToggle';
import SupabaseConfigBanner from '../common/SupabaseConfigBanner';

const COMEBACK_QUOTES = [
  {
    quote:
      "A career break is not empty space — it is where resilience, adaptability, and real life wisdom were forged. You aren't starting over, you are stepping forward from experience.",
    author: 'Daily Comeback Spark',
  },
  {
    quote:
      "Skills don't expire, and your leadership hasn't vanished. The professional world needs the grounded strength and perspective you bring back.",
    author: 'Returnee Mentor Circle',
  },
  {
    quote:
      "Progress is rarely a straight ladder. Sometimes stepping back or pausing gives you the clarity to leap higher than ever before.",
    author: 'Women in Leadership',
  },
  {
    quote:
      'Every transition you managed during your break taught you patience, empathy, and problem solving. Wear your pause with pride.',
    author: 'Career Comeback Coach',
  },
  {
    quote:
      'Confidence returns with action. Take one small step today — your comeback story is being written on your own terms.',
    author: 'ReBloom Affirmation',
  },
];

export default function DashboardLayout({ children, role = 'candidate', title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % COMEBACK_QUOTES.length);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isCandidate = role === 'candidate';

  const navItems = isCandidate
    ? [
        { name: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
        { name: 'Returnship Explorer', path: '/candidate/jobs', icon: Briefcase },
        { name: 'My Profile', path: '/candidate/profile', icon: UserCheck },
        { name: 'AI Career Studio', path: '/candidate/tools', icon: Sparkles },
      ]
    : [
        { name: 'Dashboard', path: '/employer/dashboard', icon: LayoutDashboard },
        { name: 'Manage Returnships', path: '/employer/jobs', icon: Briefcase },
        { name: 'Company Profile', path: '/employer/profile', icon: Building2 },
      ];

  const displayName = profile?.full_name || (isCandidate ? 'Candidate' : 'Employer Partner');
  const displayEmail = user?.email || profile?.email || '';

  return (
    <div className="min-h-screen bg-[#FAF8FE] dark:bg-[#0B0813] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <SupabaseConfigBanner />

      {/* Top Navbar */}
      <header className="bg-white/95 dark:bg-[#130E24]/95 border-b border-purple-100 dark:border-purple-900/40 sticky top-0 z-30 shadow-xs backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2.5">
              <ReBloomLogo size="sm" />
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                ReBloom
              </span>
              <span className="text-[11px] font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 px-2.5 py-0.5 rounded-full capitalize border border-purple-200 dark:border-purple-800">
                {isCandidate ? 'Candidate Portal' : 'Employer Portal'}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white transition-colors hidden sm:inline"
            >
              Public Home
            </Link>

            <ThemeToggle size="sm" />

            <div className="h-4 w-px bg-purple-200 dark:bg-purple-800/60 hidden sm:inline" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                {displayName.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{displayName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px] leading-tight mt-0.5">
                  {displayEmail}
                </p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ml-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-start max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-3.5 sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto no-scrollbar">
          {/* Block 1: Main Dashboard Navigation & Status Card */}
          <div className="bg-white dark:bg-[#130E24] rounded-3xl p-4 border border-purple-200/80 dark:border-purple-800/40 shadow-sm space-y-3.5">
            {/* User Profile Card Snippet: Sleek & Compact Horizontal Layout */}
            <div className="bg-gradient-to-br from-purple-50 via-purple-50/50 to-pink-50/30 dark:from-purple-950/40 dark:to-[#18132C] p-3 rounded-2xl border border-purple-100 dark:border-purple-800/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                {displayName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">{displayName}</h4>
                <p className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold capitalize truncate">
                  {isCandidate ? 'Career Comeback Member' : 'Hiring Partner'}
                </p>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 px-3 mb-1">
                Navigation
              </p>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-700 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Roadmap preview */}
            <div className="border-t border-purple-100 dark:border-purple-900/40 pt-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 px-3 mb-1">
                Roadmap Modules
              </p>
              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 px-3 font-medium">
                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <Sparkle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">AI Career Studio</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800 shrink-0">
                    Live
                  </span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">Returnship Match</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800 shrink-0">
                    Live
                  </span>
                </div>
                <div className="flex items-center justify-between py-0.5 opacity-70">
                  <span className="flex items-center gap-2 text-xs">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Skill Lab</span>
                  </span>
                  <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded shrink-0">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Motivational Quote Block (with small gap separation) */}
          <div className="bg-white dark:bg-[#130E24] rounded-3xl p-4 border border-purple-200/80 dark:border-purple-800/40 shadow-sm relative overflow-hidden space-y-2.5 group">
            {/* Ambient neon backglow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-tr from-purple-500/10 via-pink-500/15 to-transparent rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-300">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">
                  Daily Comeback Spark
                </span>
              </div>
              <button
                type="button"
                onClick={nextQuote}
                title="Next Affirmation"
                className="p-1 rounded-md text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            <div className="relative pl-3 border-l-2 border-purple-400 dark:border-purple-500/60">
              <Quote className="w-3.5 h-3.5 text-purple-400/30 dark:text-purple-500/30 absolute -top-1 -left-1 transform -scale-x-100 opacity-60" />
              <p className="text-[11px] text-slate-700 dark:text-slate-200 italic leading-snug pt-0.5 line-clamp-3">
                "{COMEBACK_QUOTES[quoteIdx].quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-0.5 text-[10px]">
              <span className="font-bold text-purple-700 dark:text-purple-300 truncate max-w-[170px]">
                — {COMEBACK_QUOTES[quoteIdx].author}
              </span>
              <span className="text-xs">🌸</span>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-80 bg-white dark:bg-[#130E24] h-full p-5 shadow-2xl flex flex-col justify-between border-r border-purple-200 dark:border-purple-800/40 overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-purple-100 dark:border-purple-900/40">
                  <div className="flex items-center gap-2">
                    <ReBloomLogo size="xs" />
                    <span className="font-extrabold text-slate-900 dark:text-white text-base">ReBloom Menu</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-700 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Motivational Quote Block */}
                <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-[#18132C] border border-purple-200 dark:border-purple-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-500" /> Daily Comeback Spark
                    </span>
                    <button
                      type="button"
                      onClick={nextQuote}
                      className="p-1 text-slate-400 hover:text-purple-600 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs italic text-slate-700 dark:text-slate-200 leading-snug">
                    "{COMEBACK_QUOTES[quoteIdx].quote}"
                  </p>
                  <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 text-right">
                    — {COMEBACK_QUOTES[quoteIdx].author} 🌸
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-100 dark:border-purple-900/40 space-y-3">
                <ThemeToggle showLabel className="w-full justify-center" />
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 p-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl w-full cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
