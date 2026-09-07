# ATHAR | أثر — Stage 8: Identity, Accounts & Consent Architecture v12

## Status
Architecture stage. This document defines the production identity foundation before authentication is connected to the child experience.

## Governing principle
**The adult owns the account relationship; the child receives a bounded learning profile.** A child profile is not an independent consumer account.

## Roles
1. **Parent / Guardian** — verified adult account; creates/manages child profiles; sees permitted learning summaries; manages consent and privacy requests.
2. **Child profile** — minimal learning identity linked to an authorized adult or approved institution; no independent email/password required.
3. **Educator** — verified adult role; receives access only to assigned/authorized learners and pedagogically appropriate evidence.
4. **School / Institutional Administrator** — manages institutional membership, educator authorization, cohort policy and approved school access; does not gain unrestricted private child data.

## Required user journeys
### Family
Register adult → verify account → accept required notices/consent → create child profile → child assent/age-appropriate explanation → choose age band/language → enter child learning experience → parent can later review bounded evidence.

### Returning family
Log in → select authorized child profile → continue learning → cloud-backed progress in a later stage.

### School
Institutional invitation/provisioning → verify educator/admin → accept institutional terms/policies → receive role-scoped access → later create/assign cohorts under approved governance.

## Authentication surface
Stage 8 UX must support:
- Sign up / Register
- Log in
- Email verification for adults
- Password reset / account recovery
- Secure logout
- Session expiry/re-authentication for sensitive actions
- Account settings
- Role-aware navigation
- Child-profile switcher for authorized adults
- Consent/privacy status
- Account deletion/privacy-request entry point

## Identity/data model
Minimum conceptual entities:
- `adult_user`
- `role_assignment`
- `household_or_institution_membership`
- `child_profile`
- `adult_child_authorization`
- `consent_record`
- `assent_record`
- `policy_version`
- `session`
- `security_event`

Child profile fields should be minimized. Do not require child email, phone, exact birth date, home address, school name or government identifier merely to learn. Prefer age band or appropriately minimized age/eligibility data where the legal/product requirement permits.

## Authorization policy
Default deny. Server-side authorization must enforce ownership/membership and role scope. Hiding a button in the browser is not authorization.

- Parent: own account + authorized child profiles only.
- Child: own bounded learning surface only.
- Educator: approved institutional/assigned learner scope only.
- School Admin: institutional administration scope; no blanket access to private child content.

## Consent architecture
Consent must be versioned and auditable, recording at minimum the responsible adult, applicable child/profile, policy/purpose version, decision, timestamp and withdrawal/status history. Child assent must be age-appropriate and distinct from adult consent.

Do not use a pre-checked box or bundle optional purposes into required participation. Production legal wording and exact consent requirements require UAE legal/privacy review before release.

## Security baseline
- Never store plaintext passwords.
- Prefer a mature managed identity provider rather than implementing password cryptography in ATHAR client code.
- Server-managed authorization and protected APIs.
- Secure session cookies/token handling appropriate to selected architecture.
- Rate limiting and abuse controls for authentication endpoints.
- MFA capability for privileged institutional/admin roles; determine production requirement during threat modelling.
- Verification before sensitive account changes.
- Audit security-sensitive events without recording child learning conversations.
- CSRF/XSS/session fixation and account-enumeration controls appropriate to implementation.
- Secrets remain server-side and outside the public repository.

## Privacy baseline
- Data minimisation by role and purpose.
- Separation between authentication identity and child learning evidence.
- No advertising/behavioural targeting/data brokerage.
- No public profiles/social discovery.
- No child-facing account recovery through personal email/phone by default.
- Defined retention/deletion and export/request processes before production.

## Migration from current static pilot
Current browser-local progress must not automatically be attached to a newly authenticated child identity. Stage 9 will define explicit migration/synchronization rules and conflict handling for cloud progress/Passports.

## Stage 8 deliverables
1. Identity/role/authorization specification.
2. Consent/assent and privacy-state specification.
3. Authentication threat model and security requirements.
4. Account UX wireflow specification in Arabic/English.
5. Backend/identity-provider architecture decision record.
6. Database/API contract draft.
7. Static website account-entry prototype that makes no false claim of working authentication until backend exists.
8. Automated checks preventing accidental production claims or child independent-account patterns.

## Stage 8 release gate
Do not call Stage 8 production-ready until authentication is backed by a real server-side identity system, authorization tests pass, consent/privacy flows have formal review, security review is complete, and bilingual/mobile/accessibility QA is GREEN.
