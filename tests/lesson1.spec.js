const { test, expect } = require('@playwright/test');

async function reset(page) {
  await page.goto('/lesson1.html');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

async function chooseAge(page, age) {
  await page.getByRole('button', { name: /Age/ }).click();
  await page.getByRole('button', { name: `Age ${age}` }).click();
}

async function chooseCompanion(page, name) {
  await page.getByRole('button', { name: 'Companion' }).click();
  await page.getByRole('button', { name: new RegExp(name, 'i') }).click();
}

test('entry renders and blocks forward skipping', async ({ page }) => {
  await reset(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: /What Is AI/ })).toBeVisible();
  await expect(page.locator('[data-goto="2"]')).toBeDisabled();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-goto="1"]')).toHaveClass(/active/);
});

test('Arabic RTL and age depth persist after reload', async ({ page }) => {
  await reset(page);
  await chooseAge(page, '10–12');
  await page.getByRole('button', { name: 'العربية' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('#ageLabel')).toHaveText('10–12');
});

test('optional companions: none, Hamdan, Hessa', async ({ page }) => {
  await reset(page);
  await expect(page.locator('#companionPanel')).toBeHidden();
  await chooseCompanion(page, 'Hamdan');
  await expect(page.locator('#companionPanel')).toBeVisible();
  await expect(page.locator('#companionName')).toContainText('Hamdan');
  await chooseCompanion(page, 'Hessa');
  await expect(page.locator('#companionName')).toContainText('Hessa');
  await chooseCompanion(page, 'No companion');
  await expect(page.locator('#companionPanel')).toBeHidden();
});

test('privacy mastery blocks progression until correct', async ({ page }) => {
  await reset(page);
  await page.evaluate(() => localStorage.setItem('athar.lesson1.v2', JSON.stringify({stage:7,lang:'en',age:'7-9',companion:'none',done:[0,1,2,3,4,5,6],evidence:{recognition:'independent',patterns:'independent',verification:'independent',privacy:'not-yet',agency:'not-yet'},hints:{},missionStep:0,completed:false})));
  await page.reload();
  await page.getByRole('button', { name: /Favourite animal/ }).click();
  await page.getByRole('button', { name: /Check privacy choices/ }).click();
  await expect(page.locator('[data-goto="8"]')).toBeDisabled();
  for (const name of ['Home address','Password','School or identifying location','Phone number']) await page.getByRole('button', { name: new RegExp(name) }).click();
  await page.getByRole('button', { name: /Favourite animal/ }).click();
  await page.getByRole('button', { name: /Check privacy choices/ }).click();
  await expect(page.locator('[data-goto="8"]')).not.toBeDisabled();
});

test('Stage 08 mission completes five competency steps and persists', async ({ page }) => {
  await reset(page);
  await page.evaluate(() => localStorage.setItem('athar.lesson1.v2', JSON.stringify({stage:8,lang:'en',age:'10-12',companion:'none',done:[0,1,2,3,4,5,6,7],evidence:{recognition:'independent',patterns:'independent',verification:'independent',privacy:'independent',agency:'not-yet'},hints:{},missionStep:0,completed:false})));
  await page.reload();
  const correct = [/Look for patterns in plant pictures/,/Useful examples of different plants/,/Check more information/,/Do not water it yet/,/Keep it private/];
  for (let i=0;i<5;i++) {
    await expect(page.getByText(`${i+1}/5`)).toBeVisible();
    await page.getByRole('button', { name: correct[i] }).click();
    await page.getByRole('button', { name: i===4 ? /Complete mission/ : /Continue mission/ }).click();
    if (i<4) { await page.reload(); await expect(page.getByText(`${i+2}/5`)).toBeVisible(); }
  }
  await expect(page.getByRole('heading', { name: /My First AI Discovery/ })).toBeVisible();
});

test('health/safety transfer requires trusted adult', async ({ page }) => {
  await reset(page);
  await page.evaluate(() => localStorage.setItem('athar.lesson1.v2', JSON.stringify({stage:6,lang:'en',age:'10-12',companion:'none',done:[0,1,2,3,4,5],evidence:{recognition:'independent',patterns:'independent',verification:'not-yet',privacy:'not-yet',agency:'not-yet'},hints:{},missionStep:0,completed:false})));
  await page.reload();
  await page.getByRole('button', { name: 'Check it' }).click();
  await page.getByRole('button', { name: /Check my choice/ }).click();
  await expect(page.getByText(/medicine/i)).toBeVisible();
  await page.getByRole('button', { name: /Ask a trusted adult/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await expect(page.locator('[data-goto="7"]')).not.toBeDisabled();
});

test('keyboard focus and no horizontal overflow at phone size', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await reset(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBeFalsy();
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});

test('render snapshots', async ({ page }, testInfo) => {
  const cases = [
    { name:'phone-en-7', width:375, height:812, lang:'en', age:'7-9', stage:0 },
    { name:'phone-ar-8', width:375, height:812, lang:'ar', age:'7-9', stage:1 },
    { name:'tablet-en-11', width:768, height:1024, lang:'en', age:'10-12', stage:4 },
    { name:'desktop-ar-12', width:1440, height:1000, lang:'ar', age:'10-12', stage:8 }
  ];
  for (const c of cases) {
    await page.setViewportSize({width:c.width,height:c.height});
    await page.goto('/lesson1.html');
    await page.evaluate(c => localStorage.setItem('athar.lesson1.v2', JSON.stringify({stage:c.stage,lang:c.lang,age:c.age,companion:'none',done:Array.from({length:c.stage},(_,i)=>i),evidence:{recognition:'independent',patterns:'independent',verification:'independent',privacy:'independent',agency:'not-yet'},hints:{},missionStep:0,completed:false})), c);
    await page.reload();
    await page.screenshot({ path: testInfo.outputPath(`${c.name}.png`), fullPage:true });
  }
});