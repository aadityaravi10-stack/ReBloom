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
  Settings,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
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
    <div className="min-h-screen bg-[#FBF9FE] flex flex-col">
      <SupabaseConfigBanner />

      {/* Top Navbar */}
      <header className="bg-white border-b border-purple-100/80 sticky top-0 z-30 shadow-xs">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-purple-700 rounded-xl hover:bg-purple-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-purple-900 tracking-tight">ReBloom</span>
              <span className="text-[11px] font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full capitalize">
                {isCandidate ? 'Candidate Portal' : 'Employer Portal'}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-medium text-gray-500 hover:text-purple-700 transition-colors hidden sm:inline"
            >
              Public Home
            </Link>
            <div className="h-4 w-px bg-purple-200 hidden sm:inline" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                {displayName.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-none">{displayName}</p>
                <p className="text-[11px] text-gray-400 truncate max-w-[140px] leading-tight">{displayEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors ml-1"
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
          <div className="bg-white rounded-3xl p-5 border border-purple-100/80 shadow-soft sticky top-24 space-y-6">
            {/* User Profile Card Snippet */}
            <div className="bg-gradient-to-br from-purple-50 via-purple-50/50 to-pink-50/30 p-4 rounded-2xl border border-purple-100/60 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-lg flex items-center justify-center shadow-soft mb-2.5">
                {displayName.charAt(0)}
              </div>
              <h4 className="font-bold text-sm text-gray-900 truncate">{displayName}</h4>
              <p className="text-xs text-purple-600 font-medium capitalize mt-0.5">
                {isCandidate ? 'Career Comeback Member' : 'Hiring Partner'}
              </p>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">Navigation</p>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-soft'
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Future Modules Roadmaps preview */}
            <div className="border-t border-purple-100/80 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">Future Modules</p>
              <div className="space-y-1 text-xs text-gray-400 px-3">
                <div className="flex items-center justify-between py-1.5 opacity-60">
                  <span className="flex items-center gap-2">
                    <Sparkle className="w-3.5 h-3.5" /> AI Resume Studio
                  </span>
                  <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">Phase 2</span>
                </div>
                <div className="flex items-center justify-between py-1.5 opacity-60">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Job Ecosystem
                  </span>
                  <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">Phase 3</span>
                </div>
                <div className="flex items-center justify-between py-1.5 opacity-60">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" /> Skill Lab
                  </span>
                  <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">Phase 3</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-72 bg-white h-full p-5 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                  <span className="font-extrabold text-purple-900 text-lg">ReBloom Menu</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-500">
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
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                          isActive
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 text-sm text-rose-600 p-2 hover:bg-rose-50 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>}
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
