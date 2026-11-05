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
