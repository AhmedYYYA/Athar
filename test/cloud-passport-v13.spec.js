const {test,expect}=require('@playwright/test');

test('local progress is not attached until the selected-profile action',async({page})=>{
  await page.route('https://cdn.jsdelivr.net/**',route=>route.fulfill({status:200,contentType:'application/javascript',body:'/* Supabase supplied by the test harness. */'}));
  await page.addInitScript(()=>{
    window.__cloudCalls=[];
    window.supabase={createClient:()=>({
      auth:{getSession:async()=>({data:{session:{user:{id:'adult-test'}}}})},
      rpc:async(name,args)=>{window.__cloudCalls.push({name,args});if(name==='get_child_cloud_passport')return{data:{state:null,missions:[],evidence:[],achievements:[]},error:null};return{data:{ok:true,conflict:false,revision:1},error:null}}
    })};
  });
  await page.goto('/index.html');
  await page.evaluate(()=>{
    sessionStorage.setItem('athar.activeChildProfile','11111111-1111-4111-8111-111111111111');
    sessionStorage.setItem('athar.activeChildProfileLabel','QA Learner');
    localStorage.setItem('athar.progress.v1',JSON.stringify({traces:5,completed:{'what-is-ai':{supported:false,evidence:'independent'}},badges:['first-trace'],support:{},passports:{skills:['recognise-ai'],safety:[]},companion:'none',ageBand:'7-9',lastMission:'what-is-ai'}));
  });
  await page.goto('/learn.html');
  await expect(page.locator('#cloudPassportAction')).toBeVisible();
  await expect(page.locator('#cloudPassportStatus')).toContainText('QA Learner');
  expect(await page.evaluate(()=>window.__cloudCalls.map(x=>x.name))).toEqual(['get_child_cloud_passport']);
  await page.locator('#cloudPassportAction').click();
  await expect.poll(()=>page.evaluate(()=>window.__cloudCalls.some(x=>x.name==='sync_child_learning_state'))).toBe(true);
  const payload=await page.evaluate(()=>window.__cloudCalls.find(x=>x.name==='sync_child_learning_state').args.p_payload);
  expect(payload.local_import_version).toBe('athar.progress.v1');
  expect(payload.missions).toEqual([{mission_id:'what-is-ai',completed:true,evidence:'independent'}]);
  expect(JSON.stringify(payload)).not.toMatch(/answer|prompt|conversation|transcript|email|phone/i);
  expect(await page.evaluate(()=>localStorage.getItem('athar.activeChildProfile'))).toBeNull();
});

test('Cloud Passport control remains usable in Arabic and on mobile',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.route('https://cdn.jsdelivr.net/**',route=>route.fulfill({status:200,contentType:'application/javascript',body:'/* offline */'}));
  await page.goto('/learn.html');
  await page.getByRole('button',{name:'العربية'}).click();
  await expect(page.locator('html')).toHaveAttribute('dir','rtl');
  await expect(page.locator('#cloudPassport')).toBeVisible();
  await expect(page.locator('#cloudPassportTitle')).toContainText('احفظ التقدم');
  await expect(page.locator('#cloudPassportStatus')).toContainText('اختر');
});
