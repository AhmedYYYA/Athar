/* ATHAR lesson age layer — keeps 7–9 concise and gives 10–12 optional depth. */
window.ATHAR=window.ATHAR||{};
ATHAR.lessonAge=(function(){
  var deeper={
    'what-is-ai':{en:'Different AI systems use different methods. Many learn patterns from data instead of following only hand-written rules.',ar:'تستخدم أنظمة الذكاء الاصطناعي طرقاً مختلفة. ويتعلم كثير منها أنماطاً من البيانات بدلاً من اتباع قواعد مكتوبة فقط.'},
    'patterns':{en:'A pattern can help make a prediction, but a pattern does not prove why something happened.',ar:'يمكن للنمط أن يساعد على التوقع، لكنه لا يثبت وحده سبب حدوث الشيء.'},
    'data':{en:'A dataset is a collection of examples. The quality and variety of those examples affect what a system can learn.',ar:'مجموعة البيانات هي مجموعة من الأمثلة. وتؤثر جودة هذه الأمثلة وتنوعها في ما يستطيع النظام تعلمه.'},
    'clear-asking':{en:'A clear instruction to an AI system is often called a prompt. A useful prompt can include the goal, context and the output you want.',ar:'تُسمى التعليمات الواضحة لنظام الذكاء الاصطناعي غالباً «موجهاً» أو Prompt. وقد تتضمن الهدف والسياق وشكل المخرج المطلوب.'},
    'details':{en:'Useful context reduces ambiguity. Extra details help only when they change what a good answer should look like.',ar:'يقلل السياق المفيد الغموض. وتفيد التفاصيل الإضافية فقط عندما تغيّر شكل الإجابة الجيدة المطلوبة.'},
    'refine':{en:'Iteration means checking a result, changing the instruction or approach, and trying again with a better reason.',ar:'يعني التكرار التحسيني فحص النتيجة، وتغيير التعليمات أو الأسلوب، ثم المحاولة مجدداً بصورة أفضل.'},
    'can-be-wrong':{en:'AI can produce an answer that sounds confident but is not supported by evidence. This is sometimes called a hallucination.',ar:'قد ينتج الذكاء الاصطناعي إجابة تبدو واثقة لكنها غير مدعومة بدليل. ويُسمى هذا أحياناً «هلوسة».'},
    'verify':{en:'Verification means checking a claim against evidence from sources that are suitable for that kind of claim.',ar:'يعني التحقق مقارنة الادعاء بدليل من مصادر مناسبة لنوع المعلومة التي نتحقق منها.'},
    'fairness':{en:'Bias can appear when data or design represents some people, places or situations better than others.',ar:'قد يظهر التحيز عندما تمثل البيانات أو طريقة التصميم بعض الأشخاص أو الأماكن أو الحالات أفضل من غيرها.'},
    'private':{en:'Personal data can identify you directly or indirectly. A safe habit is to share only what the task truly needs.',ar:'قد تحدد البيانات الشخصية هويتك بصورة مباشرة أو غير مباشرة. والعادة الآمنة هي مشاركة ما تحتاجه المهمة فقط.'},
    'not-human':{en:'AI can imitate conversational style, but sounding caring or friendly does not make it a person or a trusted relationship.',ar:'يمكن للذكاء الاصطناعي تقليد أسلوب المحادثة، لكن ظهوره بصورة ودودة أو مهتمة لا يجعله شخصاً أو علاقة موثوقة.'},
    'my-idea':{en:'Authorship is about who made meaningful creative choices, not only who typed the final words or clicked the final button.',ar:'ترتبط المؤلفية بمن اتخذ القرارات الإبداعية المهمة، وليس فقط بمن كتب الكلمات النهائية أو ضغط الزر الأخير.'},
    'credit':{en:'Attribution shows where ideas or material came from. Schools and subjects may use different citation rules.',ar:'يوضح نسب العمل مصدر الأفكار أو المواد. وقد تختلف قواعد التوثيق بين المدارس والمواد الدراسية.'},
    'steps':{en:'An algorithm is an ordered set of instructions for solving a task. Clear steps make a process easier to test and fix.',ar:'الخوارزمية هي مجموعة مرتبة من التعليمات لحل مهمة. وتجعل الخطوات الواضحة العملية أسهل في الاختبار والإصلاح.'},
    'rules':{en:'A condition checks whether something is true before deciding what action happens next. Programs often combine many conditions.',ar:'يفحص الشرط ما إذا كان شيء ما صحيحاً قبل تحديد الفعل التالي. وغالباً ما تجمع البرامج بين شروط متعددة.'},
    'loops':{en:'A loop repeats instructions until a count or stopping condition is reached. Good loops always have a clear way to stop.',ar:'تكرر الحلقة مجموعة من التعليمات حتى الوصول إلى عدد أو شرط توقف. ويجب أن تكون للحلقة الجيدة طريقة واضحة للتوقف.'}
  };
  function lang(){return document.documentElement.lang==='ar'?'ar':'en'}
  function T(en,ar){return lang()==='ar'?ar:en}
  function missionId(){try{return new URLSearchParams(location.search).get('m')||'what-is-ai'}catch(e){return'what-is-ai'}}
  function paintPill(){var p=document.getElementById('agePill');if(!p||!ATHAR.state)return;p.textContent=ATHAR.state.ageBand()==='10-12'?T('Ages 10–12','العمر 10–12'):T('Ages 7–9','العمر 7–9')}
  function refresh(){
    paintPill();var host=document.getElementById('deepDive');if(!host||!ATHAR.state)return;
    var band=ATHAR.state.ageBand(),copy=deeper[missionId()],stage=document.getElementById('stagebody');
    if(band!=='10-12'||!copy||!stage||stage.querySelector('.optiongrid,.sortpool,.trainpanel,.rewardwrap')){host.hidden=true;host.innerHTML='';return}
    host.hidden=false;host.innerHTML='<div class="deep-dive-card"><button type="button" class="deep-dive-toggle" aria-expanded="false"><span>'+T('Tell me more','أخبرني أكثر')+'</span><span aria-hidden="true">＋</span></button><div class="deep-dive-body" hidden>'+copy[lang()]+'</div></div>';
    var btn=host.querySelector('.deep-dive-toggle'),card=host.querySelector('.deep-dive-card'),body=host.querySelector('.deep-dive-body');
    btn.addEventListener('click',function(){var open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));body.hidden=open;card.classList.toggle('open',!open)});
  }
  function init(){
    var stage=document.getElementById('stagebody');if(stage){new MutationObserver(function(){refresh()}).observe(stage,{childList:true,subtree:true})}
    document.addEventListener('athar:language',refresh);document.addEventListener('athar:age-band',refresh);refresh();
  }
  return{init:init,refresh:refresh};
})();
ATHAR.lessonAge.init();
