# HHOS Development Application

This is the first structured development version of the HHOS patient dashboard.

## What changed from the static website

- Next.js App Router application
- TypeScript
- Reusable components
- Separate application pages
- Demonstration login and protected dashboard routes
- HTTP-only demo session cookie
- Logout flow
- Basic security response headers
- Simulated health data in a central data module
- Responsive application shell

## Critical limitation

This is **not** a clinical production system.

Do not place real patient data, credentials, medical records, API secrets, or
confidential information in this repository. The demonstration login is
intentionally visible in the source code and must be replaced before any real
use.

## Run on your computer

Install the current Node.js LTS release, then open a terminal inside this folder:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Demo account:

```text
Email: demo@hhos.health
Password: Health123!
```

## Put the development application on GitHub

Create a new repository, such as:

```text
hhos-development
```

Upload the contents of this folder. Do not upload the ZIP as the only file.

## Deploy

The recommended beginner path for this Next.js version is Vercel:

1. Sign in to Vercel with GitHub.
2. Import the `hhos-development` repository.
3. Accept the detected Next.js settings.
4. Deploy.
5. Treat the deployed URL as a public demonstration only.

GitHub Pages should remain available for the original static prototype. This
Next.js application needs a runtime that can execute route handlers and set
server cookies.

## Recommended next engineering milestones

1. Replace demo authentication with an identity provider.
2. Add PostgreSQL and row-level access controls.
3. Define patient, clinician, consent, observation, provenance, and audit models.
4. Build an append-only security audit trail.
5. Add FHIR R4 integration interfaces.
6. Add automated unit, accessibility, and end-to-end tests.
7. Create separate development, staging, and production environments.
8. Complete threat modeling before using any real health data.
