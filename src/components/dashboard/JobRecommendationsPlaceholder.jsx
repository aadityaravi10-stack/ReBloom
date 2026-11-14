import React from 'react';
import { Briefcase, Lock, Sparkles } from 'lucide-react';
import Card from '../common/Card';

export default function JobRecommendationsPlaceholder() {
  return (
    <Card className="p-6 relative overflow-hidden border-dashed border-2 border-purple-200 dark:border-purple-800 bg-white/60 dark:bg-[#130E24]/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Job Matching Ecosystem</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Curated returnships & flexible openings (Phase 3)</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800">
          <Lock className="w-3 h-3" /> Phase 3 Architecture
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed font-medium">
        Once your profile is configured, ReBloom's smart matcher will filter verified returnships, flexible hours, and supportive employers matching your exact experience level and gap duration.
      </p>

      {/* Structured mock skeleton cards representing the future layout */}
      <div className="space-y-3 opacity-60 pointer-events-none select-none">
        <div className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/50 bg-white/70 dark:bg-[#18132C] flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-48 bg-purple-200 dark:bg-purple-900/60 rounded-md" />
            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-7 w-24 bg-purple-100 dark:bg-purple-950 rounded-lg" />
        </div>
        <div className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/50 bg-white/70 dark:bg-[#18132C] flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-56 bg-purple-200 dark:bg-purple-900/60 rounded-md" />
            <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-7 w-24 bg-purple-100 dark:bg-purple-950 rounded-lg" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs font-semibold text-purple-900 dark:text-purple-300">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          Matches will activate upon Phase 3 deployment.
        </span>
        <span className="font-bold text-purple-700 dark:text-purple-400">No mock jobs displayed</span>
      </div>
    </Card>
  );
}
