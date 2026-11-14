import React from 'react';
import { UserPlus, Sparkles, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/common/Card';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      tagline: 'Honor your past, articulate your present',
      desc: 'Set up your background, previous achievements, and career break context with zero shame and full transparency.',
      icon: UserPlus,
      color: 'purple',
    },
    {
      step: '02',
      title: 'Rediscover Your Skills',
      tagline: 'Identify your strengths & transferrable assets',
      desc: 'Map your past expertise to current market expectations and discover hidden transferrable leadership skills gained during your break.',
      icon: Sparkles,
      color: 'pink',
    },
    {
      step: '03',
      title: 'Prepare for Opportunities',
      tagline: 'Polish resumes & practice interviews',
      desc: 'Reframe career gaps with confidence using AI coaching, interview simulations, and tailored career comeback narratives.',
      icon: Award,
      color: 'peach',
    },
    {
      step: '04',
      title: 'Restart Your Career',
      tagline: 'Step into roles built for your success',
      desc: 'Connect directly with employers actively searching for comeback talent through verified returnships, flexible roles, and hybrid positions.',
      icon: ArrowUpRight,
      color: 'purple',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#FBF9FE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            A Clear Pathway
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            How ReBloom Works
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your return to professional life broken down into four clear, stress-free milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                hoverEffect
                className="p-6 relative flex flex-col justify-between group bg-white border-purple-100/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black tracking-tight text-purple-300 group-hover:text-purple-600 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-purple-600 mt-1 mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-50 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 group-hover:text-purple-700 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Step {index + 1} of 4</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
