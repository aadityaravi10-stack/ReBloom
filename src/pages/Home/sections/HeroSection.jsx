import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Users, Award, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#F5EFFF] via-[#FAF8FE] to-[#FAF8FE] dark:from-[#0B0813] dark:via-[#0F0B1C] dark:to-[#0B0813] transition-colors duration-300">
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 animate-mesh opacity-70 dark:opacity-90"
        style={{
          background:
            'linear-gradient(-45deg, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.1), rgba(126, 34, 206, 0.18), rgba(244, 114, 182, 0.12))',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Radial accent glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-500/15 dark:bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-fuchsia-500/10 dark:bg-fuchsia-500/12 rounded-full blur-[90px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(126, 34, 206, .2) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 34, 206, .2) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle grain texture */}
      <div className="grain absolute inset-0 opacity-40 dark:opacity-100" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-700/50 text-purple-900 dark:text-purple-200 text-xs sm:text-sm font-semibold mb-8 shadow-sm backdrop-blur-md animate-float">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>Trusted by 50,000+ women returning to successful careers</span>
          </div>

          {/* Main heading — oversized, bold, high contrast */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] sm:leading-[0.95] tracking-tight mb-8">
            <span className="block text-slate-950 dark:text-white">Your career</span>
            <span className="block text-gradient mt-1 sm:mt-2">deserves another</span>
            <span className="block text-slate-950 dark:text-white mt-1 sm:mt-2">beginning.</span>
          </h1>

          {/* Subtitle — high contrast, easy to read */}
          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            A career break is not a penalty. Rediscover your leadership, bridge modern skills with AI coaching, and step into verified returnships built for real life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/register">
              <button className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-base font-bold shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transition-all hover:-translate-y-0.5 cursor-pointer">
                <Sparkles className="w-5 h-5 text-amber-300 dark:text-purple-600" />
                <span>Restart Your Career</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#how-it-works">
              <button className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/90 dark:bg-purple-950/50 hover:bg-white dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-700/60 text-slate-800 dark:text-purple-100 text-base font-semibold transition-all backdrop-blur-md shadow-sm cursor-pointer">
                <Play className="w-4 h-4 text-purple-600 dark:text-purple-300 fill-purple-600/20" />
                <span>See How It Works</span>
              </button>
            </a>
          </div>

          {/* Floating glass stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/90 dark:bg-[#130E24]/90 border border-purple-100 dark:border-purple-800/40 rounded-2xl p-5 text-center shadow-sm dark:shadow-glow/10 backdrop-blur-md animate-float">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-950 dark:text-white">50,000+</p>
              <p className="text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-200 mt-0.5">Women Returners</p>
            </div>

            <div className="bg-white/90 dark:bg-[#130E24]/90 border border-purple-100 dark:border-purple-800/40 rounded-2xl p-5 text-center shadow-sm dark:shadow-glow/10 backdrop-blur-md animate-float-delayed">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-950 dark:text-white">89%</p>
              <p className="text-xs sm:text-sm font-semibold text-pink-900 dark:text-pink-200 mt-0.5">Retention Rate</p>
            </div>

            <div className="bg-white/90 dark:bg-[#130E24]/90 border border-purple-100 dark:border-purple-800/40 rounded-2xl p-5 text-center shadow-sm dark:shadow-glow/10 backdrop-blur-md animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-950 dark:text-white">2.4x</p>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 mt-0.5">Faster Comeback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8FE] dark:from-[#0B0813] to-transparent pointer-events-none" />
    </section>
  );
}
