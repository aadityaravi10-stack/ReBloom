import React from 'react';
import {
  MapPin,
  Clock,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Sparkles,
} from 'lucide-react';
import Badge from '../common/Badge';
import Card from '../common/Card';

export default function ReturnshipCard({
  job,
  onSelect,
  isBookmarked = false,
  isApplied = false,
  onToggleBookmark,
}) {
  return (
    <Card
      hoverEffect
      className="p-5 flex flex-col justify-between h-full group border-purple-200/80 dark:border-purple-800/40 relative transition-all"
    >
      <div>
        {/* Top Header: Logo + Company & Title + Bookmark */}
        <div className="flex items-start justify-between gap-2.5 mb-2.5">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
              {job.logo || '💼'}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-extrabold text-purple-700 dark:text-purple-300 block truncate">
                {job.company}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug line-clamp-2 h-[2.65rem] flex items-center">
                {job.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark && onToggleBookmark(job.id);
            }}
            className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-all cursor-pointer shrink-0 mt-0.5 ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                : 'bg-white/80 dark:bg-[#18132C] text-slate-400 hover:text-rose-500 border-purple-100 dark:border-purple-800/40'
            }`}
            title={isBookmarked ? 'Saved' : 'Save'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Badges Bar: Conversion % + Accepted Break + Stipend (Fixed Height) */}
        <div className="flex items-center gap-1.5 mb-2.5 h-6 overflow-hidden">
          <span className="text-[10px] font-bold text-pink-700 dark:text-pink-300 bg-pink-100/80 dark:bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-200 dark:border-pink-800 shrink-0">
            {job.conversionRate || '88% Conversion'}
          </span>
          <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 shrink-0">
            {job.acceptedBreak || '1+ Years Break'}
          </span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0 truncate">
            {job.stipend}
          </span>
        </div>

        {/* Location & Duration (Fixed Height) */}
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2.5 font-medium h-5 truncate">
          <span className="flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-purple-500" />
            <span className="truncate max-w-[120px]">{job.location}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-pink-500" />
            <span>{job.duration}</span>
          </span>
        </div>

        {/* Description (Fixed 2 lines) */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3 h-[2.4rem]">
          {job.description}
        </p>

        {/* 30-60-90 Flightpath Callout Tag (Fixed Height) */}
        <div className="h-8 px-2.5 rounded-xl bg-purple-50/60 dark:bg-[#18132C]/80 border border-purple-100 dark:border-purple-800/40 mb-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300 text-[11px] truncate">
            <Compass className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span>30-60-90 Ramp-Up Plan</span>
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 pl-1">
            {job.empathyScorecard?.coreHours?.split('(')[0]?.trim() || 'Core Hours'}
          </span>
        </div>

        {/* Required Skills Badges (Fixed 1-line Height) */}
        <div className="flex items-center gap-1.5 mb-3 h-6 overflow-hidden">
          {job.requiredSkills?.slice(0, 3).map((skill) => (
            <Badge key={skill} color="purple" size="sm" className="shrink-0 max-w-[110px] truncate">
              {skill}
            </Badge>
          ))}
          {job.requiredSkills?.length > 3 && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold shrink-0">
              +{job.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer: Uniform Baseline Across All Cards */}
      <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between gap-2 mt-auto">
        {isApplied ? (
          <span className="h-8 inline-flex items-center gap-1 px-2.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Applied • Reviewing</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onSelect(job)}
            className="h-8 inline-flex items-center px-2.5 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors cursor-pointer shrink-0"
          >
            Preview Plan
          </button>
        )}

        <button
          type="button"
          onClick={() => onSelect(job)}
          className="h-8 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer group-hover:scale-[1.02] shrink-0"
        >
          <span>{isApplied ? 'View Details' : 'Explore & Apply'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </Card>
  );
}
