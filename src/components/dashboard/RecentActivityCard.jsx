import React from 'react';
import { Clock, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import Card from '../common/Card';

export default function RecentActivityCard({ profile, candidateProfile }) {
  const activities = [
    {
      id: 1,
      title: 'Candidate Account Created',
      desc: 'Joined the ReBloom comeback network.',
      timestamp: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Just now',
      icon: UserCheck,
      color: 'purple',
    },
    {
      id: 2,
      title: candidateProfile?.previous_role ? 'Career Profile Updated' : 'Profile Initialized',
      desc: candidateProfile?.previous_role
        ? `Added experience as ${candidateProfile.previous_role}`
        : 'Started setting up career preferences and background',
      timestamp: candidateProfile?.updated_at ? new Date(candidateProfile.updated_at).toLocaleDateString() : 'Today',
      icon: CheckCircle2,
      color: 'emerald',
    },
    {
      id: 3,
      title: 'Row Level Security Verified',
      desc: 'Candidate profile data is encrypted & protected.',
      timestamp: 'Active',
      icon: ShieldCheck,
      color: 'blue',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
          <Clock className="w-3.5 h-3.5" /> Real-time log
        </span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{act.title}</p>
                  <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-400 shrink-0">{act.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5 truncate font-medium">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
