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

The fluid glass homepage approved on 6 September 2026 is preserved on:

`milestone-glass-home-v1`

Baseline commit:

`562bedac41f2214ca01679c4df33991ad024b8c0`

Its glass treatment, transparency, animated colour fields, ATHAR motion graphic, colour movement and overall visual language are the reference direction for the rest of the product. Audience-specific pages use different motion intensity: expressive on marketing/journey surfaces and calmer inside learning tasks.

### Connected Learning v2

The approved Journey + Mission + Passport learning loop is preserved on:

`milestone-connected-learning-v2`

Baseline commit:

`1c716f8c6cfb95217a8f58b42e94d8126e75e689`

This milestone includes the connected Journey, Mission 1, Mission 2, local progress, traces, badges, Safety/Skills Passport evidence and companion continuity.

## Current learning loop

The child experience follows a connected loop:

**Journey → Mission → Feedback → Completion → Traces/Badge → Passport evidence → Journey**

`learn.html` reads the curriculum and browser-local state dynamically. It shows:

- the next unlocked mission;
- all six learning tracks;
- completed / locked / in-development mission states;
- traces and badges earned;
- Safety Passport foundations;
- Skills Passport evidence;
- Hamdan, Hessa or no companion.

Completion and competency evidence remain separate concepts. If a learner uses a hint, completion is recorded as **supported** rather than independent. A later replay without hints can upgrade that lesson evidence to independent.

## Missions

Mission content is data-driven and rendered by one generic engine.

Currently available:

1. `what-is-ai` — **What is AI? | ما هو الذكاء الاصطناعي؟**
2. `patterns` — **Spotting patterns | اكتشاف الأنماط**
3. `data` — **Where examples come from | من أين تأتي الأمثلة**
4. `clear-asking` — **Say what you mean | قل ما تقصد**
5. `details` — **Add the useful bits | أضف التفاصيل المفيدة**
6. `refine` — **Make it better | اجعلها أفضل**

Missions 4–6 together complete the child-facing **SUPER** loop:

**S — State goal → U — Use helpful details → P — Pick output → E — Examine result → R — Refine**

Mission 5 deepens how children choose relevant, safe details and useful limits. Mission 6 teaches them to compare results with their goal, verify important claims, refine weak results and stop the AI loop when a trusted adult is needed for health or safety.

Future missions remain visible on the journey as in-development items and are not presented as complete features.

### Six curriculum tracks

1. Understand it | افهمه
2. Ask it well | أحسِن سؤاله
3. Check it | تحقّق منه
4. Protect yourself | احمِ نفسك
5. Create with it | أبدع به
6. See inside | انظر في داخله

The first two tracks are now fully implemented in the pilot.

## Key files

```text
index.html                    approved glass homepage
learn.html                    live child journey
lesson.html                   reusable mission player
families.html                 family experience
schools.html                  educator experience
safety.html                   safety information

css/home-glass.css            approved homepage visual language
css/glass-system.css          shared glass foundation
css/journey-v2.css            child journey, progression and Passports
css/lesson-glass.css          calmer glass learning surface

js/glass-locale.js            bilingual runtime for glass pages
js/state.js                   browser-local progress, traces, badges and Passports
js/journey.js                 curriculum progression and journey rendering
js/i18n.js                    mission language/direction runtime
js/engine.js                  generic mission engine

data/curriculum.js            six tracks and mission availability
data/lesson-what-is-ai.js     Mission 1
data/lesson-patterns.js        Mission 2
data/lesson-data.js            Mission 3
data/lesson-clear-asking.js    Mission 4
data/lesson-details.js         Mission 5
data/lesson-refine.js          Mission 6

test/run.js                   original regression suite
test/mission-regression-v2.js multi-mission bilingual regression suite
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

`js/state.js` stores only bounded pilot state such as:

- traces;
- completed mission IDs;
- evidence mode (`independent` / `supported`);
- badges;
- Safety / Skills Passport evidence IDs;
- companion choice;
- last mission.

Do not add sensitive child information to localStorage.

## Test

```bash
npm install
npm test
```

`npm test` runs the original regression suite and the multi-mission bilingual walkthrough for all currently available missions.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Development rule

Before changing an approved experience:

1. inspect the current `main` branch;
2. reproduce the issue or define the intended behaviour;
3. make the smallest coherent change;
4. test English and Arabic;
5. test the complete mission sequence;
6. verify progression on return to the journey;
7. verify mobile/laptop layout and accessibility;
8. only then treat the iteration as ready for milestone approval.

## Status / cautions

- This remains a pilot/demo rather than a production school deployment.
- Formal trademark clearance is still required before public commercial launch of the word mark.
- Character artwork must remain faithful to the approved Hamdan/Hessa references; do not substitute reinterpretations.
- Locked milestones must remain recoverable while later sections continue to evolve.
