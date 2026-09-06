# ATHAR | أثر

ATHAR is a UAE-first bilingual AI-readiness learning experience for children aged 7–12.

> **The child stays the thinker. AI stays the tool.**

The current repository is a static HTML/CSS/JavaScript pilot deployed through GitHub Pages. Progress, age experience, companion choice, traces, badges and Passport evidence remain browser-local. No live AI, account, payment, advertising or analytics system is connected in this build.

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

### Foundation Journey v3

`milestone-foundation-journey-v3` — baseline `a02b6837cb21c4f012b7ab229ff5489a8eac3f2f`

This preserves the completed six-track, 16-mission bilingual foundation journey before the current experience-hardening work.

## Current learning loop

**Journey → Mission → Feedback → Completion → Traces/Badge → Passport evidence → Journey**

Completion and competency evidence remain separate. Hint use is recorded as **supported**, not independent mastery; a later replay without hints can upgrade the lesson evidence to independent.

## Age-differentiated experience

The Journey now lets the learner choose an age experience and stores only that preference locally:

- **Ages 7–9** — shorter, more concrete presentation with fewer optional explanations.
- **Ages 10–12** — the same 16-mission curriculum plus optional **Tell me more | أخبرني أكثر** explanations that introduce deeper terminology such as dataset, prompt, iteration, hallucination, bias, authorship, algorithm, condition and loop where appropriate.

The curriculum spine, evidence rules and safety expectations remain the same for both age bands.

## Available missions

All 16 foundation missions are bilingual, data-driven and rendered by one generic engine.

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
12. `my-idea` — **Whose idea was it? | فكرة من كانت؟**
13. `credit` — **Giving credit | نسب العمل لأصحابه**
14. `steps` — **Thinking in steps | التفكير بالخطوات**
15. `rules` — **If this, then that | إذا حدث هذا، فافعل ذاك**
16. `loops` — **Doing it again | التكرار**

Missions 4–6 complete the child-facing **SUPER** loop:

**S — State goal → U — Use helpful details → P — Pick output → E — Examine result → R — Refine**

Missions 7–9 form the **Check it | تحقّق منه** track. Children learn that confidence is not proof, choose sources that fit the claim, cross-check important information, use evidence to revise a conclusion, notice missing representation and keep responsible people in the loop for important decisions.

Missions 10–11 form the **Protect yourself | احمِ نفسك** track. Children practise recognising private information, sharing only what a task needs, asking a trusted adult before sharing personal material, keeping AI in its role as a tool, spotting secrecy/isolation pressure and choosing real people for trust, care and serious safety help.

Missions 12–13 form the **Create with it | أبدع به** track. Children learn to lead with their own purpose and judgement, use AI as assistance rather than a substitute for thinking, describe who contributed what, credit important sources, disclose relevant AI help honestly and avoid presenting copied work as their own.

Missions 14–16 form the **See inside | انظر في داخله** track. Children learn the foundations of computational thinking: breaking a goal into ordered steps, debugging missing instructions, reading IF/THEN conditions, noticing the limits of simple rules, recognising repetition, using loops and understanding clear stopping conditions.

The Safety Passport tracks five foundations: **AI is a tool, check what matters, keep private things private, involve a trusted adult when needed, and do not keep secrets with AI.**

The Skills Passport contains **47 evidence items** across AI recognition, patterns/data, prompting, checking, privacy/boundaries, authorship/credit and computational thinking.

## Six curriculum tracks

1. Understand it | افهمه — implemented
2. Ask it well | أحسِن سؤاله — implemented
3. Check it | تحقّق منه — implemented
4. Protect yourself | احمِ نفسك — implemented
5. Create with it | أبدع به — implemented
6. See inside | انظر في داخله — implemented

The **16-mission ATHAR foundation journey is fully implemented** in the current pilot. Completing all 16 now produces a richer Foundation Trail completion state showing traces, badges, Passport evidence and the number of missions demonstrated independently.

## Family and educator evidence views

`families.html` and `schools.html` now include browser-local evidence summaries. They demonstrate how ATHAR can surface:

- mission completion;
- independent vs supported completion;
- traces and badges;
- completion by learning track;
- Safety Passport and Skills Passport evidence;
- selected age experience.

These views deliberately do **not** expose raw child answers, conversations or identifying information. The educator view is a pilot evidence concept, not yet an LMS or official school record.

## Key files

```text
index.html                       approved glass homepage
learn.html                       live child journey + age experience selector
lesson.html                      reusable age-aware mission player
families.html                    family experience + local evidence view
schools.html                     educator experience + local evidence view
safety.html                      glass safety experience

css/home-glass.css               approved homepage visual language
css/glass-system.css             shared glass foundation
css/journey-v2.css               journey, progression and Passports
css/lesson-glass.css             calmer glass learning surface
css/pages-glass.css              adult/safety glass pages
css/experience-hardening.css     age, completion and evidence hardening

js/glass-locale.js               bilingual runtime for glass pages
js/state.js                      browser-local progress, evidence and age band
js/journey.js                    curriculum progression and Passport rendering
js/experience-hardening.js       Journey age and completion enhancements
js/lesson-age.js                 optional 10–12 deeper explanations
js/adult-progress.js             browser-local family/educator evidence summary
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
data/lesson-my-idea.js            Mission 12
data/lesson-credit.js             Mission 13
data/lesson-steps.js              Mission 14
data/lesson-rules.js              Mission 15
data/lesson-loops.js              Mission 16

test/site-smoke-v2.js             current site smoke tests
test/mission-regression-v2.js     bilingual mission walkthrough tests
test/experience-hardening.js      age/completion/adult-view regression tests
test/browser-qa.spec.js           real Chromium desktop/mobile QA
playwright.config.js              browser QA configuration
.github/workflows/athar-regression.yml
```

## Product constraints

- Arabic and English are first-class experiences.
- Ages 7–9 require short, concrete and independently understandable language.
- Ages 10–12 may receive optional deeper explanations without changing the core mission sequence.
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

`js/state.js` stores only bounded pilot state: traces, completed mission IDs, evidence mode, badges, Safety/Skills Passport evidence, companion choice, selected age experience and last mission. Do not add sensitive child information to localStorage.

## QA

```bash
npm install
npm test
npx playwright install chromium
npm run test:browser
```

The GitHub Actions regression workflow runs:

- current-site smoke checks;
- complete bilingual walkthroughs of all 16 missions;
- experience-hardening checks;
- real Chromium desktop checks for every mission in English and Arabic;
- mobile horizontal-overflow checks across the Journey and all missions;
- browser checks for age differentiation and Family/Educator evidence views.

The first hardened Chromium gate completed GREEN with **32/32 smoke checks, 836/836 mission-regression checks, 16/16 hardening checks and 19/19 real-browser tests**.

## Run locally

```bash
python3 -m http.server 8000
```

## Status / cautions

- This remains a pilot/demo rather than a production school deployment.
- Automated Chromium QA verifies rendering, key viewport constraints, bilingual direction and functional surfaces; it does not replace human child-UX review on representative devices.
- Formal trademark clearance is still required before public commercial launch of the word mark.
- Character artwork must remain faithful to the approved Hamdan/Hessa references; do not substitute reinterpretations.
- Fonts currently load from Google and should be self-hosted before a stricter school privacy deployment.
- Locked milestones must remain recoverable while later sections continue to evolve.
