# ATHAR | أثر — Pilot vs Production Gap Register

This register prevents pilot functionality from being mistaken for production-school readiness.

| Domain | Current pilot state | Production requirement / next gate | Priority |
|---|---|---|---|
| Child identity | No child identity required in current product | Approved identity architecture, age/role model and minimum-data design | High |
| Parent/guardian consent | Operational, outside product | Verified consent lifecycle, records, withdrawal and purpose controls as legally required | Critical |
| Child assent | Operational, outside product | Age-appropriate assent/notice integrated into approved onboarding where required | High |
| Accounts / authentication | None | Secure adult accounts, child subprofiles and role-based access | High |
| School cohorts | None | Teacher-created cohorts, assignment and authorized learner mapping | High |
| Central progress | Browser-local only | Secure backend storage with retention/deletion policy and access controls if centrally required | High |
| Adult dashboards | Local demonstration only | Authorized parent/educator dashboards with data minimisation and role separation | High |
| Raw answers/transcripts | Not default and not needed | Remain absent by default; any future collection requires explicit purpose and governance | Critical |
| Live AI | None in current deterministic pilot | Controlled AI orchestration gateway, approved model/provider, content/safety controls, logging policy, red-team and fallback | Critical before live-AI pilot |
| Open web retrieval | None | Keep unavailable to children unless a separately governed, bounded retrieval design is approved | Critical |
| Safeguarding operations | Pilot guide only | Formal organizational safeguarding SOP, trained responsible roles and incident escalation integration | Critical |
| UAE legal/privacy review | Not completed by product | Formal UAE legal, child digital safety and privacy review before production/commercial launch | Critical |
| Data governance | Minimal local state | Data map, controller/processor roles, purpose limitation, retention, deletion, DPIA/assessment as applicable | Critical |
| Security | Static pilot surface | Threat model, secure SDLC, backend/API security, secrets, dependency management, penetration testing and incident response | Critical |
| Accessibility | Automated/browser hardening + design review | Formal WCAG 2.2 audit, assistive-technology testing and representative child accessibility review | High |
| Arabic quality | Full bilingual content direction with automated parity checks | Native Arabic linguistic QA across all missions/releases and device-level RTL acceptance | High |
| Read-aloud | Incomplete | Complete, tested bilingual read-aloud/audio accessibility strategy before it is claimed | Medium/High |
| Fonts | Google-hosted Readex Pro | Self-host approved webfonts before stricter school privacy deployment | High |
| Analytics | None | Privacy-preserving, purpose-limited measurement plan with consent/notice where required | Medium/High |
| LMS / school records | None | Defined integration/API and records governance only if institutionally required | Medium |
| High-stakes grading | Explicitly absent | Remain out of scope unless separately governed; ATHAR evidence should not become opaque automated high-stakes scoring | Critical boundary |
| Character governance | Approved PNG/reference assets | Controlled production asset pack and fidelity QA; no identity redesign/regeneration | High |
| Trademark | Formal clearance still required | Legal trademark search/clearance and filing strategy before public commercial launch | High |
| Operational support | Pilot facilitator-led | Support model, incident ownership, uptime/deployment process and release governance | High |
| Device coverage | Chromium automation + human spot checks | Representative Safari/iOS, Android Chrome, tablet and school-device matrix with acceptance evidence | High |

## Production decision rule
A successful controlled pilot does **not** close these gaps automatically. Progression to production requires each critical gap to have an approved owner, control and evidence of completion. Product marketing, school proposals and demonstrations must distinguish clearly between features that exist now and future capabilities.
