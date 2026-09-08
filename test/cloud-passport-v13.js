const fs=require('fs');
const vm=require('vm');

const required=[
  'docs/governance/Stage8_Governance_Exception_Closure.md',
  'docs/passport/Stage9_Cloud_Passport_Architecture.md',
  'docs/passport/Stage9_Security_Verification.md',
  'css/cloud-passport-v13.css','js/cloud-passport-v13.js',
  'supabase/migrations/20260908154900_stage9_cloud_passport_foundation.sql',
  'supabase/migrations/20260908155500_stage9_lock_direct_learning_writes.sql',
  'supabase/migrations/20260908160000_stage9_invoker_sync_rls.sql',
  'supabase/migrations/20260908170000_stage9_rpc_boundary_and_contract.sql'
];
let checks=0;
function ok(c,m){checks++;if(!c)throw new Error(m)}
function read(f){return fs.readFileSync(f,'utf8')}
for(const f of required)ok(fs.existsSync(f),`Missing Stage 9 file: ${f}`);

const schema=read(required[5]);
const lock=read(required[6]);
const invoker=read(required[7]);
const hardening=read(required[8]);
const arch=read(required[1]);
const client=read('js/cloud-passport-v13.js');
const state=read('js/state.js');
const account=read('js/account-v12.js');
const learn=read('learn.html');
const lesson=read('lesson.html');
const exception=read(required[0]);

for(const table of ['child_learning_state','mission_progress','passport_evidence','child_achievements']){
  ok(schema.includes(`public.${table}`),`Missing ${table}`);
  ok(schema.includes(`alter table public.${table} enable row level security`),`RLS missing for ${table}`);
  ok(hardening.includes(`grant select on public.${table} to authenticated`),`Explicit authenticated SELECT grant missing for ${table}`);
  ok(hardening.includes(`revoke all privileges on public.${table} from anon, authenticated`),`Direct browser privilege reset missing for ${table}`);
}
ok(schema.includes("('not_yet','supported','independent')"),'Evidence states must remain not_yet/supported/independent');
ok(schema.includes('revision bigint'),'Cloud state must have optimistic concurrency revision');
ok(schema.includes('p_expected_revision'),'Sync must accept expected revision');
ok(schema.includes("mission_progress.evidence='independent' or excluded.evidence='independent'"),'Mission evidence must not downgrade independent');
ok(schema.includes("passport_evidence.state='independent' or excluded.state='independent'"),'Passport evidence must not downgrade independent');
ok(schema.includes('on conflict do nothing'),'Achievements must be idempotent');
const tableDefs=[...schema.matchAll(/create table public\.(?:child_learning_state|mission_progress|passport_evidence|child_achievements)\s*\((.*?)\);/gis)].map(m=>m[1].toLowerCase()).join('\n');
for(const forbidden of ['raw_answer','child_answer','prompt_text','transcript','conversation_text','child_email','child_phone','date_of_birth'])ok(!tableDefs.includes(forbidden),`Forbidden cloud column/token: ${forbidden}`);

ok(lock.includes('revoke insert, update, delete'),'Initial direct browser writes must be explicitly removed');
ok(invoker.includes('security invoker'),'The public synchronization boundary must remain invoker-scoped');
ok(hardening.includes('create schema if not exists athar_private'),'Privileged mutator must live in a non-exposed schema');
ok(hardening.includes('security definer')&&hardening.includes("set search_path = ''"),'Internal mutator must use a fixed empty search path');
ok(hardening.includes('language sql')&&hardening.includes('security invoker'),'Public RPC must be a SECURITY INVOKER wrapper');
ok(hardening.includes('drop policy if exists mission_progress_authorized_insert'),'Direct write RLS policies must be removed');
ok(hardening.includes('unknown_payload_key')&&hardening.includes('payload_too_large'),'RPC must reject unknown and oversized payloads');
ok(hardening.includes('mission_progress_mission_contract_check'),'Mission identifiers must be database constrained');
ok(hardening.includes('passport_evidence_key_contract_check'),'Passport identifiers must be database constrained');
ok(hardening.includes('child_achievements_key_contract_check'),'Achievement identifiers must be database constrained');
ok(hardening.includes('local_import_version')&&hardening.includes('athar.progress.v1'),'Explicit local-import receipt must be persisted');
ok(hardening.includes('profile_archived')&&hardening.includes('not_authorized'),'RPC must reject archived and unauthorized profiles');

ok(learn.includes('id="cloudPassport"')&&learn.includes('id="cloudPassportAction"'),'Journey must expose the Cloud Passport binding state and action');
ok(learn.includes('data-ar=')&&learn.includes('Answers and conversations are never uploaded'),'Cloud Passport UI must be bilingual and state its data boundary');
ok(learn.includes('js/cloud-passport-v13.js')&&lesson.includes('js/cloud-passport-v13.js'),'Journey and lesson must load the cloud adapter');
ok(lesson.includes('ATHAR.cloudPassport.ready().then(startLesson,startLesson)'),'Lesson must hydrate the selected profile before changing progress');
ok(client.includes('get_child_cloud_passport')&&client.includes('sync_child_learning_state'),'Client must use the reviewed read/sync RPCs');
ok(client.includes('connectExplicitly')&&client.includes('needsBindingCopy'),'Local-to-cloud migration must require an explicit binding action');
ok(client.includes('resolveConflict')&&client.includes('mergeBounded'),'Client must implement deterministic conflict recovery');
ok(client.includes('payload.local_import_version=LOCAL_IMPORT'),'Client must submit the bounded migration receipt');
ok(!client.includes('localStorage.setItem(PROFILE_KEY'),'Client must not persist a child-profile identifier in localStorage');
ok(account.includes("sessionStorage.setItem('athar.activeChildProfile'"),'Profile selection must remain session-scoped');
ok(state.includes('replaceBounded')&&state.includes('mergeBounded'),'Local state must support safe profile replacement and monotonic merge');
ok(arch.includes('must never be silently attached'),'Architecture must require explicit profile binding');
ok(arch.includes('raw child answers')&&arch.includes('prompts')&&arch.includes('transcripts'),'Architecture must explicitly exclude raw child content');
ok(exception.includes('GE-08-01')&&exception.includes('APPROVED')&&exception.includes('NOT APPROVED'),'Governance exception must record both approval and prohibition boundaries');

async function dynamicChecks(){
  const calls=[];
  const profile='11111111-1111-4111-8111-111111111111';
  function storage(){const values=new Map();return{getItem:key=>values.has(key)?values.get(key):null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)}}
  const listeners={};
  const root={dataset:{}};
  const status={textContent:''};
  const button={hidden:true,disabled:false,dataset:{},setAttribute(name,value){this[name]=String(value)},removeAttribute(name){delete this[name]},click(){(listeners.click||[]).forEach(fn=>fn({target:{closest:selector=>selector==='#cloudPassportAction'?button:null}}))}};
  const document={
    documentElement:{lang:'en'},
    getElementById:id=>({cloudPassport:root,cloudPassportStatus:status,cloudPassportAction:button}[id]||null),
    addEventListener:(name,fn)=>{(listeners[name]=listeners[name]||[]).push(fn)},
    dispatchEvent:event=>(listeners[event.type]||[]).forEach(fn=>fn(event))
  };
  function CustomEvent(type,init){this.type=type;this.detail=init&&init.detail}
  const w={document,localStorage:storage(),sessionStorage:storage(),CustomEvent,setTimeout,clearTimeout,console};
  w.window=w;w.ATHAR={};
  w.ATHAR_SUPABASE={url:'https://example.supabase.co',publishableKey:'sb_publishable_test'};
  w.supabase={createClient:()=>({
    auth:{getSession:async()=>({data:{session:{user:{id:'adult-test'}}}})},
    rpc:async(name,args)=>{calls.push({name,args:JSON.parse(JSON.stringify(args))});if(name==='get_child_cloud_passport')return{data:{state:null,missions:[],evidence:[],achievements:[]},error:null};return{data:{ok:true,conflict:false,revision:1},error:null}}
  })};
  w.sessionStorage.setItem('athar.activeChildProfile',profile);
  w.sessionStorage.setItem('athar.activeChildProfileLabel','Test Learner');
  vm.createContext(w);
  vm.runInContext(state,w,{filename:'state.js'});
  w.ATHAR.state.completeLesson('what-is-ai',5,false);
  w.ATHAR.state.awardPassport('skills','recognise-ai');
  w.ATHAR.state.awardBadge('first-trace');
  vm.runInContext(client,w,{filename:'cloud-passport-v13.js'});
  await w.ATHAR.cloudPassport.ready();
  ok(calls.filter(x=>x.name==='sync_child_learning_state').length===0,'Adapter must not upload local progress before explicit adult action');
  const actionButton=w.document.getElementById('cloudPassportAction');
  ok(!actionButton.hidden&&actionButton.dataset.mode==='connect','Explicit Cloud Passport connect action must be presented');
  actionButton.click();
  for(let i=0;i<40&&!calls.some(x=>x.name==='sync_child_learning_state');i++)await new Promise(r=>setTimeout(r,10));
  const sync=calls.find(x=>x.name==='sync_child_learning_state');
  ok(!!sync,'Explicit action must invoke synchronization');
  ok(sync.args.p_payload.local_import_version==='athar.progress.v1','Explicit import must carry the migration receipt');
  ok(sync.args.p_payload.missions.length===1&&sync.args.p_payload.achievements.some(x=>x.key==='what-is-ai:5'),'Payload must contain only bounded progress evidence');
  const serialized=JSON.stringify(sync.args.p_payload).toLowerCase();
  for(const forbidden of ['answer','prompt','conversation','transcript','email','phone'])ok(!serialized.includes(forbidden),`Runtime payload leaked forbidden token: ${forbidden}`);
  ok(w.localStorage.getItem('athar.activeChildProfile')===null,'Profile identifier must not be copied to localStorage');
}

dynamicChecks().then(()=>console.log(`Stage 9 Cloud Passport integrity: ${checks}/${checks} checks passed`)).catch(error=>{console.error(error);process.exitCode=1});
