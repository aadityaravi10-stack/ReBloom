import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

export default function ProfileCompletionCard({
  percentage = 0,
  editPath = '/candidate/profile',
  missingFields = [],
  role = 'candidate',
}) {
  const isComplete = percentage >= 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 border-purple-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Profile Readiness
            </span>
            {isComplete && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Fully Ready
              </span>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 mt-0.5">
            {isComplete
              ? 'Your profile is ready for comeback opportunities!'
              : `Your profile is ${percentage}% complete`}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isComplete
              ? 'Your experience and skills are clearly presented to returnship-friendly employers.'
              : 'Completing your background, skills, and work preferences helps match you with high-trust employers.'}
          </p>
        </div>

        <Link to={editPath}>
          <Button variant="accent" size="sm" icon={ArrowRight} iconPosition="right">
            {isComplete ? 'Update Profile' : 'Complete Profile'}
          </Button>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-purple-900">
          <span>Completion Score</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, percentage)}%` }}
          />
        </div>
      </div>

      {/* Actionable Missing Items Checklist */}
      {!isComplete && missingFields.length > 0 && (
        <div className="mt-4 pt-4 border-t border-purple-100/70">
          <p className="text-xs font-medium text-gray-600 mb-2">Recommended additions to reach 100%:</p>
          <div className="flex flex-wrap gap-2">
            {missingFields.slice(0, 4).map((field, idx) => (
              <Link
                key={idx}
                to={editPath}
                className="inline-flex items-center gap-1.5 text-xs text-purple-800 bg-purple-100/60 hover:bg-purple-200/70 px-2.5 py-1 rounded-lg transition-colors"
              >
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>Add {field}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
