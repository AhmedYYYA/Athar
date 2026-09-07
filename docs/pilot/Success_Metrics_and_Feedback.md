# ATHAR | أثر — Pilot Success Metrics & Feedback Framework

## Measurement philosophy
The pilot should determine whether ATHAR helps children demonstrate better AI judgement and safe learning behaviours without encouraging dependency. Metrics must not turn the pilot into high-stakes scoring or child profiling.

## A. Technical and UX metrics
Track by age band, language and device where sample size allows:
- session start success rate;
- mission start/completion rate;
- blocked navigation incidents;
- horizontal overflow/clipping incidents;
- language/RTL defects;
- average number of facilitator navigation interventions;
- critical/high defects per session;
- browser/device-specific failures;
- accessibility barriers observed.

### Target interpretation
The strongest signal is not raw completion speed. It is a low rate of **avoidable facilitator intervention** while children remain able to explain what they are doing.

## B. Learning and judgement metrics
Use mission evidence plus structured observation:
- independent vs supported evidence;
- ability to explain one key concept in own words;
- verification behaviour: recognizes that important claims need checking;
- privacy behaviour: identifies information that should not be shared;
- trusted-adult behaviour for safety/high-stakes situations;
- agency: can identify own contribution when using a tool;
- responsible credit/disclosure behaviour;
- age-appropriate understanding of steps, conditions and loops.

Do not collapse these into one opaque child score.

## C. Safety metrics
- number of safeguarding triggers;
- number and severity of safety/content defects;
- successful trusted-adult routing in safety scenarios;
- observed misunderstanding of AI as a person/friend/secret keeper;
- unnecessary personal-information disclosures prompted by product or facilitation;
- incidents where adult intervention was required to restore a safe state.

A single critical product-caused safety/privacy defect is a release-blocking event until reviewed.

## D. Bilingual parity metrics
Compare Arabic and English for:
- mission completion friction;
- navigation interventions;
- comprehension questions;
- visible untranslated UI tokens;
- RTL/directional defects;
- text truncation/overflow;
- parent/educator clarity ratings.

Arabic should not be considered successful merely because all strings are translated. It should provide equivalent comprehension and interaction quality.

## E. Parent / guardian feedback
Short post-use prompts, preferably 5-point scale plus one optional comment:
1. I understand what ATHAR is teaching my child.
2. I understand the difference between independent and supported evidence.
3. ATHAR's safety boundaries are clear to me.
4. I am comfortable with the amount of information the current pilot stores.
5. I would be willing to let my child continue using ATHAR under the described supervision model.

Open prompt: **What would increase or reduce your trust in ATHAR?**

## F. Educator feedback
1. The six-track foundation is understandable and teachable.
2. Mission evidence gives useful teaching signals without over-profiling learners.
3. Arabic and English are suitable for classroom use.
4. The classroom rhythm is practical.
5. I can see where ATHAR fits into existing teaching rather than replacing the teacher.

Open prompt: **What would be required before you could run this with a real class?**

## G. Child feedback
Keep short and age-appropriate. Suggested prompts:
- Was it easy to know what to do next? Yes / A little / No
- Did the mission make you think for yourself? Yes / Sometimes / No
- If you used a hint, did it help you think rather than just give the answer? Yes / Sometimes / No
- Which part was confusing?
- Which part would you want to do again?

## H. Decision framework
At pilot close, classify each domain:
- **GREEN:** suitable to progress with no critical unresolved issue;
- **AMBER:** usable but requires specific corrective actions before expansion;
- **RED:** material safety, privacy, accessibility, learning-integrity or reliability issue blocks expansion.

Domains: Technical reliability, Child UX, Arabic/English parity, Learning evidence, Safety/safeguarding, Parent trust, Educator usefulness, Accessibility.

The overall recommendation cannot be GREEN if Safety/safeguarding or Privacy is RED.
