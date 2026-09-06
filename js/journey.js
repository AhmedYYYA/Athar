/* ATHAR live child journey: curriculum + local progress + passports. */
window.ATHAR=window.ATHAR||{};
ATHAR.journey=(function(){
  var skillOrder=['recognise-ai','patterns','verification','examples','uncertainty','data-sources','data-relevance','label-quality','state-goal','useful-details','pick-output','relevant-details','safe-details','useful-limits','examine-result','compare-goal','refine-result','spot-ai-error','confidence-not-proof','pause-before-trust','choose-source','cross-check','use-evidence','spot-unfair-pattern','check-representation','human-review','spot-private-info','share-minimum','ask-before-sharing','tool-not-person','spot-secrecy-pressure','choose-human-help','lead-with-own-idea','direct-the-tool','describe-contribution','credit-sources','disclose-ai-help','avoid-copying','order-steps','break-down-task','debug-steps','spot-condition','choose-action','trace-rule','spot-repeat','use-loop','stop-loop'];
  var safetyOrder=['ai-is-tool','check-important','privacy','trusted-adult','no-secrets-with-ai'];
  var labels={
    'recognise-ai':{en:'Spot AI',ar:'أتعرف إلى الذكاء الاصطناعي'},
    'patterns':{en:'Find patterns',ar:'أكتشف الأنماط'},
    'verification':{en:'Check important answers',ar:'أتحقق من الإجابات المهمة'},
    'examples':{en:'Choose useful examples',ar:'أختار أمثلة مفيدة'},
    'uncertainty':{en:'Know when a guess needs more evidence',ar:'أعرف متى يحتاج التخمين إلى دليل أكثر'},
    'data-sources':{en:'Trace where examples come from',ar:'أتتبع مصدر الأمثلة'},
    'data-relevance':{en:'Choose examples that fit the task',ar:'أختار أمثلة تناسب المهمة'},
    'label-quality':{en:'Check labels and example quality',ar:'أتحقق من التسميات وجودة الأمثلة'},
    'state-goal':{en:'State a clear goal',ar:'أحدد هدفاً واضحاً'},
    'useful-details':{en:'Use helpful details',ar:'أستخدم تفاصيل مفيدة'},
    'pick-output':{en:'Pick a useful output',ar:'أختار مخرجاً مفيداً'},
    'relevant-details':{en:'Pick details that help',ar:'أختار تفاصيل تساعد المهمة'},
    'safe-details':{en:'Keep private details out',ar:'أبقي التفاصيل الخاصة خارجاً'},
    'useful-limits':{en:'Set useful limits',ar:'أضع حدوداً مفيدة'},
    'examine-result':{en:'Examine the result',ar:'أفحص النتيجة'},
    'compare-goal':{en:'Compare result with the goal',ar:'أقارن النتيجة بالهدف'},
    'refine-result':{en:'Refine and try again',ar:'أحسّن وأحاول من جديد'},
    'spot-ai-error':{en:'Spot when AI may be wrong',ar:'ألاحظ متى قد يخطئ الذكاء الاصطناعي'},
    'confidence-not-proof':{en:'Know confidence is not proof',ar:'أعرف أن الثقة ليست دليلاً'},
    'pause-before-trust':{en:'Pause before trusting important claims',ar:'أتوقف قبل الثقة بالمعلومات المهمة'},
    'choose-source':{en:'Choose a trustworthy source',ar:'أختار مصدراً موثوقاً'},
    'cross-check':{en:'Cross-check an important claim',ar:'أقارن المعلومة المهمة بمصدر آخر'},
    'use-evidence':{en:'Decide from evidence',ar:'أقرر بناءً على الدليل'},
    'spot-unfair-pattern':{en:'Spot a possible unfair pattern',ar:'ألاحظ نمطاً قد يكون غير منصف'},
    'check-representation':{en:'Check who and what was represented',ar:'أتحقق ممن وما تم تمثيله'},
    'human-review':{en:'Keep human review for important decisions',ar:'أبقي المراجعة البشرية للقرارات المهمة'},
    'spot-private-info':{en:'Spot private information',ar:'أميّز المعلومات الخاصة'},
    'share-minimum':{en:'Share only what the task needs',ar:'أشارك فقط ما تحتاجه المهمة'},
    'ask-before-sharing':{en:'Ask before sharing personal things',ar:'أسأل قبل مشاركة الأمور الشخصية'},
    'tool-not-person':{en:'Keep AI in its place as a tool',ar:'أبقي الذكاء الاصطناعي في مكانه كأداة'},
    'spot-secrecy-pressure':{en:'Spot secrecy or isolation pressure',ar:'ألاحظ ضغط السرية أو العزلة'},
    'choose-human-help':{en:'Choose human help when it matters',ar:'أختار المساعدة البشرية عندما يكون الأمر مهماً'},
    'lead-with-own-idea':{en:'Lead with my own idea',ar:'أقود بفكرتي الخاصة'},
    'direct-the-tool':{en:'Direct the tool with purpose',ar:'أوجّه الأداة بهدف واضح'},
    'describe-contribution':{en:'Describe who contributed what',ar:'أصف مساهمة كل طرف'},
    'credit-sources':{en:'Credit important sources',ar:'أنسب المصادر المهمة لأصحابها'},
    'disclose-ai-help':{en:'Describe AI help honestly',ar:'أصف مساعدة الذكاء الاصطناعي بصدق'},
    'avoid-copying':{en:'Do not present copied work as mine',ar:'لا أقدّم العمل المنقول على أنه عملي'},
    'order-steps':{en:'Put steps in the right order',ar:'أرتب الخطوات بالترتيب الصحيح'},
    'break-down-task':{en:'Break a goal into doable steps',ar:'أقسم الهدف إلى خطوات قابلة للتنفيذ'},
    'debug-steps':{en:'Find and fix a broken step',ar:'أجد الخطوة الخاطئة وأصلحها'},
    'spot-condition':{en:'Spot the condition in a rule',ar:'أميّز الشرط في القاعدة'},
    'choose-action':{en:'Choose the action that follows',ar:'أختار الإجراء الذي يتبع الشرط'},
    'trace-rule':{en:'Trace an if-then rule',ar:'أتتبع قاعدة إذا-فإن'},
    'spot-repeat':{en:'Spot repeated work',ar:'ألاحظ العمل المتكرر'},
    'use-loop':{en:'Use a loop for repetition',ar:'أستخدم التكرار للعمل المتكرر'},
    'stop-loop':{en:'Know how a loop stops',ar:'أعرف كيف يتوقف التكرار'},
    'ai-is-tool':{en:'AI is a tool, not a person',ar:'الذكاء الاصطناعي أداة وليس شخصاً'},
    'check-important':{en:'Check what matters',ar:'أتحقق مما يهم'},
    'privacy':{en:'Keep private things private',ar:'أحافظ على معلوماتي الخاصة'},
    'trusted-adult':{en:'Bring in a trusted adult when needed',ar:'أستعين بشخص بالغ موثوق عند الحاجة'},
    'no-secrets-with-ai':{en:'Do not keep secrets with AI',ar:'لا أحتفظ بأسرار مع الذكاء الاصطناعي'}
  };
  function lang(){return document.documentElement.lang==='ar'?'ar':'en'}
  function L(v){if(!v)return'';if(typeof v==='string')return v;return v[lang()]||v.en||''}
  function T(en,ar){return lang()==='ar'?ar:en}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function migratePassports(){
    if(ATHAR.state.isDone('what-is-ai')){
      ['recognise-ai','patterns','verification'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
      ['ai-is-tool','check-important','privacy'].forEach(function(id){ATHAR.state.awardPassport('safety',id)});
    }
    if(ATHAR.state.isDone('patterns'))['patterns','examples','uncertainty'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('data'))['data-sources','data-relevance','label-quality'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('clear-asking'))['state-goal','useful-details','pick-output'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('details'))['relevant-details','safe-details','useful-limits'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('refine'))['examine-result','compare-goal','refine-result'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('can-be-wrong'))['spot-ai-error','confidence-not-proof','pause-before-trust'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('verify'))['choose-source','cross-check','use-evidence'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('fairness'))['spot-unfair-pattern','check-representation','human-review'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('private')){
      ['spot-private-info','share-minimum','ask-before-sharing'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
      ['privacy','trusted-adult'].forEach(function(id){ATHAR.state.awardPassport('safety',id)});
    }
    if(ATHAR.state.isDone('not-human')){
      ['tool-not-person','spot-secrecy-pressure','choose-human-help'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
      ['ai-is-tool','trusted-adult','no-secrets-with-ai'].forEach(function(id){ATHAR.state.awardPassport('safety',id)});
    }
    if(ATHAR.state.isDone('my-idea'))['lead-with-own-idea','direct-the-tool','describe-contribution'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('credit'))['credit-sources','disclose-ai-help','avoid-copying'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('steps'))['order-steps','break-down-task','debug-steps'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('rules'))['spot-condition','choose-action','trace-rule'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
    if(ATHAR.state.isDone('loops'))['spot-repeat','use-loop','stop-loop'].forEach(function(id){ATHAR.state.awardPassport('skills',id)});
  }
  function readyLessons(){return ATHAR.curriculum.order().filter(function(x){return x.lesson.ready})}
  function isUnlocked(id){
    var ready=readyLessons(),i=ready.findIndex(function(x){return x.lesson.id===id});
    if(i<0)return false;if(i===0)return true;
    return ATHAR.state.isDone(ready[i-1].lesson.id);
  }
  function missionState(l){
    if(ATHAR.state.isDone(l.id))return'done';
    if(!l.ready)return'future';
    return isUnlocked(l.id)?'open':'locked';
  }
  function evidenceText(id){var r=ATHAR.state.lessonResult(id);if(!r)return'';return r.evidence==='supported'?T('Completed with support','أُكملت مع مساعدة'):T('Completed independently','أُكملت بشكل مستقل')}
  function renderStats(){
    var el=document.getElementById('journeyStats');if(!el)return;
    var s=ATHAR.state.all(),p=s.passports.skills.length+s.passports.safety.length;
    var vals=[[s.traces,T('traces','آثار')],[ATHAR.state.completedCount(),T('missions complete','مهام مكتملة')],[s.badges.length,T('badges','شارات')],[p,T('passport evidence','أدلة الجواز')]];
    el.innerHTML=vals.map(function(v){return'<span class="journey-stat glass-chip"><strong>'+v[0]+'</strong><small>'+v[1]+'</small></span>'}).join('')
  }
  function nextUp(){var ready=readyLessons();for(var i=0;i<ready.length;i++){var l=ready[i].lesson;if(!ATHAR.state.isDone(l.id)&&isUnlocked(l.id))return l}return null}
  function renderNext(){
    var el=document.getElementById('nextMission');if(!el)return;var l=nextUp();
    if(l){el.innerHTML='<div class="next-copy"><span class="next-label">'+T('NEXT TRACE','الأثر التالي')+'</span><h2>'+esc(L(l.name))+'</h2><p>'+T('Continue your journey. One short mission, one clear idea at a time.','تابع رحلتك. مهمة قصيرة وفكرة واضحة في كل مرة.')+'</p></div><a class="next-cta" href="lesson.html?m='+encodeURIComponent(l.id)+'">'+T('Start mission','ابدأ المهمة')+' <span aria-hidden="true">→</span></a>';el.classList.remove('all-done')}
    else{el.innerHTML='<div class="next-copy"><span class="next-label">'+T('FOUNDATION JOURNEY COMPLETE','اكتملت الرحلة التأسيسية')+'</span><h2>'+T('You completed all 16 ATHAR foundation missions.','أكملت مهام أثر التأسيسية الست عشرة.')+'</h2><p>'+T('Your traces, badges and Passport evidence show what you practised. You can replay any mission to strengthen the skill.','تُظهر آثارك وشاراتك وأدلة جوازك ما تدربت عليه. يمكنك إعادة أي مهمة لتقوية المهارة.')+'</p></div>';el.classList.add('all-done')}
  }
  function missionButton(l,state){if(state==='done')return'<a class="mission-action replay" href="lesson.html?m='+encodeURIComponent(l.id)+'">'+T('Replay','أعد المهمة')+'</a>';if(state==='open')return'<a class="mission-action start" href="lesson.html?m='+encodeURIComponent(l.id)+'">'+T('Start','ابدأ')+'</a>';if(state==='locked')return'<span class="mission-action locked">🔒 '+T('Finish the mission before it','أكمل المهمة السابقة')+'</span>';return'<span class="mission-action future">'+T('In development','قيد التطوير')+'</span>'}
  function missionMeta(l,state){if(state==='done')return'<span class="mission-evidence">✓ '+esc(evidenceText(l.id))+'</span>';if(state==='open')return'<span class="mission-evidence hot">'+l.traces+' '+T('traces to earn','آثار يمكنك كسبها')+'</span>';if(state==='locked')return'<span class="mission-evidence">'+T('Unlocks after the previous mission','تُفتح بعد المهمة السابقة')+'</span>';return'<span class="mission-evidence">'+T('Planned mission','مهمة مخططة')+'</span>'}
  function renderTracks(){
    var el=document.getElementById('trackList');if(!el)return;
    el.innerHTML=ATHAR.curriculum.tracks.map(function(track,ti){var complete=track.lessons.filter(function(l){return ATHAR.state.isDone(l.id)}).length;var available=track.lessons.filter(function(l){return l.ready}).length;var missions=track.lessons.map(function(l,li){var st=missionState(l);return'<div class="mission '+st+'"><div class="mission-index">'+String(li+1).padStart(2,'0')+'</div><div class="mission-copy"><h3>'+esc(L(l.name))+'</h3>'+missionMeta(l,st)+'</div>'+missionButton(l,st)+'</div>'}).join('');return'<article class="journey-track reveal in"><div class="journey-track-head"><div class="track-orb">'+String(ti+1).padStart(2,'0')+'</div><div><span class="track-progress">'+complete+'/'+track.lessons.length+' '+T('complete','مكتمل')+(available?' · '+available+' '+T('available','متاح'):'')+'</span><h2>'+esc(L(track.name))+'</h2><p>'+esc(L(track.blurb))+'</p></div></div><div class="mission-stack">'+missions+'</div></article>'}).join('')
  }
  function passportCard(kind,title,subtitle,order){var earned=ATHAR.state.passport(kind);var chips=order.map(function(id){var got=earned.indexOf(id)>=0;return'<li class="passport-item '+(got?'earned':'waiting')+'"><span class="passport-mark">'+(got?'✓':'○')+'</span><span>'+esc(L(labels[id]))+'</span></li>'}).join('');return'<article class="passport-card '+kind+'"><div class="passport-card-head"><span>'+T('ATHAR PASSPORT','جواز أثر')+'</span><strong>'+title+'</strong><p>'+subtitle+'</p></div><ul>'+chips+'</ul><div class="passport-count">'+earned.filter(function(id){return order.indexOf(id)>=0}).length+' / '+order.length+'</div></article>'}
  function renderPassports(){var el=document.getElementById('passportGrid');if(!el)return;el.innerHTML=passportCard('safety',T('Safety foundations','أساسيات السلامة'),T('Five habits that keep you in charge around AI.','خمس عادات تبقيك صاحب القرار عند استخدام الذكاء الاصطناعي.'),safetyOrder)+passportCard('skills',T('Skills evidence','أدلة المهارات'),T('Evidence appears when a mission shows what you can do.','يظهر الدليل عندما تُظهر المهمة ما تستطيع فعله.'),skillOrder)}
  function paintCompanion(){var c=ATHAR.state.companion();document.querySelectorAll('[data-companion]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.companion===c))})}
  function render(){migratePassports();renderStats();renderNext();renderTracks();renderPassports();paintCompanion()}
  function bind(){document.addEventListener('click',function(e){var b=e.target.closest('[data-companion]');if(!b)return;ATHAR.state.setCompanion(b.dataset.companion);paintCompanion()});document.addEventListener('athar:glass-language',render);window.addEventListener('pageshow',render)}
  function init(){bind();render()}
  return{init:init,render:render};
})();
ATHAR.journey.init();
