const fs=require('fs');
const required=['docs/passport/Stage9_Cloud_Passport_Architecture.md','supabase/migrations/20260908154900_stage9_cloud_passport_foundation.sql','supabase/migrations/20260908155500_stage9_lock_direct_learning_writes.sql','supabase/migrations/20260908160000_stage9_invoker_sync_rls.sql'];
let checks=0;function ok(c,m){checks++;if(!c)throw new Error(m)}
for(const f of required)ok(fs.existsSync(f),`Missing Stage 9 file: ${f}`);
const schema=fs.readFileSync(required[1],'utf8');const lock=fs.readFileSync(required[2],'utf8');const invoker=fs.readFileSync(required[3],'utf8');const arch=fs.readFileSync(required[0],'utf8');
for(const table of ['child_learning_state','mission_progress','passport_evidence','child_achievements']){ok(schema.includes(`public.${table}`),`Missing ${table}`);ok(schema.includes(`alter table public.${table} enable row level security`),`RLS missing for ${table}`)}
ok(schema.includes("('not_yet','supported','independent')"),'Evidence states must remain not_yet/supported/independent');
ok(schema.includes('revision bigint'),'Cloud state must have optimistic concurrency revision');
ok(schema.includes('p_expected_revision'),'Sync must accept expected revision');
ok(schema.includes("mission_progress.evidence='independent' or excluded.evidence='independent'"),'Mission evidence must not downgrade independent');
ok(schema.includes("passport_evidence.state='independent' or excluded.state='independent'"),'Passport evidence must not downgrade independent');
ok(schema.includes('on conflict do nothing'),'Achievements must be idempotent');
const tableDefs=[...schema.matchAll(/create table public\.(?:child_learning_state|mission_progress|passport_evidence|child_achievements)\s*\((.*?)\);/gis)].map(m=>m[1].toLowerCase()).join('\n');
for(const forbidden of ['raw_answer','child_answer','prompt_text','transcript','conversation_text','child_email','child_phone','date_of_birth'])ok(!tableDefs.includes(forbidden),`Forbidden cloud column/token: ${forbidden}`);
ok(lock.includes('revoke insert, update, delete'),'Direct browser writes must first be explicitly removed');
ok(invoker.includes('security invoker'),'Authenticated sync RPCs must run as security invoker');
ok(invoker.includes('learning_state_authorized_insert')&&invoker.includes('passport_evidence_authorized_update'),'RLS write policies must scope sync writes');
ok(arch.includes('must never be silently attached'),'Local progress migration must require explicit profile binding');
ok(arch.includes('raw child answers')&&arch.includes('prompts')&&arch.includes('transcripts'),'Architecture must explicitly exclude raw child content');
console.log(`Stage 9 Cloud Passport integrity: ${checks}/${checks} checks passed`);