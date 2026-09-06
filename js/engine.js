/* ATHAR generic mission engine — data-driven, bilingual, browser-local. */
window.ATHAR=window.ATHAR||{};
ATHAR.engine=(function(){
  var lesson,nodes,index=0,answers={},trainStep=0,hintUsed=false;
  var fallbackPassports={
    'what-is-ai':{skills:['recognise-ai','patterns','verification'],safety:['ai-is-tool','check-important','privacy']}
  };
  var passportLabels={
    'recognise-ai':{en:'Spot AI',ar:'أتعرف إلى الذكاء الاصطناعي'},
    'patterns':{en:'Find patterns',ar:'أكتشف الأنماط'},
    'verification':{en:'Check important answers',ar:'أتحقق من الإجابات المهمة'},
    'examples':{en:'Choose useful examples',ar:'أختار أمثلة مفيدة'},
    'uncertainty':{en:'Know when a guess is uncertain',ar:'أعرف متى يكون التخمين غير مؤكد'},
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
  function L(v){if(v==null)return'';if(typeof v==='string')return v;return v[ATHAR.i18n.lang()]||v.en||''}
  function icon(name){var m={eye:'👁️',pattern:'🧩',guess:'💭',tool:'🛠️',warning:'⚠️',lock:'🔐'};return m[name]||'✦'}
  function feedback(kind,text){nodes.feedback.innerHTML='<div class="feedback '+kind+'">'+text+'</div>';nodes.live.textContent=text.replace(/<[^>]*>/g,'')}
  function clearFeedback(){nodes.feedback.innerHTML='';nodes.live.textContent=''}
  function companionText(stage){
    if(!stage.companion)return'';
    var c=ATHAR.state.companion();if(c==='none')return'';
    var name=c==='hessa'?(ATHAR.i18n.lang()==='ar'?'حصه':'Hessa'):(ATHAR.i18n.lang()==='ar'?'حمدان':'Hamdan');
    var face=c==='hessa'?'assets/hessa-face.png':'assets/hamdan-face.png';
    return '<div class="feedback hint" style="margin-top:16px"><img src="'+face+'" alt=""><div><strong>'+name+'</strong><div>'+L(stage.companion)+'</div></div></div>'
  }
  function head(stage){return '<section class="stagehead"><span class="kicker">'+L(stage.kicker||{en:'Mission',ar:'مهمة'})+'</span><h2 class="stagetitle">'+L(stage.title)+'</h2>'+(stage.body?'<p class="stagebody">'+L(stage.body)+'</p>':'')+'</section>'}
  function renderTeach(stage){var ideas='';if(stage.ideas){ideas='<div class="idearow">'+stage.ideas.map(function(x){return '<div class="ideacard"><span class="ideaicon" aria-hidden="true">'+icon(x.icon)+'</span><span>'+L(x.label)+'</span></div>'}).join('')+'</div>'}return head(stage)+'<div class="stagework">'+ideas+companionText(stage)+'</div>'}
  function renderOptions(stage){answers={};var quote='';if(stage.quote){quote='<div class="quotecard"><p class="quote-q">'+L(stage.quote.q)+'</p><p class="quote-a">“'+L(stage.quote.a)+'”</p></div>'}var opts='<div class="optiongrid">'+stage.options.map(function(o){return '<button type="button" class="option" data-id="'+o.id+'" aria-pressed="false"><span class="optionbox"></span><span>'+L(o.label)+'</span></button>'}).join('')+'</div>';return head(stage)+'<div class="stagework">'+quote+opts+'</div>'}
  function renderSort(stage){answers={};var cards='<div class="sortpool">'+stage.items.map(function(it){return '<div class="sortcard" tabindex="0" role="button" data-item="'+it.id+'"><span>'+L(it.label)+'</span><div class="sortpick">'+stage.buckets.map(function(b){return '<button type="button" class="sortopt" data-item="'+it.id+'" data-bucket="'+b.id+'">'+L(b.label)+'</button>'}).join('')+'</div></div>'}).join('')+'</div>';var buckets='<div class="bucketrow">'+stage.buckets.map(function(b){return '<div class="bucket"><div class="bucketname">'+L(b.label)+'</div><div class="bucketdrop" data-drop="'+b.id+'"></div></div>'}).join('')+'</div>';return head(stage)+'<div class="stagework">'+cards+buckets+'</div>'}
  function renderTrain(stage){var s=stage.steps[trainStep];return head(stage)+'<div class="stagework"><div class="trainpanel"><div class="meterwrap"><p class="meterlabel">'+L(s.label)+'</p><div class="meter"><div class="meterfill '+(s.confidence>80?'high':s.confidence>40?'mid':'')+'" style="width:'+s.confidence+'%"></div></div></div><p class="trainguess">'+L(s.guess)+'</p><button type="button" class="btn btn-primary trainbtn" '+(trainStep>=stage.steps.length-1?'hidden':'')+'>'+(ATHAR.i18n.lang()==='ar'?'أضف مثالاً':'Add an example')+'</button></div>'+(trainStep>=stage.steps.length-1?'<div class="feedback ok" style="margin-top:16px">'+L(stage.after)+'</div>'+companionText(stage):'')+'</div>'}
  function lessonPassport(){return lesson.passport||fallbackPassports[lesson.id]||{skills:[],safety:[]}}
  function awardPassports(){var p=lessonPassport();(p.skills||[]).forEach(function(id){ATHAR.state.awardPassport('skills',id)});(p.safety||[]).forEach(function(id){ATHAR.state.awardPassport('safety',id)})}
  function passportReward(){
    var p=lessonPassport(),all=(p.skills||[]).map(function(id){return{kind:'skill',id:id}}).concat((p.safety||[]).map(function(id){return{kind:'safe',id:id}}));
    if(!all.length)return'';
    var title=ATHAR.i18n.lang()==='ar'?'أضيف إلى جوازك':'Added to your passport';
    return '<div class="passport-earned"><strong>'+title+'</strong><div class="passport-earned-row">'+all.map(function(x){var v=passportLabels[x.id]||{en:x.id,ar:x.id};return '<span class="passport-earned-chip '+x.kind+'">'+L(v)+'</span>'}).join('')+'</div></div>'
  }
  function renderCelebrate(stage){
    ATHAR.state.completeLesson(lesson.id,lesson.traces,hintUsed);
    if(lesson.badge)ATHAR.state.awardBadge(lesson.badge.id);
    awardPassports();
    var marks='';for(var i=0;i<lesson.traces;i++)marks+='<span class="tracemark" style="animation-delay:'+(i*.06)+'s"></span>';
    var badge=lesson.badge?'<div class="badgecard"><span class="badgelabel">'+(ATHAR.i18n.lang()==='ar'?'شارة جديدة':'New badge')+'</span><strong class="badgename">'+L(lesson.badge.name)+'</strong><span class="badgeline">'+L(lesson.badge.line)+'</span></div>':'';
    return head(stage)+'<div class="stagework rewardwrap"><div class="tracerow">'+marks+'</div><p class="rewardcount">'+lesson.traces+' '+(ATHAR.i18n.lang()==='ar'?'آثار':'traces')+'</p>'+badge+passportReward()+'<p class="evidencenote">'+(hintUsed?(ATHAR.i18n.lang()==='ar'?'أكملت المهمة مع بعض المساعدة.':'Mission completed with some support.'):(ATHAR.i18n.lang()==='ar'?'أكملت المهمة بشكل مستقل.':'Mission completed independently.'))+'</p></div>'
  }
  function render(){
    clearFeedback();var stage=lesson.stages[index];nodes.heading.textContent=L(stage.title);nodes.step.textContent=ATHAR.i18n.t('lesson.of',{n:index+1,total:lesson.stages.length});nodes.bar.setAttribute('aria-valuemax',String(lesson.stages.length));nodes.bar.setAttribute('aria-valuenow',String(index+1));nodes.dots.innerHTML=lesson.stages.map(function(_,i){return '<span class="pdot '+(i<index?'done':i===index?'now':'')+'"></span>'}).join('');
    if(stage.type==='teach')nodes.body.innerHTML=renderTeach(stage);else if(stage.type==='multi'||stage.type==='choice')nodes.body.innerHTML=renderOptions(stage);else if(stage.type==='sort')nodes.body.innerHTML=renderSort(stage);else if(stage.type==='train')nodes.body.innerHTML=renderTrain(stage);else if(stage.type==='celebrate')nodes.body.innerHTML=renderCelebrate(stage);else nodes.body.innerHTML=head(stage)+'<div class="stagework"></div>';
    nodes.back.disabled=index===0;nodes.hint.hidden=!stage.hint;nodes.check.hidden=!(stage.type==='multi'||stage.type==='choice'||stage.type==='sort');nodes.next.hidden=false;nodes.next.disabled=(stage.type==='multi'||stage.type==='choice'||stage.type==='sort'||(stage.type==='train'&&trainStep<stage.steps.length-1));nodes.next.textContent=stage.type==='celebrate'?(ATHAR.i18n.lang()==='ar'?'العودة إلى الرحلة':'Back to journey'):ATHAR.i18n.t('cta.next');
    wireStage(stage);nodes.stagewrap.classList.remove('enter');void nodes.stagewrap.offsetWidth;nodes.stagewrap.classList.add('enter');try{nodes.stagewrap.focus({preventScroll:true})}catch(e){nodes.stagewrap.focus()}
  }
  function wireStage(stage){
    nodes.body.querySelectorAll('.option').forEach(function(b){b.addEventListener('click',function(){var id=b.dataset.id;answers[id]=!answers[id];b.classList.toggle('picked',answers[id]);b.setAttribute('aria-pressed',String(!!answers[id]))})});
    nodes.body.querySelectorAll('.sortcard').forEach(function(c){function open(){c.classList.toggle('open')}c.addEventListener('click',function(e){if(!e.target.closest('.sortopt'))open()});c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
    nodes.body.querySelectorAll('.sortopt').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();var id=b.dataset.item,bucket=b.dataset.bucket;answers[id]=bucket;var card=nodes.body.querySelector('[data-item="'+id+'"].sortcard');card.classList.remove('open');card.classList.add('assigned');var drop=nodes.body.querySelector('[data-drop="'+bucket+'"]');drop.appendChild(card)})});
    var train=nodes.body.querySelector('.trainbtn');if(train)train.addEventListener('click',function(){trainStep=Math.min(trainStep+1,stage.steps.length-1);render()})
  }
  function correctInteractive(stage){if(stage.type==='sort')return stage.items.every(function(it){return answers[it.id]===it.bucket});return stage.options.every(function(o){return !!answers[o.id]===!!o.correct})}
  function check(){var stage=lesson.stages[index];if(!correctInteractive(stage)){feedback('no',ATHAR.i18n.lang()==='ar'?'جرّب مرة أخرى. فكّر في السبب، وليس فقط الإجابة.':'Try again. Think about why, not only the answer.');return}nodes.body.querySelectorAll('.option').forEach(function(b){var o=stage.options.find(function(x){return x.id===b.dataset.id});if(o.correct)b.classList.add('right')});nodes.body.querySelectorAll('.sortcard').forEach(function(c){c.classList.add('right')});feedback('ok',L(stage.after)||(ATHAR.i18n.lang()==='ar'?'أحسنت!':'Nice work!'));nodes.check.hidden=true;nodes.hint.hidden=true;nodes.next.disabled=false}
  function hint(){var stage=lesson.stages[index];if(!stage.hint)return;hintUsed=true;ATHAR.state.markSupport(lesson.id+':'+index);feedback('hint',L(stage.hint))}
  function next(){var stage=lesson.stages[index];if(stage.type==='celebrate'){location.href='learn.html#progress';return}if(index<lesson.stages.length-1){index++;answers={};trainStep=0;render()}}
  function back(){if(index>0){index--;answers={};trainStep=0;render()}}
  function start(id,n){
    nodes=n;lesson=ATHAR.lessons&&ATHAR.lessons[id];
    if(!lesson){nodes.body.innerHTML='<section class="stagehead"><h2 class="stagetitle">'+(ATHAR.i18n.lang()==='ar'?'هذه المهمة غير متاحة بعد.':'This mission is not available yet.')+'</h2></section><div class="stagework"><a class="btn btn-primary" href="learn.html">'+(ATHAR.i18n.lang()==='ar'?'العودة إلى الرحلة':'Back to journey')+'</a></div>';nodes.next.hidden=true;nodes.back.hidden=true;nodes.check.hidden=true;nodes.hint.hidden=true;return}
    ATHAR.state.setLastMission(id);index=0;hintUsed=false;answers={};trainStep=0;
    nodes.next.onclick=next;nodes.back.onclick=back;nodes.check.onclick=check;nodes.hint.onclick=hint;
    document.addEventListener('athar:language',render);ATHAR.i18n.apply();render()
  }
  return{start:start};
})();