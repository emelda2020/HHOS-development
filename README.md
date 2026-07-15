# HHOS Stage 4D Role Routing Fix

Upload these folders and files to the existing GitHub repository, preserving
their folder locations, and replace the older versions.

Commit message:

Fix patient and clinician dashboard routing

After deployment:
- patient accounts go to /dashboard
- clinician accounts go to /clinician

Use two different email accounts. If the original patient account was
accidentally promoted to clinician, edit and run
hhos-stage4d-account-recovery.sql in Supabase.
