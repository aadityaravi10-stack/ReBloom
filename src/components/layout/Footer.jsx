import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Linkedin, Twitter, Instagram, Mail, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-purple-100 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
                ReBloom
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              Empowering women to return to professional life with confidence, renewed skills, and opportunities designed around real lives.
            </p>
            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
              Your career deserves another beginning.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/#about" className="hover:text-purple-700 transition-colors">About ReBloom</a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-purple-700 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="/#features" className="hover:text-purple-700 transition-colors">Features Preview</a>
              </li>
              <li>
                <a href="/#stories" className="hover:text-purple-700 transition-colors">Success Stories</a>
              </li>
              <li>
                <Link to="/register" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">Join as Candidate</Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Employers</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/register" className="hover:text-purple-700 transition-colors">Hire Returners</Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-purple-700 transition-colors">Returnship Programs</a>
              </li>
              <li>
                <a href="/#features" className="hover:text-purple-700 transition-colors">Diversity & Inclusion</a>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-700 transition-colors">Employer Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Support & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-gray-500">
                <Mail className="w-3.5 h-3.5 text-purple-500" />
                <span>support@rebloomcareers.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-purple-500" />
                <span>Global Remote & Tech Hubs</span>
              </li>
              <li className="pt-2">
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("ReBloom Privacy Policy: All user profile data is strictly protected under Supabase Row Level Security."); }} className="hover:text-purple-700 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("ReBloom Terms: Built with respect for inclusive hiring and affirmative equal opportunity."); }} className="hover:text-purple-700 transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-purple-50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} ReBloom Technologies. Built with passion for women's career comeback.</p>
          <div className="flex items-center gap-1 text-purple-800">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>for inclusive workplaces</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
