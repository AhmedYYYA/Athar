const { test, expect } = require('@playwright/test');
const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173';
const URL = `${BASE}/lesson1.html`;

async function reset(page){await page.goto(URL);await page.evaluate(()=>localStorage.clear());await page.reload();}
async function chooseAge(page,age){const visible=age==='10-12'?'10–12':'7–9';await page.locator('#ageBtn').click();await page.locator('#ageMenu').getByRole('button',{name:`Age ${visible}`,exact:true}).click();}
async function chooseCompanion(page,name){await page.locator('#companionBtn').click();await page.locator('#companionMenu').getByRole('button',{name:new RegExp(name,'i')}).click();}
async function seedState(page,data){await page.evaluate(data=>{localStorage.clear();localStorage.setItem('athar.lesson.lang',data.lang||'en');localStorage.setItem('athar.lesson.age',data.age||'7-9');localStorage.setItem('athar.companion',data.companion||'none');localStorage.setItem('athar.lesson1.v2',JSON.stringify(data));},data);await page.reload();}
async function clickSingle(page,key,i=0){await page.locator(`[data-single="${key}"][data-i="${i}"]`).click();}
async function mastery(page,action){await page.locator(`[data-action="${action}"]`).click();await expect(page.locator('[data-action="next"]')).toBeVisible();await page.locator('[data-action="next"]').click();}

async function runJourney(page,p){
  await reset(page); await chooseAge(page,p.age);
  if(p.companion!=='none')await chooseCompanion(page,p.companion);
  if(p.lang==='ar')await page.getByRole('button',{name:'العربية'}).click();
  await expect(page.locator('html')).toHaveAttribute('lang',p.lang);
  await expect(page.locator('html')).toHaveAttribute('dir',p.lang==='ar'?'rtl':'ltr');
  await expect(page.locator('#ageLabel')).toHaveText(p.age==='10-12'?'10–12':'7–9');
  await page.locator('[data-action="next"]').click();
  for(const el of await page.locator('[data-multi="recognition"][data-answer="1"]').all())await el.click(); await mastery(page,'recognition');
  await clickSingle(page,'patterns',0); await mastery(page,'patterns');
  await clickSingle(page,'distinguish',1); await mastery(page,'distinguish');
  await page.locator('[data-action="next"]').click();
  await clickSingle(page,'train',0); await mastery(page,'train');
  await clickSingle(page,'verify',0); await clickSingle(page,'health',0); await mastery(page,'verify');
  for(const el of await page.locator('[data-multi="privacy"][data-answer="1"]').all())await el.click(); await mastery(page,'privacy');
  for(let i=0;i<5;i++){
    await expect(page.locator(`[data-single="m${i}"]`)).toHaveCount(3);
    if(p.hintAt===i){await page.locator('#hintBtn').click();await expect(page.locator('#companionText')).not.toBeEmpty();}
    await clickSingle(page,`m${i}`,0); await page.locator('[data-action="mission"]').click();
    if(i===2){await page.reload();await expect(page.locator('[data-single="m3"]')).toHaveCount(3);}
  }
  await expect(page.locator('[data-goto="9"]')).toHaveClass(/active/);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('athar.lesson1.v2')));
  expect(saved.stage).toBe(9);
  for(const k of ['recognition','patterns','verification','privacy','agency'])expect(saved.evidence[k]).not.toBe('not-yet');
  if(p.hintAt===3)expect(saved.evidence.agency).toBe('supported');
}

test('entry renders and blocks forward skipping',async({page})=>{await reset(page);await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.getByRole('heading',{name:/What Is AI/})).toBeVisible();await expect(page.locator('[data-goto="2"]')).toBeDisabled();await page.getByRole('button',{name:'Continue'}).click();await expect(page.locator('[data-goto="1"]')).toHaveClass(/active/);});

test('Arabic RTL and age depth persist after reload',async({page})=>{await reset(page);await chooseAge(page,'10-12');await page.getByRole('button',{name:'العربية'}).click();await expect(page.locator('html')).toHaveAttribute('lang','ar');await expect(page.locator('html')).toHaveAttribute('dir','rtl');await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','ar');await expect(page.locator('#ageLabel')).toHaveText('10–12');});

test('optional companions: none, Hamdan, Hessa',async({page})=>{await reset(page);await expect(page.locator('#companionPanel')).toBeHidden();await expect(page.locator('.companion-slot.empty')).toBeHidden();await chooseCompanion(page,'Hamdan');await expect(page.locator('#companionPanel')).toBeVisible();await expect(page.locator('#companionName')).toContainText('Hamdan');await chooseCompanion(page,'Hessa');await expect(page.locator('#companionName')).toContainText('Hessa');await chooseCompanion(page,'No companion');await expect(page.locator('#companionPanel')).toBeHidden();await expect(page.locator('.companion-slot.empty')).toBeHidden();});

test('privacy mastery blocks progression until correct',async({page})=>{await reset(page);await seedState(page,{stage:7,lang:'en',age:'7-9',companion:'none',done:[0,1,2,3,4,5,6],evidence:{recognition:'independent',patterns:'independent',verification:'independent',privacy:'not-yet',agency:'not-yet'},hints:{},missionStep:0,completed:false});await page.getByRole('button',{name:/Favourite animal/}).click();await page.getByRole('button',{name:/Check privacy choices/}).click();await expect(page.locator('[data-goto="8"]')).toBeDisabled();for(const name of ['Home address','Password','School or identifying location','Phone number'])await page.getByRole('button',{name:new RegExp(name)}).click();await page.getByRole('button',{name:/Favourite animal/}).click();await page.getByRole('button',{name:/Check privacy choices/}).click();await expect(page.locator('[data-goto="8"]')).not.toBeDisabled();await expect(page.locator('[data-action="next"]')).toBeVisible();});

test('Stage 08 mission completes five competency steps and persists',async({page})=>{await reset(page);await seedState(page,{stage:8,lang:'en',age:'10-12',companion:'none',done:[0,1,2,3,4,5,6,7],evidence:{recognition:'independent',patterns:'independent',verification:'independent',privacy:'independent',agency:'not-yet'},hints:{},missionStep:0,completed:false});for(let i=0;i<5;i++){await expect(page.getByText(`${i+1}/5`)).toBeVisible();await clickSingle(page,`m${i}`,0);await page.locator('[data-action="mission"]').click();if(i<4){await page.reload();await expect(page.getByText(`${i+2}/5`)).toBeVisible();}}await expect(page.getByRole('heading',{name:/My First AI Discovery/})).toBeVisible();});

test('health/safety transfer blocks unsafe choice and requires trusted adult',async({page})=>{await reset(page);await seedState(page,{stage:6,lang:'en',age:'10-12',companion:'none',done:[0,1,2,3,4,5],evidence:{recognition:'independent',patterns:'independent',verification:'not-yet',privacy:'not-yet',agency:'not-yet'},hints:{},missionStep:0,completed:false});await clickSingle(page,'verify',0);await clickSingle(page,'health',1);await page.locator('[data-action="verify"]').click();await expect(page.locator('[data-goto="7"]')).toBeDisabled();await expect(page.locator('#feedback')).toContainText(/trusted adult/i);await clickSingle(page,'health',0);await page.locator('[data-action="verify"]').click();await expect(page.locator('[data-goto="7"]')).not.toBeDisabled();await expect(page.locator('#feedback')).toContainText(/do not rely on AI alone/i);await expect(page.locator('[data-action="next"]')).toBeVisible();await page.locator('[data-action="next"]').click();await expect(page.locator('[data-goto="7"]')).toHaveClass(/active/);});

test('keyboard focus and no horizontal overflow at phone size',async({page})=>{await page.setViewportSize({width:320,height:800});await reset(page);let overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);expect(overflow).toBeFalsy();await page.keyboard.press('Tab');await expect(page.locator(':focus')).toBeVisible();await page.getByRole('button',{name:'العربية'}).click();overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);expect(overflow).toBeFalsy();});

for(const p of [
  {label:'7 EN no companion',lang:'en',age:'7-9',companion:'none'},
  {label:'8 AR Hessa',lang:'ar',age:'7-9',companion:'Hessa'},
  {label:'11 EN Hamdan',lang:'en',age:'10-12',companion:'Hamdan'},
  {label:'12 AR Hessa with competency hint',lang:'ar',age:'10-12',companion:'Hessa',hintAt:3}
])test(`end-to-end acceptance — ${p.label}`,async({page})=>runJourney(page,p));

test('no external runtime requests and no page errors',async({page})=>{const external=[],errors=[];page.on('request',r=>{try{const u=new URL(r.url());if(u.protocol.startsWith('http')&&u.host!=='127.0.0.1:4173')external.push(r.url())}catch{}});page.on('pageerror',e=>errors.push(String(e)));await reset(page);await chooseCompanion(page,'Hamdan');await page.waitForTimeout(250);expect(external).toEqual([]);expect(errors).toEqual([]);});

test('render snapshots have true locale and age state',async({page},testInfo)=>{for(const c of [
  {name:'phone-en-7',width:375,height:812,lang:'en',age:'7-9',stage:0,companion:'none'},
  {name:'phone-ar-8-hessa',width:375,height:812,lang:'ar',age:'7-9',stage:1,companion:'hessa'},
  {name:'tablet-en-11-hamdan',width:768,height:1024,lang:'en',age:'10-12',stage:4,companion:'hamdan'},
  {name:'desktop-ar-12',width:1440,height:1000,lang:'ar',age:'10-12',stage:8,companion:'none'}
]){await page.setViewportSize({width:c.width,height:c.height});await page.goto(URL);await page.evaluate(c=>{localStorage.clear();localStorage.setItem('athar.lesson.lang',c.lang);localStorage.setItem('athar.lesson.age',c.age);localStorage.setItem('athar.companion',c.companion);localStorage.setItem('athar.lesson1.v2',JSON.stringify({stage:c.stage,lang:c.lang,age:c.age,companion:c.companion,done:Array.from({length:c.stage},(_,i)=>i),evidence:{recognition:'independent',patterns:'independent',verification:'independent',privacy:'independent',agency:'not-yet'},hints:{},missionStep:0,completed:false}));},c);await page.reload();await expect(page.locator('html')).toHaveAttribute('lang',c.lang);await expect(page.locator('html')).toHaveAttribute('dir',c.lang==='ar'?'rtl':'ltr');await expect(page.locator('#ageLabel')).toHaveText(c.age==='7-9'?'7–9':'10–12');await page.screenshot({path:testInfo.outputPath(`${c.name}.png`),fullPage:true});}});
