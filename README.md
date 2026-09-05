# ATHAR | أثر

A bilingual AI-readiness website and learning platform for children aged
7 to 12. Static site: no build step to deploy, no runtime dependencies.

## Run

Open `index.html`, or `python3 -m http.server 8000`. Copy the folder to any
static host.

## Test

```
npm install jsdom
node test/run.js
```

155 assertions covering the lesson engine in both languages, bilingual
parity, hint honesty, trail lock logic, accessibility, asset integrity,
navigation drift across pages, and whether every page still reads with
JavaScript disabled. Non-zero exit on failure.

## Publish

```
bash deploy.sh https://github.com/<you>/<repo>.git
```

Handles an empty repository or one with existing work. Do not use GitHub's
browser uploader: it mangles folder case and silently drops files.

---

## Pages

| Page | For |
|---|---|
| `index.html` | Everyone. What this is and why. |
| `tracks.html` | The six-track, seventeen-mission curriculum. |
| `families.html` | Parents. What a mission is, what is stored, what to ask. |
| `schools.html` | Teachers. Fitting it in a lesson, what evidence looks like. |
| `safety.html` | The specific safety decisions, including unsolved ones. |
| `companions.html` | Hamdan and Hessa, and the rules they follow. |
| `about.html` | Why the project exists and where it stands. |
| `learn.html` | The mission trail. |
| `lesson.html` | The mission player. |
| `404.html` | Not found. |

## Design

The brand mark is one continuous stroke reading as both a reaching figure and
the Arabic أ, and أثر means the trace a person leaves. So the stroke is the
design system: a drawn line runs down the page and content hangs off it.
Sections are stops on a path, and the same path becomes the child's trail.

Colours are sampled from the mark: indigo `#2F49A8`, blue `#1E77C4`, teal
`#00A88F`, orange `#F07818` on white, with orange reserved for the one action
to take next. Type is Readex Pro throughout, a single family covering Arabic
and Latin, so neither script is a fallback for the other.

## Architecture

```
tools/prefill.js   fills English text and expands lists into the HTML
data/copy.js       every site string, both languages
data/curriculum.js six tracks, seventeen missions
data/lesson-*.js   mission content
js/site.js         shared runtime: copy swapping, language toggle
js/i18n.js         language, direction, Arabic-Indic numerals
js/state.js        progress, storage with in-memory fallback
js/engine.js       the lesson engine
js/trail.js        trail rendering and lock logic
js/home.js         the homepage stroke
test/run.js        regression suite
```

**Content is data.** Pages are authored with `data-copy` paths and
`data-list` containers. `node tools/prefill.js` fills them from
`data/copy.js`, so the served HTML reads correctly with no JavaScript and
cannot drift from the strings the runtime uses. The prefill fails loudly on
an unknown key rather than emitting a blank element.

**Lessons are data too.** One engine renders every stage type: `teach`,
`multi`, `choice`, `sort`, `train`, `celebrate`. Adding a mission means
writing a data file and registering it, not patching the engine.

After editing copy or page structure, run `node tools/prefill.js` and commit
the result.

## Bilingual

Both languages are authored in the same files. A test fails the build if any
English string lacks Arabic, or if English survives on screen after switching
language on any page. Arabic gets more line-height because hamza and shadda
clip at Latin values, and digits follow the script.

## Safety, as built

No chat surface anywhere. No advertising, analytics or third-party tracking.
Working alone is offered as an equal option to either companion. Taking a
hint is recorded as support rather than independent mastery, and that is
tested. No AI scoring or profiling. Progress stays in the browser and is
never transmitted.

## Known gaps

- **Fonts load from Google**, which logs visitor addresses and contradicts
  the third-party claim on the safety page. Self-host Readex Pro before this
  goes in front of schools. The safety page says so itself.
- **No read-aloud audio.** For ages 7 to 9 this matters more than almost
  anything else here, and it needs recorded voice in both languages.
- **One mission is complete.** `what-is-ai` runs across nine stages; the
  other sixteen show as being written.
- **No accounts or backend**, so no classroom reporting yet.
- **Trademark not cleared.** Treat the name as a working title.
- **Character art carries a soft white glow** baked into the source render.
  The white canvas hides it; a clean re-export would remove the constraint.

## Worth porting from the old build

The previous repository's `lesson1-hardening.js` contains a safety exercise
where an AI tells a child they need not involve an adult, and the child
learns to involve one anyway. The safety page describes this exercise, but it
is not yet implemented as a stage. It should be.
