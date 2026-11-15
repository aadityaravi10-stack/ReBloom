import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, X, Check, AlertCircle, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { profileService } from '../../services/profileService';
import {
  CAREER_BREAK_REASONS,
  EDUCATION_DEGREES,
  WORK_TYPES,
  WORK_HOURS,
  POPULAR_SKILLS,
  POPULAR_INTERESTS,
} from '../../lib/constants';
import Input from '../common/Input';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function CandidateProfileForm({ onSuccess }) {
  const { user, profile, candidateProfile, refreshProfile, isConfigured } = useAuth();

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    avatar_url: profile?.avatar_url || '',
    education: candidateProfile?.education || '',
    previous_role: candidateProfile?.previous_role || '',
    previous_company: candidateProfile?.previous_company || '',
    years_of_experience: candidateProfile?.years_of_experience || '',
    break_duration_months: candidateProfile?.break_duration_months || '',
    break_reason: candidateProfile?.break_reason || '',
    existing_skills: candidateProfile?.existing_skills || [],
    career_interests: candidateProfile?.career_interests || [],
    preferred_work_type: candidateProfile?.preferred_work_type || 'Remote',
    preferred_hours: candidateProfile?.preferred_hours || 'Flexible hours',
    location: candidateProfile?.location || '',
    bio: candidateProfile?.bio || '',
  });

  const [selectedDegree, setSelectedDegree] = useState(() => {
    const existing = candidateProfile?.education || '';
    if (!existing) return '';
    return EDUCATION_DEGREES.includes(existing) ? existing : 'Other';
  });
  const [customDegree, setCustomDegree] = useState(() => {
    const existing = candidateProfile?.education || '';
    if (!existing) return '';
    return EDUCATION_DEGREES.includes(existing) ? '' : existing;
  });

  const [customSkill, setCustomSkill] = useState('');
  const [customInterest, setCustomInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile || candidateProfile) {
      const edu = candidateProfile?.education || '';
      if (edu) {
        const isStandard = EDUCATION_DEGREES.includes(edu);
        setSelectedDegree(isStandard ? edu : 'Other');
        setCustomDegree(isStandard ? '' : edu);
      }

      setFormData((prev) => ({
        ...prev,
        full_name: profile?.full_name || prev.full_name,
        avatar_url: profile?.avatar_url || prev.avatar_url,
        education: edu || prev.education,
        previous_role: candidateProfile?.previous_role || prev.previous_role,
        previous_company: candidateProfile?.previous_company || prev.previous_company,
        years_of_experience: candidateProfile?.years_of_experience ?? prev.years_of_experience,
        break_duration_months: candidateProfile?.break_duration_months ?? prev.break_duration_months,
        break_reason: candidateProfile?.break_reason || prev.break_reason,
        existing_skills: candidateProfile?.existing_skills || prev.existing_skills,
        career_interests: candidateProfile?.career_interests || prev.career_interests,
        preferred_work_type: candidateProfile?.preferred_work_type || prev.preferred_work_type,
        preferred_hours: candidateProfile?.preferred_hours || prev.preferred_hours,
        location: candidateProfile?.location || prev.location,
        bio: candidateProfile?.bio || prev.bio,
      }));
    }
  }, [profile, candidateProfile]);

  const handleDegreeChange = (e) => {
    const val = e.target.value;
    setSelectedDegree(val);
    if (val === 'Other') {
      setFormData((prev) => ({ ...prev, education: customDegree }));
    } else {
      setFormData((prev) => ({ ...prev, education: val }));
    }
    if (errors.education) {
      setErrors((prev) => ({ ...prev, education: null }));
    }
  };

  const handleCustomDegreeChange = (e) => {
    const val = e.target.value;
    setCustomDegree(val);
    setFormData((prev) => ({ ...prev, education: val }));
    if (errors.education) {
      setErrors((prev) => ({ ...prev, education: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const addSkill = (skill) => {
    if (!skill || formData.existing_skills.includes(skill)) return;
    setFormData((prev) => ({
      ...prev,
      existing_skills: [...prev.existing_skills, skill],
    }));
    setCustomSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      existing_skills: prev.existing_skills.filter((s) => s !== skillToRemove),
    }));
  };

  const addInterest = (interest) => {
    if (!interest || formData.career_interests.includes(interest)) return;
    setFormData((prev) => ({
      ...prev,
      career_interests: [...prev.career_interests, interest],
    }));
    setCustomInterest('');
  };

  const removeInterest = (interestToRemove) => {
    setFormData((prev) => ({
      ...prev,
      career_interests: prev.career_interests.filter((i) => i !== interestToRemove),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name?.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.education?.trim()) {
      newErrors.education = selectedDegree === 'Other'
        ? 'Please specify your degree / major in the other field'
        : 'Please select your highest education degree';
    }
    if (!formData.previous_role?.trim()) newErrors.previous_role = 'Previous job role is required';
    if (!formData.previous_company?.trim()) newErrors.previous_company = 'Previous company is required';
    if (formData.years_of_experience === '' || formData.years_of_experience < 0) {
      newErrors.years_of_experience = 'Please enter valid years of experience';
    }
    if (formData.break_duration_months === '' || formData.break_duration_months < 0) {
      newErrors.break_duration_months = 'Please enter break duration (in months)';
    }
    if (!formData.location?.trim()) newErrors.location = 'Location (city, country or region) is required';
    if (formData.existing_skills.length === 0) {
      newErrors.existing_skills = 'Please add at least one existing skill';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields marked with an asterisk.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      if (!isConfigured) {
        throw new Error('Supabase credentials are not configured in .env. Please connect Supabase to save profiles to the database.');
      }

      await profileService.upsertCandidateProfile(
        user.id,
        {
          education: formData.education,
          previous_role: formData.previous_role,
          previous_company: formData.previous_company,
          years_of_experience: formData.years_of_experience,
          break_duration_months: formData.break_duration_months,
          break_reason: formData.break_reason,
          existing_skills: formData.existing_skills,
          career_interests: formData.career_interests,
          preferred_work_type: formData.preferred_work_type,
          preferred_hours: formData.preferred_hours,
          location: formData.location,
          bio: formData.bio,
        },
        {
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
        }
      );

      await refreshProfile();
      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 text-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{statusMessage.text}</span>
        </div>
      )}

      {/* Section 1: Basic Identity */}
      <div className="bg-white dark:bg-[#130E24] p-6 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-soft dark:shadow-none space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">1</span>
          Personal & Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            error={errors.full_name}
            placeholder="e.g. Ananya Sharma"
            required
          />
          <Input
            label="Current Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            placeholder="e.g. Bangalore, India or Remote"
            required
          />
        </div>

        <Input
          label="Profile Photo URL (Optional)"
          name="avatar_url"
          value={formData.avatar_url}
          onChange={handleChange}
          placeholder="https://example.com/photo.jpg"
          helperText="Paste a link to your LinkedIn or hosted portrait photo"
        />

        <Input
          as="textarea"
          label="About You & Comeback Ambitions"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Share a brief overview of your background, your strengths, and what drives your desire to return..."
        />
      </div>

      {/* Section 2: Education & Career Background */}
      <div className="bg-white dark:bg-[#130E24] p-6 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-soft dark:shadow-none space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">2</span>
          Professional History & Career Gap Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Input
              as="select"
              label="Highest Education Degree"
              id="education_select"
              name="education_select"
              value={selectedDegree}
              onChange={handleDegreeChange}
              error={selectedDegree !== 'Other' ? errors.education : undefined}
              required
            >
              <option value="" className="bg-white dark:bg-[#18132C] text-slate-900 dark:text-white">
                Select your major degree
              </option>
              {EDUCATION_DEGREES.map((deg) => (
                <option key={deg} value={deg} className="bg-white dark:bg-[#18132C] text-slate-900 dark:text-white">
                  {deg}
                </option>
              ))}
            </Input>

            {selectedDegree === 'Other' && (
              <Input
                label="Specify Other Degree / Major"
                id="custom_education"
                name="custom_education"
                placeholder="e.g. Dual Degree, B.Arch, Fashion Tech, Journalism"
                value={customDegree}
                onChange={handleCustomDegreeChange}
                error={errors.education}
                required
              />
            )}
          </div>

          <Input
            label="Years of Experience (Before Break)"
            name="years_of_experience"
            type="number"
            step="0.5"
            min="0"
            value={formData.years_of_experience}
            onChange={handleChange}
            error={errors.years_of_experience}
            placeholder="e.g. 4.5"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Previous Job Role"
            name="previous_role"
            value={formData.previous_role}
            onChange={handleChange}
            error={errors.previous_role}
            placeholder="e.g. Product Designer, Software Engineer, HR Specialist"
            required
          />
          <Input
            label="Previous Employer / Company"
            name="previous_company"
            value={formData.previous_company}
            onChange={handleChange}
            error={errors.previous_company}
            placeholder="e.g. Infosys, Deloitte, Tech Startups"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Input
            label="Career Break Duration (Total in Months)"
            name="break_duration_months"
            type="number"
            min="0"
            value={formData.break_duration_months}
            onChange={handleChange}
            error={errors.break_duration_months}
            placeholder="e.g. 24 (for 2 years)"
            helperText="Every career break holds valuable life experience and perspective."
            required
          />

          <Input
            as="select"
            label="Reason for Career Break (Optional)"
            name="break_reason"
            value={formData.break_reason}
            onChange={handleChange}
            helperText="Helping employers offer empathetic, returnship-friendly onboarding."
          >
            <option value="">Select a reason (optional)</option>
            {CAREER_BREAK_REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </Input>
        </div>
      </div>

      {/* Section 3: Existing Skills & Interests */}
      <div className="bg-white dark:bg-[#130E24] p-6 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-soft dark:shadow-none space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">3</span>
          Skills & Career Interests
        </h3>

        {/* Existing Skills */}
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
            Existing Skills <span className="text-purple-600 dark:text-purple-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] items-center">
            {formData.existing_skills.map((skill) => (
              <Badge key={skill} color="purple" removable onRemove={() => removeSkill(skill)}>
                {skill}
              </Badge>
            ))}
            {formData.existing_skills.length === 0 && (
              <span className="text-xs text-slate-400 dark:text-slate-500 italic">No skills selected yet. Choose suggested skills or type your own below.</span>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Add a custom skill (e.g. Python, Figma, Strategic Planning)"
              className="flex-1 rounded-xl border border-purple-200/80 dark:border-purple-700/60 bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 transition-colors shadow-2xs"
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Suggested Skills:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {POPULAR_SKILLS.filter((s) => !formData.existing_skills.includes(s)).slice(0, 10).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="text-xs font-semibold bg-white hover:bg-purple-50 dark:bg-[#1B1433] dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 px-3 py-1.5 rounded-xl border border-purple-200/80 dark:border-purple-700/60 hover:border-purple-400 dark:hover:border-purple-500 shadow-2xs transition-all cursor-pointer"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
          {errors.existing_skills && (
            <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">• {errors.existing_skills}</p>
          )}
        </div>

        {/* Career Interests */}
        <div className="pt-5 border-t border-purple-100 dark:border-purple-900/40">
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
            Target Career Tracks & Interests
          </label>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] items-center">
            {formData.career_interests.map((interest) => (
              <Badge key={interest} color="pink" removable onRemove={() => removeInterest(interest)}>
                {interest}
              </Badge>
            ))}
            {formData.career_interests.length === 0 && (
              <span className="text-xs text-slate-400 dark:text-slate-500 italic">Select career tracks or add a specialized focus below.</span>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="Target role or domain (e.g. AI Product Manager, Full Stack Developer)"
              className="flex-1 rounded-xl border border-pink-200/80 dark:border-pink-800/60 bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 transition-colors shadow-2xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addInterest(customInterest.trim());
                }
              }}
            />
            <button
              type="button"
              onClick={() => addInterest(customInterest.trim())}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 active:scale-95 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">Suggested Career Tracks:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {POPULAR_INTERESTS.filter((i) => !formData.career_interests.includes(i)).map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => addInterest(interest)}
                  className="text-xs font-semibold bg-white hover:bg-pink-50 dark:bg-[#1B1433] dark:hover:bg-pink-950/50 text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-100 px-3 py-1.5 rounded-xl border border-pink-200/80 dark:border-pink-800/60 hover:border-pink-400 dark:hover:border-pink-500 shadow-2xs transition-all cursor-pointer"
                >
                  + {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Work Flexibility Preferences */}
      <div className="bg-white dark:bg-[#130E24] p-6 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-soft dark:shadow-none space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">4</span>
          Work Flexibility Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            as="select"
            label="Preferred Work Mode"
            name="preferred_work_type"
            value={formData.preferred_work_type}
            onChange={handleChange}
            required
          >
            {WORK_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Input>

          <Input
            as="select"
            label="Preferred Working Hours"
            name="preferred_hours"
            value={formData.preferred_hours}
            onChange={handleChange}
            required
          >
            {WORK_HOURS.map((hour) => (
              <option key={hour.id} value={hour.id}>
                {hour.label}
              </option>
            ))}
          </Input>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          loading={loading}
          icon={Save}
        >
          Save Candidate Profile
        </Button>
      </div>
    </form>
  );
}
