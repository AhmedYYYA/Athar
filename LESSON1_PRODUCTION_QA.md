# ATHAR Lesson 1 — Production QA Gates

Status: CORRECTIVE ENGINEERING PASS 1 COMPLETE. Main remains untouched. Draft PR only.

## Corrective actions completed
- [x] Persist bounded lesson state, competency evidence, hint support state, mission position and completion locally.
- [x] Prevent forward stage skipping; only completed/current next stage is reachable.
- [x] Separate lesson completion from competency evidence in the state model.
- [x] Implement real 10–12 optional deeper-reasoning disclosures; 7–9 remains tap/select with no typing.
- [x] Convert competency evidence to `supported` when a relevant companion hint is used.
- [x] Expand Stage 08 from a single question to a five-step integrated School Garden mission covering AI recognition, examples, verification, human agency and privacy.
- [x] Preserve deterministic simulation architecture; no child input leaves the browser.
- [x] Add disabled navigation styling and keyboard-visible focus for disclosure controls.
- [x] Keep companion optional and secondary.

## Gate 1 — Functional
- [x] Stages 00–09 represented in controlled sequence.
- [x] Required mastery interactions block progression until resolved.
- [x] Age 7–9 pathway requires no typing.
- [x] Age 10–12 exposes optional deeper reasoning without changing core curriculum.
- [x] EN/AR state persists; RTL logic implemented.
- [x] Companion state persists: Hamdan / Hessa / No companion.
- [x] No-companion pathway remains coherent.
- [x] Lesson completion and Passport evidence are separate states.
- [ ] Browser-run acceptance matrix: 7 EN / 8 AR / 11 EN / 12 AR.
- [ ] Reload/resume test at each stage and each Stage 08 mission step.
- [ ] Speech synthesis test on Safari iOS, Chrome and Edge.

## Gate 2 — Educational & Child Safety
- [x] Approved Stage 00–09 pedagogy remains source of truth.
- [x] Core definition avoids saying AI literally thinks like a human.
- [x] AI consistently framed as a tool, not a person/authority.
- [x] Machine learning presented as one approach, not all AI.
- [x] Deterministic exercises labelled simulation where relevant.
- [x] Blind trust and blanket distrust both receive corrective feedback.
- [x] Privacy evidence requires correct demonstration.
- [x] Competency-critical hint use records supported rather than independent evidence.
- [x] No emotional dependency/exclusivity language.
- [x] No psychometric/personality/intelligence/emotional inference.
- [ ] Add/verify dedicated health-or-safety trusted-adult transfer scenario before release.
- [ ] Independent educational/safety content review of final rendered build.

## Gate 3 — Visual & Brand
- [x] Approved ATHAR symbol path retained; Arabic أثر spelling retained.
- [x] Existing approved Hamdan/Hessa assets retained.
- [x] Companion remains secondary.
- [x] No coins, streaks, rankings or addictive reward loops.
- [ ] Full rendered visual regression review desktop/mobile EN/AR.
- [ ] Compare against approved high-fidelity visual baseline screen by screen.

## Gate 4 — Accessibility / Performance / Security
- [x] Visible focus treatment implemented.
- [x] Reduced-motion preference respected.
- [x] Responsive CSS covers mobile/tablet/desktop.
- [x] No live AI, auth, payments or real child data.
- [x] No analytics/ad trackers introduced.
- [x] Local storage limited to bounded demo learning state/preferences.
- [x] No API keys/client secrets introduced.
- [ ] Automated HTML/JS validation and browser console error test.
- [ ] Keyboard-only end-to-end test.
- [ ] 320px, 375px, 768px, 1024px and large desktop visual test.
- [ ] WCAG 2.2 AA audit including accessible state announcement after dynamic feedback.
- [ ] Performance audit and asset-loading failure test.

## Architecture note
This pilot remains deliberately frontend-only. A backend is not required for the deterministic Lesson 1 learning experience and would create unnecessary child-data and attack surface. A production backend becomes justified only when authenticated adult/educator accounts, cross-device learner records, consent records, school tenancy, controlled AI inference or reporting are introduced. At that point, data minimisation, parent/guardian consent, tenant isolation, server-side authorization, audit logging and retention controls become mandatory design gates.

## Release rule
Do not merge this branch to `main` until all four gates are complete, visual regression is reviewed, and explicit user approval is recorded.