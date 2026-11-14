import React from 'react';
import { ShieldAlert, Sparkles, HeartHandshake, Compass, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#FAF8FE] dark:bg-[#0B0813] relative overflow-hidden transition-colors duration-300">
      {/* Soft accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section intro */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700 dark:text-purple-400 mb-3">
            The Problem We Solve
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.08]">
            Career breaks shouldn't mean
            <span className="text-gradient"> career endings.</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Millions of capable women take time off for caregiving, family, or health. Traditional hiring systems discard their potential. We rewrote the equation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Problem cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-white dark:bg-[#130E24] p-6 border border-rose-200 dark:border-rose-900/40 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 mb-4">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">The Systematic Barriers</span>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Algorithmic Rejection', desc: 'ATS resume filters auto-reject candidates with unexplained employment gaps.' },
                  { title: 'Confidence Erosion', desc: 'Extended time away fuels impostor syndrome despite proven career seniority.' },
                  { title: 'Skill Currency Bias', desc: 'Misconception that taking a pause means losing problem-solving acumen.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40"
                  >
                    <span className="w-6 h-6 rounded-full bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-rose-950 dark:text-rose-200">{item.title}</h4>
                      <p className="text-xs text-rose-800/90 dark:text-rose-300/80 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Solution cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl bg-white dark:bg-[#130E24] p-6 sm:p-7 border border-purple-200/80 dark:border-purple-800/40 shadow-sm dark:shadow-none h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-6">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">The ReBloom Solution</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Sparkles,
                      title: 'AI Gap Reframer',
                      desc: 'Translates caregiving, volunteering, and self-study into quantified executive competencies.',
                    },
                    {
                      icon: Compass,
                      title: 'Targeted Upskilling',
                      desc: 'Curated 2-4 week micro-refreshers that bring tech and operational knowledge up to 2026 standards.',
                    },
                    {
                      icon: HeartHandshake,
                      title: 'Direct Returnships',
                      desc: 'Pre-vetted corporate partners offering structured returnships with clear conversion to permanent roles.',
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="group p-4 rounded-2xl bg-purple-50/50 dark:bg-[#1A1430] border border-purple-100 dark:border-purple-800/40 hover:border-purple-400 dark:hover:border-purple-500/80 hover:shadow-md transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-purple-100 dark:border-purple-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-purple-900 dark:text-purple-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Inclusive by design
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Zero cost for returners
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Enterprise mentor network
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
