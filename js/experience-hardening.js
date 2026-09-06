/* ATHAR Journey experience hardening — age band and completion moment. */
window.ATHAR=window.ATHAR||{};
ATHAR.experience=(function(){
  function lang(){return document.documentElement.lang==='ar'?'ar':'en'}
  function T(en,ar){return lang()==='ar'?ar:en}
  function paintAge(){
    if(!ATHAR.state)return;
    var band=ATHAR.state.ageBand();
    document.documentElement.dataset.ageBand=band;
    document.querySelectorAll('[data-age-band]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.ageBand===band))});
    var note=document.getElementById('ageNote');
    if(note)note.textContent=band==='10-12'?T('Same missions, with optional deeper explanations.','نفس المهام، مع شروحات أعمق اختيارية.'):T('Shorter wording and fewer extra explanations.','صياغة أقصر وشروحات إضافية أقل.');
  }
  function enhanceCompletion(){
    if(!ATHAR.state||ATHAR.state.completedCount()<16)return;
    var host=document.getElementById('nextMission');if(!host||host.querySelector('.foundation-summary'))return;
    var s=ATHAR.state.all(),passportTotal=s.passports.skills.length+s.passports.safety.length;
    var independent=Object.keys(s.completed).filter(function(id){return s.completed[id]&&s.completed[id].evidence==='independent'}).length;
    var summary=document.createElement('div');
    summary.className='foundation-summary';
    summary.innerHTML='\
      <div class="finish-metric"><strong>'+s.traces+'</strong><span>'+T('traces','آثار')+'</span></div>\
      <div class="finish-metric"><strong>'+s.badges.length+'</strong><span>'+T('badges','شارات')+'</span></div>\
      <div class="finish-metric"><strong>'+passportTotal+'</strong><span>'+T('passport evidence','أدلة الجواز')+'</span></div>\
      <div class="finish-metric"><strong>'+independent+'/16</strong><span>'+T('independent missions','مهام مستقلة')+'</span></div>';
    var copy=host.querySelector('.next-copy');if(copy){copy.appendChild(summary);var ribbon=document.createElement('div');ribbon.className='foundation-ribbon';ribbon.textContent=T('✦ ATHAR FOUNDATION TRAIL COMPLETE','✦ اكتملت رحلة أثر التأسيسية');copy.appendChild(ribbon)}
  }
  function render(){paintAge();enhanceCompletion()}
  function bind(){
    document.addEventListener('click',function(e){var b=e.target.closest('[data-age-band]');if(!b||!ATHAR.state)return;ATHAR.state.setAgeBand(b.dataset.ageBand);paintAge();document.dispatchEvent(new CustomEvent('athar:age-band',{detail:{ageBand:ATHAR.state.ageBand()}}))});
    document.addEventListener('athar:glass-language',render);
    window.addEventListener('pageshow',render);
  }
  function init(){bind();render()}
  return{init:init,render:render};
})();
ATHAR.experience.init();
