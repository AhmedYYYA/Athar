# ATHAR | أثر

ATHAR is a UAE-first bilingual AI-readiness learning experience for children aged 7–12.

> **The child stays the thinker. AI stays the tool.**

The current repository is a static HTML/CSS/JavaScript pilot deployed through GitHub Pages. Progress, companion choice, traces, badges and Passport evidence remain browser-local. No live AI, account, payment, advertising or analytics system is connected in this build.

## Live pages

- Home: `index.html`
- Child journey: `learn.html`
- Mission player: `lesson.html?m=<mission-id>`
- Families: `families.html`
- Educators / schools: `schools.html`
- Safety: `safety.html`

GitHub Pages: `https://ahmedyyya.github.io/Athar/`

## Locked milestones

### Glass Home v1

`milestone-glass-home-v1` — baseline `562bedac41f2214ca01679c4df33991ad024b8c0`

The approved glass treatment, transparency, animated colour fields, ATHAR motion graphic and movement are the reference direction for the rest of the product.

### Connected Learning v2

`milestone-connected-learning-v2` — baseline `1c716f8c6cfb95217a8f58b42e94d8126e75e689`

This preserves the approved Journey + Mission + Passport loop, Missions 1–2, browser-local progress, traces, badges, evidence and companion continuity.

## Current learning loop

**Journey → Mission → Feedback → Completion → Traces/Badge → Passport evidence → Journey**

Completion and competency evidence remain separate. Hint use is recorded as **supported**, not independent mastery; a later replay without hints can upgrade the lesson evidence to independent.

## Available missions

All mission content is bilingual, data-driven and rendered by one generic engine.

1. `what-is-ai` — **What is AI? | ما هو الذكاء الاصطناعي؟**
2. `patterns` — **Spotting patterns | اكتشاف الأنماط**
3. `data` — **Where examples come from | من أين تأتي الأمثلة**
4. `clear-asking` — **Say what you mean | قل ما تقصد**
5. `details` — **Add the useful bits | أضف التفاصيل المفيدة**
6. `refine` — **Make it better | اجعلها أفضل**
7. `can-be-wrong` — **When AI is wrong | حين يخطئ**
8. `verify` — **Checking a fact | التحقق من معلومة**
9. `fairness` — **Is it fair to everyone? | هل هو منصف للجميع؟**
10. `private` — **Private means private | الخاص يبقى خاصًا**
11. `not-human` — **A tool, not a friend | أداة، لا صديق**

Missions 4–6 complete the child-facing **SUPER** loop:

**S — State goal → U — Use helpful details → P — Pick output → E — Examine result → R — Refine**

Missions 7–9 form the **Check it | تحقّق منه** track. Children learn that confidence is not proof, choose sources that fit the claim, cross-check important information, use evidence to revise a conclusion, notice missing representation and keep responsible people in the loop for important decisions.

Missions 10–11 form the **Protect yourself | احمِ نفسك** track. Children practise recognising private information, sharing only what a task needs, asking a trusted adult before sharing personal material, keeping AI in its role as a tool, spotting secrecy/isolation pressure and choosing real people for trust, care and serious safety help.

The Safety Passport now tracks five foundations: **AI is a tool, check what matters, keep private things private, involve a trusted adult when needed, and do not keep secrets with AI.**

## Six curriculum tracks

1. Understand it | افهمه — implemented
2. Ask it well | أحسِن سؤاله — implemented
3. Check it | تحقّق منه — implemented
4. Protect yourself | احمِ نفسك — implemented
5. Create with it | أبدع به — in development
6. See inside | انظر في داخله — in development

The curriculum currently contains **16 planned missions**, of which **11 are implemented**.

## Key files

```text
index.html                       approved glass homepage
learn.html                       live child journey
lesson.html                      reusable mission player
families.html                    family experience
schools.html                     educator experience
safety.html                      glass safety experience

css/home-glass.css               approved homepage visual language
css/glass-system.css             shared glass foundation
css/journey-v2.css               journey, progression and Passports
css/lesson-glass.css             calmer glass learning surface
css/pages-glass.css              adult/safety glass pages

js/glass-locale.js               bilingual runtime for glass pages
js/state.js                      browser-local progress and evidence
js/journey.js                    curriculum progression and Passport rendering
js/i18n.js                       mission language/direction runtime
js/engine.js                     generic mission engine

data/curriculum.js               six tracks and availability
data/lesson-what-is-ai.js        Mission 1
data/lesson-patterns.js           Mission 2
data/lesson-data.js               Mission 3
data/lesson-clear-asking.js       Mission 4
data/lesson-details.js            Mission 5
data/lesson-refine.js             Mission 6
data/lesson-can-be-wrong.js       Mission 7
data/lesson-verify.js             Mission 8
data/lesson-fairness.js           Mission 9
data/lesson-private.js            Mission 10
data/lesson-not-human.js          Mission 11

test/site-smoke-v2.js             current site smoke tests
test/mission-regression-v2.js     bilingual mission walkthrough tests
.github/workflows/athar-regression.yml
```

## Product constraints

- Arabic and English are first-class experiences.
- Ages 7–9 require short, concrete and independently understandable language.
- The child remains the thinker and decision-maker.
- Hamdan and Hessa are optional guided companions, not emotional friends or authorities.
- No unrestricted child chatbot.
- No advertising or behavioural targeting.
- No child-data brokerage.
- No automatic high-stakes grading, diagnosis or behavioural profiling.
- No open-web retrieval inside child missions in this pilot.
- No hint is counted as independent mastery.
- Do not call raster imagery embedded inside an SVG a true vector.

## Local state

`js/state.js` stores only bounded pilot state: traces, completed mission IDs, evidence mode, badges, Safety/Skills Passport evidence, companion choice and last mission. Do not add sensitive child information to localStorage.

## Test

```bash
npm install
npm test
```

The GitHub Actions regression workflow runs current-site smoke checks and complete bilingual walkthroughs of every available mission on pushes to `main` and pull requests.

## Run locally

```bash
python3 -m http.server 8000
```

## Status / cautions

- This remains a pilot/demo rather than a production school deployment.
- Formal trademark clearance is still required before public commercial launch of the word mark.
- Character artwork must remain faithful to the approved Hamdan/Hessa references; do not substitute reinterpretations.
- Fonts currently load from Google and should be self-hosted before a stricter school privacy deployment.
- Locked milestones must remain recoverable while later sections continue to evolve.
