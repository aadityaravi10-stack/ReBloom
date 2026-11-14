import React from 'react';
import { UserPlus, Search, Sparkles, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Create Safe Profile',
    desc: 'Share your background, break period, and preferred flexibility without fear of ATS penalty. Zero stigma.',
    icon: UserPlus,
  },
  {
    num: '02',
    title: 'AI Gap Reframer',
    desc: 'Input your break narrative. Our AI translates everyday leadership and projects into resume-ready bullet points.',
    icon: Sparkles,
  },
  {
    num: '03',
    title: 'Micro-Skill Refresh',
    desc: 'Identify in-demand modern tools (AI tools, Agile, modern stacks) and complete bite-sized refreshers.',
    icon: Search,
  },
  {
    num: '04',
    title: 'Matched Returnships',
    desc: 'Get discovered by vetted employers offering 3-6 month returnships with transparent onboarding and full-time paths.',
    icon: Rocket,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-[#0E0A1A] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700 dark:text-purple-400 mb-3">
            Your Pathway
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Four steps to
            <span className="text-gradient"> your comeback.</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4">
            A clear, dignified, and empowering transition from career pause to full-time career leadership.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent -translate-y-1/2 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative group">
                  <div className="spotlight bento-card bg-purple-50/50 dark:bg-[#151028] rounded-3xl border border-purple-200/80 dark:border-purple-800/40 p-6 sm:p-7 h-full flex flex-col justify-between shadow-sm dark:shadow-none hover:shadow-lg transition-all">
                    <div>
                      {/* Big number */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="number-outline text-6xl font-black leading-none select-none">
                          {step.num}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-purple-100 dark:border-purple-900/40 text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                      Step {step.num}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
