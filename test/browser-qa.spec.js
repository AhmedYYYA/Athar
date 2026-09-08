const {test,expect}=require('@playwright/test');

const missions=['what-is-ai','patterns','data','clear-asking','details','refine','can-be-wrong','verify','fairness','private','not-human','my-idea','credit','steps','rules','loops'];

async function noHorizontalOverflow(page){
  return page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1);
}

for(const id of missions){
  test(`desktop mission ${id} renders cleanly in EN and AR`,async({page})=>{
    const errors=[];page.on('pageerror',e=>errors.push(String(e)));
    await page.setViewportSize({width:1280,height:900});
    await page.goto(`/lesson.html?m=${encodeURIComponent(id)}`);
    await expect(page.locator('.stagetitle')).toBeVisible();
    await expect(page.locator('.actionbar')).toBeVisible();
    expect(await noHorizontalOverflow(page)).toBeTruthy();
    const actionInView=await page.locator('.actionbar').evaluate(el=>el.getBoundingClientRect().top<window.innerHeight+4);
    expect(actionInView).toBeTruthy();
    await page.getByRole('button',{name:'ع'}).click();
    await expect(page.locator('html')).toHaveAttribute('dir','rtl');
    await expect(page.locator('.stagetitle')).toBeVisible();
    expect(await noHorizontalOverflow(page)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test('mobile journey and every mission avoid horizontal overflow',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/learn.html');
  await expect(page.locator('.mission')).toHaveCount(16);
  expect(await noHorizontalOverflow(page)).toBeTruthy();
  for(const id of missions){
    await page.goto(`/lesson.html?m=${encodeURIComponent(id)}`);
    await expect(page.locator('.stagetitle')).toBeVisible();
    expect(await noHorizontalOverflow(page)).toBeTruthy();
  }
});

test('controlled pilot is fixed to ages 10–12 with deeper explanation available',async({page})=>{
  await page.goto('/learn.html');
  await expect(page.locator('button[data-age-band]')).toHaveCount(0);
  await page.goto('/lesson.html?m=what-is-ai');
  await expect(page.locator('#agePill')).toContainText('10');
  await expect(page.locator('.deep-dive-toggle')).toBeVisible();
});

test('family and educator evidence panels render browser-local summaries',async({page})=>{
  await page.goto('/families.html');
  await expect(page.locator('#adultProgress .adult-track-row')).toHaveCount(6);
  await expect(page.locator('#adultProgress .adult-metric')).toHaveCount(5);
  await page.goto('/schools.html');
  await expect(page.locator('#adultProgress .adult-track-row')).toHaveCount(6);
  await expect(page.locator('#adultProgress .adult-evidence-chip')).toHaveCount(3);
});
