-- =========================================================
-- HHOS STAGE 6B
-- CLINICIAN SIGN-UP AND VERIFICATION ROUTING
-- =========================================================

-- A signed-in user can begin clinician onboarding for their own account.
create or replace function public.begin_clinician_onboarding()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles
  set role = 'clinician'
  where id = auth.uid();

  insert into public.clinician_profiles (
    user_id,
    verification_status,
    professional_email,
    updated_at
  )
  select
    auth.uid(),
    'draft',
    u.email,
    now()
  from auth.users u
  where u.id = auth.uid()
  on conflict (user_id)
  do update set
    verification_status = case
      when public.clinician_profiles.verification_status = 'verified'
      then 'verified'
      else public.clinician_profiles.verification_status
    end,
    professional_email = excluded.professional_email,
    updated_at = now();
end;
$$;

grant execute on function public.begin_clinician_onboarding() to authenticated;

-- Clinicians may read their own clinician profile.
drop policy if exists "Clinicians read own clinician profile"
on public.clinician_profiles;

create policy "Clinicians read own clinician profile"
on public.clinician_profiles
for select
to authenticated
using (user_id = auth.uid());

-- Clinicians may update their own application details, but not approve themselves.
drop policy if exists "Clinicians update own onboarding profile"
on public.clinician_profiles;

create policy "Clinicians update own onboarding profile"
on public.clinician_profiles
for update
to authenticated
using (
  user_id = auth.uid()
  and verification_status in (
    'draft',
    'pending',
    'under_review',
    'rejected'
  )
)
with check (
  user_id = auth.uid()
  and verification_status in (
    'draft',
    'pending',
    'under_review',
    'rejected'
  )
);

grant select, update on public.clinician_profiles to authenticated;
