/* ATHAR lightweight bilingual + reveal runtime for glass pages. */
(function(){
  var KEY='athar.lang',LEGACY='athar-lang';
  function current(){try{return localStorage.getItem(KEY)||localStorage.getItem(LEGACY)||'en'}catch(e){return'en'}}
  function normalise(lang){return lang==='ar'?'ar':'en'}
  function setDocumentDirection(lang){lang=normalise(lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';return lang}
  function alignPilotClaims(lang){
    var en='Pilot cohort: ages 10–12. Ages 7–9 in development.';
    var ar='الفئة التجريبية: من ١٠ إلى ١٢ سنة. محتوى ٧–٩ سنوات قيد التطوير.';
    document.querySelectorAll('[data-en][data-ar]').forEach(function(el){
      var a=el.getAttribute('data-en')||'',b=el.getAttribute('data-ar')||'';
      if(/aged?\s*7\s*[–-]\s*12|ages?\s*7\s*[–-]\s*12/i.test(a)||/7\s*(?:إلى|–|-)\s*12/.test(b)){
        el.setAttribute('data-en',en);el.setAttribute('data-ar',ar);el.textContent=lang==='ar'?ar:en;
      }
      if(a==='Enter the bounded child journey, choose an age experience and work through short missions.'){
        el.setAttribute('data-en','Start your first mission and work through short, hands-on challenges.');
        el.setAttribute('data-ar','ابدأ مهمتك الأولى، ثم تقدّم عبر تحديات قصيرة وعملية.');
      }
      if(a==='Open the Journey, choose an age experience and complete a mission. Then return here and see how the evidence is represented.'){
        el.setAttribute('data-en','Open the Journey and complete a mission. Then return here to see what the learner demonstrated.');
        el.setAttribute('data-ar','افتح الرحلة وأكمل مهمة، ثم عد لترى المهارة التي أظهرها المتعلم.');
      }
    });
    var meta=document.querySelector('meta[name="description"]');if(meta&&/7\s*[–-]\s*12/.test(meta.content))meta.content='ATHAR | أثر — '+en;
    document.querySelectorAll('.educator-facts span').forEach(function(x){var small=x.querySelector('small');if(small&&/age experiences/i.test(small.textContent)){var strong=x.querySelector('strong');if(strong)strong.textContent='10–12';small.setAttribute('data-en','pilot cohort');small.setAttribute('data-ar','الفئة التجريبية');small.textContent=lang==='ar'?'الفئة التجريبية':'pilot cohort'}});
  }
  function apply(lang){lang=setDocumentDirection(lang);try{localStorage.setItem(KEY,lang);localStorage.setItem(LEGACY,lang)}catch(e){}document.querySelectorAll('[data-en][data-ar]').forEach(function(el){el.textContent=el.getAttribute('data-'+lang)});alignPilotClaims(lang);document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===lang))});try{document.dispatchEvent(new CustomEvent('athar:glass-language',{detail:{lang:lang}}))}catch(e){}}
  var initial=setDocumentDirection(current());document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b)apply(b.dataset.lang)});function reveal(){document.querySelectorAll('.reveal').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight*0.92)el.classList.add('in')})}apply(initial);if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){apply(initial);reveal();window.addEventListener('scroll',reveal,{passive:true})},{once:true})}else{reveal();window.addEventListener('scroll',reveal,{passive:true})}window.ATHARGlass={setLanguage:apply,language:current};
})();