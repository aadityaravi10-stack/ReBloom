import React, { useState } from 'react';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  Heart,
  TrendingUp,
  UserCheck,
  Send,
  Building2,
} from 'lucide-react';
import Badge from '../common/Badge';
import CompanyLogo from '../common/CompanyLogo';

export default function ReturnshipDetailModal({
  job,
  onClose,
  onApply,
  isApplied = false,
  isBookmarked = false,
  onToggleBookmark,
  userProfile = {},
  candidateProfile = {},
}) {
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(isApplied);

  if (!job) return null;

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onApply(job.id, {
        full_name: userProfile.full_name,
        email: userProfile.email,
        break_duration_months: candidateProfile.break_duration_months,
        break_reason: candidateProfile.break_reason,
        years_of_experience: candidateProfile.years_of_experience,
        previous_role: candidateProfile.previous_role,
        existing_skills: candidateProfile.existing_skills,
        education: candidateProfile.education,
        coverNote,
      });
      setIsSubmitting(false);
      setAppliedSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#130E24] rounded-3xl border border-purple-200/80 dark:border-purple-800/60 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-transparent border-b border-purple-100 dark:border-purple-900/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/80 dark:hover:bg-purple-950/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
            <div className="flex items-start gap-4">
              <CompanyLogo company={job.company} logo={job.logo} size="lg" />
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300">
                    {job.company}
                  </span>
                  <span className="text-[10px] font-bold bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-full border border-pink-200 dark:border-pink-800">
                    {job.conversionRate || '88% Conversion'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {job.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mt-1 flex-wrap font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-500" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    {job.duration}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {job.stipend}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleBookmark(job.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer shrink-0 self-start sm:self-auto ${
                isBookmarked
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                  : 'bg-white dark:bg-[#18132C] text-slate-400 hover:text-rose-500 border-purple-200/80 dark:border-purple-800/40'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Returnship'}
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200 text-sm">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-2">
              About This Returnship
            </h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {job.description}
            </p>
          </div>

          {/* 30-60-90 Day Flightpath (The WOW Out-of-the-Box Factor) */}
          <div className="bg-gradient-to-br from-purple-50/70 via-purple-50/30 to-pink-50/40 dark:from-[#18132C] dark:via-[#150F28] dark:to-[#1B1433] p-5 rounded-2xl border border-purple-200/80 dark:border-purple-700/60 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-purple-200/60 dark:border-purple-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-spin-slow" />
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  30-60-90 Day Returnee Flightpath
                </h4>
              </div>
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-2.5 py-0.5 rounded-full">
                Zero Day 1 Pressure
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#20183A]/80 border border-purple-100 dark:border-purple-800/40 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Days 1–30 • Soft Landing
                </span>
                <p className="font-bold text-xs text-slate-900 dark:text-white">
                  {job.flightpath?.month1?.title || 'Tooling & Mentor Ramp-up'}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {job.flightpath?.month1?.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#20183A]/80 border border-purple-100 dark:border-purple-800/40 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  Days 31–60 • Squad Impact
                </span>
                <p className="font-bold text-xs text-slate-900 dark:text-white">
                  {job.flightpath?.month2?.title || 'Collaborative Deliverables'}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {job.flightpath?.month2?.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#20183A]/80 border border-purple-100 dark:border-purple-800/40 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Days 61–90+ • Full Flight
                </span>
                <p className="font-bold text-xs text-slate-900 dark:text-white">
                  {job.flightpath?.month3?.title || 'Full-Time Conversion'}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {job.flightpath?.month3?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Empathy & Flexibility Scorecard */}
          <div className="bg-white dark:bg-[#18132C] p-4.5 rounded-2xl border border-purple-100 dark:border-purple-800/40 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verified Empathy & Flexibility Scorecard
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-[#1F1738] border border-purple-100 dark:border-purple-800/30">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                  Core Hours Window:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {job.empathyScorecard?.coreHours || '10:00 AM – 3:30 PM'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-[#1F1738] border border-purple-100 dark:border-purple-800/30">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                  Mentorship Provision:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {job.empathyScorecard?.mentorPairing || 'Dedicated Senior Buddy'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-[#1F1738] border border-purple-100 dark:border-purple-800/30">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                  Caregiver & Family Policy:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {job.empathyScorecard?.familyLeave || 'Flexible Emergency Leave'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-[#1F1738] border border-purple-100 dark:border-purple-800/30">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                  Work Schedule Trust:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {job.empathyScorecard?.flexibleSchedule || 'Asynchronous Friendly'}
                </span>
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-2">
              Skills Looked For
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills?.map((skill) => (
                <Badge key={skill} color="purple">
                  {skill}
                </Badge>
              ))}
              {job.bonusSkills?.map((skill) => (
                <Badge key={skill} color="pink">
                  + {skill} (Nice to have)
                </Badge>
              ))}
            </div>
          </div>

          {/* Application Box */}
          <div className="pt-4 border-t border-purple-100 dark:border-purple-900/40">
            {appliedSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700/60 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base text-emerald-900 dark:text-emerald-200">
                  Application Submitted! 🌸
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                  Your ReBloom profile and career break alignment details were sent directly to{' '}
                  <span className="font-bold">{job.company}'s Returnship Review Committee</span>.
                  Check your status under the "My Applications" tab!
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-[#18132C] border border-purple-100 dark:border-purple-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      1-Click Apply using your ReBloom Profile
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Your profile data (
                    <span className="font-semibold text-purple-700 dark:text-purple-300">
                      {candidateProfile.break_duration_months || 24}mo break,{' '}
                      {candidateProfile.previous_role || 'Previous role'},{' '}
                      {candidateProfile.existing_skills?.length || 4} skills
                    </span>
                    ) will be shared directly with {job.company}.
                  </p>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Optional Personal Note or Career Break Reframe:
                  </label>
                  <textarea
                    rows={2}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="e.g. Excited to apply my resilience and problem-solving back into modern engineering..."
                    className="w-full rounded-xl border border-purple-200/80 dark:border-purple-700/60 bg-white dark:bg-[#130E24] p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit 1-Click Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
