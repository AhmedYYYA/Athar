# ATHAR | أثر — Stage 8 Backend Identity ADR

## Decision status
**Proposed for Stage 8 implementation review.**

## Decision
Use a mature managed identity provider for adult authentication and build ATHAR authorization, child-profile relationships, consent/assent records, learning entitlements and audit controls in ATHAR's own server-side application layer.

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

## Target logical architecture
Browser/PWA → ATHAR application/API → Identity Provider + ATHAR database.

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

## Candidate provider criteria
Selection should prioritize:
- strong security track record;
- server-side SDK/API support;
- MFA/passkey support;
- configurable session lifetime and revocation;
- audit/event capabilities;
- regional/data-residency fit for UAE deployment requirements;
- privacy/DPA terms appropriate for a children's education service;
- predictable cost at pilot and institutional scale;
- ability to keep child profiles out of the identity-provider consumer-account model.

Do not choose a provider solely because it has the fastest client-side login widget.

## Data separation
The identity-provider subject ID is an authentication key, not the child-learning identifier. Child profiles use ATHAR-generated identifiers and are linked through explicit authorization records.

## Session model
Prefer secure, server-managed sessions for the web application, using `HttpOnly`, `Secure`, appropriately scoped cookies and CSRF protection where the chosen stack supports that model. Avoid persisting long-lived privileged bearer tokens in `localStorage`.

## Authorization
Every protected API operation must evaluate authenticated subject + role + relationship/membership + resource scope. Default deny.

## Stage boundary
Stage 8 can create the static UX prototype and API/database contracts before a provider is selected. It must continue to label these pages as prototypes until real backend authentication exists.
