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
