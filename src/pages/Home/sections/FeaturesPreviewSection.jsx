import React from 'react';
import {
  FileText,
  Briefcase,
  GraduationCap,
  Compass,
  Sparkles,
  Repeat,
  Lock,
  ArrowRight,
} from 'lucide-react';
import Card from '../../../components/common/Card';
import { FEATURE_PREVIEWS } from '../../../lib/constants';

const iconMap = {
  FileText,
  Briefcase,
  GraduationCap,
  Compass,
  Sparkles,
  Repeat,
};

export default function FeaturesPreviewSection() {
  return (
    <section id="features" className="py-20 bg-white border-t border-purple-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Features Built For Your Comeback
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            A comprehensive suite of career acceleration tools purpose-engineered for women returning to the workforce.
          </p>
          <p className="text-xs font-medium text-purple-700 bg-purple-50/80 inline-block px-3 py-1 rounded-full border border-purple-200">
            Interactive previews of upcoming modules rolling out in Phases 2 – 4
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_PREVIEWS.map((feature) => {
            const Icon = iconMap[feature.icon] || Sparkles;

            return (
              <Card
                key={feature.id}
                hoverEffect
                className="p-7 flex flex-col justify-between group border-purple-100/80 hover:border-purple-300 relative overflow-hidden"
              >
                {/* Subtle top color strip */}
                <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${feature.color}`} />

                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50/90 px-2.5 py-1 rounded-full border border-purple-100">
                      <Lock className="w-3 h-3 text-purple-500" />
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-purple-600 mt-1 mb-3">
                    {feature.tagline}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-50 flex items-center justify-between text-xs text-purple-700 font-semibold">
                  <span className="text-gray-400 group-hover:text-purple-600 transition-colors">
                    Preview Architecture
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
