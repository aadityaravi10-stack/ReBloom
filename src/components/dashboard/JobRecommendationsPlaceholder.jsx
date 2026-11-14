import React from 'react';
import { Briefcase, Lock, Sparkles, Filter } from 'lucide-react';
import Card from '../common/Card';

export default function JobRecommendationsPlaceholder() {
  return (
    <Card className="p-6 relative overflow-hidden border-dashed border-2 border-purple-200/90 bg-gradient-to-b from-white to-purple-50/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Job Matching Ecosystem</h3>
            <p className="text-xs text-gray-500">Curated returnships & flexible openings (Phase 3)</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
          <Lock className="w-3 h-3" /> Phase 3 Architecture
        </span>
      </div>

      <p className="text-xs text-gray-600 mb-4 leading-relaxed">
        Once your profile is configured, ReBloom's smart matcher will filter verified returnships, flexible hours, and supportive employers matching your exact experience level and gap duration.
      </p>

      {/* Structured mock skeleton cards representing the future layout */}
      <div className="space-y-3 opacity-60 pointer-events-none select-none">
        <div className="p-3.5 rounded-xl border border-purple-100 bg-white/70 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-48 bg-purple-200/70 rounded-md" />
            <div className="h-3 w-32 bg-gray-200 rounded-md" />
          </div>
          <div className="h-7 w-24 bg-purple-100 rounded-lg" />
        </div>
        <div className="p-3.5 rounded-xl border border-purple-100 bg-white/70 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-56 bg-purple-200/70 rounded-md" />
            <div className="h-3 w-40 bg-gray-200 rounded-md" />
          </div>
          <div className="h-7 w-24 bg-purple-100 rounded-lg" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-purple-800">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Matches will activate upon Phase 3 deployment.
        </span>
        <span className="font-semibold text-purple-600">No mock jobs displayed</span>
      </div>
    </Card>
  );
}
