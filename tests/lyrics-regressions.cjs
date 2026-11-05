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

