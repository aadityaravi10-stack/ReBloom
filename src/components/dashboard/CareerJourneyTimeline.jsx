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
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Comeback Roadmap</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            A guided 4-step pathway from career break to professional restart
          </p>
        </div>
        <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-950/80 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
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
                  ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-400 dark:border-purple-700 ring-2 ring-purple-400/40'
                  : isDone
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-purple-50/30 dark:bg-[#18132C]/60 border-purple-100 dark:border-purple-900/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-purple-600 text-white shadow-sm'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isDone ? '✓' : item.step}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isCurrent
                      ? 'text-purple-700 dark:text-purple-300'
                      : isDone
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isCurrent ? 'In Progress' : isDone ? 'Completed' : 'Upcoming'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h4>
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
