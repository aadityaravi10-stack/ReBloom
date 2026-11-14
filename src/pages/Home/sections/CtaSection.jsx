import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-[#FAF8FE] dark:from-[#0E0A1A] dark:via-[#0B0813] dark:to-[#0B0813] py-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 dark:from-[#150F2B] dark:via-[#100B22] dark:to-[#0B0813] border border-purple-700/40 dark:border-purple-800/40 p-8 sm:p-14 lg:p-16 text-center shadow-2xl">
          {/* Animated mesh & ambient glows */}
          <div
            className="absolute inset-0 animate-mesh opacity-50 pointer-events-none"
            style={{
              background:
                'linear-gradient(-45deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3), rgba(79, 70, 229, 0.4), rgba(126, 34, 206, 0.3))',
              backgroundSize: '400% 400%',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="grain absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-purple-950/80 border border-white/20 dark:border-purple-700/50 text-white text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Free Forever for Returning Women</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
              Your next career breakthrough
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 mt-1">
                starts today.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-purple-100/90 dark:text-purple-200/90 max-w-xl mx-auto leading-relaxed mb-10 font-normal">
              Step back into your professional life with unshakeable confidence. Reframe your career pause, practice interviews, and discover returnships.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <button className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-purple-50 text-base font-bold shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 cursor-pointer">
                  <span>Start Your Comeback</span>
                  <ArrowRight className="w-4 h-4 text-purple-700 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/register?role=employer">
                <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-semibold backdrop-blur-md transition-all cursor-pointer">
                  <Building2 className="w-4 h-4" />
                  <span>Hire Returner Talent</span>
                </button>
              </Link>
            </div>

            {/* Micro value props */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-purple-200/90">
              <span>✓ Zero gap stigma</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
              <span>✓ AI Gap Reframer included</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
              <span>✓ Verified corporate partners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
