import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  Sparkles,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Send,
  Building2,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { jobsService } from '../../services/jobsService';
import { useAuth } from '../../hooks/useAuth';
import { POPULAR_SKILLS, WORK_TYPES } from '../../lib/constants';

export default function EmployerJobPostingPage() {
  const { user, profile, employerProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    workType: 'Remote',
    hours: 'Flexible hours',
    duration: '16-Week Paid Returnship',
    stipend: '₹1,25,000 / month',
    conversionRate: '88% Full-Time Conversion',
    acceptedBreak: '1+ Years Break',
    description: '',
    coreHours: '10:00 AM – 3:30 PM IST',
    mentorPairing: 'Dedicated Returnee Senior Buddy',
    familyLeave: 'Paid Caregiver & Emergency Leave Policy',
    flexibleSchedule: 'Async Friendly & No Friday Afternoon Meetings',
    flightpathMonth1: 'Environment setup, modern tech stack refresher, and pairing with designated returnee buddy.',
    flightpathMonth2: 'Collaborative feature development, squad sprint demos, and code reviews.',
    flightpathMonth3: 'Independent feature ownership, architecture impact, and full-time conversion evaluation.',
    requiredSkills: ['React.js', 'JavaScript'],
    bonusSkills: ['TypeScript', 'SQL'],
  });

  const [customSkill, setCustomSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (skill) => {
    if (!skill || formData.requiredSkills.includes(skill)) return;
    setFormData((prev) => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, skill],
    }));
    setCustomSkill('');
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError('Please provide a job title and description for this returnship cohort.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      jobsService.createJob(formData, {
        company_name: employerProfile?.company_name || profile?.full_name || 'Partner Company',
        id: user?.id,
      });

      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/employer/jobs');
      }, 500);
    } catch (err) {
      setError('Error creating returnship posting. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      role="employer"
      title="Publish a Returnship Cohort"
      subtitle="Design an empathetic, returnee-friendly program with structured ramp-up support and mentorship."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/employer/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Manage Returnships</span>
        </Link>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Role Overview */}
          <Card className="p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">
                1
              </span>
              Role & Department Basics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Returnship Role Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Engineer (Return to Tech Cohort)"
                required
              />

              <Input
                as="select"
                label="Department / Track"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="Engineering">Engineering & Software</option>
                <option value="Operations & Management">Operations & Agile</option>
                <option value="Product Design">UI/UX & Product Design</option>
                <option value="Data Science & BI">Data Science & Analytics</option>
                <option value="Human Resources">People & Talent Operations</option>
                <option value="Finance & FinTech">Finance & FinTech</option>
              </Input>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                as="select"
                label="Work Model"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
              >
                <option value="Remote">100% Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </Input>

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore / Remote"
              />

              <Input
                label="Schedule Flexibility"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                placeholder="e.g. Flexible Core Hours"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Program Description & Returnee Focus
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the cohort, what returners will work on, and why your team is supportive..."
                className="w-full rounded-2xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] p-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </Card>

          {/* Section 2: Cohort Specs & Conversion */}
          <Card className="p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">
                2
              </span>
              Cohort Duration, Stipend & Conversion
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Program Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 16-Week Paid Returnship"
              />

              <Input
                label="Monthly Stipend / Pay"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="e.g. ₹1,25,000 / month"
              />

              <Input
                label="Target Conversion Rate"
                name="conversionRate"
                value={formData.conversionRate}
                onChange={handleChange}
                placeholder="e.g. 88% Full-Time Conversion"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Minimum Accepted Career Break
              </label>
              <select
                name="acceptedBreak"
                value={formData.acceptedBreak}
                onChange={handleChange}
                className="w-full rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="Any Break Length">Any Break Duration (Open to all)</option>
                <option value="1+ Years Break">1+ Years Break</option>
                <option value="2+ Years Break">2+ Years Break</option>
                <option value="3+ Years Break">3+ Years Break</option>
              </select>
            </div>
          </Card>

          {/* Section 3: 30-60-90 Day Ramp-Up Flightpath */}
          <Card className="p-6 space-y-5 bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 dark:from-[#18132C] dark:via-[#140E24] dark:to-[#1B1433]">
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/40 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                30-60-90 Day Ramp-Up Flightpath
              </h3>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-950 px-2 py-0.5 rounded-full">
                Empathy Feature
              </span>
            </div>

            <div className="space-y-4">
              <Input
                label="Month 1 (Days 1–30): The Gentle Ramp-Up & Tooling"
                name="flightpathMonth1"
                value={formData.flightpathMonth1}
                onChange={handleChange}
                placeholder="e.g. Modern stack refresher, orientation, pair programming"
              />

              <Input
                label="Month 2 (Days 31–60): Collaborative Squad Impact"
                name="flightpathMonth2"
                value={formData.flightpathMonth2}
                onChange={handleChange}
                placeholder="e.g. Co-owning sprint tickets, code review, team ceremonies"
              />

              <Input
                label="Month 3 (Days 61–90+): Full Flight & PPO Pathway"
                name="flightpathMonth3"
                value={formData.flightpathMonth3}
                onChange={handleChange}
                placeholder="e.g. Autonomous feature ownership, evaluation, conversion"
              />
            </div>
          </Card>

          {/* Section 4: Empathy & Flexibility Scorecard */}
          <Card className="p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">
                4
              </span>
              Verified Flexibility & Support Commitments
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Core Collaboration Hours"
                name="coreHours"
                value={formData.coreHours}
                onChange={handleChange}
                placeholder="e.g. 10:00 AM – 3:30 PM (No late calls)"
              />

              <Input
                label="Mentorship Commitment"
                name="mentorPairing"
                value={formData.mentorPairing}
                onChange={handleChange}
                placeholder="e.g. 1-on-1 Dedicated Returnee Buddy"
              />

              <Input
                label="Family & Caregiver Leave"
                name="familyLeave"
                value={formData.familyLeave}
                onChange={handleChange}
                placeholder="e.g. Paid Emergency Family Leave"
              />

              <Input
                label="Schedule Trust Policy"
                name="flexibleSchedule"
                value={formData.flexibleSchedule}
                onChange={handleChange}
                placeholder="e.g. Async Daily Updates, No Friday PM Meetings"
              />
            </div>
          </Card>

          {/* Section 5: Skills */}
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">
                5
              </span>
              Target Skills Required
            </h3>

            <div className="flex flex-wrap gap-2 min-h-[36px] items-center mb-2">
              {formData.requiredSkills.map((skill) => (
                <Badge key={skill} color="purple" removable onRemove={() => removeSkill(skill)}>
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Add custom skill requirement (e.g. Figma, Python, Agile)"
                className="flex-1 rounded-xl border border-purple-200/80 dark:border-purple-800/60 bg-white dark:bg-[#18132C] px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(customSkill.trim());
                  }
                }}
              />
              <button
                type="button"
                onClick={() => addSkill(customSkill.trim())}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer"
              >
                + Add
              </button>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                Quick Suggestions:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {POPULAR_SKILLS.filter((s) => !formData.requiredSkills.includes(s))
                  .slice(0, 8)
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className="text-xs bg-white dark:bg-[#1B1433] text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-lg border border-purple-200/80 dark:border-purple-700/60 hover:bg-purple-50 cursor-pointer"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>
          </Card>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/employer/jobs"
              className="px-5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-purple-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Publishing Cohort...' : 'Publish Returnship Cohort'}</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
