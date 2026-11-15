import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Clock, MapPin, Sparkles, Compass } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import CompanyLogo from '../common/CompanyLogo';
import { jobsService } from '../../services/jobsService';

export default function LiveReturnshipsSection({ candidateProfile }) {
  const featuredJobs = jobsService.getAllJobs().slice(0, 2);

  return (
    <Card className="p-6 relative overflow-hidden border-purple-200/80 dark:border-purple-800/40">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Returnship Programs</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Paid cohorts tailored for career relaunchers
            </p>
          </div>
        </div>
        <Link
          to="/candidate/jobs"
          className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white flex items-center gap-1 group"
        >
          <span>View All Cohorts</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="space-y-3">
        {featuredJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-2xl bg-purple-50/40 dark:bg-[#18132C] border border-purple-100 dark:border-purple-800/40 hover:border-purple-300 dark:hover:border-purple-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <CompanyLogo
                company={job.company}
                logo={job.logo}
                size="md"
                className="w-11 h-11 rounded-xl shrink-0 mt-0.5"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300">
                    {job.company}
                  </span>
                  <span className="text-[10px] font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-950 px-1.5 py-0.2 rounded-full">
                    {job.conversionRate}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                  {job.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-500" /> {job.location}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {job.stipend}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/candidate/jobs"
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Flightpath</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs font-semibold text-purple-900 dark:text-purple-300">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          Smart matching activated from your profile skills.
        </span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400">Verified Opportunities</span>
      </div>
    </Card>
  );
}
