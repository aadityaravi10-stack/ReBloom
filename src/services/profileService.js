import { supabase, isSupabaseConfigured } from './supabaseClient';

export const profileService = {
  // Update or insert Candidate Profile
  async upsertCandidateProfile(userId, candidateData, baseData = {}) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please configure your .env credentials to save to Supabase.');
    }

    // Update base profile if full_name or avatar is provided
    if (baseData.full_name || baseData.avatar_url) {
      const { error: baseError } = await supabase
        .from('profiles')
        .update({
          full_name: baseData.full_name,
          avatar_url: baseData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (baseError) throw baseError;
    }

    // Upsert candidate specific details
    const payload = {
      id: userId,
      education: candidateData.education || null,
      previous_role: candidateData.previous_role || null,
      previous_company: candidateData.previous_company || null,
      years_of_experience: candidateData.years_of_experience ? Number(candidateData.years_of_experience) : 0,
      break_duration_months: candidateData.break_duration_months ? Number(candidateData.break_duration_months) : 0,
      break_reason: candidateData.break_reason || null,
      existing_skills: Array.isArray(candidateData.existing_skills) ? candidateData.existing_skills : [],
      career_interests: Array.isArray(candidateData.career_interests) ? candidateData.career_interests : [],
      preferred_work_type: candidateData.preferred_work_type || 'Remote',
      preferred_hours: candidateData.preferred_hours || 'Flexible hours',
      location: candidateData.location || null,
      bio: candidateData.bio || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('candidate_profiles')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update or insert Employer Profile
  async upsertEmployerProfile(userId, employerData, baseData = {}) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please configure your .env credentials to save to Supabase.');
    }

    if (baseData.full_name) {
      await supabase
        .from('profiles')
        .update({
          full_name: baseData.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);
    }

    const payload = {
      id: userId,
      company_name: employerData.company_name,
      company_logo: employerData.company_logo || null,
      industry: employerData.industry || null,
      company_description: employerData.company_description || null,
      website: employerData.website || null,
      location: employerData.location || null,
      contact_email: employerData.contact_email || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('employer_profiles')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get full candidate details
  async getCandidateProfile(userId) {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data, error } = await supabase
      .from('candidate_profiles')
      .select('*, profiles(*)')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  },

  // Get full employer details
  async getEmployerProfile(userId) {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data, error } = await supabase
      .from('employer_profiles')
      .select('*, profiles(*)')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  }
};
