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

function writeFixture() {
  const input = {
    value: '', maxLength: 1000, selectionStart: 0, selectionEnd: 0,
    setRangeText(text, start, end) { this.value = this.value.slice(0, start) + text + this.value.slice(end); },
    focus() {}
  };
  const notices = [], writes = [], previews = [], revisions = [];
  const context = vm.createContext({
    ROOT: 'chat', db: {}, sessionStarted: true, candVersion: 0,
    state: { ready: true, uid: 'me', authUid: 'auth', name: 'Me', view: 'thread', openThread: { uid: 'a', name: 'First DM' }, groups: {}, people: { a: { uid: 'a', name: 'Sam' }, b: { uid: 'b', name: 'Sam Smith' } } },
    dbfns: {
      ref: (_, path) => path,
      push: async (path, payload) => { writes.push({ path, payload }); return { key: 'new' }; },
      update: async (path, patch) => previews.push({ path, patch }),
      set: async (path, value) => writes.push({ path, value })
    },
    $: id => id === 'ycInput' ? input : null,
    threadId: (_, other) => other, msgsPath: id => 'chat/dm/' + id,
    isGroupId: id => id.startsWith('g_'), allThreads: () => ({}),
    say: message => notices.push(message), bumpThreadMeta: id => revisions.push(id),
    closeMentionPop() {}, stopTyping() {}, autoGrow() {}, markThreadRead() {},
    canSee: () => true, previewText: text => text,
    renderEmojiGrid() {}, nameFor: uid => uid, imageSrcOf: () => null, cardOf: () => null,
    reactorsOf: () => [], console: { warn() {}, error() {} },
    setTimeout: callback => { queueMicrotask(callback); return 0; }
  });
  for (const [start, end] of [
    ['function escapeRe(', 'function paintMentions('],
    ['/* A preview write can fail', 'function paintGroupHead('],
    ['/* ---------- sending pictures ---------- */', 'function jumpToMessage('],
    ['const YC_EMOJI_TAGS =', 'function paintEmojiCats('],
    ['function replaceChatInput(', 'function fitEmojiPicker('],
    ['const reactionWrites =', 'function closeReactPicker('],
    ['async function send(override)', 'function autoGrow()']
  ]) vm.runInContext(section(start, end), context);
  context.paintEmojiCats = () => {};
  const evaluate = code => vm.runInContext(code, context);
  const switchTo = (uid, name) => {
    evaluate('rememberChatDraft(chatDestination())');
    context.state.openThread = { uid, name };
    evaluate('restoreChatDraft(chatDestination())');
  };
  return { input, notices, writes, previews, revisions, context, evaluate, switchTo };
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

(async () => {
  const delayed = writeFixture();
  const push = deferred();
  delayed.context.dbfns.push = () => push.promise;
  delayed.input.value = 'first draft';
  const sent = delayed.context.send();
  delayed.switchTo('b', 'Second DM');
  delayed.input.value = 'second draft';
  push.resolve({ key: 'new' });
  await sent;
  assert.equal(delayed.previews[0].patch['dmIndex/me/a/name'], 'First DM');
  assert.equal(delayed.input.value, 'second draft');
  delayed.switchTo('a', 'First DM');
  assert.equal(delayed.input.value, '');

  const failed = writeFixture();
  const rejection = deferred();
  failed.context.dbfns.push = () => rejection.promise;
  failed.input.value = 'keep this';
  const attempt = failed.context.send();
  failed.switchTo('b', 'Second DM');
  failed.input.value = 'new draft';
  rejection.reject(Error('offline'));
  await attempt;
  assert.equal(failed.input.value, 'new draft');
  failed.switchTo('a', 'First DM');
  assert.equal(failed.input.value, 'keep this');

  const retry = writeFixture();
  let updates = 0;
  retry.context.dbfns.update = async () => { if (++updates === 1) throw Error('offline'); };
  retry.input.value = 'stored once';
  await retry.context.send();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(retry.writes.length, 1);
  assert.equal(updates, 2);
  assert.equal(retry.input.value, '');
  assert.deepEqual(retry.notices, []);

  const edits = writeFixture();
  const save = deferred();
  edits.context.dbfns.update = () => save.promise;
  edits.evaluate('startEdit({ uid: "me", key: "edit-a", text: "original" })');
  edits.input.value = 'edited a';
  const edit = edits.context.send();
  edits.switchTo('b', 'Second DM');
  edits.evaluate('startEdit({ uid: "me", key: "edit-b", text: "untouched" })');
  save.resolve();
  await edit;
  assert.equal(edits.input.value, 'untouched');
  assert.equal(edits.evaluate('compose.target.key'), 'edit-b');
  assert.deepEqual(edits.revisions, ['a']);
  assert.deepEqual(edits.notices, []);
  edits.context.dbfns.update = async () => { throw Error('offline'); };
  edits.input.value = 'keep this edit';
  await edits.context.send();
  assert.equal(edits.evaluate('compose.target.key'), 'edit-b');
  assert.equal(edits.input.value, 'keep this edit');

  const reactions = writeFixture();
  const reaction = deferred();
  reactions.context.dbfns.set = () => reaction.promise;
  const react = reactions.context.toggleReaction({ key: 'msg' }, '🎵');
  reactions.switchTo('b', 'Second DM');
  reaction.resolve();
  await react;
  assert.deepEqual(reactions.revisions, ['a']);

  const tools = writeFixture();
  assert.deepEqual([...tools.context.findMentions('@Sam Smith, not `@Sam`')], ['b']);
  assert.equal(tools.context.shortcodeToEmoji(':eyes: `:eyes:`'), '👀 `:eyes:`');
  assert.equal(tools.context.shortcodeToEmoji('```js\n:eyes:\n```'), '```js\n:eyes:\n```');
  tools.input.value = 'x'.repeat(1000);
  tools.input.selectionStart = tools.input.selectionEnd = 1000;
  assert.equal(tools.context.insertEmojiIntoComposer('🎵'), false);
  assert.equal(tools.input.value.length, 1000);
  tools.input.selectionStart = 998;
  assert.equal(tools.context.insertEmojiIntoComposer('🎵'), true);
  assert.equal(tools.input.value.slice(-2), '🎵');
  tools.evaluate('buildEmoji()');
  tools.context.$ = id => id === 'ycEmojiSearch' ? { value: '🎵' } : null;
  tools.context.emojiSetView();
  assert.deepEqual([...tools.evaluate('emojiState.view.map(item => item.c)')], ['🎵']);
  tools.context.state.view = 'people';
  await tools.context.send('sample');
  await tools.context.handlePictureFile({ type: 'image/webp' });
  assert.deepEqual(tools.writes, []);
  console.log('PASS chat writes, drafts, preview retries, reactions, mentions, and emoji edge cases');
})().catch(error => { console.error(error); process.exitCode = 1; });
