import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, GraduationCap, Compass, Sparkles, Repeat, Lock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const iconMap = { FileText, Briefcase, GraduationCap, Compass, Sparkles, Repeat };

const features = [
  {
    id: 'resume',
    title: 'AI Career Studio & Gap Reframer',
    tag: 'Live in Phase 2',
    isLive: true,
    icon: 'Sparkles',
    desc: 'Input break years and experience. Our AI transforms gaps into quantifiable leadership bullets and exports ATS-optimized resumes.',
    size: 'lg',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    link: '/candidate/tools',
  },
  {
    id: 'jobs',
    title: 'Smart Returnship Matching',
    tag: 'Phase 3',
    isLive: false,
    icon: 'Briefcase',
    desc: 'Algorithms optimized for career-relaunch talent. Filter by hybrid, remote, and flexible core hours.',
    size: 'sm',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'skills',
    title: 'Targeted Micro-Skilling',
    tag: 'Phase 3',
    isLive: false,
    icon: 'GraduationCap',
    desc: 'Bite-sized refreshers on modern workflows, AI productivity tools, and collaborative cloud toolsets.',
    size: 'sm',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 'guidance',
    title: 'Returner Mentorship Circle',
    tag: 'Phase 4',
    isLive: false,
    icon: 'Compass',
    desc: '1-on-1 pairing with women leaders who successfully navigated the return journey and climbed back up.',
    size: 'sm',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'interviews',
    title: 'STAR AI Mock Interviewer',
    tag: 'Phase 4',
    isLive: false,
    icon: 'FileText',
    desc: 'Interactive audio-visual AI interview sessions to master career-pause questions with poise and confidence.',
    size: 'sm',
    gradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'returnships',
    title: 'Verified Employer Portal',
    tag: 'Phase 3',
    isLive: false,
    icon: 'Repeat',
    desc: 'Direct pipeline for progressive enterprises seeking seasoned, motivated returner talent without agency fees.',
    size: 'lg',
    gradient: 'from-blue-500 to-indigo-600',
  },
];

export default function FeaturesPreviewSection() {
  return (
    <section id="features" className="py-24 bg-[#FAF8FE] dark:bg-[#0B0813] relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-300/10 dark:bg-purple-600/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700 dark:text-purple-400 mb-3">
            Platform Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Tools engineered for
            <span className="text-gradient"> your comeback.</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            From intelligent gap reframing to matched returnships, every module is designed for dignity and success.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = iconMap[f.icon] || Sparkles;
            const CardContent = (
              <div className="spotlight bento-card rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between group relative overflow-hidden bg-white dark:bg-[#130E24] border border-purple-200/80 dark:border-purple-800/40 shadow-sm hover:shadow-lg dark:hover:shadow-glow/15 transition-all">
                {/* Accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl`}
                />

                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    {f.isLive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {f.tag}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 px-3 py-1 rounded-full">
                        <Lock className="w-3 h-3" />
                        {f.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-400">
                  <span>{f.isLive ? 'Launch Tool' : 'Preview Roadmap'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );

            return f.isLive ? (
              <Link key={f.id} to={f.link} className="block h-full">
                {CardContent}
              </Link>
            ) : (
              <div key={f.id} className="h-full">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
