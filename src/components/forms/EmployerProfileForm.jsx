import React, { useState, useEffect } from 'react';
import { Building2, Check, AlertCircle, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { profileService } from '../../services/profileService';
import { INDUSTRIES } from '../../lib/constants';
import Input from '../common/Input';
import Button from '../common/Button';

export default function EmployerProfileForm({ onSuccess }) {
  const { user, profile, employerProfile, refreshProfile, isConfigured } = useAuth();

  const [formData, setFormData] = useState({
    company_name: employerProfile?.company_name || user?.user_metadata?.company_name || '',
    company_logo: employerProfile?.company_logo || '',
    industry: employerProfile?.industry || '',
    company_description: employerProfile?.company_description || '',
    website: employerProfile?.website || '',
    location: employerProfile?.location || '',
    contact_email: employerProfile?.contact_email || user?.email || '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employerProfile) {
      setFormData((prev) => ({
        ...prev,
        company_name: employerProfile.company_name || prev.company_name,
        company_logo: employerProfile.company_logo || prev.company_logo,
        industry: employerProfile.industry || prev.industry,
        company_description: employerProfile.company_description || prev.company_description,
        website: employerProfile.website || prev.website,
        location: employerProfile.location || prev.location,
        contact_email: employerProfile.contact_email || prev.contact_email,
      }));
    }
  }, [employerProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company_name?.trim()) newErrors.company_name = 'Company name is required';
    if (!formData.industry?.trim()) newErrors.industry = 'Industry is required';
    if (!formData.location?.trim()) newErrors.location = 'Headquarters or office location is required';
    if (!formData.contact_email?.trim()) {
      newErrors.contact_email = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatusMessage({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      if (!isConfigured) {
        throw new Error('Supabase credentials are not configured in .env. Please connect Supabase to save employer profiles.');
      }

      await profileService.upsertEmployerProfile(
        user.id,
        {
          company_name: formData.company_name,
          company_logo: formData.company_logo,
          industry: formData.industry,
          company_description: formData.company_description,
          website: formData.website,
          location: formData.location,
          contact_email: formData.contact_email,
        },
        {
          full_name: formData.company_name,
        }
      );

      await refreshProfile();
      setStatusMessage({ type: 'success', text: 'Company profile updated successfully!' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update company profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="bg-white dark:bg-[#130E24] p-6 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-soft dark:shadow-none space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-purple-50 dark:border-purple-900/40 pb-3 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-purple-600" />
          Organization Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company / Organization Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            error={errors.company_name}
            placeholder="e.g. TalentSphere Global or FinTech Labs"
            required
          />

          <Input
            as="select"
            label="Industry Sector"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            error={errors.industry}
            required
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </Input>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Headquarters / Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            placeholder="e.g. Bangalore, India (or Hybrid / Remote-first)"
            required
          />

          <Input
            label="Recruitment Contact Email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleChange}
            error={errors.contact_email}
            placeholder="hiring@company.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://company.com"
          />

          <Input
            label="Company Logo URL (Optional)"
            name="company_logo"
            value={formData.company_logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            helperText="Direct image URL for company badge"
          />
        </div>

        <Input
          as="textarea"
          label="About Company & Returnship Commitment"
          name="company_description"
          value={formData.company_description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your organization culture, flexible work policies, and commitment to hiring women returning from career breaks..."
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          loading={loading}
          icon={Save}
        >
          Save Company Profile
        </Button>
      </div>
    </form>
  );
}
