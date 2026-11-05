const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '..', 'app-main.js'), 'utf8');
function section(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  assert(a >= 0 && b > a);
  return source.slice(a, b);
}
function fixture() {
  const track = { title: 'Song', artist: 'Artist' };
  const ctx = vm.createContext({ console, queue: [track], currentTrackIndex: 0,
    audio: { currentTime: 0, duration: 180 }, window: {}, AbortController,
    localStorage: { getItem: () => null }, toast() {}, setTimeout, clearTimeout });
  vm.runInContext(section('class UnifiedLyricsManager {', '// LYRICS SETTINGS UI') + '\nthis.Manager = UnifiedLyricsManager;', ctx);
  vm.runInContext(section('class Utils {', '// Expose globally'), ctx);
  const manager = Object.assign(Object.create(ctx.Manager.prototype), {
    cache: new Map(), parsedLines: [], isOpen: true, amToken: 0,
    exitAm() { this.amActive = false; this.amToken++; }, loadAmOffset() {},
    updateFetchButtonVisibility() {}, showLoading() {}, renderLyrics() {},
    saveLyricsToDB: async () => {}, showError() {}
  });
  return { ctx, manager, track };
}
test('a delayed storage lookup cannot overwrite a manual refresh', async () => {
  const { ctx, manager: m, track } = fixture();
  let resolve;
  m.getLyricsFromDB = () => new Promise(done => resolve = done);
  const old = m.onTrackChange();
  m.tryAm = async () => [{ text: 'Fresh lyrics', timestamp: 1000 }];
  await m.fetchLyrics(track, true);
  resolve({ source: 'genius', lyrics: 'Old lyrics', parsedLines: [{ text: 'Old lyrics' }] });
  await old;
  assert.equal(m.currentSource, 'amlyrics');
  assert.equal(m.parsedLines[0].text, 'Fresh lyrics');
});
test('a delayed storage lookup cannot overwrite imported lyrics', async () => {
  const { manager: m } = fixture();
  let resolve;
  m.getLyricsFromDB = () => new Promise(done => resolve = done);
  const old = m.onTrackChange();
  await m.importLyricsFile({ size: 20, text: async () => '[00:01]Imported lyrics' });
  resolve({ source: 'genius', lyrics: 'Old lyrics', parsedLines: [{ text: 'Old lyrics' }] });
  await old;
  assert.equal(m.currentSource, 'imported-lrc');
  assert.equal(m.parsedLines[0].text, 'Imported lyrics');
});
function popoutFixture() {
  const { ctx, manager } = fixture();
  const nodes = Object.fromEntries(['pipLineMode', 'pipLyrics', 'pipCurrentLine'].map(id => [id, {
    style: {}, textContent: '', innerHTML: '', classList: { remove() {}, add() {} }, querySelector() { return null; }
  }]));
  ctx.pipWindow = { document: { getElementById: id => nodes[id] } };
  ctx.document = { getElementById: () => null, createElement: () => ({
    textContent: '', get innerHTML() {
      return this.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }) };
  ctx.lyricsManager = manager;
  vm.runInContext(section('  function hasRealTiming() {', '  async function open() {'), ctx);
  return { ctx, manager, nodes };
}
test('popout updates when a new song has the same current line index', () => {
  const { ctx, manager: m, nodes } = popoutFixture();
  m.currentSource = 'spotify'; m.currentLineIndex = 0;
  m.parsedLines = [{ text: 'First song' }]; ctx.syncLyrics();
  m.parsedLines = [{ text: 'Next song' }]; ctx.syncLyrics();
  assert.equal(nodes.pipCurrentLine.textContent, 'Next song');
});
test('popout displays unsynced am-lyrics without copying a shadow DOM host', () => {
  const { ctx, manager: m, nodes } = popoutFixture();
  m.currentSource = 'amlyrics'; m.amEl = { cachedIsUnsynced: true };
  m.parsedLines = [{ text: 'First <line>' }, { text: 'Second & line' }];
  ctx.syncLyrics();
  assert.match(nodes.pipLyrics.innerHTML, /First &lt;line&gt;/);
  assert.match(nodes.pipLyrics.innerHTML, /Second &amp; line/);
  assert(!nodes.pipLyrics.innerHTML.includes('onclick='));
});
test('am line clicks respect unsynced lyrics and clamp negative offsets', async () => {
  const { ctx, manager: m } = fixture();
  const listeners = {};
  const el = { addEventListener: (name, handler) => listeners[name] = handler,
    fetchLyrics: async () => {}, cachedIsUnsynced: false };
  ctx.loadAmLyrics = async () => {};
  ctx.document = { createElement: () => el, body: {}, documentElement: {} };
  ctx.getComputedStyle = () => ({ fontFamily: 'inherit', getPropertyValue: () => '#fff' });
  m.applyAmFocus = () => {};
  await m.ensureAm();
  m.amOffsetMs = -2000;
  listeners['line-click']({ detail: { timestamp: 1000 } });
  assert.equal(ctx.audio.currentTime, 0);
  el.cachedIsUnsynced = true; ctx.audio.currentTime = 42;
  listeners['line-click']({ detail: { timestamp: 0 } });
  assert.equal(ctx.audio.currentTime, 42);
});
test('changing songs cancels an active request and still loads the new saved lyrics', async () => {
  const { ctx, manager: m } = fixture();
  m.isFetching = true; m.fetchingKey = 'previous-song';
  ctx.queue = [{ title: 'Next', artist: 'Artist' }];
  m.getLyricsFromDB = async () => ({ source: 'genius', lyrics: 'Next lyrics', parsedLines: [{ text: 'Next lyrics' }] });
  await m.onTrackChange();
  assert.equal(m.parsedLines[0].text, 'Next lyrics');
  assert.equal(m.isFetching, false);
});
test('opening full lyrics waits for saved lyrics without starting a competing request', () => {
  const { ctx } = fixture();
  const nodes = new Map();
  const node = () => ({ style: {}, dataset: {}, textContent: '', classList: { add() {}, remove() {} },
    setAttribute() {}, querySelectorAll: () => [], querySelector: () => null });
  for (const id of ['fullLyricsPlayer', 'mainContent', 'sidebar', 'player']) nodes.set(id, node());
  ctx.document = { getElementById: id => nodes.get(id) || null, body: node() };
  ctx.isPlaying1 = false; ctx.isPlaying2 = false;
  let loads = 0, fetches = 0;
  ctx.lyricsManager = { onTrackChange() { loads++; }, fetchLyrics() { fetches++; }, parsedLines: [] };
  vm.runInContext(section('const FullLyricsPlayer =', 'function openFullLyricsPlayer()') + '\nFullLyricsPlayer.open();', ctx);
  assert.equal(loads, 1);
  assert.equal(fetches, 0);
});

function overlapFixture(height = 200) {
  const { ctx, manager: m } = fixture();
  const lines = [0, 1].map((index) => ({
    offsetTop: 100 + index * 60, height: 40,
    classList: { contains: name => name === 'lyrics-line' || name === 'active' },
    getBoundingClientRect() { const top = this.offsetTop - container.scrollTop; return { top, bottom: top + this.height, height: this.height }; }
  }));
  const container = { scrollTop: 152, classList: { contains: () => false },
    getBoundingClientRect: () => ({ top: 0, bottom: height, height }),
    scrollTo({ top }) { this.scrollTop = top; this.scrolls++; }, scrolls: 0 };
  const root = { contains: line => lines.includes(line),
    querySelectorAll: () => lines,
    querySelector: selector => selector === '.lyrics-container' ? container : lines[0] };
  m.amEl = { shadowRoot: root, currentPrimaryActiveLine: lines[1], isConnected: true,
    autoScroll: true, getScrollPaddingTop: () => 8 };
  ctx.audio.paused = false;
  return { m, lines, container };
}
test('overlapping lyrics use the renderer primary line instead of the first active line', () => {
  const { m, lines } = overlapFixture();
  assert.equal(m.getAmCurrentLine(), lines[1]);
});
test('overlapping lines that fit share one scroll target and stay fully readable', () => {
  const { m, lines, container } = overlapFixture();
  m.updateAmJump();
  for (const line of lines) {
    const rect = line.getBoundingClientRect();
    assert(rect.top >= 8 && rect.bottom <= 192);
  }
  m.amScrollUntil = 0; m.updateAmJump();
  assert.equal(container.scrolls, 1);
});
test('an oversized overlap never pulls scrolling back to the older highlighted line', () => {
  const { m, lines, container } = overlapFixture(100);
  lines[0].offsetTop = 0;
  // The renderer has already placed the primary line at its own scroll target.
  m.updateAmJump(); m.amScrollUntil = 0; m.updateAmJump();
  assert.equal(container.scrolls, 0);
  assert.equal(container.scrollTop, 152);
});
test('follow corrections wait for renderer line animations to settle', () => {
  const { m, container } = overlapFixture();
  m.amEl.lineSprings = new Map([['line', {}]]);
  m.updateAmJump(); assert.equal(container.scrolls, 0);
  m.amEl.lineSprings.clear(); m.updateAmJump(); assert.equal(container.scrolls, 1);
});
test('an old primary element from a previous render is ignored', () => {
  const { m, lines } = overlapFixture();
  m.amEl.currentPrimaryActiveLine = { classList: { contains: () => true } };
  assert.equal(m.getAmCurrentLine(), lines[0]);
});
test('large fullscreen scroll padding cannot clip an overlapping group that fits', () => {
  const { m, lines, container } = overlapFixture();
  lines[1].offsetTop = 240;
  m.amEl.getScrollPaddingTop = () => 36;
  m.updateAmJump();
  assert(lines[0].getBoundingClientRect().top >= 8);
  assert(lines[1].getBoundingClientRect().bottom <= 192);
  m.amScrollUntil = 0; m.updateAmJump();
  assert.equal(container.scrolls, 1);
});

function speedFixture() {
  const { ctx, manager: m } = fixture();
  ctx.audio.paused = false; ctx.audio.playbackRate = 1;
  const animations = [];
  class Renderer {}
  Renderer.wipeClocks = new WeakMap();
  Renderer.normalRiseClocks = new WeakMap();
  Renderer.characterAnimations = new WeakMap();
  const container = { getAnimations: () => animations };
  m.amEl = { isConnected: true, constructor: Renderer, shadowRoot: { querySelector: () => container },
    highlightColor: '#abcdef', getAnimations() { throw Error('Do not scan outside the lyrics container'); } };
  m.amActive = true; m.currentSource = 'amlyrics';
  const addAnimation = (epoch = 0, clock = Renderer.wipeClocks) => {
    let clockTime = 0;
    const animation = { get currentTime() { return clockTime; },
      set currentTime(value) { clockTime = value; this.clockWrites++; },
      clockWrites: 0, playbackRate: 1, playState: 'running',
      effect: { target: {}, getComputedTiming: () => ({ endTime: 4000 }) },
      rateUpdates: 0,
      updatePlaybackRate(rate) { this.playbackRate = rate; this.rateUpdates++; },
      advance(ms) { clockTime += ms * this.playbackRate; },
      cancel() { throw Error('Do not cancel native lyric effects'); },
      play() { throw Error('Do not restart native lyric effects'); } };
    animations.push(animation); clock?.set(animation, epoch);
    return animation;
  };
  const tick = ms => { ctx.audio.currentTime = ms / 1000; m.handleTimeUpdate(); };
  return { ctx, m, Renderer, animations, addAnimation, tick };
}
for (const rate of [0.5, 0.75, 1, 1.5, 2]) {
  test(`word highlighting follows ${rate}x playback without per-frame jumps`, () => {
    const { ctx, addAnimation, tick } = speedFixture();
    const animation = addAnimation(); ctx.audio.playbackRate = rate; tick(0);
    for (let wall = 16; wall <= 1600; wall += 16) {
      animation.advance(16); tick(wall * rate);
      assert(Math.abs(animation.currentTime - wall * rate) <= 1);
    }
    assert.equal(animation.rateUpdates, rate === 1 ? 0 : 1);
    assert.equal(animation.clockWrites, 1, 'Steady playback must not seek the animation every frame');
  });
}
test('changing speed in the middle of a word preserves the song position', () => {
  const { ctx, addAnimation, tick } = speedFixture();
  const animation = addAnimation(); tick(0); animation.advance(500); tick(500);
  ctx.audio.playbackRate = 2; tick(500); assert.equal(animation.currentTime, 500);
  animation.advance(250); tick(1000); assert.equal(animation.currentTime, 1000);
  ctx.audio.playbackRate = 0.5; tick(1000); animation.advance(400); tick(1200);
  assert.equal(animation.currentTime, 1200);
  ctx.audio.playbackRate = 1; tick(1200); animation.advance(200); tick(1400);
  assert.equal(animation.currentTime, 1400);
});
test('new words inherit the active speed and saved offset without changing lyric timestamps', () => {
  const { ctx, m, addAnimation, tick } = speedFixture();
  ctx.audio.playbackRate = 1.5; m.amOffsetMs = 200;
  const animation = addAnimation(1000); tick(1400);
  assert.equal(m.amEl.currentTime, 1200); assert.equal(animation.currentTime, 200);
  assert.equal(animation.playbackRate, 1.5);
});
test('word effects freeze on pause and resume at the chosen speed', () => {
  const { ctx, addAnimation, tick } = speedFixture();
  const animation = addAnimation(); ctx.audio.playbackRate = 2; tick(300);
  ctx.audio.paused = true; tick(300); animation.advance(1000);
  assert.equal(animation.currentTime, 300);
  ctx.audio.paused = false; tick(300); animation.advance(200); tick(700);
  assert.equal(animation.currentTime, 700);
});
test('seeks and delayed frames rebase word effects to media time', () => {
  const { addAnimation, tick } = speedFixture();
  const animation = addAnimation(); tick(200); tick(1700);
  assert.equal(animation.currentTime, 1700);
  tick(400); assert.equal(animation.currentTime, 400);
});
test('only native word effects are retimed, leaving scrolling and colors alone', () => {
  const { ctx, m, Renderer, addAnimation, tick } = speedFixture();
  ctx.audio.playbackRate = 2;
  const wipe = addAnimation(0), rise = addAnimation(100, Renderer.normalRiseClocks);
  const scroll = addAnimation(0, null); scroll.currentTime = 75;
  const character = addAnimation(0, null), char = {};
  character.effect.target = char;
  Renderer.characterAnimations.set(char, { animation: character, start: 200, glowEpoch: 50 });
  tick(600);
  assert.equal(wipe.currentTime, 600); assert.equal(rise.currentTime, 500);
  assert.equal(character.currentTime, 400);
  assert.equal(scroll.currentTime, 75); assert.equal(scroll.playbackRate, 1);
  assert.equal(m.amEl.highlightColor, '#abcdef');
});
test('native rewind effects are left alone until the rewind finishes', () => {
  const { ctx, m, addAnimation, tick } = speedFixture();
  const animation = addAnimation(); ctx.audio.playbackRate = 2;
  m.amEl.rewindingLines = new Set([{}]); tick(500);
  assert.equal(animation.currentTime, 0);
  m.amEl.rewindingLines.clear(); tick(500);
  assert.equal(animation.currentTime, 500);
});
test('pause and ratechange events immediately synchronize only the active player', () => {
  const { ctx, manager: m } = fixture();
  ctx.MutationObserver = class { observe() {} };
  ctx.document = { getElementById: () => null, addEventListener() {} };
  ctx.setInterval = () => 0;
  const handlers = [new Map(), new Map()];
  ctx.audio2 = {};
  [ctx.audio, ctx.audio2].forEach((player, i) => {
    player.dataset = {}; player.addEventListener = (event, handler) => handlers[i].set(event, handler);
  });
  let updates = 0; m.startLyricsSync = () => {}; m.handleTimeUpdate = () => updates++;
  m.init();
  handlers[0].get('ratechange')(); handlers[0].get('pause')();
  assert.equal(updates, 2);
  handlers[1].get('ratechange')(); handlers[1].get('pause')();
  assert.equal(updates, 2);
  // Crossfade swaps which physical player is active.
  ctx.audio = ctx.audio2; handlers[1].get('ratechange')();
  assert.equal(updates, 3);
});
test('character glow uses its own epoch while unrelated character effects are untouched', () => {
  const { ctx, Renderer, addAnimation, tick } = speedFixture();
  ctx.audio.playbackRate = 0.5;
  const char = {}, motion = addAnimation(0, null), glow = addAnimation(0, null), unrelated = addAnimation(0, null);
  const wrapper = { classList: { contains: name => name === 'char-motion' }, querySelector: () => char };
  motion.effect.target = wrapper; glow.effect.target = char; glow.animationName = 'char-glow';
  unrelated.effect.target = char; unrelated.animationName = 'hover';
  Renderer.characterAnimations.set(char, { animation: motion, start: 100, glowEpoch: 50 });
  tick(600);
  assert.equal(motion.currentTime, 500); assert.equal(glow.currentTime, 450);
  assert.equal(motion.playbackRate, 0.5); assert.equal(glow.playbackRate, 0.5);
  assert.equal(unrelated.playbackRate, 1); assert.equal(unrelated.currentTime, 0);
});
for (const rate of [0.5, 0.75, 1, 1.5, 2]) {
  test(`upcoming words keep their negative waiting time at ${rate}x without repeated resets`, () => {
    const { ctx, addAnimation, tick } = speedFixture();
    const animation = addAnimation(1000); ctx.audio.playbackRate = rate;
    tick(500);
    assert.equal(animation.currentTime, -500, 'A prepared word must remain before the start of its fill');
    for (let wall = 16; wall <= 1600; wall += 16) {
      animation.advance(16); const mediaTime = 500 + wall * rate; tick(mediaTime);
      assert(Math.abs(animation.currentTime - (mediaTime - 1000)) <= 1);
      if (mediaTime < 1000) assert(animation.currentTime < 0, 'Future words must not start filling');
    }
    assert.equal(animation.clockWrites, 1, 'The waiting animation must not repeatedly snap back');
  });
}
test('changing speed before a word starts preserves its remaining wait', () => {
  const { ctx, addAnimation, tick } = speedFixture();
  const animation = addAnimation(1000); tick(500);
  ctx.audio.playbackRate = 2; tick(500); animation.advance(100); tick(700);
  assert.equal(animation.currentTime, -300);
  ctx.audio.playbackRate = 0.5; tick(700); animation.advance(400); tick(900);
  assert.equal(animation.currentTime, -100);
  animation.advance(400); tick(1100); assert.equal(animation.currentTime, 100);
});
test('pausing a prepared word freezes it before its fill starts', () => {
  const { ctx, addAnimation, tick } = speedFixture();
  const animation = addAnimation(1000); tick(500);
  ctx.audio.paused = true; tick(500); animation.advance(2000);
  assert.equal(animation.currentTime, -500);
  ctx.audio.paused = false; ctx.audio.playbackRate = 2; tick(500);
  animation.advance(300); tick(1100); assert.equal(animation.currentTime, 100);
});

const wordLyrics = () => [{ timestamp: 1000, endtime: 3000, text: [
  { text: 'Saved ', timestamp: 1000, endtime: 1800 },
  { text: 'words', timestamp: 1800, endtime: 3000 }
], backgroundText: [{ text: 'Backing', timestamp: 2000, endtime: 2800 }] }];
function lyricDB() {
  const rows = new Map();
  return { rows, transaction() {
    const tx = { objectStore: () => ({
      put(data) { rows.set(data.id, structuredClone(data)); queueMicrotask(() => tx.oncomplete?.()); return {}; },
      get(key) { const req = {}; queueMicrotask(() => { req.result = structuredClone(rows.get(key)); req.onsuccess(); }); return req; }
    }) }; return tx;
  } };
}
function cachedRendererFixture() {
  const f = fixture(); let requests = 0;
  const el = { lyricsSource: 'Test provider', isConnected: false, cachedIsUnsynced: false,
    addEventListener() {}, fetchLyrics: async () => { requests++; },
    onLyricsLoaded: async function() { if (!this.noAutoAlternates) requests++; }, updateComplete: Promise.resolve() };
  f.ctx.loadAmLyrics = async () => {};
  f.ctx.document = { body: {}, documentElement: {}, createElement: () => el };
  f.ctx.getComputedStyle = () => ({ fontFamily: 'inherit', getPropertyValue: () => '#fff' });
  f.manager.applyAmFocus = () => {};
  f.manager.hideAmChrome = () => {};
  f.manager.applyAmbient = () => {};
  f.manager.placeAm = () => { el.isConnected = true; void el.fetchLyrics(); };
  f.manager.handleTimeUpdate = () => {};
  f.manager.pruneLyricsDB = () => {};
  return { ...f, el, requests: () => requests };
}
test('am-lyrics persists the full word and backing-vocal data through an IndexedDB reload', async () => {
  const first = cachedRendererFixture(), db = lyricDB(); first.manager.db = db;
  delete first.manager.saveLyricsToDB;
  first.manager.amEl = first.el;
  first.manager.tryAm = async () => wordLyrics();
  await first.manager.fetchLyrics(first.track);
  const stored = db.rows.get(first.manager.getLyricsTrackId(first.track));
  assert.deepEqual(JSON.parse(JSON.stringify(stored.amData.lines)), wordLyrics());
  const next = cachedRendererFixture(); next.manager.db = db;
  next.manager.tryAm = async () => { throw Error('Saved lyrics must not search providers'); };
  await next.manager.onTrackChange();
  assert.equal(next.manager.currentSource, 'amlyrics');
  assert.deepEqual(JSON.parse(JSON.stringify(next.el.lyrics)), wordLyrics());
  assert.equal(next.requests(), 0, 'Connecting the cached renderer must not refetch');
  next.el.lyrics[0].text[0].text = 'Changed renderer word';
  assert.equal(stored.amData.lines[0].text[0].text, 'Saved ');
});
test('old line-only saved lyrics load online without calling a provider', async () => {
  const { manager: m, track } = fixture(); let searches = 0;
  m.getLyricsFromDB = async () => ({ source: 'saved-amlyrics', lyrics: [], parsedLines: [{ text: 'Old saved line', startMs: 1000 }] });
  m.tryAm = async () => { searches++; return false; };
  await m.onTrackChange(); assert.equal(searches, 0);
  assert.equal(m.currentSource, 'saved-amlyrics');
  assert.equal(m.parsedLines[0].text, 'Old saved line');
});
test('direct lyric fetches also prefer saved data unless manually refreshed', async () => {
  const { manager: m, track } = fixture(); let searches = 0;
  m.getLyricsFromDB = async () => ({ source: 'saved-amlyrics-text', lyrics: [], parsedLines: [{ text: 'Saved plain lyrics' }] });
  m.tryAm = async () => { searches++; return [{ text: 'Refreshed', timestamp: 1000 }]; };
  await m.fetchLyrics(track); assert.equal(searches, 0);
  assert.equal(m.currentSource, 'saved-amlyrics-text');
  await m.fetchLyrics(track, true); assert.equal(searches, 1);
  assert.equal(m.parsedLines[0].text, 'Refreshed');
});
test('saved word lyrics still show saved lines when the renderer module is unavailable', async () => {
  const { manager: m, track } = fixture(); let rendered = 0;
  const saved = { source: 'saved-amlyrics', parsedLines: [{ text: 'Saved words', startMs: 1000 }], amData: { version: 1, lines: wordLyrics() } };
  m.cache.set(m.getLyricsTrackId(track), saved);
  m.ensureAm = async () => { throw Error('Renderer CDN unavailable'); };
  m.tryAm = async () => { throw Error('Must not look up saved lyrics'); };
  m.renderLyrics = () => rendered++;
  await m.onTrackChange();
  assert.equal(rendered, 1); assert.equal(m.currentSource, 'saved-amlyrics');
});
test('loading a saved renderer cannot overwrite a song selected while its module loads', async () => {
  const { ctx, manager: m, track, el } = cachedRendererFixture(); let resolve;
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', parsedLines: [{ text: 'Old saved words', startMs: 1000 }], amData: { version: 1, lines: wordLyrics() } });
  m.ensureAm = () => new Promise(done => resolve = done);
  const old = m.onTrackChange();
  while (!resolve) await Promise.resolve();
  m.ensureAm = async () => el;
  ctx.queue = [{ title: 'New song', artist: 'Artist' }];
  m.getLyricsFromDB = async () => ({ source: 'genius', lyrics: 'New lyrics', parsedLines: [{ text: 'New lyrics' }] });
  await m.onTrackChange(); resolve(el); await old;
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(m.parsedLines[0].text, 'New lyrics');
  assert.equal(el.lyrics[0].text[0].text, 'New lyrics');
});
test('manual refresh re-enables provider fetches after restoring a saved renderer', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', parsedLines: [{ text: 'Saved words', startMs: 1000 }], amData: { version: 1, lines: wordLyrics() } });
  await m.onTrackChange(); assert.equal(requests(), 0); assert.equal(el.__amSaved, true);
  m.amLookup = async () => wordLyrics();
  await m.fetchLyrics(track, true);
  assert.equal(el.__amSaved, false); assert.equal(requests(), 1);
});
test('saved plain am-lyrics remain unsynced when restored into the renderer', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  const lines = wordLyrics().map(line => ({ ...line, timestamp: 0, endtime: 0, text: line.text.map(word => ({ ...word, timestamp: 0, endtime: 0 })) }));
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics-text', parsedLines: [{ text: 'Saved words', startMs: 0 }], amData: { version: 1, lines } });
  await m.onTrackChange(); assert.equal(m.hasSyncedLyrics(), false);
  assert.equal(el.cachedIsUnsynced, true); assert.equal(requests(), 0);
});
test('saving waits for IndexedDB to open and for the write transaction to commit', async () => {
  const { manager: m, track } = fixture(); delete m.saveLyricsToDB;
  const db = lyricDB(); let open;
  m.pruneLyricsDB = () => {};
  m.dbReady = new Promise(resolve => open = () => { m.db = db; resolve(db); });
  const snapshot = { version: 1, lines: wordLyrics() };
  const saving = m.rememberLyrics(track, { source: 'saved-amlyrics', lyrics: [], parsedLines: [], amData: snapshot });
  assert.equal(db.rows.size, 0); open(); await saving;
  assert.equal(db.rows.get(m.getLyricsTrackId(track)).amData.lines[0].text[1].timestamp, 1800);
});
test('legacy saved am-lyrics migrate to the am-lyrics display and persist without a lookup', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture(), db = lyricDB();
  delete m.saveLyricsToDB; m.db = db;
  db.rows.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', lyrics: [], parsedLines: [
    { text: 'First line', startMs: 1000 }, { text: 'Next line', startMs: 5000 }
  ] });
  await m.onTrackChange();
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics[0].timestamp, 1000); assert.equal(el.lyrics[0].endtime, 5000);
  assert.equal(el.lyrics[0].text[0].text, 'First line');
  assert.equal(el.lyrics[0].text[0].lineSynced, true, 'Do not invent word timing');
  assert(db.rows.get(m.getLyricsTrackId(track)).amData);
});
for (const source of ['spotify', 'musix', 'imported-lrc']) {
  test(`${source} uses am-lyrics strictly as a line-synced display`, async () => {
    const { manager: m, track, el, requests } = cachedRendererFixture();
    m.currentSource = source; m.parsedLines = [{ text: 'Fallback line', startMs: 2000 }, { text: 'Following line', startMs: 6000 }];
    await m.cacheAndRender(m.parsedLines, source, track);
    assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
    assert.equal(el.lyrics[0].timestamp, 2000); assert.equal(el.lyrics[0].text[0].lineSynced, true);
    assert(m.hasSyncedLyrics());
  });
}
for (const source of ['genius', 'imported-text', 'saved-amlyrics-text']) {
  test(`${source} uses am-lyrics without inventing timing or searching`, async () => {
    const { manager: m, track, el, requests } = cachedRendererFixture();
    m.cache.set(m.getLyricsTrackId(track), { source, lyrics: 'First line\nSecond line' });
    await m.onTrackChange();
    assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
    assert.equal(el.lyrics.length, 2); assert.equal(el.lyrics[1].text[0].text, 'Second line');
    assert(el.lyrics.every(line => line.timestamp === 0 && line.endtime === 0));
    assert.equal(m.hasSyncedLyrics(), false);
  });
}
test('a partial saved snapshot preserves real words and repairs absent end times', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', amData: { version: 1, lines: [
    { timestamp: 1000, text: [{ text: 'Real ', timestamp: 1000, endtime: 1800 }, { text: 'words', timestamp: 1800, endtime: 3000 }] }
  ] } });
  await m.onTrackChange();
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics[0].endtime, 3000); assert.equal(el.lyrics[0].text[1].timestamp, 1800);
  assert.notEqual(el.lyrics[0].text[1].lineSynced, true);
});
test('legacy saves containing raw am-lyrics arrays restore without parsedLines', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', lyrics: wordLyrics() });
  await m.onTrackChange();
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics[0].text[1].timestamp, 1800); assert.equal(m.parsedLines[0].text, 'Saved words');
});
test('saved provider arrays without parsedLines still restore through am-lyrics', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  m.cache.set(m.getLyricsTrackId(track), { source: 'spotify', lyrics: [{ text: 'Stored provider line', startMs: 1000 }] });
  await m.onTrackChange();
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics[0].text[0].text, 'Stored provider line');
  assert.equal(el.lyrics[0].timestamp, 1000);
});
test('a snapshot with line text instead of word arrays is converted rather than rejected', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', amData: { version: 1, lines: [{ text: 'Saved snapshot line', timestamp: 1000, endtime: 3000 }] } });
  await m.onTrackChange();
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics[0].text[0].text, 'Saved snapshot line'); assert.equal(el.lyrics[0].endtime, 3000);
});
test('a fresh provider fallback uses am-lyrics for display without another am-lyrics lookup', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture(); let amSearches = 0;
  m.apiKey = 'test-key';
  m.tryAm = async () => { amSearches++; return false; };
  m.tryMusix = async () => [{ text: 'Provider result', startMs: 2000 }];
  await m.fetchLyrics(track, true);
  assert.equal(amSearches, 1); assert.equal(requests(), 0);
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(el.lyrics[0].text[0].text, 'Provider result');
});
test('a fresh Genius fallback uses the am-lyrics plain-text display', async () => {
  const { manager: m, track, el, requests } = cachedRendererFixture();
  m.apiKey = 'test-key'; m.tryAm = async () => false;
  m.tryMusix = async () => null; m.trySpotify = async () => null;
  m.tryGenius = async () => 'First genius line\nSecond genius line';
  await m.fetchLyrics(track, true);
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics.length, 2); assert.equal(m.hasSyncedLyrics(), false);
});
test('a new LRC import immediately uses am-lyrics display without any provider calls', async () => {
  const { manager: m, el, requests } = cachedRendererFixture();
  await m.importLyricsFile({ size: 60, text: async () => '[00:01]First local line\n[00:05]Next local line' });
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(requests(), 0);
  assert.equal(el.lyrics[0].text[0].text, 'First local line');
  assert.equal(el.lyrics[1].timestamp, 5000);
});
test('a line-text snapshot with zero timing stays in the am-lyrics unsynced display', async () => {
  const { manager: m, track, el } = cachedRendererFixture();
  m.cache.set(m.getLyricsTrackId(track), { source: 'saved-amlyrics', amData: { version: 1, lines: [{ text: 'Untimed snapshot', timestamp: 0, endtime: 0 }] } });
  await m.onTrackChange();
  assert.equal(m.currentSource, 'amlyrics'); assert.equal(el.cachedIsUnsynced, true);
  assert.equal(el.lyrics[0].endtime, 0); assert.equal(m.hasSyncedLyrics(), false);
});

function preloadFixture(t) {
  const f = cachedRendererFixture();
  f.ctx.queue = Array.from({ length: 6 }, (_, i) => ({ uid: String(i), title: 'Song ' + i, artist: 'Artist' }));
  f.ctx.currentTrackIndex = 2; f.ctx.repeatMode = 'off'; f.ctx.isShuffle = false;
  f.ctx.PlayerController = { getNextIndex: () => f.ctx.currentTrackIndex + 1 < f.ctx.queue.length ? f.ctx.currentTrackIndex + 1 : -1 };
  f.manager.getLyricsFromDB = async () => null;
  t.after(() => { for (const job of f.manager.lyricPreloads?.values() || []) {
    job.controller.abort(); clearTimeout(job.timer); job.resolve(null);
  } });
  return f;
}
const preloadData = title => ({ source: 'saved-amlyrics', lyrics: [], parsedLines: [{ text: title, startMs: 1000 }] });
test('only previous and next are preloaded and only the three-song window stays in memory', t => {
  const { ctx, manager: m } = preloadFixture(t);
  for (const track of ctx.queue) m.cache.set(m.getLyricsTrackId(track), preloadData(track.title));
  m.updateLyricPreloads();
  assert.deepEqual([...m.cache.keys()].sort(), [1, 2, 3].map(i => m.getLyricsTrackId(ctx.queue[i])).sort());
  m.cache.clear(); m.updateLyricPreloads();
  assert.deepEqual([...m.lyricPreloads.values()].map(job => job.track.uid).sort(), ['1', '3']);
});
test('saved neighbor lyrics do not call providers or change the current display', async t => {
  const { ctx, manager: m } = preloadFixture(t);
  m.currentLyrics = 'Current display'; m.parsedLines = [{ text: 'Current display' }];
  m.getLyricsFromDB = async track => preloadData(track.title);
  m.lookupPreloadedLyrics = async () => { throw Error('Saved lyrics must not search'); };
  m.updateLyricPreloads();
  await Promise.all([...m.lyricPreloads.values()].map(job => m.startLyricPreload(job)));
  assert.equal(m.currentLyrics, 'Current display'); assert.equal(m.parsedLines[0].text, 'Current display');
  assert(m.cache.has(m.getLyricsTrackId(ctx.queue[3])));
});
test('a current song adopts its in-flight preload instead of starting a second lookup', async t => {
  const { ctx, manager: m } = preloadFixture(t); let finish, began;
  const started = new Promise(resolve => began = resolve); let lookups = 0;
  m.lookupPreloadedLyrics = () => { lookups++; began(); return new Promise(resolve => finish = resolve); };
  m.updateLyricPreloads();
  const key = m.getLyricsTrackId(ctx.queue[3]), job = m.lyricPreloads.get(key);
  m.startLyricPreload(job); await started;
  ctx.currentTrackIndex = 3; m.updateLyricPreloads();
  m.tryAm = async () => { throw Error('Do not duplicate an active preload'); };
  const current = m.fetchLyrics(ctx.queue[3]);
  finish(preloadData('Preloaded song 3')); await current;
  assert.equal(lookups, 1); assert.equal(m.parsedLines[0].text, 'Preloaded song 3');
  assert.equal(m.currentSource, 'amlyrics');
});
test('rapid skips cancel stale jobs and ignore late results even when returning to the same song', async t => {
  const { ctx, manager: m } = preloadFixture(t); const finishes = [];
  m.currentLyrics = 'Keep current';
  m.lookupPreloadedLyrics = track => new Promise(resolve => finishes.push({ track, resolve }));
  m.updateLyricPreloads();
  const old = [...m.lyricPreloads.values()][0]; m.startLyricPreload(old);
  while (!finishes.length) await Promise.resolve();
  for (const index of [4, 0, 5, 1, 4, 2, 0, 3, 5, 0]) {
    ctx.currentTrackIndex = index; m.updateLyricPreloads();
    assert(m.lyricPreloads.size <= 3);
    assert(m.cache.size <= 3);
  }
  assert(old.controller.signal.aborted);
  finishes[0].resolve(preloadData('Late old result')); await old.promise;
  assert.equal(m.currentLyrics, 'Keep current');
  assert(!m.cache.has(old.key));
});
test('emptying the queue cancels preloads and releases their memory', t => {
  const { ctx, manager: m } = preloadFixture(t);
  m.updateLyricPreloads(); const jobs = [...m.lyricPreloads.values()];
  ctx.queue = []; ctx.currentTrackIndex = -1; m.updateLyricPreloads();
  assert.equal(m.lyricPreloads.size, 0); assert.equal(m.cache.size, 0);
  assert(jobs.every(job => job.controller.signal.aborted));
});
test('manual refresh cancels the promoted preload and performs a fresh lookup', async t => {
  const { ctx, manager: m } = preloadFixture(t);
  m.updateLyricPreloads(); const job = [...m.lyricPreloads.values()][0];
  ctx.currentTrackIndex = Number(job.track.uid); m.updateLyricPreloads();
  let lookups = 0; m.tryAm = async () => { lookups++; return wordLyrics(); };
  await m.fetchLyrics(ctx.queue[ctx.currentTrackIndex], true);
  assert(job.controller.signal.aborted); assert.equal(lookups, 1);
});
test('detached preloading reads native lyric data without connecting a renderer', async t => {
  const { ctx, manager: m, requests } = preloadFixture(t); let connections = 0;
  const el = { noAutoAlternates: false, lyricsSource: 'Provider',
    fetchLyrics: async function() { this.fetchAbortController = new AbortController(); this.lyrics = wordLyrics(); },
    remove() {}, connectedCallback() { connections++; } };
  ctx.document.createElement = () => el;
  m.currentSource = 'spotify'; m.parsedLines = [{ text: 'Current' }];
  const data = await m.lookupPreloadedLyrics(ctx.queue[3], new AbortController().signal);
  assert.equal(connections, 0); assert.equal(requests(), 0);
  assert.equal(data.amData.lines[0].text[1].timestamp, 1800);
  assert.equal(m.currentSource, 'spotify'); assert.equal(m.parsedLines[0].text, 'Current');
});
test('cancelling a detached lookup aborts its native provider request', async t => {
  const { ctx, manager: m } = preloadFixture(t); let native;
  const started = new Promise(resolve => {
    ctx.document.createElement = () => ({
      fetchLyrics() { this.fetchAbortController = native = new AbortController(); resolve(); return new Promise(() => {}); }, remove() {}
    });
  });
  const controller = new AbortController();
  const lookup = m.lookupPreloadedLyrics(ctx.queue[3], controller.signal);
  await started; controller.abort();
  await assert.rejects(lookup, error => error.name === 'AbortError');
  assert(native.signal.aborted);
});
test('background fallback timing never uses the currently playing song duration', async t => {
  const { ctx, manager: m } = preloadFixture(t);
  m.apiKey = 'test-key'; m.songDuration = 999;
  ctx.document.createElement = () => ({ lyrics: [], fetchLyrics: async () => {}, remove() {} });
  ctx.Manager.prototype.tryMusix = async () => [{ text: 'Background fallback', startMs: 1000 }];
  const data = await m.lookupPreloadedLyrics(ctx.queue[3], new AbortController().signal);
  assert.equal(data.amData.lines[0].endtime, 4000);
  assert.equal(m.songDuration, 999);
});
function navigationFixture() {
  const { ctx } = fixture();
  vm.runInContext(section('class PlayerController {', '// Legacy global wrappers') + '\nthis.PlayerController = PlayerController;', ctx);
  ctx.queue = Array.from({ length: 5 }, (_, i) => ({ uid: String(i), title: String(i) }));
  ctx.currentTrackIndex = 2; ctx.repeatMode = 'off'; ctx.isShuffle = true;
  ctx.uqReturnIndex = -1; ctx.uqPeek = () => -1; ctx.shuffleForwardIndex = () => -1;
  ctx.PlayerController.cancelCrossfade = () => {};
  ctx.updatePlayerUIWithoutAAB = () => {};
  let selected; ctx.playTrackAtIndex = (_, __, index) => selected = index;
  return { ctx, selected: () => selected };
}
test('shuffle reserves the same next song for preloading, Next, and crossfade', () => {
  const { ctx, selected } = navigationFixture(); const player = ctx.PlayerController;
  const next = player.getNextIndex(true);
  for (let i = 0; i < 30; i++) assert.equal(player.getNextIndex(true), next);
  assert.notEqual(next, ctx.currentTrackIndex); assert.equal(player.getNextIndex(), next);
  player.next(); assert.equal(selected(), next);
});
test('queued tracks and forward shuffle history override a reserved random pick', () => {
  const { ctx } = navigationFixture(); const player = ctx.PlayerController;
  player.getNextIndex(true); ctx.shuffleForwardIndex = () => 1;
  assert.equal(player.getNextIndex(true), 1);
  ctx.uqPeek = () => 4; assert.equal(player.getNextIndex(true), 4);
});
test('repeat-one still preloads manual Next and queue return order remains correct', () => {
  const { ctx } = navigationFixture(); const player = ctx.PlayerController;
  ctx.isShuffle = false; ctx.repeatMode = 'one';
  assert.equal(player.getNextIndex(), 2); assert.equal(player.getNextIndex(true), 3);
  ctx.uqReturnIndex = 0; assert.equal(player.getNextIndex(true), 1);
  ctx.uqReturnIndex = -1; ctx.currentTrackIndex = 4; ctx.repeatMode = 'off';
  assert.equal(player.getNextIndex(true), -1); ctx.repeatMode = 'all'; assert.equal(player.getNextIndex(true), 0);
});
function playbackFixture() {
  const { ctx } = fixture(); const prepared = [], played = [], displayed = [];
  ctx.queue = Array.from({ length: 20 }, (_, i) => ({ uid: String(i), title: 'Song ' + i, type: 'local' }));
  ctx.uqInternal = false; ctx.uqReturnIndex = -1; ctx.shuffleRecord = () => {};
  ctx.lyricsManager = null;
  ctx.PlayerController = { trackRequest: 0, cancelCrossfade() {}, updatePlayPauseBtn() {}, highlightCurrentTrack() {} };
  const player = { paused: true, src: '', load() {}, pause() { this.paused = true; },
    async play() { played.push(this.src); this.paused = false; } };
  ctx.audio = player; ctx.audio2 = { ...player }; ctx.playbackSpeed = 1;
  ctx.audioContext = { state: 'running', currentTime: 0 };
  ctx.AudioEngine = { buildChain: () => ({ fadeNode: { gain: { cancelScheduledValues() {}, setValueAtTime() {} } } }) };
  ctx.streamingManager = { prepareTrackForPlayback: track => new Promise((resolve, reject) => prepared.push({ track, resolve, reject })) };
  ctx.setTimeout = fn => { queueMicrotask(fn); return 0; };
  ctx.consecutivePlayFailures = 0; ctx.MAX_CONSECUTIVE_PLAY_FAILURES = 3;
  ctx.recordPlay = () => {}; ctx.waveformData = new Map(ctx.queue.map(track => [track.uid, {}]));
  ctx.updatePlayerUI = track => displayed.push(track.uid);
  ctx.document = { getElementById: () => ({ style: {}, innerText: 'Song', src: '' }) };
  ctx.navigator = { mediaSession: {} }; ctx.MediaMetadata = class { constructor(value) { Object.assign(this, value); } };
  ctx.nextTrack = () => { throw Error('A stale failure must not advance the queue'); };
  vm.runInContext(section('async function playTrackAtIndex(', 'function recordPlay(track) {'), ctx);
  return { ctx, player, prepared, played, displayed };
}
test('spamming twenty track changes prepares and plays only the latest request', async () => {
  const { ctx, player, prepared, played, displayed } = playbackFixture();
  const tasks = ctx.queue.map((_, index) => ctx.playTrackAtIndex(0, player, index));
  while (!prepared.length) await Promise.resolve();
  assert.equal(prepared.length, 1); assert.equal(prepared[0].track.uid, '19');
  prepared[0].resolve('blob:latest'); await Promise.all(tasks);
  assert.deepEqual(played, ['blob:latest']); assert.deepEqual(displayed, ['19']);
});
test('an old audio preparation cannot replace a newer song after finishing last', async () => {
  const { ctx, player, prepared, played, displayed } = playbackFixture();
  const old = ctx.playTrackAtIndex(0, player, 0);
  while (prepared.length < 1) await Promise.resolve();
  const latest = ctx.playTrackAtIndex(0, player, 1);
  while (prepared.length < 2) await Promise.resolve();
  prepared[1].resolve('blob:new'); await latest;
  prepared[0].resolve('blob:old'); await old;
  assert.equal(player.src, 'blob:new'); assert.deepEqual(played, ['blob:new']); assert.deepEqual(displayed, ['1']);
});

test('disposing a song drops its renderer, animation state and saved scroll position', () => {
  const { ctx, manager: m } = fixture(); delete m.exitAm;
  const host = { textContent: 'Old lyrics', scrollTop: 900, dataset: { followAfter: '9999999999999' } };
  const controller = new AbortController(); let removed = false;
  m.amEl = { isConnected: true, parentElement: host, fetchAbortController: controller, remove() { removed = true; } };
  m.amActive = true; m.amTrackKey = 'old'; m._amJumpToken = 5;
  m.amUiEls = () => []; m.amWordTimingStates = new WeakMap(); const clocks = m.amWordTimingStates;
  m.exitAm();
  assert.equal(m.amEl, null); assert(removed); assert(controller.signal.aborted);
  assert.equal(host.scrollTop, 0); assert.equal(host.dataset.followAfter, undefined);
  assert(m._amJumpToken > 5); assert.notEqual(m.amWordTimingStates, clocks);
});
test('upcoming song lyrics never receive the previous audio clock while its source is loading', () => {
  const { ctx, manager: m, track } = fixture(); ctx.audio.currentTime = 80;
  m.amActive = true; m.currentSource = 'amlyrics'; m.amOffsetMs = 0;
  m.amEl = { isConnected: true, currentTime: 0 };
  m.beginTrackPlayback(track, 0, 1); m.handleTimeUpdate();
  assert.equal(m.amEl.currentTime, 0);
  ctx.audio.currentTime = 2; m.finishTrackPlayback(track, 1);
  assert.equal(m.amEl.currentTime, 2000);
});
test('a stale audio completion cannot release a newer song start anchor', () => {
  const { ctx, manager: m, track } = fixture(); ctx.audio.currentTime = 90;
  m.beginTrackPlayback(track, 0, 1); m.beginTrackPlayback(track, 10, 2);
  m.finishTrackPlayback(track, 1); assert.equal(m.getLyricsPlaybackSeconds(), 10);
  ctx.audio.currentTime = 11; m.finishTrackPlayback(track, 2);
  assert.equal(m.getLyricsPlaybackSeconds(), 11);
});
test('switching word, line and plain lyrics creates fresh renderers instead of carrying old highlights', async () => {
  const { ctx, manager: m } = cachedRendererFixture(); delete m.exitAm; delete m.handleTimeUpdate;
  const made = [];
  ctx.document.createElement = () => {
    const el = { currentTime: 0, isConnected: false, focusedLine: null, footerActive: false,
      addEventListener() {}, fetchLyrics: async () => {}, onLyricsLoaded: async () => {}, updateComplete: Promise.resolve(),
      remove() { this.isConnected = false; } };
    made.push(el); return el;
  };
  m.amUiEls = () => [];
  m.placeAm = () => { m.amEl.isConnected = true; };
  const data = [
    { source: 'saved-amlyrics', amData: { version: 1, lines: wordLyrics() } },
    { source: 'spotify', parsedLines: [{ text: 'Line timing', startMs: 1000 }] },
    { source: 'genius', lyrics: 'Plain lyrics' }
  ];
  for (let index = 0; index < data.length; index++) {
    m.exitAm(); ctx.queue = [{ uid: String(index), title: 'Song ' + index, artist: 'Artist' }];
    ctx.audio.currentTime = 80; m.trackLoadGeneration = index;
    m.beginTrackPlayback(ctx.queue[0], 0, index);
    await m.renderCachedLyrics(data[index], ctx.queue[0], index);
    assert.equal(m.amEl.currentTime, 0); assert.equal(m.amEl.focusedLine, null); assert.equal(m.amEl.footerActive, false);
    m.amEl.focusedLine = 'old last line'; m.amEl.footerActive = true;
  }
  assert.equal(made.length, 3); assert.equal(new Set(made).size, 3);
  assert.equal(m.hasSyncedLyrics(), false);
});
test('scroll callbacks from the disposed song cannot scroll a new renderer', async () => {
  const { ctx, manager: m } = fixture(); delete m.exitAm;
  const frames = [], timers = []; ctx.requestAnimationFrame = callback => frames.push(callback);
  ctx.setTimeout = callback => timers.push(callback);
  const line = {}, container = {};
  const old = { isConnected: true, isLoading: false, lyrics: [{}], updateComplete: Promise.resolve(),
    shadowRoot: { querySelector: selector => selector === '.lyrics-container' ? container : line }, remove() { this.isConnected = false; } };
  m.amEl = old; m.amActive = true; m.amTrackKey = 'old'; m.amUiEls = () => [];
  let scrolls = 0; m.getAmCurrentLine = () => line; m.amLineNeedsScroll = () => true; m.scrollAmLineIntoView = () => scrolls++;
  await m.jumpAmToCurrentLine();
  m.exitAm(); m.amEl ||= { isConnected: true }; m.amEl.isConnected = true; m.amActive = true; m.amTrackKey = 'new';
  while (frames.length) frames.shift()(); timers.forEach(callback => callback());
  assert.equal(scrolls, 0);
});
test('untimed lyrics never select the final zero-timestamp line as a scroll target', async () => {
  const { manager: m } = fixture();
  m.amEl = { isConnected: true, cachedIsUnsynced: true, lyrics: [{ timestamp: 0 }, { timestamp: 0 }],
    shadowRoot: { querySelector() { throw Error('Untimed lyrics must not look up an active line'); } } };
  assert.equal(m.getAmCurrentLine(), null);
  await m.jumpAmToCurrentLine();
});
test('playback anchors lyrics before loading and releases them only after assigning the new source', async () => {
  const { ctx, player, prepared } = playbackFixture(); const events = [];
  ctx.lyricsManager = { beginTrackPlayback(track, seconds, request) { events.push(['begin', track.uid, seconds, request]); },
    async onTrackChange() { events.push(['lyrics']); },
    finishTrackPlayback(track, request) { events.push(['ready', track.uid, player.src, player.currentTime, request]); } };
  const playing = ctx.playTrackAtIndex(4, player, 1);
  while (!prepared.length) await Promise.resolve();
  assert.equal(events[0][0], 'begin'); assert.equal(events[0][2], 4);
  assert(!events.some(event => event[0] === 'ready'));
  prepared[0].resolve('blob:new-source'); await playing;
  const ready = events.find(event => event[0] === 'ready');
  assert.equal(ready[2], 'blob:new-source'); assert.equal(ready[3], 4);
});

function crossfadeFixture(speed = 1) {
  let id = 0;
  const timers = new Map(), animations = [], updates = [], prepared = [], gains = new Map();
  const player = name => ({ name, duration: 120, currentTime: 100, volume: 1, paused: false,
    pause() { this.paused = true; }, play: async function() { this.paused = false; }, removeAttribute() {}, load() {} });
  const outgoing = player('outgoing'), incoming = player('incoming'); incoming.paused = true;
  const ctx = vm.createContext({ console, Float32Array, window: {}, crossfadeDuration: 4,
    playbackSpeed: speed, isCrossfading: false, crossfadeTickHandle: null,
    audio: outgoing, audio2: incoming, currentVolume: 0.7, audioContext: { state: 'running', currentTime: 0 },
    queue: [{ uid: 'old' }, { uid: 'new' }], currentTrackIndex: 0, uqReturnIndex: -1,
    uqTake: () => false, shuffleRecord() {}, rebindAudioListeners() {},
    document: { getElementById: id => ({ animate(frames, options) {
      const animation = { id, frames, options, cancelled: false, cancel() { this.cancelled = true; } };
      animations.push(animation); return animation;
    } }), dispatchEvent() {} }, CustomEvent: class {},
    updatePlayerUIWithoutAAB(track) { updates.push(['metadata', track.uid]); },
    FullLyricsPlayer: { syncTrackInfo() {} },
    lyricsManager: { updateLyricPreloads() {}, async onTrackChange() {
      updates.push(['lyrics', ctx.queue[ctx.currentTrackIndex].uid, ctx.audio.name, ctx.audio.currentTime]);
    } },
    AudioEngine: { buildChainFor(player) {
      if (!gains.has(player)) gains.set(player, { calls: [], cancelScheduledValues() {},
        setValueAtTime(value) { this.value = value; }, setValueCurveAtTime(curve, when, duration) { this.calls.push({ duration }); } });
      return { fadeNode: { gain: gains.get(player) } };
    } },
    streamingManager: { prepareTrackForPlayback: () => new Promise(resolve => prepared.push(resolve)) },
    setTimeout(fn, ms) { const key = ++id; timers.set(key, { fn, ms }); return key; },
    clearTimeout(key) { timers.delete(key); }
  });
  vm.runInContext(section('class PlayerController {', '// Legacy global wrappers') + '\nthis.Player = PlayerController;', ctx);
  ctx.Player.getNextIndex = () => 1; ctx.Player.highlightCurrentTrack = () => {};
  const run = key => { const timer = timers.get(key); assert(timer); timers.delete(key); timer.fn(); };
  const start = async () => {
    const promise = ctx.Player.startCrossfade(ctx.audio);
    run([...timers].find(([, timer]) => timer.ms === 20)[0]);
    await Promise.resolve();
    return promise;
  };
  // Start without awaiting the provider, so tests can cancel while it is pending.
  const launch = async () => { const promise = start(); await Promise.resolve(); await Promise.resolve(); return { promise }; };
  return { ctx, outgoing, incoming, timers, animations, updates, prepared, gains, run, launch };
}

test('crossfade switches metadata and lyric clock at the visual midpoint while audio continues fading', async () => {
  const f = crossfadeFixture(); const { promise } = await f.launch();
  f.prepared[0]('new-source'); await promise;
  const session = f.ctx.Player.crossfadeSession;
  assert.equal(f.ctx.currentTrackIndex, 0); assert.equal(f.animations[0].frames[1].opacity, 0);
  f.incoming.currentTime = 2; f.run(session.midpoint);
  assert.equal(f.ctx.currentTrackIndex, 1); assert.equal(f.ctx.audio, f.incoming);
  assert.equal(f.outgoing.paused, false); assert.equal(f.ctx.isCrossfading, true);
  assert.deepEqual(f.updates, [['metadata', 'new'], ['lyrics', 'new', 'incoming', 2]]);
  assert.equal(f.animations.at(-1).frames[0].opacity, 0);
  assert.equal(f.animations.at(-1).frames[1].opacity, 1);
  f.run(f.ctx.crossfadeTickHandle);
  assert.equal(f.outgoing.paused, true); assert.equal(f.ctx.isCrossfading, false);
  assert(f.animations.every(animation => animation.cancelled));
});

test('visual crossfade duration follows playback speed and reduced motion skips animations', async () => {
  const f = crossfadeFixture(2); const { promise } = await f.launch();
  f.prepared[0]('new-source'); await promise;
  assert.equal(f.animations[0].options.duration, 1010);
  assert.equal(f.gains.get(f.incoming).calls[0].duration, 2);
  f.ctx.Player.cancelCrossfade();
  f.ctx.window.matchMedia = () => ({ matches: true });
  const session = { animations: [] };
  f.ctx.Player.fadeCrossfadeVisuals(session, false, 1000);
  assert.equal(session.animations.length, 0);
});

for (const afterMidpoint of [false, true]) test(`cancelling crossfade ${afterMidpoint ? 'after' : 'before'} midpoint restores visuals and keeps the active song`, async () => {
  const f = crossfadeFixture(); const { promise } = await f.launch();
  f.prepared[0]('new-source'); await promise;
  const session = f.ctx.Player.crossfadeSession;
  const lateMidpoint = f.timers.get(session.midpoint).fn, lateFinish = f.timers.get(f.ctx.crossfadeTickHandle).fn;
  if (afterMidpoint) f.run(session.midpoint);
  f.ctx.Player.cancelCrossfade();
  assert.equal(f.ctx.audio, afterMidpoint ? f.incoming : f.outgoing);
  assert.equal(f.ctx.audio2.paused, true);
  assert.equal(f.gains.get(f.ctx.audio).value, 1);
  assert(f.animations.every(animation => animation.cancelled));
  f.ctx.crossfadeTickHandle = 999; // A newer transition owns this timer now.
  const count = f.updates.length; lateMidpoint(); lateFinish();
  assert.equal(f.ctx.crossfadeTickHandle, 999);
  assert.equal(f.updates.length, count); assert.equal(f.ctx.isCrossfading, false);
});

test('a cancelled preparation cannot replace a newer crossfade or animate its song', async () => {
  const f = crossfadeFixture(); const first = await f.launch();
  f.ctx.Player.cancelCrossfade(); const second = await f.launch();
  const currentSession = f.ctx.Player.crossfadeSession;
  f.prepared[0]('stale-source'); await first.promise;
  assert.equal(f.ctx.Player.crossfadeSession, currentSession);
  assert.notEqual(f.incoming.src, 'stale-source'); assert.equal(f.animations.length, 0);
  f.prepared[1]('fresh-source'); await second.promise;
  assert.equal(f.incoming.src, 'fresh-source'); assert(f.animations.length > 0);
  f.ctx.Player.cancelCrossfade();
});

