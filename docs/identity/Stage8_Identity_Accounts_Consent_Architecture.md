# ATHAR | أثر — Stage 8: Identity, Accounts & Consent Architecture v12

## Status
**IN IMPLEMENTATION — draft PR #11.** Architecture is established and the first bilingual account-entry prototype is staged. Production authentication is not yet connected.

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
Stage 8 UX must support Sign up/Register, Log in, adult email verification, password reset/account recovery, secure logout, session expiry/re-authentication for sensitive actions, account settings, role-aware navigation, child-profile switching, consent/privacy status, and account deletion/privacy-request entry.

### Prototype pages now staged
- `login.html`
- `register.html`
- `account-help.html`
- `child-profile.html`
- `css/account-v12.css`
- `js/account-v12.js`

These pages are deliberately labeled **prototype only** and do not transmit/store credentials or create accounts.

## Identity/data model
Core entities: `adult_user`, `role_assignment`, `household_or_institution_membership`, `child_profile`, `adult_child_authorization`, `consent_record`, `assent_record`, `policy_version`, `session`, and `security_event`.

Child profile fields should be minimized. Do not require child email, phone, exact birth date, home address, school name or government identifier merely to learn. Prefer age band or appropriately minimized age/eligibility data where sufficient.

## Authorization policy
Default deny. Server-side authorization must enforce ownership/membership and role scope. Hiding a button in the browser is not authorization.

- Parent: own account + authorized child profiles only.
- Child: own bounded learning surface only.
- Educator: approved institutional/assigned learner scope only.
- School Admin: institutional administration scope; no blanket access to private child content.

## Consent architecture
Consent must be versioned and auditable. Child assent must be age-appropriate and distinct from adult consent. Do not use pre-checked consent or bundle optional purposes into required participation. Production wording and exact consent requirements require UAE legal/privacy review.

## Security baseline
Never store plaintext passwords; prefer a mature managed identity provider; use protected server-side APIs and default-deny authorization; secure sessions; rate limiting; privileged-role MFA capability; verification for sensitive changes; minimal security audit events; CSRF/XSS/session-fixation/account-enumeration controls; and server-side secret management.

## Privacy baseline
Data minimisation, separation of adult authentication identity from child learning evidence, no advertising/behavioural targeting/data brokerage, no public profiles/social discovery, no child-facing recovery through personal email/phone by default, and defined retention/deletion/export processes before production.

## Migration from current static pilot
Current browser-local progress must not automatically be attached to a newly authenticated child identity. Stage 9 will define explicit migration/synchronization and conflict rules.

## Supporting implementation documents
- `Stage8_Backend_Identity_ADR.md`
- `Stage8_Data_API_Contract_Draft.md`

The ADR proposes a mature managed identity provider for adult authentication while ATHAR retains role, child-profile, consent/assent and authorization logic server-side.

## Automated guardrails
`test/identity-consent-v12.js` verifies adult-first registration, bilingual UX, explicit prototype labeling, no child email/phone request, separate consent/assent representation, and no credential processing in client-side prototype JavaScript. It is included in `npm test`.

## Stage 8 release gate
Do not call Stage 8 production-ready until authentication is backed by a real server-side identity system, authorization tests pass, consent/privacy flows have formal review, security review is complete, and bilingual/mobile/accessibility QA is GREEN.
