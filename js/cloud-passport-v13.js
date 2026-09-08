/* ATHAR Stage 9 Cloud Passport.
   Only bounded learning evidence is synchronized. Raw answers, prompts,
   conversations and profile identifiers are never copied into localStorage. */
window.ATHAR=window.ATHAR||{};
ATHAR.cloudPassport=(function(){
  var CONTRACT='foundation-v3';
  var LOCAL_IMPORT='athar.progress.v1';
  var PROFILE_KEY='athar.activeChildProfile';
  var BOUND_KEY='athar.cloudPassport.bound';
  var missionIds=['what-is-ai','patterns','data','clear-asking','details','refine','can-be-wrong','verify','fairness','private','not-human','my-idea','credit','steps','rules','loops'];
  var skillKeys=['recognise-ai','patterns','verification','examples','uncertainty','data-sources','data-relevance','label-quality','state-goal','useful-details','pick-output','relevant-details','safe-details','useful-limits','examine-result','compare-goal','refine-result','spot-ai-error','confidence-not-proof','pause-before-trust','choose-source','cross-check','use-evidence','spot-unfair-pattern','check-representation','human-review','spot-private-info','share-minimum','ask-before-sharing','tool-not-person','spot-secrecy-pressure','choose-human-help','lead-with-own-idea','direct-the-tool','describe-contribution','credit-sources','disclose-ai-help','avoid-copying','order-steps','break-down-task','debug-steps','spot-condition','choose-action','trace-rule','spot-repeat','use-loop','stop-loop'];
  var safetyKeys=['ai-is-tool','check-important','privacy','trusted-adult','no-secrets-with-ai'];
  var badgeKeys=['first-trace','pattern-spotter','example-detective','clear-communicator','detail-designer','result-refiner','mistake-catcher','fact-checker','fairness-checker','privacy-guardian','boundary-keeper','idea-leader','credit-keeper','step-builder','rule-builder','loop-thinker'];
  var evidenceByMission={
    'what-is-ai':{skills:['recognise-ai','patterns','verification'],safety:['ai-is-tool','check-important','privacy']},
    'patterns':{skills:['patterns','examples','uncertainty'],safety:[]},
    'data':{skills:['data-sources','data-relevance','label-quality'],safety:[]},
    'clear-asking':{skills:['state-goal','useful-details','pick-output'],safety:[]},
    'details':{skills:['relevant-details','safe-details','useful-limits'],safety:[]},
    'refine':{skills:['examine-result','compare-goal','refine-result'],safety:[]},
    'can-be-wrong':{skills:['spot-ai-error','confidence-not-proof','pause-before-trust'],safety:[]},
    'verify':{skills:['choose-source','cross-check','use-evidence'],safety:[]},
    'fairness':{skills:['spot-unfair-pattern','check-representation','human-review'],safety:[]},
    'private':{skills:['spot-private-info','share-minimum','ask-before-sharing'],safety:['privacy','trusted-adult']},
    'not-human':{skills:['tool-not-person','spot-secrecy-pressure','choose-human-help'],safety:['ai-is-tool','trusted-adult','no-secrets-with-ai']},
    'my-idea':{skills:['lead-with-own-idea','direct-the-tool','describe-contribution'],safety:[]},
    'credit':{skills:['credit-sources','disclose-ai-help','avoid-copying'],safety:[]},
    'steps':{skills:['order-steps','break-down-task','debug-steps'],safety:[]},
    'rules':{skills:['spot-condition','choose-action','trace-rule'],safety:[]},
    'loops':{skills:['spot-repeat','use-loop','stop-loop'],safety:[]}
  };
  var clientInstance=null,profileId=null,revision=null,bound=false,guarding=false,timer=null,lastBundle=null,lastStatus=null;

  function lang(){return document.documentElement.lang==='ar'?'ar':'en'}
  function copy(v){return JSON.parse(JSON.stringify(v))}
  function allowed(list,v){return list.indexOf(v)>=0}
  function evidenceRank(v){return v==='independent'?2:v==='supported'?1:0}
  function stronger(a,b){return evidenceRank(b)>evidenceRank(a)?b:a}
  function validProfileId(v){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v||'')}
  function activeProfile(){try{var v=sessionStorage.getItem(PROFILE_KEY)||'';return validProfileId(v)?v:null}catch(e){return null}}
  function profileLabel(){try{return (sessionStorage.getItem('athar.activeChildProfileLabel')||'').slice(0,40)}catch(e){return''}}
  function profileAge(){try{return sessionStorage.getItem('athar.activeChildProfileAge')==='10-12'?'10-12':'7-9'}catch(e){return'7-9'}}
  function sessionBound(){try{return sessionStorage.getItem(BOUND_KEY)===profileId}catch(e){return false}}
  function markBound(){try{sessionStorage.setItem(BOUND_KEY,profileId)}catch(e){}}
  function within(promise,ms){
    var id;
    var limit=new Promise(function(_,reject){id=setTimeout(function(){reject(new Error('cloud_timeout'))},ms||8000)});
    return Promise.race([promise,limit]).finally(function(){clearTimeout(id)});
  }
  function ensureProvider(){
    if(window.supabase)return Promise.resolve();
    return new Promise(function(resolve,reject){
      var existing=document.querySelector('script[data-athar-supabase]');
      var script=existing||document.createElement('script');
      var done=false;
      function finish(error){if(done)return;done=true;clearTimeout(timeout);if(error||!window.supabase)reject(error||new Error('backend_unavailable'));else resolve()}
      script.addEventListener('load',function(){finish()},{once:true});
      script.addEventListener('error',function(){finish(new Error('backend_unavailable'))},{once:true});
      if(!existing){script.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';script.dataset.atharSupabase='true';script.crossOrigin='anonymous';document.head.appendChild(script)}
      var timeout=setTimeout(function(){finish(new Error('backend_timeout'))},8000);
    });
  }

  function client(){
    if(clientInstance)return clientInstance;
    if(!window.supabase||!window.ATHAR_SUPABASE)return null;
    clientInstance=window.supabase.createClient(
      window.ATHAR_SUPABASE.url,
      window.ATHAR_SUPABASE.publishableKey,
      {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}
    );
    return clientInstance;
  }

  function ui(){return{
    root:document.getElementById('cloudPassport'),
    status:document.getElementById('cloudPassportStatus'),
    action:document.getElementById('cloudPassportAction')
  }}
  function setStatus(kind,en,ar,action){
    lastStatus={kind:kind,en:en,ar:ar,action:action||null};
    var n=ui();if(!n.root)return;
    n.root.dataset.cloudState=kind;
    n.status.textContent=lang()==='ar'?ar:en;
    if(action){n.action.hidden=false;n.action.disabled=false;n.action.dataset.mode=action.mode;n.action.textContent=lang()==='ar'?action.ar:action.en}
    else{n.action.hidden=true;n.action.disabled=false;n.action.removeAttribute('data-mode')}
  }
  function checking(){setStatus('checking','Checking this device and account…','جارٍ التحقق من هذا الجهاز والحساب…')}
  function connectedCopy(syncing){
    var label=profileLabel();
    if(syncing)setStatus('syncing',label?'Saving bounded progress for '+label+'…':'Saving bounded progress…',label?'جارٍ حفظ التقدم المحدود لـ '+label+'…':'جارٍ حفظ التقدم المحدود…');
    else setStatus('connected',label?'Cloud Passport connected to '+label+'.':'Cloud Passport connected.','تم ربط جواز أثر بـ '+(label||'ملف الطفل')+'.');
  }
  function needsBindingCopy(){
    var label=profileLabel(),hasLocal=meaningful(ATHAR.state.all()),hasCloud=meaningful(fromCloud(lastBundle||{}));
    var en=hasLocal&&hasCloud?'Review and merge this device progress with '+(label||'the selected profile')+'.':hasLocal?'Choose whether this device progress belongs to '+(label||'the selected profile')+'.':'Start a Cloud Passport for '+(label||'the selected profile')+'.';
    var ar=hasLocal&&hasCloud?'راجع وادمج تقدم هذا الجهاز مع '+(label||'الملف المحدد')+'.':hasLocal?'اختر ما إذا كان تقدم هذا الجهاز يعود إلى '+(label||'الملف المحدد')+'.':'ابدأ جواز أثر لـ '+(label||'الملف المحدد')+'.';
    setStatus('needs-binding',en,ar,{mode:'connect',en:hasLocal||hasCloud?'Review and connect':'Start Cloud Passport',ar:hasLocal||hasCloud?'مراجعة وربط':'بدء جواز أثر'});
  }

  function meaningful(s){
    s=s||{};
    return Number(s.traces||0)>0||Object.keys(s.completed||{}).length>0||(s.badges||[]).length>0||((s.passports||{}).skills||[]).length>0||((s.passports||{}).safety||[]).length>0;
  }
  function sourceFor(kind,key,completed){
    var best=null,bestState='not_yet';
    missionIds.forEach(function(id){
      var keys=(evidenceByMission[id]&&evidenceByMission[id][kind])||[];
      var result=completed[id];
      if(keys.indexOf(key)>=0&&result){var state=result.evidence==='independent'?'independent':'supported';if(evidenceRank(state)>evidenceRank(bestState)){best=id;bestState=state}}
    });
    return{mission:best,state:bestState==='not_yet'?'supported':bestState};
  }
  function buildPayload(importing){
    var s=ATHAR.state.all(),missions=[],evidence=[],achievements=[];
    missionIds.forEach(function(id){
      var result=s.completed&&s.completed[id];if(!result)return;
      var ev=result.evidence==='independent'||result.supported===false?'independent':'supported';
      missions.push({mission_id:id,completed:true,evidence:ev});
      for(var i=1;i<=5;i++)achievements.push({type:'trace',key:id+':'+i});
    });
    ['skills','safety'].forEach(function(kind){
      var list=(s.passports&&s.passports[kind])||[],contract=kind==='skills'?skillKeys:safetyKeys;
      contract.forEach(function(key){if(list.indexOf(key)<0)return;var source=sourceFor(kind,key,s.completed||{});evidence.push({passport:kind,evidence_key:key,state:source.state,source_mission_id:source.mission})});
    });
    badgeKeys.forEach(function(key){if((s.badges||[]).indexOf(key)>=0)achievements.push({type:'badge',key:key})});
    var payload={
      curriculum_version:CONTRACT,
      selected_companion:allowed(['hamdan','hessa','none'],s.companion)?s.companion:'none',
      active_mission_id:allowed(missionIds,s.lastMission)?s.lastMission:null,
      missions:missions,
      evidence:evidence,
      achievements:achievements
    };
    if(importing||bound)payload.local_import_version=LOCAL_IMPORT;
    return payload;
  }
  function fromCloud(bundle){
    bundle=bundle||{};var state=bundle.state||{},completed={},badges=[],passports={skills:[],safety:[]},traceSet={};
    (bundle.missions||[]).forEach(function(row){if(!allowed(missionIds,row.mission_id)||!row.completed)return;var ev=row.evidence==='independent'?'independent':'supported';completed[row.mission_id]={supported:ev==='supported',evidence:ev}});
    (bundle.evidence||[]).forEach(function(row){var list=row.passport==='safety'?safetyKeys:row.passport==='skills'?skillKeys:null;if(list&&allowed(list,row.evidence_key)&&passports[row.passport].indexOf(row.evidence_key)<0)passports[row.passport].push(row.evidence_key)});
    (bundle.achievements||[]).forEach(function(row){if(row.achievement_type==='badge'&&allowed(badgeKeys,row.achievement_key)&&badges.indexOf(row.achievement_key)<0)badges.push(row.achievement_key);if(row.achievement_type==='trace'&&new RegExp('^('+missionIds.join('|')+'):[1-5]$').test(row.achievement_key))traceSet[row.achievement_key]=true});
    return{
      traces:Object.keys(traceSet).length,
      completed:completed,
      badges:badges,
      passports:passports,
      companion:allowed(['hamdan','hessa','none'],state.selected_companion)?state.selected_companion:'none',
      ageBand:profileAge(),
      lastMission:allowed(missionIds,state.active_mission_id)?state.active_mission_id:null
    };
  }

  async function fetchCloud(){
    var c=client();if(!c||!profileId)throw new Error('cloud_unavailable');
    var response=await within(c.rpc('get_child_cloud_passport',{p_child_profile_id:profileId}),8000);
    if(response.error)throw response.error;
    return response.data||{state:null,missions:[],evidence:[],achievements:[]};
  }
  async function send(expected,importing){
    var c=client(),response=await within(c.rpc('sync_child_learning_state',{p_child_profile_id:profileId,p_payload:buildPayload(importing),p_expected_revision:expected}),8000);
    if(response.error)throw response.error;
    return response.data||{};
  }
  async function resolveConflict(importing){
    var latest=await fetchCloud();lastBundle=latest;guarding=true;try{ATHAR.state.mergeBounded(fromCloud(latest))}finally{guarding=false}
    var expected=latest.state?Number(latest.state.revision):0;
    var result=await send(expected,importing);
    if(result.conflict)throw new Error('repeated_conflict');
    return result;
  }
  async function syncNow(importing){
    if(!bound&&!importing)return null;
    connectedCopy(true);
    var result=await send(revision,!!importing);
    if(result.conflict)result=await resolveConflict(!!importing);
    revision=Number(result.revision);
    bound=true;markBound();connectedCopy(false);
    return result;
  }
  async function connectExplicitly(){
    var n=ui();if(n.action){n.action.disabled=true;n.action.setAttribute('aria-busy','true')}
    try{
      lastBundle=await fetchCloud();
      guarding=true;
      try{if(meaningful(fromCloud(lastBundle)))ATHAR.state.mergeBounded(fromCloud(lastBundle));if(!meaningful(ATHAR.state.all()))ATHAR.state.replaceBounded(fromCloud(lastBundle))}finally{guarding=false}
      revision=lastBundle.state?Number(lastBundle.state.revision):0;
      await syncNow(true);
    }catch(e){setStatus('error','Progress is still safe on this device. Cloud connection did not complete.','ما زال التقدم محفوظاً على هذا الجهاز. لم يكتمل الربط السحابي.',{mode:'connect',en:'Try again',ar:'حاول مرة أخرى'})}
    finally{if(n.action){n.action.disabled=false;n.action.removeAttribute('aria-busy')}}
  }
  function queueSync(){
    if(!bound||guarding)return;
    clearTimeout(timer);timer=setTimeout(function(){syncNow(false).catch(function(){setStatus('error','Saved on this device; cloud sync needs a retry.','تم الحفظ على هذا الجهاز؛ تحتاج المزامنة السحابية إلى إعادة المحاولة.',{mode:'retry',en:'Retry sync',ar:'إعادة المزامنة'})})},450);
  }
  async function init(){
    checking();profileId=activeProfile();
    if(!profileId){setStatus('select','Progress stays on this device. Choose an authorized child profile from the adult account to connect it.','يبقى التقدم على هذا الجهاز. اختر ملف طفل مصرحاً به من حساب البالغ لربطه.');return}
    var c;
    try{await ensureProvider();c=client()}catch(e){setStatus('local','Device-only progress. Cloud services are unavailable.','التقدم محفوظ على هذا الجهاز فقط. الخدمات السحابية غير متاحة.');return}
    if(!c){setStatus('local','Device-only progress. Cloud services are unavailable.','التقدم محفوظ على هذا الجهاز فقط. الخدمات السحابية غير متاحة.');return}
    var sessionResponse;
    try{sessionResponse=await within(c.auth.getSession(),8000)}catch(e){setStatus('local','Device-only progress. Sign in as an adult to use Cloud Passport.','التقدم محفوظ على هذا الجهاز فقط. سجّل الدخول كبالغ لاستخدام جواز أثر.');return}
    if(!sessionResponse.data||!sessionResponse.data.session){setStatus('local','Device-only progress. Sign in as an adult to use Cloud Passport.','التقدم محفوظ على هذا الجهاز فقط. سجّل الدخول كبالغ لاستخدام جواز أثر.');return}
    try{
      lastBundle=await fetchCloud();revision=lastBundle.state?Number(lastBundle.state.revision):0;
      if(lastBundle.state&&lastBundle.state.local_import_version===LOCAL_IMPORT){
        guarding=true;try{ATHAR.state.replaceBounded(fromCloud(lastBundle))}finally{guarding=false}
        bound=true;markBound();connectedCopy(false);
      }else if(sessionBound()&&lastBundle.state){
        guarding=true;try{ATHAR.state.replaceBounded(fromCloud(lastBundle))}finally{guarding=false}
        bound=true;connectedCopy(false);
      }else needsBindingCopy();
    }catch(e){setStatus('error','Progress is safe on this device. Cloud Passport could not be loaded.','التقدم محفوظ على هذا الجهاز. تعذر تحميل جواز أثر السحابي.',{mode:'retry-load',en:'Retry',ar:'إعادة المحاولة'})}
  }
  function bind(){
    document.addEventListener('athar:state-change',queueSync);
    document.addEventListener('athar:glass-language',function(){if(lastStatus)setStatus(lastStatus.kind,lastStatus.en,lastStatus.ar,lastStatus.action)});
    document.addEventListener('click',function(e){var button=e.target.closest('#cloudPassportAction');if(!button)return;if(button.dataset.mode==='connect')connectExplicitly();else if(button.dataset.mode==='retry')syncNow(false).catch(function(){});else if(button.dataset.mode==='retry-load')readyPromise=init()});
  }
  bind();
  var readyPromise=init();
  return{
    ready:function(){return readyPromise},
    mustWait:function(){return !!profileId},
    syncNow:function(){return syncNow(false)},
    _test:{buildPayload:buildPayload,fromCloud:fromCloud,meaningful:meaningful,missionIds:copy(missionIds),skillKeys:copy(skillKeys),safetyKeys:copy(safetyKeys),badgeKeys:copy(badgeKeys)}
  };
})();
