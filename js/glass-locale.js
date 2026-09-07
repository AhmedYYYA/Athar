/* ATHAR lightweight bilingual + reveal runtime for glass pages. */
(function(){
  var KEY='athar.lang',LEGACY='athar-lang';
  function current(){try{return localStorage.getItem(KEY)||localStorage.getItem(LEGACY)||'en'}catch(e){return'en'}}
  function normalise(lang){return lang==='ar'?'ar':'en'}
  function setDocumentDirection(lang){lang=normalise(lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';return lang}
  function apply(lang){
    lang=setDocumentDirection(lang);
    try{localStorage.setItem(KEY,lang);localStorage.setItem(LEGACY,lang)}catch(e){}
    document.querySelectorAll('[data-en][data-ar]').forEach(function(el){el.textContent=el.getAttribute('data-'+lang)});
    document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===lang))});
    try{document.dispatchEvent(new CustomEvent('athar:glass-language',{detail:{lang:lang}}))}catch(e){}
  }
  var initial=setDocumentDirection(current());
  document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b)apply(b.dataset.lang)});
  function reveal(){document.querySelectorAll('.reveal').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight*0.92)el.classList.add('in')})}
  apply(initial);
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){apply(initial);reveal();window.addEventListener('scroll',reveal,{passive:true})},{once:true});
  }else{reveal();window.addEventListener('scroll',reveal,{passive:true})}
  window.ATHARGlass={setLanguage:apply,language:current};
})();