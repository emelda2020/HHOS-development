# HHOS Stage 4C — Report Upload and Physician Review

This package extends the existing HHOS application.

## Patient features

- Private PDF and image upload
- Medical-report metadata
- Physician-review request
- Review-status tracking
- Secure signed links for private reports
- Released physician interpretation
- In-person evaluation recommendation
- Timeline and audit records

## Physician features

- Separate clinician dashboard
- Verified-clinician access check
- Assigned-case queue
- Access only to assigned reports
- Structured physician review
- Patient notification when a review is released

## Upload to GitHub

Upload every file and folder inside this package to the existing
`hhos-development` repository.

Replace older files when GitHub asks.

Commit message:

```text
Add report upload and physician review workflow
```

Vercel should redeploy automatically.

## Patient test

1. Sign in with the existing patient test account.
2. Open Medical Reports.
3. Upload a fabricated or fully de-identified PDF/image under 10 MB.
4. Confirm that the review request appears under Physician Reviews.
5. Confirm that the report appears in Supabase Storage under the private
   medical-reports bucket.

## Physician test

The clinician portal is available at:

```text
/clinician
```

A separate account must be created, promoted to the clinician role, verified,
and assigned to a case through trusted administrative SQL. Use the separate
Stage 4C development setup SQL supplied with this package.

Never promote a patient account into a physician account in production.
Production clinician onboarding requires identity, licence, specialty,
sanctions, jurisdiction, and indemnity verification.

## Safety

Use test files only. Do not upload real patient reports or identifiable health
information. This development system is not yet approved for clinical use.
