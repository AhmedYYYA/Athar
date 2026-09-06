/* ATHAR staging safety/privacy static gate. */
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'..');
let pass=0,fail=0;
function check(label,ok,detail){if(ok){pass++;console.log('  ok   '+label)}else{fail++;console.log('  FAIL '+label+(detail?' -> '+detail:''))}}
const pages=['index.html','learn.html','lesson.html','families.html','schools.html','safety.html'];
const forbiddenDomains=['googletagmanager.com','google-analytics.com','doubleclick.net','facebook.com/tr','connect.facebook.net','hotjar.com','segment.com','mixpanel.com','clarity.ms','tiktok.com','adservice.google.com'];
console.log('\nstaging safety/privacy audit');
for(const page of pages){
  const full=path.join(root,page);const html=fs.readFileSync(full,'utf8');
  check(page+' has no child-data form',!/<form\b/i.test(html));
  check(page+' has no embedded third-party frame',!/<iframe\b/i.test(html));
  const externalScripts=[...html.matchAll(/<script[^>]+src=["'](https?:\/\/[^"']+)["']/gi)].map(m=>m[1]);
  check(page+' has no external executable scripts',externalScripts.length===0,externalScripts.join(', '));
  const bad=forbiddenDomains.filter(d=>html.toLowerCase().includes(d));
  check(page+' has no analytics/ad-tech domain',bad.length===0,bad.join(', '));
}
const jsFiles=[];
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,ent.name);if(ent.isDirectory())walk(p);else if(ent.isFile()&&p.endsWith('.js'))jsFiles.push(p)}}
walk(path.join(root,'js'));
for(const file of jsFiles){const src=fs.readFileSync(file,'utf8');const rel=path.relative(root,file);const bad=forbiddenDomains.filter(d=>src.toLowerCase().includes(d));check(rel+' has no analytics/ad-tech domain',bad.length===0,bad.join(', '));}
const state=fs.readFileSync(path.join(root,'js/state.js'),'utf8');
check('progress remains browser-local',state.includes("athar.progress.v1")&&state.includes('localStorage'));
check('state does not store child name/email/phone fields',!/(childName|fullName|email|phone|address|schoolName)\s*:/i.test(state));
check('approved local preference keys remain bounded',state.includes('athar.companion')&&state.includes('athar.ageBand'));
console.log('\nstaging safety/privacy audit: '+pass+' passed, '+fail+' failed');
if(fail)process.exit(1);
