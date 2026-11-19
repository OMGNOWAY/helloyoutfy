// Focused Big Lyrics transition tests. No browser or external packages needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'app-main.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '..', 'app.html'), 'utf8');
const start = source.indexOf('const BigLyricsMorph = (() => {');
const stop = source.indexOf('function openFullLyricsPlayer() {', start);
assert(start >= 0 && stop > start, 'transition controller exists');
const moduleSource = source.slice(start, stop);
const bounds = (x, y, width = 100, height = 32) => ({
  left: x, top: y, right: x + width, bottom: y + height, width, height
});

class Node {
  constructor(name, rect = bounds(0, 0), tagName = 'DIV') {
    Object.assign(this, {
      name, id: name, rect, tagName, dataset: {}, style: {}, attrs: {},
      textContent: name, clientWidth: rect.width, value: 50, max: 100,
      listeners: {}, map: {}, lines: [], removed: false
    });
    const names = new Set();
    this.classList = {
      contains: name => names.has(name),
      add: (...items) => items.forEach(item => names.add(item)),
      remove: (...items) => items.forEach(item => names.delete(item))
    };
  }
  getBoundingClientRect() { return this.rect; }
  getAttribute(name) { return this.attrs[name] ?? null; }
  setAttribute(name, value) { this.attrs[name] = value; }
  querySelector(selector) {
    if (selector.startsWith('.lyrics-line')) return this.lines[0] || null;
    return this.map[selector] || null;
  }
  querySelectorAll(selector) {
    if (selector.startsWith('.lyrics-line')) return this.lines;
    return [];
  }
  appendChild(node) { return node; }
  cloneNode() { return new Node(this.name + '-clone', this.rect, this.tagName); }
  remove() { this.removed = true; }
  addEventListener(name, callback) { (this.listeners[name] ||= []).push(callback); }
  dispatch(name, event = {}) { for (const callback of this.listeners[name] || []) callback(event); }
  animate(frames) {
    this.onAnimate?.(frames);
    return { finished: Promise.resolve(), cancel() {} };
  }
}

function createEnvironment(options = {}) {
  const elements = new Map();
  const add = (name, rect, tagName) => {
    const node = new Node(name, rect, tagName);
    elements.set(name, node);
    return node;
  };
  const player = add('player', bounds(0, 0, 580, 900));
  const overlay = add('fullLyricsPlayer', bounds(0, 0, 1720, 900));
  overlay.dataset.layout = options.minimal ? 'minimal' : 'classic';
  overlay.dataset.playerSide = options.albumRight ? 'right' : 'left';
  const mini = add('playerEmbed', bounds(130, options.offscreen ? 930 : 610, 370, 185));
  const stage = add('playerEmbedStage', bounds(0, 0));
  if (options.eqSelected) stage.classList.add('flipped');
  const miniLyrics = add('playerEmbedLyricsContent', bounds(135, 630, 360, 160));
  const fullLyrics = add('fullLyricsContent', bounds(options.albumRight ? 65 : 610, 125, 865, 650));
  if (!options.emptyLyrics) {
    miniLyrics.lines = [new Node('m1', bounds(145, 665, 350, 24)), new Node('m2', bounds(145, 710, 350, 24))];
    fullLyrics.lines = [new Node('f1', bounds(65, 260, 800, 52)), new Node('f2', bounds(65, 370, 800, 52))];
    miniLyrics.lines[1].classList.add('active');
    fullLyrics.lines[1].classList.add('active');
  }
  const fx = options.albumRight ? 1150 : 145;
  player.map = {
    '.player-controls-section': new Node('mini-controls', bounds(145, 490, 355, 90)),
    '.player-right': new Node('mini-volume', bounds(145, 590, 355, 42)),
    '#playerImg': new Node('mini-art', bounds(140, 50, 370, 370), 'IMG'),
    '#playerTitle': new Node('mini-title', bounds(140, 435, 375, 40)),
    '#playerArtist': new Node('mini-artist', bounds(140, 475, 375, 24))
  };
  overlay.map = {
    '.full-lyrics-controls': new Node('native-controls',
      options.minimal ? bounds(0, 0, 0, 0) : bounds(fx, 665, 420, 170)),
    '.full-lyrics-backdrop': new Node('backdrop', bounds(0, 0, 1720, 900)),
    '#fullLyricsArt': new Node('full-art', bounds(fx, 55, 480, 480), 'IMG'),
    '#fullLyricsTitle': new Node('full-title', bounds(fx, 560, 430, 42)),
    '#fullLyricsArtist': new Node('full-artist', bounds(fx, 610, 430, 24))
  };
  player.map['#playerImg'].attrs.src = 'test-cover.jpg';
  overlay.map['#fullLyricsArt'].attrs.src = 'test-cover.jpg';
  elements.set('playerImg', player.map['#playerImg']);
  for (const name of ['mainContent', 'sidebar', 'miniLyricsExpandToggle',
    'fullLyricsSwapSide', 'fullLyricsSettingsOptions', 'fullLyricsQueueButton',
    'fullLyricsShowLyrics', 'audioPlayer', 'audioPlayer2']) add(name, bounds(0, 0, 32, 32));

  const ghosts = [], animations = [], frames = new Map(), documentListeners = {};
  const body = { classList: new Node('body').classList, appendChild(node) { ghosts.push(node); return node; } };
  body.classList.add('big-lyrics-layout');
  if (options.performance) body.classList.add('performance-mode');
  for (const el of [overlay, fullLyrics, ...Object.values(overlay.map)]) {
    el.onAnimate = keyframes => animations.push({ name: el.name, keyframes });
  }
  const document = {
    body, hidden: false, getElementById: id => elements.get(id) || null,
    createElement: tagName => new Node('ghost', bounds(0, 0), tagName.toUpperCase()),
    addEventListener(name, callback) { (documentListeners[name] ||= []).push(callback); }
  };
  let frameId = 0, opened = false, closeCount = 0;
  const requestAnimationFrame = callback => { frames.set(++frameId, callback); return frameId; };
  const cancelAnimationFrame = id => frames.delete(id);
  const FullLyricsPlayer = {
    isOpen: () => opened, open() { opened = true; }, close() {
      opened = false;
      closeCount++;
      overlay.classList.remove('open');
      for (const id of ['mainContent', 'sidebar', 'player']) elements.get(id).style.display = '';
    }, recenter() {}
  };
  const win = {
    innerWidth: options.mobile ? 800 : 1720, innerHeight: 900,
    matchMedia: () => ({ matches: !!options.reduceMotion }), listeners: {},
    addEventListener(name, callback) { (this.listeners[name] ||= []).push(callback); }
  };
  const queue = [{ title: 'Test song' }];
  const storage = { youtify_mini_lyrics_expand: options.disabled ? 'off' : 'on' };
  const load = new Function('document','window','localStorage','Element','getComputedStyle',
    'requestAnimationFrame','cancelAnimationFrame','FullLyricsPlayer','lyricsManager',
    'audio','console','queue','currentTrackIndex',moduleSource + '\nreturn BigLyricsMorph;');
  const controller = load(document, win, {
    getItem: key => storage[key], setItem: (key, value) => { storage[key] = value; }
  }, Node, node => ({
    display: options.hideMini && node === mini ? 'none' : 'block',
    visibility: 'visible', fontSize: node.name.startsWith('f') ? '40px' : '17px',
    fontFamily: 'Arial', fontWeight: '700', color: '#fff',
    letterSpacing: '0px', lineHeight: '1.2', backgroundColor: 'transparent',
    borderRadius: '8px'
  }), requestAnimationFrame, cancelAnimationFrame, FullLyricsPlayer,
  null, { currentTime: 40 }, { warn() {} }, queue, 0);
  for (const callback of documentListeners.DOMContentLoaded || []) callback();

  const tick = () => {
    const jobs = [...frames.values()];
    frames.clear();
    jobs.forEach(job => job());
  };
  const settle = async () => {
    for (let index = 0; index < 24; index++) await Promise.resolve();
  };
  const finish = async () => { tick(); tick(); await settle(); tick(); await settle(); };
  const isClean = () => ghosts.every(ghost => ghost.removed) &&
    !body.classList.contains('big-lyrics-morph-closing') &&
    !overlay.classList.contains('big-lyrics-morph-entering') &&
    !overlay.classList.contains('big-lyrics-morph-exiting') &&
    !overlay.classList.contains('big-lyrics-morph-finalizing');
  return {
    controller, queue, win, elements, overlay, ghosts, animations, finish, tick, settle, isClean,
    get opened() { return opened; }, get closeCount() { return closeCount; }
  };
}

async function test(name, run) {
  await run();
  process.stdout.write('PASS ' + name + '\n');
}

(async () => {
  assert(html.includes('big-lyrics-morph-finalizing'), 'opaque exit flash guard is present');
  assert(source.includes("classList.contains('big-lyrics-morph-lyrics-running')"),
    'recenter does not fight the lyric animation');

  for (const albumRight of [false, true]) {
    await test('opening and closing with album ' + (albumRight ? 'right' : 'left'), async () => {
      const env = createEnvironment({ albumRight });
      env.controller.open();
      await env.finish();
      assert(env.opened);
      assert.equal(env.animations.filter(a => a.name === 'native-controls').length, 1);
      assert.equal(env.animations.filter(a => a.name === 'fullLyricsContent').length, 1);
      assert(env.isClean());
      env.controller.close();
      await env.finish();
      assert(!env.opened);
      assert.equal(env.animations.filter(a => a.name === 'native-controls').length, 2);
      assert.equal(env.animations.filter(a => a.name === 'fullLyricsContent').length, 2);
      assert.equal(env.ghosts.length, 6);
      assert(env.isClean());
    });
  }

  for (const [name, options] of Object.entries({
    minimalLayout: { minimal: true }, mobile: { mobile: true },
    reducedMotion: { reduceMotion: true }, performanceMode: { performance: true },
    experimentalToggleOff: { disabled: true }, equalizerSelected: { eqSelected: true },
    miniOffscreen: { offscreen: true }, lyricsNotLoaded: { emptyLyrics: true }
  })) {
    await test('instant fallback: ' + name, async () => {
      const env = createEnvironment(options);
      env.controller.open();
      await env.finish();
      assert(env.opened);
      assert.equal(env.ghosts.length, 0);
      env.controller.close();
      await env.finish();
      assert(!env.opened);
      assert(env.isClean());
    });
  }

  await test('switching tracks uses instant close instead of stale positions', async () => {
    const env = createEnvironment();
    env.controller.open();
    await env.finish();
    env.queue[0] = { title: 'Different track' };
    env.controller.close();
    await env.finish();
    assert(!env.opened);
    assert.equal(env.animations.filter(a => a.name === 'native-controls').length, 1);
    assert(env.isClean());
  });

  await test('rapid close before entrance frames finish restores normal UI', async () => {
    const env = createEnvironment();
    env.controller.open();
    env.controller.close();
    await env.finish();
    assert(!env.opened);
    assert(env.isClean());
  });

  await test('resize during exit cannot strand the fullscreen overlay', async () => {
    const env = createEnvironment();
    env.controller.open();
    await env.finish();
    env.controller.close();
    env.win.listeners.resize[0]();
    await env.finish();
    assert(!env.opened);
    assert(env.isClean());
  });

  await test('reopening during exit does not retain hidden classes', async () => {
    const env = createEnvironment();
    env.controller.open();
    await env.finish();
    env.controller.close();
    env.controller.open();
    await env.finish();
    assert(env.opened);
    assert(env.isClean());
  });

  process.stdout.write('Big Lyrics transition regression checks passed.\n');
})().catch(error => { console.error(error); process.exitCode = 1; });
