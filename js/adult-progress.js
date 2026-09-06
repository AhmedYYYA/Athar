/* ATHAR adult progress view — browser-local counts only, no raw answers or child identity. */
window.ATHAR=window.ATHAR||{};
ATHAR.adultProgress=(function(){
  function lang(){return document.documentElement.lang==='ar'?'ar':'en'}
  function T(en,ar){return lang()==='ar'?ar:en}
  function L(v){if(!v)return'';if(typeof v==='string')return v;return v[lang()]||v.en||''}
  function render(){
    var host=document.getElementById('adultProgress');if(!host||!ATHAR.state||!ATHAR.curriculum)return;
    var s=ATHAR.state.all(),completed=Object.keys(s.completed),independent=0,supported=0;
    completed.forEach(function(id){if(s.completed[id]&&s.completed[id].evidence==='supported')supported++;else independent++});
    var skills=s.passports&&s.passports.skills?s.passports.skills.length:0,safety=s.passports&&s.passports.safety?s.passports.safety.length:0;
    var metrics=[
      [completed.length+'/16',T('missions','مهام')],
      [s.traces,T('traces','آثار')],
      [s.badges.length,T('badges','شارات')],
      [independent,T('independent','مستقلة')],
      [supported,T('with support','بمساعدة')]
    ];
    var rows=ATHAR.curriculum.tracks.map(function(track){var done=track.lessons.filter(function(l){return !!s.completed[l.id]}).length,pct=Math.round(done/track.lessons.length*100);return '<div class="adult-track-row"><strong>'+L(track.name)+'</strong><div class="adult-trackbar" aria-label="'+done+' / '+track.lessons.length+'"><i style="width:'+pct+'%"></i></div><span>'+done+' / '+track.lessons.length+'</span></div>'}).join('');
    var note=completed.length?T('This summary uses only progress stored in this browser on this device. It does not show raw answers, conversations or personal information.','يستخدم هذا الملخص التقدم المحفوظ في هذا المتصفح وعلى هذا الجهاز فقط. ولا يعرض الإجابات الخام أو المحادثات أو المعلومات الشخصية.'):T('No mission progress is stored on this device yet. This panel will show completion and evidence after missions are used here.','لا يوجد تقدم محفوظ على هذا الجهاز بعد. سيعرض هذا القسم الإكمال والأدلة بعد استخدام المهام هنا.');
    host.innerHTML='<div class="adult-progress-top">'+metrics.map(function(m){return'<div class="adult-metric"><strong>'+m[0]+'</strong><span>'+m[1]+'</span></div>'}).join('')+'</div><p class="adult-progress-note">'+note+'</p><div class="adult-track-list">'+rows+'</div><div class="adult-evidence-row"><span class="adult-evidence-chip safe">'+T('Safety Passport','جواز السلامة')+': '+safety+'/5</span><span class="adult-evidence-chip">'+T('Skills Passport','جواز المهارات')+': '+skills+'/47</span><span class="adult-evidence-chip">'+T('Age experience','تجربة العمر')+': '+(s.ageBand==='10-12'?'10–12':'7–9')+'</span></div>';
  }
  function init(){document.addEventListener('athar:glass-language',render);window.addEventListener('pageshow',render);render()}
  return{init:init,render:render};
})();
ATHAR.adultProgress.init();
