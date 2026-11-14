import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmployerProfileForm from '../../components/forms/EmployerProfileForm';

export default function EmployerProfilePage() {
  return (
    <DashboardLayout
      role="employer"
      title="Company Profile & Branding"
      subtitle="Complete your organization profile so returning professionals can discover your culture and flexibility."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/employer/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <EmployerProfileForm />
      </div>
    </DashboardLayout>
  );
}
