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
      className="p-5.5 flex flex-col justify-between h-full group border-purple-200/80 dark:border-purple-800/40 relative"
    >
      <div>
        {/* Top Header: Logo + Meta + Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
              {job.logo || '💼'}
            </div>
            <div>
              <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300">
                {job.company}
              </span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
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
            className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                : 'bg-white/80 dark:bg-[#18132C] text-slate-400 hover:text-rose-500 border-purple-100 dark:border-purple-800/40'
            }`}
            title={isBookmarked ? 'Saved' : 'Save'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Badges Bar: Conversion % + Duration + Accepted Break */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-bold text-pink-700 dark:text-pink-300 bg-pink-100/80 dark:bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-200 dark:border-pink-800">
            {job.conversionRate || '88% Conversion'}
          </span>
          <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
            {job.acceptedBreak || '1+ Years Break'}
          </span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            {job.stipend}
          </span>
        </div>

        {/* Location & Work Type */}
        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-purple-500" />
            {job.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-pink-500" />
            {job.duration}
          </span>
        </div>

        {/* Brief Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* 30-60-90 Flightpath Callout Tag */}
        <div className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-[#18132C]/80 border border-purple-100 dark:border-purple-800/40 mb-4 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300 text-[11px]">
            <Compass className="w-3.5 h-3.5 text-pink-500" />
            30-60-90 Ramp-Up Plan
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            {job.empathyScorecard?.coreHours || 'Core Hours'}
          </span>
        </div>

        {/* Required Skills Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.requiredSkills?.slice(0, 3).map((skill) => (
            <Badge key={skill} color="purple" size="sm">
              {skill}
            </Badge>
          ))}
          {job.requiredSkills?.length > 3 && (
            <span className="text-[10px] text-slate-500 font-bold self-center">
              +{job.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between gap-2">
        {isApplied ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Applied • Reviewing
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onSelect(job)}
            className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white cursor-pointer"
          >
            Preview Flightpath
          </button>
        )}

        <button
          type="button"
          onClick={() => onSelect(job)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer group-hover:scale-[1.02]"
        >
          <span>{isApplied ? 'View Details' : 'Explore & Apply'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </Card>
  );
}
