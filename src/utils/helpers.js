/**
 * Calculate profile completion percentage for candidates
 */
export function calculateCandidateCompletion(profile, candidateProfile) {
  if (!profile) return 0;
  
  const fields = [
    { key: 'full_name', val: profile.full_name, weight: 15 },
    { key: 'education', val: candidateProfile?.education, weight: 10 },
    { key: 'previous_role', val: candidateProfile?.previous_role, weight: 15 },
    { key: 'previous_company', val: candidateProfile?.previous_company, weight: 10 },
    { key: 'years_of_experience', val: candidateProfile?.years_of_experience, weight: 10 },
    { key: 'break_duration_months', val: candidateProfile?.break_duration_months, weight: 10 },
    { key: 'existing_skills', val: candidateProfile?.existing_skills?.length > 0, weight: 15 },
    { key: 'career_interests', val: candidateProfile?.career_interests?.length > 0, weight: 10 },
    { key: 'location', val: candidateProfile?.location, weight: 5 },
  ];

  let completedWeight = 0;
  fields.forEach(f => {
    if (f.val) completedWeight += f.weight;
  });

  return Math.min(100, Math.round(completedWeight));
}

/**
 * Calculate profile completion percentage for employers
 */
export function calculateEmployerCompletion(profile, employerProfile) {
  if (!profile) return 0;

  const fields = [
    { key: 'company_name', val: employerProfile?.company_name, weight: 25 },
    { key: 'industry', val: employerProfile?.industry, weight: 20 },
    { key: 'company_description', val: employerProfile?.company_description, weight: 20 },
    { key: 'location', val: employerProfile?.location, weight: 15 },
    { key: 'contact_email', val: employerProfile?.contact_email, weight: 10 },
    { key: 'website', val: employerProfile?.website, weight: 10 },
  ];

  let completedWeight = 0;
  fields.forEach(f => {
    if (f.val) completedWeight += f.weight;
  });

  return Math.min(100, Math.round(completedWeight));
}

export function formatExperience(years) {
  if (!years) return 'Fresher / Entry level';
  const num = Number(years);
  return `${num} ${num === 1 ? 'Year' : 'Years'}`;
}

export function formatBreakDuration(months) {
  if (!months || months === 0) return 'No career gap';
  const num = Number(months);
  if (num < 12) return `${num} ${num === 1 ? 'Month' : 'Months'}`;
  const yrs = Math.floor(num / 12);
  const rem = num % 12;
  if (rem === 0) return `${yrs} ${yrs === 1 ? 'Year' : 'Years'}`;
  return `${yrs} yr ${rem} mo`;
}
