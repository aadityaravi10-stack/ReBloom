import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  FileText,
  Repeat,
  Compass,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfileCompletionCard from '../../components/dashboard/ProfileCompletionCard';
import CareerJourneyTimeline from '../../components/dashboard/CareerJourneyTimeline';
import NextStepsCard from '../../components/dashboard/NextStepsCard';
import FeatureShortcutCard from '../../components/dashboard/FeatureShortcutCard';
import RecentActivityCard from '../../components/dashboard/RecentActivityCard';
import JobRecommendationsPlaceholder from '../../components/dashboard/JobRecommendationsPlaceholder';
import LearningProgressPlaceholder from '../../components/dashboard/LearningProgressPlaceholder';
import StatCard from '../../components/dashboard/StatCard';
import { calculateCandidateCompletion, formatBreakDuration, formatExperience } from '../../utils/helpers';

export default function CandidateDashboardPage() {
  const { user, profile, candidateProfile } = useAuth();

  const completionPercent = calculateCandidateCompletion(profile, candidateProfile);

  // Identify missing fields for the completion guide
  const missingFields = [];
  if (!candidateProfile?.education) missingFields.push('Education');
  if (!candidateProfile?.previous_role) missingFields.push('Previous Role');
  if (!candidateProfile?.previous_company) missingFields.push('Previous Company');
  if (!candidateProfile?.existing_skills?.length) missingFields.push('Existing Skills');
  if (!candidateProfile?.location) missingFields.push('Location');
  if (!candidateProfile?.break_duration_months) missingFields.push('Break Duration');

  const candidateName = profile?.full_name || 'Member';

  return (
    <DashboardLayout
      role="candidate"
      title={`Welcome back, ${candidateName}! 🌸`}
      subtitle="Here is your career comeback command center. Take each step at your own pace."
    >
      <div className="space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Profile Readiness"
            value={`${completionPercent}%`}
            subtitle="Readiness for returnships"
            icon={User}
            badgeText={completionPercent >= 80 ? 'High visibility' : 'Needs attention'}
          />
          <StatCard
            title="Prior Experience"
            value={formatExperience(candidateProfile?.years_of_experience)}
            subtitle={candidateProfile?.previous_role || 'Previous role not set'}
            icon={Briefcase}
          />
          <StatCard
            title="Career Break"
            value={formatBreakDuration(candidateProfile?.break_duration_months)}
            subtitle={candidateProfile?.break_reason || 'Resilience & life perspective'}
            icon={Clock}
          />
          <StatCard
            title="Work Mode"
            value={candidateProfile?.preferred_work_type || 'Remote'}
            subtitle={candidateProfile?.preferred_hours || 'Flexible hours'}
            icon={MapPin}
          />
        </div>

        {/* Profile Completion Indicator */}
        <ProfileCompletionCard
          percentage={completionPercent}
          editPath="/candidate/profile"
          missingFields={missingFields}
          role="candidate"
        />

        {/* Career Journey Overview */}
        <CareerJourneyTimeline
          currentStep={completionPercent >= 80 ? 2 : 1}
        />

        {/* 2-Column Split: Next Steps & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <NextStepsCard
              role="candidate"
              profileComplete={completionPercent >= 80}
            />
          </div>
          <div className="lg:col-span-5">
            <RecentActivityCard
              profile={profile}
              candidateProfile={candidateProfile}
            />
          </div>
        </div>

        {/* Feature Shortcuts Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Career Tools & Quick Shortcuts</h3>
            <span className="text-xs text-purple-700 dark:text-purple-400 font-bold">Phase 1 & Phase 2 Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureShortcutCard
              title="AI Resume Studio"
              description="Frame your career pause as a strategic asset with tailored bullet points."
              iconName="FileText"
              badge="Active AI Tool"
              linkTo="/candidate/tools"
            />
            <FeatureShortcutCard
              title="Returnship Explorer"
              description="Browse companies offering paid 3-6 month return-to-work programs."
              iconName="Briefcase"
              badge="Phase 3"
            />
            <FeatureShortcutCard
              title="Skill Refresher Lab"
              description="Catch up on the latest tools, frameworks, and workflows."
              iconName="GraduationCap"
              badge="Phase 3"
            />
          </div>
        </div>

        {/* Future Job Recommendations & Learning Progress Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobRecommendationsPlaceholder />
          <LearningProgressPlaceholder />
        </div>
      </div>
    </DashboardLayout>
  );
}
