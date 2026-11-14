import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Sparkles, BookOpen, FileCheck } from 'lucide-react';
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
      title: 'Review Comeback Feature Previews',
      description: 'Explore upcoming AI tools designed specifically to reframe career gaps.',
      link: '/#features',
      status: 'pending',
      btnText: 'Explore Previews',
    },
    {
      title: 'Join ReBloom Community & Mentorship (Phase 4)',
      description: 'Connect with women leaders who successfully navigated career re-entries.',
      link: '#',
      status: 'upcoming',
      btnText: 'Preview Roadmap',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Recommended Next Steps</h3>
          <p className="text-xs text-gray-500 mt-0.5">Focus areas to prepare your return to work</p>
        </div>
      </div>

      <div className="space-y-3">
        {candidateSteps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-purple-50 hover:border-purple-200 bg-white hover:bg-purple-50/20 transition-all gap-3"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  step.status === 'done'
                    ? 'bg-emerald-100 text-emerald-600'
                    : step.status === 'action'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.status === 'done' ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">{step.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">{step.description}</p>
              </div>
            </div>

            {step.link.startsWith('#') ? (
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg text-center shrink-0">
                Phase Preview
              </span>
            ) : (
              <Link
                to={step.link}
                className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-lg transition-colors shrink-0"
              >
                <span>{step.btnText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
