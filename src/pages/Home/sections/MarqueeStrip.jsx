import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const items = [
  'Zero Gap Stigma',
  'Verified Returnships',
  'AI-Powered Career Tools',
  'Flexible Work Matching',
  'Inclusive Mentorship',
  '100% Free for Candidates',
  'STAR Interview Prep',
  'Transferable Skill Mapping',
  'Executive Gap Reframing',
  'Supportive Professional Community',
];

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden bg-purple-100/70 dark:bg-[#120D22] py-4 border-y border-purple-200/80 dark:border-purple-900/50 transition-colors duration-300">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 mx-6 text-sm font-bold text-purple-950 dark:text-purple-200 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
