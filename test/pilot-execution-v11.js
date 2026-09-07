const fs = require('fs');

const required = [
  'docs/pilot/Pilot_Execution_Runbook.md',
  'docs/pilot/Pilot_Execution_Readiness_Checklist.md',
  'docs/pilot/Pilot_Shakedown_Plan.md',
  'docs/pilot/Pilot_Shakedown_Report_Template.md',
  'docs/pilot/Facilitator_Quick_Card.md',
  'docs/pilot/Pilot_Facilitator_Briefing_Arabic.md',
  'docs/pilot/Pilot_Parent_Quick_Brief_Arabic.md',
  'docs/pilot/Pilot_Educator_Quick_Brief_Arabic.md',
  'docs/pilot/Session_and_Incident_Log_Template.md',
  'docs/pilot/Pilot_Data_Dictionary.md',
  'docs/pilot/Pilot_Go_NoGo_Decision_Memo.md',
  'docs/pilot/Pilot_Execution_Governance_Dependencies.md',
  'docs/pilot/Pilot_Execution_Signoff.md',
  'docs/pilot/Pilot_Closeout_Checklist.md',
  'docs/pilot/Stage7_README.md'
];
const csvs = [
  'docs/pilot/Pilot_Session_Tracker.csv',
  'docs/pilot/Pilot_Issue_Tracker.csv',
  'docs/pilot/Daily_Pilot_Control.csv',
  'docs/pilot/Pilot_Risk_Register.csv'
];

let checks = 0;
function ok(condition, message) {
  checks++;
  if (!condition) throw new Error(message);
}

for (const file of required) {
  ok(fs.existsSync(file), `Missing Stage 7 file: ${file}`);
  ok(fs.readFileSync(file, 'utf8').trim().length > 300, `Stage 7 file unexpectedly thin: ${file}`);
}
for (const file of csvs) ok(fs.existsSync(file), `Missing Stage 7 tracker: ${file}`);

const runbook = fs.readFileSync('docs/pilot/Pilot_Execution_Runbook.md', 'utf8');
for (const phrase of ['Pilot Lead', 'Safeguarding Lead', 'S3 Critical', 'participant code', 'GO:', 'NO-GO:']) {
  ok(runbook.includes(phrase), `Runbook missing control concept: ${phrase}`);
}

const quick = fs.readFileSync('docs/pilot/Facilitator_Quick_Card.md', 'utf8');
ok(quick.includes('أثر أداة للتعلّم'), 'Facilitator card missing Arabic briefing');
ok(quick.includes('How do you know?'), 'Facilitator card missing neutral English prompt');

const ar = fs.readFileSync('docs/pilot/Pilot_Facilitator_Briefing_Arabic.md', 'utf8');
ok(ar.includes('الدليل المدعوم لا يعني الفشل'), 'Arabic facilitator brief missing supported-evidence principle');
ok(ar.includes('حمدان وحصه'), 'Arabic facilitator brief missing approved guide names');

const logs = fs.readFileSync('docs/pilot/Session_and_Incident_Log_Template.md', 'utf8');
ok(logs.includes('Do not use these templates to collect'), 'Log template missing data-minimisation warning');

const sessionHeader = fs.readFileSync('docs/pilot/Pilot_Session_Tracker.csv', 'utf8').split(/\r?\n/)[0];
ok(!sessionHeader.toLowerCase().includes('name'), 'Session tracker must not require a child-name field');
ok(sessionHeader.includes('participant_code'), 'Session tracker missing participant_code');

const governance = fs.readFileSync('docs/pilot/Pilot_Execution_Governance_Dependencies.md', 'utf8');
for (const phrase of ['parent/guardian consent', 'child assent', 'storage location', 'final authority']) {
  ok(governance.includes(phrase), `Governance dependencies missing: ${phrase}`);
}

const decision = fs.readFileSync('docs/pilot/Pilot_Go_NoGo_Decision_Memo.md', 'utf8');
for (const outcome of ['CONDITIONAL GO', 'REWORK', 'NO-GO']) ok(decision.includes(outcome), `Decision memo missing ${outcome}`);

console.log(`Stage 7 pilot execution integrity: ${checks}/${checks} checks passed`);
