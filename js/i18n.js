/* ATHAR bilingual runtime for mission UI. */
window.ATHAR=window.ATHAR||{};
ATHAR.i18n=(function(){
  var KEY='athar.lang';var strings={
    'skip':{en:'Skip to main content',ar:'انتقل إلى المحتوى الرئيسي'},
    'nav.trail':{en:'My trail',ar:'مساري'},'nav.families':{en:'Families',ar:'العائلات'},'nav.schools':{en:'Schools',ar:'المدارس'},
    'lesson.exit':{en:'Leave mission',ar:'غادر المهمة'},'cta.back':{en:'Back',ar:'السابق'},'cta.hint':{en:'Give me a hint',ar:'أعطني تلميحاً'},'cta.check':{en:'Check my answer',ar:'تحقق من إجابتي'},'cta.next':{en:'Next',ar:'التالي'},
    'lesson.of':{en:'Step {n} of {total}',ar:'الخطوة {n} من {total}'}
  };
  function lang(){return localStorage.getItem(KEY)==='ar'?'ar':'en'}
  function setDir(){var l=lang();document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr'}
  function t(key,args){var item=strings[key];var out=item?item[lang()]:key;if(args)Object.keys(args).forEach(function(k){out=out.replace('{'+k+'}',args[k])});return out}
  function apply(){setDir();document.querySelectorAll('[data-i18n]').forEach(function(el){el.textContent=t(el.dataset.i18n)})}
  function set(l){localStorage.setItem(KEY,l==='ar'?'ar':'en');apply();document.dispatchEvent(new CustomEvent('athar:language'))}
  return{lang:lang,set:set,setDir:setDir,t:t,apply:apply};
})();
