/* ATHAR regression coverage for every currently available mission.
   Requires jsdom from package.json. */
const fs=require('fs');
const path=require('path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
let pass=0,fail=0;
function check(label,ok,detail){if(ok){pass++;console.log('  ok   '+label)}else{fail++;console.log('  FAIL '+label+(detail?' -> '+detail:''))}}
function boot(id){
  let html=fs.readFileSync(path.join(root,'lesson.html'),'utf8');
  html=html.replace(/<script src="([^"]+)"><\/script>/g,(whole,src)=>{
    const f=path.join(root,src);if(!fs.existsSync(f))throw new Error('missing script: '+src);
    return '<script>'+fs.readFileSync(f,'utf8')+'<\/script>';
  });
  const errors=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://athar.test/lesson.html?m='+encodeURIComponent(id),pretendToBeVisual:true,beforeParse(w){w.requestAnimationFrame=cb=>setTimeout(()=>cb(Date.now()),0);w.addEventListener('error',e=>errors.push(e.message))}});
  dom.window.__errors=errors;return dom.window;
}
function bilingual(node,trail,gaps){
  if(node&&typeof node==='object'){
    if(typeof node.en==='string'){if(typeof node.ar!=='string'||!node.ar.trim())gaps.push(trail);return}
    Object.keys(node).forEach(k=>bilingual(node[k],trail+'.'+k,gaps));
  }
}
function answerStage(w,stage){
  const d=w.document;
  if(stage.type==='multi'||stage.type==='choice'){
    stage.options.forEach(o=>{if(o.correct){const b=d.querySelector('.option[data-id="'+o.id+'"]');if(b)b.dispatchEvent(new w.MouseEvent('click',{bubbles:true}))}});
    d.getElementById('check').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    return !d.getElementById('next').disabled;
  }
  if(stage.type==='sort'){
    stage.items.forEach(it=>{
      const card=d.querySelector('.sortcard[data-item="'+it.id+'"]');
      if(card)card.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
      const opt=d.querySelector('.sortopt[data-item="'+it.id+'"][data-bucket="'+it.bucket+'"]');
      if(opt)opt.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    });
    d.getElementById('check').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    return !d.getElementById('next').disabled;
  }
  if(stage.type==='train'){
    let guard=0,btn=d.querySelector('.trainbtn');
    while(btn&&!btn.hidden&&guard++<20){btn.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));btn=d.querySelector('.trainbtn')}
    return !d.getElementById('next').disabled;
  }
  return true;
}
function walkthrough(id,lang){
  const w=boot(id),d=w.document;w.ATHAR.state.reset();w.ATHAR.i18n.set(lang);
  const lesson=w.ATHAR.lessons[id];
  check(id+' ['+lang+'] loads',!!lesson);
  check(id+' ['+lang+'] no boot errors',w.__errors.length===0,w.__errors.join(' | '));
  if(!lesson)return;
  const gaps=[];bilingual(lesson,id,gaps);check(id+' ['+lang+'] bilingual parity',gaps.length===0,gaps.join(', '));
  const allowed=['teach','multi','choice','sort','train','celebrate'];
  check(id+' ['+lang+'] stage types supported',lesson.stages.every(s=>allowed.includes(s.type)));
  for(let i=0;i<lesson.stages.length;i++){
    const stage=lesson.stages[i];
    const title=d.querySelector('.stagetitle');
    check(id+' ['+lang+'] stage '+i+' renders title',!!title&&title.textContent.trim().length>0);
    if(stage.type==='celebrate'){
      check(id+' ['+lang+'] completion stored',w.ATHAR.state.isDone(id));
      check(id+' ['+lang+'] badge stored',!lesson.badge||w.ATHAR.state.hasBadge(lesson.badge.id));
      const p=lesson.passport||{skills:[],safety:[]};
      (p.skills||[]).forEach(pid=>check(id+' ['+lang+'] skill passport '+pid,w.ATHAR.state.passport('skills').includes(pid)));
      (p.safety||[]).forEach(pid=>check(id+' ['+lang+'] safety passport '+pid,w.ATHAR.state.passport('safety').includes(pid)));
      break;
    }
    const ok=answerStage(w,stage);check(id+' ['+lang+'] stage '+i+' can complete',ok);
    if(i<lesson.stages.length-1)d.getElementById('next').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  }
}
console.log('\nmission regression v2');
['what-is-ai','patterns','data','clear-asking','details','refine','can-be-wrong','verify','fairness'].forEach(id=>['en','ar'].forEach(lang=>walkthrough(id,lang)));
console.log('\nmission regression v2: '+pass+' passed, '+fail+' failed');
if(fail)process.exit(1);
