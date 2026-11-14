import React from 'react';
import { CheckCircle2, Clock, CircleDot, Award } from 'lucide-react';
import Card from '../common/Card';

export default function CareerJourneyTimeline({ currentStep = 1 }) {
  const steps = [
    {
      step: 1,
      title: 'Profile & Break Alignment',
      description: 'Document experience, career pause context, and preferences.',
      icon: CheckCircle2,
      status: currentStep > 1 ? 'completed' : 'current',
    },
    {
      step: 2,
      title: 'Skill Rediscovery',
      description: 'Map existing proficiencies against modern market standards.',
      icon: CircleDot,
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'upcoming',
    },
    {
      step: 3,
      title: 'Interview & AI Preparation',
      description: 'Practice career break articulation with empathetic AI coaching.',
      icon: Clock,
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'completed' : 'upcoming',
    },
    {
      step: 4,
      title: 'Restart Your Career',
      description: 'Apply to verified returnships and supportive employer partners.',
      icon: Award,
      status: currentStep === 4 ? 'current' : 'upcoming',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900">Your Comeback Roadmap</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            A guided 4-step pathway from career break to professional restart
          </p>
        </div>
        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
          Step {currentStep} of 4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((item, idx) => {
          const isDone = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div
              key={item.step}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-purple-50/70 border-purple-300 shadow-xs ring-1 ring-purple-300'
                  : isDone
                  ? 'bg-white border-emerald-200'
                  : 'bg-gray-50/50 border-gray-200/80 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-purple-600 text-white shadow-soft'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isDone ? '✓' : item.step}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isCurrent
                      ? 'text-purple-700'
                      : isDone
                      ? 'text-emerald-700'
                      : 'text-gray-400'
                  }`}
                >
                  {isCurrent ? 'In Progress' : isDone ? 'Completed' : 'Upcoming'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-gray-900 leading-snug">{item.title}</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
