# ATHAR | أثر — Stage 8 Governance Exception Closure

**Exception:** GE-08-01  
**Recorded:** 2026-09-08  
**Decision authority:** Founder / Product Owner  
**Decision:** Stage 8 is accepted as a technical development baseline and may be used as the dependency for Stage 9. It is not approved for production, a child pilot, or real child data.

## Exception record

Pull request #11 was merged while its own description still required it to remain draft pending production Auth configuration, UAE legal/privacy and data-transfer review, controlled real-email testing, bilingual RTL/accessibility QA, and an approved privacy-operations workflow. The merge was therefore premature as a governance event even though the merged implementation and automated checks were technically usable for continued development.

The merge is not rewritten or treated as retroactive production approval. This record makes the exception explicit and carries every unmet external gate forward.

## Corrective closure for repository sequencing

| Closure condition | Owner | Required evidence | Status |
|---|---|---|---|
| Fix the Stage 8 baseline to an immutable commit | Engineering owner | PR #11 head `85b1ddac1360efc04b01039849976c38e4c92a3f`; merge commit `6ed7df84236dd78a61ee43067b31cfe021fee1f0` | Closed |
| Confirm the merged head passed the repository gate | Engineering owner | ATHAR Regression run #124, conclusion `success` | Closed |
| Preserve adult-first identity, consent/assent separation, RLS isolation, and controlled privacy-request entry points | Security / backend owner | `Stage8_Security_Verification.md`; zero Supabase security-advisor findings at verification | Closed for development baseline |
| Reconcile documentation that still described an unconnected prototype | Product + engineering owner | Stage 8 architecture and ADR updated to connected-development status | Closed by this corrective change |
| Prohibit production/pilot inference from the merge | Founder / Product Owner | This exception record and the carried-forward gate register below | Closed |

## Carried-forward gates

These conditions remain open and cannot be waived by this technical acceptance:

| Gate | Accountable owner | Minimum evidence for later approval |
|---|---|---|
| Production Auth configuration | Auth / platform owner | Approved redirect allowlist; production email templates and SMTP; password, session, rate-limit, CAPTCHA and privileged-role MFA settings; configuration capture | Open |
| UAE privacy and international data transfer | UAE privacy counsel / controller | Written applicability and lawful-transfer assessment for the deployed region, processor terms, retention and data-subject-rights position | Open |
| Controlled real-email journeys | QA + Auth owner | Test-account evidence for signup, verification, sign-in, recovery, expiry/re-authentication and logout; secrets and personal addresses redacted | Open |
| Arabic, RTL and accessibility | QA owner + native Arabic reviewer | Bilingual state matrix, keyboard/screen-reader results, mobile captures and issue closure | Open |
| Privacy operations | Privacy operations owner | Approved export/deletion runbook, identity verification, access control, SLA, fulfillment evidence, exception handling and audit retention | Open |
| Pilot/institution authorization | Pilot lead / institution | Named accountable roles, safeguarding route, site approval, readiness checklist and explicit launch decision | Open |

## Approval boundary

Effective immediately:

- **APPROVED:** Stage 8 as the technical dependency baseline for Stage 9 development and test-only, non-identifying profiles.
- **NOT APPROVED:** production activation, real child data, child pilot sessions, or any claim that the remaining legal, privacy, transfer, accessibility or operational gates are complete.
- Stage 9 must preserve these restrictions and must not convert a technical merge into launch authorization.

GE-08-01 is closed only for repository sequencing. Production acceptance remains open until every carried-forward gate has accountable evidence and an explicit separate decision.
