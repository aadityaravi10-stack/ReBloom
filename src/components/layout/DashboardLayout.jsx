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
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ReBloomLogo from '../common/ReBloomLogo';
import ThemeToggle from '../common/ThemeToggle';
import SupabaseConfigBanner from '../common/SupabaseConfigBanner';

export default function DashboardLayout({ children, role = 'candidate', title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isCandidate = role === 'candidate';

  const navItems = isCandidate
    ? [
        { name: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
        { name: 'My Profile', path: '/candidate/profile', icon: UserCheck },
        { name: 'AI Career Studio', path: '/candidate/tools', icon: Sparkles },
      ]
    : [
        { name: 'Dashboard', path: '/employer/dashboard', icon: LayoutDashboard },
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
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white dark:bg-[#130E24] rounded-3xl p-5 border border-purple-200/80 dark:border-purple-800/40 shadow-sm sticky top-24 space-y-6">
            {/* User Profile Card Snippet */}
            <div className="bg-gradient-to-br from-purple-50 via-purple-50/50 to-pink-50/30 dark:from-purple-950/40 dark:to-[#18132C] p-4 rounded-2xl border border-purple-100 dark:border-purple-800/40 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-lg flex items-center justify-center shadow-md mb-2.5">
                {displayName.charAt(0)}
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{displayName}</h4>
              <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold capitalize mt-0.5">
                {isCandidate ? 'Career Comeback Member' : 'Hiring Partner'}
              </p>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 px-3 mb-2">
                Navigation
              </p>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-700 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Roadmap preview */}
            <div className="border-t border-purple-100 dark:border-purple-900/40 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 px-3 mb-2">
                Roadmap Modules
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 px-3 font-medium">
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <Sparkle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> AI Career Studio
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                    Live
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 opacity-70">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Returnship Match
                  </span>
                  <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
                    Phase 3
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 opacity-70">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" /> Skill Lab
                  </span>
                  <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
                    Phase 3
                  </span>
                </div>
              </div>
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
            <div className="relative w-72 bg-white dark:bg-[#130E24] h-full p-5 shadow-2xl flex flex-col justify-between border-r border-purple-200 dark:border-purple-800/40">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-purple-100 dark:border-purple-900/40">
                  <span className="font-extrabold text-slate-900 dark:text-white text-lg">ReBloom Menu</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 text-slate-600 dark:text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="mt-6 space-y-2">
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
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-700 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="pt-4 border-t border-purple-100 dark:border-purple-900/40 space-y-3">
                <ThemeToggle showLabel className="w-full justify-center" />
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 p-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl w-full"
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
