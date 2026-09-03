# ATHAR | أثر

**Agency · Transformation · Honing · Artificial Intelligence · Readiness**

ATHAR is a UAE-born, child-safe AI literacy and readiness experience for children aged 7–12, families and educators.

> The child remains the thinker. AI remains the tool.

## Live demo

https://ahmedyyya.github.io/Athar/

## v2 product demo

The current build is a complete bilingual front-end product demonstration built around the approved ATHAR brand identity and product baseline. It includes:

- approved `ATHAR | أثر` bilingual lockup and approved symbol artwork
- Safari-safe direct raster rendering for the visible master identity
- controlled ATHAR colour system and bilingual typography
- true standalone SVG UI iconography for Explore, Learn, Create, Impact, Safety Passport and Skills Passport
- SVG favicon and PWA identity support
- English/LTR and Arabic/RTL switching
- responsive desktop, tablet and mobile layouts
- mobile navigation
- Explore → Learn → Create → Impact brand journey
- SUPER learning method
- interactive Young Explorer environment
- Parent supervision view
- Educator cohort dashboard
- mission progression and a working verification activity
- Safety Passport state model
- Skills progression indicators
- recent-activity and intervention signals
- safety-first demo boundary

## Controlled asset architecture

- `assets/athar-approved-lockup.jpg` — approved bilingual visual master used by the live UI
- `assets/athar-approved-symbol.jpg` — approved symbol visual master used by the live UI
- `assets/athar-lockup.svg` — SVG reference wrapper to the approved lockup artwork
- `assets/athar-symbol.svg` — SVG reference wrapper to the approved symbol artwork
- `assets/favicon.svg` — standalone browser/PWA SVG mark
- `assets/ui/*.svg` — standalone ATHAR UI icon family

The reference SVG wrappers preserve the approved visual artwork but are **not** a substitute for a final manually engineered Bézier production master. A future production-vector release must be optically checked against the approved artwork and must preserve the exact Arabic `أثر` spelling, including the hamza and the three dots of `ث`.

## Structure

- `index.html` — semantic application shell
- `styles.css` — ATHAR design system and responsive UI
- `app.js` — bilingual role-based demo state and interactions
- `manifest.webmanifest` — PWA metadata
- `.github/workflows/build-approved-brand-assets.yml` — validation-only quality gate; it does not regenerate or overwrite approved brand artwork

## Safety boundary

This is a controlled front-end demonstration. It does **not** connect directly to an AI provider, collect real child data, implement production authentication, process payments, expose open-web retrieval, or provide an unrestricted child chatbot.

A production build must route model use through the approved server-side AI gateway, consent/safeguarding model, provider registry and data-lifecycle controls defined in the programme specifications.

## Current status

**ATHAR v2 — interactive product demonstration.**

The next engineering stage is production architecture: secure authentication, consent and child profiles, server-side mission/content services, Safety/Skills Passport persistence, adult controls, AI gateway integration, telemetry, testing and pilot release controls.