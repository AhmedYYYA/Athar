# ADR-002 — Stage 8 backend foundation: Supabase

**Decision:** Adopt Supabase as the Stage 8 implementation foundation, subject to UAE legal/privacy review, security review, and deployment-region/data-transfer assessment before real child data is processed.

## Why
ATHAR needs managed adult authentication, PostgreSQL persistence, server-enforced authorization, Row Level Security, migrations and server-side functions without creating a custom password system. Supabase provides these capabilities while preserving a conventional PostgreSQL data model and a clean boundary between `auth.users` adult identities and ATHAR child profiles.

## Non-negotiable architecture
- `auth.users` represents adults only in the 7–12 product.
- A child profile is an ATHAR application record, never an independent password/email account.
- Authorization is default-deny and enforced server-side/RLS.
- Consent and assent are separate, versioned records.
- Privileged service credentials never enter the GitHub Pages client or public repository.
- No production child data is enabled until data residency/transfers, retention, privacy notices, consent wording, DPIA/risk assessment as applicable, and institutional requirements are approved.

## Deployment model
The existing static front end may remain on GitHub Pages during development. Production authentication calls Supabase Auth using only the public client configuration intended for browser use; all privileged operations (creating child profiles with authorization, consent transitions, institutional role grants, deletion/export workflows) must use reviewed server-side database functions or Edge Functions with RLS/authorization checks.

## Environment separation
Use separate development/staging/production Supabase projects. Never test with real child data in development. Production configuration and secrets are managed outside source control.

## Stage 8 connection gate
1. Create/connect Supabase project.
2. Apply `supabase/migrations/20260907152700_stage8_identity.sql` in non-production environment.
3. Configure adult email authentication and approved redirect origins.
4. Implement reviewed server functions for registration bootstrap, child profile creation, consent/assent transitions, deletion/export requests and privileged role administration.
5. Connect account UX.
6. Add authorization/RLS integration tests and browser tests.
7. Conduct security/privacy/legal review.
8. Only then enable real participant accounts.
