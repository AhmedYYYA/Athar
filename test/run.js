/* ATHAR — regression tests.
   Drives the real engine through every stage in both languages.
   Run: node test/run.js */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const root = path.join(__dirname, '..');
let pass = 0, fail = 0;

function check(label, condition, detail) {
  if (condition) { pass++; console.log('  ok   ' + label); }
  else { fail++; console.log('  FAIL ' + label + (detail ? '  -> ' + detail : '')); }
}

/* Inline every <script src> so the page's own bootstrap runs for real.
   JSDOM will not fetch local files, and stubbing the boot would hide
   exactly the kind of load-order bug we want these tests to catch. */
function boot(page) {
  let html = fs.readFileSync(path.join(root, page), 'utf8');

  html = html.replace(/<script src="([^"]+)"><\/script>/g, (whole, src) => {
    const file = path.join(root, src);
    if (!fs.existsSync(file)) throw new Error(page + ' references missing script: ' + src);
    return '<script>' + fs.readFileSync(file, 'utf8') + '<\/script>';
  });

  const errors = [];
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'https://athar.test/' + page,
    pretendToBeVisual: true,
    beforeParse(window) {
      window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
      window.addEventListener('error', e => errors.push(e.message));
    }
  });
  dom.window.__errors = errors;
  return dom.window;
}

/* ---------------- 1. state layer ---------------- */

console.log('\npages boot cleanly');
{
  ['index.html', 'learn.html', 'lesson.html'].forEach(page => {
    const w = boot(page);
    check(page + ': no script errors on load', w.__errors.length === 0, w.__errors.join(' | '));
    check(page + ': ATHAR namespace present', typeof w.ATHAR === 'object');
  });
}

console.log('\nstate layer');
{
  const w = boot('index.html');
  const S = w.ATHAR.state;
  S.reset();
  check('starts with zero traces', S.all().traces === 0);
  check('nothing complete at start', S.isDone('what-is-ai') === false);
  S.completeLesson('what-is-ai', 5, true);
  check('completion recorded', S.isDone('what-is-ai') === true);
  check('traces added', S.all().traces === 5, 'got ' + S.all().traces);
  S.completeLesson('what-is-ai', 5, true);
  check('replay does not double-count traces', S.all().traces === 5, 'got ' + S.all().traces);
  S.awardBadge('first-trace');
  S.awardBadge('first-trace');
  check('badge not duplicated', S.all().badges.length === 1);
  S.reset();
}

/* ---------------- 2. i18n ---------------- */

console.log('\nbilingual layer');
{
  const w = boot('index.html');
  const I = w.ATHAR.i18n;
  I.set('en');
  check('english string resolves', I.t('cta.next') === 'Next');
  check('ltr direction set', w.document.documentElement.getAttribute('dir') === 'ltr');
  I.set('ar');
  check('arabic string resolves', I.t('cta.next') === 'التالي');
  check('rtl direction set', w.document.documentElement.getAttribute('dir') === 'rtl');
  check('lang attribute follows', w.document.documentElement.getAttribute('lang') === 'ar');
  I.set('en');
  check('interpolation works', I.t('lesson.of', { n: 2, total: 9 }).indexOf('2') !== -1,
        I.t('lesson.of', { n: 2, total: 9 }));
}

/* ---------------- 3. content parity ---------------- */

console.log('\ncontent parity (en/ar)');
{
  const w = boot('lesson.html');
  const lesson = w.ATHAR.lessons['what-is-ai'];

  let gaps = [];
  function walk(node, trail) {
    if (node && typeof node === 'object') {
      if ('en' in node && typeof node.en === 'string') {
        if (!('ar' in node) || !node.ar || !node.ar.trim()) gaps.push(trail);
        return;
      }
      Object.keys(node).forEach(k => walk(node[k], trail + '.' + k));
    }
  }
  walk(lesson, 'lesson');
  check('every english string has arabic', gaps.length === 0, gaps.join(', '));

  const w2 = boot('learn.html');
  gaps = [];
  walk(w2.ATHAR.curriculum.tracks, 'curriculum');
  check('curriculum fully bilingual', gaps.length === 0, gaps.join(', '));
}

/* ---------------- 4. engine: full walkthrough ---------------- */

function walkthrough(lang) {
  console.log('\nlesson engine walkthrough [' + lang + ']');
  const w = boot('lesson.html');
  const d = w.document;
  w.ATHAR.state.reset();
  w.ATHAR.i18n.set(lang);

  const nodes = {
    body: d.getElementById('stagebody'),
    stagewrap: d.getElementById('stagewrap'),
    heading: d.getElementById('stageheading'),
    dots: d.getElementById('dots'),
    step: d.getElementById('steplabel'),
    bar: d.getElementById('dots'),
    feedback: d.getElementById('feedback'),
    live: d.getElementById('live'),
    next: d.getElementById('next'),
    back: d.getElementById('back'),
    check: d.getElementById('check'),
    hint: d.getElementById('hint')
  };

  w.ATHAR.engine.start('what-is-ai', nodes);
  const lesson = w.ATHAR.lessons['what-is-ai'];
  const total = lesson.stages.length;

  check('renders first stage', nodes.body.querySelector('.stagetitle') !== null);
  check('back disabled on first stage', nodes.back.disabled === true);
  check('progress dots match stage count', nodes.dots.children.length === total,
        nodes.dots.children.length + ' vs ' + total);

  for (let i = 0; i < total; i++) {
    const stage = lesson.stages[i];
    const title = nodes.body.querySelector('.stagetitle');
    check('stage ' + i + ' (' + stage.type + ') has a title', title && title.textContent.length > 0);

    if (stage.type === 'multi' || stage.type === 'choice') {
      // answer wrongly first to exercise the failure path
      const opts = nodes.body.querySelectorAll('.option');
      check('stage ' + i + ' rendered options', opts.length > 0);

      const wrong = Array.from(opts).find(o => !o._opt.correct);
      if (wrong) {
        wrong.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
        nodes.check.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
        check('stage ' + i + ' rejects a wrong answer',
              nodes.feedback.querySelector('.feedback.no') !== null);
      }

      // now answer correctly
      w.ATHAR.engine.start; // no-op, keep reference
      // re-render the stage cleanly by going back and forward is complex;
      // instead directly select the correct set on the live buttons
      const live = nodes.body.querySelectorAll('.option');
      Array.from(live).forEach(b => {
        const shouldPick = b._opt.correct;
        const isPicked = b.getAttribute('aria-pressed') === 'true';
        if (shouldPick !== isPicked) b.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      });
      nodes.check.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    }

    if (stage.type === 'sort') {
      const cards = nodes.body.querySelectorAll('.sortcard');
      check('stage ' + i + ' rendered sort cards', cards.length === stage.items.length);
      Array.from(cards).forEach(card => {
        const item = card._item;
        const bucketIndex = stage.buckets.findIndex(b => b.id === item.bucket);
        const opts = card.querySelectorAll('.sortopt');
        opts[bucketIndex].dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      });
      nodes.check.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      check('stage ' + i + ' accepts a correct sort',
            nodes.feedback.querySelector('.feedback.ok') !== null);
    }

    if (stage.type === 'train') {
      let guard = 0;
      let btn = nodes.body.querySelector('.trainbtn');
      check('stage ' + i + ' rendered training control', btn !== null);
      while (btn && !btn.hidden && guard++ < 12) {
        btn.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
        btn = nodes.body.querySelector('.trainbtn');
      }
      check('stage ' + i + ' training reaches the end', nodes.next.disabled === false);
    }

    if (stage.type === 'celebrate') {
      check('reward shows traces', nodes.body.querySelectorAll('.tracemark').length === lesson.traces);
      check('lesson marked complete', w.ATHAR.state.isDone('what-is-ai') === true);
      check('badge awarded', w.ATHAR.state.hasBadge('first-trace') === true);
      break;
    }

    // advance
    if (i < total - 1) {
      nodes.next.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    }
  }

  check('reached the final stage', w.ATHAR.state.isDone('what-is-ai') === true);
  w.ATHAR.state.reset();
}

walkthrough('en');
walkthrough('ar');

/* ---------------- 5. hint downgrades evidence ---------------- */

console.log('\nevidence honesty');
{
  const w = boot('lesson.html');
  const d = w.document;
  w.ATHAR.state.reset();
  w.ATHAR.i18n.set('en');

  const nodes = {
    body: d.getElementById('stagebody'), stagewrap: d.getElementById('stagewrap'),
    heading: d.getElementById('stageheading'), dots: d.getElementById('dots'),
    step: d.getElementById('steplabel'), bar: d.getElementById('dots'),
    feedback: d.getElementById('feedback'), live: d.getElementById('live'),
    next: d.getElementById('next'), back: d.getElementById('back'),
    check: d.getElementById('check'), hint: d.getElementById('hint')
  };
  w.ATHAR.engine.start('what-is-ai', nodes);

  // go to stage 1 which has a hint
  nodes.next.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  check('hint button offered where a hint exists', nodes.hint.hidden === false);
  nodes.hint.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  check('hint renders', nodes.feedback.querySelector('.feedback.hint') !== null);

  // finish the lesson quickly
  const lesson = w.ATHAR.lessons['what-is-ai'];
  for (let i = 1; i < lesson.stages.length; i++) {
    const stage = lesson.stages[i];
    if (stage.type === 'multi' || stage.type === 'choice') {
      nodes.body.querySelectorAll('.option').forEach(b => {
        if (b._opt.correct) b.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      });
      nodes.check.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    }
    if (stage.type === 'sort') {
      nodes.body.querySelectorAll('.sortcard').forEach(card => {
        const idx = stage.buckets.findIndex(b => b.id === card._item.bucket);
        card.querySelectorAll('.sortopt')[idx].dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      });
      nodes.check.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    }
    if (stage.type === 'train') {
      let btn = nodes.body.querySelector('.trainbtn'), guard = 0;
      while (btn && !btn.hidden && guard++ < 12) {
        btn.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
        btn = nodes.body.querySelector('.trainbtn');
      }
    }
    if (stage.type === 'celebrate') break;
    nodes.next.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  }

  const rec = w.ATHAR.state.lessonState('what-is-ai');
  check('hint use recorded as supported, not independent', rec && rec.independent === false,
        JSON.stringify(rec));
  w.ATHAR.state.reset();
}

/* ---------------- 6. trail lock logic ---------------- */

console.log('\ntrail lock logic');
{
  const w = boot('learn.html');
  const d = w.document;
  w.ATHAR.state.reset();
  w.ATHAR.i18n.set('en');

  const tracks = d.getElementById('tracks');
  w.ATHAR.trail.render(tracks);

  const stops = tracks.querySelectorAll('.stop');
  check('renders every curriculum stop',
        stops.length === w.ATHAR.curriculum.order().length,
        stops.length + ' vs ' + w.ATHAR.curriculum.order().length);

  const first = stops[0];
  check('first stop is open', !first.classList.contains('locked'));
  check('first stop is flagged as next', first.classList.contains('next-up'));
  check('second stop is locked at start', stops[1].classList.contains('locked'));

  w.ATHAR.state.completeLesson('what-is-ai', 5, true);
  w.ATHAR.trail.render(tracks);
  const after = tracks.querySelectorAll('.stop');
  check('completed stop shows as done', after[0].classList.contains('done'));

  const discs = tracks.querySelectorAll('.stopdisc');
  let labelled = true;
  discs.forEach(x => { if (!x.getAttribute('aria-label')) labelled = false; });
  check('every stop has an accessible label', labelled);

  w.ATHAR.state.reset();
}

/* ---------------- 7. accessibility surface ---------------- */

console.log('\naccessibility surface');
{
  ['index.html', 'learn.html', 'lesson.html'].forEach(page => {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const dom = new JSDOM(html);
    const d = dom.window.document;

    const imgs = d.querySelectorAll('img');
    let allAlt = true;
    imgs.forEach(i => { if (i.getAttribute('alt') === null) allAlt = false; });
    check(page + ': every image has alt', allAlt);

    check(page + ': has a lang attribute', !!d.documentElement.getAttribute('lang'));
    check(page + ': has a dir attribute', !!d.documentElement.getAttribute('dir'));
    check(page + ': has a page title', d.title.trim().length > 0);

    const live = d.querySelector('[aria-live]');
    if (page === 'lesson.html') check(page + ': has a live region', live !== null);

    const skip = d.querySelector('.skip-link');
    if (page !== 'lesson.html') check(page + ': has a skip link', skip !== null);
  });
}

/* ---------------- 8. asset integrity ---------------- */

console.log('\nasset integrity');
{
  const assets = fs.readdirSync(path.join(root, 'assets'));
  const required = ['athar-logo.png', 'athar-mark.png', 'hamdan.png', 'hessa.png',
                    'hamdan-face.png', 'hessa-face.png'];
  required.forEach(a => {
    const p = path.join(root, 'assets', a);
    const exists = fs.existsSync(p);
    const size = exists ? fs.statSync(p).size : 0;
    check('asset present and non-empty: ' + a, exists && size > 1000, size + ' bytes');
  });

  // the old repo shipped multi-MB rasters disguised as SVG; guard against a repeat
  assets.forEach(a => {
    const p = path.join(root, 'assets', a);
    const size = fs.statSync(p).size;
    check('asset under 1MB: ' + a, size < 1024 * 1024, Math.round(size / 1024) + 'KB');
    if (a.endsWith('.svg')) {
      const body = fs.readFileSync(p, 'utf8');
      check('svg is a real vector, not a wrapped raster: ' + a,
            body.indexOf('base64') === -1);
    }
  });

  // every asset referenced in HTML must exist
  ['index.html', 'learn.html', 'lesson.html'].forEach(page => {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const refs = [...html.matchAll(/src="(assets\/[^"]+)"/g)].map(m => m[1]);
    refs.forEach(r => {
      check(page + ' -> ' + r + ' exists', fs.existsSync(path.join(root, r)));
    });
  });

  // engine references companion faces by convention
  ['hamdan', 'hessa'].forEach(n => {
    check('companion face for ' + n, fs.existsSync(path.join(root, 'assets', n + '-face.png')));
  });
}

/* ---------------- 9. no untranslated copy leaks ---------------- */

console.log('\nno untranslated copy');
{
  /* The first Arabic pass shipped a homepage half in English, which also
     mangled punctuation under bidi. This guards that regression. */
  const LATIN_RUN = /[A-Za-z]{4,}/;
  const ALLOWED = ['ATHAR', 'UNESCO', 'UNICEF', 'EN', 'AI'];

  ['index.html', 'learn.html'].forEach(page => {
    const w = boot(page);
    w.ATHAR.i18n.set('ar');
    if (page === 'index.html') {
      w.document.querySelector("button[data-lang='ar']")
        .dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    } else {
      w.ATHAR.trail.render(w.document.getElementById('tracks'));
      w.ATHAR.trail.renderStats(w.document.getElementById('stats'));
      w.ATHAR.trail.renderCompanionPicker(w.document.getElementById('picker'));
      w.ATHAR.i18n.apply();
    }

    const leaks = [];
    w.document.querySelectorAll('main *, footer *, nav *').forEach(node => {
      if (node.children.length > 0) return;
      let text = (node.textContent || '').trim();
      if (!text) return;
      ALLOWED.forEach(a => { text = text.split(a).join(''); });
      if (LATIN_RUN.test(text)) leaks.push(text.slice(0, 48));
    });

    check(page + ': no english left after switching to arabic',
          leaks.length === 0, leaks.slice(0, 4).join(' | '));
  });
}

/* ---------------- 10. arabic numerals ---------------- */

console.log('\narabic numerals');
{
  const w = boot('learn.html');
  w.ATHAR.i18n.set('en');
  check('western digits in english', w.ATHAR.i18n.num(5) === '5');
  w.ATHAR.i18n.set('ar');
  check('arabic-indic digits in arabic', w.ATHAR.i18n.num(5) === '\u0665', w.ATHAR.i18n.num(5));
  check('multi-digit converts', w.ATHAR.i18n.num(12) === '\u0661\u0662');
  const stepLabel = w.ATHAR.i18n.t('lesson.of', { n: 2, total: 9 });
  check('step label uses arabic digits', /[\u0660-\u0669]/.test(stepLabel), stepLabel);
  check('step label has no western digits', !/[0-9]/.test(stepLabel), stepLabel);
}

/* ---------------- summary ---------------- */

console.log('\n' + '='.repeat(46));
console.log('  passed: ' + pass + '   failed: ' + fail);
console.log('='.repeat(46) + '\n');
process.exit(fail === 0 ? 0 : 1);
