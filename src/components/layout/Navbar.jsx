import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ReBloomLogo from '../common/ReBloomLogo';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../common/Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Features', path: '/#features' },
  ];

  const dashboardPath = role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard';

  const scrollToSection = (e, path) => {
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0B0813]/95 backdrop-blur-xl border-b border-purple-100 dark:border-purple-900/40 shadow-sm'
          : 'bg-white/70 dark:bg-[#0B0813]/60 backdrop-blur-md border-b border-purple-100/30 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group z-10">
            <ReBloomLogo size="md" />
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white transition-colors">
              ReBloom
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => scrollToSection(e, link.path)}
                className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-all text-slate-700 hover:text-purple-700 hover:bg-purple-50/80 dark:text-slate-200 dark:hover:text-white dark:hover:bg-purple-950/40"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle & CTAs */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            <ThemeToggle size="md" />

            {user ? (
              <div className="flex items-center gap-3">
                <Link to={dashboardPath}>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 text-sm font-bold text-purple-900 dark:text-purple-200 transition-all cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                </Link>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="p-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold px-4 py-2 rounded-xl transition-all text-slate-700 hover:text-purple-700 hover:bg-purple-50 dark:text-slate-200 dark:hover:text-white dark:hover:bg-purple-950/40"
                >
                  Log in
                </Link>
                <Link to="/register">
                  <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-950/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white/98 dark:bg-[#0B0813]/98 backdrop-blur-2xl z-40 pt-20 px-6 flex flex-col justify-between pb-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-4 border-b border-purple-100 dark:border-purple-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Switch Appearance
              </span>
              <ThemeToggle showLabel size="md" />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => scrollToSection(e, link.path)}
                className="text-lg font-bold text-slate-800 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 py-3 border-b border-purple-50 dark:border-purple-950/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6">
            {user ? (
              <>
                <Link to={dashboardPath} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3.5 rounded-xl border border-purple-200 dark:border-purple-800 text-slate-800 dark:text-white font-bold text-sm">
                    Log in
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-md">
                    Get Started Free
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
