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
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatCard from '../../components/dashboard/StatCard';
import { calculateEmployerCompletion } from '../../utils/helpers';

export default function EmployerDashboardPage() {
  const { user, profile, employerProfile } = useAuth();

  const completionPercent = calculateEmployerCompletion(profile, employerProfile);
  const companyName = employerProfile?.company_name || profile?.full_name || 'Hiring Partner';

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
            value="0"
            subtitle="Job posting unlocks in Phase 3"
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
        <Card className="p-6 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/15 border-purple-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-xl flex items-center justify-center shadow-soft shrink-0">
                {companyName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-gray-900">{companyName}</h3>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    {employerProfile?.industry || 'Technology & Innovation'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1.5">
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
                      className="flex items-center gap-1 text-purple-600 hover:underline"
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

        {/* Placeholder for Job Posting functionality */}
        <Card className="p-8 border-dashed border-2 border-purple-200/90 bg-white text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-xs">
              <PlusCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 mb-2">
                <Lock className="w-3 h-3 text-purple-500" /> Phase 3 Architecture
              </span>
              <h3 className="text-lg font-bold text-gray-900">Post a Returnship or Flexible Role</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                The job creation engine, candidate ATS, and AI-powered matchmaker are scheduled for launch in Phase 3. Employers will be able to post targeted 3-6 month returnships and remote roles.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => alert("Job Posting Engine unlocks in Phase 3. Your employer profile is verified and ready for posting!")}
              >
                Preview Job Posting Form (Phase 3)
              </Button>
            </div>
          </div>
        </Card>

        {/* Hiring Returners Info Box */}
        <Card className="p-6 bg-gradient-to-r from-purple-50/50 via-pink-50/30 to-white">
          <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Why Hire Women Returning from Career Breaks?
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Returners bring emotional maturity, proven crisis management, deep loyalty, and diverse lived experiences. Studies show returnship cohorts achieve over 85% full-time retention with higher employee engagement scores.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-purple-900">
            <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold block text-sm text-purple-700">85%+</span>
              <span>Average retention rate after returnship programs</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold block text-sm text-purple-700">40% Higher</span>
              <span>Leadership loyalty and workforce stability</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold block text-sm text-purple-700">Zero Gap Bias</span>
              <span>Fair and equitable evaluation rubric</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
