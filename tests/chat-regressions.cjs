const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'app-main.js'), 'utf8');
const section = (start, end) => {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  assert(a >= 0 && b > a, 'Chat function boundaries exist');
  return source.slice(a, b);
};

function fixture() {
  const counts = { inserts: 0, removes: 0, rows: 0, scrolls: 0, people: 0, dms: 0 };
  class Element {
    constructor(id = '') {
      this.id = id; this.children = []; this.dataset = {}; this._text = '';
      this.parentElement = null; this.scrollTop = 0; this.scrollHeight = 100; this.clientHeight = 500;
      const classes = new Set();
      this.classList = {
        contains: name => classes.has(name),
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        toggle(name, on) { on ??= !classes.has(name); on ? classes.add(name) : classes.delete(name); return on; }
      };
    }
    set className(value) { value.split(' ').forEach(name => this.classList.add(name)); }
    get firstElementChild() { return this.children[0] || null; }
    get lastElementChild() { return this.children.at(-1) || null; }
    get textContent() { return this._text; }
    set textContent(value) { this._text = value; this.innerHTML = ''; }
    set innerHTML(value) { assert.equal(value, ''); for (const child of [...this.children]) this.removeChild(child); }
    insertBefore(node, before) {
      if (node === before) return node;
      if (node.parentElement) node.parentElement.children.splice(node.parentElement.children.indexOf(node), 1);
      const at = before ? this.children.indexOf(before) : this.children.length;
      assert(at >= 0, 'Insertion target belongs to the list');
      this.children.splice(at, 0, node); node.parentElement = this; counts.inserts++; return node;
    }
    appendChild(node) { return this.insertBefore(node, null); }
    removeChild(node) {
      const at = this.children.indexOf(node); assert(at >= 0);
      this.children.splice(at, 1); node.parentElement = null; counts.removes++; return node;
    }
  }
  const roots = ['ycPanel', 'ycThreadScroll', 'ycRoomScroll', 'ycNewsScroll'].map(id => new Element(id));
  const find = (id, nodes = roots) => {
    for (const node of nodes) { if (node.id === id) return node; const child = find(id, node.children); if (child) return child; }
    return null;
  };
  find('ycPanel').classList.add('open');
  const context = {
    Map, Set, Date, console, $: find,
    document: { hidden: false, createElement: () => new Element() },
    state: { uid: 'me', view: 'thread', profiles: {}, openThread: { uid: 'peer' } },
    threadPage: { loading: false, hasMore: true },
    lastThreadMsgs: null, lastRoomMsgs: null, lastNewsMsgs: null,
    dayLabel: ts => String(Math.floor(ts / 86400000)), mentionsMe: () => false,
    receiptFor: m => m.receipt || null,
    buildMessageRow(m) { counts.rows++; const row = new Element(); row.dataset.key = m.key; row.textContent = m.text; return row; },
    scrollToBottom() { counts.scrolls++; },
    renderPeople() { counts.people++; }, renderThreads() { counts.dms++; },
    markRoomRead() {}, markNewsRead() {}, markThreadRead() {}, recountUnread() {}
  };
  vm.createContext(context);
  for (const [start, end] of [
    ['function panelIsOpen() {', '/* ============================ LISTENING JAMS'],
    ['function profStamp(uid) {', 'function personRow(p)'],
    ['function paintThreadTop() {', 'async function loadOlderThread()'],
    ['function markVisibleRead() {', 'function recountUnread()']
  ]) vm.runInContext(section(start, end), context);
  const messages = n => Array.from({ length: n }, (_, i) => ({ key: String(i), uid: 'peer', ts: i * 1000, text: 'Message ' + i }));
  const reset = () => { for (const key of Object.keys(counts)) counts[key] = 0; };
  const render = msgs => context.renderMessages(find('ycThreadScroll'), msgs, 'Empty');
  return { context, counts, find, messages, reset, render };
}

let passed = 0;
function check(name, run) { run(); passed++; console.log('PASS ' + name); }

check('400 unchanged DM messages cause no DOM moves or scroll requests', () => {
  const f = fixture(), msgs = f.messages(400); f.render(msgs);
  const marker = f.find('ycThreadTop'), first = f.find('ycThreadScroll').children[2];
  f.reset(); f.render(msgs);
  assert.equal(f.counts.inserts, 0); assert.equal(f.counts.removes, 0);
  assert.equal(f.counts.rows, 0); assert.equal(f.counts.scrolls, 0);
  assert.equal(f.find('ycThreadTop'), marker); assert.equal(f.find('ycThreadScroll').children[2], first);
});

check('a read receipt replaces only its message row', () => {
  const f = fixture(), msgs = f.messages(100); msgs[50].uid = 'me'; f.render(msgs);
  f.reset(); msgs[50] = { ...msgs[50], receipt: 'Seen' }; f.render(msgs);
  assert.equal(f.counts.rows, 1); assert.equal(f.counts.inserts, 1); assert.equal(f.counts.removes, 1);
});

check('appending and removing a message preserves all unaffected rows', () => {
  const f = fixture(), msgs = f.messages(100); f.render(msgs);
  f.reset(); f.render([...msgs, { key: '100', uid: 'peer', ts: 100000, text: 'New' }]);
  assert.equal(f.counts.inserts, 1); assert.equal(f.counts.removes, 0);
  f.reset(); f.render(msgs.filter(m => m.key !== '50'));
  assert.equal(f.counts.inserts, 0); assert.equal(f.counts.removes, 2);
});

check('older messages keep chronological order and one pagination marker', () => {
  const f = fixture(), msgs = f.messages(60); f.render(msgs.slice(30));
  const marker = f.find('ycThreadTop'); f.render(msgs);
  const box = f.find('ycThreadScroll');
  assert.equal(box.firstElementChild, marker);
  assert.deepEqual(box.children.filter(e => e.dataset.key).map(e => e.dataset.key), msgs.map(m => m.key));
  f.context.threadPage.loading = true; f.context.paintThreadTop();
  assert.equal(marker.textContent, 'loading older messages…');
  f.context.threadPage.loading = false; f.context.threadPage.hasMore = false; f.context.paintThreadTop();
  assert.equal(marker.textContent, 'this is the start of your conversation');
  assert(marker.classList.contains('end'));
});

check('updating a scrolled-up conversation does not jump to the bottom', () => {
  const f = fixture(), msgs = f.messages(100); f.render(msgs);
  const box = f.find('ycThreadScroll'); box.scrollHeight = 5000; box.clientHeight = 500; box.scrollTop = 200;
  f.reset(); f.render([...msgs, { key: '100', uid: 'peer', ts: 100000, text: 'New' }]);
  assert.equal(box.scrollTop, 200); assert.equal(f.counts.scrolls, 0);
});

check('hidden room updates paint once with the newest data on opening', () => {
  const f = fixture(); f.context.state.view = 'room'; f.find('ycPanel').classList.remove('open');
  for (let n = 1; n <= 10; n++) {
    f.context.lastRoomMsgs = f.messages(n);
    f.context.renderMessages(f.find('ycRoomScroll'), f.context.lastRoomMsgs, 'Empty');
  }
  assert.equal(f.counts.rows, 0); assert.equal(f.counts.inserts, 0);
  f.find('ycPanel').classList.add('open');
  let readAfterPaint = false;
  f.context.markRoomRead = () => { readAfterPaint = f.find('ycRoomScroll').children.some(e => e.dataset.key === '9'); };
  f.context.markVisibleRead();
  assert.equal(f.counts.rows, 10); assert(readAfterPaint);
});

check('hidden tabs and background windows catch up without painting early', () => {
  const f = fixture(); f.context.lastNewsMsgs = f.messages(3);
  f.context.renderMessages(f.find('ycNewsScroll'), f.context.lastNewsMsgs, 'Empty');
  assert.equal(f.counts.rows, 0);
  f.context.state.view = 'announce'; f.context.document.hidden = true; f.context.renderVisibleChat();
  assert.equal(f.counts.rows, 0);
  f.context.document.hidden = false; f.context.markVisibleRead(); assert.equal(f.counts.rows, 3);
  f.context.lastThreadMsgs = f.messages(5); f.context.state.view = 'thread'; f.context.renderVisibleChat();
  assert.equal(f.counts.rows, 8); assert(f.find('ycThreadTop'));
});

check('people and DM lists refresh when reopening their panel', () => {
  const f = fixture(); f.context.state.view = 'people'; f.context.renderVisibleChat();
  f.context.state.view = 'dms'; f.context.renderVisibleChat();
  assert.equal(f.counts.people, 1); assert.equal(f.counts.dms, 1);
  f.find('ycPanel').classList.remove('open'); f.context.renderVisibleChat(); assert.equal(f.counts.dms, 1);
});

console.log(passed + ' chat regression checks passed');
