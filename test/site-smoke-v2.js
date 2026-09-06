/* ATHAR current-architecture smoke tests.
   Checks the glass site, bilingual parity, local assets and dynamic Journey. */
const fs=require('fs');
const path=require('path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
let pass=0,fail=0;
function check(label,ok,detail){if(ok){pass++;console.log('  ok   '+label)}else{fail++;console.log('  FAIL '+label+(detail?' -> '+detail:''))}}
function inlineLocalScripts(html,page){
  return html.replace(/<script src="([^"]+)"><\/script>/g,(whole,src)=>{
    if(/^https?:/.test(src))return whole;
    const f=path.join(root,src);
    if(!fs.existsSync(f))throw new Error(page+' missing script '+src);
    return '<script>'+fs.readFileSync(f,'utf8')+'<\/script>';
  });
}
function boot(page,url){
  let html=fs.readFileSync(path.join(root,page),'utf8');
  html=inlineLocalScripts(html,page);
  const errors=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:url||('https://athar.test/'+page),pretendToBeVisual:true,beforeParse(w){w.requestAnimationFrame=cb=>setTimeout(()=>cb(Date.now()),0);w.IntersectionObserver=class{observe(el){el.classList.add('in')}unobserve(){}disconnect(){}};w.addEventListener('error',e=>errors.push(e.message))}});
  dom.window.__errors=errors;return dom.window;
}
function localAssets(page){
  const html=fs.readFileSync(path.join(root,page),'utf8');
  const refs=[];
  html.replace(/(?:src|href)="([^"]+)"/g,(m,ref)=>{if(!/^(?:https?:|#|mailto:|tel:|javascript:)/.test(ref)&&!ref.endsWith('.html')&&!ref.includes('.html?'))refs.push(ref.split('?')[0].split('#')[0])});
  return refs.filter(Boolean);
}
function bilingualParity(w,page){
  const nodes=[...w.document.querySelectorAll('[data-en]')];
  const missing=nodes.filter(el=>el.getAttribute('data-ar')===null||!el.getAttribute('data-ar').trim());
  check(page+' bilingual data parity',missing.length===0,missing.length+' missing Arabic strings');
}

console.log('\nsite smoke v2');
['index.html','learn.html','families.html','schools.html','safety.html','lesson.html'].forEach(page=>{
  check(page+' exists',fs.existsSync(path.join(root,page)));
  const missing=localAssets(page).filter(ref=>!fs.existsSync(path.join(root,ref)));
  check(page+' local assets exist',missing.length===0,missing.join(', '));
});

{
  const w=boot('index.html');
  check('homepage boots without script errors',w.__errors.length===0,w.__errors.join(' | '));
  check('homepage keeps approved glass stylesheet',!!w.document.querySelector('link[href="css/home-glass.css"]'));
  check('homepage has child Journey entry',!!w.document.querySelector('a[href="learn.html"]'));
  bilingualParity(w,'index.html');
}

{
  const w=boot('learn.html');
  check('Journey boots without script errors',w.__errors.length===0,w.__errors.join(' | '));
  check('Journey ATHAR namespace exists',!!w.ATHAR);
  check('Journey has six curriculum tracks',w.ATHAR&&w.ATHAR.curriculum&&w.ATHAR.curriculum.tracks.length===6);
  check('Journey renders six track cards',w.document.querySelectorAll('.journey-track').length===6,'got '+w.document.querySelectorAll('.journey-track').length);
  check('Journey renders sixteen planned missions',w.document.querySelectorAll('.mission').length===16,'got '+w.document.querySelectorAll('.mission').length);
  const ready=w.ATHAR.curriculum.order().filter(x=>x.lesson.ready);
  check('Journey exposes all sixteen foundation missions',ready.length===16,'got '+ready.length);
  check('Journey shows Safety and Skills Passports',w.document.querySelectorAll('.passport-card').length===2);
  check('Journey shows five Safety Passport habits',w.document.querySelectorAll('.passport-card.safety .passport-item').length===5,'got '+w.document.querySelectorAll('.passport-card.safety .passport-item').length);
  check('Journey shows forty-seven Skills Passport items',w.document.querySelectorAll('.passport-card.skills .passport-item').length===47,'got '+w.document.querySelectorAll('.passport-card.skills .passport-item').length);
  check('Journey offers Hamdan, Hessa and no companion',w.document.querySelectorAll('[data-companion]').length===3);
  bilingualParity(w,'learn.html');
}

{
  const w=boot('lesson.html','https://athar.test/lesson.html?m=steps');
  check('mission player boots without script errors',w.__errors.length===0,w.__errors.join(' | '));
  check('Mission 14 is registered',!!(w.ATHAR&&w.ATHAR.lessons&&w.ATHAR.lessons.steps));
  check('Mission 15 is registered',!!(w.ATHAR&&w.ATHAR.lessons&&w.ATHAR.lessons.rules));
  check('Mission 16 is registered',!!(w.ATHAR&&w.ATHAR.lessons&&w.ATHAR.lessons.loops));
  check('mission player renders first stage',!!w.document.querySelector('.stagetitle'));
}

console.log('\nsite smoke v2: '+pass+' passed, '+fail+' failed');
if(fail)process.exit(1);
