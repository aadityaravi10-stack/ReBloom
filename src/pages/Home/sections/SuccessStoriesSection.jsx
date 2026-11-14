import React from 'react';
import { Star, Quote, Info, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/common/Card';
import { TESTIMONIALS } from '../../../lib/constants';

export default function SuccessStoriesSection() {
  return (
    <section id="stories" className="py-20 bg-[#FBF9FE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Inspiring Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Real Stories, Real Comebacks
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            See how women across diverse fields transitioned from career pauses back into leadership and impactful roles.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Illustrative sample case studies representing real returner outcomes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.id}
              className="p-7 flex flex-col justify-between bg-white border-purple-100 shadow-soft hover:shadow-soft-lg transition-all"
            >
              <div>
                {/* Rating & Gap Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    {item.breakDuration}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-purple-50 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-purple-200 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-xs text-purple-700 font-medium">{item.role}</p>
                  <p className="text-[11px] text-gray-400">{item.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
