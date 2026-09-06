const {test,expect}=require('@playwright/test');

async function contentOverflowReport(page){
  return page.evaluate(()=>{
    const vw=document.documentElement.clientWidth;
    const candidates=[...document.querySelectorAll('header, header *, main, main *, footer, footer *')];
    const offenders=candidates.filter(el=>{
      if(el.classList&&el.classList.contains('skip-link'))return false;
      if(el.closest&&el.closest('.glass-bg'))return false;
      if(el.closest&&el.closest('[aria-hidden="true"]'))return false;
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden')return false;
      if(!el.getClientRects().length)return false;
      const r=el.getBoundingClientRect();
      return r.width>1&&(r.right>vw+1||r.left<-1);
    }).map(el=>{
      const r=el.getBoundingClientRect();
      return {tag:el.tagName.toLowerCase(),cls:typeof el.className==='string'?el.className:'',id:el.id||'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};
    }).sort((a,b)=>Math.max(b.right-vw,-b.left)-Math.max(a.right-vw,-a.left)).slice(0,8);
    return {clientWidth:vw,offenders};
  });
}

const shellPages=['/learn.html','/families.html','/schools.html','/safety.html'];

test.beforeEach(async({page})=>{
  await page.goto('/learn.html');
  await page.evaluate(()=>{ if(window.ATHAR&&ATHAR.state) ATHAR.state.reset(); localStorage.setItem('athar.lang','en'); });
});

test('staging keeps the approved 16-mission foundation and both age bands',async({page})=>{
  await page.goto('/learn.html');
  await expect(page.locator('.mission')).toHaveCount(16);
  const young=page.locator('button[data-age-band="7-9"]');
  const older=page.locator('button[data-age-band="10-12"]');
  await expect(young).toBeVisible();
  await expect(older).toBeVisible();
  await older.click();
  await expect(older).toHaveAttribute('aria-pressed','true');
  await page.reload();
  await expect(page.locator('button[data-age-band="10-12"]')).toHaveAttribute('aria-pressed','true');
});

test('companion choice persists and no-companion remains an equal option',async({page})=>{
  await page.goto('/learn.html');
  await expect(page.locator('[data-companion="hamdan"]')).toBeVisible();
  await expect(page.locator('[data-companion="hessa"]')).toBeVisible();
  await expect(page.locator('[data-companion="none"]')).toBeVisible();
  await page.locator('[data-companion="hamdan"]').click();
  await page.reload();
  await expect(page.locator('[data-companion="hamdan"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-companion="none"]').click();
  await page.reload();
  await expect(page.locator('[data-companion="none"]')).toHaveAttribute('aria-pressed','true');
});

test('progress evidence survives across learner, family and educator views',async({page})=>{
  await page.goto('/learn.html');
  await page.evaluate(()=>{
    ATHAR.state.completeLesson('what-is-ai',5,false);
    ATHAR.state.completeLesson('patterns',5,true);
    ATHAR.state.awardBadge('ai-explorer');
    ATHAR.state.awardPassport('safety','ai-is-tool');
    ATHAR.state.awardPassport('skills','patterns');
  });
  await page.reload();
  await expect(page.locator('.mission.done')).toHaveCount(2);
  await page.goto('/families.html');
  await expect(page.locator('#adultProgress .adult-metric').first()).toContainText('2/16');
  await page.goto('/schools.html');
  await expect(page.locator('#adultProgress .adult-evidence-chip')).toHaveCount(3);
});

test('foundation completion creates the approved achievement summary',async({page})=>{
  await page.goto('/learn.html');
  await page.evaluate(()=>{
    ATHAR.curriculum.order().forEach(x=>ATHAR.state.completeLesson(x.lesson.id,x.lesson.traces,false));
    location.reload();
  });
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('.foundation-summary')).toBeVisible();
  await expect(page.locator('.finish-metric')).toHaveCount(4);
  await expect(page.locator('.foundation-ribbon')).toBeVisible();
});

test('Arabic staging shell stays RTL and clean on desktop and mobile',async({page})=>{
  for(const viewport of [{width:1280,height:900},{width:390,height:844}]){
    await page.setViewportSize(viewport);
    for(const url of shellPages){
      await page.goto(url);
      const ar=page.locator('button[data-lang="ar"]');
      if(await ar.count())await ar.first().click();
      await expect(page.locator('html')).toHaveAttribute('dir','rtl');
      const report=await contentOverflowReport(page);
      expect(report.offenders,`${url} @ ${viewport.width}x${viewport.height} visible overflow=${JSON.stringify(report.offenders)}`).toEqual([]);
    }
  }
});

test('core staging pages expose keyboard skip navigation',async({page})=>{
  for(const url of shellPages){
    await page.goto(url);
    const skip=page.locator('.skip-link');
    await expect(skip).toHaveCount(1);
    await skip.focus();
    await expect(skip).toBeFocused();
  }
});
