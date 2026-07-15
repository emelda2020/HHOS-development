-- =========================================================
-- HHOS STAGE 4C: DEVELOPMENT-ONLY CLINICIAN SETUP
-- Run only after:
-- 1. Creating a separate test physician account through the signup page.
-- 2. Replacing both email placeholders below.
-- 3. Uploading one patient test report and copying its review_request ID.
-- =========================================================

-- STEP 1: Promote and verify the separate test physician account.
-- Replace doctor-test@example.com in BOTH places.

update public.profiles
set role = 'clinician',
    updated_at = now()
where email = 'doctor-test@example.com';

insert into public.clinician_profiles (
  user_id,
  professional_title,
  primary_specialty,
  biography,
  years_experience,
  languages,
  verification_status,
  accepting_reviews
)
select
  id,
  'Dr.',
  'general_medicine',
  'Development-only simulated physician profile',
  10,
  array['English'],
  'verified',
  true
from public.profiles
where email = 'doctor-test@example.com'
on conflict (user_id) do update
set
  verification_status = 'verified',
  accepting_reviews = true,
  updated_at = now();

insert into public.clinician_licenses (
  clinician_user_id,
  country_code,
  region_code,
  licence_number,
  specialty,
  licence_status,
  valid_from,
  valid_until,
  verified_at
)
select
  id,
  'XX',
  'TEST',
  'DEVELOPMENT-ONLY-001',
  'general_medicine',
  'active',
  current_date,
  current_date + interval '1 year',
  now()
from public.profiles
where email = 'doctor-test@example.com'
on conflict (country_code, region_code, licence_number) do nothing;

-- STEP 2: Assign the oldest unassigned submitted test case to the physician.
insert into public.review_assignments (
  review_request_id,
  clinician_user_id,
  assignment_status,
  accepted_at
)
select
  rr.id,
  p.id,
  'accepted',
  now()
from public.review_requests rr
cross join public.profiles p
where p.email = 'doctor-test@example.com'
  and rr.review_status in ('submitted', 'awaiting_assignment')
  and not exists (
    select 1
    from public.review_assignments ra
    where ra.review_request_id = rr.id
  )
order by rr.created_at asc
limit 1;

update public.review_requests rr
set
  review_status = 'assigned',
  updated_at = now()
where exists (
  select 1
  from public.review_assignments ra
  where ra.review_request_id = rr.id
    and ra.assignment_status = 'accepted'
);
