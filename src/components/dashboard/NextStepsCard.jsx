import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Card from '../common/Card';

export default function NextStepsCard({ role = 'candidate', profileComplete = false }) {
  const candidateSteps = [
    {
      title: profileComplete ? 'Review & Polish Profile' : 'Complete Your Profile & Work Preferences',
      description: 'Detail your previous achievements, skills, and ideal working hours.',
      link: '/candidate/profile',
      status: profileComplete ? 'done' : 'action',
      btnText: profileComplete ? 'Edit Profile' : 'Complete Profile',
    },
    {
      title: 'AI Career Studio & Gap Reframer',
      description: 'Generate ATS-friendly resume bullets and structured STAR interview answers.',
      link: '/candidate/tools',
      status: 'action',
      btnText: 'Open Studio',
    },
    {
      title: 'Join ReBloom Community & Mentorship (Coming Soon)',
      description: 'Connect with women leaders who successfully navigated career re-entries.',
      link: '#',
      status: 'upcoming',
      btnText: 'Coming Soon',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recommended Next Steps</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Focus areas to prepare your return to work</p>
        </div>
      </div>

      <div className="space-y-3">
        {candidateSteps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-purple-100 dark:border-purple-800/40 hover:border-purple-300 dark:hover:border-purple-600 bg-purple-50/30 dark:bg-[#18132C] transition-all gap-3"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  step.status === 'done'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : step.status === 'action'
                    ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {step.status === 'done' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-0.5">{step.description}</p>
              </div>
            </div>

            {step.link.startsWith('#') ? (
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-center shrink-0">
                Coming Soon
              </span>
            ) : (
              <Link
                to={step.link}
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-950/80 hover:bg-purple-200 dark:hover:bg-purple-900 px-3.5 py-1.5 rounded-lg transition-colors shrink-0 border border-purple-200 dark:border-purple-800"
              >
                <span>{step.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
