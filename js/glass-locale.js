/* ATHAR lightweight bilingual + reveal runtime for glass pages. */
(function(){
  var KEY='athar.lang';
  function current(){return localStorage.getItem(KEY)||'en'}
  function apply(lang){
    lang=lang==='ar'?'ar':'en';localStorage.setItem(KEY,lang);
    document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.querySelectorAll('[data-en][data-ar]').forEach(function(el){el.textContent=el.getAttribute('data-'+lang)});
    document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===lang))});
    try{document.dispatchEvent(new CustomEvent('athar:glass-language',{detail:{lang:lang}}))}catch(e){}
  }
  document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b)apply(b.dataset.lang)});
  function reveal(){document.querySelectorAll('.reveal').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight*0.92)el.classList.add('in')})}
  document.addEventListener('DOMContentLoaded',function(){apply(current());reveal();window.addEventListener('scroll',reveal,{passive:true})});
  window.ATHARGlass={setLanguage:apply,language:current};
})();
