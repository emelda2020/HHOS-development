-- Replace both placeholders before running.

update public.profiles
set role = 'patient', updated_at = now()
where email = 'PATIENT_EMAIL_HERE';

delete from public.clinician_licenses
where clinician_user_id = (
  select id from public.profiles where email = 'PATIENT_EMAIL_HERE'
);

delete from public.clinician_profiles
where user_id = (
  select id from public.profiles where email = 'PATIENT_EMAIL_HERE'
);

update public.profiles
set role = 'clinician', updated_at = now()
where email = 'CLINICIAN_EMAIL_HERE';

insert into public.clinician_profiles (
  user_id, professional_title, primary_specialty, biography,
  years_experience, languages, verification_status, accepting_reviews
)
select
  id, 'Dr.', 'general_medicine',
  'Development-only simulated physician profile',
  10, array['English'], 'verified', true
from public.profiles
where email = 'CLINICIAN_EMAIL_HERE'
on conflict (user_id) do update
set verification_status = 'verified',
    accepting_reviews = true,
    updated_at = now();
