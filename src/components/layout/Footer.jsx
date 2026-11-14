import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Linkedin, Twitter, Instagram } from 'lucide-react';
import ReBloomLogo from '../common/ReBloomLogo';
import ThemeToggle from '../common/ThemeToggle';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0813] border-t border-purple-100 dark:border-purple-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <ReBloomLogo size="md" />
              <span className="text-xl font-black text-slate-900 dark:text-white">ReBloom</span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              Empowering women to return to high-impact professional careers with AI-powered gap reframing, modern skill refreshers, and verified returnships.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white flex items-center justify-center transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <div className="ml-2">
                <ThemeToggle size="sm" />
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <li>
                <a href="/#about" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  About the Mission
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  AI Career Tools
                </a>
              </li>
              <li>
                <a href="/#stories" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Employer Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-4">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/register?role=employer" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  Hire Returners
                </Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  Returnship Portal
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-700 dark:hover:text-white transition-colors">
                  Employer Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-4">
              Support & Ethics
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <li>
                <span className="text-slate-500 dark:text-slate-400">Zero Gap Discrimination</span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400">Strict Data Privacy</span>
              </li>
              <li>
                <span className="font-semibold text-purple-700 dark:text-purple-300">support@rebloom.io</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-100 dark:border-purple-900/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} ReBloom Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for inclusive return-to-work culture
          </p>
        </div>
      </div>
    </footer>
  );
}
