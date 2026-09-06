/* ATHAR hardening tests: age differentiation, completion and adult evidence views. */
const fs=require('fs');
const path=require('path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
let pass=0,fail=0;
function check(label,ok,detail){if(ok){pass++;console.log('  ok   '+label)}else{fail++;console.log('  FAIL '+label+(detail?' -> '+detail:''))}}
function inline(html,page){return html.replace(/<script src="([^"]+)"><\/script>/g,(whole,src)=>{const f=path.join(root,src);if(!fs.existsSync(f))throw new Error(page+' missing script '+src);return '<script>'+fs.readFileSync(f,'utf8')+'<\/script>'})}
function boot(page,url){let html=inline(fs.readFileSync(path.join(root,page),'utf8'),page);const errors=[];const dom=new JSDOM(html,{runScripts:'dangerously',url:url||('https://athar.test/'+page),pretendToBeVisual:true,beforeParse(w){w.requestAnimationFrame=cb=>setTimeout(()=>cb(Date.now()),0);w.IntersectionObserver=class{observe(el){el.classList.add('in')}unobserve(){}disconnect(){}};w.addEventListener('error',e=>errors.push(e.message))}});dom.window.__errors=errors;return dom.window}
console.log('\nexperience hardening');
{
  const w=boot('learn.html');const d=w.document;w.ATHAR.state.reset();w.ATHAR.experience.render();
  check('Journey boots without hardening errors',w.__errors.length===0,w.__errors.join(' | '));
  check('Journey exposes two age choices',d.querySelectorAll('[data-age-band]').length===2);
  check('default age experience is 7–9',w.ATHAR.state.ageBand()==='7-9');
  d.querySelector('[data-age-band="10-12"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  check('age choice persists 10–12',w.ATHAR.state.ageBand()==='10-12');
  check('selected age button reflects state',d.querySelector('[data-age-band="10-12"]').getAttribute('aria-pressed')==='true');
  w.ATHAR.curriculum.order().forEach(x=>w.ATHAR.state.completeLesson(x.lesson.id,x.lesson.traces,false));w.ATHAR.journey.render();w.ATHAR.experience.render();
  check('16 mission completion gets foundation summary',!!d.querySelector('.foundation-summary'));
  check('foundation summary has four evidence metrics',d.querySelectorAll('.finish-metric').length===4);
}
{
  const w=boot('lesson.html','https://athar.test/lesson.html?m=what-is-ai');const d=w.document;w.ATHAR.state.reset();w.ATHAR.lessonAge.refresh();
  check('Lesson age layer boots without errors',w.__errors.length===0,w.__errors.join(' | '));
  check('7–9 keeps deeper explanation hidden',d.getElementById('deepDive').hidden===true);
  w.ATHAR.state.setAgeBand('10-12');w.ATHAR.lessonAge.refresh();
  check('10–12 offers optional Tell me more',!d.getElementById('deepDive').hidden&&!!d.querySelector('.deep-dive-toggle'));
  check('lesson age pill updates',d.getElementById('agePill').textContent.includes('10'));
}
{
  const w=boot('families.html');const d=w.document;w.ATHAR.state.reset();w.ATHAR.adultProgress.render();
  check('Family progress view boots without errors',w.__errors.length===0,w.__errors.join(' | '));
  check('Family view renders six track rows',d.querySelectorAll('.adult-track-row').length===6);
  w.ATHAR.state.completeLesson('what-is-ai',5,false);w.ATHAR.adultProgress.render();
  check('Family view updates mission completion',d.querySelector('.adult-metric strong').textContent==='1/16');
}
{
  const w=boot('schools.html');const d=w.document;w.ATHAR.state.reset();w.ATHAR.adultProgress.render();
  check('Educator progress view boots without errors',w.__errors.length===0,w.__errors.join(' | '));
  check('Educator view shows Safety and Skills evidence chips',d.querySelectorAll('.adult-evidence-chip').length===3);
}
console.log('\nexperience hardening: '+pass+' passed, '+fail+' failed');
if(fail)process.exit(1);
