# ATHAR | أثر — pilot build

A bilingual (Arabic/English) AI-readiness platform for children aged 7–12.
Static site, no build step, no framework, no dependencies at runtime.

---

## Running it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Deploys to GitHub Pages, Netlify, S3 or any static host by copying the folder.
There is nothing to compile.

## Running the tests

```
npm install jsdom
node test/run.js
```

122 assertions covering state, bilingual parity, every lesson stage in both
languages, hint/evidence honesty, trail lock logic, accessibility surface and
asset integrity. Exit code is non-zero on failure, so it drops into CI as-is.

---

## Architecture

```
index.html          Homepage
learn.html          The trail — mission map
lesson.html         Lesson player shell

css/athar.css       Design tokens, chrome, buttons, RTL rules
css/home.css        Homepage
css/trail.css       Trail map
css/lesson.css      Lesson player

js/state.js         Learner progress, storage with in-memory fallback
js/i18n.js          Language, RTL, Arabic-Indic numerals
js/engine.js        The lesson engine
js/trail.js         Trail renderer and lock logic

data/curriculum.js         Tracks and missions
data/lesson-what-is-ai.js  Mission content
data/site-copy.js          All marketing copy, bilingual

test/run.js         Regression suite
assets/             Locked brand and character art
```

### The one rule that matters

**Lesson content is data. The engine renders it.**

The previous codebase accumulated per-stage JavaScript that wrapped and
overrode earlier functions, so every content change risked a regression
somewhere unrelated. Here, no stage has bespoke code. `js/engine.js` renders
any stage of a known type, and a lesson is a data file.

### Adding a lesson

1. Create `data/lesson-<id>.js` following `lesson-what-is-ai.js`.
2. Add the entry to `data/curriculum.js` with `ready: true`.
3. Include the script in `lesson.html`.

No engine changes. The tests will walk the new stages automatically once the
lesson id is added to the walkthrough.

### Stage types the engine supports

| Type | What the child does |
|---|---|
| `teach` | Reads one idea, optionally with idea cards |
| `multi` | Selects all correct options |
| `choice` | Selects one option; supports a quoted AI answer to judge |
| `sort` | Assigns each card to a category |
| `train` | Feeds examples and watches confidence change |
| `celebrate` | Receives traces and a badge |

Every type accepts `kicker`, `title`, `body`, `hint`, `after` and `companion`.
All content fields take `{ en, ar }`.

---

## Bilingual

Arabic is not a translation layer over an English product. Both languages are
authored in the same data files, and a test fails the build if any English
string lacks an Arabic counterpart, or if English text survives on screen
after switching to Arabic.

RTL is handled with logical CSS properties and a direction switch, not
mirrored stylesheets. Arabic gets its own line-height because hamza and shadda
clip at the tighter values that suit Latin display type. Digits follow the
script: ٢ من ٩ in Arabic, 2 of 9 in English.

---

## Safety decisions encoded in the build

- No open chat surface anywhere in the product.
- No advertising, no third-party analytics, no tracking of any kind.
- Companion selection includes "on my own" as a first-class option.
- Hint use is recorded honestly: taking a hint marks the mission as completed
  with support rather than independently. This is tested.
- No AI scoring, diagnosis or profiling of a learner.
- Progress is stored locally and never transmitted.

---

## Known limitations

**Character artwork has a soft white glow baked into the source render.**
The supplied files are 4096px rasters wrapped in SVG tags — not vectors. The
glow is attached to the silhouette and cannot be separated programmatically
without damaging Hamdan's white kandura. The build works around it by seating
characters on a near-white disc, which reads as intentional. A clean re-export
or a proper vector redraw would remove the constraint. Assets here are
premultiplied before resampling, which is what prevents edge halos when the
4K originals are scaled down.

**Audio is not implemented.** The "Listen" affordance in the original mockups
is not in this build. For ages 7–9 it matters, and it needs recorded Arabic
and English voice, not synthesis.

**One mission is complete.** `what-is-ai` is fully built across nine stages.
The remaining sixteen appear on the trail as locked with "coming soon".

**No accounts, no backend.** Progress lives in the browser. Classroom
reporting needs a server, which brings data-protection obligations that
should be designed deliberately rather than bolted on.

**Trademark is not cleared.** Per the project's own legal status, the ATHAR
word mark has not completed screening. Treat this build as internal.

---

## Verified

Rendered and inspected in Chromium at desktop and mobile widths, in both
languages, across all nine stages. Bugs found and fixed during the build:
`[hidden]` losing to `.btn { display: inline-flex }`; anchor buttons showing
underlines; Arabic diacritics clipping; Western digits inside Arabic copy;
untranslated homepage copy mangling under bidi; and edge halos from
straight-alpha resampling.
