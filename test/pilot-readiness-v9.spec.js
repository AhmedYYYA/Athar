const {test,expect}=require('@playwright/test');

async function noHorizontalOverflow(page){
  return page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1);
}

const publicPages=['/index.html','/learn.html','/families.html','/schools.html','/safety.html'];

for(const width of [390,768,1280]){
  test(`core product surfaces render without horizontal overflow at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});
    for(const path of publicPages){
      const errors=[];page.on('pageerror',e=>errors.push(String(e)));
      await page.goto(path);
      expect(await noHorizontalOverflow(page),`${path} overflow at ${width}px`).toBeTruthy();
      expect(errors).toEqual([]);
    }
  });
}

test('journey exposes all 16 missions and preserves child controls',async({page})=>{
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/learn.html');
  await expect(page.locator('.mission')).toHaveCount(16);
  await expect(page.locator('[data-age-band="7-9"]')).toBeVisible();
  await expect(page.locator('[data-age-band="10-12"]')).toBeVisible();
  await expect(page.locator('[data-companion="hamdan"]')).toBeVisible();
  await expect(page.locator('[data-companion="hessa"]')).toBeVisible();
  await expect(page.locator('[data-companion="none"]')).toBeVisible();
});

test('mission player keeps primary action dock visible on phone and desktop',async({page})=>{
  for(const viewport of [{width:390,height:844},{width:1280,height:900}]){
    await page.setViewportSize(viewport);
    await page.goto('/lesson.html?m=what-is-ai');
    await expect(page.locator('.stagetitle')).toBeVisible();
    await expect(page.locator('.actionbar')).toBeVisible();
    const box=await page.locator('.actionbar').boundingBox();
    expect(box).not.toBeNull();
    expect(box.y+box.height).toBeLessThanOrEqual(viewport.height+4);
    expect(await noHorizontalOverflow(page)).toBeTruthy();
  }
});

test('family view communicates evidence without surveillance',async({page})=>{
  await page.goto('/families.html');
  await expect(page.getByText('Progress, not profiling')).toBeVisible();
  await expect(page.getByText('Evidence, not transcripts')).toBeVisible();
  await expect(page.locator('#adultProgress .adult-metric')).toHaveCount(5);
  await expect(page.locator('.family-card')).toHaveCount(3);
  await expect(page.locator('.boundary-grid .boundary')).toHaveCount(2);
});

test('educator view presents complete foundation and future school gates honestly',async({page})=>{
  await page.goto('/schools.html');
  await expect(page.locator('.track-overview article')).toHaveCount(6);
  await expect(page.locator('.educator-facts span')).toHaveCount(4);
  await expect(page.locator('.pilot-grid article')).toHaveCount(3);
  await expect(page.getByText('Cohort & assignment layer')).toBeVisible();
  await expect(page.getByText('Identity & consent')).toBeVisible();
});

test('Arabic parity holds across journey family educator and safety surfaces',async({page})=>{
  for(const path of ['/learn.html','/families.html','/schools.html','/safety.html']){
    await page.goto(path);
    const ar=page.locator('button[data-lang="ar"]');
    await expect(ar).toBeVisible();
    await ar.click();
    await expect(page.locator('html')).toHaveAttribute('dir','rtl');
    await expect(page.locator('html')).toHaveAttribute('lang','ar');
    expect(await noHorizontalOverflow(page)).toBeTruthy();
  }
});

test('family and educator summaries do not expose raw answer UI',async({page})=>{
  for(const path of ['/families.html','/schools.html']){
    await page.goto(path);
    await expect(page.locator('textarea')).toHaveCount(0);
    await expect(page.locator('input[type="text"]')).toHaveCount(0);
    await expect(page.locator('#adultProgress')).toBeVisible();
  }
});
