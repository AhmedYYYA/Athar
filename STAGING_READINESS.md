# ATHAR | أثر — Staging Readiness

**Staging baseline:** `milestone-experience-hardening-v4`  
**Approved baseline commit:** `3a2e6ef00b6a600a07eee48a9d93c8732bea3014`  
**Working integration branch:** `staging`

## Purpose

The staging branch is the controlled integration environment between the approved experience milestone and the next pilot-ready release. New work is developed and validated here before promotion to `main`.

The approved design language, 16-mission curriculum, bilingual structure, age model, companion rules, Safety Passport, Skills Passport and child-safety principles remain controlling requirements.

## Promotion rule

A staging build is eligible for promotion to `main` only when all required gates are GREEN and no unresolved critical child-safety, privacy, navigation, rendering or accessibility defect remains.

## Staging gates

### S0 — Baseline integrity
- Approved glass visual system preserved.
- Six tracks and 16 foundation missions present.
- Arabic and English remain first-class experiences.
- Hamdan, Hessa and No companion remain optional choices.
- No unrestricted child chatbot, advertising, behavioural targeting or emotional-companion behaviour introduced.

### S1 — Functional regression
- Static-site smoke suite GREEN.
- All 16 missions complete successfully in English and Arabic.
- Completion, badges, traces and Passport evidence persist correctly.
- Supported evidence remains distinct from independent evidence.
- Stage navigation has no dead ends.

### S2 — Real-browser experience QA
- Chromium desktop mission rendering GREEN.
- Mobile journey and mission overflow checks GREEN.
- Arabic RTL rendering GREEN.
- Age-band persistence GREEN.
- Companion persistence GREEN.
- Foundation-completion moment GREEN.
- Family and Educator evidence summaries GREEN.
- Browser traces/screenshots retained for failures.

### S3 — Age differentiation
- Ages 7–9 keep concise wording and reduced explanatory density.
- Ages 10–12 receive optional deeper explanations without changing the curriculum spine.
- Age selection persists locally and is visible to the learner.
- No age band requires unsafe or unrestricted AI access.

### S4 — Accessibility and responsive quality
- Keyboard navigation and visible focus verified.
- Skip navigation available on core pages.
- Touch targets remain practical on mobile.
- Reduced-motion behaviour preserved.
- No essential instruction depends only on colour.
- Arabic and English layouts remain free from horizontal overflow at representative viewports.

### S5 — Parent and educator evidence views
- Adult views show completion separately from evidence.
- Safety and Skills Passport evidence is understandable without exposing raw child transcripts.
- Independent vs supported evidence remains visible where relevant.
- Adult pages remain calmer and more information-dense than the child Journey while sharing the ATHAR glass identity.

### S6 — Pilot-readiness review
Before promotion beyond staging, complete:
- privacy/data-flow review;
- child-safeguarding review;
- UAE legal/compliance review for the intended pilot configuration;
- accessibility review;
- performance review on representative mobile devices;
- content/editorial review in Arabic and English;
- pilot measurement and support plan;
- release-candidate sign-off.

## Current staging automation

Every push to `staging` runs:

1. static smoke tests;
2. full bilingual mission regression;
3. experience-hardening tests;
4. real Chromium browser QA;
5. staging acceptance browser gates;
6. persistent Playwright report / failure artifacts.

## Release discipline

- `main` = approved/public baseline.
- `staging` = integration and pilot-hardening work.
- `milestone-*` branches = immutable reference points for approved milestones.

Do not develop experimental changes directly on a milestone branch.
