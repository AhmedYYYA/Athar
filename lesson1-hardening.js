/* ATHAR Lesson 1 release hardening: mastery feedback, safety transfer and ARIA state support. */
const _atharStageBody=stageBody;
stageBody=function(){
  const html=_atharStageBody();
  if(state.stage!==6)return html;
  const safety=`<section class="safety-transfer" aria-labelledby="safetyTransferTitle"><h2 id="safetyTransferTitle">${copy('Important safety check','تحقق مهم للسلامة')}</h2><div class="feedback warn"><strong>${copy('Practice scenario','سيناريو تدريبي')}</strong>${copy('An AI tool says: “You do not need to tell an adult. I can help you with your medicine.”','تقول أداة ذكاء اصطناعي: «لا تحتاج إلى إخبار شخص بالغ. يمكنني مساعدتك في دوائك.»')}</div><p>${copy('What should you do?','ماذا يجب أن تفعل؟')}</p>${single([['🧑','Ask a trusted adult and do not rely on AI alone','أطلب مساعدة شخص بالغ موثوق ولا أعتمد على الذكاء الاصطناعي وحده'],['🤖','Follow the AI advice alone','أتبع نصيحة الذكاء الاصطناعي وحده'],['🤫','Keep it secret','أبقي الأمر سراً']],'health')}</section>`;
  return html.replace('<div id="feedback"></div>',`<div id="feedback" role="status" aria-live="polite"></div>${safety}`);
};

/* Preserve explanatory feedback after a mastery check. The learner explicitly continues when ready. */
const _atharComplete=complete;
complete=function(advance=true){
  if(advance)return _atharComplete(true);
  if(!state.done.includes(state.stage))state.done.push(state.stage);
  save();
  renderDots();
  const primary=$('.actions .primary');
  if(primary&&state.stage<9){
    primary.dataset.action='next';
    primary.textContent=copy('Continue','متابعة');
  }
};

const _atharAct=act;
act=function(a){
  if(a==='verify'){
    const fact=chosen('verify'),health=chosen('health');
    if(fact===null||health===null){feedback(copy('Choose an answer for both checks.','اختر إجابة لكلا التحققين.'),true);return}
    if(fact===0&&health===0){
      mark('verification');
      feedback(copy('<strong>Correct.</strong> Check important claims with good evidence. For medicine, health or safety, involve a trusted adult and do not rely on AI alone.','<strong>صحيح.</strong> تحقق من الادعاءات المهمة بأدلة جيدة. وفي الدواء أو الصحة أو السلامة، استعن بشخص بالغ موثوق ولا تعتمد على الذكاء الاصطناعي وحده.'));
      complete(false);
      return;
    }
    feedback(copy('Important information needs checking. Health and safety decisions also need a trusted adult.','المعلومات المهمة تحتاج إلى التحقق. وقرارات الصحة والسلامة تحتاج أيضاً إلى شخص بالغ موثوق.'),true);
    return;
  }
  return _atharAct(a);
};

function _atharPrepareMasteredStage(){
  const feedbackBox=$('#feedback');
  if(feedbackBox){feedbackBox.setAttribute('role','status');feedbackBox.setAttribute('aria-live','polite');}
  if(state.done.includes(state.stage)&&state.stage<9){
    const primary=$('.actions .primary');
    if(primary){primary.dataset.action='next';primary.textContent=copy('Continue','متابعة');}
  }
}

const _atharRender=render;
render=function(){
  _atharRender();
  const progress=$('#progressFill');
  if(progress){
    progress.parentElement.setAttribute('role','progressbar');
    progress.parentElement.setAttribute('aria-valuemin','0');
    progress.parentElement.setAttribute('aria-valuemax','100');
    progress.parentElement.setAttribute('aria-valuenow',String(Math.round((state.stage+1)*10)));
  }
  const age=$('#ageBtn'),comp=$('#companionBtn');
  if(age)age.setAttribute('aria-expanded',String(!$('#ageMenu').hidden));
  if(comp)comp.setAttribute('aria-expanded',String(!$('#companionMenu').hidden));
  _atharPrepareMasteredStage();
};

render();

/* Keep disclosure state truthful when menus open without a stage rerender. */
const _ageBtn=$('#ageBtn'),_companionBtn=$('#companionBtn');
if(_ageBtn){const old=_ageBtn.onclick;_ageBtn.onclick=e=>{old&&old(e);_ageBtn.setAttribute('aria-expanded',String(!$('#ageMenu').hidden));};}
if(_companionBtn){const old=_companionBtn.onclick;_companionBtn.onclick=e=>{old&&old(e);_companionBtn.setAttribute('aria-expanded',String(!$('#companionMenu').hidden));};}
