# Stage 8 Security Verification

Status: connected development environment; not yet production-authorized for real child data.

## Verified controls

- Supabase project status: active/healthy.
- Adult identities use Supabase Auth; child profiles are application records, not Auth users.
- Public browser code contains only the Supabase publishable key; service-role credentials remain server-side.
- Row Level Security is enabled across identity, role, child-profile, authorization, policy, consent, assent and privacy-request tables.
- Child-profile creation requires an authenticated parent/guardian and executes through a JWT-protected Edge Function plus restricted service-role RPC.
- Consent and child assent are separate, versioned records.
- Consent/assent withdrawal archives the child profile and appends an explicit withdrawn state instead of overwriting history.
- Export/deletion requests are recorded as controlled privacy requests; the browser does not directly delete records.
- `child_profile_status` is a `security_invoker` view so underlying RLS remains authoritative.
- `manage-child-profile` is JWT protected and origin restricted to `https://ahmedyyya.github.io`.

## RLS isolation test

A transaction-only test created two synthetic authenticated adults and two synthetic child profiles, each authorized to a different adult. Under an authenticated JWT context for Adult A, the database verified:

- exactly one child profile was visible;
- Adult A's child was visible;
- Adult B's child was not visible;
- only Adult A's adult profile was visible;
- only Adult A's role assignment was visible.

All five isolation assertions returned `true`. The transaction was rolled back; no synthetic test identities or child records were retained.

## Supabase security advisor

After the Stage 8 schema/privacy changes, the Supabase security advisor returned zero security findings.

## Repository regression gate

GitHub Actions ATHAR Regression run #123 completed successfully on Stage 8 head `b87aca44597b60de8d54bda33af153718b58f354`.

## Remaining gates before Stage 8 can be called production-ready

- production configuration review for Auth redirect URLs, email templates, password policy, rate limits/CAPTCHA and MFA policy for privileged roles;
- UAE legal/privacy review, including data-transfer/residency assessment for the selected Supabase region;
- real browser end-to-end verification of email signup/verification/recovery using controlled test accounts;
- accessibility and Arabic/RTL QA of all account states including errors;
- defined operator workflow and SLA for privacy export/deletion requests;
- confirmation that no real child data is entered before pilot authorization and institutional approval.
