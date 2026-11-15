import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Sparkles,
  Heart,
  FileCheck,
  CheckCircle2,
  Clock,
  Compass,
  Building2,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ReturnshipCard from '../../components/jobs/ReturnshipCard';
import ReturnshipDetailModal from '../../components/jobs/ReturnshipDetailModal';
import { jobsService } from '../../services/jobsService';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';

export default function ReturnshipExplorerPage() {
  const { user, profile, candidateProfile } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'applied' | 'saved'
  const [search, setSearch] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [breakFilter, setBreakFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load initial data
  useEffect(() => {
    loadJobs();
    loadUserActivity();
  }, [search, workTypeFilter, departmentFilter, breakFilter]);

  const loadJobs = () => {
    const list = jobsService.getAllJobs({
      search,
      workType: workTypeFilter,
      department: departmentFilter,
      breakDuration: breakFilter,
    });
    setJobs(list);
  };

  const loadUserActivity = () => {
    setBookmarks(jobsService.getBookmarks());
    setAppliedJobs(jobsService.getMyApplications(user?.email));
  };

  const handleToggleBookmark = (jobId) => {
    const updated = jobsService.toggleBookmark(jobId);
    setBookmarks([...updated]);
  };

  const handleApply = (jobId, applicationData) => {
    jobsService.applyToJob(jobId, applicationData);
    loadUserActivity();
  };

  // Filter based on active tab
  const displayedJobs = jobs.filter((job) => {
    if (activeTab === 'saved') {
      return bookmarks.includes(job.id);
    }
    if (activeTab === 'applied') {
      return appliedJobs.some((a) => a.jobId === job.id);
    }
    return true;
  });

  // Calculate smart match count
  const candidateSkills = candidateProfile?.existing_skills || [];
  const smartMatches = jobs.filter((job) =>
    job.requiredSkills.some((skill) =>
      candidateSkills.some((cs) => cs.toLowerCase() === skill.toLowerCase())
    )
  );

  return (
    <DashboardLayout
      role="candidate"
      title="Returnship Explorer & Matching"
      subtitle="Paid 3–6 month return-to-work fellowships and flexible roles with empathetic onboarding and mentorship."
    >
      <div className="space-y-6">
        {/* Smart Match Banner */}
        {candidateSkills.length > 0 && (
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-900/20 via-purple-950/15 to-pink-950/20 border border-purple-200/80 dark:border-purple-700/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Smart Comeback Match Activated
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  We identified{' '}
                  <span className="font-bold text-purple-700 dark:text-purple-300">
                    {smartMatches.length} returnship cohorts
                  </span>{' '}
                  matching your background in{' '}
                  <span className="italic font-medium text-slate-700 dark:text-slate-200">
                    {candidateSkills.slice(0, 3).join(', ')}
                  </span>
                  .
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {smartMatches.length} Matched Roles
            </span>
          </div>
        )}

        {/* Search & Filters Card */}
        <Card className="p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search returnships by title, skills (e.g. React, Python), or company..."
                className="w-full rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Work Model Filter */}
            <select
              value={workTypeFilter}
              onChange={(e) => setWorkTypeFilter(e.target.value)}
              className="rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="All">All Work Models</option>
              <option value="Remote">100% Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering & Cloud</option>
              <option value="Operations & Management">Agile & Operations</option>
              <option value="Product Design">UI/UX Design</option>
              <option value="Data Science & BI">Data & Analytics</option>
              <option value="Human Resources">People & HR</option>
            </select>

            {/* Break Duration Filter */}
            <select
              value={breakFilter}
              onChange={(e) => setBreakFilter(e.target.value)}
              className="rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="All">Any Break Duration</option>
              <option value="1+ Years">1+ Years Break</option>
              <option value="2+ Years">2+ Years Break</option>
              <option value="3+ Years">3+ Years Break</option>
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-t border-purple-100 dark:border-purple-900/40 pt-3 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50/60 dark:bg-purple-950/40 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/40'
              }`}
            >
              All Open Cohorts ({jobs.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('applied')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'applied'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50/60 dark:bg-purple-950/40 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/40'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>My Applications ({appliedJobs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50/60 dark:bg-purple-950/40 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/40'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-pink-500" />
              <span>Saved Returnships ({bookmarks.length})</span>
            </button>
          </div>
        </Card>

        {/* Returnship Cards Grid */}
        {displayedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedJobs.map((job) => (
              <ReturnshipCard
                key={job.id}
                job={job}
                onSelect={(selected) => setSelectedJob(selected)}
                isBookmarked={bookmarks.includes(job.id)}
                isApplied={appliedJobs.some((a) => a.jobId === job.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-[#130E24] rounded-3xl border border-dashed border-purple-200 dark:border-purple-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              No returnships match your current filters
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Try clearing search terms or resetting work model filters to view all open returnee cohorts.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setWorkTypeFilter('All');
                setDepartmentFilter('All');
                setBreakFilter('All');
                setActiveTab('all');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Returnship Deep-Dive Modal with Flightpath & 1-Click Apply */}
      {selectedJob && (
        <ReturnshipDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
          isApplied={appliedJobs.some((a) => a.jobId === selectedJob.id)}
          isBookmarked={bookmarks.includes(selectedJob.id)}
          onToggleBookmark={handleToggleBookmark}
          userProfile={profile}
          candidateProfile={candidateProfile}
        />
      )}
    </DashboardLayout>
  );
}
