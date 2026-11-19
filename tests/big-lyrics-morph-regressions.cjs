const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const app = fs.readFileSync(path.join(__dirname, '..', 'app-main.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '..', 'app.html'), 'utf8');
const start = app.indexOf('const BigLyricsMorph = (() => {');
const end = app.indexOf('function openFullLyricsPlayer() {', start);
assert(start >= 0 && end > start, 'Big Lyrics controller exists');
const controllerCode = app.slice(start, end);
assert(!controllerCode.includes('requestAnimationFrame(resolve)'), 'transition updates must not await paused rendering');
assert(!html.includes('id="miniLyricsExpandToggle"'), 'Animation has no separate settings toggle');
assert(!controllerCode.includes('youtify_mini_lyrics_expand'), 'Old animation setting is ignored');
assert(!controllerCode.includes('setEnabled'), 'Animation cannot be disabled separately');

assert(html.includes('::view-transition-group(*)'), 'CSS view transition animation exists');

// Artwork and lyrics keep a single snapshot. Controls blend during movement.
const oldStart = html.indexOf('::view-transition-old(youtify-vt-art)');
const newStart = html.indexOf('::view-transition-new(youtify-vt-art)');
const oldSharedRule = html.slice(oldStart, html.indexOf('}', oldStart));
const newSharedRule = html.slice(newStart, html.indexOf('}', newStart));
for (const name of ['art', 'title', 'artist', 'lyrics']) {
  assert(oldSharedRule.includes('::view-transition-old(youtify-vt-' + name + ')'));
  assert(newSharedRule.includes('::view-transition-new(youtify-vt-' + name + ')'));
}
assert(/animation:\s*none\s*!important;\s*opacity:\s*0\s*;/.test(oldSharedRule));
assert(/animation:\s*none\s*!important;\s*opacity:\s*1\s*;/.test(newSharedRule));
for (const [layer, fade] of [['old', 'out'], ['new', 'in']]) {
  for (const name of ['progress', 'transport', 'mute', 'volume']) {
    const start = html.indexOf(`::view-transition-${layer}(youtify-vt-${name})`);
    assert(start >= 0);
    const rule = html.slice(start, html.indexOf('}', start));
    assert(rule.includes(`youtify-vt-controls-${fade}`));
    assert(rule.includes('mix-blend-mode: plus-lighter'));
  }
}
assert(/html\.youtify-big-lyrics-view-transition #fullLyricsPlayer\s*,\s*html\.youtify-big-lyrics-view-transition #fullLyricsPlayer \*\s*\{\s*transition:\s*none\s*!important/.test(html),
  'fullscreen CSS transitions do not compete with browser snapshots');


const rect = (x = 0, y = 0, width = 200, height = 100) => ({
  left: x, top: y, right: x + width, bottom: y + height, width, height
});
class Node {
  constructor(name, area = rect()) {
    this.name = name;
    this.area = area;
    this.style = { viewTransitionName: '' };
    this.listeners = new Map();
    const classes = new Set();
    this.classList = {
      add: name => classes.add(name),
      remove: name => classes.delete(name),
      contains: name => classes.has(name)
    };
  }
  getBoundingClientRect() { return this.area; }
  querySelector(selector) { return selector.includes('lyrics-line') ? this.lyrics || null : null; }
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(callback);
  }
  dispatch(type, event = {}) {
    for (const handler of this.listeners.get(type) || []) handler(event);
  }
  setAttribute(name, value) { this[name] = value; }
}

function setup(options = {}) {
  const elements = new Map();
  const selectors = new Map();
  const put = (name, bounds) => {
    const node = new Node(name, bounds || rect());
    elements.set(name, node);
    return node;
  };
  const documentElement = put('html');
  const body = put('body');
  if (!options.classic) body.classList.add('big-lyrics-layout');
  if (options.performance) body.classList.add('performance-mode');
  const overlay = put('fullLyricsPlayer');
  overlay.dataset = { layout: options.minimal ? 'minimal' : 'classic' };
  const embed = put('playerEmbed', options.offscreen ? rect(0, 940) : rect(80, 620, 330, 190));
  const stage = put('playerEmbedStage');
  if (options.eqSelected) stage.classList.add('flipped');
  const lyrics = put('playerEmbedLyricsContent', rect(85, 640, 320, 155));
  if (!options.noLyrics) lyrics.lyrics = new Node('line');
  const fullLyrics = put('fullLyricsContent', rect(80, 100, 810, 650));
  fullLyrics.lyrics = new Node('bigLine');
  for (const key of ['fullLyricsSwapSide',
    'fullLyricsQueueButton','fullLyricsShowLyrics','fullLyricsSettingsOptions',
    'audioPlayer','audioPlayer2']) put(key);

  const mapping = [
    ['#player #playerImg','#fullLyricsPlayer #fullLyricsArt'],
    ['#player #playerTitle','#fullLyricsPlayer #fullLyricsTitle'],
    ['#player #playerArtist','#fullLyricsPlayer #fullLyricsArtist'],
    ['#player .progress-section','#fullLyricsPlayer .full-lyrics-progress-row'],
    ['#player .player-controls','#fullLyricsPlayer .full-lyrics-buttons'],
    ['#player #volumebutton','#fullLyricsPlayer #fullLyricsMute'],
    ['#player .player-right .volume-slider','#fullLyricsPlayer #fullLyricsVolume'],
    ['#player #playerEmbedLyricsContent','#fullLyricsPlayer #fullLyricsContent']
  ];
  for (const [mini, full] of mapping) {
    selectors.set(mini, mini.endsWith('playerEmbedLyricsContent') ? lyrics : put(mini, rect(100, 100, 320, 50)));
    selectors.set(full, full.endsWith('fullLyricsContent') ? fullLyrics : put(full, rect(1050, 100, 420, 50)));
  }

  let open = false, movedBack = 0, calls = 0;
  const FullLyricsPlayer = {
    isOpen: () => open,
    open() { open = true; },
    close() { open = false; }
  };
  const lyricsManager = {
    amActive: true, amEl: { parentElement: null },
    placeAm() { movedBack++; }
  };
  const doc = {
    body, documentElement, hidden: false, getElementById: id => elements.get(id) || null,
    querySelector: selector => selectors.get(selector) || null,
    listeners: new Map(),
    addEventListener(type, callback) {
      if (!this.listeners.has(type)) this.listeners.set(type, []);
      this.listeners.get(type).push(callback);
    },
    dispatch(type) { for (const handler of this.listeners.get(type) || []) handler(); }
  };
  const pending = [], transitions = [];
  let skipped = 0;
  if (!options.unsupported) {
    doc.startViewTransition = update => {
      calls++;
      let finish;
      const finished = new Promise(resolve => { finish = resolve; });
      const transition = {
        finished, skipTransition() { skipped++; finish(); }
      };
      transitions.push(transition);
      pending.push(() => { update(); finish(); });
      return transition;
    };
  }

  const storage = new Map([['youtify_mini_lyrics_expand', options.disabled ? 'off' : 'on']]);
  const win = {
    innerWidth: options.mobile ? 760 : 1720, innerHeight: 900,
    matchMedia: () => ({ matches: !!options.reduceMotion }),
    listeners: new Map(),
    addEventListener(type, callback) {
      if (!this.listeners.has(type)) this.listeners.set(type, []);
      this.listeners.get(type).push(callback);
    },
    dispatch(type) { for (const handler of this.listeners.get(type) || []) handler(); }
  };
  const load = new Function('document','window','localStorage','getComputedStyle',
    'FullLyricsPlayer','lyricsManager','console',controllerCode + '\nreturn BigLyricsMorph;');
  const controller = load(doc,win,{
    getItem: k => storage.get(k),setItem: (k,v)=>storage.set(k,v)
  },node => ({
    display: !open && node === overlay ? 'none' :
      open && node !== overlay && node.name.startsWith('#player ') ? 'none' : 'block',
    visibility: 'visible'
  }),FullLyricsPlayer,lyricsManager,{warn(){}});
  doc.dispatch('DOMContentLoaded');

  function flush() {
    for (let i = 0; i < 5; i++) {
      const jobs = pending.splice(0);
      jobs.forEach(job => job());
    }
  }
  const clean = () => [...selectors.values()].every(node => node.style.viewTransitionName === '') &&
    !documentElement.classList.contains('youtify-big-lyrics-view-transition');
  return { controller, elements, selectors, doc, win, flush, clean,
    storage, get open() { return open; }, get calls() { return calls; },
    get skipped() { return skipped; }, get movedBack() { return movedBack; },
    get transitions() { return transitions; }
  };
}

async function check(name, run) {
  await run();
  console.log('PASS ' + name);
}
(async () => {
  await check('all 8 genuine elements participate when opening', async () => {
    const t = setup();
    t.controller.open();
    assert.equal(t.calls, 1);
    assert.equal([...t.selectors.values()].filter(n => n.style.viewTransitionName.startsWith('youtify-vt-')).length, 8);
    t.flush(); await Promise.resolve(); await Promise.resolve();
    assert(t.open); assert(t.clean());
    t.controller.close();
    t.flush(); await Promise.resolve(); await Promise.resolve();
    assert(!t.open); assert(t.clean()); assert.equal(t.calls, 2);
    assert(t.movedBack > 0);
  });
  for (const [name, options] of Object.entries({
    classic: { classic:true }, unsupported: { unsupported:true },
    minimal: { minimal:true }, mobile: { mobile:true },
    reducedMotion: { reduceMotion:true }, performance: { performance:true },
    eqSelected: { eqSelected:true }, noLyrics: { noLyrics:true },
    offscreen: { offscreen:true }
  })) {
    await check('instant and clean fallback: '+name, async () => {
      const t = setup(options);
      t.controller.open(); t.flush(); await Promise.resolve();
      assert(t.open); assert.equal(t.calls,0);
      t.controller.close();t.flush();await Promise.resolve();
      assert(!t.open);assert(t.clean());
    });
  }
  await check('rapid open then close cancels stale callback', async () => {
    const t=setup();t.controller.open();t.controller.close();t.flush();
    await Promise.resolve();await Promise.resolve();
    assert(!t.open);assert(t.clean());assert(t.skipped>=1);
  });
  await check('audio loading finishes a pending open and clears names', async () => {
    const t=setup();t.controller.open();
    t.elements.get('audioPlayer').dispatch('loadstart');t.flush();
    await Promise.resolve();await Promise.resolve();
    assert(t.open);assert(t.clean());assert(t.skipped>=1);
  });
  await check('old disabled preference no longer blocks Big Lyrics morph', async () => {
    const t=setup({disabled:true});
    t.controller.open();assert.equal(t.calls,1);t.flush();
    await Promise.resolve();await Promise.resolve();
    assert(t.open);assert(t.clean());
  });
  await check('switching to Classic finishes a pending open', async () => {
    const t=setup();
    t.controller.open();
    t.doc.body.classList.remove('big-lyrics-layout');
    t.doc.dispatch('youtify:app-layout-change');
    t.flush();
    await Promise.resolve();
    assert(t.open); assert(t.clean()); assert.equal(t.skipped, 1);
    t.controller.close();
    assert(!t.open); assert.equal(t.calls, 1);
  });
  await check('resize finishes both pending open and pending close', async () => {
    const t = setup();
    t.controller.open();
    t.win.dispatch('resize');
    t.flush();
    await Promise.resolve();
    assert(t.open); assert(t.clean());
    t.controller.close();
    t.win.dispatch('resize');
    t.flush();
    await Promise.resolve();
    assert(!t.open); assert(t.clean()); assert.equal(t.skipped, 2);
  });
  await check('closing uses fallback if either lyrics pane is hidden', async () => {
    const cases = [
      t => t.elements.get('playerEmbedStage').classList.add('flipped'),
      t => t.elements.get('playerEmbedStage').classList.add('show-queue'),
      t => { t.elements.get('fullLyricsContent').hidden = true; }
    ];
    for (const hideLyrics of cases) {
      const t = setup();
      t.controller.open();
      t.flush();
      await Promise.resolve();
      hideLyrics(t);
      t.controller.close();
      assert(!t.open); assert(t.clean()); assert.equal(t.calls, 1);
    }
  });
  await check('open and close repeatedly restore names', async () => {
    const t=setup();
    for(let i=0;i<5;i++){
      t.controller.open();t.flush();await Promise.resolve();await Promise.resolve();
      assert(t.open);assert(t.clean());
      t.controller.close();t.flush();await Promise.resolve();await Promise.resolve();
      assert(!t.open);assert(t.clean());
    }
  });
  console.log('Big Lyrics browser transition regression checks passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
