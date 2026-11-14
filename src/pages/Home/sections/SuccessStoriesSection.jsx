import React from 'react';
import { Star, Info, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../../lib/constants';

export default function SuccessStoriesSection() {
  return (
    <section id="stories" className="py-24 bg-white dark:bg-[#0E0A1A] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700 dark:text-purple-400 mb-3">
              Inspiring Journeys
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Real journeys,
              <span className="text-gradient"> real comebacks.</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mt-3">
              See how women restarted their careers after 2–7 year gaps and stepped into senior leadership roles.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-amber-300 dark:border-amber-700/60 self-start lg:self-end">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Illustrative community case studies</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.id}
              className={`spotlight bento-card rounded-3xl p-7 flex flex-col justify-between border border-purple-200/80 dark:border-purple-800/40 bg-purple-50/40 dark:bg-[#140E26] h-full shadow-sm dark:shadow-none hover:shadow-lg transition-all ${
                i === 1 ? 'md:-translate-y-3' : ''
              }`}
            >
              <div>
                {/* Quote icon */}
                <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-5 shadow-sm">
                  <Quote className="w-5 h-5" />
                </div>

                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed mb-6 font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-400 dark:ring-purple-600 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mt-0.5">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
