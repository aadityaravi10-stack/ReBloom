import React from 'react';
import { ArrowLeft, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CandidateProfileForm from '../../components/forms/CandidateProfileForm';

export default function CandidateProfilePage() {
  return (
    <DashboardLayout
      role="candidate"
      title="Candidate Profile & Preferences"
      subtitle="Keep your background and preferences updated to receive tailored returnship opportunities."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/candidate/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <CandidateProfileForm />
      </div>
    </DashboardLayout>
  );
}
