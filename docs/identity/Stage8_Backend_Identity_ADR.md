# ATHAR | أثر — Stage 8 Backend Identity ADR

## Decision status
**Accepted as the connected development baseline.** Production and real-child-data use remain subject to the Stage 8 governance-exception gate register.

## Decision
Use Supabase Auth for adult authentication. Keep ATHAR authorization, child-profile relationships, consent/assent records, learning entitlements and audit controls in Postgres RLS, reviewed database functions and JWT-protected Edge Functions.

The static GitHub Pages site is not sufficient for production authentication.

## Why
ATHAR needs more than sign-in. It must enforce:
- adult identity verification;
- role assignments;
- parent/guardian ↔ child authorization;
- institution ↔ educator/admin membership;
- versioned consent and assent;
- account recovery/session revocation;
- default-deny API authorization;
- protected learning records in later stages.

These controls must not depend on browser-local state or hidden UI elements.

## Implemented development architecture
Browser/PWA → Supabase Auth + RLS-protected Data API + JWT-protected ATHAR Edge Functions → ATHAR Postgres database.

### Identity provider responsibilities
- adult registration/authentication;
- verified email or approved adult authentication identifier;
- password/passkey/MFA capability according to selected provider;
- recovery and session/token primitives;
- security events/hooks where available.

### ATHAR backend responsibilities
- application roles and memberships;
- child profiles;
- adult-child authorization;
- institution/educator relationships;
- consent/assent/policy versions;
- authorization decisions;
- privacy/deletion/export workflow state;
- audit events relevant to account/security administration;
- later: cloud Passport/progress records.

## Provider acceptance criteria
Continued use of Supabase should be assessed against:
- strong security track record;
- server-side SDK/API support;
- MFA/passkey support;
- configurable session lifetime and revocation;
- audit/event capabilities;
- regional/data-residency fit for UAE deployment requirements;
- privacy/DPA terms appropriate for a children's education service;
- predictable cost at pilot and institutional scale;
- ability to keep child profiles out of the identity-provider consumer-account model.

The development selection does not settle UAE transfer/residency suitability or production processor approval.

## Data separation
The identity-provider subject ID is an authentication key, not the child-learning identifier. Child profiles use ATHAR-generated identifiers and are linked through explicit authorization records.

## Session model
Prefer secure, server-managed sessions for the web application, using `HttpOnly`, `Secure`, appropriately scoped cookies and CSRF protection where the chosen stack supports that model. Avoid persisting long-lived privileged bearer tokens in `localStorage`.

## Authorization
Every protected API operation must evaluate authenticated subject + role + relationship/membership + resource scope. Default deny.

## Stage boundary
Stage 8 provides a real connected development implementation and is accepted as the dependency for Stage 9. It does not authorize production, pilot activity or real child data. Production Auth configuration, UAE legal/privacy and data-transfer review, controlled real-email E2E, bilingual RTL/accessibility QA and the privacy-operations workflow remain separate gates.
