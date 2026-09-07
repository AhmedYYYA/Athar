# ATHAR | أثر — Pilot Execution Runbook v1.0

## Purpose
Operationalize the approved controlled pilot without expanding the product beyond its current capabilities. This runbook sits under the approved Pilot Protocol and does not replace formal safeguarding, consent, privacy, legal or institutional approvals.

## 1. Pilot control roles
- **Pilot Lead:** owns session authorization, scope, daily status and stop/go decisions.
- **Facilitator:** briefs the child, protects independent thinking, supports navigation only when needed and invokes stop criteria.
- **Observer:** records structured usability, comprehension, judgement and safety observations without collecting unnecessary personal content.
- **Safeguarding Lead:** receives safeguarding/wellbeing escalations under the approved procedure.
- **Technical Lead:** triages reproducible product defects and protects the locked pilot baseline.
- **Evidence Lead:** maintains coded pilot records, data minimisation and analysis integrity.

One person may hold more than one role in a small shakedown, but safeguarding escalation and pilot authorization must remain explicit.

## 2. Pre-pilot readiness gate
No child session starts until all applicable items are confirmed:
- approved pilot baseline identified by commit/milestone;
- current regression/browser gate GREEN;
- supported device/browser available;
- Arabic and English entry flows checked;
- parent/guardian consent and child assent handled through the operator's approved process;
- participant code assigned without placing the child's name in the analytical dataset;
- facilitator and observer briefed;
- safeguarding escalation contact known;
- observation and incident forms ready;
- browser-local state checked/reset as required;
- no unapproved live AI, account, analytics or data collection component introduced.

## 3. Session control card
For each bounded session record only:
- participant code;
- age band: 7–9 or 10–12;
- primary pilot language: Arabic or English;
- device class and browser;
- session date and session sequence number;
- mission(s)/track(s) attempted;
- start/end or approximate duration;
- completion status;
- independent/supported evidence where relevant;
- structured observation codes;
- defect/incident reference numbers, if any.

Do not place names, contact details, health information, family circumstances, raw free-text answers or private conversations in the routine session record.

## 4. Session sequence
### A. Open — 2–5 minutes
1. Confirm participant code and approved participation conditions.
2. Explain: ATHAR is a learning tool, not a person.
3. Tell the child they may stop or ask an adult for help at any time.
4. Select preferred language and correct age experience.
5. If companion choice is used, make clear that Hamdan/Hessa are guides, not AI friends or secret keepers.

### B. Mission activity
1. State the mission objective without teaching the answer.
2. Let the child operate the interface wherever practical.
3. Observe before intervening.
4. Help navigation only when interface friction blocks meaningful progress.
5. Do not convert a hint-supported result into failure; record it as supported evidence.
6. Ask neutral prompts such as “How do you know?” rather than leading the child.
7. Apply the approved stop criteria immediately when triggered.

### C. Close — 3–5 minutes
1. Ask one or two short reflection questions in the child's preferred language.
2. Record structured observations.
3. Record defects separately from learning observations.
4. Confirm no unnecessary personal content was captured.
5. End the session rather than extending use simply to maximize mission completion.

## 5. Observation coding
Use bounded codes to make sessions comparable:
- **NAV:** navigation/interface friction
- **LANG:** language/localization issue
- **COMP:** concept comprehension
- **JUDG:** judgement/verification behaviour
- **SAFE:** safety/privacy/trusted-adult behaviour
- **SUP:** support/hint use
- **ACC:** accessibility/readability/input issue
- **TECH:** technical defect
- **ENG:** engagement/fatigue signal

Severity for product/operational issues:
- **S0 Observation:** no intervention required.
- **S1 Minor:** friction; session can continue safely.
- **S2 Material:** meaningful learning/usability impairment; workaround possible.
- **S3 Critical:** safety, privacy, safeguarding, accessibility or technical condition requiring session stop or pilot pause.

## 6. Defect handling
Every reproducible defect should include:
- defect ID;
- participant code only if analytically necessary;
- page/mission;
- Arabic/English;
- age band;
- device/browser;
- reproduction steps;
- expected vs observed behaviour;
- severity;
- screenshot only when it contains no unnecessary child/private information.

Do not change the pilot baseline during an active cohort without Pilot Lead authorization. Critical fixes require regression/browser re-verification before resuming affected use.

## 7. Safeguarding / privacy escalation
Immediately stop the relevant activity and follow `Safeguarding_and_Escalation.md` when a child appears distressed, attempts unnecessary sensitive disclosure, raises a wellbeing/safeguarding concern, or supervision conditions cannot be maintained.

The product is not a reporting, counselling or diagnostic system. Do not investigate disclosures through ATHAR.

## 8. Daily control cycle
At the end of each pilot day:
1. Reconcile sessions completed vs planned.
2. Review S2/S3 items first.
3. Separate product defects from pedagogy findings.
4. Check Arabic/English parity signals.
5. Check younger/older age-band friction separately.
6. Confirm data-minimisation compliance.
7. Decide: continue / continue with mitigation / pause affected flow / pause pilot.
8. Log the decision and owner.

## 9. Change control during pilot
- Locked curriculum/evidence rules are not silently edited in response to individual sessions.
- UI defects may be fixed only through controlled repository changes and QA.
- Material curriculum, safety-model or evidence-rule changes create a new tested baseline and must be documented before comparing subsequent results with earlier sessions.
- No experimental third-party tracking, chatbot, model, login or data service may be added mid-pilot without separate approval.

## 10. End-of-pilot decision gate
Use the approved success metrics and gap register to classify the outcome:
- **GO:** evidence supports a larger/institutional next phase and no critical issue remains open.
- **CONDITIONAL GO:** value is supported but named S2/production gaps require closure before scale.
- **REWORK:** material UX, curriculum, evidence-interpretation or operational issues require another bounded pilot cycle.
- **NO-GO:** unresolved safeguarding/privacy/accessibility risk or insufficient evidence of safe educational value.

The decision memo must distinguish observed evidence from interpretation and future assumptions.
