# ATHAR | أثر — Stage 8 Identity Data & API Contract Draft

## Core tables / collections
### adult_users
- id (UUID)
- identity_provider_subject (unique)
- primary_email (adult only)
- email_verified_at
- status
- created_at / updated_at

### role_assignments
- id
- adult_user_id
- role: `parent_guardian | educator | institution_admin`
- scope_id (household/institution where applicable)
- status
- granted_at / revoked_at

### child_profiles
- id (UUID)
- display_name_or_nickname
- age_band: `7_9 | 10_12`
- preferred_language: `ar | en`
- status
- created_at / updated_at

No child email/phone/exact DOB is required by the baseline design.

### adult_child_authorizations
- id
- adult_user_id
- child_profile_id
- relationship_type
- authority_status
- created_at / revoked_at

### institutions
- id
- display_name
- status

### institution_memberships
- id
- adult_user_id
- institution_id
- membership_role
- status

### policy_versions
- id
- policy_type
- version
- effective_at
- locale
- content_hash/reference

### consent_records
- id
- responsible_adult_user_id
- child_profile_id (nullable where account-level)
- policy_version_id
- purpose_code
- decision: `granted | declined | withdrawn`
- recorded_at
- supersedes_record_id (nullable)

### assent_records
- id
- child_profile_id
- policy_version_id
- age_band
- explanation_version
- decision: `agreed | declined | withdrawn`
- recorded_at

### security_events
- id
- adult_user_id (nullable)
- event_type
- occurred_at
- metadata_minimal

Do not store child learning answers or conversations in `security_events`.

## API surface draft
All protected endpoints require server-side authentication and authorization.

### Authentication/session adapter
`POST /api/auth/logout`
`GET /api/session`

Registration/login/recovery may be hosted by the selected identity provider or mediated through server endpoints; final contract depends on provider.

### Adult account
`GET /api/me`
`PATCH /api/me/preferences`
`POST /api/me/privacy-request`

### Child profiles
`GET /api/children`
`POST /api/children`
`GET /api/children/:id`
`PATCH /api/children/:id`
`POST /api/children/:id/archive`

### Consent and assent
`GET /api/children/:id/consent-status`
`POST /api/children/:id/consents`
`POST /api/children/:id/assents`
`POST /api/children/:id/withdraw`

### Institution membership
`GET /api/institutions/:id/membership`
`GET /api/institutions/:id/educators`

Cohort/learner assignment is deferred to the institutional stage and should not be invented in Stage 8.

## Authorization examples
- Parent requests `/api/children/:id`: allow only if active `adult_child_authorizations` exists.
- Educator requests a child resource: deny in Stage 8 unless a future explicit assignment/entitlement exists.
- Institution admin cannot read private child learning evidence by virtue of admin role alone.
- Child-facing session later receives a scoped child context rather than adult account privileges.

## Error model
Use generic authentication/recovery messages that do not enable account enumeration. Return `403` for authenticated but unauthorized access and avoid revealing whether inaccessible child resources exist.

## Audit model
Record security/account administration actions necessary for assurance, but avoid broad behavioral surveillance. Every audit field should have a defined security or governance purpose.
