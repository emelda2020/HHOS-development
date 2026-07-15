# HHOS Stage 6B — Clinician Sign-Up and Verification UI

## Step 1: Run the SQL

Run `stage6b-setup.sql` in Supabase SQL Editor.

Expected result:

Success. No rows returned

## Step 2: Upload the app and components folders

Upload these folders to the existing `hhos-development` repository:

- app
- components

Replace older files when GitHub asks.

## Step 3: Add the CSS

Copy everything inside `STAGE6B_CSS.txt` and paste it at the bottom of:

app/globals.css

## Step 4: Commit

Use:

Add clinician signup and verification routing

Wait for Vercel to show Ready.

## Test using a NEW clinician email

Do not reuse the existing verified clinician test account.

1. Open `/signup`.
2. Select Clinician account.
3. Create an account with a new test email.
4. Confirm the email if Supabase requests confirmation.
5. Sign in.
6. Complete the professional application with fabricated information.
7. Submit it.
8. Confirm the pending-verification page appears.
9. Confirm the new clinician cannot open `/clinician`.

The existing verified clinician should continue to open the clinician dashboard.
