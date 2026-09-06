/* ATHAR live child journey: curriculum + local progress + passports. */
window.ATHAR=window.ATHAR||{};
ATHAR.journey=(function(){
  var skillOrder=['recognise-ai','patterns','verification','examples','uncertainty','data-sources','data-relevance','label-quality','state-goal','useful-details','pick-output','relevant-details','safe-details','useful-limits','examine-result','compare-goal','refine-result'];
  var safetyOrder=['ai-is-tool','check-important','privacy'];
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
    'ai-is-tool':{en:'AI is a tool, not a person',ar:'الذكاء الاصطناعي أداة وليس شخصاً'},
    'check-important':{en:'Check what matters',ar:'أتحقق مما يهم'},
    'privacy':{en:'Keep private things private',ar:'أحافظ على معلوماتي الخاصة'}
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
    var vals=[
      [s.traces,T('traces','آثار')],
      [ATHAR.state.completedCount(),T('missions complete','مهام مكتملة')],
      [s.badges.length,T('badges','شارات')],
      [p,T('passport evidence','أدلة الجواز')]
    ];
    el.innerHTML=vals.map(function(v){return'<span class="journey-stat glass-chip"><strong>'+v[0]+'</strong><small>'+v[1]+'</small></span>'}).join('')
  }
  function nextUp(){
    var ready=readyLessons();
    for(var i=0;i<ready.length;i++){var l=ready[i].lesson;if(!ATHAR.state.isDone(l.id)&&isUnlocked(l.id))return l}
    return null
  }
  function renderNext(){
    var el=document.getElementById('nextMission');if(!el)return;var l=nextUp();
    if(l){
      el.innerHTML='<div class="next-copy"><span class="next-label">'+T('NEXT TRACE','الأثر التالي')+'</span><h2>'+esc(L(l.name))+'</h2><p>'+T('Continue your journey. One short mission, one clear idea at a time.','تابع رحلتك. مهمة قصيرة وفكرة واضحة في كل مرة.')+'</p></div><a class="next-cta" href="lesson.html?m='+encodeURIComponent(l.id)+'">'+T('Start mission','ابدأ المهمة')+' <span aria-hidden="true">→</span></a>';
      el.classList.remove('all-done')
    }else{
      el.innerHTML='<div class="next-copy"><span class="next-label">'+T('YOUR TRAIL','مسارك')+'</span><h2>'+T('You completed every mission currently available.','أكملت كل المهام المتاحة حالياً.')+'</h2><p>'+T('Your traces and passport evidence stay here on this device. More missions are being prepared.','تبقى آثارك وأدلة جوازك هنا على هذا الجهاز. ويجري إعداد مهام إضافية.')+'</p></div>';
      el.classList.add('all-done')
    }
  }
  function missionButton(l,state){
    if(state==='done')return'<a class="mission-action replay" href="lesson.html?m='+encodeURIComponent(l.id)+'">'+T('Replay','أعد المهمة')+'</a>';
    if(state==='open')return'<a class="mission-action start" href="lesson.html?m='+encodeURIComponent(l.id)+'">'+T('Start','ابدأ')+'</a>';
    if(state==='locked')return'<span class="mission-action locked">🔒 '+T('Finish the mission before it','أكمل المهمة السابقة')+'</span>';
    return'<span class="mission-action future">'+T('In development','قيد التطوير')+'</span>'
  }
  function missionMeta(l,state){
    if(state==='done')return'<span class="mission-evidence">✓ '+esc(evidenceText(l.id))+'</span>';
    if(state==='open')return'<span class="mission-evidence hot">'+l.traces+' '+T('traces to earn','آثار يمكنك كسبها')+'</span>';
    if(state==='locked')return'<span class="mission-evidence">'+T('Unlocks after the previous mission','تُفتح بعد المهمة السابقة')+'</span>';
    return'<span class="mission-evidence">'+T('Planned mission','مهمة مخططة')+'</span>'
  }
  function renderTracks(){
    var el=document.getElementById('trackList');if(!el)return;
    el.innerHTML=ATHAR.curriculum.tracks.map(function(track,ti){
      var complete=track.lessons.filter(function(l){return ATHAR.state.isDone(l.id)}).length;
      var available=track.lessons.filter(function(l){return l.ready}).length;
      var missions=track.lessons.map(function(l,li){var st=missionState(l);return'<div class="mission '+st+'"><div class="mission-index">'+String(li+1).padStart(2,'0')+'</div><div class="mission-copy"><h3>'+esc(L(l.name))+'</h3>'+missionMeta(l,st)+'</div>'+missionButton(l,st)+'</div>'}).join('');
      return'<article class="journey-track reveal in"><div class="journey-track-head"><div class="track-orb">'+String(ti+1).padStart(2,'0')+'</div><div><span class="track-progress">'+complete+'/'+track.lessons.length+' '+T('complete','مكتمل')+(available? ' · '+available+' '+T('available','متاح'):'')+'</span><h2>'+esc(L(track.name))+'</h2><p>'+esc(L(track.blurb))+'</p></div></div><div class="mission-stack">'+missions+'</div></article>'
    }).join('')
  }
  function passportCard(kind,title,subtitle,order){
    var earned=ATHAR.state.passport(kind);
    var chips=order.map(function(id){var got=earned.indexOf(id)>=0;return'<li class="passport-item '+(got?'earned':'waiting')+'"><span class="passport-mark">'+(got?'✓':'○')+'</span><span>'+esc(L(labels[id]))+'</span></li>'}).join('');
    return'<article class="passport-card '+kind+'"><div class="passport-card-head"><span>'+T('ATHAR PASSPORT','جواز أثر')+'</span><strong>'+title+'</strong><p>'+subtitle+'</p></div><ul>'+chips+'</ul><div class="passport-count">'+earned.filter(function(id){return order.indexOf(id)>=0}).length+' / '+order.length+'</div></article>'
  }
  function renderPassports(){
    var el=document.getElementById('passportGrid');if(!el)return;
    el.innerHTML=passportCard('safety',T('Safety foundations','أساسيات السلامة'),T('The three rules that keep you in charge around AI.','ثلاث قواعد تبقيك صاحب القرار عند استخدام الذكاء الاصطناعي.'),safetyOrder)+passportCard('skills',T('Skills evidence','أدلة المهارات'),T('Evidence appears when a mission shows what you can do.','يظهر الدليل عندما تُظهر المهمة ما تستطيع فعله.'),skillOrder)
  }
  function paintCompanion(){var c=ATHAR.state.companion();document.querySelectorAll('[data-companion]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.companion===c))})}
  function render(){migratePassports();renderStats();renderNext();renderTracks();renderPassports();paintCompanion()}
  function bind(){
    document.addEventListener('click',function(e){var b=e.target.closest('[data-companion]');if(!b)return;ATHAR.state.setCompanion(b.dataset.companion);paintCompanion()});
    document.addEventListener('athar:glass-language',render);
    window.addEventListener('pageshow',render)
  }
  function init(){bind();render()}
  return{init:init,render:render};
})();
ATHAR.journey.init();
