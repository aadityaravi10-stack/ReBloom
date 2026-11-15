import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  X,
  UserCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import CompanyLogo from '../../components/common/CompanyLogo';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { jobsService } from '../../services/jobsService';
import { useAuth } from '../../hooks/useAuth';

export default function EmployerJobsManagementPage() {
  const { user, profile, employerProfile } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    loadEmployerData();
  }, []);

  const loadEmployerData = () => {
    const allJobs = jobsService.getAllJobs();
    setJobs(allJobs);
  };

  const openApplicantsModal = (job) => {
    setSelectedJobForApplicants(job);
    const list = jobsService.getJobApplicants(job.id);
    setApplicants(list);
  };

  const handleStatusChange = (appId, newStatus) => {
    jobsService.updateApplicantStatus(appId, newStatus);
    if (selectedJobForApplicants) {
      setApplicants(jobsService.getJobApplicants(selectedJobForApplicants.id));
    }
  };

  return (
    <DashboardLayout
      role="employer"
      title="Returnship Cohort Management"
      subtitle="Publish paid return-to-work programs, view returnee applicants, and manage your onboarding pipeline."
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Returnship Programs</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Empathetic hiring pipelines for experienced women relaunching their careers.
            </p>
          </div>
          <Link
            to="/employer/jobs/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Returnship Cohort</span>
          </Link>
        </div>

        {/* Cohort Cards Grid: Spacious 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => {
            const count = jobsService.getJobApplicants(job.id).length;
            return (
              <Card key={job.id} hoverEffect className="p-5 flex flex-col justify-between h-full border-purple-200/80 dark:border-purple-800/40">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <CompanyLogo company={job.company} logo={job.logo} size="md" />
                    <span className="text-[10px] font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-950 px-2.5 py-0.5 rounded-full">
                      {job.conversionRate || '88% Conversion'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                    {job.title}
                  </h4>
                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    {job.department} • {job.workType}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.duration}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {job.stipend}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/50 dark:bg-[#18132C] border border-purple-100 dark:border-purple-800/40 text-xs text-slate-600 dark:text-slate-300 mb-4">
                    <span className="font-bold text-purple-900 dark:text-purple-300 block mb-0.5">
                      Ramp-Up Feature:
                    </span>
                    <span className="line-clamp-1 italic text-[11px]">
                      {job.flightpath?.month1?.title || 'Gentle 30-Day Ramp-Up'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300">
                    <Users className="w-4 h-4 text-purple-500" />
                    {count} {count === 1 ? 'Applicant' : 'Applicants'}
                  </span>

                  <button
                    type="button"
                    onClick={() => openApplicantsModal(job)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 hover:bg-purple-200 dark:hover:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>View Candidates</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Candidate Applicants Review Modal */}
      {selectedJobForApplicants && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#130E24] rounded-3xl border border-purple-200/80 dark:border-purple-800/60 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-transparent border-b border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                  Applicant Pipeline
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedJobForApplicants.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJobForApplicants(null)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/80 dark:hover:bg-purple-950/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {applicants.length > 0 ? (
                applicants.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl bg-purple-50/40 dark:bg-[#18132C] border border-purple-100 dark:border-purple-800/40 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 dark:border-purple-900/40 pb-2.5">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {app.candidateName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {app.candidateEmail} • Prior: {app.previousRole} ({app.yearsExperience} exp)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          Status:
                        </span>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="rounded-xl border border-purple-200 dark:border-purple-700 bg-white dark:bg-[#130E24] px-2.5 py-1 text-xs font-bold text-purple-700 dark:text-purple-300 focus:outline-none"
                        >
                          <option value="Reviewing">Reviewing</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Cohort Accepted">Cohort Accepted</option>
                          <option value="Not Selected">Not Selected</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#130E24] border border-purple-100 dark:border-purple-800/30">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">
                          Career Pause Duration:
                        </span>
                        <span className="font-bold text-purple-700 dark:text-purple-300">
                          {app.breakDuration} ({app.breakReason})
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#130E24] border border-purple-100 dark:border-purple-800/30">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">
                          Education:
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {app.education}
                        </span>
                      </div>
                    </div>

                    {app.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {app.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {app.coverNote && (
                      <div className="p-3 rounded-xl bg-white/80 dark:bg-[#130E24]/80 border border-purple-100/80 dark:border-purple-800/30 text-xs italic text-slate-600 dark:text-slate-300">
                        "{app.coverNote}"
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-10 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    No applications received for this cohort yet.
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Candidate applications will appear here as returnees discover your listing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
