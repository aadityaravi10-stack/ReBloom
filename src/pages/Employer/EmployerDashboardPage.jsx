import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Briefcase,
  Users,
  PlusCircle,
  Sparkles,
  Lock,
  Globe,
  MapPin,
  Mail,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatCard from '../../components/dashboard/StatCard';
import { calculateEmployerCompletion } from '../../utils/helpers';
import { jobsService } from '../../services/jobsService';

export default function EmployerDashboardPage() {
  const { user, profile, employerProfile } = useAuth();

  const completionPercent = calculateEmployerCompletion(profile, employerProfile);
  const companyName = employerProfile?.company_name || profile?.full_name || 'Hiring Partner';
  const activeJobsCount = jobsService.getAllJobs().length;

  return (
    <DashboardLayout
      role="employer"
      title={`Welcome, ${companyName}! 🏢`}
      subtitle="Connect with talented women re-entering the workforce through verified returnships and flexible roles."
    >
      <div className="space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Profile Status"
            value={`${completionPercent}%`}
            subtitle="Employer verified status"
            icon={Building2}
            badgeText={completionPercent >= 80 ? 'Verified Partner' : 'Complete Setup'}
          />
          <StatCard
            title="Active Job Postings"
            value={activeJobsCount}
            subtitle="Live returnship cohorts"
            icon={Briefcase}
          />
          <StatCard
            title="Candidate Talent Pool"
            value="50k+"
            subtitle="Returning professionals"
            icon={Users}
          />
          <StatCard
            title="Diversity Rating"
            value="A+"
            subtitle="Inclusive hiring commitment"
            icon={Sparkles}
          />
        </div>

        {/* Company Profile Quick View Card */}
        <Card className="p-6 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/15 dark:from-[#150F2A] dark:via-[#130E24] dark:to-[#18132C] border border-purple-200/80 dark:border-purple-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                {companyName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">{companyName}</h3>
                  <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                    {employerProfile?.industry || 'Technology & Innovation'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 mt-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-500" />
                    {employerProfile?.location || 'Location not specified'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-purple-500" />
                    {employerProfile?.contact_email || user?.email}
                  </span>
                  {employerProfile?.website && (
                    <a
                      href={employerProfile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-bold"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      {employerProfile.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <Link to="/employer/profile">
              <Button variant="accent" size="sm">
                Edit Company Profile
              </Button>
            </Link>
          </div>
        </Card>

        {/* Returnship Posting Engine Card */}
        <Card className="p-8 border border-purple-200/80 dark:border-purple-800/40 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30 dark:from-[#18132C] dark:via-[#140E24] dark:to-[#1B1433] text-center shadow-sm">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center mx-auto shadow-md">
              <PlusCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Returnship Engine Live
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Post a Returnship or Flexible Cohort
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                Create structured 30-60-90 day ramp-up cohorts, specify mentorship support, and connect directly with high-retention women professionals relaunching their careers.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/employer/jobs/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish New Cohort</span>
              </Link>
              <Link
                to="/employer/jobs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
              >
                <Users className="w-4 h-4 text-purple-500" />
                <span>View Applicants & Cohorts</span>
              </Link>
            </div>
          </div>
        </Card>

        {/* Hiring Returners Info Box */}
        <Card className="p-6 bg-gradient-to-r from-purple-50/60 via-pink-50/40 to-white dark:from-purple-950/40 dark:via-[#18132C] dark:to-[#130E24]">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Why Hire Women Returning from Career Breaks?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
            Returners bring emotional maturity, proven crisis management, deep loyalty, and diverse lived experiences. Studies show returnship cohorts achieve over 85% full-time retention with higher employee engagement scores.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-purple-900 dark:text-purple-200">
            <div className="bg-white dark:bg-[#18132C] p-3.5 rounded-xl border border-purple-100 dark:border-purple-800/50 shadow-xs">
              <span className="font-black block text-sm text-purple-700 dark:text-purple-300">85%+</span>
              <span className="text-slate-600 dark:text-slate-300">Average retention rate after returnship programs</span>
            </div>
            <div className="bg-white dark:bg-[#18132C] p-3.5 rounded-xl border border-purple-100 dark:border-purple-800/50 shadow-xs">
              <span className="font-black block text-sm text-purple-700 dark:text-purple-300">40% Higher</span>
              <span className="text-slate-600 dark:text-slate-300">Leadership loyalty and workforce stability</span>
            </div>
            <div className="bg-white dark:bg-[#18132C] p-3.5 rounded-xl border border-purple-100 dark:border-purple-800/50 shadow-xs">
              <span className="font-black block text-sm text-purple-700 dark:text-purple-300">Zero Gap Bias</span>
              <span className="text-slate-600 dark:text-slate-300">Fair and equitable evaluation rubric</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
