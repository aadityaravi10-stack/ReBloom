import React from 'react';
import { ShieldAlert, Sparkles, HeartHandshake, Compass, Users, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/common/Card';

export default function AboutSection() {
  const painPoints = [
    {
      title: 'Outdated Tooling & Tech Stacks',
      desc: 'Rapid technological shifts make returners feel unprepared, despite years of foundational problem-solving experience.',
    },
    {
      title: 'Gap Stigma in Traditional Hiring',
      desc: 'Conventional ATS software filters out resumes with employment gaps without recognizing caregiving or personal resilience.',
    },
    {
      title: 'Confidence Loss & Impostor Syndrome',
      desc: 'Stepping back into high-intensity environments can feel intimidating without empathetic support and peer camaraderie.',
    },
  ];

  const solutions = [
    {
      icon: Sparkles,
      title: 'Reframing Life Experience',
      desc: 'Our AI and expert mentors turn career breaks into stories of resilience, leadership, and emotional intelligence.',
    },
    {
      icon: Compass,
      title: 'Micro-Skilling & Modern Stacks',
      desc: 'Targeted refresher roadmaps that bridge knowledge gaps without overwhelming users with 4-year curricula.',
    },
    {
      icon: HeartHandshake,
      title: 'Returnships With Dignity',
      desc: 'Direct partnerships with inclusive employers offering structured return-to-work onboarding and remote flexibility.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-y border-purple-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            About ReBloom
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Why Career Breaks Shouldn't Mean <br />
            <span className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Career Endings.
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Millions of exceptionally skilled women step away from the workforce to nurture children, support aging family members, or manage life transitions. When they choose to return, they face an uphill battle. ReBloom was created to tear down those barriers.
          </p>
        </div>

        {/* Contrast Grid: The Challenge vs The ReBloom Way */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* The Struggle */}
          <div className="bg-rose-50/40 rounded-3xl p-8 border border-rose-100/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                The Systemic Barrier
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">
                What Women Face Today
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Traditional hiring assumes linear careers. Breaks are penalized, recruiters ask uncomfortable questions, and rigid 9-to-5 schedules push capable leaders out of the talent pipeline.
              </p>
            </div>

            <div className="space-y-4">
              {painPoints.map((item, idx) => (
                <div key={idx} className="bg-white/80 p-4 rounded-2xl border border-rose-100">
                  <h4 className="font-bold text-xs text-rose-950">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The ReBloom Solution */}
          <div className="bg-gradient-to-br from-purple-50/80 via-purple-50/30 to-pink-50/40 rounded-3xl p-8 border border-purple-100 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-purple-800 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 text-purple-600" />
                The ReBloom Solution
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">
                How We Power Your Comeback
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                We replace outdated barriers with a supportive comeback ecosystem—pairing modern skill validation with verified returnship opportunities at forward-thinking companies.
              </p>
            </div>

            <div className="space-y-4">
              {solutions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
