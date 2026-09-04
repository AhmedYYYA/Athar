# ATHAR Lesson 1 — Production QA Gates

Status: AUTOMATED QUALITY GATES GREEN. Browser/rendered acceptance remains required before release. Main remains untouched; PR remains draft.

## Corrective actions completed
- [x] Bounded lesson state, competency evidence, hint support, mission position and completion persist locally.
- [x] Forward stage skipping is blocked.
- [x] Lesson completion and competency evidence are separate states.
- [x] 7–9 requires no typing; 10–12 adds optional deeper reasoning.
- [x] Relevant companion hints downgrade evidence from independent to supported.
- [x] Stage 08 is a five-step integrated School Garden mission: AI recognition, examples/patterns, verification, human agency and privacy.
- [x] Stage 06 includes a mandatory medicine/health/safety transfer scenario requiring a trusted adult.
- [x] Deterministic simulation only; no child input leaves the browser.
- [x] External font calls removed from Lesson 1 to reduce supply-chain/privacy dependency.
- [x] Progress semantics, focus treatment, reduced motion and disabled navigation states implemented.
- [x] Automated CI quality gate added.

## Gate 1 — Functional
- [x] Stages 00–09 represented in controlled sequence.
- [x] Required mastery interactions block progression until resolved.
- [x] Age pathways implemented as approved.
- [x] EN/AR state persists; RTL logic implemented.
- [x] Companion state persists: Hamdan / Hessa / No companion.
- [x] No-companion pathway coherent.
- [x] Lesson completion and Passport evidence separate.
- [x] JavaScript syntax validated by CI.
- [x] HTML structurally parsed by CI.
- [ ] Browser-run acceptance matrix: 7 EN / 8 AR / 11 EN / 12 AR.
- [ ] Reload/resume test at each stage and each Stage 08 mission step in a real browser.
- [ ] Speech synthesis test on Safari iOS, Chrome and Edge.

## Gate 2 — Educational & Child Safety
- [x] Approved Stage 00–09 pedagogy remains source of truth.
- [x] AI framed as a tool, not person/authority.
- [x] Machine learning is one approach, not all AI.
- [x] Deterministic exercises visibly labelled where relevant.
- [x] Blind trust and blanket distrust receive corrective feedback.
- [x] Privacy requires correct demonstration.
- [x] Health/safety transfer requires trusted-adult escalation.
- [x] Competency-critical hint use records supported rather than independent evidence.
- [x] No emotional dependency/exclusivity language.
- [x] No psychometric/personality/intelligence/emotional inference.
- [x] CI asserts core child-safety invariants.
- [ ] Final rendered educational/safety review.

## Gate 3 — Visual & Brand
- [x] Approved ATHAR symbol retained; Arabic أثر spelling retained.
- [x] Approved Hamdan/Hessa assets retained.
- [x] Companion remains secondary.
- [x] No coins, streaks, rankings or addictive reward loops; CI checks prohibited patterns.
- [ ] Full rendered visual regression desktop/mobile EN/AR.
- [ ] Compare against approved high-fidelity visual baseline screen by screen.

## Gate 4 — Accessibility / Performance / Security
- [x] Visible keyboard focus treatment.
- [x] Reduced-motion preference.
- [x] Responsive mobile/tablet/desktop CSS.
- [x] Progressbar semantics and live status regions.
- [x] No live AI, auth, payments or real child data.
- [x] No analytics/ad trackers.
- [x] No external HTTP dependencies in Lesson 1 HTML/JS.
- [x] Local storage limited to bounded demo learning state/preferences.
- [x] No API keys/client secrets.
- [x] CI validates syntax, structure, privacy/supply-chain, safety, bilingual/age-depth and accessibility hooks.
- [ ] Keyboard-only browser end-to-end test.
- [ ] 320px, 375px, 768px, 1024px and large desktop rendered test.
- [ ] WCAG 2.2 AA rendered audit including dynamic announcements.
- [ ] Performance and asset-failure browser test.

## Automated evidence
GitHub Actions workflow `Lesson 1 quality gates`, run 33793740418: `static-quality` completed successfully. Passed: checkout, JavaScript syntax, HTML parse, child-safety invariants, privacy/supply-chain invariants, accessibility hooks, bilingual/age-depth invariants.

## Architecture note
The deterministic pilot remains frontend-only by design. A backend becomes justified with authenticated adult/educator accounts, cross-device records, consent/audit records, school tenancy, controlled AI inference or reporting. Those capabilities require data minimisation, parent/guardian consent, tenant isolation, server-side authorization, audit logging and retention controls.

## Release rule
Overall release status remains AMBER until real-browser/rendered gates are completed. Do not merge to `main` until all four gates are complete, visual regression is reviewed, and explicit user approval is recorded.