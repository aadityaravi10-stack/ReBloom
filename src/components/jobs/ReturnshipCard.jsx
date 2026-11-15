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
  Users,
} from 'lucide-react';
import Badge from '../common/Badge';
import Card from '../common/Card';
import CompanyLogo from '../common/CompanyLogo';

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
      className="p-5 sm:p-6 flex flex-col justify-between h-full group border-purple-200/80 dark:border-purple-800/40 relative transition-all shadow-xs hover:shadow-lg"
    >
      <div className="space-y-4">
        {/* Top Header: Logo + Company & Title + Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0 flex-1">
            <CompanyLogo
              company={job.company}
              logo={job.logo}
              size="md"
              className="mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-black text-purple-700 dark:text-purple-300 tracking-wide uppercase">
                  {job.company}
                </span>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800/60">
                  {job.department}
                </span>
                {job.featured && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> High Returnee Trust
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
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
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all cursor-pointer shrink-0 mt-0.5 ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 shadow-2xs'
                : 'bg-white/80 dark:bg-[#18132C] text-slate-400 hover:text-rose-500 border-purple-100 dark:border-purple-800/40'
            }`}
            title={isBookmarked ? 'Saved in My Bookmarks' : 'Save Returnship'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Primary Empathy Highlights Bar: Clear, unclipped badges */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {/* Prominent Guaranteed Stipend */}
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-200 bg-emerald-100/90 dark:bg-emerald-950/90 px-3 py-1 rounded-xl border border-emerald-300 dark:border-emerald-700/80 shadow-2xs">
            <span className="text-sm leading-none">💰</span>
            <span>{job.stipend}</span>
          </span>

          {/* Full-Time Conversion Rate */}
          <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-100/80 dark:bg-pink-950/80 px-2.5 py-1 rounded-xl border border-pink-200 dark:border-pink-800">
            <span className="text-xs leading-none">📈</span>
            <span>{job.conversionRate}</span>
          </span>

          {/* Accepted Career Break Duration */}
          <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70 px-2.5 py-1 rounded-xl border border-purple-200 dark:border-purple-800">
            <span className="text-xs leading-none">🌱</span>
            <span>{job.acceptedBreak}</span>
          </span>

          {/* Work Model & Flexibility */}
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-1 rounded-xl border border-blue-200 dark:border-blue-800">
            <span>{job.workType}</span>
            <span>•</span>
            <span>{job.hours}</span>
          </span>
        </div>

        {/* Location & Program Duration with clear icons */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>{job.location}</span>
          </span>
          <span className="text-purple-300 dark:text-purple-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span>{job.duration}</span>
          </span>
          <span className="text-purple-300 dark:text-purple-700 hidden sm:inline">•</span>
          <span className="text-[11px] text-slate-400">
            Posted {job.postedDate}
          </span>
        </div>

        {/* Returnship Narrative / Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {job.description}
        </p>

        {/* Empathetic 30-60-90 Ramp-Up & Mentorship Callout */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50/90 via-pink-50/30 to-purple-50/70 dark:from-[#18132C] dark:via-[#1c1436] dark:to-[#18132C] border border-purple-200/80 dark:border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-900/60 flex items-center justify-center text-pink-600 dark:text-pink-300 shrink-0 shadow-2xs">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-purple-950 dark:text-purple-200 text-xs block">
                30-60-90 Ramp-Up Flightpath
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate block">
                {job.empathyScorecard?.mentorPairing || 'Dedicated Senior Buddy Pairing'}
              </span>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0 bg-white/70 dark:bg-[#130E24]/70 px-3 py-1.5 rounded-xl border border-purple-100 dark:border-purple-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
              Core Focus Hours
            </span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              {job.empathyScorecard?.coreHours || '10:00 AM – 3:00 PM IST'}
            </span>
          </div>
        </div>

        {/* Required Skills & Modern Tech Stack */}
        <div className="pt-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-purple-900 dark:text-purple-400 mb-1.5">
            Key Stack & Competencies:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills?.map((skill) => (
              <Badge key={skill} color="purple" size="sm" className="font-semibold px-2.5 py-1 text-xs">
                {skill}
              </Badge>
            ))}
            {job.bonusSkills?.map((skill) => (
              <span
                key={skill}
                className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-purple-50/60 dark:bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-200/60 dark:border-purple-800/40"
              >
                +{skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer: Uniform Baseline Across All Cards */}
      <div className="pt-4 mt-5 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between gap-3">
        {isApplied ? (
          <span className="h-10 inline-flex items-center gap-1.5 px-3.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Applied • Under Review</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onSelect(job)}
            className="h-10 inline-flex items-center gap-1.5 px-3 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-purple-500" />
            <span>Preview 30-60-90 Plan</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onSelect(job)}
          className="h-10 inline-flex items-center gap-2 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <span>{isApplied ? 'View Application' : 'Explore & Apply'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </Card>
  );
}
