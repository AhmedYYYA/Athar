const fs = require('fs');

const required = [
  'docs/pilot/Pilot_Execution_Runbook.md',
  'docs/pilot/Pilot_Execution_Readiness_Checklist.md',
  'docs/pilot/Facilitator_Quick_Card.md',
  'docs/pilot/Session_and_Incident_Log_Template.md',
  'docs/pilot/Pilot_Go_NoGo_Decision_Memo.md',
  'docs/pilot/Stage7_README.md'
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

const runbook = fs.readFileSync(required[0], 'utf8');
for (const phrase of ['Pilot Lead', 'Safeguarding Lead', 'S3 Critical', 'participant code', 'GO:', 'NO-GO:']) {
  ok(runbook.includes(phrase), `Runbook missing control concept: ${phrase}`);
}

const quick = fs.readFileSync(required[2], 'utf8');
ok(quick.includes('أثر أداة للتعلّم'), 'Facilitator card missing Arabic briefing');
ok(quick.includes('How do you know?'), 'Facilitator card missing neutral English prompt');

const logs = fs.readFileSync(required[3], 'utf8');
ok(logs.includes('Do not use these templates to collect'), 'Log template missing data-minimisation warning');

const decision = fs.readFileSync(required[4], 'utf8');
for (const outcome of ['CONDITIONAL GO', 'REWORK', 'NO-GO']) ok(decision.includes(outcome), `Decision memo missing ${outcome}`);

console.log(`Stage 7 pilot execution integrity: ${checks}/${checks} checks passed`);
