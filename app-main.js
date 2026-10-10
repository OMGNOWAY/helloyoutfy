/* ===================== changelog.js ===================== */
var version = "1.4.5";
const CHANGELOG_DATA = {
  "Release 1.4.5": [
    `Added Group chats`,
    `Added more download servers so people can download their songs (<or something>)`,
    `Added playlists, so you can make playlists now or something...`,
    `Also updates should be able to popup after refresh now`,
    `Thats it for now i think`,
  ],
  "Release 1.4.4": [
    `Redid (<(kinda)>) the chat UI`,
    `Made the sidebar go to the top, and if you want you can make it go to the bottom`,
    `Made it so you can save your API keys now (<(so they will be saved with your account)>)`,
    `Thats it for now (<(no more updates for a while unless you guys give me more ideas)>)`
  ],
  "Release 1.4.3": [
    `Added an ACTUAL queue.`,
    `Uhm I think thats all... (<(maybe uhm the download server might be faster?)>)`,
  ],
  "Release 1.4.2" : [
    `I redid the youtube download API (<(you are welcome, also its better and yes i copied the same text from last update, also no more key for downloading)>)`,
    `CHECK CHAT FOR COOL LITTLE THING (<(please)>)`,
    `You can upload images in DM'S not the general chat (<(and or room)>)`,
    `Fixed some lag with the chat (<(i hope...)>)`,
    `Guys give me ideas, im not burnt out anymore (<and dont give me shit ideas or else>)`,
  ],
  "Release 1.4.1" : [
    `DMs now load the rest when you scroll up (<(well it should at least)>)`,
    `The chat remembers your DMs so it doesnt re-download them every time (<(this was also the reason why the server was slow)>)`,
    `Added a reconnecting screen so you know when its dropped`,
    `You cant accidentally make a second account on the same browser anymore`,
    `Pictures and GIFs get squished more before sending (<(they were taking up 98% of the server :\)>)`,
    `I fixed the youtube download API (<(you are welcome)>)`,
  ],
  "Release 1.4.0" : [
    `Added an emoji picker (<(1900 of them, and it doesnt lag, ive tested it :\)>)`,
    `Emojis look the same for everyone now (<(cause these fucking chromebook emojis are ugly)>)`,
    `You can type :shortcodes: to find emojis (<(like discord, also this is another QoL)>)`,
    `Added a loading screen so it doesnt look empty while it connects (<(cause it will do that and i know it will)>)`,
    `The chat pushes the app over instead of covering it (<(like the old lyrics thing, alan would know what im talking about)>)`,
  ],
  "Release 1.3.4" : [
    `Added notifications for DMs and @mentions (<(only when youre not looking, its in your profile)>) (<(also this is just a QoL thing)>)`,
    `Your pfp, bio and stats now save to the server (<(so they stay the same on every device, cause i want that)>)`,
    `GIFs look a bit nicer`,
    `Fixed emojis and replies making giant empty space`,
    `Fixed everything being see-through in performance mode`,
    `Fixed text being unreadable on the dark themes`,
    `You cant set a pfp before logging in anymore (<(it wasnt supposed to do that anyways but i was lazy so its fixed now)>)`,
    `Fixed one person not being able to send messages at all`
  ],
  "Release 1.3.3" : [
    `Added listening jams (<(kinda like spotify but not really)>)`,
    `Added typing indicators (<(room and DMs)>)`,
    `Added read receipts in DMs (<(you can turn them off in your profile)>)`,
    `Added reactions to messages (<(cause some people wanted it)>)`,
  ],
  "Release 1.3.0" : [
    `Added replying and editing messages (<(THAT ARE YOUR OWN)>)`,
    `Added a sorting system for the queue (<(due to alan asking and wanted to do that for a while)>)`,
    `Added the ability to @ people and made it so the room (<(and or global chat)>) doesnt ping you`,
    `Muting actually works now (<(refreshing doesnt get you out of it anymore)>)`
  ],
  "Release 1.2.0" : [
    `Mostly bug fixes...`,
    `Fixed the non-read messages (<(so like the badges)>)`,
    `Added like a bio section to the thing!`,
    `Also you can you change your profile and stuff...`
  ],
  "Release 1.1.1" : [
    `I added photo upload!`,
    `I also added so if someone messages you, it shows it on the title`,
    `Added update button thingy, so go in settings`,
    `(<(server wise, i added a button that i can click if you need to update your version)>)`
  ],
  "Release 1.1.0" : [
    `I added chat back (<(IT WORKS NOW! OKAY?)>)`,
    `I added annoucments to it now cause i need to tell you guys when updates are available`,
    `All of you please go put your name in the chat thing (<(its so i can give you guys updates, also no bad names)>)`,
    `Thats it for now.`
  ],
  "Release 1.0.0": [
    `I've added so many updates that i dont know what version we are on...`,
    `If you guys have any problems and or features you want me to add, email me. (<(daniel.warren@student.pinecrestnv.org)>)`, 
    `Also i merged the lyrics and youtube thing together`,
    `Also people were complaining about lag so there is performance mode now (<(check settings)>)`
  ],
  "0.9 beta": [
    `Very big update! (<(Release might come soon)>)`,
    `REDID the entire ui! (<(i hope you like it)>)`,
    `Fixed some bugs with crossfade!`,
    `Fixed the searching bug with the queue and the songs!`,
    `Fixed the mobile volume slider disappearing (<(yes there is a ui for mobile devices.)>)`,
    `Fixed the bottom of the page getting eaten by the player bar (<(finally)>)`,
    `Added a queue count + time thing so you know how long your music pile is`,
    `Added a Clear Search button for songs (<(cause backspacing is boring)>)`,
    `Press Escape while searching and it clears it now`,
    `Added a Now Playing jump button so you can find the song that is actually playing`,
    `Added Random Track button (<(for when you dont know what to play)>)`,
    `Added Shuffle button in the Songs header too`,
    `Added Copy Now Playing (<(very unnecessary but i need stuff to add...)>)`,
    `Added shortcuts for random tracks and jumping to the current song`,
    `Made the lyrics and eq buttons behave better again`,
    `Made mobile spacing less annoying (<(hopefully no more playbar jumpscare)>)`,
    `uhm thats it... (<(for now)>)`,
  ],
  "0.8 Beta": [
    `Okay so basically this update is big but isnt...`,
    `Music now loads from the folder where the music is!`,
    `Fixed the play/pause button! (<(it wouldn't update when it paused from unplugging headphones)>)`,
    `Fixed the media session thing to show the actual song playing and not the "next song" in the queue.`,
    `(<(ill fix the crossfade later)>)`
  ],
  "0.7 Beta": [
    `Fixed the crossfade, so it should work now! (<(i know its been a while)>)`,
    `Gave the UI a lil touch up so everything might be a lil dark... (<(if you want to see it enable the Album Art Background in settings)>)`,
    `Made code cleaner (<(so its easier for me to diagnose bugs)>)`,
    `Playback speed slider now actually changes pitch!`,
    `Crossfade settings now save again! (<(and redid it)>)`, 
    `Moved the stuff in settings around a bit`,
    `Can now edit and delete themes!`,
    `Changed the theme maker UI to be more user-friendly (<(or something)>)`,
    `This is going to be the new font for the Change Log...`,
    `(<(if you have AAB on and go to the console, type getAABTheme();)>)`,
  ],
  "0.6 Beta": [
    `Got rid of the server/server commands (<(cause it isnt needed)>)`,
    `Removed the music quality option & the lyrics toggle button from settings (<(cause that also isnt needed and why were they still there)>)`,
  ],
  "0.5 Beta": [
   `"One, Two, Skip a few" ahh update 😭😭 (<(Anyways big update...)>)`,
   `Fully REVAMPED the Album Art Cover Background Thingy`,
   `Added the ability to drag songs around to change the queue or whatever (<(dont know if it saves or not)>)`,
  ],
  "0.4 Beta": [
    `Added loading thing for songs (<(so you know if they are loading or not)>) (<(YES I STOLE IT FROM THE LYRICS PANEL)>)`,
    `Fixed the theme problem where it wouldn't apply custom themes`,
    `Changed 'Your Queue' to 'Songs' (<(cause it makes more sense)>)`,
    `(<(maybe the next update is going to be a new ui 👀)>)`
  ],
  "0.3 Beta": [
    `Got fully rid of the chat (<(the chat was really never needed...)>)`,
    `(<(Next update is going to be good trust 👀)>)`
  ],
  "0.2 Beta": [
    `I THINK i fixed the problem with the songs not loading (<(might be wrong though)>)`,
    "Added like the ability to see past updates (<(you are looking at it!)>)",
    "New text formatting for small notes!"
  ],
  "0.1 Beta": [
    "Added a popup if you don't have access to download files.",
    "Put storage info on the Queue.",
    "Added a changelog thingy and the button (<(Hurray ^-^)>)"
  ],
  "0.9 Alpha": [
    "TRIED to fix 'Database connection test failed' errors by syncing IDB versions.",
    "Improved layout responsiveness: Player buttons no longer disappear on small screens. (<(at least i hope...)>)",
    "Added 'Stale Connection' auto-refresh logic for smoother playback. (<(which doesnt work :/)>)",
    "Fixed race condition where the 'tracks' store wouldn't be created on first load."
  ],
};

/* ===================== app.js ===================== */
// ============================================================================
// BOOTSTRAP
// ============================================================================
console.log('It works now');
let backgroundImages = '';
try { backgroundImages = localStorage.getItem('youtifiy_bgimage') || ''; } catch (e) {}

// ============================================================================
// UTILS — static helpers used everywhere
// ============================================================================

class Utils {
  static escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  static formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  static formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return '0 min';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
  }

  static formatFileSize(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  }

  /** Converts raw bytes to a human-readable string (KB / MB / GB). */
  static formatBytes(bytes) {
    const gb = bytes / Math.pow(1024, 3);
    if (gb >= 1) return gb.toFixed(2) + ' GB';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return mb.toFixed(2) + ' MB';
    return (bytes / 1024).toFixed(2) + ' KB';
  }

  static generateUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static timeAgo(isoString) {
    const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  static toast(message, duration = 3000) {
    const toastEl = document.getElementById('toast');
    const messageEl = document.getElementById('toastMessage');
    if (!toastEl || !messageEl) return;

    // Cancel any pending hide from a previous toast. Without this, an earlier
    // toast's timer fires partway through the new one and cuts it off, so
    // back-to-back messages would flash and vanish.
    clearTimeout(Utils._toastHideTimer);
    clearTimeout(Utils._toastVisTimer);

    messageEl.textContent = message;
    toastEl.style.visibility = "visible";
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');

    // Restart the slide-in even if a toast is already on screen.
    toastEl.classList.remove('show');
    void toastEl.offsetWidth;
    toastEl.classList.add('show');

    Utils._toastHideTimer = setTimeout(() => toastEl.classList.remove('show'), duration);
    Utils._toastVisTimer  = setTimeout(() => { toastEl.style.visibility = "hidden"; }, duration + 400);
  }

  static createModal(title, wide = false) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-overlay active';
    backdrop.style.zIndex = '1000';

    const modalEl = document.createElement('div');
    modalEl.className = wide ? 'modal wide' : 'modal';

    const header = document.createElement('div');
    header.className = 'modal-header';
    header.innerHTML = `
      <h2 class="modal-title">${title}</h2>
      <button class="modal-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg></button>`;

    const body = document.createElement('div');
    body.className = 'modal-body';

    modalEl.appendChild(header);
    modalEl.appendChild(body);
    backdrop.appendChild(modalEl);
    document.body.appendChild(backdrop);

    const close = () => backdrop.remove();
    header.querySelector('.modal-close').addEventListener('click', close);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });

    return { element: backdrop, body, close };
  }

  static addGlobalCSS(cssRules) {
    const styleEl = document.createElement('style');
    styleEl.textContent = cssRules;
    document.body.appendChild(styleEl);
  }

  static similarity(str1, str2) {
    const len = Math.max(str1.length, str2.length);
    return 1 - Utils.levenshtein(str1.toLowerCase(), str2.toLowerCase()) / len;
  }

  static levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  }
}

// Expose globally for legacy HTML inline calls
const escapeHtml    = (...args) => Utils.escapeHtml(...args);
const toast         = (...args) => Utils.toast(...args);
const formatTime    = (...args) => Utils.formatTime(...args);
const formatFileSize = (...args) => Utils.formatFileSize(...args);
const formatDuration = (...args) => Utils.formatDuration(...args);
const generateUID   = (...args) => Utils.generateUID(...args);
const createModal   = (...args) => Utils.createModal(...args);
const addGlobalCSS  = (...args) => Utils.addGlobalCSS(...args);

// ============================================================================
// DEV CONSOLE
// ============================================================================

class DevConsoleClass {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.commandCounter = 0;
    this.isOpen = false;
    this.maxHistory = 1000;
    this.autoCompleteIndex = -1;
    this.autoCompleteItems = [];
    this.objectIdCounter = 0;
    this.originalConsole = {};
    this.elements = {};
  }

  init() {
    this.cacheElements();
    this.setupEventListeners();
    this.hijackConsole();
    this.setupErrorHandling();
    this.setupDraggable();

    try {
      const saved = localStorage.getItem('devConsole_history');
      if (saved) this.history = JSON.parse(saved);
    } catch (e) {}

    window.$_ = undefined;
    window.DevConsole = this;

    console.log('%cDevConsole initialized', 'color:#3fb950;font-weight:bold;');
    return this;
  }

  cacheElements() {
    this.elements = {
      container:      document.getElementById('devConsole'),
      output:         document.getElementById('consoleOutput'),
      input:          document.getElementById('consoleInput'),
      status:         document.getElementById('consoleStatus'),
      toggleBtn:      document.getElementById('consoleToggleBtn'),
      autocompleteBox:document.getElementById('autocompleteBox'),
      preserveLog:    document.getElementById('preserveLog'),
      catchErrors:    document.getElementById('catchErrors'),
    };
  }

  setupEventListeners() {
    const { input } = this.elements;
    input.addEventListener('keydown', (e) => this.handleInputKeydown(e));
    input.addEventListener('input', () => this.autoResizeInput());

    document.addEventListener('keydown', (e) => {
      if (e.key === '`' && e.ctrlKey && !e.repeat) {
        e.preventDefault();
        if (document.activeElement !== input) this.toggle();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.console-input-area')) this.hideAutocomplete();
    });
  }

  handleInputKeydown(e) {
    const { input } = this.elements;
    switch (e.key) {
      case 'Enter':
        if (!e.shiftKey) { e.preventDefault(); this.execute(); }
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.autoCompleteItems.length > 0 ? this.navigateAutocomplete(-1) : this.navigateHistory(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.autoCompleteItems.length > 0 ? this.navigateAutocomplete(1) : this.navigateHistory(1);
        break;
      case 'Tab':
        e.preventDefault();
        this.autoCompleteItems.length > 0 ? this.applyAutocomplete(this.autoCompleteIndex) : this.handleAutocomplete();
        break;
      case 'Escape':
        this.autoCompleteItems.length > 0 ? this.hideAutocomplete() : input.blur();
        break;
      case 'k':
        if (e.ctrlKey) { e.preventDefault(); this.clear(); }
        break;
      case '`':
        if (e.ctrlKey) { e.preventDefault(); this.toggle(); }
        break;
    }
  }

  setupDraggable() {
    const header = document.getElementById('consoleHeader');
    const container = this.elements.container;
    let isDragging = false, startX, startY, startLeft, startTop;

    header.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      isDragging = true;
      startX = e.clientX; startY = e.clientY;
      const rect = container.getBoundingClientRect();
      startLeft = rect.left; startTop = rect.top;
      container.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = startLeft + (e.clientX - startX);
      const y = startTop + (e.clientY - startY);
      container.style.left = Math.max(0, Math.min(window.innerWidth - 100, x)) + 'px';
      container.style.top  = Math.max(0, Math.min(window.innerHeight - 100, y)) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) { isDragging = false; container.style.transition = ''; }
    });
  }

  hijackConsole() {
    const methods = ['log','warn','error','info','debug','table','clear','dir','trace','group','groupEnd','time','timeEnd','count','assert'];
    methods.forEach(method => {
      this.originalConsole[method] = console[method];
      console[method] = (...args) => {
        this.originalConsole[method].apply(console, args);
        if (method === 'clear') {
          if (!this.elements.preserveLog?.checked) this.clear();
        } else if (method === 'table') {
          this.printTable(args[0], args[1]);
        } else if (method === 'dir') {
          this.print('log', args);
        } else {
          this.print(method, args);
        }
      };
    });
  }

  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      if (this.elements.catchErrors?.checked) {
        if (!(e.lineno === 1 && e.colno === 9)) {
          this.print('error', [`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`]);
          if (e.error?.stack) this.print('stack', [e.error.stack]);
        }
      }
    });

    window.addEventListener('unhandledrejection', (e) => {
      if (this.elements.catchErrors?.checked) {
        this.print('error', [`Unhandled Promise Rejection: ${e.reason}`]);
      }
    });
  }

  execute() {
    const { input } = this.elements;
    const code = input.value.trim();
    if (!code) return;

    if (this.history.length === 0 || this.history[this.history.length - 1] !== code) {
      this.history.push(code);
      if (this.history.length > this.maxHistory) this.history.shift();
      try { localStorage.setItem('devConsole_history', JSON.stringify(this.history)); } catch (e) {}
    }
    this.historyIndex = this.history.length;
    this.printCommand(code);

    try {
      this.setStatus('Running...', '#f0883e');
      const startTime = performance.now();
      const result = (0, eval)(code);
      const duration = (performance.now() - startTime).toFixed(2);
      window.$_ = result;
      this.printResult(result, duration);
      this.setStatus('Ready', '#3fb950');
    } catch (err) {
      this.printError(err);
      this.setStatus('Error', '#f85149');
    }

    input.value = '';
    input.style.height = 'auto';
    this.hideAutocomplete();
    setTimeout(() => input.focus(), 0);
  }

  printCommand(code) { this.print('command', [code]); }

  printResult(result, duration) {
    const formatted = this.formatValue(result, true, 0, new WeakSet());
    const timeStr = `<span style="color:#8b949e;font-size:11px;margin-left:8px;">(${duration}ms)</span>`;
    const entry = document.createElement('div');
    entry.className = 'console-entry entry-result';
    entry.innerHTML = `<div class="entry-content"><span class="entry-icon">◀</span><div class="entry-body">${formatted + timeStr}</div></div>`;
    this.elements.output.appendChild(entry);
    this.scrollToBottom();
  }

  printError(err) {
    this.print('error', [err.toString()]);
    if (err.stack) this.print('stack', [err.stack]);
  }

  print(type, args) {
    const { output } = this.elements;
    const entry = document.createElement('div');
    entry.className = `console-entry entry-${type}`;

    const icons = { log:'', warn:'⚠️', error:'❌', info:'ℹ️', debug:'🐛', command:'❯', result:'◀', stack:'   ' };
    let content;

    if (type === 'stack') {
      content = `<div class="entry-stack">${this.escapeHtml(args[0])}</div>`;
    } else {
      const formatted = args.map((arg, i) => (i > 0 ? ' ' : '') + this.formatValue(arg, true, 0, new WeakSet())).join('');
      content = `<div class="entry-body">${formatted}</div>`;
    }

    entry.innerHTML = `<div class="entry-content"><span class="entry-icon">${icons[type] || ''}</span>${content}</div>`;
    output.appendChild(entry);
    this.scrollToBottom();
  }

  formatValue(val, allowExpand = true, depth = 0, seen) {
    if (!seen) seen = new WeakSet();
    if (val !== null && typeof val === 'object') {
      if (seen.has(val)) return '<span class="syntax-weakref">[Circular]</span>';
      seen.add(val);
    }

    if (val === null)      return '<span class="syntax-null">null</span>';
    if (val === undefined) return '<span class="syntax-undefined">undefined</span>';

    const type = typeof val;
    if (type === 'string') {
      const str = val.length > 500 && !allowExpand ? this.escapeHtml(val.substring(0, 500)) + '...' : this.escapeHtml(val);
      return `<span class="syntax-string">"${str}"</span>`;
    }
    if (type === 'number')   return `<span class="syntax-number">${val}</span>`;
    if (type === 'boolean')  return `<span class="syntax-boolean">${val}</span>`;
    if (type === 'bigint')   return `<span class="syntax-bigint">${val}n</span>`;
    if (type === 'symbol')   return `<span class="syntax-symbol">${val.toString()}</span>`;
    if (type === 'function') {
      const name = val.name || 'anonymous';
      const preview = val.toString().substring(0, 50).replace(/\n/g, ' ');
      return `<span class="syntax-function">ƒ ${name}()</span> <span style="color:#8b949e;font-size:11px;">{${this.escapeHtml(preview)}${preview.length > 50 ? '...' : ''}}</span>`;
    }
    if (val instanceof Date)    return `<span class="syntax-date">Date</span> <span style="color:#c9d1d9;">"${val.toISOString()}"</span>`;
    if (val instanceof RegExp)  return `<span class="syntax-regexp">${val.toString()}</span>`;
    if (val instanceof Error)   return `<span class="syntax-error">${val.name}: ${val.message}</span>`;
    if (val instanceof Promise) return `<span class="syntax-promise">Promise</span> {<pending>}`;

    if (Array.isArray(val)) {
      if (val.length === 0) return '<span style="color:#ffa657;">[]</span>';
      if (!allowExpand || depth > 2) {
        const preview = Array.from({ length: Math.min(3, val.length) }, (_, i) => this.formatValue(val[i], false, depth + 1, seen));
        return `<span style="color:#ffa657;">Array(${val.length})</span> <span style="color:#8b949e;">[${preview.join(', ')}${val.length > 3 ? ', ...' : ''}]</span>`;
      }
      const id = 'arr-' + (++this.objectIdCounter);
      let html = `<div style="display:inline-block;vertical-align:top;"><span class="object-preview tree-expanded" onclick="DevConsole.toggleExpand('${id}',this)" data-target="${id}">Array(${val.length})</span><div id="${id}" class="object-tree">`;
      for (let i = 0; i < val.length; i++) {
        html += `<div class="tree-item"><span class="tree-key">${i}:</span> ${this.formatValue(val[i], true, depth + 1, seen)}</div>`;
      }
      return html + '</div></div>';
    }

    if (type === 'object') {
      const keys = Object.keys(val);
      if (keys.length === 0) return '<span style="color:#ffa657;">{}</span>';
      if (!allowExpand || depth > 2) {
        const preview = [];
        for (let i = 0; i < Math.min(3, keys.length); i++) {
          try { preview.push(`${keys[i]}: ${this.formatValue(val[keys[i]], false, depth + 1, seen)}`); }
          catch { preview.push(`${keys[i]}: [Error]`); }
        }
        return `<span style="color:#ffa657;">Object</span> <span style="color:#8b949e;">{${preview.join(', ')}${keys.length > 3 ? ', ...' : ''}}</span>`;
      }
      const id = 'obj-' + (++this.objectIdCounter);
      let html = `<div style="display:inline-block;vertical-align:top;"><span class="object-preview tree-expanded" onclick="DevConsole.toggleExpand('${id}',this)" data-target="${id}">Object</span><div id="${id}" class="object-tree">`;
      for (const key of keys) {
        try { html += `<div class="tree-item"><span class="tree-key">${key}:</span> ${this.formatValue(val[key], true, depth + 1, seen)}</div>`; }
        catch { html += `<div class="tree-item"><span class="tree-key">${key}:</span> <span style="color:#f85149;">[Error accessing]</span></div>`; }
      }
      const proto = Object.getPrototypeOf(val);
      if (proto && proto !== Object.prototype) {
        html += `<div class="tree-item" style="color:#8b949e;font-style:italic;">[[Prototype]]: ${proto.constructor?.name || 'Object'}</div>`;
      }
      return html + '</div></div>';
    }
    return String(val);
  }

  toggleExpand(id, element) {
    const target = document.getElementById(id);
    if (!target || !element) return;
    const isHidden = target.style.display === 'none';
    target.style.display = isHidden ? 'block' : 'none';
    element.classList.toggle('tree-expanded', isHidden);
    element.classList.toggle('tree-collapsed', !isHidden);
  }

  printTable(data, columns) {
    if (!data || (typeof data !== 'object' && !Array.isArray(data))) { this.print('log', [data]); return; }
    const isArray = Array.isArray(data);
    const entries = isArray ? data : Object.entries(data);
    if (entries.length === 0) { this.print('log', ['(empty table)']); return; }

    const allKeys = new Set();
    if (isArray) data.forEach(row => { if (row && typeof row === 'object') Object.keys(row).forEach(k => allKeys.add(k)); });
    else Object.keys(data).forEach(k => allKeys.add(k));
    const keys = columns || Array.from(allKeys).slice(0, 10);

    let html = '<div style="margin:8px 0;overflow-x:auto;"><table style="border-collapse:collapse;font-size:12px;border:1px solid #30363d;"><thead><tr style="background:#161b22;">';
    if (!isArray) html += '<th style="padding:6px 12px;border:1px solid #30363d;color:#8b949e;">(key)</th>';
    keys.forEach(key => { html += `<th style="padding:6px 12px;border:1px solid #30363d;color:#8b949e;">${this.escapeHtml(String(key))}</th>`; });
    html += '</tr></thead><tbody>';

    entries.forEach(([key, row], idx) => {
      const actualRow = isArray ? row : key;
      html += `<tr style="background:${idx % 2 === 0 ? '#0d1117' : '#161b22'};">`;
      if (!isArray) html += `<td style="padding:6px 12px;border:1px solid #30363d;color:#8b949e;font-style:italic;">${this.escapeHtml(String(key))}</td>`;
      keys.forEach(k => {
        const v = isArray ? row?.[k] : actualRow?.[k];
        let display = v === undefined ? '<span style="color:#8b949e;">-</span>'
          : v === null ? '<span class="syntax-null">null</span>'
          : typeof v === 'object' ? `<span style="color:#ffa657;">{${Object.keys(v).length}}</span>`
          : this.escapeHtml(String(v).substring(0, 50));
        html += `<td style="padding:6px 12px;border:1px solid #30363d;">${display}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    const entry = document.createElement('div');
    entry.className = 'console-entry entry-log';
    entry.innerHTML = `<div class="entry-content"><span class="entry-icon"></span><div class="entry-body">${html}</div></div>`;
    this.elements.output.appendChild(entry);
    this.scrollToBottom();
  }

  handleAutocomplete() {
    const val = this.elements.input.value;
    const words = val.split(/[\s\.\[\]\(\)\{\}\+\-\*\/]+/);
    const lastWord = words[words.length - 1];
    if (!lastWord) return;

    const suggestions = [];
    try {
      Object.keys(window).forEach(k => {
        if (k.toLowerCase().startsWith(lastWord.toLowerCase()) && k !== lastWord)
          suggestions.push({ type: 'global', value: k, full: k });
      });
    } catch (e) {}

    if (words.length > 1) {
      try {
        const path = words.slice(0, -1).join('.');
        const obj = (0, eval)(path);
        if (obj && typeof obj === 'object') {
          Object.getOwnPropertyNames(obj).forEach(p => {
            if (p.toLowerCase().startsWith(lastWord.toLowerCase()))
              suggestions.push({ type: 'prop', value: p, full: path + '.' + p });
          });
        }
      } catch (e) {}
    }

    if (suggestions.length === 0) return;
    this.autoCompleteItems = suggestions.slice(0, 15);
    this.autoCompleteIndex = 0;
    this.renderAutocomplete();
  }

  renderAutocomplete() {
    const box = this.elements.autocompleteBox;
    box.innerHTML = this.autoCompleteItems.map((item, i) => `
      <div class="autocomplete-item ${i === this.autoCompleteIndex ? 'selected' : ''}" data-index="${i}" onclick="DevConsole.applyAutocomplete(${i})">
        <span class="autocomplete-type">${item.type}</span>
        <span>${item.value}</span>
      </div>`).join('');
    box.style.display = 'block';
  }

  navigateAutocomplete(direction) {
    this.autoCompleteIndex = Math.max(0, Math.min(this.autoCompleteIndex + direction, this.autoCompleteItems.length - 1));
    this.renderAutocomplete();
  }

  applyAutocomplete(index) {
    const item = this.autoCompleteItems[index];
    if (!item) return;
    const input = this.elements.input;
    const words = input.value.split(/([\s\.\[\]\(\)\{\}\+\-\*\/]+)/);
    words[words.length - 1] = item.full;
    input.value = words.join('');
    this.hideAutocomplete();
    input.focus();
  }

  hideAutocomplete() {
    this.elements.autocompleteBox.style.display = 'none';
    this.autoCompleteItems = [];
    this.autoCompleteIndex = -1;
  }

  navigateHistory(direction) {
    if (this.history.length === 0) return;
    this.historyIndex = Math.max(0, Math.min(this.historyIndex + direction, this.history.length - 1));
    this.elements.input.value = this.history[this.historyIndex] || '';
    this.autoResizeInput();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const { container, toggleBtn, input } = this.elements;
    container.classList.toggle('active', this.isOpen);
    if (this.isOpen) setTimeout(() => { input.focus(); this.scrollToBottom(); }, 100);
  }

  minimize() { this.toggle(); }

  maximize() {
    const c = this.elements.container;
    if (c.style.width === '100vw') {
      Object.assign(c.style, { width: '900px', height: '600px', top: '20px', left: '20px' });
    } else {
      Object.assign(c.style, { width: '100vw', height: '100vh', top: '0', left: '0' });
    }
  }

  clear() {
    if (!this.elements.preserveLog?.checked) this.elements.output.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'welcome-message';
    header.innerHTML = `<div class="welcome-title">Console cleared</div><div style="font-size:11px;">${new Date().toLocaleTimeString()}</div>`;
    this.elements.output.appendChild(header);
  }

  copyOutput() {
    const text = Array.from(this.elements.output.children)
      .map(el => el.textContent.replace(/[▼▶❯◀⚠️❌ℹ️🐛]/g, '').trim())
      .filter(t => t).join('\n');
    navigator.clipboard.writeText(text)
      .then(() => this.print('info', ['Output copied to clipboard']))
      .catch(() => this.print('error', ['Failed to copy']));
  }

  runLastCommand() {
    if (this.history.length > 0) {
      this.elements.input.value = this.history[this.history.length - 1];
      this.execute();
    }
  }

  autoResizeInput() {
    const input = this.elements.input;
    input.style.height = 'auto';
    input.style.height = Math.min(200, input.scrollHeight) + 'px';
  }

  scrollToBottom() { const { output } = this.elements; output.scrollTop = output.scrollHeight; }
  setStatus(text, color) { const { status } = this.elements; status.textContent = text; status.style.color = color; }
  escapeHtml(text) { return Utils.escapeHtml(String(text)); }
}

const DevConsole = new DevConsoleClass();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DevConsole.init());
} else {
  DevConsole.init();
}

// ============================================================================
// STATE & CONFIGURATION
// ============================================================================

window.addEventListener('beforeunload', (e) => { e.preventDefault(); e.returnValue = true; });

let tracks = [];
let queue = [];
let currentTrackIndex = -1;

// ===================== REAL "UP NEXT" QUEUE (sketch) =====================
// `queue` above is really your library/playlist. `userQueue` is the actual queue:
// tracks here play BEFORE the normal order, then playback resumes where it left off.
let userQueue = [];
let uqReturnIndex = -1;   // where to resume in `queue` once userQueue runs dry
let uqInternal = false;   // true while next()/crossfade starts a queued track

function uqPeek() { // library index of the next queued track (also accepts album tracks)
  while (userQueue.length) {
    const wanted = userQueue[0];
    let i = queue.findIndex(t => t.uid === wanted.uid);
    if (i !== -1) return i;

    // Album tracks may not currently be present in `queue` (for example after
    // playing an album, which can temporarily make queue album-only). Put the
    // queued track back into the playable queue instead of silently dropping it.
    const libraryTrack = tracks.find(t => t.uid === wanted.uid);
    if (libraryTrack) {
      queue.push(libraryTrack);
      return queue.length - 1;
    }

    userQueue.shift();
  }
  return -1;
}
function uqTake(idx) { // call when queue[idx] is about to start as "next"
  if (userQueue.length && queue[idx] && queue[idx].uid === userQueue[0].uid) {
    if (uqReturnIndex < 0) uqReturnIndex = currentTrackIndex;
    userQueue.shift();
    uqRender();
    return true;
  }
  return false;
}
function addToUserQueue(index, playNext = false) {
  const t = queue[index];
  if (!t) return;
  if (playNext) userQueue.unshift(t); else userQueue.push(t);
  uqRender();
  toast(playNext ? `Playing next: ${t.title || 'Unknown Track'}` : `Added to queue: ${t.title || 'Unknown Track'}`);
}

function addTracksToUserQueue(trackList, playNext = false) {
  const valid = (trackList || []).filter(t => t && t.uid);
  if (!valid.length) return;

  if (playNext) {
    // Preserve the order of an album: the first track should be next.
    userQueue = valid.slice().reverse().concat(userQueue);
  } else {
    userQueue.push(...valid);
  }

  uqRender();
  toast(playNext
    ? `Playing next: ${valid.length} album track${valid.length === 1 ? '' : 's'}`
    : `Added ${valid.length} album track${valid.length === 1 ? '' : 's'} to Up Next`);
}

function addAlbumToUserQueue(trackUids, playNext = false) {
  const albumTracks = String(trackUids || '')
    .split(',')
    .map(uid => tracks.find(t => t.uid === uid))
    .filter(Boolean);

  addTracksToUserQueue(albumTracks, playNext);
}

function uqRemove(i) { userQueue.splice(i, 1); uqRender(); }
function uqClear() { userQueue = []; uqRender(); }
function uqPlayAt(i) {
  const t = userQueue[i];
  if (!t) return;

  let idx = queue.findIndex(x => x.uid === t.uid);
  if (idx < 0) {
    const libraryTrack = tracks.find(x => x.uid === t.uid);
    if (!libraryTrack) return;
    queue.push(libraryTrack);
    idx = queue.length - 1;
  }

  userQueue.splice(i, 1);
  if (uqReturnIndex < 0) uqReturnIndex = currentTrackIndex;
  uqInternal = true;
  playTrackAtIndex(0, audio, idx);
  uqRender();
}
function uqToggle() {
  // Desktop: Queue is a third face on the lyrics/EQ card. Narrow screens (card hidden)
  // keep using the floating Up Next panel.
  if (typeof PlayerEmbed !== 'undefined' && PlayerEmbed.isEmbedActive()) {
    PlayerEmbed.toggleQueue();
    return;
  }
  const panel = document.getElementById('uqPanel');
  panel?.classList.toggle('open');
  document.getElementById('uqBtn')?.classList.toggle('panel-open', !!panel?.classList.contains('open'));
}
function uqEnsureUI() {
  // Up Next is part of Youtify's actual HTML/CSS now. JavaScript only wires
  // the existing controls to the queue instead of creating a separate UI.
  return !!document.getElementById('uqPanel') && !!document.getElementById('uqBtn');
}

// ---- reordering (Spotify-style: row menu, no dragging) ----
function uqMove(from, to) {
  if (from === to || from < 0 || to < 0 || from >= userQueue.length || to >= userQueue.length) return;
  const [t] = userQueue.splice(from, 1);
  userQueue.splice(to, 0, t);
  uqRender();
}
function uqCloseMenu() { document.getElementById('uqMenu')?.remove(); }
function uqOpenMenu(e, i) {
  e.stopPropagation();
  e.preventDefault();
  uqCloseMenu();
  if (!userQueue[i]) return;
  const last = userQueue.length - 1;
  const entries = [
    ['Play now', () => uqPlayAt(i), false],
    ['Move to top', () => uqMove(i, 0), i === 0],
    ['Move up', () => uqMove(i, i - 1), i === 0],
    ['Move down', () => uqMove(i, i + 1), i === last],
    ['Move to bottom', () => uqMove(i, last), i === last],
    ['Remove from queue', () => uqRemove(i), false, true],
  ];
  const m = document.createElement('div');
  m.id = 'uqMenu';
  m.className = 'uq-menu';
  m.setAttribute('role', 'menu');
  entries.forEach(([label, fn, disabled, danger]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'menuitem');
    b.textContent = label;
    b.disabled = !!disabled;
    if (danger) b.className = 'uq-menu-danger';
    b.addEventListener('click', ev => { ev.stopPropagation(); uqCloseMenu(); fn(); });
    m.appendChild(b);
  });
  document.body.appendChild(m);
  const mw = m.offsetWidth, mh = m.offsetHeight;
  let x, y;
  if (e.type === 'contextmenu') { x = e.clientX; y = e.clientY; }
  else { const r = e.currentTarget.getBoundingClientRect(); x = r.right - mw; y = r.bottom + 4; }
  x = Math.max(8, Math.min(x, window.innerWidth - mw - 8));
  if (y + mh > window.innerHeight - 8) y = Math.max(8, (e.type === 'contextmenu' ? y : e.currentTarget.getBoundingClientRect().top - 4) - mh);
  m.style.left = x + 'px';
  m.style.top = y + 'px';
}
document.addEventListener('click', e => { if (!e.target.closest('.uq-menu, .uq-item-more')) uqCloseMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') uqCloseMenu(); });
window.addEventListener('resize', uqCloseMenu);
window.addEventListener('scroll', uqCloseMenu, true);

// ---- drag to reorder: pointer-based, so the row itself follows the cursor (no ghost image) ----
let uqDrag = null;
let uqSuppressClick = false;
function uqDragDown(e) {
  if (e.button !== 0 || uqDrag) return;
  const row = e.target.closest && e.target.closest('.uq-item');
  if (!row || !row.parentElement.matches('#uqList, .uq-embed-list')) return;
  if (e.target.closest('.uq-item-more')) return;
  if (e.pointerType === 'touch' && !e.target.closest('.uq-item-grip')) return; // touch: grip only, so the list still scrolls
  const list = row.parentElement;
  const rows = [...list.querySelectorAll('.uq-item')];
  const from = rows.indexOf(row);
  if (from < 0) return;
  uqDrag = { row, list, rows, from, to: from, startY: e.clientY, lastY: e.clientY, scrollStart: list.scrollTop, active: false, raf: 0 };
}
function uqDragMove(e) {
  const d = uqDrag;
  if (!d) return;
  d.lastY = e.clientY;
  if (!d.active) {
    if (Math.abs(e.clientY - d.startY) < 5) return;
    d.active = true;
    uqCloseMenu();
    d.rects = d.rows.map(r => r.getBoundingClientRect());
    d.spacing = d.rows.length > 1 ? d.rects[1].top - d.rects[0].top : d.rects[0].height;
    d.row.classList.add('uq-lifting');
    d.list.classList.add('uq-reordering');
    document.body.classList.add('uq-no-select');
    const tick = () => {
      if (!uqDrag || !uqDrag.active) return;
      const lr = d.list.getBoundingClientRect();
      if (d.lastY < lr.top + 28) d.list.scrollTop -= 8;
      else if (d.lastY > lr.bottom - 28) d.list.scrollTop += 8;
      uqDragUpdate();
      d.raf = requestAnimationFrame(tick);
    };
    d.raf = requestAnimationFrame(tick);
  }
  uqDragUpdate();
}
function uqDragUpdate() {
  const d = uqDrag;
  if (!d || !d.active) return;
  const dy = (d.lastY - d.startY) + (d.list.scrollTop - d.scrollStart);
  d.row.style.transform = `translateY(${dy}px)`;
  const fr = d.rects[d.from];
  const center = fr.top + fr.height / 2 + dy;
  let to = d.from;
  d.rects.forEach((r, i) => {
    const c = r.top + r.height / 2;
    if (i > d.from && center > c) to = Math.max(to, i);
    if (i < d.from && center < c) to = Math.min(to, i);
  });
  d.to = to;
  d.rows.forEach((r, i) => {
    if (i === d.from) return;
    let shift = 0;
    if (d.from < to && i > d.from && i <= to) shift = -d.spacing;
    else if (to < d.from && i >= to && i < d.from) shift = d.spacing;
    r.style.transform = shift ? `translateY(${shift}px)` : '';
  });
}
function uqDragEnd(commit) {
  const d = uqDrag;
  uqDrag = null;
  if (!d || !d.active) return;
  cancelAnimationFrame(d.raf);
  d.rows.forEach(r => { r.style.transform = ''; r.classList.remove('uq-lifting'); });
  d.list.classList.remove('uq-reordering');
  document.body.classList.remove('uq-no-select');
  uqSuppressClick = true;
  setTimeout(() => { uqSuppressClick = false; }, 60);
  if (commit && d.to !== d.from) uqMove(d.from, d.to);
}
document.addEventListener('pointerdown', uqDragDown);
document.addEventListener('pointermove', uqDragMove);
document.addEventListener('pointerup', () => uqDragEnd(true));
document.addEventListener('pointercancel', () => uqDragEnd(false));
document.addEventListener('click', e => {
  if (uqSuppressClick) { e.stopPropagation(); e.preventDefault(); }
}, true);

function uqItemsHTML() {
  if (!userQueue.length) return '<div class="uq-empty">Nothing queued...</div>';
  return userQueue.map((t, i) => `
    <div class="uq-item" onclick="uqPlayAt(${i})" oncontextmenu="uqOpenMenu(event,${i})" ondragstart="return false">
      <div class="uq-item-grip" title="Drag to reorder">&#8942;&#8942;</div>
      <div class="uq-item-number">${i + 1}</div>
      <div class="uq-item-art">
        <img class="uq-item-icon" src="${Utils.escapeHtml(t.albumArt || '')}" alt="" draggable="false" onerror="this.style.visibility='hidden'">
        <span class="uq-item-play">&#9654;</span>
      </div>
      <div class="uq-item-info">
        <div class="uq-t">${Utils.escapeHtml(t.title || 'Unknown Track')}</div>
        <div class="uq-a">${Utils.escapeHtml(t.artist || 'Unknown Artist')}</div>
      </div>
      <button class="uq-item-more" onclick="uqOpenMenu(event,${i})" title="More options" aria-label="More options" aria-haspopup="true">&#8943;</button>
    </div>`).join('');
}
function uqRenderNow() {
  const el = document.getElementById('uqEmbedNow');
  if (!el) return;
  const t = (typeof queue !== 'undefined') ? queue[currentTrackIndex] : null;
  el.innerHTML = t ? `Now playing: <b>${Utils.escapeHtml(t.title || 'Unknown Track')}</b> — ${Utils.escapeHtml(t.artist || 'Unknown Artist')}` : '';
}
function uqRender() {
  uqEnsureUI();
  uqCloseMenu();
  const html = uqItemsHTML();
  ['uqList', 'uqEmbedList'].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = html; });
  const badge = document.getElementById('uqBadge');
  if (badge) {
    badge.textContent = userQueue.length > 99 ? '99+' : userQueue.length;
    badge.classList.toggle('show', userQueue.length > 0);
  }
  ['uqCount', 'uqEmbedCount'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = userQueue.length; });
  uqRenderNow();
}
document.addEventListener('DOMContentLoaded', () => {
  const t = document.getElementById('playerTitle');
  if (t) new MutationObserver(uqRenderNow).observe(t, { childList: true, characterData: true, subtree: true });
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', uqRender); else setTimeout(uqRender, 0);
// =========================================================================
// Counts consecutive playback failures across calls to playTrackAtIndex. Reset to 0 on any
// successful play. If this hits MAX_CONSECUTIVE_PLAY_FAILURES, a systemic problem (e.g. a
// broken IndexedDB connection affecting every track) is likely, so we stop auto-skipping and
// surface a persistent error instead of silently cycling through the entire queue.
let consecutivePlayFailures = 0;
const MAX_CONSECUTIVE_PLAY_FAILURES = 5;
let favoriteTracks = new Set();
let contextTrackIndex = -1;
let isPlaying1 = false;
isPlaying2 = false;
let isShuffle = false;
// Shuffle memory: songs already played (most recent last) so Previous retraces what you actually heard,
// and the songs you backed out of so Next replays them in order before rolling anything new.
// Stored as uids so sorting / removing songs in the queue doesn't break it.
let shuffleBack = [];
let shuffleFwd = [];
let shuffleSkip = false; // true while Previous is navigating (it manages the stacks itself)
function shuffleIndexOf(uid) { return queue.findIndex(t => t.uid === uid); }
function shuffleRecord(newIndex) { // call right before currentTrackIndex changes to newIndex
  if (shuffleSkip) return;
  const prev = queue[currentTrackIndex]?.uid, nu = queue[newIndex]?.uid;
  if (!prev || !nu || prev === nu) return;
  shuffleBack.push(prev);
  if (shuffleBack.length > 300) shuffleBack.shift();
  if (shuffleFwd.length && shuffleFwd[shuffleFwd.length - 1] === nu) shuffleFwd.pop();
  else shuffleFwd.length = 0;
}
function shuffleForwardIndex() { // next song to replay after going back, or -1
  while (shuffleFwd.length) {
    const i = shuffleIndexOf(shuffleFwd[shuffleFwd.length - 1]);
    if (i >= 0) return i;
    shuffleFwd.pop();
  }
  return -1;
}
let repeatMode = 'off';
let currentVolume = 1;
let isMuted = false;
let previousVolume = 1;
let currentView = 'home';
let downloads = [];
let customThemes = [];
let apiKey = localStorage.getItem('youtifiy_api_key') || '';
let svgfile = localStorage.getItem('youtifiy_file_url') || '';
let playbackSpeed = 1;
let crossfadeDuration = localStorage.getItem('youtifiy_crossfade') || '0';
let isCrossfading = false;
// Handle for the crossfade's volume-fade setInterval (see PlayerController.startCrossfade).
// Any code path that changes the current track outside of the crossfade completing on its
// own (manual next/previous, clicking a queue item, etc.) must cancel this via
// PlayerController.cancelCrossfade() or the fade keeps running in the background and can
// swap audio/audio2 and overwrite currentTrackIndex several seconds later, out of sync with
// whatever the user actually navigated to.
let crossfadeTickHandle = null;
let audioContext = null;
// EQ/gain graph. createMediaElementSource() permanently binds to one specific physical
// <audio> DOM element — it cannot be redirected later. But crossfade only swaps which
// *physical* element the `audio`/`audio2` variables point to (see startCrossfade) — it
// never touches the DOM elements themselves. A single EQ chain built once against
// whichever element was `audio` at init time would silently stop affecting playback after
// the first crossfade, since the audible element and the EQ'd element would diverge.
// Fix: build one EQ chain per physical element (keyed by the element itself, which never
// changes) so both elements are always correctly wired, and always adjust whichever
// chain belongs to the currently-active `audio` element.
let eqChains = new WeakMap(); // audio element -> { gainNode, bassNode, midNode, trebleNode }
let gainNode = null;
let bassNode = null;
let midNode = null;
let trebleNode = null;
// Current EQ/gain settings, independent of any specific chain/element. Used to seed a
// newly-built chain (e.g. audio2's, built lazily on first crossfade) with whatever the
// user already has dialed in, instead of the new chain silently starting flat/unequalized.
let eqSettings = { bass: 0, mid: 0, treble: 0, gain: 1 };
let waveformData = new Map();
let lyricsManager = null;
let albumArtBackground = localStorage.getItem('youtifiy_aab') === 'on';
let performanceModeEnabled = localStorage.getItem('youtify_performance_mode') === 'on';
let sidebarBottom = localStorage.getItem('youtify_sidebar_bottom') === 'on';

let playStats = { totalPlays: 0, totalTime: 0, trackStats: {} };
let playHistory = [];

let audio  = document.getElementById('audioPlayer');
let audio2 = document.getElementById('audioPlayer2');
const aab_button = document.getElementById('aab');
const performanceModeButton = document.getElementById('performanceModeBtn');
const sidebarPosButton = document.getElementById('sidebarPosBtn');             

// ============================================================================
// YOUTUBE API
// ============================================================================

class YouTubeAPI {
  constructor(keys, hosts) {
    this.keys = [].concat(keys || []).filter(Boolean);   // string or array
    this.hosts = hosts || [
      'https://thisisatestthing-2.onrender.com',
      'https://thisisatestthing-1.onrender.com',
      'https://thisisatestthing.onrender.com',
    ];
    this.keyIdx = 0;
    this.hostIdx = 0;
    this.cooldowns = new Map();   // host -> timestamp it's benched until
  }

  // ---------- round robin helpers ----------
  nextHost() {
    for (let i = 0; i < this.hosts.length; i++) {
      const h = this.hosts[this.hostIdx++ % this.hosts.length];
      if ((this.cooldowns.get(h) || 0) < Date.now()) return h;
    }
    // everything is benched, just keep rotating
    return this.hosts[this.hostIdx++ % this.hosts.length];
  }

  benchHost(host, ms = 60000) {
    this.cooldowns.set(host, Date.now() + ms);
  }

  parseID(input) {
    if (!input) return '';
    const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?\s]+)/);
    return match ? match[1] : input;
  }

  // ---------- search (rotates keys, skips rate-limited ones) ----------
  async search(query) {
    if (!this.keys.length) throw new Error('API key not set');
    let lastErr;
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[this.keyIdx++ % this.keys.length];
      try {
        const res = await fetch('https://youtube-v2.p.rapidapi.com/search/?query=' + encodeURIComponent(query), {
          method: 'GET',
          headers: { 'x-rapidapi-key': key, 'x-rapidapi-host': 'youtube-v2.p.rapidapi.com' }
        });
        if (res.status === 429 || res.status === 403) {   // quota / rate limit -> next key
          lastErr = new Error('Key limited (' + res.status + ')');
          continue;
        }
        return res.json();
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('All keys failed');
  }

  async getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  // ---------- backend call pinned to one host ----------
  async api(host, path, options = {}) {
    const res = await fetch(`${host}${path}`, options);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const e = new Error(err.detail || `${path} failed (${res.status})`);
      e.retryable = res.status >= 500 || res.status === 429;
      throw e;
    }
    return res;
  }

  // ---------- download (tries the next host if one dies) ----------
  async download(track) {
    track.status = 'Fetching...';
    renderDownloads();

    let lastErr;
    for (let i = 0; i < this.hosts.length; i++) {
      const host = this.nextHost();
      try {
        await this._downloadFrom(host, track);
        return;
      } catch (e) {
        lastErr = e;
        console.error(`[${host}]`, e);
        const retryable = e.retryable || e instanceof TypeError;   // TypeError = network failure
        if (!retryable) break;                                     // bad video etc, no point retrying
        this.benchHost(host);
        track.progress = 0;
        track.status = 'Retrying...';
        renderDownloads();
      }
    }

    console.error(lastErr);
    track.status = 'Error';
    renderDownloads();
  }

  async _downloadFrom(host, track) {
    const url = `https://www.youtube.com/watch?v=${track.id}`;

    // analyze (first request can take ~1 min if Render was asleep)
    const info = await (await this.api(host, '/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })).json();

    if (info.title && (!track.title || track.title.startsWith('YT: '))) track.title = info.title;
    if (!track.albumArt) {
      track.albumArt = info.thumbnailUrl || `https://i.ytimg.com/vi/${track.id}/hqdefault.jpg`;
    }

    const mp3 = (info.formats || []).find(f => f.ext === 'mp3');
    if (!mp3) throw new Error('No mp3 format');   // not retryable

    track.status = 'Downloading...';
    track.progress = 0;
    renderDownloads();

    const res = await this.api(host, '/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, formatId: mp3.formatId, title: track.title || info.title || '' })
    });

    const total = +res.headers.get('Content-Length') || 0;
    const reader = res.body.getReader();
    const chunks = [];
    let got = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      got += value.length;
      if (total) {
        track.progress = Math.round((got / total) * 1000); // 0-1000, renderDownloads does /10
        renderDownloads();
      }
    }

    const blobUrl = URL.createObjectURL(new Blob(chunks, { type: 'audio/mpeg' }));
    track.url = blobUrl;
    track.src = blobUrl;
    track.type = 'youtube';
    track.status = 'Ready';
    renderDownloads();
  }
}

// one key or many, one host or many:
const youtubeAPI = new YouTubeAPI(apiKey);

// ============================================================================
// STREAMING AUDIO MANAGER
// ============================================================================

class StreamingAudioManager {
  constructor() {
    this.currentSource = null;
    this.db = null;
    this.currentTrackId = null;
    this.activeURLs = new Set();
    this.isInitialized = false;
    this.initPromise = null;
    this.dbReady = false;
  }

  async init(dbInstance) {
    if (this.initPromise) return this.initPromise;
    this.initPromise = this._doInit(dbInstance);
    return this.initPromise;
  }

  async _doInit(dbInstance) {
    try {
      this.db = dbInstance;
      if (!this.db) await this.reopenDatabase();
      await this.testConnection();
      this.isInitialized = true;
      this.dbReady = true;
      console.log('✅ StreamingAudioManager initialized');
    } catch (error) {
      console.error('❌ StreamingAudioManager init failed:', error);
      this.dbReady = false;
      throw error;
    }
  }

  async testConnection() {
    return new Promise((resolve, reject) => {
      if (window.indexedDBManager?.db()) this.db = window.indexedDBManager.db();
      if (!this.db) { reject(new Error('Database not available')); return; }
      try {
        const tx = this.db.transaction(['tracks'], 'readonly');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore('tracks').getAllKeys(1);
      } catch (err) { reject(err); }
    });
  }

  async reopenDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('YoutifiyMusicDB', 3);
      request.onerror = () => reject(request.error);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('tracks')) {
          const store = db.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
          store.createIndex('uid', 'uid', { unique: true });
          store.createIndex('title', 'title', { unique: false });
          store.createIndex('dateAdded', 'dateAdded', { unique: false });
        }
      };
      request.onsuccess = () => {
        this.db = request.result;
        this.db.onclose = () => { this.dbReady = false; this.isInitialized = false; this.initPromise = null; console.warn('Database connection closed unexpectedly'); };
        this.db.onversionchange = () => { this.db.close(); this.dbReady = false; this.isInitialized = false; this.initPromise = null; };
        resolve(this.db);
      };
    });
  }

  async ensureConnection() {
    if (!this.dbReady || !this.db) {
      this.initPromise = null;
      await this.reopenDatabase();
      this.dbReady = true;
      return;
    }
    try {
      await this.testConnection();
    } catch {
      console.log('🔄 Refreshing stale database connection...');
      this.initPromise = null;
      await this.reopenDatabase();
      this.dbReady = true;
    }
  }

  async createStreamingURL(trackId, _retryCount = 0) {
    try {
      await this.ensureConnection();
      this.cleanup();
      const track = await this.getTrackFromDB(trackId);
      if (!track?.audioData) throw new Error('Track not found in database');
      this.currentTrackId = trackId;
      const blob = new Blob([track.audioData], { type: track.mimeType || 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      this.activeURLs.add(url);
      this.currentSource = url;
      console.log(`✅ Created streaming URL for track ${trackId}`);
      return url;
    } catch (error) {
      console.error('Error creating streaming URL:', error);
      if (error.name === 'InvalidStateError' && error.message.includes('database connection is closing')) {
        if (_retryCount >= 5) {
          // Was previously an unbounded recursive retry with no cap - if the
          // DB connection stayed broken this would spin forever every 100ms
          // with no user-facing error. Give up after a few tries instead.
          console.error('❌ Giving up on streaming URL after repeated database connection errors');
          throw error;
        }
        console.log(`🔄 Retrying after connection error... (attempt ${_retryCount + 1})`);
        this.dbReady = false;
        this.initPromise = null;
        await new Promise(r => setTimeout(r, 100));
        return this.createStreamingURL(trackId, _retryCount + 1);
      }
      throw error;
    }
  }

  async getTrackFromDB(trackId) {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      try {
        const tx = this.db.transaction(['tracks'], 'readonly');
        const req = tx.objectStore('tracks').get(trackId);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } catch (err) { reject(err); }
    });
  }

  cleanup() {
    if (this.currentSource) {
      URL.revokeObjectURL(this.currentSource);
      this.activeURLs.delete(this.currentSource);
      this.currentSource = null;
      this.currentTrackId = null;
    }
  }

  cleanupAll() {
    this.activeURLs.forEach(url => URL.revokeObjectURL(url));
    this.activeURLs.clear();
    this.currentSource = null;
    this.currentTrackId = null;
  }

  async prepareTrackForPlayback(track) {
    if (track.type === 'folder' && track.fileHandle) {
      const file = await track.fileHandle.getFile();
      return URL.createObjectURL(file);
    }
    if (track.type === 'import' && track.file) {
      return URL.createObjectURL(track.file);
    }
    if (track.type === 'local' && track.idbId) return await this.createStreamingURL(track.idbId);
    return track.src;
  }
}

const streamingManager = new StreamingAudioManager();

// ============================================================================
// STORAGE INFO
// ============================================================================

function setStorageInfo() {
  const el = document.getElementById('StorageInfo');
  if (!navigator.storage?.estimate) return;
  navigator.storage.estimate().then(({ usage, quota }) => {
    if (el) el.innerHTML = `${Utils.formatBytes(usage)} / ${Utils.formatBytes(quota)}`;
  });
}

function getStorage() {
  if (!navigator.storage?.estimate) return;
  navigator.storage.estimate().then(({ usage, quota, usageDetails }) => {
    console.log(`Used storage: ${Utils.formatBytes(usage)}`);
    console.log(`Estimated quota: ${Utils.formatBytes(quota)}`);
    if (usageDetails?.indexedDB) {
      console.log(`IndexedDB usage: ${Utils.formatBytes(usageDetails.indexedDB)}`);
    }
  });
}

// ============================================================================
// AUDIO ENGINE — context, EQ, effects, playback speed, crossfade
// ============================================================================

class AudioEngine {
  // Builds (or returns the existing) EQ chain for a specific physical <audio> element.
  // Each physical element gets its own MediaElementAudioSourceNode + filter chain, since
  // a source node can never be re-pointed at a different element once created.
  static buildChainFor(el) {
    if (eqChains.has(el)) return eqChains.get(el);
    const source = audioContext.createMediaElementSource(el);
    const chain = {
      gainNode: audioContext.createGain(),
      fadeNode: audioContext.createGain(),
      bassNode: audioContext.createBiquadFilter(),
      midNode: audioContext.createBiquadFilter(),
      trebleNode: audioContext.createBiquadFilter(),
    };
    chain.bassNode.type = 'lowshelf';    chain.bassNode.frequency.value = 250;
    chain.midNode.type  = 'peaking';     chain.midNode.frequency.value  = 1000; chain.midNode.Q.value = 1;
    chain.trebleNode.type = 'highshelf'; chain.trebleNode.frequency.value = 4000;

    // Seed with whatever EQ/gain the user already has set, so a chain built lazily
    // (e.g. audio2's, built on first crossfade) doesn't silently start flat/unequalized
    // while the other element's chain is already adjusted.
    chain.bassNode.gain.value = eqSettings.bass;
    chain.midNode.gain.value = eqSettings.mid;
    chain.trebleNode.gain.value = eqSettings.treble;
    chain.gainNode.gain.value = eqSettings.gain;

    source.connect(chain.bassNode);
    chain.bassNode.connect(chain.midNode);
    chain.midNode.connect(chain.trebleNode);
    chain.trebleNode.connect(chain.gainNode);
    chain.fadeNode.gain.value = 1;
    chain.gainNode.connect(chain.fadeNode);
    chain.fadeNode.connect(audioContext.destination);

    eqChains.set(el, chain);
    return chain;
  }

  // Points the module-level gainNode/bassNode/midNode/trebleNode at whichever physical
  // element is currently the active `audio`, building its chain first if needed. Must be
  // called after every crossfade swap (see rebindAudioListeners) so EQ/gain controls keep
  // affecting whatever is actually audible, instead of a chain wired to the wrong element.
  static syncActiveChain() {
    if (!audioContext) return;
    const chain = AudioEngine.buildChainFor(audio);
    gainNode = chain.gainNode;
    bassNode = chain.bassNode;
    midNode = chain.midNode;
    trebleNode = chain.trebleNode;
  }

  static init() {
    if (audioContext) return;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      AudioEngine.buildChainFor(audio);
      AudioEngine.buildChainFor(audio2);
      AudioEngine.syncActiveChain();

      console.log('✅ Audio context initialized');
    } catch (e) { console.error('❌ Failed to init audio context:', e); }
  }

  static updateEQ(type, value) {
    if (!audioContext) AudioEngine.init();
    value = parseFloat(value);
    if (type in eqSettings) eqSettings[type] = value;
    // Apply to every chain that currently exists (not just the active one), so an
    // adjustment made mid-crossfade — when both audio and audio2 chains are live and
    // audible simultaneously — takes effect on both instead of only the "active" one.
    [audio, audio2].forEach(el => {
      const chain = eqChains.get(el);
      if (!chain) return;
      const nodes = { bass: chain.bassNode, mid: chain.midNode, treble: chain.trebleNode };
      if (nodes[type]) nodes[type].gain.value = value;
    });
    const ids = { bass: 'bassValue', mid: 'midValue', treble: 'trebleValue' };
    const el = document.getElementById(ids[type]);
    if (el) el.textContent = value > 0 ? `+${value}` : value;
  }

  static updateGain(value) {
    if (!audioContext) AudioEngine.init();
    eqSettings.gain = value / 100;
    [audio, audio2].forEach(el => {
      const chain = eqChains.get(el);
      if (chain) chain.gainNode.gain.value = value / 100;
    });
    const el = document.getElementById('gainValue');
    if (el) el.textContent = value + '%';
  }

  static setPlaybackSpeed(speed) {
    playbackSpeed = speed;
    audio.playbackRate = speed;
    audio.preservesPitch = false;
    audio2.playbackRate = speed;
    audio2.preservesPitch = false;
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === speed + 'x');
    });
  }

  static updateCrossfade(value) {
    crossfadeDuration = parseInt(value);
    const el = document.getElementById('crossfadeValue');
    if (el) el.textContent = value
    localStorage.setItem('youtifiy_crossfade', value);
  }

  static toggleEffects() {
    const panel = document.getElementById('effectsPanel');
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open', !isOpen);
    document.body.classList.toggle('effects-open', !isOpen);
    if (!isOpen && !audioContext) AudioEngine.init();
  }

  static async generateWaveform(track) {
    if (waveformData.has(track.uid) || !track.src || !audioContext) return;
    try {
      const buffer = await fetch(track.src).then(r => r.arrayBuffer());
      const audioBuffer = await audioContext.decodeAudioData(buffer);
      const rawData = audioBuffer.getChannelData(0);
      const samples = 100;
      const blockSize = Math.floor(rawData.length / samples);
      const filtered = Array.from({ length: samples }, (_, i) => {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) sum += Math.abs(rawData[i * blockSize + j]);
        return sum / blockSize;
      });
      const max = Math.max(...filtered);
      waveformData.set(track.uid, filtered.map(n => n / max));
    } catch (e) { console.error('Waveform error:', e); }
  }
}

// Legacy global wrappers for HTML inline handlers
const initAudioContext  = () => AudioEngine.init();
const updateEQ          = (...args) => AudioEngine.updateEQ(...args);
const updateGain        = (...args) => AudioEngine.updateGain(...args);
const setPlaybackSpeed  = (...args) => AudioEngine.setPlaybackSpeed(...args);
const updateCrossfade   = (...args) => AudioEngine.updateCrossfade(...args);
const toggleEffects     = () => AudioEngine.toggleEffects();

// The audio elements are routed through Web Audio for EQ. Some browsers may suspend
// the AudioContext when the page loses focus, so explicitly resume it when returning
// from a background tab/window. Crossfade itself is scheduled on the audio thread,
// so background-tab timer throttling does not affect the audible fade.
async function resumeAudioContextIfNeeded() {
  if (!audioContext || audioContext.state === 'running') return;
  try { await audioContext.resume(); } catch (e) { console.warn('AudioContext resume failed:', e); }
}
document.addEventListener('visibilitychange', resumeAudioContextIfNeeded);
window.addEventListener('focus', resumeAudioContextIfNeeded);
window.addEventListener('pageshow', resumeAudioContextIfNeeded);

// ============================================================================
// THEME MANAGER
// ============================================================================

class ThemeManager {
  static THEME_CSS_VARS = ['--bg-primary','--bg-secondary','--bg-tertiary','--bg-hover',
    '--text-primary','--text-secondary','--accent','--accent-secondary','--accent-hover','--border','--player-bg','--card-bg', '--shadow-glow'];

  // AAB (Album Art Background) sets these inline via setProperty() in applyAlbumColors().
  // Every place that clears AAB overrides must remove this exact same list, or a bug like
  // the stuck-text-color issue (fixed previously) can come back. If applyAlbumColors() ever
  // gains a new setProperty() call, add the matching property here — this is the only list.
  static AAB_INLINE_PROPS = ['--accent','--accent-hover','--accent-secondary','--shadow-glow',
    '--glass-tint','--bg-primary','--bg-secondary','--bg-tertiary','--bg-hover','--text-primary', '--bg-primary','--bg-secondary','--bg-tertiary','--bg-hover',
    '--text-primary','--text-secondary','--accent','--accent-secondary','--accent-hover','--border','--player-bg','--card-bg', '--shadow-glow'];

  static clearAABInlineOverrides() {
    ThemeManager.AAB_INLINE_PROPS.forEach(p => document.documentElement.style.removeProperty(p));
  }

  static resetToDefault(showBlobs = true) {
    ThemeManager.clearAABInlineOverrides();
    const playerImg = document.getElementById('playerImg');
    if (playerImg) { playerImg.style.boxShadow = ''; playerImg.style.border = ''; }
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.background = '';
    const playBtn = document.getElementById('playPauseBtn');
    if (playBtn) playBtn.style.boxShadow = '';
    const defaultColors = ['#c2185b','#7b1fa2','#4a148c','#880e4f','#6a1b9a','#ad1457'];
    ['blob1','blob2','blob3','blob4','blob5','blob6'].forEach((id, i) => {
      const el = document.getElementById(id);
      el.style.background = defaultColors[i];
      el.classList.toggle('visible', showBlobs); // ← changed
    });
    document.body.classList.remove('art-active');
    const bgDiv = document.body.querySelector('[data-bg]');
    if (bgDiv) bgDiv.remove();
    document.body.style.background = '';
  }

  static applyAlbumColors(track) {
  if (!albumArtBackground || !track.albumArt) {
    ThemeManager.resetToDefault(albumArtBackground);
    return;
  }
    const tempImg = new Image();
    tempImg.onload = function () {
      const SIZE = 80; // upsized from the old 50px sample so quantization has more data to work with
      const canvas = document.createElement('canvas');
      canvas.width = SIZE; canvas.height = SIZE;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(tempImg, 0, 0, SIZE, SIZE);
      const pixels = ctx.getImageData(0, 0, SIZE, SIZE).data;

      // --- Dominant color extraction ---
      // Quantizes every pixel into a fine RGB bucket, tallies bucket population, then
      // greedily merges buckets within a perceptual distance of each other (largest-first)
      // so a real dominant tone consolidates even when photographic grain/gradient noise
      // scatters its exact pixel values across many nearby buckets. Filters out
      // near-black/near-white/transparent noise before bucketing.
      function colorDist(a, b) {
        const dr = a.r-b.r, dg = a.g-b.g, db = a.b-b.b;
        return Math.sqrt(dr*dr + dg*dg + db*db);
      }
      function extractDominantColors(maxColors) {
        const BUCKET = 16;
        const buckets = new Map();
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i], g = pixels[i+1], b = pixels[i+2], a = pixels[i+3];
          if (a < 125) continue;
          const bright = (r + g + b) / 3;
          if (bright < 5 || bright > 230) continue;

          const qr = Math.round(r / BUCKET) * BUCKET;
          const qg = Math.round(g / BUCKET) * BUCKET;
          const qb = Math.round(b / BUCKET) * BUCKET;
          const key = qr + ',' + qg + ',' + qb;

          let entry = buckets.get(key);
          if (!entry) { entry = { r: 0, g: 0, b: 0, count: 0 }; buckets.set(key, entry); }
          entry.r += r; entry.g += g; entry.b += b; entry.count++;
        }

        let clusters = Array.from(buckets.values())
          .map(e => ({ r: Math.round(e.r / e.count), g: Math.round(e.g / e.count), b: Math.round(e.b / e.count), count: e.count }))
          .sort((a, b) => b.count - a.count);

        const DIST_THRESHOLD = 40;
        const merged = [];
        for (const c of clusters) {
          let best = null, bestDist = Infinity;
          for (const m of merged) {
            const d = colorDist(m, c);
            if (d < DIST_THRESHOLD && d < bestDist) { best = m; bestDist = d; }
          }
          if (best) {
            const total = best.count + c.count;
            best.r = Math.round((best.r * best.count + c.r * c.count) / total);
            best.g = Math.round((best.g * best.count + c.g * c.count) / total);
            best.b = Math.round((best.b * best.count + c.b * c.count) / total);
            best.count = total;
          } else {
            merged.push(Object.assign({}, c));
          }
          merged.sort((a, b) => b.count - a.count); // keep greedy "merge into largest nearby" correct
        }
        return merged.slice(0, maxColors);
      }

      function luminance01(r, g, b) { return (r + g + b) / 3 / 255; }
      function saturationOf(r, g, b) {
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        return max === 0 ? 0 : (max - min) / max;
      }
      // Picks the seed color for the background specifically. A small flat, saturated
      // splash of color (e.g. a red graphic) can end up as a single big bucket while a
      // genuinely dominant dark/muted region gets fragmented by grain/gradient noise into
      // several smaller buckets that individually rank below the splash. This groups all
      // dark, low-saturation clusters together and compares their combined weight against
      // the single largest cluster, so the background reflects what the image actually
      // reads as (e.g. "mostly dark") instead of getting hijacked by a minor color accent.
      function pickBackgroundSeed(clusters, totalPixelCount) {
        let darkNeutralWeight = 0, sumR = 0, sumG = 0, sumB = 0;
        for (const c of clusters) {
          const l = luminance01(c.r, c.g, c.b), s = saturationOf(c.r, c.g, c.b);
          if (l < 0.42 && s < 0.55) {
            darkNeutralWeight += c.count;
            sumR += c.r * c.count; sumG += c.g * c.count; sumB += c.b * c.count;
          }
        }
        const topOverall = clusters[0];
        if (darkNeutralWeight > totalPixelCount * 0.35 && darkNeutralWeight >= topOverall.count) {
          return { r: Math.round(sumR / darkNeutralWeight), g: Math.round(sumG / darkNeutralWeight), b: Math.round(sumB / darkNeutralWeight) };
        }
        return topOverall;
      }

      function luminance(r, g, b) {
        const lin = [r, g, b].map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
        return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
      }
      function contrastRatio(l1, l2) {
        const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
        return (hi + 0.05) / (lo + 0.05);
      }
      // Picks readable near-white or near-black text against a given background,
      // so AAB text never lands back in the "text color unreadable" state.
      function readableTextFor(r, g, b) {
        const bgL = luminance(r, g, b);
        const whiteL = luminance(245, 245, 250), darkL = luminance(15, 15, 20);
        return contrastRatio(bgL, whiteL) >= contrastRatio(bgL, darkL) ? [245, 245, 250] : [15, 15, 20];
      }
      function scale(c, f) { return Math.max(0, Math.min(255, Math.floor(c * f))); }

      let dominant = extractDominantColors(6);
      if (dominant.length === 0) dominant = [{ r: 60, g: 60, b: 70, count: 1 }];
      // Pad out to 6 entries (for the 6 background blobs) by repeating/darkening
      // existing dominant colors if the artwork didn't yield enough distinct ones.
      while (dominant.length < 6) {
        const src = dominant[dominant.length % Math.max(1, dominant.length)] || { r: 60, g: 60, b: 70 };
        dominant.push({ r: scale(src.r, 0.75), g: scale(src.g, 0.75), b: scale(src.b, 0.75) });
      }

      const blobColors = dominant.slice(0, 6).map(c => [c.r, c.g, c.b]);
      const [r1, g1, b1] = blobColors[0];
      const [r2, g2, b2] = blobColors[1];
      const [r3, g3, b3] = blobColors[2];
      const [r4, g4, b4] = blobColors[3];

      // Background: use the dedicated background-seed pick (see pickBackgroundSeed above),
      // darkened, so text stays readable regardless of how bright/saturated the seed is.
      const bgSeed = pickBackgroundSeed(dominant, (SIZE * SIZE));
      const dR = scale(bgSeed.r, 0.35), dG = scale(bgSeed.g, 0.35), dB = scale(bgSeed.b, 0.35);

      // Accent: the single most dominant color (not the background seed — the accent should
      // still reflect the most eye-catching color even if it lost the background vote),
      // boosted toward full saturation/brightness so it reads clearly as an accent.
      const top = dominant[0];
      const accentR = scale(top.r, 1.25), accentG = scale(top.g, 1.25), accentB = scale(top.b, 1.25);

      const [tR, tG, tB] = readableTextFor(dR, dG, dB);

      document.documentElement.style.setProperty('--accent', `rgb(${accentR},${accentG},${accentB})`);
      document.documentElement.style.setProperty('--adocument.documentElement.style.getPropertyValueccent-hover', `rgb(${Math.min(255,r1+40)},${Math.min(255,g1+40)},${Math.min(255,b1+40)})`);
      document.documentElement.style.setProperty('--bg-primary', `rgb(${dR},${dG},${dB})`);
      document.documentElement.style.setProperty('--text-primary', `rgb(${tR},${tG},${tB})`);
      document.documentElement.style.setProperty('--bg-secondary', `rgb(${r3},${g3},${b3})`);
      document.documentElement.style.setProperty('--bg-tertiary', `rgb(${r4},${g4},${b4})`);
      document.documentElement.style.setProperty('--bg-hover', `rgb(${Math.min(255,r2+40)},${Math.min(255,g2+40)},${Math.min(255,b2+40)})`);
      document.documentElement.style.setProperty('--accent-secondary', `rgb(${r3},${g3},${b3})`);
      document.documentElement.style.setProperty('--shadow-glow', `${accentR},${accentG},${accentB}`);
      document.documentElement.style.setProperty('--glass-tint', `rgb(${accentR},${accentG},${accentB})`);

      const playerImg = document.getElementById('playerImg');
      if (playerImg) {
        playerImg.style.boxShadow = `0 0 22px 6px rgba(${r1},${g1},${b1},0.65), 0 4px 16px rgba(0,0,0,0.3)`;
        playerImg.style.border = `1px solid rgba(${r1},${g1},${b1},0.5)`;
      }
      const progressFill = document.getElementById('progressFill');
      const fullprogressFill = document.getElementById('fullLyricsProgressFill');
      if (progressFill) progressFill.style.background = `linear-gradient(90deg, rgb(${r1},${g1},${b1}), rgb(${r3},${g3},${b3}))`;
      if (fullprogressFill) fullprogressFill.style.background = `linear-gradient(90deg, rgb(${r1},${g1},${b1}), rgb(${r3},${g3},${b3}))`;
      const playBtn = document.getElementById('playPauseBtn');
      const fullplayBtn = document.getElementById('fullLyricsPlayBtn');
      if (fullplayBtn) fullplayBtn.style.boxShadow = `0 4px 20px rgba(${r1},${g1},${b1},0.5)`;
      if (playBtn) playBtn.style.boxShadow = `0 4px 20px rgba(${r1},${g1},${b1},0.5)`;

      ['blob1','blob2','blob3','blob4','blob5','blob6'].forEach(id => document.getElementById(id).classList.remove('visible'));
      setTimeout(() => {
        ['blob1','blob2','blob3','blob4','blob5','blob6'].forEach((id, i) => {
          const [r,g,b] = blobColors[i];
          const el = document.getElementById(id);
          el.style.background = `rgb(${r},${g},${b})`;
          el.classList.add('visible');
        });
      }, (crossfadeDuration || 1000));
    };
    tempImg.src = track.albumArt;
  }

  static hideBlobs() {
    ['blob1','blob2','blob3','blob4','blob5','blob6'].forEach(id => {
      document.getElementById(id)?.classList.remove('visible');
    });
  }

  /* Themes are user-editable, so we can't hard-code the text colour that sits on
     top of --accent. The "dark" theme's accent is rgb(17,17,17), which made dark
     ink on accent surfaces (your own chat bubbles) unreadable. Work it out from
     the actual luminance instead. */
  static applyAccentInk() {
    try {
      const probe = document.createElement('span');
      probe.style.cssText = 'position:absolute;opacity:0;pointer-events:none';
      document.body.appendChild(probe);
      const read = (v) => { probe.style.color = 'rgb(0,0,0)'; probe.style.color = `var(${v})`; return getComputedStyle(probe).color; };
      const a = read('--accent'), b = read('--accent-secondary');
      const bgCol = read('--bg-primary');      // must happen before the probe is detached
      probe.remove();
      const lum = (c) => {
        const m = String(c).match(/[\d.]+/g);
        if (!m || m.length < 3) return 1;
        const f = (x) => { x = Number(x) / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]);
      };
      const contrast = (x, y) => (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
      const DARK = 0.0045, LIGHT = 0.93;
      const L1 = lum(a), L2 = lum(b);

      const root = document.documentElement;
      const bestFor = (stops) => {
        const worst = (ink) => Math.min(...stops.map((L) => contrast(L, ink)));
        const d = worst(DARK), l = worst(LIGHT);
        return { ink: d >= l ? '#0a0a0f' : '#f5f5fa', score: Math.max(d, l) };
      };

      /* Some accent pairs simply can't carry one readable text colour across the
         whole gradient — the "dark" theme runs near-black to light grey, and
         plenty of custom combinations land in the same trap. Judge it by the
         contrast we can actually achieve, not by how far apart the two colours
         are, then fall back to a flat accent when the gradient can't be saved. */
      const withGradient = bestFor([L1, L2]);
      const flat = bestFor([L1]);
      const useFlat = withGradient.score < 4.0 && flat.score > withGradient.score;

      if (useFlat) root.style.setProperty('--accent-grad-2', 'var(--accent)');
      else root.style.removeProperty('--accent-grad-2');
      root.style.setProperty('--accent-ink', (useFlat ? flat : withGradient).ink);

      /* Accent drawn ON the page background rather than behind text. The dark
         theme's accent is rgb(17,17,17), which is invisible on a near-black
         panel — fall back to the normal text colour when it can't be seen. */
      const usable = contrast(L1, lum(bgCol)) >= 2.2;
      root.style.setProperty('--accent-on-bg', usable ? 'var(--accent)' : 'var(--text-primary)');
    } catch (e) {}
  }

  static change(theme) {
    document.getElementById('ctb').innerText = "Create Theme";
    ThemeManager.clearAABInlineOverrides();
    ThemeManager.hideBlobs();
    document.documentElement.setAttribute('data-theme', theme === 'default' ? '' : theme);
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.classList.toggle('active', swatch.dataset.theme === theme);
    });
    localStorage.setItem('theme', theme);
    ThemeManager.applyAccentInk();
    toast(`Theme changed to ${theme}`);
  }

  static addToGrid(theme) {
    const themeGrid = document.querySelector('.theme-grid');
    if (!themeGrid) return;
    let swatch = themeGrid.querySelector(`[data-theme="${theme.name}"]`);
    if (!swatch) {
      swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.dataset.theme = theme.name;
      themeGrid.appendChild(swatch);
    }
    swatch.style.background = theme.theme[6];
    swatch.title = theme.name;
    swatch.onclick = () => {
      document.getElementById('ctb').innerText = "Edit Theme";
      ThemeManager.clearAABInlineOverrides();
      ThemeManager.hideBlobs();
      document.documentElement.setAttribute('data-theme', theme.name);
      ThemeManager.applyAccentInk();
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      localStorage.setItem('theme', theme.name);
      toast(`Theme changed to ${theme.name}`);
    };
  }

  static applyCSS(theme) {
    Utils.addGlobalCSS(`[data-theme="${theme.name}"] { ${ThemeManager.THEME_CSS_VARS.map((v, i) => `${v}: ${theme.theme[i]};`).join('\n')} }`);
  }

  static loadCustom() {
    try {
      const saved = localStorage.getItem('youtifiy_custom_themes');
      if (!saved) return;
      customThemes = JSON.parse(saved);
      customThemes.forEach(theme => { ThemeManager.applyCSS(theme); ThemeManager.addToGrid(theme); });
      const cur = localStorage.getItem('theme');
      if (cur) document.querySelectorAll('.color-swatch').forEach(s => { if (s.dataset.theme === cur) s.classList.add('active'); });
    } catch (e) { console.error('Error loading custom themes:', e); }
  }

  static openMaker() {
    ThemeManager.openEditor();
  }


  static openEditor() {
    if (!document.getElementById('_te_styles')) {
      const s = document.createElement('style');
      s.id = '_te_styles';
      s.textContent = `
        #_te_wrap { display:flex; flex-direction:column; }

        #_te_banner {
          display:flex; align-items:center; gap:10px;
          padding:10px 16px;
          font-size:11.5px; font-weight:600; letter-spacing:.06em;
          text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,.06);
        }
        #_te_banner .te-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }

        #_te_palette {
          display:flex; gap:6px; flex-wrap:wrap;
          padding:12px 16px; background:rgba(0,0,0,.22);
          border-bottom:1px solid rgba(255,255,255,.05);
        }
        .te-swatch-mini {
          width:26px; height:26px; border-radius:6px;
          border:2px solid rgba(255,255,255,.1);
          transition:transform .15s, border-color .15s;
          flex-shrink:0;
        }
        .te-swatch-mini:hover { transform:scale(1.25); border-color:rgba(255,255,255,.35); }

        #_te_grid {
          display:grid; grid-template-columns:1fr 1fr;
          overflow-y:auto; max-height:400px;
        }
        @media(max-width:560px) { #_te_grid { grid-template-columns:1fr; } }

        .te-row {
          display:flex; align-items:center; gap:10px;
          padding:9px 16px; border-bottom:1px solid rgba(255,255,255,.04);
          transition:background .12s;
        }
        .te-row:nth-child(odd) { background:rgba(255,255,255,.013); }
        .te-row:hover          { background:rgba(255,255,255,.04); }

        .te-color-btn {
          width:30px; height:30px; border-radius:7px; flex-shrink:0;
          border:2px solid rgba(255,255,255,.14); cursor:pointer;
          position:relative; overflow:hidden;
          transition:border-color .15s, transform .15s;
        }
        .te-color-btn:hover { border-color:rgba(255,255,255,.4); transform:scale(1.1); }
        .te-color-btn input[type=color] {
          position:absolute; inset:0; opacity:0; cursor:pointer;
          width:100%; height:100%; border:none; padding:0;
        }

        .te-label {
          flex:1; font-size:12px; font-weight:500; letter-spacing:.01em;
          color:var(--text-secondary,#aaa);
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }

        .te-hex {
          width:88px; font-size:11.5px; font-family:"Margarine", system-ui;
          padding:5px 8px; border-radius:6px;
          border:1px solid rgba(255,255,255,.09);
          background:rgba(0,0,0,.3); color:var(--text-primary,#fff);
          transition:border-color .15s;
        }
        .te-hex:focus { outline:none; border-color:var(--accent,#00ffa1); }

        #_te_footer {
          padding:12px 16px; display:flex; gap:9px; flex-wrap:wrap;
          align-items:center; border-top:1px solid rgba(255,255,255,.06);
          background:rgba(0,0,0,.18);
        }
        #_te_name {
          flex:1; min-width:110px; font-size:13px; padding:7px 11px;
          border-radius:7px; border:1px solid rgba(255,255,255,.11);
          background:rgba(0,0,0,.35); color:var(--text-primary,#fff);
          transition:border-color .15s;
        }
        #_te_name:focus    { outline:none; border-color:var(--accent,#00ffa1); }
        #_te_name:disabled { opacity:.5; cursor:not-allowed; border-color:rgba(255,255,255,.06); }

        ._te_btn {
          padding:7px 15px; border-radius:7px; font-size:13px; font-weight:600;
          cursor:pointer; border:none; white-space:nowrap;
          transition:opacity .15s, transform .1s;
        }
        ._te_btn:hover  { opacity:.82; }
        ._te_btn:active { transform:scale(.96); }
        ._te_btn.pri    { background:var(--accent,#00ffa1); color:#000; }
        ._te_btn.sec    { background:rgba(255,255,255,.1); color:var(--text-primary,#fff); }
        ._te_btn.ghost  { background:transparent; color:var(--text-secondary,#aaa); border:1px solid rgba(255,255,255,.1); }

        #_te_json_out {
          display:none; margin:10px 16px 0; width:calc(100% - 32px); box-sizing:border-box;
          font-size:11px; font-family:"Margarine", system-ui; resize:vertical; min-height:64px;
          padding:9px 12px; border-radius:7px; border:1px solid rgba(255,255,255,.09);
          background:rgba(0,0,0,.4); color:#7ec8a0;
        }
      `;
      document.head.appendChild(s);
    }

    const VARS = [
      { css:'--bg-primary',       label:'Background Primary'   },
      { css:'--bg-secondary',     label:'Background Secondary' },
      { css:'--bg-tertiary',      label:'Background Tertiary'  },
      { css:'--bg-hover',         label:'Hover Background'     },
      { css:'--text-primary',     label:'Text Primary'         },
      { css:'--text-secondary',   label:'Text Secondary'       },
      { css:'--accent',           label:'Accent'               },
      { css:'--accent-secondary', label:'Accent Secondary'     },
      { css:'--accent-hover',     label:'Accent Hover'         },
      { css:'--border',           label:'Border'               },
      { css:'--player-bg',        label:'Player Background'    },
      { css:'--card-bg',          label:'Card Background'      },
      { css:'--shadow-glow',      label:'Shadow Glow (RGB)'    },
    ];

    const activeName    = localStorage.getItem('theme') || '';
    const existingTheme = customThemes.find(t => t.name === activeName) || null;
    const isEditMode    = !!existingTheme;

    const root = document.documentElement;

    function getVar(css) {
      if (isEditMode) {
        const idx = VARS.findIndex(v => v.css === css);
        if (idx !== -1 && existingTheme.theme[idx] !== undefined) return existingTheme.theme[idx];
      }
      return getComputedStyle(root).getPropertyValue(css).trim();
    }

    function toHex(val) {
      if (!val) return '#000000';
      val = val.trim();
      if (/^#[0-9a-f]{6}$/i.test(val)) return val;
      if (/^\d+,\s*\d+,\s*\d+$/.test(val)) {
        const [r,g,b] = val.split(',').map(n => parseInt(n,10));
        return '#' + [r,g,b].map(n => n.toString(16).padStart(2,'0')).join('');
      }
      try {
        const cv = document.createElement('canvas'); cv.width = cv.height = 1;
        const cx = cv.getContext('2d'); cx.fillStyle = val; cx.fillRect(0,0,1,1);
        const [r,g,b] = cx.getImageData(0,0,1,1).data;
        return '#' + [r,g,b].map(n => n.toString(16).padStart(2,'0')).join('');
      } catch { return '#000000'; }
    }

    function fromHex(hex, css) {
      if (css === '--shadow-glow') {
        const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
        return `${r},${g},${b}`;
      }
      return hex;
    }

    
    const modal = Utils.createModal(
      isEditMode ? `Edit Theme — ${activeName}` : 'Theme Builder',
      true
    );
    modal.body.style.padding = '0';

    const wrap = document.createElement('div');
    wrap.id = '_te_wrap';

    const banner = document.createElement('div');
    banner.id = '_te_banner';
    const dot = document.createElement('div');
    dot.className = 'te-dot';
    dot.style.background = isEditMode ? '#f0883e' : '#3fb950';
    const bannerText = document.createElement('span');
    bannerText.style.color = isEditMode ? '#f0883e' : '#3fb950';
    bannerText.textContent = isEditMode
      ? `Editing "${activeName}" — Save Changes will overwrite it`
      : 'No custom theme active — enter a name below to create one';
    banner.append(dot, bannerText);
    wrap.appendChild(banner);

    const palette = document.createElement('div');
    palette.id = '_te_palette';
    VARS.forEach(v => {
      const sw = document.createElement('div');
      sw.className = 'te-swatch-mini';
      sw.title = v.label;
      const raw = getVar(v.css);
      sw.style.background = v.css !== '--shadow-glow'
        ? toHex(raw)
        : 'repeating-linear-gradient(45deg,#555 0,#555 4px,#333 4px,#333 8px)';
      palette.appendChild(sw);
      v._swatch = sw;
    });
    wrap.appendChild(palette);

    const grid = document.createElement('div');
    grid.id = '_te_grid';

    VARS.forEach(v => {
      const raw = getVar(v.css);
      const hex = toHex(raw);

      const row      = document.createElement('div');
      row.className  = 'te-row';

      const colorBtn = document.createElement('div');
      colorBtn.className    = 'te-color-btn';
      colorBtn.style.background = v.css !== '--shadow-glow' ? hex
        : 'repeating-linear-gradient(45deg,#555 0,#555 4px,#333 4px,#333 8px)';

      const picker  = document.createElement('input');
      picker.type   = 'color';
      picker.value  = hex;
      colorBtn.appendChild(picker);

      const label       = document.createElement('span');
      label.className   = 'te-label';
      label.textContent = v.label;
      label.title       = v.css;

      const hexInp       = document.createElement('input');
      hexInp.className   = 'te-hex';
      hexInp.value       = raw || hex;
      hexInp.spellcheck  = false;

      function sync(newHex) {
        const newVal = fromHex(newHex, v.css);
        picker.value = newHex;
        hexInp.value = newVal;
        if (v.css !== '--shadow-glow') {
          colorBtn.style.background = newHex;
          if (v._swatch) v._swatch.style.background = newHex;
        }
        root.style.setProperty(v.css, newVal);
        v._current = newVal;
      }

      picker.addEventListener('input', () => sync(picker.value));
      hexInp.addEventListener('input', () => sync(toHex(hexInp.value.trim())));

      v._current = raw || hex;
      row.append(colorBtn, label, hexInp);
      grid.appendChild(row);
    });

    wrap.appendChild(grid);

    const jsonOut     = document.createElement('textarea');
    jsonOut.id        = '_te_json_out';
    jsonOut.readOnly  = true;
    wrap.appendChild(jsonOut);

    const footer = document.createElement('div');
    footer.id = '_te_footer';

    const nameInp       = document.createElement('input');
    nameInp.id          = '_te_name';
    nameInp.placeholder = 'Theme name…';
    if (isEditMode) {
      nameInp.value    = activeName;
    }

    const saveBtn       = document.createElement('button');
    saveBtn.className   = '_te_btn pri';
    saveBtn.textContent = isEditMode ? 'Save Changes' : 'Save Theme';

    const copyBtn       = document.createElement('button');
    copyBtn.className   = '_te_btn sec';
    copyBtn.textContent = 'Copy JSON';

    const resetBtn      = document.createElement('button');
    resetBtn.className  = '_te_btn ghost';
    resetBtn.textContent = 'Reset';

    const deleteBtn      = document.createElement('button');
    deleteBtn.className  = '_te_btn ghost';
    deleteBtn.textContent = 'Delete';

    isEditMode ? footer.append(nameInp, saveBtn, copyBtn, deleteBtn) : footer.append(nameInp, saveBtn, copyBtn, resetBtn);
    wrap.appendChild(footer);
    modal.body.appendChild(wrap);
    function buildThemeObj() {
      const name = isEditMode ? (nameInp.value != activeName ? (nameInp.value.length == 0 ? activeName : (nameInp.value.trim() != "") ? nameInp.value : activeName) : activeName) : (nameInp.value.trim() || ('custom_' + Date.now()));
      return { name, theme: VARS.map(v => v._current) };
    }

    saveBtn.addEventListener('click', () => {
      const theme = buildThemeObj();
      const idx   = customThemes.findIndex(t => t.name === theme.name);
      
      if (isEditMode) {
        if (nameInp.value != activeName) {
          const idxs = customThemes.findIndex(t => t.name === activeName);
          if (idxs !== -1) {customThemes[idxs] = theme;}
          else {customThemes.push(theme);}
        } else {
          if (idx !== -1) {customThemes[idx] = theme;}
          else {customThemes.push(theme);}
        }
      } else {
        if (idx !== -1) {
          if (!confirm(`A theme called "${theme.name}" already exists. Overwrite it?`)) return;
          customThemes[idx] = theme;
        } else {
          customThemes.push(theme);
        }
        ThemeManager.addToGrid(theme);
      }

      localStorage.setItem('youtifiy_custom_themes', JSON.stringify(customThemes));
      ThemeManager.applyCSS(theme);
      document.documentElement.style.removeProperty('--glass-tint');
      document.documentElement.setAttribute('data-theme', theme.name);
      ThemeManager.applyAccentInk();
      localStorage.setItem('theme', theme.name);
      document.querySelectorAll('.color-swatch').forEach(s =>
        s.classList.toggle('active', s.dataset.theme === theme.name)
      );
      toast(isEditMode ? `"${theme.name}" updated` : `Theme "${theme.name}" saved`);
      modal.close();
    });

    copyBtn.addEventListener('click', () => {
      const json = JSON.stringify(buildThemeObj());
      jsonOut.value         = json;
      jsonOut.style.display = 'block';
      navigator.clipboard.writeText(json)
        .then(() => { copyBtn.textContent = '✓ Copied!'; setTimeout(() => copyBtn.textContent = 'Copy JSON', 2200); })
        .catch(() => { jsonOut.select(); document.execCommand('copy'); });
    });

    resetBtn.addEventListener('click', () => {
      if (!confirm('Discard unsaved changes and revert to the current saved values?')) return;
      VARS.forEach(v => root.style.removeProperty(v.css));
      modal.close();
      ThemeManager.openEditor();
    });

    deleteBtn.addEventListener('click', () => {
      const themeGrid = document.querySelector('.theme-grid');
      const theme = buildThemeObj();
      // Reuse the in-memory customThemes array (kept in sync with
      // localStorage elsewhere) instead of re-parsing localStorage here,
      // which previously had no error handling and could throw on
      // corrupted storage.
      let themes = Array.isArray(customThemes) ? customThemes : [];

      themes.forEach(t => {
        if (t.name === `${theme.name}`) {
          themeGrid.querySelector(`[data-theme="${theme.name}"]`)?.remove();
        }
      });

      themes = themes.filter(t => t.name !== `${theme.name}`);

      customThemes = themes;
      localStorage.setItem('youtifiy_custom_themes', JSON.stringify(themes));

      toast('Theme deleted');
      modal.close();
    });
  }

  static openImporter() {
    const imodal = Utils.createModal('Import Theme');
    imodal.body.innerHTML = `
      <label class="form-label">Paste theme JSON code</label>
      <textarea id="themejson" class="form-input" style="min-height:100px" placeholder='{"name":"mytheme","theme":["#14141a","#121316","#22222a","#30303a","#ffffff","#909090","#00ffa1","#00cc81","#34363d","#202330","#22222a"]}'></textarea>
      <button id="applytheme" class="btn secondary" style="margin-top:12px">Import Theme</button>`;

    document.getElementById('applytheme').addEventListener('click', () => {
      try {
        const theme = JSON.parse(document.getElementById('themejson').value);
        if (!theme.name || !Array.isArray(theme.theme) || theme.theme.length !== 13) { toast('Invalid theme format. Must have name and 13 colors.'); return; }
        const idx = customThemes.findIndex(t => t.name === theme.name);
        if (idx !== -1) { if (!confirm(`Theme "${theme.name}" already exists. Overwrite?`)) return; customThemes[idx] = theme; }
        else customThemes.push(theme);
        localStorage.setItem('youtifiy_custom_themes', JSON.stringify(customThemes));
        ThemeManager.applyCSS(theme);
        ThemeManager.addToGrid(theme);
        document.documentElement.style.removeProperty('--glass-tint');
        document.documentElement.setAttribute('data-theme', theme.name);
      ThemeManager.applyAccentInk();
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s.dataset.theme === theme.name));
        toast('Theme imported: ' + theme.name);
        imodal.close();
      } catch (e) { toast('Invalid theme JSON: ' + e.message); }
    });
  }
}

// Legacy global wrappers
const resetToDefaultTheme = (...args) => ThemeManager.resetToDefault(...args);
const changeTheme         = (...args) => ThemeManager.change(...args);
const openThemeMaker      = () => ThemeManager.openMaker();
const importThemeUI       = () => ThemeManager.openImporter();
const editThemes          = () => ThemeManager.openEditor();
const loadCustomThemes    = () => ThemeManager.loadCustom();
const addThemeToGrid      = (...args) => ThemeManager.addToGrid(...args);

// ============================================================================
// PLAYER CONTROLLER — play, pause, seek, volume, shuffle, repeat, crossfade
// ============================================================================

class PlayerController {
  static toggle() {
    if (currentTrackIndex === -1 && queue.length > 0) playTrackAtIndex(0, audio, 0);
    else if (isPlaying1 || isPlaying2) PlayerController.pause();
    else PlayerController.resume();
  }

  static pause() {
    audio.pause();
    isPlaying1 = false;
isPlaying2 = false;
    PlayerController.updatePlayPauseBtn();
    const miniBtn = document.getElementById('miniPlayBtn');
    if (miniBtn) miniBtn.textContent = '▶';
  }

  static resume() {
    if (!audioContext) AudioEngine.init();
    audio.play();
    isPlaying1 = true;
isPlaying2 = true;
    PlayerController.updatePlayPauseBtn();
    const miniBtn = document.getElementById('miniPlayBtn');
    if (miniBtn) miniBtn.textContent = '⏸';
  }

  static next(where = 0, isCrossfade = false) {
    // Manual next must cancel any crossfade still in flight, or its setInterval keeps
    // running against stale audio elements and clobbers currentTrackIndex a few seconds
    // later. (Crossfade completion does not go through this function — it swaps
    // audio/audio2 directly inside its own setInterval tick — so this is always safe here.)
    PlayerController.cancelCrossfade();
    if (repeatMode === 'one') { audio.currentTime = 0; audio.play(); return; }
    {
      const uqIdx = uqPeek();
      if (uqIdx !== -1) {
        uqTake(uqIdx); uqInternal = true;
        if (isCrossfade) updatePlayerUI(queue[uqIdx]); else updatePlayerUIWithoutAAB(queue[uqIdx]);
        playTrackAtIndex(where, audio, uqIdx);
        return;
      }
      if (uqReturnIndex >= 0) { currentTrackIndex = Math.min(uqReturnIndex, queue.length - 1); uqReturnIndex = -1; }
    }
    let nextIndex;
    const shuffleFwdIdx = isShuffle ? shuffleForwardIndex() : -1;
    if (shuffleFwdIdx >= 0) {
      nextIndex = shuffleFwdIdx; // replay songs we went back from before rolling new ones
    } else if (isShuffle) {
      // Previously picked a fully random index every time with no exclusion
      // of the current track, so with shuffle on the same song could repeat
      // back-to-back (especially noticeable on small queues). Re-roll to
      // avoid immediate repeats when there's more than one track to pick from.
      nextIndex = Math.floor(Math.random() * queue.length);
      if (queue.length > 1) {
        let attempts = 0;
        while (nextIndex === currentTrackIndex && attempts < 10) {
          nextIndex = Math.floor(Math.random() * queue.length);
          attempts++;
        }
      }
    } else {
      nextIndex = currentTrackIndex + 1;
    }
    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') nextIndex = 0;
      else { PlayerController.pause(); return; }
    }
    if (isCrossfade) {
      updatePlayerUI(queue[nextIndex]);
    } else {
      updatePlayerUIWithoutAAB(queue[nextIndex]);
    }
    playTrackAtIndex(where, audio, nextIndex);
  }

  static previous() {
    PlayerController.cancelCrossfade();
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    if (isShuffle) {
      // Go back through what actually played, not to the song above it in the list.
      let idx = -1;
      while (shuffleBack.length && idx < 0) idx = shuffleIndexOf(shuffleBack.pop());
      if (idx < 0) { audio.currentTime = 0; return; } // nothing earlier: just restart this one
      const cur = queue[currentTrackIndex]?.uid;
      if (cur) { shuffleFwd.push(cur); if (shuffleFwd.length > 300) shuffleFwd.shift(); }
      shuffleSkip = true;
      try { playTrackAtIndex(0, audio, idx); } finally { shuffleSkip = false; }
      return;
    }
    const prevIndex = currentTrackIndex - 1;
    playTrackAtIndex(0, audio, prevIndex < 0 ? queue.length - 1 : prevIndex);
  }

  static seekTo(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
  }

  static setVolume(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    currentVolume = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    audio.volume = audio2.volume = currentVolume;
    PlayerController.updateVolumeUI();
  }

  static toggleMute() {
    const btn = document.getElementById('volumebutton');
    if (isMuted) {
      audio.volume = audio2.volume = currentVolume = previousVolume;
      isMuted = false;
    } else {
      previousVolume = currentVolume;
      audio.volume = audio2.volume = 0;
      isMuted = true;
    }
    if (btn) btn.innerHTML = isMuted
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l5 4V6l-5 4H4z"></path><line x1="17" y1="9" x2="21" y2="15"></line><line x1="21" y1="9" x2="17" y2="15"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l5 4V6l-5 4H4z"></path><path d="M16 9.5a4 4 0 0 1 0 5"></path><path d="M18.8 7a7.5 7.5 0 0 1 0 10"></path></svg>`;
    if (btn) btn.title = isMuted ? 'Unmute' : 'Mute';
    PlayerController.updateVolumeUI();
  }

  static toggleShuffle() {
    isShuffle = !isShuffle;
    const btn = document.getElementById('shuffleBtn');
    if (btn) btn.style.color = isShuffle ? 'var(--accent)' : 'var(--text-secondary)';
    toast(isShuffle ? 'Shuffle on' : 'Shuffle off');
  }

  static toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    repeatMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
    const btn = document.getElementById('repeatBtn');
    if (!btn) return;

    const svgBase = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>`;
    const oneTag = `<text x="12" y="14" font-size="8" fill="currentColor" stroke="none" text-anchor="middle" font-weight="bold">1</text>`;

    btn.style.color = repeatMode === 'off' ? 'var(--text-secondary)' : 'var(--accent)';
    btn.innerHTML = repeatMode === 'one' ? svgBase + oneTag + '</svg>' : svgBase + '</svg>';
    toast(`Repeat: ${repeatMode}`);
  }

  static updatePlayPauseBtn() {
    const btn = document.getElementById('playPauseBtn');
    if (!btn) return;
    btn.innerHTML = (isPlaying1 || isPlaying2)
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  }

  static updateVolumeUI() {
    const fill = document.getElementById('volumeFill');
    if (fill) fill.style.width = (isMuted ? 0 : currentVolume * 100) + '%';
  }

  static updateProgressBar() {
    const fill     = document.getElementById('progressFill');
    const ffill     = document.getElementById('fullLyricsProgress');
    const current  = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    if (!fill || !audio.duration) return;
    fill.style.width = ((audio.currentTime / audio.duration) * 100 || 0) + '%';
    ffill.style.width = ((audio.currentTime / audio.duration) * 100 || 0) + '%';
    if (current)  current.textContent  = Utils.formatTime(audio.currentTime);
    if (duration) duration.textContent = Utils.formatTime(audio.duration);
    if (lyricsManager?.isOpen) lyricsManager.handleTimeUpdate();
  }

  static highlightCurrentTrack() {
    document.querySelectorAll('.queue-item').forEach((item, index) => {
      const queueIndex = Number(item.dataset.queueIndex ?? index);
      item.classList.toggle('playing', queueIndex === currentTrackIndex);
    });
  }

  static getNextIndex() {
    if (repeatMode === 'one') return currentTrackIndex;
    { const uqIdx = uqPeek(); if (uqIdx !== -1) return uqIdx; }
    let next;
    const shuffleFwdIdx = isShuffle ? shuffleForwardIndex() : -1;
    if (shuffleFwdIdx >= 0) {
      next = shuffleFwdIdx;
    } else if (isShuffle) {
      // Same fix as PlayerController.next(): avoid picking the currently-playing track
      // again, which crossfade would otherwise happily fade into itself.
      next = Math.floor(Math.random() * queue.length);
      if (queue.length > 1) {
        let attempts = 0;
        while (next === currentTrackIndex && attempts < 10) {
          next = Math.floor(Math.random() * queue.length);
          attempts++;
        }
      }
    } else {
      next = (uqReturnIndex >= 0 ? uqReturnIndex : currentTrackIndex) + 1;
    }
    if (next >= queue.length) return repeatMode === 'all' ? 0 : -1;
    return next;
  }

  static async startCrossfade(a) {
    if (isCrossfading || Number(crossfadeDuration) <= 0) return;

    const nextIndex = PlayerController.getNextIndex();
    if (nextIndex === -1) return;
    const nextTrack = queue[nextIndex];
    if (!nextTrack) return;

    const durationSeconds = Number(crossfadeDuration);
    if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return;

    const sourceDuration = Number(a.duration);
    const trackDuration = Number.isFinite(sourceDuration) && sourceDuration > 0
      ? sourceDuration : Number(a.duration || nextTrack.duration);
    if (!Number.isFinite(trackDuration) || trackDuration <= 0) return;

    isCrossfading = true;
    const fadingOut = audio;
    const fadingIn = audio2;

    if (!audioContext) AudioEngine.init();
    if (!audioContext) { isCrossfading = false; return; }

    const outChain = AudioEngine.buildChainFor(fadingOut);
    const inChain = AudioEngine.buildChainFor(fadingIn);

    try {
      if (audioContext.state !== 'running') await audioContext.resume();

      fadingIn.volume = currentVolume;
      fadingOut.volume = currentVolume;
      inChain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
      outChain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
      inChain.fadeNode.gain.setValueAtTime(0, audioContext.currentTime);
      outChain.fadeNode.gain.setValueAtTime(1, audioContext.currentTime);

      fadingIn.pause();
      fadingIn.removeAttribute('src');
      fadingIn.load();
      await new Promise(r => setTimeout(r, 20));

      const audioSrc = await streamingManager.prepareTrackForPlayback(nextTrack);
      if (!isCrossfading) return;

      fadingIn.src = audioSrc;
      fadingIn.currentTime = 0;
      fadingOut.playbackRate = playbackSpeed;
      fadingIn.playbackRate = playbackSpeed;
      await fadingIn.play();
    } catch (err) {
      console.error('Crossfade start failed:', err);
      try { fadingIn.pause(); } catch (e) {}
      inChain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
      inChain.fadeNode.gain.setValueAtTime(0, audioContext.currentTime);
      outChain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
      outChain.fadeNode.gain.setValueAtTime(1, audioContext.currentTime);
      fadingOut.volume = currentVolume;
      fadingIn.volume = currentVolume;
      isCrossfading = false;
      return;
    }

    // Do the actual fade on the Web Audio rendering thread instead of requestAnimationFrame.
    // rAF is heavily throttled when the tab is in the background, which was leaving audio2
    // playing at volume 0 until the tab became active again.
    const fadeDurationMs = Math.max(1, (durationSeconds / playbackSpeed) * 1000);
    const fadeDurationSeconds = fadeDurationMs / 1000;
    const now = audioContext.currentTime + 0.01;
    const samples = 128;
    const outCurve = new Float32Array(samples);
    const inCurve = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      const p = i / (samples - 1);
      outCurve[i] = Math.cos(p * Math.PI / 2);
      inCurve[i] = Math.sin(p * Math.PI / 2);
    }

    outChain.fadeNode.gain.cancelScheduledValues(now);
    inChain.fadeNode.gain.cancelScheduledValues(now);
    outChain.fadeNode.gain.setValueCurveAtTime(outCurve, now, fadeDurationSeconds);
    inChain.fadeNode.gain.setValueCurveAtTime(inCurve, now, fadeDurationSeconds);

    // Only use a timer to update JS state after the audio-thread fade is already complete.
    crossfadeTickHandle = setTimeout(() => {
      crossfadeTickHandle = null;
      if (!isCrossfading || audio !== fadingOut || audio2 !== fadingIn) return;

      const t = audioContext.currentTime;
      outChain.fadeNode.gain.setValueAtTime(0, t);
      inChain.fadeNode.gain.setValueAtTime(1, t);

      audio = fadingIn;
      audio2 = fadingOut;
      audio.volume = currentVolume;
      audio2.pause();
      audio2.volume = currentVolume;
      if (!uqTake(nextIndex)) uqReturnIndex = -1;
      shuffleRecord(nextIndex);
      currentTrackIndex = nextIndex;
      isCrossfading = false;

      rebindAudioListeners();
      updatePlayerUIWithoutAAB(queue[currentTrackIndex]);
      PlayerController.highlightCurrentTrack();
    }, fadeDurationMs + 100);
  }

  // Cancels an in-flight crossfade, if one is running. Must be called from any path that
  // changes the current track other than the crossfade's own completion (manual next/
  // previous, clicking a queue item, playing a track from search/album/etc.) — otherwise
  // the fade's setInterval keeps running against stale audio elements and can swap audio/
  // audio2 and overwrite currentTrackIndex out from under whatever the user just navigated
  // to, several seconds after they moved on.
  static cancelCrossfade() {
    if (crossfadeTickHandle !== null) {
      clearTimeout(crossfadeTickHandle);
      crossfadeTickHandle = null;
    }
    if (isCrossfading) {
      // audio2 was mid-fade-in as the "next" track — stop it so it doesn't keep playing
      // silently/audibly underneath whatever track is starting now.
      try {
        if (audioContext) {
          const outChain = AudioEngine.buildChainFor(audio);
          const inChain = AudioEngine.buildChainFor(audio2);
          outChain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
          inChain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
          outChain.fadeNode.gain.setValueAtTime(1, audioContext.currentTime);
          inChain.fadeNode.gain.setValueAtTime(0, audioContext.currentTime);
        }
      } catch (e) {}
      try { audio2.pause(); } catch (e) {}
      audio2.volume = currentVolume;
      audio.volume = currentVolume;
      isCrossfading = false;
    }
  }
}

// Legacy global wrappers
const togglePlay    = () => PlayerController.toggle();
const pauseTrack    = () => PlayerController.pause();
const resumeTrack   = () => PlayerController.resume();
const nextTrack     = (w, c) => PlayerController.next(w, c);
const previousTrack = () => PlayerController.previous();
const seekTo        = (e) => PlayerController.seekTo(e);
const setVolume     = (e) => PlayerController.setVolume(e);
const toggleMute    = () => PlayerController.toggleMute();
const toggleShuffle = () => PlayerController.toggleShuffle();
const toggleRepeat  = () => PlayerController.toggleRepeat();

function updatePlayPauseButton() { PlayerController.updatePlayPauseBtn(); }
function updateVolumeUI()        { PlayerController.updateVolumeUI(); }
function updateProgressBar()     { PlayerController.updateProgressBar(); }
function highlightCurrentTrack() { PlayerController.highlightCurrentTrack(); }
function getNextTrackIndex()     { return PlayerController.getNextIndex(); }
function startCrossfade(a)       { return PlayerController.startCrossfade(a); }

// crossfade polling interval (runs every 50ms)
try {
  let crossfadeTriggered = false;

  setInterval(async () => {
    const songTitle = document.getElementById('playerTitle')?.textContent || '';
    const mediaDuration = Number(audio.duration);
    const trackDuration = Number.isFinite(mediaDuration) && mediaDuration > 0
      ? mediaDuration
      : Number(queue[currentTrackIndex]?.duration || 0);
    const fadeSeconds = Number(crossfadeDuration) || 0;
    const remaining = trackDuration - audio.currentTime;

    if (!isCrossfading && !crossfadeTriggered && fadeSeconds > 0 &&
        trackDuration > 0 && remaining > 0 && remaining <= fadeSeconds) {
      crossfadeTriggered = true;
      try {
        await PlayerController.startCrossfade(audio);
      } finally {
        crossfadeTriggered = false;
      }
    }
    if (songTitle != "No track playing") {
      try {
      if (queue[currentTrackIndex]?.title && queue[currentTrackIndex].title.slice(0, 3) != songTitle.slice(0, 3)) {
        updatePlayerUIWithoutAAB(queue[currentTrackIndex]);
      }
      } catch (e) {}
    }
  }, 50);
} catch (e) {}

// ============================================================================
// PLAYBACK & TRACK PLAY
// ============================================================================

async function playTrackAtIndex(where, a, index) {
  if (!uqInternal) uqReturnIndex = -1;
  uqInternal = false;
  if (index < 0 || index >= queue.length) return;
  // Any direct jump to a track (queue click, search result, album track, etc.) must cancel
  // an in-flight crossfade the same way manual next/previous do — otherwise the crossfade's
  // background fade can still complete afterward and clobber currentTrackIndex/audio state.
  PlayerController.cancelCrossfade();
  shuffleRecord(index);
  currentTrackIndex = index;
  const track = queue[index];
  console.log('playTrackAtIndex called, track:', track?.title);

  try {
    if (!a.paused) a.pause();
    a.src = ''; a.load();
    await new Promise(r => setTimeout(r, 50));

    if (track.type === 'youtube' && !track.src) { toast('Track still loading...'); return; }
    if (!audioContext) AudioEngine.init();
    try { if (audioContext && audioContext.state !== 'running') await audioContext.resume(); } catch (e) {}
    if (audioContext) {
      try {
        const chain = AudioEngine.buildChainFor(a);
        chain.fadeNode.gain.cancelScheduledValues(audioContext.currentTime);
        chain.fadeNode.gain.setValueAtTime(1, audioContext.currentTime);
      } catch (e) {}
    }
    a.playbackRate = playbackSpeed;
    audio.playbackRate = playbackSpeed;
    audio2.playbackRate = playbackSpeed;

    const audioSrc = await streamingManager.prepareTrackForPlayback(track);
    a.src = audioSrc;
    a.currentTime = where;
    a.playbackRate = playbackSpeed;
    audio.playbackRate = playbackSpeed;
    audio2.playbackRate = playbackSpeed;
    await a.play();
    a.playbackRate = playbackSpeed;
    audio.playbackRate = playbackSpeed;
    audio2.playbackRate = playbackSpeed;
    isPlaying1 = true;
isPlaying2 = true;
    consecutivePlayFailures = 0;

    recordPlay(track);
    const imagethingy = document.getElementById('playerImg');
    imagethingy.style.display = "";
    updatePlayerUI(track);
    PlayerController.updatePlayPauseBtn();
    PlayerController.highlightCurrentTrack();
    if (!waveformData.has(track.uid)) AudioEngine.generateWaveform(track);
    if (lyricsManager?.isOpen) lyricsManager.onTrackChange();

    const theArtist = document.getElementById('playerArtist').innerText.split(',')[0];
    const img = document.getElementById('playerImg');
    const theTtitle = document.getElementById('playerTitle').innerText;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: theTtitle,
      artist: theArtist,
      artwork: [{ src: img.src || 'data:image/png;base64,', sizes: '512x512', type: 'image/jpeg' }]
    });
  } catch (error) {
    console.error('Error playing track:', error);
    if (error.name === 'AbortError') return;

    consecutivePlayFailures++;
    if (consecutivePlayFailures >= MAX_CONSECUTIVE_PLAY_FAILURES) {
      // Several tracks in a row failed to load — likely a systemic problem (e.g. IndexedDB
      // connection broken) rather than one bad track. Stop auto-skipping so we don't silently
      // cycle through the whole queue; surface a persistent error and pause instead.
      consecutivePlayFailures = 0;
      toast('Playback stopped: multiple tracks failed to load. Check your connection/storage.');
      isPlaying1 = false;
isPlaying2 = false;
      PlayerController.updatePlayPauseBtn();
      return;
    }

    toast('Error playing track');
    nextTrack(0, false);
    const imagethingy = document.getElementById('playerImg');
    imagethingy.style.display = "";
    updatePlayerUI(queue[currentTrackIndex]);
    const theArtist = document.getElementById('playerArtist').innerText.split(',')[0];
    const img = document.getElementById('playerImg');
    const theTtitle = document.getElementById('playerTitle').innerText;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: theTtitle,
      artist: theArtist,
      artwork: [{ src: img.src || 'data:image/png;base64,', sizes: '512x512', type: 'image/jpeg' }]
    });
  }
}

// ============================================================================
// PLAYBACK STATS & RECORD PLAY
// ============================================================================

function recordPlay(track) {
  Stats.recordPlay(track);

  playHistory.unshift({ track: track.uid, title: track.title, artist: track.artist, albumArt: track.albumArt, time: new Date().toISOString() });
  if (playHistory.length > 50) playHistory.pop();

  if (!playStats.trackStats[track.uid]) {
    playStats.trackStats[track.uid] = { title: track.title, artist: track.artist, albumArt: track.albumArt, plays: 0, totalTime: 0 };
  }
  playStats.trackStats[track.uid].plays++;
  playStats.totalPlays++;

  if (lyricsManager?.isOpen) lyricsManager.onTrackChange();
  
  const img = document.getElementById('playerImg');
  const theTtitle = document.getElementById('playerTitle').innerText;
  const theArtist = document.getElementById('playerArtist').innerText.split(',')[0];
   navigator.mediaSession.metadata = new MediaMetadata({
      title: theTtitle,
      artist: theArtist,
      artwork: [{ src: img.src || 'data:image/png;base64,', sizes: '512x512', type: 'image/jpeg' }]
    });
}

function updatePlayTime(seconds) {
  if (currentTrackIndex === -1) return;
  const track = queue[currentTrackIndex];
  if (!track) return;
  Stats.updatePlayTime(seconds);
  if (!playStats.trackStats[track.uid]) return;
  playStats.trackStats[track.uid].totalTime += seconds;
  playStats.totalTime += seconds;
}

setInterval(() => {
  if ((isPlaying1 || isPlaying2) && currentTrackIndex !== -1 && queue[currentTrackIndex]) {
    Stats.updatePlayTime(1);
  }
}, 1000);

// ============================================================================
// PLAYER UI
// ============================================================================

function updateGlassHomeHero(track) {
  const heroArt = document.getElementById('heroArt');
  const heroTitle = document.getElementById('heroTitle');
  const heroArtist = document.getElementById('heroArtist');
  const heroStatus = document.getElementById('heroStatus');
  const heroTrackCount = document.getElementById('heroTrackCount');
  const heroQueueCount = document.getElementById('heroQueueCount');
  const totalSongs = Array.isArray(tracks) ? tracks.length : 0;
  const queueSongs = Array.isArray(queue) ? queue.length : 0;
  const activeTrack = track || queue[currentTrackIndex];

  if (heroTrackCount) heroTrackCount.textContent = totalSongs.toLocaleString();
  if (heroQueueCount) heroQueueCount.textContent = queueSongs.toLocaleString();
  if (heroTitle) heroTitle.textContent = activeTrack?.title || 'No track playing';
  if (heroArtist) heroArtist.textContent = activeTrack?.artist || (totalSongs ? 'Choose something from your library' : 'Select a track to begin');
  if (heroStatus) {
    const queueText = queueSongs === 1 ? '1 song in queue' : `${queueSongs} songs in queue`;
    const libraryText = totalSongs === 1 ? '1 saved song' : `${totalSongs} saved songs`;
    heroStatus.textContent = totalSongs ? `${queueText} • ${libraryText}` : '0 songs ready';
  }
  if (heroArt) {
    if (activeTrack?.albumArt) {
      heroArt.style.backgroundImage = `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("${activeTrack.albumArt}")`;
    } else {
      heroArt.style.backgroundImage = '';
    }
  }
  updateFavoriteNowButton();
}

function updatePlayerUIWithoutAAB(track) {
  const title = document.getElementById('playerTitle');
  const artist = document.getElementById('playerArtist');
  const img = document.getElementById('playerImg');

  if (title) title.textContent = track.title || 'Unknown Track';
  if (artist) artist.textContent = track.artist || 'Unknown Artist';
  if (img) img.src = track.albumArt || '';

  updateGlassHomeHero(track);
  updateMiniPlayer(track);
  navigator.mediaSession.metadata = new MediaMetadata({
      title: title.textContent,
      artist: artist.textContent.split(",")[0],
      artwork: [{ src: img.src || 'data:image/png;base64,', sizes: '512x512', type: 'image/jpeg' }]
  });
}

function updatePlayerUI(track) {
  const title = document.getElementById('playerTitle');
  const artist = document.getElementById('playerArtist');
  const img = document.getElementById('playerImg');

  if (title) title.textContent = track.title || 'Unknown Track';
  if (artist) artist.textContent = track.artist || 'Unknown Artist';
  if (img) img.src = track.albumArt || '';

  updateGlassHomeHero(track);
  updateMiniPlayer(track);
  ThemeManager.applyAlbumColors(track);
  FullLyricsPlayer.syncTrackInfo();
  navigator.mediaSession.metadata = new MediaMetadata({
      title: title.textContent,
      artist: artist.textContent.split(",")[0],
      artwork: [{ src: img.src || 'data:image/png;base64,', sizes: '512x512', type: 'image/jpeg' }]
  });
}

function noAlbumArtBackground() {
  albumArtBackground = !albumArtBackground;
  localStorage.setItem('youtifiy_aab', albumArtBackground ? 'on' : 'off');
  if (aab_button) aab_button.setAttribute('aria-checked', albumArtBackground ? 'true' : 'false');
  if (!albumArtBackground) ThemeManager.resetToDefault(false);
}

function togglePerformanceMode() {
  performanceModeEnabled = !performanceModeEnabled;
  localStorage.setItem('youtify_performance_mode', performanceModeEnabled ? 'on' : 'off');
  if (performanceModeButton) performanceModeButton.setAttribute('aria-checked', performanceModeEnabled ? 'true' : 'false');
  document.body.classList.toggle('performance-mode', performanceModeEnabled);
  if (document.body.classList.contains('performance-mode')) {
   document.body.style.background = 'var(--accent)';
  }
}

function toggleSidebarPosition() {
  sidebarBottom = !sidebarBottom;
  localStorage.setItem('youtify_sidebar_bottom', sidebarBottom ? 'on' : 'off');
  if (sidebarPosButton) sidebarPosButton.setAttribute('aria-checked', sidebarBottom ? 'true' : 'false');
  document.body.classList.toggle('sidebar-bottom', sidebarBottom);
}

// ============================================================================
// MINI PLAYER
// ============================================================================

function updateMiniPlayer(track) {
  const mini = document.getElementById('miniPlayer');
  if (!mini || !track) { if (mini) mini.classList.remove('show'); return; }
  const img    = document.getElementById('miniImg');
  const title  = document.getElementById('miniTitle');
  const artist = document.getElementById('miniArtist');
  const btn    = document.getElementById('miniPlayBtn');
  if (img)    img.src         = track.albumArt || '';
  if (title)  title.textContent  = track.title || 'Unknown';
  if (artist) artist.textContent = track.artist || 'Unknown Artist';
  if (btn)    btn.textContent = (isPlaying1 || isPlaying2) ? '⏸' : '▶';
  mini.classList.add('show');
}

function initMiniPlayer() {
  const mainContent = document.getElementById('mainContent');
  const miniPlayer  = document.getElementById('miniPlayer');
  if (!mainContent || !miniPlayer) return;
  mainContent.addEventListener('scroll', function () {
    if (this.scrollTop > 100 && currentTrackIndex !== -1) miniPlayer.classList.add('show');
    else if (this.scrollTop < 50) miniPlayer.classList.remove('show');
  });
}

// ============================================================================
// QUEUE MANAGER
// ============================================================================

class QueueManager {
  static render(query = '') {
    //setStorageInfo();
    const queueList = document.getElementById('queueList');
    if (!queueList) return;
    if (typeof updateGlassHomeHero === 'function') updateGlassHomeHero(queue[currentTrackIndex]);
    const normalizedQuery = String(query || '').trim().toLowerCase();
    const isFiltered = normalizedQuery.length > 0;

    if (queue.length === 0) {
      QueueManager.updateSearchControls(0, 0, isFiltered, []);
      queueList.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div><div class="empty-title">Your queue is empty</div><div class="empty-subtitle">Import some music to get started</div></div>`;
      return;
    }

    const entries = queue
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => {
        if (!isFiltered) return true;
        return (track.title || '').toLowerCase().includes(normalizedQuery)
          || (track.artist || '').toLowerCase().includes(normalizedQuery)
          || (track.album || '').toLowerCase().includes(normalizedQuery);
      });
    QueueManager.updateSearchControls(entries.length, queue.length, isFiltered, entries.map(entry => entry.track));

    if (entries.length === 0) {
      queueList.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><div class="empty-title">No songs found</div><div class="empty-subtitle">Clear the search to see the full queue</div></div>`;
      return;
    }

    queueList.innerHTML = entries.map(({ track, index }) => {
      const dur = (track.duration && !isNaN(track.duration) && track.duration > 0) ? Utils.formatTime(track.duration) : '--:--';
      const dragAttrs = isFiltered ? '' : `draggable="true" ondragstart="queueDragStart(event,${index})" ondragover="queueDragOver(event)" ondragleave="queueDragLeave(event)" ondrop="queueDrop(event,${index})" ondragend="queueDragEnd(event)"`;
      return `<div class="queue-item ${index === currentTrackIndex ? 'playing' : ''}" data-queue-index="${index}" onclick="playTrackAtIndex(0,audio,${index})" oncontextmenu="openTrackContextMenu(event,${index})" id="${Utils.escapeHtml(track.title || 'track')}" ${dragAttrs}>
        <div class="queue-number">${index + 1}</div>
        <img src="${track.albumArt || ''}" alt="" class="queue-img" onclick="event.stopPropagation();openTrackInfo('${track.uid}')" style="cursor:pointer;" title="Click for track info">
        <div class="queue-info">
          <div class="queue-track-title">${Utils.escapeHtml(track.title || 'Unknown Track')}</div>
          <div class="queue-track-artist">${Utils.escapeHtml(track.artist || 'Unknown Artist')}</div>
        </div>
        <div class="queue-actions">
          <button class="queue-action-btn" onclick="event.stopPropagation();openTrackInfo('${track.uid}')" title="Track info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></button>
          <button class="queue-action-btn" onclick="event.stopPropagation();openAddToPlaylist(${index})" title="Add to playlist"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="12" y2="6"></line><line x1="3" y1="12" x2="12" y2="12"></line><line x1="3" y1="18" x2="9" y2="18"></line><line x1="18" y1="10" x2="18" y2="20"></line><line x1="13" y1="15" x2="23" y2="15"></line></svg></button>
          <button class="queue-action-btn" onclick="event.stopPropagation();addToUserQueue(${index})" title="Add to queue" style="font-weight:700;font-size:18px">+</button>
          <button class="queue-action-btn" onclick="event.stopPropagation();removeFromQueue(${index})" title="Remove"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
        </div>
        <div class="queue-duration" id="duration-${track.uid}">${dur}</div>
      </div>`;
    }).join('');

    QueueManager.loadMissingDurations();

    // Avoid per-node observers here; long libraries stay smoother with CSS content-visibility.
  }

  static updateSearchControls(visibleCount, totalCount, isFiltered, visibleTracks = queue) {
    const statusEl = document.getElementById('QueueSearchStatus');
    const clearBtn = document.getElementById('clearQueueSearchBtn');
    if (statusEl) {
      const seconds = visibleTracks.reduce((sum, track) => {
        const duration = Number(track?.duration || 0);
        return Number.isFinite(duration) && duration > 0 ? sum + duration : sum;
      }, 0);
      const durationText = seconds > 0 ? ` • ${Utils.formatDuration(seconds)}` : '';
      statusEl.textContent = isFiltered
        ? `${visibleCount} of ${totalCount} shown${durationText}`
        : `${totalCount} ${totalCount === 1 ? 'song' : 'songs'}${durationText}`;
    }
    if (clearBtn) clearBtn.style.display = isFiltered ? 'inline-flex' : 'none';
  }

  static refreshSearchStatus() {
    const entries = getVisibleQueueEntries();
    const isFiltered = getQueueSearchQuery().length > 0;
    QueueManager.updateSearchControls(entries.length, queue.length, isFiltered, entries.map(entry => entry.track));
  }

  static async loadMissingDurations() {
    //setStorageInfo();
    for (let i = 0; i < queue.length; i++) {
      const track = queue[i];
      if (track.duration && !isNaN(track.duration) && track.duration > 0) continue;
      if (track.type === 'youtube' && !track.src) continue;
      try {
        const duration = await QueueManager.getAudioDuration(track);
        if (duration && !isNaN(duration) && duration > 0) {
          track.duration = duration;
          const el = document.getElementById(`duration-${track.uid}`);
          if (el) el.textContent = Utils.formatTime(duration);
        }
      } catch (e) { console.error('Failed to load duration for:', track.title, e); }
    }
    QueueManager.refreshSearchStatus();
  }

  static getAudioDuration(track) {
    return new Promise((resolve, reject) => {
      const getSrc = async () => {
        // 'import' tracks: File object held in memory
        if (track.type === 'import' && track.file) {
          return URL.createObjectURL(track.file);
        }
        // 'folder' tracks: re-read via FileSystemFileHandle
        if (track.type === 'folder' && track.fileHandle) {
          try {
            const file = await track.fileHandle.getFile();
            return URL.createObjectURL(file);
          } catch (e) { reject(e); return null; }
        }
        // 'local' tracks: stored in IndexedDB
        if (track.type === 'local' && track.idbId) {
          try { return await streamingManager.prepareTrackForPlayback(track); }
          catch (e) { reject(e); return null; }
        }
        return track.src;
      };
      getSrc().then(src => {
        if (!src) { reject(new Error('No source available')); return; }
        // Revoke temporary blob URLs (import/folder types) after reading metadata
        const isTempBlob = src.startsWith('blob:') &&
          (track.type === 'import' || track.type === 'folder');
        const cleanup = () => { if (isTempBlob) URL.revokeObjectURL(src); };
        const a = new Audio();
        a.addEventListener('loadedmetadata', () => { resolve(a.duration); a.src = ''; cleanup(); });
        a.addEventListener('error', () => { reject(new Error('Failed to load audio metadata')); cleanup(); });
        setTimeout(() => { reject(new Error('Timeout loading duration')); cleanup(); }, 10000);
        a.src = src;
        a.preload = 'metadata';
      }).catch(reject);
    });
  }

  static rebuild() {
    const currentUid = queue[currentTrackIndex]?.uid;
    queue = [...tracks];
    if (currentUid) {
      const nextIndex = queue.findIndex(t => t.uid === currentUid);
      currentTrackIndex = nextIndex;
    }
    QueueManager.render();
    if (currentView === 'playlists' && typeof PlaylistManager !== 'undefined') PlaylistManager.refresh();
    /*setStorageInfo();*/
  }

  static remove(index) {
    queue.splice(index, 1);
    if (currentTrackIndex === index) {
      if (queue.length > 0) playTrackAtIndex(0, audio, Math.min(index, queue.length - 1));
      else { currentTrackIndex = -1; PlayerController.pause(); }
    } else if (currentTrackIndex > index) {
      currentTrackIndex--;
    }
    QueueManager.render();
  }

  static shuffle() {
    const currentTrack = queue[currentTrackIndex];
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    if (currentTrack) currentTrackIndex = queue.indexOf(currentTrack);
    QueueManager.render();
    toast('Queue shuffled');
  }

  static clear() {
    if (!confirm('Clear all tracks from queue?')) return;
    queue = [];
    currentTrackIndex = -1;
    PlayerController.pause();
    QueueManager.render();
    toast('Queue cleared');
  }
}

let dragSrcIndex = null;
const renderQueue       = () => QueueManager.render();
const rebuildQueue      = () => QueueManager.rebuild();
const removeFromQueue   = (i) => QueueManager.remove(i);
const shuffleQueue      = () => QueueManager.shuffle();
const clearQueue        = () => QueueManager.clear();
const getAudioDuration  = (t) => QueueManager.getAudioDuration(t);

/* ============================ QUEUE SORTING ============================
   Sorts the real `queue` array, so play order changes too — not just what's on
   screen. The currently playing track is re-found afterwards by identity, so
   sorting mid-song doesn't make the player jump to something else. */
let queueSort = { field: null, dir: 1 };

const queueCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function queueSortKey(track, field) {
  if (field === "duration") {
    const d = Number(track && track.duration);
    return isNaN(d) ? 0 : d;
  }
  return String((track && track[field]) || "").trim().toLowerCase();
}

function sortQueueBy(field) {
  closeQueueSort();
  // NB: `queue` is declared with `let`, so it never lands on the window object.
  // Guarding against the window property made this bail out every single time.
  if (!Array.isArray(queue) || queue.length < 2) return;

  // clicking the same field again flips the direction
  if (queueSort.field === field) queueSort.dir = -queueSort.dir;
  else { queueSort.field = field; queueSort.dir = 1; }

  const playing = queue[currentTrackIndex];

  queue.sort((a, b) => {
    const ka = queueSortKey(a, field), kb = queueSortKey(b, field);
    // blanks always sink to the bottom, whichever way you're sorting
    const ea = (field === "duration") ? !ka : !String(ka).length;
    const eb = (field === "duration") ? !kb : !String(kb).length;
    if (ea !== eb) return ea ? 1 : -1;

    let d = (field === "duration") ? (ka - kb) : queueCollator.compare(ka, kb);
    if (d === 0) d = queueCollator.compare(String(a.title || ""), String(b.title || ""));
    return d * queueSort.dir;
  });

  if (playing) {
    const at = queue.indexOf(playing);
    if (at !== -1) currentTrackIndex = at;
  }

  QueueManager.render(typeof getQueueSearchQuery === "function" ? getQueueSearchQuery() : "");
  paintQueueSortState();
  if (typeof toast === "function") {
    const names = { title: "title", artist: "artist", album: "album", duration: "length" };
    toast(`Queue sorted by ${names[field] || field} (${queueSort.dir === 1 ? "A\u2013Z" : "Z\u2013A"})`);
  }
}

/* keeps every copy of the menu in sync — the home view markup exists twice */
function paintQueueSortState() {
  document.querySelectorAll(".queue-sort-menu [data-sort]").forEach((b) => {
    const active = b.dataset.sort === queueSort.field;
    b.classList.toggle("active", active);
    b.textContent = b.textContent.replace(/\s*[\u2191\u2193]$/, "");
    if (active) b.textContent += queueSort.dir === 1 ? " \u2191" : " \u2193";
  });
  document.querySelectorAll(".queue-sort-label").forEach((el) => {
    el.textContent = queueSort.field
      ? queueSort.field.charAt(0).toUpperCase() + queueSort.field.slice(1)
      : "Sort";
  });
}

function toggleQueueSort(event) {
  event.stopPropagation();
  const btn = event.currentTarget;
  const menu = btn.parentElement.querySelector(".queue-sort-menu");
  if (!menu) return;
  const open = menu.classList.contains("open");
  closeQueueSort();
  if (!open) { menu.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
}
function closeQueueSort() {
  document.querySelectorAll(".queue-sort-menu.open").forEach((m) => m.classList.remove("open"));
  document.querySelectorAll(".queue-sort-toggle").forEach((b) => b.setAttribute("aria-expanded", "false"));
}
document.addEventListener("click", (e) => {
  if (!e.target.closest || !e.target.closest(".queue-overflow")) closeQueueSort();
});

/* ============================ JAM PLAYER BRIDGE ============================
   The chat module lives in a separate ES module, so give it one
   explicit surface to drive the player through instead of reaching for a dozen
   script-scoped globals. Also means the tests can exercise a real seam. */
window.YoutifyPlayer = {
  /* YouTube tracks share a video id across libraries. Local files don't have
     one, so fall back to a normalised title|artist — good enough for two people
     who both have the same song, and it keeps jams working for local libraries
     instead of silently refusing to start. */
  keyFor(t) {
    if (!t) return null;
    if (t.id) return "yt:" + t.id;
    const norm = (x) => String(x || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const title = norm(t.title);
    if (!title) return null;
    return "local:" + title + "|" + norm(t.artist);
  },
  nowPlaying() {
    const t = queue[currentTrackIndex];
    if (!t) return null;
    return {
      key: window.YoutifyPlayer.keyFor(t),
      id: t.id || null,
      title: t.title || "Unknown",
      artist: t.artist || "",
      duration: Number(t.duration) || 0,
      position: (audio && audio.currentTime) || 0,
      playing: !!isPlaying
    };
  },
  findIndexByKey(key) {
    if (!key) return -1;
    return queue.findIndex((t) => t && window.YoutifyPlayer.keyFor(t) === key);
  },
  position() { return (audio && audio.currentTime) || 0; },
  isPlaying() { return !!isPlaying; },
  seek(pos) { try { if (audio) audio.currentTime = Math.max(0, pos); } catch (e) {} },
  pause() { try { PlayerController.pause(); } catch (e) {} },
  resume() { try { PlayerController.resume(); } catch (e) {} },
  async playAt(index, pos) {
    if (index < 0 || index >= queue.length) return false;
    await playTrackAtIndex(Math.max(0, pos || 0), audio, index);
    return true;
  },
  /* Kicks off the normal download pipeline for a video id the guest is missing. */
  fetchById(id, title, artist) {
    if (!id) return false;
    if (typeof apiKey !== "undefined" && !apiKey) return false;
    if (downloads.some((d) => d && d.id === id)) return true;   // already on the way
    const track = {
      uid: Utils.generateUID(), type: "youtube", id,
      title: title || ("YT: " + id), artist: artist || "YouTube",
      status: "Fetching...", src: null, albumArt: null, duration: 0, progress: 0
    };
    downloads.push(track);
    try { QueueManager.rebuild(); QueueManager.render(); renderDownloads(); } catch (e) {}
    try { youtubeAPI.download(track); } catch (e) { return false; }
    return true;
  }
};

function queueDragStart(e, index) { dragSrcIndex = index; e.currentTarget.style.opacity = '0.4'; e.dataTransfer.effectAllowed = 'move'; }
function queueDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; e.currentTarget.style.borderTop = '2px solid var(--accent)'; }
function queueDragLeave(e) { e.currentTarget.style.borderTop = ''; }
function queueDrop(e, toIndex) {
  e.preventDefault(); e.stopPropagation();
  e.currentTarget.style.borderTop = '';
  if (dragSrcIndex === null || dragSrcIndex === toIndex) return;
  const cur = queue[currentTrackIndex];
  const [moved] = queue.splice(dragSrcIndex, 1);
  queue.splice(toIndex, 0, moved);
  currentTrackIndex = queue.indexOf(cur);
  queueSort.field = null;          // hand-ordered now, so drop the sort label
  paintQueueSortState();
  QueueManager.render();
}
function queueDragEnd(e) {
  dragSrcIndex = null;
  document.querySelectorAll('.queue-item').forEach(el => el.style.borderTop = '');
}

// ============================================================================
// TRACK MANAGER — file import, metadata, info modal, duplicates
// ============================================================================

class TrackManager {
  static async processAudioFile(file) {
    const metadata = await TrackManager.extractMetadata(file);
    return {
      uid: Utils.generateUID(),
      title: metadata.title || file.name.replace(/\.[^/.]+$/, ''),
      artist: metadata.artist || 'Unknown Artist',
      album: metadata.album || 'Unknown Album',
      albumArt: metadata.picture || '',
      duration: metadata.duration || 0,
      src: null,
      file: null,
      type: 'local',
      fileSize: file.size,
      mimeType: file.type
    };
  }

  static extractMetadata(file) {
    return new Promise((resolve) => {
      if (typeof jsmediatags === 'undefined') { resolve({}); return; }
      jsmediatags.read(file, {
        onSuccess: (tag) => {
          const tags = tag.tags;
          let picture = '';
          if (tags.picture) {
            const { data, format } = tags.picture;
            // Convert in chunks — String.fromCharCode.apply(null, data) blows the call
            // stack (RangeError) on large embedded album art because every byte becomes
            // a separate function argument.
            const bytes = new Uint8Array(data);
            const chunkSize = 0x8000; // 32768
            let binary = '';
            for (let i = 0; i < bytes.length; i += chunkSize) {
              binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
            }
            picture = `data:${format};base64,${btoa(binary)}`;
          }
          resolve({ title: tags.title, artist: tags.artist, album: tags.album, picture, duration: 0 });
        },
        onError: () => resolve({})
      });
    });
  }

  static openInfo(trackUid) {
    const track = tracks.find(t => t.uid === trackUid) || queue.find(t => t.uid === trackUid);
    if (!track) return;

    const stats = Stats.getStats();
    const trackStats = stats.trackStats[trackUid] || { plays: 0, totalTime: 0 };
    const modal = Utils.createModal('Track Info', true);

    modal.body.innerHTML = `
      <div class="track-info-modal">
        <div class="track-info-header">
          <img src="${track.albumArt || ''}" class="track-info-cover" id="trackInfoCover" style="cursor:pointer;" title="Click to change cover">
          <div class="track-info-details">
            <h3>${Utils.escapeHtml(track.title || 'Unknown')}</h3>
            <p>Artist: ${Utils.escapeHtml(track.artist || 'Unknown')}</p>
            <p>Album: ${Utils.escapeHtml(track.album || 'Unknown')}</p>
            <p>Duration: ${Utils.formatTime(track.duration)}</p>
            <p>Type: ${track.type || 'local'}</p>
          </div>
        </div>
        <div class="track-info-stats">
          <div class="stat-item"><div class="stat-value">${trackStats.plays}</div><div class="stat-label">Plays</div></div>
          <div class="stat-item"><div class="stat-value">${Utils.formatTime(trackStats.totalTime)}</div><div class="stat-label">Listen Time</div></div>
          <div class="stat-item"><div class="stat-value">${track.fileSize ? Utils.formatFileSize(track.fileSize) : 'N/A'}</div><div class="stat-label">Size</div></div>
        </div>
        <div class="settings-section" style="margin-top:24px;">
          <div class="settings-section-title">Edit Metadata</div>
          <div class="form-group"><label class="form-label">Title</label><input type="text" class="form-input" id="editTitle" value="${Utils.escapeHtml(track.title || '')}"></div>
          <div class="form-group"><label class="form-label">Artist</label><input type="text" class="form-input" id="editArtist" value="${Utils.escapeHtml(track.artist || '')}"></div>
          <div class="form-group"><label class="form-label">Album</label><input type="text" class="form-input" id="editAlbum" value="${Utils.escapeHtml(track.album || '')}"></div>
          <div style="display:flex;gap:8px;margin-top:16px;">
            <button class="btn primary" onclick="saveTrackInfo('${track.uid}')">Save Changes</button>
            <button class="btn secondary" onclick="findDuplicates('${track.uid}')">Find Duplicates</button>
          </div>
        </div>
      </div>`;

    document.getElementById('trackInfoCover').onclick = () => {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => { track.albumArt = ev.target.result; document.getElementById('trackInfoCover').src = ev.target.result; TrackManager.saveChanges(track); };
        reader.readAsDataURL(file);
      };
      input.click();
    };
  }

  static saveInfo(trackUid) {
    const track = tracks.find(t => t.uid === trackUid) || queue.find(t => t.uid === trackUid);
    if (!track) return;
    track.title  = document.getElementById('editTitle').value;
    track.artist = document.getElementById('editArtist').value;
    track.album  = document.getElementById('editAlbum').value;
    TrackManager.saveChanges(track);
    QueueManager.render();
    updatePlayerUI(track);
    toast('Track info updated');
  }

  static saveChanges(track) {
    const ti = tracks.findIndex(t => t.uid === track.uid);
    if (ti !== -1) tracks[ti] = track;
    const qi = queue.findIndex(t => t.uid === track.uid);
    if (qi !== -1) queue[qi] = track;
  }

  static findDuplicates(trackUid) {
    const track = tracks.find(t => t.uid === trackUid);
    if (!track) return;
    const duplicates = tracks.filter(t => t.uid !== trackUid && (
      t.title.toLowerCase() === track.title.toLowerCase() ||
      (t.artist.toLowerCase() === track.artist.toLowerCase() && Utils.similarity(t.title, track.title) > 0.8)
    ));
    if (duplicates.length === 0) { toast('No duplicates found'); return; }

    const modal = Utils.createModal(`Found ${duplicates.length} Duplicates`, true);
    modal.body.innerHTML = `<p style="margin-bottom:16px;color:var(--text-muted);">Similar tracks found:</p><div class="queue-list">${duplicates.map(d => `
      <div class="queue-item">
        <img src="${d.albumArt || ''}" class="queue-img">
        <div class="queue-info"><div class="queue-track-title">${Utils.escapeHtml(d.title)}</div><div class="queue-track-artist">${Utils.escapeHtml(d.artist)}</div></div>
        <button class="btn secondary" onclick="mergeTracks('${trackUid}','${d.uid}')">Merge</button>
        <button class="btn secondary" onclick="deleteTrack('${d.uid}')" style="background:#ff4444;border-color:#ff4444;color:white;">Delete</button>
      </div>`).join('')}</div>`;
  }

  static merge(keepUid, mergeUid) {
    // Was merging playStats.trackStats, an in-memory-only object that's
    // almost always empty when this runs (a maintenance action, not
    // something done mid-session), so the merged duplicate's real play
    // history in Stats (the persisted store) was silently dropped instead
    // of combined. Merge the actual persisted stats instead.
    const statsCache = Stats.cache.trackStats;
    if (statsCache[mergeUid]) {
      if (!statsCache[keepUid]) statsCache[keepUid] = { title: statsCache[mergeUid].title, artist: statsCache[mergeUid].artist, albumArt: statsCache[mergeUid].albumArt, plays: 0, totalTime: 0 };
      statsCache[keepUid].plays     += statsCache[mergeUid].plays || 0;
      statsCache[keepUid].totalTime += statsCache[mergeUid].totalTime || 0;
      delete statsCache[mergeUid];
      Stats.debouncedSave();
    }
    TrackManager.delete(mergeUid);
    toast('Tracks merged');
  }

  static delete(trackUid) {
    const i = tracks.findIndex(t => t.uid === trackUid);
    if (i !== -1) { tracks.splice(i, 1); QueueManager.rebuild(); }
  }
}

// Legacy wrappers
const openTrackInfo   = (...args) => TrackManager.openInfo(...args);
const saveTrackInfo   = (...args) => TrackManager.saveInfo(...args);
const findDuplicates  = (...args) => TrackManager.findDuplicates(...args);
const mergeTracks     = (...args) => TrackManager.merge(...args);
const deleteTrack     = (...args) => TrackManager.delete(...args);
const processAudioFile = (...args) => TrackManager.processAudioFile(...args);
function saveTrackChanges(track)  { TrackManager.saveChanges(track); }

// ============================================================================
// ALBUM MANAGER
// ============================================================================

class AlbumManager {
  static show() {
    const albums = {};
    const albumGroups = {};

    tracks.forEach(track => {
      const rawAlbum  = (track.album  || 'Unknown Album').trim();
      const rawArtist = (track.artist || 'Unknown Artist').trim();
      const key = rawAlbum.toLowerCase();
      if (!albumGroups[key]) albumGroups[key] = [];
      albumGroups[key].push({ rawAlbum, rawArtist, normalizedArtist: rawArtist.toLowerCase(), track });
    });

    Object.entries(albumGroups).forEach(([normAlbum, items]) => {
      const artistSets = [];
      items.forEach(item => {
        let merged = false;
        const itemArtists = item.rawArtist.split(/,|&|feat\.|ft\.|with/i).map(a => a.trim().toLowerCase());
        for (const set of artistSets) {
          if (set.allArtists.some(sa => itemArtists.some(ia => sa.includes(ia) || ia.includes(sa)))) {
            set.tracks.push(item.track);
            itemArtists.forEach(a => { if (!set.allArtists.includes(a)) set.allArtists.push(a); });
            if (!set.displayArtists.includes(item.rawArtist)) set.displayArtists.push(item.rawArtist);
            merged = true; break;
          }
        }
        if (!merged) {
          artistSets.push({ allArtists: itemArtists, displayArtists: [item.rawArtist], tracks: [item.track], albumTitle: items[0].rawAlbum });
        }
      });

      artistSets.forEach((set, idx) => {
        const key = `${normAlbum}|${set.allArtists.join(',')}|${idx}`;
        let cover = null, year = '';
        set.tracks.forEach(t => { if (!cover && t.albumArt) cover = t.albumArt; if (t.year && (!year || t.year < year)) year = t.year; });
        albums[key] = { title: set.albumTitle, artist: set.displayArtists[0], allArtists: set.displayArtists, cover, tracks: set.tracks, year };
      });
    });

    Object.values(albums).forEach(a => a.tracks.sort((x, y) => (x.trackNumber || 0) - (y.trackNumber || 0)));

    const main = document.getElementById('mainContent');
    if (!main) return;
    main.dataset.previousView = currentView;
    currentView = 'albums';

    const albumList = Object.values(albums).sort((a, b) => {
      const c = a.artist.localeCompare(b.artist);
      return c !== 0 ? c : a.title.localeCompare(b.title);
    });

    const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#ffeaa7','#dfe6e9','#fd79a8','#a29bfe'];

    main.innerHTML = `
      <div class="header">
        <div class="search-container">
          <input type="text" class="search-input" placeholder="Search albums..." oninput="filterAlbums(this.value)"><span class="search-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span></input>
        </div>
        <div class="user-profile"></div>
      </div>
      <h2 class="section-title" style="margin-bottom:24px;">Albums (${albumList.length})</h2>
      <div class="album-grid" id="albumGrid">
        ${albumList.map(album => {
          const primary = album.artist.split(/,|&|feat\.|ft\.|with/i)[0].trim();
          const display = album.allArtists.length > 2 ? 'Various Artists' : primary;
          // NOTE: previously, the fallback letter-avatar div was only rendered
          // in the "no cover" branch. The <img>'s onerror handler references
          // `this.nextElementSibling` expecting that avatar div to be right
          // after it - but when a cover URL existed and failed to load
          // (dead link/404), there was no sibling avatar to reveal, so it
          // fell through to whatever markup came next (the album title).
          // Now the avatar div is always rendered alongside the <img>,
          // just hidden until onerror fires. Also guarded charCodeAt(0)
          // against an empty title, which previously produced NaN.
          const letter = (album.title || 'A').charAt(0).toUpperCase();
          const color = colors[(album.title || 'A').charCodeAt(0) % colors.length];
          const fallbackAvatar = (visible) => `<div style="display:${visible ? 'flex' : 'none'};width:100%;aspect-ratio:1;border-radius:8px;margin-bottom:12px;background:${color};align-items:center;justify-content:center;font-size:48px;color:white;font-weight:bold;">${letter}</div>`;
          const coverHtml = (album.cover && album.cover.trim())
            ? `<img src="${album.cover}" alt="${Utils.escapeHtml(album.title)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">${fallbackAvatar(false)}`
            : fallbackAvatar(true);
          return `<div class="album-card" onclick='showAlbumDetail(${JSON.stringify(Utils.escapeHtml(album.title)).replace(/'/g,"&apos;")},${JSON.stringify(Utils.escapeHtml(album.artist)).replace(/'/g,"&apos;")})'>${coverHtml}<h4>${Utils.escapeHtml(album.title)}</h4><p>${Utils.escapeHtml(display)} • ${album.tracks.length} songs</p></div>`;
        }).join('')}
      </div>`;
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  }

  static showDetail(albumTitle, albumArtist) {
    const norm = albumTitle.toLowerCase().trim();
    const albumTracks = tracks.filter(t => {
      if ((t.album || 'Unknown Album').toLowerCase().trim() !== norm) return false;
      const tArtists = (t.artist || 'Unknown Artist').toLowerCase().split(/,|&|feat\.|ft\.|with/i).map(a => a.trim());
      const sArtists = albumArtist.toLowerCase().split(/,|&|feat\.|ft\.|with/i).map(a => a.trim());
      return tArtists.some(ta => sArtists.some(sa => ta.includes(sa) || sa.includes(ta)));
    }).sort((a, b) => (a.trackNumber || 0) - (b.trackNumber || 0));

    if (albumTracks.length === 0) { toast('No tracks found for this album'); return; }

    const album = albumTracks[0];
    const totalDuration = albumTracks.reduce((s, t) => s + (t.duration || 0), 0);
    const albumArt = album.albumArt || albumTracks.find(t => t.albumArt)?.albumArt || '';
    const primary = album.artist.split(/,|&|feat\.|ft\.|with/i)[0].trim();
    const allFeatured = new Set();
    albumTracks.forEach(t => {
      t.artist.split(/,|&|feat\.|ft\.|with/i).slice(1).forEach(p => {
        const c = p.trim();
        if (c && c.toLowerCase() !== primary.toLowerCase()) allFeatured.add(c);
      });
    });

    const main = document.getElementById('mainContent');
    const hasArt = albumArt && albumArt.trim() !== '';

    main.innerHTML = `
      <div class="header"><div class="search-container"><button class="btn secondary" onclick="showAlbumView()" style="margin-right:12px;">← Back to Albums</button></div><div class="user-profile"></div></div>
      <div class="album-hero" style="display:flex;gap:24px;margin-bottom:32px;padding:24px;background:linear-gradient(to bottom,var(--bg-tertiary),transparent);border-radius:12px;">
        ${hasArt ? `<img src="${albumArt}" style="width:232px;height:232px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.5);object-fit:cover;">` : `<div style="width:232px;height:232px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.5);background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);"><svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle></svg></div>`}
        <div style="display:flex;flex-direction:column;justify-content:flex-end;">
          <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--text-secondary);margin-bottom:8px;">Album</div>
          <h1 style="font-size:48px;font-weight:800;margin-bottom:16px;line-height:1.1;">${Utils.escapeHtml(albumTitle)}</h1>
          <div style="display:flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:14px;">
            <span style="color:var(--text-primary);font-weight:600;">${Utils.escapeHtml(primary)}</span>
            <span>•</span><span>${album.year || albumTracks.find(t=>t.year)?.year || new Date().getFullYear()}</span>
            <span>•</span><span>${albumTracks.length} songs, ${Utils.formatDuration(totalDuration)}</span>
          </div>
          ${allFeatured.size > 0 ? `<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">Featuring: ${Array.from(allFeatured).slice(0,3).join(', ')}${allFeatured.size>3?` +${allFeatured.size-3} more`:''}</div>` : ''}
        </div>
      </div>
      <div class="album-actions" style="display:flex;gap:16px;margin-bottom:32px;padding:0 24px;">
        <button class="btn primary" onclick="playAlbum('${albumTracks.map(t=>t.uid).join(',')}')" style="width:56px;height:56px;border-radius:50%;font-size:24px;display:flex;align-items:center;justify-content:center;" title="Play album"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="7 4 19 12 7 20 7 4"></polygon></svg></button>
        <button class="btn secondary" onclick="shuffleAlbum('${albumTracks.map(t=>t.uid).join(',')}')" style="border-radius:50%;width:56px;height:56px;font-size:20px;" title="Shuffle album"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg></button>
        <button class="btn secondary" onclick="addAlbumToQueue('${albumTracks.map(t=>t.uid).join(',')}')" style="border-radius:50%;width:56px;height:56px;font-size:20px;" title="Add album to Queue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
        <button class="btn secondary" onclick="addAlbumToUserQueue('${albumTracks.map(t=>t.uid).join(',')}', true)" style="border-radius:50%;width:56px;height:56px;font-size:20px;" title="Play album next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 4 6 20"></polyline><polygon points="10 7 19 12 10 17 10 7"></polygon></svg></button>
      </div>
      <div class="album-tracklist" style="padding:0 24px;">
        <div class="tracklist-header" style="display:grid;grid-template-columns:50px 1fr auto auto;gap:16px;padding:8px 16px;border-bottom:1px solid var(--border);color:var(--text-muted);font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
          <span>#</span><span>Title</span><span style="text-align:right;">Plays</span><span style="text-align:right;">Duration</span>
        </div>
        ${albumTracks.map((track, idx) => {
          // Reads from Stats.getStats() (persisted play counts), not the
          // in-memory-only playStats object which resets on every page load.
          const tStats = Stats.getStats().trackStats[track.uid] || { plays: 0 };
          const isCur  = queue[currentTrackIndex]?.uid === track.uid;
          const tPrimary = track.artist.split(/,|&|feat\.|ft\.|with/i)[0].trim();
          return `<div class="tracklist-row ${isCur ? 'playing' : ''}" style="display:grid;grid-template-columns:50px 1fr auto auto;gap:16px;padding:12px 16px;border-radius:6px;cursor:pointer;transition:all 0.2s;align-items:center;"
            onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='${isCur?'var(--bg-tertiary)':'transparent'}'"
            onclick="playAlbumTrack('${track.uid}','${albumTracks.map(t=>t.uid).join(',')}')">
            <span style="color:var(--text-muted);font-size:16px;font-variant-numeric:tabular-nums;">${isCur && (isPlaying1 || isPlaying2) ? '▶' : idx+1}</span>
            <div style="min-width:0;">
              <div style="font-weight:600;font-size:16px;color:${isCur?'var(--accent)':'var(--text-primary)'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Utils.escapeHtml(track.title||'Unknown Track')}</div>
              <div style="font-size:14px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Utils.escapeHtml(tPrimary)}</div>
            </div>
            <span style="color:var(--text-muted);font-size:14px;text-align:right;font-variant-numeric:tabular-nums;">${tStats.plays||''}</span>
            <span style="color:var(--text-muted);font-size:14px;text-align:right;font-variant-numeric:tabular-nums;">${Utils.formatTime(track.duration||0)}</span>
          </div>`;
        }).join('')}
      </div>`;
  }

  static filter(query) {
    const lower = query.toLowerCase();
    document.querySelectorAll('.album-card').forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(lower) ? 'block' : 'none';
    });
  }

  static play(trackUids) {
    const uids = trackUids.split(',');
    const albumTracks = uids.map(uid => tracks.find(t => t.uid === uid)).filter(t => t);
    if (!albumTracks.length) return;
    queue = albumTracks; currentTrackIndex = 0;
    QueueManager.render(); playTrackAtIndex(0, audio, 0);
    toast(`Playing album: ${albumTracks[0].album || 'Unknown Album'}`);
  }

  static shuffle(trackUids) {
    const uids = trackUids.split(',');
    const albumTracks = uids.map(uid => tracks.find(t => t.uid === uid)).filter(t => t);
    if (!albumTracks.length) return;
    for (let i = albumTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [albumTracks[i], albumTracks[j]] = [albumTracks[j], albumTracks[i]];
    }
    queue = albumTracks; currentTrackIndex = 0;
    QueueManager.render(); playTrackAtIndex(0, audio, 0);
    toast(`Shuffling album: ${albumTracks[0].album || 'Unknown Album'}`);
  }

  static addToQueue(trackUids) {
    // Album queueing belongs to the real Up Next queue, not the library queue.
    // Keep this method name for compatibility with existing album buttons.
    addAlbumToUserQueue(trackUids, false);
  }

  static playTrack(trackUid, albumTrackUids) {
    // Clicked from an album's tracklist: play the rest of the album from
    // here, then fall back into whatever was still upcoming in the user's
    // actual queue - rather than replacing the queue outright and losing it.
    if (albumTrackUids) {
      const uids = albumTrackUids.split(',');
      const albumTracks = uids.map(uid => tracks.find(t => t.uid === uid)).filter(t => t);
      const idx = albumTracks.findIndex(t => t.uid === trackUid);
      if (albumTracks.length && idx !== -1) {
        const remainingAlbum = albumTracks.slice(idx);
        const remainingUids = new Set(remainingAlbum.map(t => t.uid));
        const restOfOldQueue = queue.slice(currentTrackIndex + 1).filter(t => !remainingUids.has(t.uid));
        queue = [...remainingAlbum, ...restOfOldQueue];
        currentTrackIndex = 0;
        QueueManager.render(); playTrackAtIndex(0, audio, 0);
        return;
      }
    }
    // Fallback for callers that don't have album context.
    const track = tracks.find(t => t.uid === trackUid);
    if (!track) return;
    const i = queue.findIndex(t => t.uid === trackUid);
    if (i !== -1) playTrackAtIndex(0, audio, i);
    else { queue.unshift(track); QueueManager.render(); playTrackAtIndex(0, audio, 0); }
  }
}

// Legacy wrappers
const showAlbumView    = () => AlbumManager.show();
const showAlbumDetail  = (...args) => AlbumManager.showDetail(...args);
const filterAlbums     = (...args) => AlbumManager.filter(...args);
const showAlbumTracks  = (t, a) => {
  const albumTracks = tracks.filter(tr => (tr.album||'Unknown Album') === t && (tr.artist||'Unknown Artist') === a);
  if (!albumTracks.length) return;
  queue = albumTracks;
  currentTrackIndex = 0;
  QueueManager.render();
  returnToHome();
  playTrackAtIndex(0, audio, 0);
};
const playAlbum        = (...args) => AlbumManager.play(...args);
const shuffleAlbum     = (...args) => AlbumManager.shuffle(...args);
const addAlbumToQueue  = (...args) => AlbumManager.addToQueue(...args);
const playAlbumTrack   = (...args) => AlbumManager.playTrack(...args);

// ============================================================================
// PLAYLIST MANAGER — custom playlists
// ============================================================================
// Track uids get regenerated every launch (the library is rebuilt from your
// folder each time), so a playlist can't store uids. Instead each song gets a
// stable key (youtube id, or filename + size) and the playlist is matched back
// to the library whenever it's shown or played. Songs that aren't loaded right
// now stay in the playlist, they just show greyed out until they're back.
// Saved in localStorage under `youtify_playlists`.

class PlaylistManager {
  static STORAGE_KEY = 'youtify_playlists';
  static playlists = [];
  static openId = null;
  static _drag = null;
  static _loaded = false;
  static COLORS = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#fd79a8','#a29bfe','#fdcb6e','#6c5ce7'];

  // ---------- storage ----------
  static load() {
    try {
      const raw = JSON.parse(localStorage.getItem(PlaylistManager.STORAGE_KEY) || '[]');
      PlaylistManager.playlists = Array.isArray(raw)
        ? raw.filter(p => p && p.id && Array.isArray(p.items))
        : [];
    } catch (e) { PlaylistManager.playlists = []; }
    PlaylistManager._loaded = true;
  }

  static save() {
    try { localStorage.setItem(PlaylistManager.STORAGE_KEY, JSON.stringify(PlaylistManager.playlists)); }
    catch (e) { console.warn('Could not save playlists', e); toast('Could not save playlists'); }
  }

  static all() {
    if (!PlaylistManager._loaded) PlaylistManager.load();
    return PlaylistManager.playlists;
  }

  static get(id) { return PlaylistManager.all().find(p => p.id === id) || null; }

  // ---------- helpers ----------
  static esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  static norm(x) { return String(x || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

  static keyFor(t) {
    if (!t) return null;
    if (t.id) return 'yt:' + t.id;
    const fileName = t._fileName || (t.file && t.file.name) || '';
    if (fileName) return 'f:' + fileName.toLowerCase() + '|' + (t.fileSize || 0);
    const title = PlaylistManager.norm(t.title);
    if (!title) return null;
    return 't:' + title + '|' + PlaylistManager.norm(t.artist) + '|' + (t.fileSize || 0);
  }

  static itemFor(t) {
    const item = {
      key: PlaylistManager.keyFor(t),
      title: t.title || 'Unknown Track',
      artist: t.artist || 'Unknown Artist'
    };
    // embedded art is a giant base64 string, only keep small plain urls
    if (t.albumArt && !String(t.albumArt).startsWith('data:') && String(t.albumArt).length < 300) item.art = t.albumArt;
    return item;
  }

  // playlist items -> [{ item, track|null }] matched against the current library
  static resolve(pl) {
    const byKey = new Map();
    tracks.forEach(t => {
      const k = PlaylistManager.keyFor(t);
      if (k && !byKey.has(k)) byKey.set(k, t);
    });
    return pl.items.map(item => ({ item, track: byKey.get(item.key) || null }));
  }

  static playableTracks(pl) {
    return PlaylistManager.resolve(pl).map(r => r.track).filter(Boolean);
  }

  static totalSeconds(list) {
    return list.reduce((s, t) => s + (Number(t && t.duration) > 0 ? Number(t.duration) : 0), 0);
  }

  // ---------- create / edit ----------
  static create(name, trackList = []) {
    const pl = {
      id: 'pl' + Utils.generateUID(),
      name: String(name || '').trim().slice(0, 60) || 'Untitled playlist',
      created: Date.now(),
      updated: Date.now(),
      items: []
    };
    PlaylistManager.all().push(pl);
    PlaylistManager.addTracks(pl.id, trackList, true);
    PlaylistManager.save();
    return pl;
  }

  static addTracks(id, trackList, silent = false) {
    const pl = PlaylistManager.get(id);
    if (!pl) return 0;
    const have = new Set(pl.items.map(i => i.key));
    let added = 0;
    (trackList || []).forEach(t => {
      const k = PlaylistManager.keyFor(t);
      if (!k || have.has(k)) return;
      have.add(k);
      pl.items.push(PlaylistManager.itemFor(t));
      added++;
    });
    if (added) { pl.updated = Date.now(); PlaylistManager.save(); }
    if (!silent) {
      if (added) toast(`Added ${added} song${added === 1 ? '' : 's'} to ${pl.name}`);
      else toast(`Already in ${pl.name}`);
    }
    return added;
  }

  static removeItem(id, index) {
    const pl = PlaylistManager.get(id);
    if (!pl || !pl.items[index]) return;
    pl.items.splice(index, 1);
    pl.updated = Date.now();
    PlaylistManager.save();
    PlaylistManager.showDetail(id);
  }

  static rename(id) {
    const pl = PlaylistManager.get(id);
    if (!pl) return;
    PlaylistManager.promptName({ title: 'Rename playlist', initial: pl.name, confirmText: 'Save' }, name => {
      pl.name = name;
      pl.updated = Date.now();
      PlaylistManager.save();
      PlaylistManager.refresh();
    });
  }

  static remove(id) {
    const pl = PlaylistManager.get(id);
    if (!pl) return;
    if (!confirm(`Delete playlist "${pl.name}"?`)) return;
    PlaylistManager.playlists = PlaylistManager.all().filter(p => p.id !== id);
    PlaylistManager.save();
    PlaylistManager.openId = null;
    toast(`Deleted ${pl.name}`);
    PlaylistManager.show();
  }

  static newPlaylist() {
    PlaylistManager.promptName({ title: 'New playlist', initial: '', confirmText: 'Create' }, name => {
      const pl = PlaylistManager.create(name);
      toast(`Created ${pl.name}`);
      PlaylistManager.showDetail(pl.id);
    });
  }

  static saveQueue() {
    if (!queue.length) { toast('Queue is empty'); return; }
    const snapshot = queue.slice();
    PlaylistManager.promptName({ title: 'Save queue as playlist', initial: '', confirmText: 'Save' }, name => {
      const pl = PlaylistManager.create(name, snapshot);
      toast(`Saved ${pl.items.length} song${pl.items.length === 1 ? '' : 's'} to ${pl.name}`);
      if (currentView === 'playlists') PlaylistManager.refresh();
    });
  }

  static addCurrent() {
    const t = queue[currentTrackIndex];
    if (!t) { toast('No track playing'); return; }
    PlaylistManager.openPicker([t]);
  }

  // ---------- dialogs ----------
  static promptName({ title, initial = '', confirmText = 'OK' }, onDone) {
    const modal = Utils.createModal(PlaylistManager.esc(title));
    modal.body.innerHTML = `
      <div class="form-group">
        <input type="text" class="form-input" maxlength="60" placeholder="Playlist name..." value="${PlaylistManager.esc(initial)}">
        <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn secondary pl-cancel">Cancel</button>
          <button class="btn primary pl-ok">${PlaylistManager.esc(confirmText)}</button>
        </div>
      </div>`;
    const input = modal.body.querySelector('input');
    const submit = () => {
      const name = input.value.trim();
      if (!name) { input.focus(); return; }
      modal.close();
      onDone(name);
    };
    modal.body.querySelector('.pl-ok').addEventListener('click', submit);
    modal.body.querySelector('.pl-cancel').addEventListener('click', modal.close);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
      if (e.key === 'Escape') modal.close();
    });
    setTimeout(() => { input.focus(); input.select(); }, 30);
  }

  // "Add to playlist" picker. Takes an array of library tracks.
  static openPicker(trackList) {
    const list = (trackList || []).filter(t => t && PlaylistManager.keyFor(t));
    if (!list.length) { toast('Nothing to add'); return; }
    const modal = Utils.createModal(list.length === 1 ? 'Add to playlist' : `Add ${list.length} songs to playlist`);
    const keys = list.map(t => PlaylistManager.keyFor(t));

    modal.body.innerHTML = `
      <div class="form-group" style="display:flex;gap:8px;">
        <input type="text" class="form-input" maxlength="60" placeholder="New playlist name..." style="flex:1;">
        <button class="btn primary pl-create">Create</button>
      </div>
      <div class="pl-pick-list"></div>`;

    const input = modal.body.querySelector('input');
    const listEl = modal.body.querySelector('.pl-pick-list');

    const create = () => {
      const name = input.value.trim();
      if (!name) { input.focus(); return; }
      const pl = PlaylistManager.create(name, list);
      modal.close();
      toast(`Created ${pl.name} with ${pl.items.length} song${pl.items.length === 1 ? '' : 's'}`);
      if (currentView === 'playlists') PlaylistManager.refresh();
    };
    modal.body.querySelector('.pl-create').addEventListener('click', create);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); create(); } });

    const pls = PlaylistManager.all().slice().sort((a, b) => (b.updated || 0) - (a.updated || 0));
    if (!pls.length) {
      listEl.innerHTML = `<div class="pl-pick-empty">No playlists yet. Name one above to make your first.</div>`;
    }
    pls.forEach(pl => {
      const have = new Set(pl.items.map(i => i.key));
      const already = keys.every(k => have.has(k));
      const row = document.createElement('button');
      row.className = 'pl-pick-row';
      row.innerHTML = `
        <span class="pl-pick-name">${PlaylistManager.esc(pl.name)}</span>
        <span class="pl-pick-count">${already ? '✓ added' : `${pl.items.length} song${pl.items.length === 1 ? '' : 's'}`}</span>`;
      row.addEventListener('click', () => {
        PlaylistManager.addTracks(pl.id, list);
        modal.close();
        if (currentView === 'playlists') PlaylistManager.refresh();
      });
      listEl.appendChild(row);
    });
    setTimeout(() => input.focus(), 30);
  }

  // ---------- playback ----------
  static _startQueue(list, start, message) {
    queue = list;
    currentTrackIndex = start;
    queueSort.field = null;
    if (typeof paintQueueSortState === 'function') paintQueueSortState();
    QueueManager.render();
    playTrackAtIndex(0, audio, start);
    if (message) toast(message);
  }

  static play(id, shuffle = false) {
    const pl = PlaylistManager.get(id);
    if (!pl) return;
    const list = PlaylistManager.playableTracks(pl);
    if (!list.length) {
      toast(pl.items.length ? 'None of these songs are loaded right now' : 'This playlist is empty');
      return;
    }
    if (shuffle) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    PlaylistManager._startQueue(list, 0, `${shuffle ? 'Shuffling' : 'Playing'} ${pl.name}`);
  }

  // click on a row: whole playlist becomes the queue, starting at that song
  static playFrom(id, itemIndex) {
    const pl = PlaylistManager.get(id);
    if (!pl || !pl.items[itemIndex]) return;
    const list = PlaylistManager.playableTracks(pl);
    const start = list.findIndex(t => PlaylistManager.keyFor(t) === pl.items[itemIndex].key);
    if (start === -1) { toast('That song is not loaded right now'); return; }
    PlaylistManager._startQueue(list, start, null);
  }

  static queueAll(id, playNext = false) {
    const pl = PlaylistManager.get(id);
    if (!pl) return;
    const list = PlaylistManager.playableTracks(pl);
    if (!list.length) { toast('Nothing loaded to queue'); return; }
    // first song of the playlist should be the first one up
    userQueue = playNext ? list.concat(userQueue) : userQueue.concat(list);
    uqRender();
    toast(playNext
      ? `Playing next: ${pl.name}`
      : `Added ${list.length} song${list.length === 1 ? '' : 's'} to Up Next`);
  }

  static queueItem(id, itemIndex) {
    const pl = PlaylistManager.get(id);
    if (!pl || !pl.items[itemIndex]) return;
    const t = PlaylistManager.resolve(pl)[itemIndex].track;
    if (!t) { toast('That song is not loaded right now'); return; }
    userQueue.push(t);
    uqRender();
    toast(`Added to queue: ${t.title || 'Unknown Track'}`);
  }

  // ---------- views ----------
  static refresh() {
    if (currentView !== 'playlists') return;
    if (PlaylistManager.openId && PlaylistManager.get(PlaylistManager.openId)) PlaylistManager.showDetail(PlaylistManager.openId);
    else PlaylistManager.show();
  }

  static coverHTML(pl, resolved, size) {
    const first = resolved.find(r => r.track && r.track.albumArt && r.track.albumArt.trim());
    const art = first ? first.track.albumArt : (pl.items.find(i => i.art) || {}).art || '';
    const letter = (pl.name || 'P').trim().charAt(0).toUpperCase() || 'P';
    const color = PlaylistManager.COLORS[(pl.name || 'P').charCodeAt(0) % PlaylistManager.COLORS.length];
    return `<div class="pl-cover ${size}">
      <div class="pl-cover-fallback" style="background:${color};">${PlaylistManager.esc(letter)}</div>
      ${art ? `<img src="${PlaylistManager.esc(art)}" alt="" onerror="this.style.display='none'">` : ''}
    </div>`;
  }

  static show() {
    const main = document.getElementById('mainContent');
    if (!main) return;
    PlaylistManager.openId = null;
    currentView = 'playlists';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.view === 'playlists'));

    const pls = PlaylistManager.all().slice().sort((a, b) => (b.updated || 0) - (a.updated || 0));
    const cards = pls.map(pl => {
      const resolved = PlaylistManager.resolve(pl);
      const loaded = resolved.filter(r => r.track).length;
      const secs = PlaylistManager.totalSeconds(resolved.map(r => r.track).filter(Boolean));
      const sub = `${pl.items.length} song${pl.items.length === 1 ? '' : 's'}${secs > 0 ? ' • ' + Utils.formatDuration(secs) : ''}${loaded < pl.items.length ? ' • ' + (pl.items.length - loaded) + ' not loaded' : ''}`;
      return `<div class="album-card" onclick="PlaylistManager.showDetail('${pl.id}')">
        ${PlaylistManager.coverHTML(pl, resolved, 'sm')}
        <h4>${PlaylistManager.esc(pl.name)}</h4>
        <p>${PlaylistManager.esc(sub)}</p>
      </div>`;
    }).join('');

    main.innerHTML = `
      <div class="header"><div class="search-container"></div><div class="user-profile"></div></div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
        <h2 class="section-title" style="margin:0;">Playlists (${pls.length})</h2>
        <button class="btn primary" onclick="PlaylistManager.newPlaylist()">+ New Playlist</button>
      </div>
      ${pls.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="14" y2="6"></line><line x1="3" y1="12" x2="14" y2="12"></line><line x1="3" y1="18" x2="10" y2="18"></line><path d="M18 10v8"></path><path d="M14 14h8"></path></svg></div>
          <div class="empty-title">No playlists yet</div>
          <div class="empty-subtitle">Make one here, or right click a song and pick "Add to playlist"</div>
        </div>` : `<div class="album-grid" id="playlistGrid">${cards}</div>`}`;
  }

  static showDetail(id) {
    const pl = PlaylistManager.get(id);
    const main = document.getElementById('mainContent');
    if (!pl || !main) { PlaylistManager.show(); return; }
    PlaylistManager.openId = id;
    currentView = 'playlists';

    const resolved = PlaylistManager.resolve(pl);
    const loadedTracks = resolved.map(r => r.track).filter(Boolean);
    const secs = PlaylistManager.totalSeconds(loadedTracks);
    const missing = pl.items.length - loadedTracks.length;
    const curUid = queue[currentTrackIndex]?.uid;
    const playingNow = (typeof isPlaying1 !== 'undefined' && isPlaying1) || (typeof isPlaying2 !== 'undefined' && isPlaying2);
    const E = PlaylistManager.esc;

    const rows = resolved.map(({ item, track }, i) => {
      const isMissing = !track;
      const isCur = !!track && track.uid === curUid;
      const title = track ? (track.title || item.title) : item.title;
      const artist = track ? (track.artist || item.artist) : item.artist;
      const dur = track && track.duration > 0 ? Utils.formatTime(track.duration) : '';
      return `<div class="pl-row ${isCur ? 'playing' : ''} ${isMissing ? 'missing' : ''}" data-idx="${i}" draggable="true"
          ${isMissing ? 'title="Not in your library right now"' : `onclick="PlaylistManager.playFrom('${id}',${i})"`}>
        <span class="pl-num">${isCur && playingNow ? '▶' : i + 1}</span>
        <div class="pl-meta">
          <div class="pl-title">${E(title)}</div>
          <div class="pl-artist">${E(artist)}${isMissing ? ' • not in library' : ''}</div>
        </div>
        <span class="pl-dur">${dur}</span>
        <div class="pl-actions">
          ${isMissing ? '' : `<button class="pl-icon-btn" title="Add to queue" onclick="event.stopPropagation();PlaylistManager.queueItem('${id}',${i})" style="font-weight:700;font-size:18px;line-height:1;width:32px;justify-content:center;">+</button>`}
          <button class="pl-icon-btn" title="Remove from playlist" onclick="event.stopPropagation();PlaylistManager.removeItem('${id}',${i})"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
      </div>`;
    }).join('');

    const circle = 'border-radius:50%;width:56px;height:56px;font-size:20px;display:flex;align-items:center;justify-content:center;';
    main.innerHTML = `
      <div class="header"><div class="search-container"><button class="btn secondary" onclick="PlaylistManager.show()" style="margin-right:12px;">← Back to Playlists</button></div><div class="user-profile"></div></div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:32px;padding:24px;background:linear-gradient(to bottom,var(--bg-tertiary),transparent);border-radius:12px;">
        ${PlaylistManager.coverHTML(pl, resolved, 'lg')}
        <div style="display:flex;flex-direction:column;justify-content:flex-end;min-width:0;">
          <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--text-secondary);margin-bottom:8px;">Playlist</div>
          <h1 style="font-size:48px;font-weight:800;margin-bottom:16px;line-height:1.1;overflow-wrap:anywhere;">${E(pl.name)}</h1>
          <div style="color:var(--text-secondary);font-size:14px;">${pl.items.length} song${pl.items.length === 1 ? '' : 's'}${secs > 0 ? ', ' + Utils.formatDuration(secs) : ''}${missing > 0 ? ` • ${missing} not loaded right now` : ''}</div>
        </div>
      </div>
      <div style="display:flex;gap:16px;margin-bottom:32px;padding:0 24px;flex-wrap:wrap;">
        <button class="btn primary" onclick="PlaylistManager.play('${id}')" style="${circle}" title="Play"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="7 4 19 12 7 20 7 4"></polygon></svg></button>
        <button class="btn secondary" onclick="PlaylistManager.play('${id}',true)" style="${circle}" title="Shuffle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg></button>
        <button class="btn secondary" onclick="PlaylistManager.queueAll('${id}')" style="${circle}" title="Add to Up Next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
        <button class="btn secondary" onclick="PlaylistManager.queueAll('${id}',true)" style="${circle}" title="Play next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 4 6 20"></polyline><polygon points="10 7 19 12 10 17 10 7"></polygon></svg></button>
        <button class="btn secondary" onclick="PlaylistManager.rename('${id}')" style="${circle}" title="Rename"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg></button>
        <button class="btn secondary" onclick="PlaylistManager.remove('${id}')" style="${circle}" title="Delete playlist"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
      </div>
      <div style="padding:0 24px;">
        ${pl.items.length === 0 ? `
          <div class="empty-state">
            <div class="empty-title">This playlist is empty</div>
            <div class="empty-subtitle">Right click a song (or hit the playlist button on a row) and pick "Add to playlist"</div>
          </div>` : rows}
      </div>`;

    PlaylistManager.bindDrag(id);
  }

  static bindDrag(id) {
    document.querySelectorAll('.pl-row[draggable="true"]').forEach(row => {
      row.addEventListener('dragstart', e => {
        PlaylistManager._drag = Number(row.dataset.idx);
        row.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', 'playlist-row'); } catch (_) {}
      });
      row.addEventListener('dragover', e => {
        if (PlaylistManager._drag === null) return;
        e.preventDefault();
        row.classList.add('drag-over');
      });
      row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
      row.addEventListener('drop', e => {
        e.preventDefault();
        row.classList.remove('drag-over');
        const from = PlaylistManager._drag;
        const to = Number(row.dataset.idx);
        PlaylistManager._drag = null;
        if (from === null || from === to) return;
        const pl = PlaylistManager.get(id);
        if (!pl) return;
        const [moved] = pl.items.splice(from, 1);
        pl.items.splice(to, 0, moved);
        pl.updated = Date.now();
        PlaylistManager.save();
        PlaylistManager.showDetail(id);
      });
      row.addEventListener('dragend', () => {
        PlaylistManager._drag = null;
        row.style.opacity = '';
        document.querySelectorAll('.pl-row.drag-over').forEach(r => r.classList.remove('drag-over'));
      });
    });
  }
}
window.PlaylistManager = PlaylistManager;

// Legacy-style wrappers so inline onclick="" handlers stay short
const openAddToPlaylist = (queueIndex) => { const t = queue[queueIndex]; if (t) PlaylistManager.openPicker([t]); };
const addContextTrackToPlaylist = () => {
  const t = queue[contextTrackIndex];
  closeTrackContextMenu();
  if (t) PlaylistManager.openPicker([t]);
};
const saveQueueAsPlaylist = () => PlaylistManager.saveQueue();
const addCurrentTrackToPlaylist = () => PlaylistManager.addCurrent();

(function injectPlaylistCSS() {
  const css = `
    .pl-cover{position:relative;width:100%;aspect-ratio:1;border-radius:8px;overflow:hidden;margin-bottom:12px;background:var(--bg-secondary);}
    .pl-cover.lg{width:232px;height:232px;margin:0;flex-shrink:0;box-shadow:0 8px 24px rgba(0,0,0,.5);}
    .pl-cover-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:#fff;}
    .pl-cover.lg .pl-cover-fallback{font-size:84px;}
    .pl-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
    .pl-row{display:grid;grid-template-columns:44px 1fr auto auto;gap:16px;padding:10px 16px;border-radius:6px;cursor:pointer;align-items:center;transition:background .15s;}
    .pl-row:hover{background:var(--bg-hover);}
    .pl-row.playing{background:var(--bg-tertiary);}
    .pl-row.playing .pl-title{color:var(--accent);}
    .pl-row.missing{opacity:.45;cursor:default;}
    .pl-row.drag-over{box-shadow:0 -2px 0 var(--accent);}
    .pl-num{color:var(--text-muted);font-size:16px;font-variant-numeric:tabular-nums;}
    .pl-meta{min-width:0;}
    .pl-title{font-weight:600;font-size:16px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .pl-artist{font-size:14px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .pl-dur{color:var(--text-muted);font-size:14px;text-align:right;font-variant-numeric:tabular-nums;}
    .pl-actions{display:flex;gap:4px;opacity:0;transition:opacity .15s;}
    .pl-row:hover .pl-actions,.pl-row:focus-within .pl-actions{opacity:1;}
    @media (hover:none){.pl-actions{opacity:1;}}
    .pl-icon-btn{background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:6px;border-radius:6px;display:flex;align-items:center;}
    .pl-icon-btn:hover{color:var(--text-primary);background:var(--bg-tertiary);}
    .pl-pick-list{margin-top:12px;max-height:50vh;overflow-y:auto;display:flex;flex-direction:column;gap:4px;}
    .pl-pick-row{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;padding:12px 14px;border:none;border-radius:8px;background:var(--bg-secondary);color:var(--text-primary);cursor:pointer;text-align:left;font:inherit;}
    .pl-pick-row:hover{background:var(--bg-hover);}
    .pl-pick-name{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .pl-pick-count{color:var(--text-muted);font-size:12px;flex-shrink:0;}
    .pl-pick-empty{color:var(--text-muted);font-size:14px;padding:12px 4px;}
  `;
  const inject = () => Utils.addGlobalCSS(css);
  if (document.body) inject(); else document.addEventListener('DOMContentLoaded', inject);
})();



function rebindAudioListeners() {
  // audio/audio2 are two fixed, persistent <audio> elements that get swapped
  // by reference on every crossfade (see PlayerController crossfade code) -
  // they are never recreated. addEventListener never replaces a prior
  // listener, so re-adding the same three "core" listeners here on every
  // swap silently stacked duplicate listeners forever, causing things like
  // next-track firing multiple times per song end after repeated crossfades.
  // Guard with a one-time marker per physical element instead.
  if (!audio.dataset.coreListenersBound) {
    audio.addEventListener('timeupdate', () => PlayerController.updateProgressBar());
    audio.addEventListener('timeupdate', () => FullLyricsPlayer.syncPlayback());
    audio.addEventListener('ended', (e) => {
      // During a crossfade the old physical element can still emit `ended` after
      // the references have been swapped. Only the currently-active element may
      // advance the queue, otherwise a completed fade can immediately skip again.
      if (e.currentTarget === audio && !isCrossfading) {
        PlayerController.next(0, false);
      }
    });
    audio.addEventListener('loadedmetadata', () => {
      const d = document.getElementById('duration');
      if (d) d.textContent = Utils.formatTime(audio.duration);
    });
    audio.dataset.coreListenersBound = '1';
    audio.addEventListener('loadedmetadata', () => FullLyricsPlayer.syncPlayback());
  }

  // Rebind lyrics manager if it's active (also guarded per-element)
  if (lyricsManager && !audio.dataset.lyricsListenersBound) {
    audio.addEventListener('timeupdate', lyricsManager.handleTimeUpdate);
    audio.addEventListener('timeupdate', () => FullLyricsPlayer.syncPlayback());
    audio.addEventListener('loadedmetadata', () => FullLyricsPlayer.syncPlayback());
    audio.addEventListener('loadedmetadata', () => {
      lyricsManager.songDuration = audio.duration || 0;
    });
    audio.dataset.lyricsListenersBound = '1';
  }

  // Point the module-level EQ node variables (gainNode/bassNode/midNode/trebleNode) at
  // whichever physical element is now the active `audio`. Without this, EQ sliders keep
  // adjusting whatever chain was active before the swap — a chain attached to the element
  // that's now silent — so bass/mid/treble/gain would stop having any audible effect after
  // the first crossfade even though the sliders still move and update their labels.
  AudioEngine.syncActiveChain();
}

// ============================================================================
// STATS MANAGER
// ============================================================================

class StatsManager {
  constructor() {
    this.db = null;
    this.cache = { totalPlays: 0, totalTime: 0, trackStats: {}, playHistory: [] };
    this.saveTimeout = null;
    /* Nothing may be written until a load has actually succeeded. Without this,
       a failed read left the cache at zero and the next autosave wrote those
       zeros over the real record — stats vanishing for no visible reason. */
    this.loaded = false;
  }

  async init() {
    try {
      this.db = await new Promise((resolve, reject) => {
        const req = indexedDB.open('YoutifiyStatsDB', 1);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result);
        req.onupgradeneeded = (e) => {
          if (!e.target.result.objectStoreNames.contains('stats'))
            e.target.result.createObjectStore('stats', { keyPath: 'id' });
        };
      });

      const stats = await this.get('main-stats');
      if (stats) {
        // merge rather than assign: a play recorded before init finished would
        // otherwise be thrown away
        this.cache.totalPlays = Math.max(this.cache.totalPlays || 0, stats.totalPlays || 0);
        this.cache.totalTime  = Math.max(this.cache.totalTime  || 0, stats.totalTime  || 0);
        this.cache.trackStats = StatsManager.mergeTracks(stats.trackStats, this.cache.trackStats);
      }

      const history = await this.get('play-history');
      if (history) this.cache.playHistory = StatsManager.mergeHistory(history.history, this.cache.playHistory);

      this.loaded = true;          // only now is it safe to write
      await this.migrate();
      console.log('✅ StatsManager initialized');
    } catch (e) {
      // leave loaded=false so we never overwrite good data with an empty cache
      console.error('StatsManager init failed — stats will not be written this session:', e);
      if (typeof toast === 'function') toast("Couldn't load your stats, so they won't be updated this session");
    }
  }

  async migrate() {
    if (localStorage.getItem('stats_migrated')) return;
    try {
      const oldStats   = localStorage.getItem('youtifiy_stats');
      const oldHistory = localStorage.getItem('youtifiy_history');
      if (oldStats) {
        const parsed = JSON.parse(oldStats);
        this.cache.totalPlays = parsed.totalPlays || 0;
        this.cache.totalTime  = parsed.totalTime  || 0;
        this.cache.trackStats = parsed.trackStats || {};
        await this.save();
      }
      if (oldHistory) { this.cache.playHistory = JSON.parse(oldHistory) || []; await this.saveHistory(); }
      localStorage.setItem('stats_migrated', 'true');
      localStorage.removeItem('youtifiy_stats');
      localStorage.removeItem('youtifiy_history');
    } catch (e) {}
  }

  async get(id) {
    if (!this.db) return null;
    return new Promise((resolve, reject) => {
      const req = this.db.transaction(['stats'], 'readonly').objectStore('stats').get(id);
      req.onsuccess = () => resolve(req.result || null);
      // a failed read must NOT look like "no stats yet"
      req.onerror   = () => reject(req.error || new Error('stats read failed'));
    });
  }

  /* Highest wins per track, so a second tab with a staler cache can't erase
     plays the other tab recorded. */
  static mergeTracks(a, b) {
    const out = Object.assign({}, a || {});
    Object.entries(b || {}).forEach(([uid, t]) => {
      const old = out[uid];
      out[uid] = !old ? t : {
        title:     t.title    || old.title,
        artist:    t.artist   || old.artist,
        albumArt:  t.albumArt || old.albumArt,
        plays:     Math.max(old.plays     || 0, t.plays     || 0),
        totalTime: Math.max(old.totalTime || 0, t.totalTime || 0)
      };
    });
    return out;
  }

  static mergeHistory(a, b) {
    const seen = new Set();
    return [...(a || []), ...(b || [])]
      .filter((h) => {
        if (!h) return false;
        const k = (h.time || '') + '\u0001' + (h.track || h.title || '');
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .sort((x, y) => String(y.time || '').localeCompare(String(x.time || '')))
      .slice(0, 1000);
  }

  /* Read-merge-write inside one transaction. Two tabs open used to mean the
     last one to autosave stamped its own cache over the other's. */
  async save() {
    if (!this.db || !this.loaded) return;
    return new Promise((resolve) => {
      const tx = this.db.transaction(['stats'], 'readwrite');
      const store = tx.objectStore('stats');
      const req = store.get('main-stats');
      req.onsuccess = () => {
        const stored = req.result || {};
        this.cache.totalPlays = Math.max(stored.totalPlays || 0, this.cache.totalPlays || 0);
        this.cache.totalTime  = Math.max(stored.totalTime  || 0, this.cache.totalTime  || 0);
        this.cache.trackStats = StatsManager.mergeTracks(stored.trackStats, this.cache.trackStats);
        store.put({
          id: 'main-stats',
          totalPlays: this.cache.totalPlays,
          totalTime:  this.cache.totalTime,
          trackStats: this.cache.trackStats,
          lastUpdated: Date.now()
        });
      };
      req.onerror = () => { /* couldn't read, so don't write over it */ };
      tx.oncomplete = () => resolve();
      tx.onerror    = () => resolve();
      tx.onabort    = () => resolve();
    });
  }

  async saveHistory() {
    if (!this.db || !this.loaded) return;
    return new Promise((resolve) => {
      const tx = this.db.transaction(['stats'], 'readwrite');
      const store = tx.objectStore('stats');
      const req = store.get('play-history');
      req.onsuccess = () => {
        const stored = (req.result && req.result.history) || [];
        this.cache.playHistory = StatsManager.mergeHistory(stored, this.cache.playHistory);
        store.put({ id: 'play-history', history: this.cache.playHistory, lastUpdated: Date.now() });
      };
      req.onerror = () => {};
      tx.oncomplete = () => resolve();
      tx.onerror    = () => resolve();
      tx.onabort    = () => resolve();
    });
  }

  recordPlay(track) {
    this.cache.playHistory.unshift({ track: track.uid, title: track.title, artist: track.artist, albumArt: track.albumArt, time: new Date().toISOString() });
    if (this.cache.playHistory.length > 1000) this.cache.playHistory.pop();
    this.cache.totalPlays++;
    if (!this.cache.trackStats[track.uid]) {
      this.cache.trackStats[track.uid] = { title: track.title, artist: track.artist, albumArt: track.albumArt, plays: 0, totalTime: 0 };
    }
    this.cache.trackStats[track.uid].plays++;
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => { this.save(); this.saveHistory(); }, 2000);
  }

  updatePlayTime(seconds) {
    if (currentTrackIndex === -1) return;
    const track = queue[currentTrackIndex];
    if (!track || !this.cache.trackStats[track.uid]) return;
    this.cache.trackStats[track.uid].totalTime += seconds;
    this.cache.totalTime += seconds;
    this.debouncedSave();
  }

  debouncedSave() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => this.save(), 5000);
  }

  getStats() { return { ...this.cache }; }
  getHistory() { return [...this.cache.playHistory]; }

  /* Folds a server copy in without ever removing anything local. Album art only
     exists on this device, so keep whatever we already had. */
  async mergeFromServer(rec) {
    if (!rec || !this.loaded) return;
    const incoming = {};
    Object.entries(rec.tracks || {}).forEach(([uid, t]) => {
      if (!t) return;
      const local = this.cache.trackStats[uid];
      incoming[uid] = {
        title:     t.title  || (local && local.title)  || 'Unknown',
        artist:    t.artist || (local && local.artist) || 'Unknown Artist',
        albumArt:  (local && local.albumArt) || '',
        plays:     t.plays || 0,
        totalTime: t.totalTime || 0
      };
    });
    this.cache.trackStats = StatsManager.mergeTracks(this.cache.trackStats, incoming);
    this.cache.totalPlays = Math.max(this.cache.totalPlays || 0, rec.totalPlays || 0);
    this.cache.totalTime  = Math.max(this.cache.totalTime  || 0, rec.totalTime  || 0);
    await this.save();
    try { if (typeof renderStatsView === 'function' && document.getElementById('statTotalPlays')) renderStatsView(); } catch (e) {}
  }

  /* Deliberate wipe, so it bypasses the merge that protects against accidents. */
  async reset() {
    this.cache = { totalPlays: 0, totalTime: 0, trackStats: {}, playHistory: [] };
    this.loaded = true;
    if (!this.db) return;
    await new Promise((resolve) => {
      const tx = this.db.transaction(['stats'], 'readwrite');
      const store = tx.objectStore('stats');
      store.put({ id: 'main-stats', totalPlays: 0, totalTime: 0, trackStats: {}, lastUpdated: Date.now() });
      store.put({ id: 'play-history', history: [], lastUpdated: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror    = () => resolve();
      tx.onabort    = () => resolve();
    });
  }
}

// Singleton
const Stats = new StatsManager();
Stats.init();

// ============================================================================
// STATS VIEW
// ============================================================================

function renderStatsView() {
  const stats = Stats.getStats();
  document.getElementById('searchContainer').style.display = "none";
  document.getElementById('statTotalPlays').textContent = stats.totalPlays.toLocaleString();
  document.getElementById('statTotalTime').textContent  = Math.floor(stats.totalTime / 3600) + 'h';

  const topTracks = Object.entries(stats.trackStats).sort((a, b) => (b[1]?.plays || 0) - (a[1]?.plays || 0));
  if (topTracks.length > 0) {
    document.getElementById('statTopTrack').textContent = topTracks[0][1].title || 'Unknown';
    const artistPlays = {};
    Object.values(stats.trackStats).forEach(t => {
      const a = t.artist?.split(',')[0]?.trim() || 'Unknown';
      artistPlays[a] = (artistPlays[a] || 0) + (t.plays || 0);
    });
    const topArtist = Object.entries(artistPlays).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('statTopArtist').textContent = topArtist ? topArtist[0] : '-';
    document.getElementById('topartist').addEventListener('click', () => { if (topArtist) toast(`Artist played ${topArtist[1]} times`); });
  } else {
    document.getElementById('statTopTrack').textContent  = '-';
    document.getElementById('statTopArtist').textContent = '-';
  }

  const topTracksList = document.getElementById('topTracksList');
  topTracksList.innerHTML = topTracks.length === 0
    ? '<p style="color:var(--text-muted);">No play data yet. Play some songs!</p>'
    : topTracks.slice(0, 10).map(([uid, track]) => `
      <div class="top-track-item" onclick="playTrackByUid('${uid}')" style="cursor:pointer;">
        <img src="${track.albumArt || ''}" alt="" style="width:52px;height:52px;border-radius:var(--radius-sm);object-fit:cover;border:1px solid var(--border);">
        <div class="top-track-info" style="flex:1;"><h5 style="font-size:14px;margin-bottom:4px;">${Utils.escapeHtml(track.title || 'Unknown')}</h5><p style="font-size:12px;color:var(--text-muted);">${Utils.escapeHtml(track.artist || 'Unknown Artist')}</p></div>
        <div class="top-track-plays" style="font-size:14px;color:var(--accent);font-weight:700;padding:6px 12px;background:rgba(var(--shadow-glow),0.5);border-radius:var(--radius-sm);">${track.plays} plays</div>
      </div>`).join('');

  const history = Stats.getHistory();
  document.getElementById('recentTracksList').innerHTML = history.length === 0
    ? '<p style="color:var(--text-muted);">No history yet</p>'
    : history.slice(0, 10).map(h => `
      <div class="top-track-item" onclick="playTrackByUid('${h.track}')" style="cursor:pointer;">
        <img src="${h.albumArt || ''}" alt="" style="width:52px;height:52px;border-radius:var(--radius-sm);object-fit:cover;border:1px solid var(--border);">
        <div class="top-track-info" style="flex:1;"><h5 style="font-size:14px;margin-bottom:4px;">${Utils.escapeHtml(h.title || 'Unknown')}</h5><p style="font-size:12px;color:var(--text-muted);">${Utils.escapeHtml(h.artist || 'Unknown')} • ${Utils.timeAgo(h.time)}</p></div>
      </div>`).join('');
}

function playTrackByUid(uid) {
  const track = tracks.find(t => t.uid === uid);
  if (!track) return;
  const i = queue.findIndex(t => t.uid === uid);
  if (i !== -1) playTrackAtIndex(0, audio, i);
  else { queue.unshift(track); QueueManager.render(); playTrackAtIndex(0, audio, 0); }
}

function resetStats() {
  if (!confirm('Reset all playback statistics? This cannot be undone.')) return;
  Stats.reset();
  playStats = { totalPlays: 0, totalTime: 0, trackStats: {} };
  playHistory = [];
  toast('Statistics reset');
}

// ============================================================================
// SETTINGS MANAGER
// ============================================================================

class SettingsManager {
  static open() {
    document.getElementById('settingsModal').classList.add('active');
    document.getElementById('apiKeyInput').value    = apiKey;
    document.getElementById('FileURLinput').value    = svgfile;
    document.getElementById('appTitleInput').value  = document.title;
    const lyricsKeyInput = document.getElementById('lyricsApiKey');
    if (lyricsKeyInput && lyricsManager) lyricsKeyInput.value = lyricsManager.getApiKey();
    if (window.indexedDBManager?.refresh) setTimeout(() => window.indexedDBManager.refresh(), 100);
  }

  static close() { document.getElementById('settingsModal').classList.remove('active'); }

  static saveApiKey() {
    apiKey = document.getElementById('apiKeyInput').value.trim();
    localStorage.setItem('youtifiy_api_key', apiKey);
    youtubeAPI.key = apiKey;
    lyricsManager.setApiKey(apiKey);
    toast('API key saved');
    notifyKeysChanged();
  }

  static resetApiKey() {
    apiKey = '';
    localStorage.removeItem('youtifiy_api_key');
    localStorage.removeItem('youtifiy_lyrics_key');
    youtubeAPI.key = '';
    document.getElementById('apiKeyInput').value = '';
    toast('API key reset');
    notifyKeysChanged();
  }

  static changeAppTitle() {
    const title = document.getElementById('appTitleInput').value.trim();
    if (title) { document.title = title; localStorage.setItem('youtifiy_title', title); toast('Title changed'); }
  }
}

// Legacy wrappers
const openSettings       = () => SettingsManager.open();
const closeSettings      = () => SettingsManager.close();
const saveApiKey         = () => SettingsManager.saveApiKey();
const resetApiKey        = () => SettingsManager.resetApiKey();

/* API keys follow the chat account (see YoutifyChat.keysChanged). */
function notifyKeysChanged() {
  try { if (window.YoutifyChat && window.YoutifyChat.keysChanged) window.YoutifyChat.keysChanged(); } catch (e) {}
}

/* Called by the chat when it pulls keys down from the account. */
window.applySyncedKeys = function (api, lyrics) {
  api = api || '';
  lyrics = lyrics || '';
  apiKey = api;
  if (api) localStorage.setItem('youtifiy_api_key', api); else localStorage.removeItem('youtifiy_api_key');
  if (lyrics) localStorage.setItem('youtifiy_lyrics_key', lyrics); else localStorage.removeItem('youtifiy_lyrics_key');
  try { youtubeAPI.key = api; } catch (e) {}
  try { if (lyricsManager) lyricsManager.apiKey = lyrics; } catch (e) {}
  const a = document.getElementById('apiKeyInput');
  if (a) a.value = api;
  const l = document.getElementById('lyricsApiKey');
  if (l) l.value = lyrics;
};
const changeAppTitle     = () => SettingsManager.changeAppTitle();

function saveFileURL() {
    var datSvg = document.getElementById('FileURLinput').value;
    localStorage.setItem('youtifiy_file_url', datSvg);
    var svgfile = datSvg;
    toast('FileURL saved for Updates');
}

// ============================================================================
// YOUTUBE SEARCH & DOWNLOADS
// ============================================================================

let lastYouTubeSearchQuery = '';
let lastYouTubeSearchHTML  = '';
let lastSearchVideos       = [];

async function searchYouTube() {
  const query = document.getElementById('ytSearchInput').value.trim();
  if (!query) return;
  if (!apiKey) { toast('Please set your API key in settings first'); return; }

  lastYouTubeSearchQuery = query;
  const results = document.getElementById('searchResults');
  results.innerHTML = '<div style="color:var(--text-muted);padding:20px">Searching YouTube...</div>';

  try {
    const data = await youtubeAPI.search(query);
    results.innerHTML = '';
    if (!data.videos || !Array.isArray(data.videos)) {
      results.innerHTML = '<div style="color:var(--text-muted);padding:20px">No results found</div>';
      return;
    }
    // Keep the raw video objects around and reference them by index from the
    // onclick handler below, rather than interpolating title/author text
    // directly into the inline JS — those can contain quotes (e.g. "Don't
    // Stop Believin'") that would otherwise break out of the handler string.
    lastSearchVideos = data.videos;
    data.videos.forEach((v, i) => {
      if (v.video_length === 'SHORTS') return;
      const item = document.createElement('div');
      item.className = 'result-item';
      const thumbUrl = v.thumbnails?.[0]?.url || '';
      item.innerHTML = `
        <div class="result-thumb" style="background-image:url('${thumbUrl}')"></div>
        <div class="result-meta">
          <div class="result-title">${Utils.escapeHtml(v.title || 'Unknown')}</div>
          <div class="result-author">${Utils.escapeHtml(v.author || 'Unknown')} • ${v.video_length || ''}</div>
        </div>
        <button class="btn primary" onclick="addYouTubeTrack(${i})">Add</button>`;
      results.appendChild(item);
    });
  } catch (err) {
    console.error('Search error:', err);
    results.innerHTML = '<div style="color:var(--text-muted);padding:20px">Error searching YouTube</div>';
  } finally {
    // Cache whatever ended up in the panel so navigating away and back
    // (which rebuilds #mainContent from scratch) can restore it instead
    // of silently discarding the last search.
    lastYouTubeSearchHTML = results.innerHTML;
  }
}

function addYouTubeTrack(index) {
  if (!apiKey) { toast('Please set your API key in settings first'); return; }
  const v = lastSearchVideos[index];
  if (!v) { toast('That search result is no longer available — try searching again'); return; }
  const thumbUrl = v.thumbnails?.[0]?.url || '';
  const track = { uid: Utils.generateUID(), type: 'youtube', id: v.video_id, title: v.title || 'Unknown', artist: v.author || 'Unknown', status: 'Fetching...', src: null, albumArt: thumbUrl, duration: 0, progress: 0 };
  downloads.push(track);
  QueueManager.rebuild();
  QueueManager.render();
  renderDownloads();
  youtubeAPI.download(track);
  toast('Added to downloads: ' + track.title);
}

async function addDownload() {
  const input = document.getElementById('ytUrlInput').value.trim();
  if (!input) return;
  if (!apiKey) { toast('Please set your API key in settings first'); return; }
  const id = youtubeAPI.parseID(input);
  const track = { uid: Utils.generateUID(), type: 'youtube', id, title: 'YT: ' + id, artist: 'YouTube', status: 'Fetching...', src: null, albumArt: null, duration: 0, progress: 0 };
  downloads.push(track);
  QueueManager.rebuild(); QueueManager.render(); renderDownloads();
  youtubeAPI.download(track);
  document.getElementById('ytUrlInput').value = '';
  toast('Download added');
}

async function PD(uid) {
  const t = downloads.find(d => d.uid === uid);
  if (!t || !t.url) { toast('Download not available'); return; }
  const targetUrl = t.url, name = t.title || 'download';
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/' + targetUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (blob.type !== 'text/plain') {
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click();
    } else {
      toast('Click The temp access button and retry...');
      const w = 600, h = 700;
      const popout = window.open('about:blank', 'TextPreview', `width=${w},height=${h},left=${(screen.width-w)/2},top=${(screen.height-h)/2},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      if (popout) popout.document.write(`<html><embed src="https://cors-anywhere.herokuapp.com/?='playspent.org'" width="100%" height="100%"></html>`);
    }
    window.URL.revokeObjectURL(url);
  } catch (err) { console.error('Download failed:', err); }
}

async function wPD(uid) {
  const t = downloads.find(d => d.uid === uid);
  if (!t || !t.url) { toast('Download not available'); return; }
  const targetUrl = t.url, name = t.title || 'download';
  try {
    const response = await fetch(targetUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (blob.type !== 'text/plain') {
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click();
    } else {
      console.log('something happened');
    }
    window.URL.revokeObjectURL(url);
  } catch (err) { console.error('Download failed:', err); }
}

async function PDU(Purl) {
  const targetUrl = Purl, name = 'download';
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/' + targetUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (blob.type !== 'text/plain') {
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click();
    } else {
      toast('Click The temp access button and retry...');
      const w = 600, h = 700;
      const popout = window.open('about:blank', 'TextPreview', `width=${w},height=${h},left=${(screen.width-w)/2},top=${(screen.height-h)/2},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      if (popout) popout.document.write(`<html><embed src="https://cors-anywhere.herokuapp.com/?='playspent.org'" width="100%" height="100%"></html>`);
    }
    window.URL.revokeObjectURL(url);
  } catch (err) { console.error('Download failed:', err); }
}

function renderDownloads() {
  const list = document.getElementById('downloadList');
  if (!list) return;
  if (downloads.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></div><div class="empty-title">No downloads yet</div></div>`;
    return;
  }
  // add : ${t.progress/10}% if it has progress
  list.innerHTML = downloads.map(t => `
    <div class="result-item">
      <div class="result-thumb" style="background-image:url('${t.albumArt||''}')">${t.albumArt?'':'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'}</div>
      <div class="result-meta">
        <div class="result-title">${Utils.escapeHtml(t.title)}</div>
        ${t.url ? `<div class="result-author">${t.status}</div>` : `<div class="result-author">${t.status != "Fetching..." || t.status != "Error" ? t.status+": "+(t.progress/10)+"%" : t.status}</div>`}
      </div>
      ${t.url ? `<button onclick="wPD('${t.uid}')" class="btn secondary" download>Download MP3</button>` : ''}
    </div>`).join('');
}

// This is a independent download function
async function DwURL(t) {
  if (!t) { toast('Download not available'); return; }
  const targetUrl = t;
  try {
    const response = await fetch(targetUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (blob.type !== 'text/plain') {
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click();
    } else {
      toast('Click The temp access button and retry...');
      const w = 600, h = 700;
      const popout = window.open('about:blank', 'TextPreview', `width=${w},height=${h},left=${(screen.width-w)/2},top=${(screen.height-h)/2},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      if (popout) popout.document.write(`<html><embed src="https://cors-anywhere.herokuapp.com/?='playspent.org'" width="100%" height="100%"></html>`);
    }
    window.URL.revokeObjectURL(url);
  } catch (err) { console.error('Download failed:', err); }
}

async function DURL(t) {
  if (!t) { toast('Download not available'); return; }
  const targetUrl = t;
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/' + targetUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    if (blob.type !== 'text/plain') {
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click();
    } else {
      toast('Click The temp access button and retry...');
      const w = 600, h = 700;
      const popout = window.open('about:blank', 'TextPreview', `width=${w},height=${h},left=${(screen.width-w)/2},top=${(screen.height-h)/2},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      if (popout) popout.document.write(`<html><embed src="https://cors-anywhere.herokuapp.com/?='playspent.org'" width="100%" height="100%"></html>`);
    }
    window.URL.revokeObjectURL(url);
  } catch (err) { console.error('Download failed:', err); }
}

// ============================================================================
// VIEW MANAGER
// ============================================================================

class ViewManager {
  static HOME_HTML = `
    <div class="header" id="searchContainer">
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search for songs, artists..." id="searchInput"><span class="search-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span></input>
      </div>
      <div class="user-profile"></div>
    </div>
    <div id="homeView">
      <section class="ios-home-hero">
        <div class="hero-now">
          <div class="hero-art" id="heroArt"></div>
          <div class="hero-now-meta">
            <div class="hero-now-label">Now Playing</div>
            <div class="hero-now-title" id="heroTitle">No track playing</div>
            <div class="hero-now-artist" id="heroArtist">Select a track to begin</div>
            <div class="hero-status" id="heroStatus">0 songs ready</div>
          </div>
        </div>
      </section>
      <div class="section-header"></div>
      <div class="queue-container">
        <div class="queue-header">
          <div class="queue-title">Songs</div>
          <div class="queue-controls">
            <div class="player-title queue-status" id="QueueSearchStatus"></div>
            <button class="queue-utility-btn" onclick="jumpToCurrentTrack()" title="Jump to now playing"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 3v3"></path><path d="M12 18v3"></path><path d="M3 12h3"></path><path d="M18 12h3"></path></svg>Now Playing</button>
            <button class="queue-utility-btn" onclick="shuffleQueue()" title="Shuffle queue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>Shuffle</button>
            <div class="queue-overflow">
              <button class="queue-utility-btn queue-sort-toggle" onclick="toggleQueueSort(event)" title="Sort queue" aria-haspopup="true" aria-expanded="false"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h12"></path><path d="M3 12h8"></path><path d="M3 18h5"></path><path d="M17 9l3-3 3 3"></path><path d="M20 6v12"></path></svg><span class="queue-sort-label">Sort</span></button>
              <div class="queue-overflow-menu queue-sort-menu" role="menu">
                <button data-sort="title" onclick="sortQueueBy('title')" role="menuitem">Title</button>
                <button data-sort="artist" onclick="sortQueueBy('artist')" role="menuitem">Artist</button>
                <button data-sort="album" onclick="sortQueueBy('album')" role="menuitem">Album</button>
                <button data-sort="duration" onclick="sortQueueBy('duration')" role="menuitem">Duration</button>
              </div>
            </div>
            <div class="queue-overflow">
              <button class="queue-utility-btn queue-overflow-toggle" id="queueOverflowToggle" onclick="toggleQueueOverflow(event)" title="More queue actions" aria-label="More queue actions" aria-expanded="false"><span aria-hidden="true">•••</span></button>
              <div class="queue-overflow-menu" id="queueOverflowMenu" role="menu">
                <button id="clearQueueSearchBtn" onclick="clearQueueSearch();closeQueueOverflow()" role="menuitem">Clear search</button>
                <button onclick="playRandomTrack();closeQueueOverflow()" role="menuitem">Random track</button>
                <button id="favoriteNowBtn" onclick="toggleFavoriteCurrentTrack();closeQueueOverflow()" role="menuitem">Favorite current track</button>
                <button onclick="copyNowPlaying();closeQueueOverflow()" role="menuitem">Copy now playing</button>
                <button onclick="saveQueueAsPlaylist();closeQueueOverflow()" role="menuitem">Save queue as playlist</button>
                <button onclick="addCurrentTrackToPlaylist();closeQueueOverflow()" role="menuitem">Add current track to playlist</button>
                <div class="queue-overflow-divider"></div>
                <div class="queue-storage-info" id="StorageInfo"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="queue-list" id="queueList">
          <div class="empty-state"><div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div><div class="empty-title">Your queue is empty</div><div class="empty-subtitle">Import some music to get started</div></div>
        </div>
      </div>
    </div>
    <div id="searchView" style="display:none">
      <div class="search-panel">
        <h2 style="margin-bottom:24px;font-size:32px;font-weight:800">Search YouTube</h2>
        <div class="search-panel-header">
          <input class="search-panel-input" id="ytSearchInput" placeholder="Search for songs, artists, albums...">
          <button class="btn primary" onclick="searchYouTube()">Search</button>
        </div>
        <div class="search-results" id="searchResults"></div>
      </div>
    </div>
    <div id="downloadsView" style="display:none">
      <div class="search-panel">
        <h2 style="margin-bottom:24px;font-size:32px;font-weight:800">Downloads</h2>
        <div class="search-panel-header">
          <input class="search-panel-input" id="ytUrlInput" placeholder="Enter YouTube URL or ID...">
          <button class="btn primary" onclick="addDownload()">Add Download</button>
        </div>
        <div class="search-results" id="downloadList"><div class="empty-state"><div class="empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div><div class="empty-title">No downloads yet</div></div></div>
      </div>
    </div>
    <div id="statsView" style="display:none">
      <div class="search-panel">
        <h2 style="margin-bottom:24px;font-size:32px;font-weight:800">Playback Statistics</h2>
        <div class="stats-grid" id="statsGrid">
          <div class="stats-card"><h4 id="statTotalPlays">0</h4><p>Total Plays</p></div>
          <div class="stats-card"><h4 id="statTotalTime">0h</h4><p>Listening Time</p></div>
          <div class="stats-card"><h4 id="statTopTrack">-</h4><p>Top Track</p></div>
          <div class="stats-card" id="topartist"><h4 id="statTopArtist">-</h4><p>Top Artist</p></div>
        </div>
        <div class="settings-section" style="margin-top:32px;"><div class="settings-section-title">Top Tracks</div><div class="top-tracks-list" id="topTracksList"><p style="color:var(--text-muted);">No play data yet. Play some songs!</p></div></div>
        <div class="settings-section" style="margin-top:24px;"><div class="settings-section-title">Recently Played</div><div class="top-tracks-list" id="recentTracksList"><p style="color:var(--text-muted);">No history yet</p></div></div>
        <button class="btn secondary" onclick="resetStats()" style="margin-top:24px;width:100%;background:linear-gradient(135deg,#ff4444 0%,#ff6b6b 100%);border:none;color:white;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          Reset All Statistics
        </button>
      </div>
    </div>`;

  static restoreDownloadsAndSearch() {
    // main.innerHTML gets rebuilt from the static HOME_HTML template on every
    // navigation (needed because AlbumManager.show() replaces #mainContent
    // wholesale), which otherwise silently resets the downloads list back to
    // its "No downloads yet" placeholder and drops any YouTube search
    // results. Re-hydrate both from state that actually persists.
    renderDownloads();
    if (lastYouTubeSearchQuery) {
      const ytSearchInputEl = document.getElementById('ytSearchInput');
      if (ytSearchInputEl) ytSearchInputEl.value = lastYouTubeSearchQuery;
    }
    if (lastYouTubeSearchHTML) {
      const searchResultsEl = document.getElementById('searchResults');
      if (searchResultsEl) searchResultsEl.innerHTML = lastYouTubeSearchHTML;
    }
  }

  static returnToHome() {
    ViewManager.returnTo('home');
  }

  static returnTo(place) {
    currentView = place;
    const main = document.getElementById('mainContent');
    main.innerHTML = ViewManager.HOME_HTML;
    ViewManager.restoreDownloadsAndSearch();

    if (place === 'home') {
      document.getElementById('searchContainer').style.display = "";

      document.getElementById('searchInput').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        QueueManager.render(q);
      });

      const ytSearch = document.getElementById('ytSearchInput');
      const ytUrl    = document.getElementById('ytUrlInput');
      if (ytSearch) ytSearch.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchYouTube(); });
      if (ytUrl)    ytUrl.addEventListener('keydown', (e)    => { if (e.key === 'Enter') addDownload(); });

      document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.view === 'home'));
      QueueManager.render();
      return;
    }

    const views = { homeView: 'home', searchView: 'search', downloadsView: 'downloads', statsView: 'stats', albumView: 'album'};
    Object.entries(views).forEach(([id, v]) => {
      const el = document.getElementById(id);
      if (el) el.style.display = place === v ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.view === place));
    document.getElementById('searchContainer').style.display = "none";
    if (place === 'stats') renderStatsView();
    if (place === 'album') AlbumManager.show();
    if (place === 'playlists') PlaylistManager.show();
  }
}

const returnTo     = (...args) => ViewManager.returnTo(...args);
const returnToHome = () => ViewManager.returnToHome();

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

const shortcuts = {
  'Space':'Play/Pause', 'ArrowRight':'Skip +5s', 'ArrowLeft':'Back -5s',
  'ArrowUp':'Volume up', 'ArrowDown':'Volume down', 'KeyN':'Next track',
  'KeyP':'Previous track', 'KeyL':'Toggle lyrics', 'KeyS':'Shuffle',
  'KeyR':'Repeat mode', 'KeyM':'Mute', 'KeyF':'Search', 'KeyA':'Album view',
  'KeyE':'Audio effects', 'KeyI':'Track info', 'KeyJ':'Jump to playing',
  'KeyD':'Random track', 'Slash':'Shortcuts help'
};

function openShortcutsModal() {
  const modal = Utils.createModal('Keyboard Shortcuts', true);
  modal.body.innerHTML = `
    <div class="shortcuts-list">
      ${Object.entries(shortcuts).map(([key, action]) => `
        <div class="shortcut-item"><span>${action}</span><span class="shortcut-key">${key.replace('Key','').replace('Arrow','')}</span></div>`).join('')}
    </div>
    <p style="margin-top:16px;color:var(--text-muted);font-size:12px;">Press any key while not in an input field to use shortcuts.</p>`;
}

// ============================================================================
// MEMORY PROFILER
// ============================================================================

class MemoryProfiler {
  async analyze() {
    console.clear();
    console.log('%c🔍 Memory Profiler Starting...', 'color:#ff6b9d;font-size:16px;font-weight:bold;');
    if (window.gc) { window.gc(); console.log('%c✅ Garbage collection forced', 'color:#4ade80'); }
    this.showBasicInfo();
    this.analyzeDOM();
    this.analyzeEventListeners();
    this.analyzeGlobalScope();
    await this.findDetachedNodes();
    this.findLargeObjects();
    this.analyzeStorage();
    console.log('%c📊 Analysis Complete!', 'color:#ff6b9d;font-size:14px;font-weight:bold;');
    return this.getSummary();
  }

  showBasicInfo() {
    if (!performance.memory) { console.log('%c⚠️ performance.memory not available (try Chrome)', 'color:#ffaa00'); return; }
    const mem = performance.memory;
    const used = (mem.usedJSHeapSize/1048576).toFixed(2);
    const total = (mem.totalJSHeapSize/1048576).toFixed(2);
    const limit = (mem.jsHeapSizeLimit/1048576).toFixed(2);
    const pct = ((mem.usedJSHeapSize/mem.jsHeapSizeLimit)*100).toFixed(1);
    console.group('%c💾 Heap Memory Usage', 'color:#a78bfa;font-weight:bold;');
    console.log(`Used: ${used} MB`); console.log(`Total: ${total} MB`); console.log(`Limit: ${limit} MB`);
    console.log(`Usage: %c${pct}%`, pct > 80 ? 'color:#ff4444;font-weight:bold;' : 'color:#4ade80;');
    if (pct > 80) console.warn('%c⚠️ High memory usage detected!', 'color:#ff4444;font-size:12px;');
    console.groupEnd();
  }

  analyzeDOM() {
    console.group('%c🌳 DOM Analysis', 'color:#60a5fa;font-weight:bold;');
    const stats = {
      totalElements: document.getElementsByTagName('*').length,
      divs: document.getElementsByTagName('div').length,
      scripts: document.scripts.length,
      stylesheets: document.styleSheets.length,
      images: document.images.length,
      iframes: document.getElementsByTagName('iframe').length
    };
    const countNodes = (node) => { let c = 1; for (let ch of node.children) c += countNodes(ch); return c; };
    stats.totalNodes = countNodes(document.body);
    Object.entries(stats).forEach(([k,v]) => console.log(k + ':', typeof v === 'number' ? v.toLocaleString() : v));
    if (stats.totalElements > 5000) console.warn('%c⚠️ Very large DOM! Consider virtual scrolling', 'color:#ff4444');
    else if (stats.totalElements > 2000) console.warn('%c⚠️ Large DOM detected', 'color:#ffaa00');
    console.groupEnd(); return stats;
  }

  analyzeEventListeners() {
    console.group('%c📡 Event Listeners', 'color:#fbbf24;font-weight:bold;');
    let total = 0; const types = {};
    document.querySelectorAll('*').forEach(el => {
      for (const attr of el.attributes) {
        if (attr.name.startsWith('on')) { total++; types[attr.name] = (types[attr.name] || 0) + 1; }
      }
    });
    console.log('Inline handlers found:', total); console.log('Types:', types);
    console.groupEnd();
  }

  analyzeGlobalScope() {
    console.group('%c🌍 Global Scope', 'color:#4ade80;font-weight:bold;');
    console.log('Global variables:', Object.keys(window).length);
    console.groupEnd();
  }

  async findDetachedNodes() {
    console.group('%c🔍 Detached Nodes', 'color:#f472b6;font-weight:bold;');
    console.log('Use Chrome DevTools heap snapshot to find detached nodes');
    console.groupEnd();
  }

  findLargeObjects() {
    console.group('%c📦 Large Objects', 'color:#fb923c;font-weight:bold;');
    try {
      const tracksSize = JSON.stringify(tracks).length;
      console.log(`tracks array: ~${(tracksSize/1024).toFixed(1)} KB (${tracks.length} tracks)`);
      if (waveformData.size > 0) console.log(`waveformData: ${waveformData.size} entries`);
    } catch (e) {}
    console.groupEnd();
  }

  analyzeStorage() {
    console.group('%c💾 Storage Analysis', 'color:#818cf8;font-weight:bold;');
    try {
      let lsSize = 0;
      for (const key of Object.keys(localStorage)) { lsSize += localStorage.getItem(key)?.length || 0; }
      console.log(`localStorage: ~${(lsSize/1024).toFixed(1)} KB`);
    } catch (e) {}
    if (navigator.storage?.estimate) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        console.log(`IndexedDB/Cache: ${Utils.formatBytes(usage)} / ${Utils.formatBytes(quota)}`);
      });
    }
    console.groupEnd();
  }

  getSummary() {
    const summary = { timestamp: new Date().toISOString(), url: window.location.href, userAgent: navigator.userAgent };
    if (performance.memory) {
      summary.heapUsedMB  = (performance.memory.usedJSHeapSize/1048576).toFixed(2);
      summary.heapTotalMB = (performance.memory.totalJSHeapSize/1048576).toFixed(2);
      summary.heapLimitMB = (performance.memory.jsHeapSizeLimit/1048576).toFixed(2);
    }
    summary.domElements    = document.getElementsByTagName('*').length;
    summary.globalVariables = Object.keys(window).length;
    return summary;
  }

  startMonitoring(interval = 5000) {
    console.log(`%c📊 Starting memory monitoring (every ${interval}ms)`, 'color:#4ade80;font-weight:bold;');
    const history = [];
    const monitor = () => {
      if (!performance.memory) { console.log('Memory API not available'); return; }
      const mem = performance.memory;
      const data = { time: Date.now(), used: (mem.usedJSHeapSize/1048576).toFixed(2), total: (mem.totalJSHeapSize/1048576).toFixed(2) };
      history.push(data);
      if (history.length > 20) history.shift();
      if (history.length >= 5) {
        const recent = history.slice(-5);
        const growing = recent.every((v, i, a) => i === 0 || parseFloat(v.used) >= parseFloat(a[i-1].used));
        if (growing) {
          const growth = parseFloat(recent[recent.length-1].used) - parseFloat(recent[0].used);
          if (growth > 10) console.warn(`%c⚠️ Possible memory leak! Growth: ${growth.toFixed(2)} MB`, 'color:#ff4444');
        }
      }
      console.log(`Heap: ${data.used} MB / ${data.total} MB`);
    };
    const intervalId = setInterval(monitor, interval);
    return { stop: () => { clearInterval(intervalId); console.log('Monitoring stopped'); }, getHistory: () => history, intervalId };
  }
}

const MemoryP = new MemoryProfiler();
function checkMemory()           { return MemoryP.analyze(); }
function monitorMemory(secs=30)  { const m = MemoryP.startMonitoring(2000); setTimeout(() => m.stop(), secs*1000); return m; }

console.log('%c🔧 Memory Profiler Loaded', 'color:#ff6b9d;font-size:14px;font-weight:bold;');
console.log('Usage:\n  checkMemory()      - Run full analysis\n  monitorMemory(30)  - Monitor for 30 seconds');

// ============================================================================
// CHANGELOG MANAGER
// ============================================================================

class ChangelogManager {
  static formatText(text) {
    return text.replace(/\(<(.*?)>\)/g, '<span style="font-size:0.65em;color:var(--text-seccondary);font-weight:400;margin-left:0px;">$1</span>');
  }

  static show(force = true) {
    const lastSeen = localStorage.getItem('lastChangelogVersion');
    const modal    = document.getElementById('changelogModal');
    const list     = document.getElementById('changelogList');
    if (!modal || !list) return;
    if (!force && lastSeen === version) return;

    list.innerHTML = '';
    const versions = Object.keys(CHANGELOG_DATA).sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));

    versions.forEach(ver => {
      const header = document.createElement('div');
      header.style.cssText = 'margin-top:20px;margin-bottom:10px;border-bottom:1px solid var(--text-primary);padding-bottom:5px;';
      header.innerHTML = `<strong style="color:white;font-size:1.1em;">${ver}</strong>`;
      if (ver === version) header.innerHTML += ` <span style="font-size:0.7em;background:var(--accent-primary);color:white;padding:2px 6px;border-radius:10px;vertical-align:middle;margin-left:8px;">CURRENT</span>`;
      list.appendChild(header);

      const ul = document.createElement('ul');
      ul.style.cssText = 'list-style:none;padding:0;';
      CHANGELOG_DATA[ver].forEach(item => {
        const li = document.createElement('li');
        li.style.cssText = 'margin-bottom:8px;line-height:1.5;font-size:14px;display:flex;align-items:flex-start;gap:8px;';
        li.innerHTML = `<span style="color:var(--accent-primary);margin-top:2px;">•</span> <span>${ChangelogManager.formatText(item)}</span>`;
        ul.appendChild(li);
      });
      list.appendChild(ul);
    });

    modal.style.display = 'flex';
    localStorage.setItem('lastChangelogVersion', version);
  }

  static close() { document.getElementById('changelogModal').style.display = 'none'; }
}

const formatChangelogText = (...args) => ChangelogManager.formatText(...args);
const showChangelogModal  = (...args) => ChangelogManager.show(...args);
const closeChangelog      = () => ChangelogManager.close();

// ============================================================================
// LYRICS MANAGER
// ============================================================================

function initLyrics() {
  lyricsManager = new UnifiedLyricsManager();
  console.log('✅ Lyrics manager initialized');
}

class UnifiedLyricsManager {
    constructor() {
        this.apiKey = localStorage.getItem('youtifiy_lyrics_key') || '';
        this.geniusErr = null;
        this.musixErr = null;
        this.spotifyErr = null;
        this.currentLyrics = null;
        this.parsedLines = [];
        this.isOpen = false;
        this.currentLineIndex = -1;
        this.songDuration = 0;
        this.isLoading = false;
        this.cache = new Map();
        this.lastTrackTitle = null;
        this.currentSource = null;
        this.db = null;
        this.isFetching = false;
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.initDB().then(() => this.init());
    }
    async initDB() {
        return new Promise((resolve) => {
            const req = indexedDB.open('YoutifiyLyricsDB', 1);
            req.onerror = () => { console.error('❌ Lyrics DB failed to open'); resolve(null); };
            req.onsuccess = () => { this.db = req.result; console.log('✅ Lyrics DB opened'); resolve(this.db); };
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('lyrics')) {
                    const store = db.createObjectStore('lyrics', { keyPath: 'id' });
                    store.createIndex('trackId', 'trackId', { unique: false });
                    store.createIndex('dateAdded', 'dateAdded', { unique: false });
                    console.log('✅ Created lyrics store');
                }
            };
        });
    }

    
    getLyricsTrackId(track) {
      const title = String(track.title || '')
        .replace(/\s*\((?:feat\.?|ft\.?)\s+[^)]*\)/gi, '')
        .trim();
      const artist = String(track.artist || '').trim();
      return `${title}-${artist}`.replace(/[^\w\s&-]/g, '').trim();
    }

    async saveLyricsToDB(track, lyrics, source, parsedLines) {
        if (!this.db) return;
        const id = this.getLyricsTrackId(track);
        const data = { id, trackId: track.uid || id, title: track.title, artist: track.artist, lyrics, source, parsedLines, duration: this.songDuration, dateAdded: new Date().toISOString() };
        await new Promise((resolve, reject) => {
            const tx = this.db.transaction(['lyrics'], 'readwrite');
            const req = tx.objectStore('lyrics').put(data);
            req.onsuccess = () => { console.log('💾 Lyrics saved to DB:', track.title); resolve(); };
            req.onerror = () => reject(req.error);
        });
        this.pruneLyricsDB();
    }
    // Keeps the cached-lyrics store from growing without bound by dropping the
    // oldest entries once the count passes MAX_CACHED_LYRICS.
    async pruneLyricsDB(MAX_CACHED_LYRICS = 300) {
        if (!this.db) return;
        try {
            const store = this.db.transaction(['lyrics'], 'readonly').objectStore('lyrics');
            const count = await new Promise((resolve, reject) => {
                const req = store.count();
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
            if (count <= MAX_CACHED_LYRICS) return;
            const excess = count - MAX_CACHED_LYRICS;
            const idsToDelete = await new Promise((resolve, reject) => {
                const ids = [];
                const cursorReq = this.db.transaction(['lyrics'], 'readonly')
                    .objectStore('lyrics').index('dateAdded').openCursor();
                cursorReq.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor && ids.length < excess) { ids.push(cursor.primaryKey); cursor.continue(); }
                    else resolve(ids);
                };
                cursorReq.onerror = () => reject(cursorReq.error);
            });
            const delTx = this.db.transaction(['lyrics'], 'readwrite');
            idsToDelete.forEach(id => delTx.objectStore('lyrics').delete(id));
            console.log(`🧹 Pruned ${idsToDelete.length} old cached lyrics entries`);
        } catch (e) { console.error('Lyrics DB prune failed:', e); }
    }

    async getLyricsFromDB(track) {
      if (!this.db) return null;
      const oldId = `${track.title}-${track.artist}`.replace(/[^\w\s&-]/g, '').trim();
      const cleanTitle = String(track.title || '')
          .replace(/\s*\((?:feat\.?|ft\.?)\s+[^)]*\)/gi, '')
          .trim();
      const newId = `${cleanTitle}-${track.artist}`.replace(/[^\w\s&-]/g, '').trim();
      return new Promise((resolve, reject) => {
          const store = this.db.transaction(['lyrics'], 'readonly').objectStore('lyrics');
          const req = store.get(oldId);
          req.onsuccess = () => {
              if (req.result) {
                  resolve(req.result);
                  return;
              }
              if (newId !== oldId) {
                  const newReq = store.get(newId);
                  newReq.onsuccess = () => resolve(newReq.result || null);
                  newReq.onerror = () => reject(newReq.error);
              } else {
                  resolve(null);
              }
          };
          req.onerror = () => reject(req.error);
      });
    }

    async clearLyricsDB() {
        if (!this.db) return;
        return new Promise((resolve, reject) => {
            const req = this.db.transaction(['lyrics'], 'readwrite').objectStore('lyrics').clear();
            req.onsuccess = () => { console.log('🗑️ Lyrics DB cleared'); toast('Saved lyrics cleared'); resolve(); };
            req.onerror = () => reject(req.error);
        });
    }
    init() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.target.id === 'playerTitle' && m.type === 'childList') {
                    const newTitle = m.target.textContent;
                    if (newTitle && newTitle !== 'No track playing' && newTitle !== this.lastTrackTitle) {
                        this.lastTrackTitle = newTitle;
                        setTimeout(() => this.onTrackChange(), 500);
                    }
                }
            });
        });
        const playerTitle = document.getElementById('playerTitle');
        if (playerTitle) observer.observe(playerTitle, { childList: true });
        this.startLyricsSync();
        audio.addEventListener('loadedmetadata', () => {
            this.songDuration = audio.duration || 0;
            if (this.currentSource === 'genius' && this.currentLyrics) { this.parseGeniusLyrics(this.currentLyrics); this.renderLyrics(); }
        });
        audio.dataset.lyricsListenersBound = '1';
    }
    async toggle() {
        const panel = document.getElementById('lyricsPanel');
        const btn = document.getElementById('lyricsToggleBtn');
        const app = document.getElementById('app');
        if (!panel || !btn) { console.error('Lyrics panel or button not found'); return; }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            panel.classList.add('open'); btn.classList.add('active');
            document.body.classList.add('lyrics-open'); if (app) app.classList.add('lyrics-open');
            const track = queue[currentTrackIndex];
            if (track) {
                const cacheKey = `${track.title}-${track.artist}`;
                if (this.cache.has(cacheKey)) {
                    const cached = this.cache.get(cacheKey);
                    this.currentLyrics = cached.lyrics; this.currentSource = cached.source; this.parsedLines = cached.parsedLines || [];
                    this.renderLyrics(); this.updateFetchButtonVisibility(); toast('Lyrics loaded from cache');
                } else {
                    const dbData = await this.getLyricsFromDB(track);
                    if (dbData) {
                        this.currentLyrics = dbData.lyrics; this.currentSource = dbData.source; this.parsedLines = dbData.parsedLines || []; this.songDuration = dbData.duration || 0;
                        this.cache.set(cacheKey, dbData); this.renderLyrics(); this.updateFetchButtonVisibility(); toast('Lyrics loaded from storage');
                    } else { await this.fetchLyrics(track); }
                }
            } else { this.showEmpty(); }
        } else {
            panel.classList.remove('open'); btn.classList.remove('active');
            document.body.classList.remove('lyrics-open'); if (app) app.classList.remove('lyrics-open');
        }
    }
    async onTrackChange() {
        if (this.isFetching) return;
        const track = queue[currentTrackIndex];
        if (!track) { this.showEmpty(); return; }
        this.currentLyrics = null; this.parsedLines = []; this.currentLineIndex = -1; this.currentSource = null;
        this.updateFetchButtonVisibility();
        const cacheKey = `${track.title}-${track.artist}`;
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            this.currentLyrics = cached.lyrics; this.currentSource = cached.source; this.parsedLines = cached.parsedLines || [];
            this.updateFetchButtonVisibility();
            if (this.isOpen) this.renderLyrics(); return;
        }
        const dbData = await this.getLyricsFromDB(track);
        if (dbData) {
            this.currentLyrics = dbData.lyrics; this.currentSource = dbData.source; this.parsedLines = dbData.parsedLines || []; this.songDuration = dbData.duration || 0;
            this.cache.set(cacheKey, dbData); this.updateFetchButtonVisibility();
            if (this.isOpen) this.renderLyrics(); return;
        }
        if (this.isOpen) {
            this.showEmpty();
        }
    }
    async fetchLyrics(track) {
        if (this.isFetching) return;
        this.isFetching = true;
        try {
            if (!this.apiKey) { this.showError('No API Key', 'Please set your RapidAPI key in settings'); return; }
            this.isLoading = true;
            this.showLoading('Searching Musix for synced lyrics...');
            try {
                const musixResult = await this.tryMusix(track);
                if (musixResult) { console.log('✅ Using Musix lyrics'); this.currentSource = 'musix'; this.currentLyrics = musixResult; this.parsedLines = musixResult; await this.cacheAndRender(musixResult, 'musix', track); return; }
                this.showLoading('Musix not found, trying Spotify...');
                const spotifyResult = await this.trySpotify(track);
                if (spotifyResult) { console.log('✅ Using Spotify synced lyrics'); this.currentSource = 'spotify'; await this.cacheAndRender(spotifyResult, 'spotify', track); return; }
                this.showLoading('Musix not found, trying Genius...');
                const geniusResult = await this.tryGenius(track);
                if (geniusResult) { console.log('✅ Using Genius lyrics'); this.currentSource = 'genius'; this.currentLyrics = geniusResult; this.parseGeniusLyrics(geniusResult); await this.cacheAndRender(geniusResult, 'genius', track); return; }
                this.showNotFound('No lyrics found on Spotify, Genius, or Musix');
            } catch (error) {
                console.error('❌ Lyrics error:', error);
                if (error.message.includes('401') || error.message.includes('403')) this.showError('Invalid API Key', 'Please check your RapidAPI key');
                else if (error.message.includes('429')) this.showError('Rate Limited', 'Too many requests. Please wait');
                else this.showError('Failed to load lyrics', error.message);
            } finally { this.isLoading = false; }
        } finally { this.isFetching = false; }
    }
    async trySpotify(track) {
        try {
            this.spotifyErr = null;
            const q = `${track.title.replace(/\(.*?\)/g, '')} ${track.artist.split(', ')[0]}`;
            const searchData = await this.makeApiRequest(`https://spotify-scraper.p.rapidapi.com/v1/search?term=${encodeURIComponent(q)}&type=track`, 'spotify-scraper.p.rapidapi.com');
            if (!searchData?.tracks?.items?.length) return null;
            const bestMatch = this.findBestSpotifyMatch(searchData.tracks.items, track);
            if (!bestMatch) return null;
            const lyricsData = await this.makeApiRequest(`https://spotify-scraper.p.rapidapi.com/v1/track/lyrics?trackId=${bestMatch.id}&format=json`, 'spotify-scraper.p.rapidapi.com');
            if (!Array.isArray(lyricsData) || !lyricsData.length) return null;
            const valid = lyricsData.filter(l => l && typeof l.text === 'string' && typeof l.startMs === 'number');
            return valid.length > 0 ? valid : null;
        } catch (error) { console.log('❌ Spotify error:', error.message); this.spotifyErr = error.message; return null; }
    }
    async tryMusix(track) {
        try {
            this.musixErr = null;
            const t = track.title.replace(/\(.*?\)/g, '').trim();
            const a = track.artist.split(', ')[0].trim();
            const lyrics = await this.makeApiRequest(
                `https://spotify-web-api3.p.rapidapi.com/v1/social/spotify/musixmatchsearchlyrics?terms=${encodeURIComponent(t)}&artist=${encodeURIComponent(a)}`,
                'spotify-web-api3.p.rapidapi.com'
            );
            const lyricsData = lyrics?.data;
            if (!Array.isArray(lyricsData) || !lyricsData.length) return null;
            const valid = lyricsData
                .map(line => {
                    if (typeof line !== 'string') return null;
                    const match = line.match(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/);
                    if (!match) return null;
                    const minutes = Number(match[1]);
                    const seconds = Number(match[2]);
                    return {
                        text: match[3].trim(),
                        startMs: Math.round((minutes * 60 + seconds) * 1000)
                    };
                })
                .filter(l => l && l.text);
            return valid.length > 0 ? valid : null;
        } catch (error) {
            console.log('❌ Musix error:', error.message);
            this.musixErr = error.message;
            return null;
        }
    }
    async tryGenius(track) {
        try {
            this.geniusErr = null;
            const title = track.title
                .replace(/\(.*?\)/g, '')
                .replace(/\[.*?\]/g, '')
                .trim();
            const artist = track.artist
                .split(',')[0]
                .trim();
            const q = `${title} ${artist}`;
            console.log(`Searching Genius for: ${q}`);
            const searchData = await this.makeApiRequest(
                `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(q)}&per_page=10&page=1`,
                'genius-song-lyrics1.p.rapidapi.com'
            );
            if (!searchData || !Array.isArray(searchData.hits)) {
                console.log('Genius search returned no hits:', searchData);
                return null;
            }
            const bestMatch = this.findBestGeniusMatch(searchData.hits, track);
            if (!bestMatch?.result) {
                console.log('No suitable Genius match');
                return null;
            }
            const result = bestMatch.result;
            console.log('Genius match:', {
                id: result.id,
                title: result.title,
                artist: result.primary_artist?.name,
                url: result.url,
                path: result.path
            });
            let lyrics = null;
            try {
                const lyricsUrl =
                    `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${result.id}&text_format=plain`;
                const lyricsData = await this.makeApiRequest(
                    lyricsUrl,
                    'genius-song-lyrics1.p.rapidapi.com'
                );
                console.log('Genius lyrics response:', lyricsData);
                lyrics = this.extractGeniusLyrics(lyricsData);
            } catch (e) {
                console.log(
                    'Genius lyrics endpoint failed:',
                    e.message
                );
            }
            if (!lyrics) {
                const geniusUrl =
                    result.url ||
                    (result.path
                        ? `https://genius.com${result.path}`
                        : null);
                if (geniusUrl) {
                    console.log('Trying Genius page:', geniusUrl);
                    lyrics = await this.scrapeGeniusLyrics(geniusUrl);
                }
            }
            if (
                !lyrics ||
                typeof lyrics !== 'string' ||
                !lyrics.trim()
            ) {
                console.log('No lyrics found');
                return null;
            }
            return this.cleanLyrics(lyrics);
        } catch (error) {
            console.log('❌ Genius error:', error);
            this.geniusErr = error.message;
            return null;
        }
    }
    async makeApiRequest(url, host) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': host,
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            let body = '';
            try {
                body = await response.text();
            } catch { }
            throw new Error(
                `HTTP ${response.status}: ${response.statusText}` +
                `${body ? ` - ${body}` : ''}`
            );
        }
        return await response.json();
    }
    findBestSpotifyMatch(items, track) {
        const tt = track.title.toLowerCase().trim();
        const ta = track.artist.toLowerCase().trim();
        const scored = items.map(item => {
            const title = (item.name || '')
                .toLowerCase()
                .trim();
            const artists =
                item.artists
                    ?.map(a => a.name.toLowerCase())
                    .join(' ') || '';
            let score = 0;
            if (title === tt) {
                score += 10;
            } else if (title.includes(tt)) {
                score += 5;
            } else if (tt.includes(title)) {
                score += 3;
            }
            if (artists.includes(ta)) {
                score += 5;
            }
            if (
                title.includes('remix') &&
                !tt.includes('remix')
            ) {
                score -= 3;
            }
            if (
                title.includes('live') &&
                !tt.includes('live')
            ) {
                score -= 2;
            }
            return {
                item,
                score
            };
        });
        scored.sort((a, b) => b.score - a.score);
        return scored[0]?.score >= 3
            ? scored[0].item
            : null;
    }
    findBestGeniusMatch(hits, track) {
        if (!Array.isArray(hits) || !hits.length) {
            return null;
        }
        const normalize = value => {
            return String(value || '')
                .toLowerCase()
                .replace(/\([^)]*\)/g, '')
                .replace(/\[[^\]]*\]/g, '')
                .replace(/[^\w\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };
        const tt = normalize(track.title);
        const trackArtists = String(track.artist || '')
            .split(/[,;]+/)
            .map(a => normalize(a))
            .filter(Boolean);
        const scored = hits
            .filter(hit => hit?.result)
            .map(hit => {
                const result = hit.result;
                const title = normalize(result.title);
                const artist = normalize(
                    result.primary_artist?.name
                );
                let score = 0;
                if (title === tt) {
                    score += 15;
                } else if (
                    title.includes(tt) ||
                    tt.includes(title)
                ) {
                    score += 7;
                }
                if (trackArtists.includes(artist)) {
                    score += 15;
                } else if (
                    trackArtists.some(a =>
                        artist === a ||
                        artist.includes(a) ||
                        a.includes(artist)
                    )
                ) {
                    score += 8;
                }
                const originalTitle = normalize(track.title);
                if (
                    title.includes('remix') &&
                    !originalTitle.includes('remix')
                ) {
                    score -= 5;
                }
                if (
                    title.includes('live') &&
                    !originalTitle.includes('live')
                ) {
                    score -= 5;
                }
                if (
                    title.includes('instrumental') &&
                    !originalTitle.includes('instrumental')
                ) {
                    score -= 5;
                }
                return {
                    hit,
                    score
                };
            });
        scored.sort((a, b) => b.score - a.score);
        console.log(
            'Genius matches:',
            scored.map(x => ({
                title: x.hit.result.title,
                artist: x.hit.result.primary_artist?.name,
                score: x.score
            }))
        );
        return scored[0]?.score >= 10
            ? scored[0].hit
            : null;
    }
    extractGeniusLyrics(data) {
        if (!data) {
            return null;
        }
        if (typeof data === 'string') {
            return data.trim() || null;
        }
        if (Array.isArray(data)) {
            for (const item of data) {
                const result = this.extractGeniusLyrics(item);
                if (result) {
                    return result;
                }
            }
            return null;
        }
        if (typeof data !== 'object') {
            return null;
        }
        for (const key of [
            'plain',
            'text',
            'lyrics',
            'lyrics_text',
            'content'
        ]) {
            if (
                typeof data[key] === 'string' &&
                data[key].trim()
            ) {
                return data[key].trim();
            }
        }
        for (const [key, value] of Object.entries(data)) {
            if (
                key === 'html' &&
                typeof value === 'string'
            ) {
                return this.stripHtml(value).trim();
            }
            if (
                value &&
                typeof value === 'object'
            ) {
                const result =
                    this.extractGeniusLyrics(value);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }
    async scrapeGeniusLyrics(url) {
        const proxies = [
            `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
            `https://corsproxy.io/?${encodeURIComponent(url)}`
        ];
        for (const proxyUrl of proxies) {
            try {
                const ctrl = new AbortController();
                const tid = setTimeout(() => {
                    ctrl.abort();
                }, 10000);
                const response = await fetch(proxyUrl, {
                    signal: ctrl.signal
                });
                clearTimeout(tid);
                if (!response.ok) {
                    continue;
                }
                let html;
                if (proxyUrl.includes('allorigins')) {
                    const json = await response.json();
                    html = json.contents;
                } else {
                    html = await response.text();
                }
                if (!html) {
                    continue;
                }
                const doc =
                    new DOMParser().parseFromString(
                        html,
                        'text/html'
                    );
                const selectors = [
                    '[data-lyrics-container="true"]',
                    '[class^="Lyrics__Container"]',
                    '[class*="Lyrics__Container"]',
                    '.lyrics',
                    '.song_body-lyrics'
                ];
                for (const selector of selectors) {
                    const elements =
                        doc.querySelectorAll(selector);
                    if (!elements.length) {
                        continue;
                    }
                    const lyrics = Array.from(elements)
                        .map(el => {
                            const clone =
                                el.cloneNode(true);
                            clone
                                .querySelectorAll('br')
                                .forEach(br => {
                                    br.replaceWith('\n');
                                });
                            return clone.textContent || '';
                        })
                        .join('\n\n')
                        .replace(/\n{3,}/g, '\n\n')
                        .trim();
                    if (lyrics) {
                        return lyrics;
                    }
                }
            } catch (error) {
                console.log(
                    'Genius scrape proxy failed:',
                    error.message
                );
            }
        }
        return null;
    }
    stripHtml(html) {
        const processed = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>\s*<p[^>]*>/gi, '\n\n').replace(/<\/div>\s*<div[^>]*>/gi, '\n').replace(/<\/h[1-6]>/gi, '\n\n');
        const tmp = document.createElement('DIV'); tmp.innerHTML = processed; return tmp.textContent || '';
    }
    cleanLyrics(lyrics) {
        if (typeof lyrics !== 'string') return '';
        lyrics = lyrics.replace(/\[[^\]]*\]/g, '');
        return lyrics.replace(/^\d+\s+Contributors?.*$/gim, '').replace(/^Lyrics\s*$/gim, '').replace(/(\[.*?\])/g, '\n$1\n').replace(/\n{3,}/g, '\n\n').replace(/Embed\s*$/gi, '').trim();
    }
    parseGeniusLyrics(lyrics) {
        lyrics = lyrics.replace(/\[[^\]]*\]/g, '');
        const lines = lyrics.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (!lines.length) { this.parsedLines = []; return; }
        const avg = this.songDuration > 0 ? (this.songDuration * 0.9) / lines.length : 3;
        this.parsedLines = lines.map((text, i) => {
            const wc = text.split(/\s+/).length;
            const dur = Math.max(0.8, Math.min(1.5, wc / 5));
            return { text, startMs: ((i * avg) + (this.songDuration * 0.05)) * 1000, durMs: avg * dur * 1000, index: i };
        });
    }
    async cacheAndRender(lyrics, source, track) {
        const cacheKey = `${track.title}-${track.artist.split(', ')[0]}`;
        const lines = (source === 'spotify' || source === 'musix') ? lyrics : this.parsedLines;
        const data = { lyrics, source, parsedLines: lines };
        this.cache.set(cacheKey, data);
        await this.saveLyricsToDB(track, lyrics, source, lines);
        if (source === 'spotify' || source === 'musix') this.parsedLines = lyrics;
        this.renderLyrics();
        toast(`Lyrics saved (${source})`);
    }
    renderLyrics() {
        const container = document.getElementById('lyricsContent');
        if (!container) return;
        if (!this.parsedLines?.length) { this.showNotFound('No lyrics available'); return; }
        const badge = this.currentSource === 'spotify' ? '<span style="color:var(--accent);font-size:11px;">⚡ Synced</span>' : '<span style="color:var(--text-muted);font-size:11px;"></span>';
        container.innerHTML = `
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border);">
<span style="font-size:12px;color:var(--text-muted);">Source: ${this.currentSource === 'spotify' ? 'Spotify' : this.currentSource === 'musix' ? 'Musix' : "Genius"}</span>${badge}
</div>
${this.parsedLines.map((line, idx) => `<div class="lyrics-line" data-index="${idx}" onclick="lyricsManager.seekToLine(${idx})"><span class="moveitalittle">${this.escapeHtml(line.text)}</span></div>`).join('')}`;
        this.currentLineIndex = -1;
        this.handleTimeUpdate();
        this.updateFetchButtonVisibility();
    }

  startLyricsSync() {
      if (this.lyricsSyncRunning) return;
      this.lyricsSyncRunning = true;
      const loop = () => {
        if (!this.lyricsSyncRunning) return;
        this.handleTimeUpdate();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
  }

  stopLyricsSync() {
    this.lyricsSyncRunning = false;
    if (this.lyricsSyncInterval) {
        clearInterval(this.lyricsSyncInterval);
        this.lyricsSyncInterval = null;
    }
  }

    handleTimeUpdate() {
        if (!this.isOpen || !this.parsedLines?.length) return;
        const ms = audio.currentTime * 1000;
        let newIndex = -1;
        for (let i = 0; i < this.parsedLines.length; i++) {
            const { startMs, durMs } = this.parsedLines[i];
            if (ms >= startMs && ms < startMs + (durMs || 3000)) {
                newIndex = i;
                break;
            }
        }
        if (newIndex === -1) {
            for (let i = this.parsedLines.length - 1; i >= 0; i--) {
                if (ms >= this.parsedLines[i].startMs) {
                    newIndex = i;
                    break;
                }
            }
        }
        if (newIndex !== -1 && newIndex !== this.currentLineIndex) {
            this.highlightLine(newIndex);
        }
    }

    highlightLine(index) {
        if (this.currentSource !== 'spotify' && this.currentSource !== 'musix') return;
        const allLines = document.querySelectorAll('.lyrics-line');
        allLines.forEach(el => {
            const lineIndex = Number(el.dataset.index);
            el.classList.remove('active', 'passed');
            if (Number.isFinite(lineIndex) && lineIndex < index) {
                el.classList.add('passed');
            }
        });
        // Explicitly handle every lyrics scrolling container.
        const containers = [
            document.getElementById('lyricsContent'),
            document.getElementById('fullLyricsContent'),
            document.getElementById('playerEmbedLyricsContent')
        ].filter(Boolean);
        containers.forEach(container => {
            const line = container.querySelector(
                `.lyrics-line[data-index="${index}"]`
            );
            if (!line) return;
            line.classList.add('active');
            // Calculate the line's position relative to THIS container.
            const containerRect = container.getBoundingClientRect();
            const lineRect = line.getBoundingClientRect();
            const target =
                container.scrollTop +
                (lineRect.top - containerRect.top) -
                (container.clientHeight / 2) +
                (lineRect.height / 2);
            container.scrollTo({
                top: Math.max(0, target),
                behavior: 'smooth'
            });
        });
        this.currentLineIndex = index;
    }
    seekToLine(index) {
        if (!this.parsedLines[index]) return;
        audio.currentTime = this.parsedLines[index].startMs / 1000;
        this.highlightLine(index);
    }
    updateFetchButtonVisibility() {
        // Hide the manual "Fetch" button once we actually have lyrics loaded for
        // the current track (from cache, IndexedDB, or a completed API fetch);
        // show it whenever there's nothing to display yet so the user can
        // trigger a lookup.
        const hasLyrics = !!(this.parsedLines && this.parsedLines.length);
        document.querySelectorAll('.lyrics-fetch-btn').forEach(btn => {
            btn.style.display = hasLyrics ? 'none' : '';
        });
    }
    showLoading(msg = 'Loading lyrics...') {
        const c = document.getElementById('lyricsContent');
        if (c) c.innerHTML = `<div class="lyrics-loading"><div class="lyrics-spinner"></div><div>${msg}</div></div>`;
        // Hide the fetch button while a request is already in flight so it
        // can't be clicked again mid-fetch.
        document.querySelectorAll('.lyrics-fetch-btn').forEach(btn => { btn.style.display = 'none'; });
    }
    showEmpty() {
        const c = document.getElementById('lyricsContent');
        if (c) c.innerHTML = `<div class="lyrics-empty"><div class="lyrics-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div><div>Press the "Fetch" button to get lyrics</div><div style="font-size:12px;margin-top:8px;opacity:0.7;"></div></div>`;
        this.updateFetchButtonVisibility();
    }
    showNotFound(msg = 'No lyrics found') {
        const c = document.getElementById('lyricsContent');
        if (!c) return;
        const limited = this.spotifyErr?.includes('429') && this.geniusErr?.includes('429');
        c.innerHTML = limited
            ? `<div class="lyrics-not-found"><div class="lyrics-empty-icon" style="color:#FF0000;">⚠</div><div>Rate Limited!</div><div style="font-size:12px;margin-top:8px;opacity:0.7;">You're being rate limited or you're out of requests for the month.</div></div>`
            : `<div class="lyrics-not-found"><div class="lyrics-empty-icon">😕</div><div>${msg}</div><div style="font-size:12px;margin-top:8px;opacity:0.7;">Tried both Spotify and Genius</div></div>`;
        this.updateFetchButtonVisibility();
    }
    showError(title, msg) {
        const c = document.getElementById('lyricsContent');
        if (c) c.innerHTML = `<div class="lyrics-error"><div class="lyrics-empty-icon">⚠️</div><div style="font-weight:600;margin-bottom:8px;">${title}</div><div style="font-size:13px;margin-bottom:16px;">${msg}</div><button class="btn secondary" onclick="lyricsManager.retry()" style="font-size:12px;">🔄 Retry</button></div>`;
        this.updateFetchButtonVisibility();
    }
    retry() { const t = queue[currentTrackIndex]; if (t) this.fetchLyrics(t); }
    escapeHtml(text) { return Utils.escapeHtml(typeof text === 'string' ? text : ''); }
    setApiKey(key) { this.apiKey = key; localStorage.setItem('youtifiy_lyrics_key', key); notifyKeysChanged(); }
    getApiKey() { return this.apiKey; }
    clearCache() { this.cache.clear(); toast('Memory cache cleared'); }
}

// ============================================================================
// LYRICS SETTINGS UI
// ============================================================================

function addLyricsSettings() {
  const section = document.getElementById('trackManagementSection');
  if (!section) return;
  document.getElementById('lyricsSettingsSection')?.remove();
  const settings = document.createElement('div');
  settings.id = 'lyricsSettingsSection';
  settings.className = 'settings-section';
  settings.innerHTML = `
    <div class="settings-section-title">Lyrics (Spotify + Genius)</div>
    <div class="form-group">
      <label class="form-label">RapidAPI Key</label>
      <input type="text" class="form-input" id="lyricsApiKey" placeholder="Enter your RapidAPI key..." value="${lyricsManager ? lyricsManager.getApiKey() : ''}">
      <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn secondary" onclick="saveLyricsKey()">Save Key</button>
        <button class="btn secondary" onclick="testLyricsKey()">Test</button>
        <button class="btn secondary" onclick="if(lyricsManager)lyricsManager.clearCache()">Clear Memory Cache</button>
        <button class="btn secondary" onclick="if(lyricsManager)lyricsManager.clearLyricsDB()">Clear Saved Lyrics</button>
      </div>
    </div>
    <div style="margin-top:12px;"><button class="btn secondary" onclick="if(lyricsManager)lyricsManager.toggle()" style="width:100%">${lyricsManager?.isOpen ? 'Close' : 'Open'} Lyrics Panel (L)</button></div>`;
  section.parentNode.insertBefore(settings, section);
}

function saveLyricsKey() {
  const key = document.getElementById('lyricsApiKey').value.trim();
  if (!key) { toast('Please enter an API key'); return; }
  if (lyricsManager) { lyricsManager.setApiKey(key); toast('API key saved for both Spotify and Genius'); }
}

async function testLyricsKey() {
  if (!lyricsManager) return;
  const key = document.getElementById('lyricsApiKey').value.trim();
  if (!key) { toast('Please enter an API key first'); return; }
  lyricsManager.setApiKey(key);
  toast('Testing both APIs...');
  const results = [];
  try {
    const r = await lyricsManager.makeApiRequest('https://spotify-scraper.p.rapidapi.com/v1/search?term=Bohemian%20Rhapsody%20Queen&type=track','spotify-scraper.p.rapidapi.com');
    if (r?.tracks?.items?.length > 0) {
      results.push('✅ Spotify Search');
      const lyr = await lyricsManager.makeApiRequest(`https://spotify-scraper.p.rapidapi.com/v1/track/lyrics?trackId=${r.tracks.items[0].id}&format=json`,'spotify-scraper.p.rapidapi.com');
      results.push(Array.isArray(lyr) && lyr.length > 0 ? '✅ Spotify Lyrics' : '⚠️ Spotify Lyrics empty');
    } else { results.push('⚠️ Spotify Search empty'); }
  } catch (e) { results.push('❌ Spotify: ' + e.message); }
    try { 
    const r = await lyricsManager.makeApiRequest('https://spotify-web-api3.p.rapidapi.com/v1/social/spotify/musixmatchsearchlyrics?terms=Bohemian%20Rhapsody&artist=Queen','spotify-web-api3.p.rapidapi.com');
    results.push(r?.hits?.length > 0 ? '✅ Musix Search' : '⚠️ Musix Search empty');
  } catch (e) { results.push('❌ Genius: ' + e.message); }
  try {
    const r = await lyricsManager.makeApiRequest('https://genius-song-lyrics1.p.rapidapi.com/search/?q=Bohemian%20Rhapsody%20Queen&per_page=1','genius-song-lyrics1.p.rapidapi.com');
    results.push(r?.hits?.length > 0 ? '✅ Genius Search' : '⚠️ Genius Search empty');
  } catch (e) { results.push('❌ Genius: ' + e.message); }
  toast(results.join(' | '));
}

function toggleLyrics() {
  const panel = document.getElementById('lyricsPanel');
  const btn   = document.getElementById('lyricsToggleBtn');
  const isOpen = panel.classList.contains('open');
  if (isOpen) { panel.classList.remove('open'); btn.classList.remove('active'); document.body.classList.remove('lyrics-open'); }
  else { panel.classList.add('open'); btn.classList.add('active'); document.body.classList.add('lyrics-open'); if (!audioContext) AudioEngine.init(); }
  lyricsManager.toggle();
}

// ============================================================================
// FOLDER PICKER INTEGRATION
// ============================================================================

(async function () {
  'use strict';

  // Minimal key-value store just for persisting the folder handle (no audio data stored)
  let _kvDb = null;
  async function kvOpen() {
    if (_kvDb) return _kvDb;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('YoutifiyFolderHandle', 1);
      req.onupgradeneeded = e => e.target.result.createObjectStore('kv');
      req.onsuccess = e => { _kvDb = e.target.result; resolve(_kvDb); };
      req.onerror = () => reject(req.error);
    });
  }
  async function kvGet(key) {
    const db = await kvOpen();
    return new Promise(resolve => {
      const req = db.transaction('kv', 'readonly').objectStore('kv').get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  }
  async function kvSet(key, val) {
    const db = await kvOpen();
    return new Promise((resolve, reject) => {
      const req = db.transaction('kv', 'readwrite').objectStore('kv').put(val, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // Scan a directory handle and add audio files as tracks
  async function loadTracksFromHandle(dirHandle) {
    let count = 0;
    for await (const entry of dirHandle.values()) {
      if (entry.kind !== 'file') continue;
      let file;
      try { file = await entry.getFile(); } catch { continue; }
      if (!file.type.startsWith('audio/')) continue;
      // Skip if already in tracks (by filename + size)
      if (tracks.find(t => t._fileName === file.name && t.fileSize === file.size)) continue;
      try {
        const track = await TrackManager.processAudioFile(file);
        track.type = 'folder';
        track.fileHandle = entry;   // FileSystemFileHandle — used to getFile() on playback
        track._fileName = file.name;
        tracks.push(track);
        count++;
      } catch (e) { console.error('Error processing:', file.name, e); }
    }
    if (count > 0) {
      QueueManager.rebuild();
      toast(`Loaded ${count} track(s) from folder`);
    }
    return count;
  }

  // Called by the "Open Folder" button in the UI
  window.openFolderPicker = async function () {
    try {
      // Try to re-use the previously saved handle first (requires a user gesture,
      // which the button click satisfies). This avoids forcing the user to navigate
      // to their folder again after every page reload.
      const savedHandle = await kvGet('folderHandle');
      if (savedHandle) {
        const perm = await savedHandle.requestPermission({ mode: 'read' });
        if (perm === 'granted') {
          tracks = tracks.filter(t => t.type !== 'folder');
          await loadTracksFromHandle(savedHandle);
          return;
        }
        // User denied or dismissed — fall through to pick a new folder
      }
      // No saved handle, or permission denied: open the directory picker
      const handle = await window.showDirectoryPicker({ mode: 'read' });
      await kvSet('folderHandle', handle);
      tracks = tracks.filter(t => t.type !== 'folder');
      await loadTracksFromHandle(handle);
    } catch (err) {
      if (err.name !== 'AbortError') { console.error('Folder picker error:', err); toast('Could not open folder'); }
    }
  };

  async function refreshTracksList() {
    const listContainer  = document.getElementById('savedTracksList');
    const statsContainer = document.getElementById('savedTracksStats');
    if (!listContainer) return;

    const folderTracks = tracks.filter(t => t.type === 'folder' || t.type === 'import');
    const totalSize = folderTracks.reduce((s, t) => s + (t.fileSize || 0), 0);

    if (folderTracks.length === 0) {
      listContainer.innerHTML = `<div class="empty-state" style="padding:24px;text-align:center;color:var(--text-muted);min-height:180px;"><div class="empty-icon"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></div><div>No tracks loaded yet - open a folder to get started</div></div>`;
      if (statsContainer) statsContainer.innerHTML = '<p>0 tracks • 0 MB</p>';
      return;
    }

    listContainer.innerHTML = folderTracks.map(track => `
      <div class="saved-track-item" style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:6px;margin-bottom:4px;background:var(--bg-secondary);"
           onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='var(--bg-secondary)'">
        <img src="${track.albumArt || ''}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;background:var(--bg-tertiary);" onerror="this.style.display='none'">
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Utils.escapeHtml(track.title || 'Unknown')}</div>
          <div style="font-size:11px;color:var(--text-muted);">${Utils.escapeHtml(track.artist || 'Unknown Artist')} • ${Utils.formatFileSize(track.fileSize)}</div>
        </div>
        <button onclick="event.stopPropagation();window.deleteTrackFromSettings(null,'${track.uid}','${Utils.escapeHtml(track.title || 'Unknown').replace(/'/g,"\\'")}'))"
                style="padding:8px 12px;background:transparent;border:1px solid var(--border);color:var(--text-secondary);border-radius:6px;cursor:pointer;transition:all 0.2s;flex-shrink:0;font-size:12px;"
                onmouseover="this.style.background='#ff4444';this.style.borderColor='#ff4444';this.style.color='white';"
                onmouseout="this.style.background='transparent';this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)';">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>`).join('');
    if (statsContainer) statsContainer.innerHTML = `<p>${folderTracks.length} tracks • ${Utils.formatFileSize(totalSize)}</p>`;
  }

  window.deleteTrackFromSettings = async function (_trackId, trackUid, trackTitle) {
    if (!confirm(`Remove "${trackTitle}" from the queue?`)) return;
    const i = tracks.findIndex(t => t.uid === trackUid);
    if (i !== -1) { tracks.splice(i, 1); QueueManager.rebuild(); }
    await refreshTracksList();
    toast(`Removed: ${trackTitle}`);
  };

  async function initialize() {
    console.log('Initializing folder picker integration...');
    // Expose a compatible manager surface so the rest of the app stays happy
    window.indexedDBManager = {
      db: () => null,
      getAllTracks: async () => tracks.filter(t => t.type === 'folder' || t.type === 'import'),
      clearAll: async () => {
        if (confirm('Remove all loaded tracks?')) {
          tracks = tracks.filter(t => t.type !== 'folder' && t.type !== 'import');
          QueueManager.rebuild();
          refreshTracksList();
        }
      },
      refresh: refreshTracksList,
      saveTrackToDB: async () => null,  // no-op — we don't store audio in IDB
      streamingManager
    };

    // Try to restore the previously picked folder
    try {
      const savedHandle = await kvGet('folderHandle');
      if (!savedHandle) { console.log('No saved folder handle'); return; }
      const perm = await savedHandle.queryPermission({ mode: 'read' });
      if (perm === 'granted') {
        const queueList = document.getElementById('queueList');
        if (queueList) queueList.innerHTML = `<div class="empty-state"><div class="empty-title"><div class="lyrics-spinner"></div></div><div class="empty-title">Loading...</div></div>`;
        await loadTracksFromHandle(savedHandle);
      } else {
        console.log('📂 Folder handle exists but needs re-grant — user must open folder again');
        toast('⚠ Pick your music folder again to reload songs ⚠');
        try {
        setTimeout(openFolderPicker(), 5000);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) { console.error('Failed to restore folder:', error); }

    console.log('✅ Folder picker integration ready');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(initialize, 750));
  else setTimeout(initialize, 750);
})();

// ============================================================================
// FILE IMPORT
// ============================================================================

document.getElementById('fileInput').addEventListener('change', async (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  toast(`Importing ${files.length} file(s)...`);
  for (const file of files) {
    try {
      const track = await TrackManager.processAudioFile(file);
      tracks.push(track);
      if (window.indexedDBManager?.db()) {
        try {
          const idbId = await window.indexedDBManager.saveTrackToDB(track, file);
          track.idbId = idbId; track.type = 'local'; track.fileSize = file.size;
        } catch (e) { console.error('Failed to save to IndexedDB:', e); }
      }
    } catch (error) { console.error('Error processing file:', error); }
  }
  QueueManager.rebuild();
  toast(`Added ${files.length} track(s)`);
  event.target.value = '';
});

document.getElementById('folderInput').addEventListener('change', async (event) => {
  const files = Array.from(event.target.files).filter(f => f.type.startsWith('audio/'));
  if (!files.length) return;
  toast(`Importing ${files.length} file(s) from folder...`);
  for (const file of files) {
    try {
      const track = await TrackManager.processAudioFile(file);
      // Store the File reference so prepareTrackForPlayback can create a
      // blob URL on demand. Without this, the track has src=null and no idbId,
      // which causes "NotSupportedError: Failed to load because no supported
      // source was found" when the audio element tries to play.
      track.file = file;
      track.type = 'import';
      tracks.push(track);
    } catch (error) { console.error('Error processing file:', error); }
  }
  QueueManager.rebuild();
  toast(`Added ${files.length} track(s)`);
  event.target.value = '';
});

// ============================================================================
// EVENT LISTENERS
// ============================================================================
audio.onplay = function() {isPlaying1 = true; PlayerController.updatePlayPauseBtn();};
audio.onpause = function() {isPlaying1 = false; PlayerController.updatePlayPauseBtn();};
audio2.onplay = function() {isPlaying2 = true; PlayerController.updatePlayPauseBtn();};
audio2.onpause = function() {isPlaying2 = false; PlayerController.updatePlayPauseBtn();};
audio.addEventListener('timeupdate', () => PlayerController.updateProgressBar());
audio.addEventListener('ended', (e) => {
  // Ignore the old physical audio element finishing after a crossfade swap.
  // Its ended event must not advance the queue a second time.
  if (e.currentTarget === audio && !isCrossfading) {
    PlayerController.next(0, false);
  }
});
audio.addEventListener('loadedmetadata', () => {
  const d = document.getElementById('duration');
  if (d) d.textContent = Utils.formatTime(audio.duration);
});
audio.dataset.coreListenersBound = '1';

navigator.mediaSession.setActionHandler('nexttrack',     () => PlayerController.next(0, false));
navigator.mediaSession.setActionHandler('previoustrack', () => PlayerController.previous());

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  switch (e.code) {
    case 'Space':       e.preventDefault(); PlayerController.toggle(); break;
    case 'ArrowRight':  e.preventDefault(); audio.currentTime += 5; break;
    case 'ArrowLeft':   e.preventDefault(); audio.currentTime -= 5; break;
    case 'ArrowUp':     e.preventDefault(); currentVolume = Math.min(1, currentVolume + 0.1); audio.volume = audio2.volume = currentVolume; PlayerController.updateVolumeUI(); break;
    case 'ArrowDown':   e.preventDefault(); currentVolume = Math.max(0, currentVolume - 0.1); audio.volume = audio2.volume = currentVolume; PlayerController.updateVolumeUI(); break;
    case 'KeyN':        e.preventDefault(); PlayerController.next(0, false); break;
    case 'KeyP':        e.preventDefault(); PlayerController.previous(); break;
    case 'KeyL':        e.preventDefault(); handleLyricsButtonClick(); break;
    case 'KeyS':        e.preventDefault(); PlayerController.toggleShuffle(); break;
    case 'KeyR':        e.preventDefault(); PlayerController.toggleRepeat(); break;
    case 'KeyM':        e.preventDefault(); PlayerController.toggleMute(); break;
    case 'KeyF':        e.preventDefault(); document.getElementById('searchInput')?.focus(); break;
    case 'KeyA':        e.preventDefault(); AlbumManager.show(); break;
    case 'KeyE':        e.preventDefault(); handleEffectsButtonClick(); break;
    case 'KeyI':        e.preventDefault(); if (currentTrackIndex !== -1) TrackManager.openInfo(queue[currentTrackIndex].uid); break;
    case 'KeyQ':        e.preventDefault(); document.querySelector('.queue-container')?.scrollIntoView({ behavior: 'smooth' }); break;
    case 'KeyJ':        e.preventDefault(); jumpToCurrentTrack(); break;
    case 'KeyD':        e.preventDefault(); playRandomTrack(); break;
  }
});

document.getElementById('settingsModal').addEventListener('click', (e) => { if (e.target.id === 'settingsModal') SettingsManager.close(); });

document.getElementById('searchInput')?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  QueueManager.render(q);
});

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    currentView = item.dataset.view;
    if (currentView !== 'none') {
      document.getElementById('homeView').style.display      = currentView === 'home'      ? 'block' : 'none';
      document.getElementById('searchView').style.display    = currentView === 'search'    ? 'block' : 'none';
      document.getElementById('downloadsView').style.display = currentView === 'downloads' ? 'block' : 'none';
    }
  });
});

// ============================================================================
// INITIALIZATION
// ============================================================================

PlayerController.updateVolumeUI();
audio.volume = audio2.volume = currentVolume;

try { const h = localStorage.getItem('youtifiy_history'); if (h) playHistory = JSON.parse(h); } catch (e) {}
loadFavoriteTracks();

const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme !== 'default') document.documentElement.setAttribute('data-theme', savedTheme);
ThemeManager.loadCustom();
ThemeManager.applyAccentInk();

const savedTitle = localStorage.getItem('youtifiy_title');
if (savedTitle) document.title = savedTitle;

window.addEventListener('load', () => {
  ChangelogManager.show(false);
  if (navigator.storage?.estimate) {
    navigator.storage.estimate().then(({ usage }) => {
      if ((usage / (1024 * 1024)) > 1) {
        const queueList = document.getElementById('queueList');
        if (queueList) queueList.innerHTML = `<div class="empty-state"><div class="empty-title"><div class="lyrics-spinner"></div></div><div class="empty-title">Loading...</div></div>`;
      }
    });
  }
  ThemeManager.loadCustom();
});

document.addEventListener('DOMContentLoaded', () => {
  const ytSearch = document.getElementById('ytSearchInput');
  const ytUrl    = document.getElementById('ytUrlInput');
  if (ytSearch) ytSearch.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchYouTube(); });
  if (ytUrl)    ytUrl.addEventListener('keydown', (e)    => { if (e.key === 'Enter') addDownload(); });
  try { const h = localStorage.getItem('youtifiy_history'); if (h) playHistory = JSON.parse(h); document.getElementById('crossfadeValue').textContent = localStorage.getItem('youtifiy_crossfade'); document.getElementById('crossfadeSlider').value = localStorage.getItem('youtifiy_crossfade'); } catch (e) {}
  initMiniPlayer();
  initLyrics();
  placePlayerQuickControls();
});

function placePlayerQuickControls() {
  const playerRight = document.querySelector('.player-right');
  const volumeButton = document.getElementById('volumebutton');
  const lyricsButton = document.getElementById('lyricsToggleBtn');
  const effectsButton = document.querySelector('.effects-toggle-btn');
  if (!playerRight || !volumeButton || !lyricsButton || !effectsButton) return;

  lyricsButton.title = 'Lyrics';
  effectsButton.title = 'Equalizer';
  volumeButton.title = isMuted ? 'Unmute' : 'Mute';

  if (lyricsButton.parentElement !== playerRight) playerRight.insertBefore(lyricsButton, volumeButton);
  if (effectsButton.parentElement !== playerRight) playerRight.insertBefore(effectsButton, volumeButton);
}

function clearQueueSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.value = '';
  QueueManager.render();
  input.focus();
}

function toggleQueueOverflow(event) {
  event?.stopPropagation();
  const menu = document.getElementById('queueOverflowMenu');
  const toggle = document.getElementById('queueOverflowToggle');
  if (!menu || !toggle) return;
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
}

function closeQueueOverflow() {
  const menu = document.getElementById('queueOverflowMenu');
  const toggle = document.getElementById('queueOverflowToggle');
  if (menu) menu.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.queue-overflow')) closeQueueOverflow();
  if (!event.target.closest('#trackContextMenu')) closeTrackContextMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeTrackContextMenu();
});

function openTrackContextMenu(event, index) {
  event.preventDefault();
  event.stopPropagation();
  if (!queue[index]) return;
  const menu = document.getElementById('trackContextMenu');
  if (!menu) return;
  contextTrackIndex = index;
  menu.classList.add('open');
  menu.setAttribute('aria-hidden', 'false');
  const margin = 8;
  const left = Math.min(event.clientX, window.innerWidth - menu.offsetWidth - margin);
  const top = Math.min(event.clientY, window.innerHeight - menu.offsetHeight - margin);
  menu.style.left = `${Math.max(margin, left)}px`;
  menu.style.top = `${Math.max(margin, top)}px`;
}

function closeTrackContextMenu() {
  const menu = document.getElementById('trackContextMenu');
  if (menu) {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
  contextTrackIndex = -1;
}

function playContextTrack() {
  if (contextTrackIndex >= 0) playTrackAtIndex(0, audio, contextTrackIndex);
  closeTrackContextMenu();
}

function playContextTrackNext() {
  const i = contextTrackIndex;
  if (i < 0 || !queue[i]) { closeTrackContextMenu(); return; }
  if (currentTrackIndex < 0) { playContextTrack(); return; }
  addToUserQueue(i, true);
  closeTrackContextMenu();
}
function addContextTrackToQueue() {
  if (contextTrackIndex >= 0) addToUserQueue(contextTrackIndex, false);
  closeTrackContextMenu();
}
function _oldPlayContextTrackNext() {
  const index = contextTrackIndex;
  if (index < 0 || !queue[index]) return;
  if (currentTrackIndex < 0) {
    playContextTrack();
    return;
  }
  if (index === currentTrackIndex) {
    toast('This track is already playing');
    closeTrackContextMenu();
    return;
  }
  const [track] = queue.splice(index, 1);
  if (index < currentTrackIndex) currentTrackIndex--;
  queue.splice(currentTrackIndex + 1, 0, track);
  QueueManager.render(document.getElementById('searchInput')?.value || '');
  toast(`Playing next: ${track.title || 'Unknown Track'}`);
  closeTrackContextMenu();
}

function openContextTrackInfo() {
  const track = queue[contextTrackIndex];
  if (track?.uid) openTrackInfo(track.uid);
  closeTrackContextMenu();
}

function removeContextTrack() {
  if (contextTrackIndex >= 0) QueueManager.remove(contextTrackIndex);
  closeTrackContextMenu();
}

function jumpToCurrentTrack() {
  if (currentTrackIndex < 0) {
    toast('No track playing');
    return;
  }

  let row = document.querySelector(`.queue-item[data-queue-index="${currentTrackIndex}"]`);
  if (!row) {
    const input = document.getElementById('searchInput');
    if (input && input.value) {
      input.value = '';
      QueueManager.render();
      row = document.querySelector(`.queue-item[data-queue-index="${currentTrackIndex}"]`);
    }
  }

  if (!row) {
    toast('Current track is not visible');
    return;
  }

  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  row.classList.add('focus-flash');
  setTimeout(() => row.classList.remove('focus-flash'), 1100);
}

function getQueueSearchQuery() {
  return String(document.getElementById('searchInput')?.value || '').trim().toLowerCase();
}

function getVisibleQueueEntries() {
  const normalizedQuery = getQueueSearchQuery();
  return queue
    .map((track, index) => ({ track, index }))
    .filter(({ track }) => {
      if (!normalizedQuery) return true;
      return (track.title || '').toLowerCase().includes(normalizedQuery)
        || (track.artist || '').toLowerCase().includes(normalizedQuery)
        || (track.album || '').toLowerCase().includes(normalizedQuery);
    });
}

function loadFavoriteTracks() {
  try {
    const saved = JSON.parse(localStorage.getItem('youtifiy_favorites') || '[]');
    favoriteTracks = new Set(Array.isArray(saved) ? saved.filter(Boolean) : []);
  } catch (e) {
    favoriteTracks = new Set();
  }
}

function saveFavoriteTracks() {
  try { localStorage.setItem('youtifiy_favorites', JSON.stringify([...favoriteTracks])); }
  catch (e) { console.warn('Could not save favorites', e); }
}

function toggleFavoriteCurrentTrack() {
  const currentTrack = queue[currentTrackIndex];
  if (!currentTrack?.uid) {
    toast('No track playing');
    return;
  }
  const wasFavorite = favoriteTracks.has(currentTrack.uid);
  if (wasFavorite) favoriteTracks.delete(currentTrack.uid);
  else favoriteTracks.add(currentTrack.uid);
  saveFavoriteTracks();
  const btn = document.getElementById('favoriteNowBtn');
  if (btn) btn.textContent = wasFavorite ? 'Favorite current track' : 'Remove from favorites';
  toast(`${wasFavorite ? 'Removed from' : 'Added to'} favorites: ${currentTrack.title || 'current track'}`);
}

function updateFavoriteNowButton() {
  const btn = document.getElementById('favoriteNowBtn');
  const currentTrack = queue[currentTrackIndex];
  if (!btn) return;
  btn.textContent = currentTrack?.uid && favoriteTracks.has(currentTrack.uid)
    ? 'Remove from favorites'
    : 'Favorite current track';
}

function playRandomTrack() {
  const entries = getVisibleQueueEntries();
  if (!entries.length) {
    toast(queue.length ? 'No visible songs to pick from' : 'No songs in queue');
    return;
  }
  const pick = entries[Math.floor(Math.random() * entries.length)];
  playTrackAtIndex(0, audio, pick.index);
  toast(`Random: ${pick.track.title || 'Unknown Track'}`);
}

async function copyNowPlaying() {
  const currentTrack = queue[currentTrackIndex];
  if (!currentTrack) {
    toast('No track playing');
    return;
  }
  const text = `${currentTrack.title || 'Unknown Track'} - ${currentTrack.artist || 'Unknown Artist'}`;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement('textarea');
      temp.value = text;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }
    toast('Copied now playing');
  } catch (e) {
    console.warn('Copy failed', e);
    toast('Could not copy now playing');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.activeElement?.id === 'searchInput') {
    e.preventDefault();
    clearQueueSearch();
  }
});

if (typeof version !== 'undefined') {
  const brandEl = document.getElementById('brandversion');
  if (brandEl) brandEl.innerHTML = `${version}`;
}
if (aab_button) aab_button.setAttribute('aria-checked', albumArtBackground ? 'true' : 'false');
if (performanceModeButton) performanceModeButton.setAttribute('aria-checked', performanceModeEnabled ? 'true' : 'false');
if (sidebarPosButton) sidebarPosButton.setAttribute('aria-checked', sidebarBottom ? 'true' : 'false');  
document.body.classList.toggle('sidebar-bottom', sidebarBottom);                                          
document.body.classList.toggle('performance-mode', performanceModeEnabled);

// Miscellaneous helpers (called from HTML)
function timeAgo(s) { return Utils.timeAgo(s); }
function toggleSidebar() {
  document.getElementById('app').classList.toggle('sidebar-collapsed');
  document.getElementById('sidebar').classList.toggle('collapsed');
}
function getAABTheme() {
    const theme =   {name:`${queue[currentTrackIndex].title}` , theme: [ getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--bg-hover').trim(), getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(), getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary').trim(), getComputedStyle(document.documentElement).getPropertyValue('--accent-hover').trim(), getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim(), getComputedStyle(document.documentElement).getPropertyValue('--bg-elevated').trim(), getComputedStyle(document.documentElement).getPropertyValue('--border').trim(), getComputedStyle(document.documentElement).getPropertyValue('--shadow-glow').trim(), ] };
    const idx = customThemes.findIndex(t => t.name === theme.name);
    if (idx !== -1) { if (!confirm(`Theme "${theme.name}" already exists. Overwrite?`)) return; customThemes[idx] = theme; }
    else customThemes.push(theme);
    localStorage.setItem('youtifiy_custom_themes', JSON.stringify(customThemes));
    ThemeManager.applyCSS(theme);
    ThemeManager.addToGrid(theme);
    document.documentElement.style.removeProperty('--glass-tint');
    document.documentElement.setAttribute('data-theme', theme.name);
    ThemeManager.applyAccentInk();
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s.dataset.theme === theme.name));
    toast('Theme imported: ' + theme.name);
}

// ============================================================================
// FULL-SCREEN LYRICS PLAYER
// Clicking the bottom player's album art opens an Apple Music-style lyrics
// view. It intentionally does not replace or mutate the existing PlayerEmbed.
// ============================================================================
const FullLyricsPlayer = (() => {
  let opened = false;

  const $ = id => document.getElementById(id);

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function syncTrackInfo() {
    const track = queue?.[currentTrackIndex];
    const img = $('playerImg');

    $('fullLyricsArt')?.setAttribute('src', track?.albumArt || img?.src || '');
    $('fullLyricsArt')?.setAttribute('alt', track ? `${track.title} album art` : '');

    if ($('fullLyricsTitle')) $('fullLyricsTitle').textContent = track?.title || 'No track playing';
    if ($('fullLyricsArtist')) $('fullLyricsArtist').textContent = track?.artist || 'Select a track to play';
  }

  function syncPlayback() {
    const duration = Number.isFinite(audio?.duration) ? audio.duration : 0;
    const current = Number.isFinite(audio?.currentTime) ? audio.currentTime : 0;
    const percent = duration > 0 ? Math.min(100, Math.max(0, current / duration * 100)) : 0;

    if ($('fullLyricsCurrentTime')) $('fullLyricsCurrentTime').textContent = formatTime(current);
    if ($('fullLyricsDuration')) $('fullLyricsDuration').textContent = formatTime(duration);
    if ($('fullLyricsProgressFill')) $('fullLyricsProgressFill').style.width = `${percent}%`;

    const icon = $('fullLyricsPlayIcon');
    if (icon) {
      icon.innerHTML = (isPlaying1 || isPlaying2)
        ? '<path d="M7 5h4v14H7zM13 5h4v14h-4z"></path>'
        : '<path d="M8 5v14l11-7z"></path>';
    }
  }

function mirrorLyrics() {
    const source = $('lyricsContent');
    const target = $('fullLyricsContent');
    if (!source || !target) return;

    target.innerHTML = source.innerHTML;

    const active = target.querySelector('.lyrics-line.active');

    if (opened && active) {
        requestAnimationFrame(() => {
            const containerRect = target.getBoundingClientRect();
            const lineRect = active.getBoundingClientRect();

            const targetScroll =
                target.scrollTop +
                (lineRect.top - containerRect.top) -
                (target.clientHeight / 2) +
                (lineRect.height / 2);

            target.scrollTo({
                top: Math.max(0, targetScroll),
                behavior: 'smooth'
            });
        });
      }
  }

  function open() {
    const overlay = $('fullLyricsPlayer');
    if (!overlay) return;

    opened = true;
    syncTrackInfo();
    syncPlayback();
    document.getElementById('fullLyricsPlayer').style.display = "";
    if (lyricsManager) {
      lyricsManager.isOpen = true;
      const track = queue?.[currentTrackIndex];
      if (track) {
        lyricsManager.onTrackChange();
        if (!lyricsManager.parsedLines?.length && !lyricsManager.isFetching) {
          lyricsManager.fetchLyrics(track);
        }
      } else {
        lyricsManager.showEmpty();
      }
    }

    mirrorLyrics();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('full-lyrics-open');
    document.getElementById('mainContent').style.display = "none";
    document.getElementById('sidebar').style.display = "none";
    document.getElementById('player').style.display = "none";
  }

  function close() {
    const overlay = $('fullLyricsPlayer');
    if (!overlay) return;
    document.getElementById('fullLyricsPlayer').style.display = "none";
    opened = false;
    document.getElementById('mainContent').style.display = "";
    document.getElementById('sidebar').style.display = "";
    document.getElementById('player').style.display = "";
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('full-lyrics-open');

    // If the normal lyrics panel is not open and the desktop embedded player
    // is not using lyrics, release the manager's live state so the existing
    // Lyrics button still toggles normally after this view is closed.
    if (lyricsManager &&
        !document.getElementById('lyricsPanel')?.classList.contains('open') &&
        !(typeof PlayerEmbed !== 'undefined' && PlayerEmbed.isEmbedActive())) {
      lyricsManager.isOpen = false;
    }
  }

  function seek(event) {
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const bar = $('fullLyricsProgress');
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    syncPlayback();
  }

  return { open, close, mirrorLyrics, syncTrackInfo, syncPlayback, seek, isOpen: () => opened };
})();

function openFullLyricsPlayer() {
  FullLyricsPlayer.open();
}

function closeFullLyricsPlayer() {
  FullLyricsPlayer.close();
}

function seekFullLyricsProgress(event) {
  FullLyricsPlayer.seek(event);
}

document.addEventListener('DOMContentLoaded', () => {
  const playerImg = document.getElementById('playerImg');
  if (playerImg) {
    playerImg.setAttribute('role', 'button');
    playerImg.setAttribute('tabindex', '0');
    playerImg.setAttribute('title', 'Open lyrics');
    playerImg.addEventListener('click', openFullLyricsPlayer);
    playerImg.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFullLyricsPlayer();
      }
    });
  }

  audio.addEventListener('timeupdate', () => FullLyricsPlayer.syncPlayback());
  audio.addEventListener('loadedmetadata', () => FullLyricsPlayer.syncPlayback());
  audio.addEventListener('play', () => FullLyricsPlayer.syncPlayback());
  audio.addEventListener('pause', () => FullLyricsPlayer.syncPlayback());
  audio.addEventListener('durationchange', () => FullLyricsPlayer.syncPlayback());

  const source = document.getElementById('lyricsContent');
  if (source) {
    new MutationObserver(() => FullLyricsPlayer.mirrorLyrics()).observe(source, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  FullLyricsPlayer.syncTrackInfo();
  FullLyricsPlayer.syncPlayback();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && FullLyricsPlayer.isOpen()) {
    e.preventDefault();
    closeFullLyricsPlayer();
  }
});

// ============================================================================
// EMBEDDED PLAYER LYRICS / EQ SWAP (desktop empty-space panel)
// ============================================================================
// On desktop widths the empty space under the player controls hosts a
// two-sided embedded card: lyrics on one face, EQ on the other, swapped
// with a flip animation. On narrower layouts (embed hidden by CSS) the
// lyrics/EQ buttons fall back to the original slide-out panels untouched.
const PlayerEmbed = (function () {
  const embedEl = document.getElementById('playerEmbed');
  const stage = document.getElementById('playerEmbedStage');
  const embedLyrics = document.getElementById('playerEmbedLyricsContent');
  const realLyrics = document.getElementById('lyricsContent');

  function isEmbedActive() {
    return !!embedEl && getComputedStyle(embedEl).display !== 'none';
  }

  // --- Live lyrics mirroring -------------------------------------------
  if (embedLyrics && realLyrics) {
    const mirrorLyrics = () => { embedLyrics.innerHTML = realLyrics.innerHTML; };
    mirrorLyrics();
    new MutationObserver(mirrorLyrics).observe(realLyrics, {
      childList: true, subtree: true, characterData: true,
    });
  }

  // --- EQ / speed / gain sliders: embed drives the real controls -------
  const linkPairs = [
    ['bassSlider', 'bassSliderEmbed', 'bassValueEmbed', v => v],
    ['midSlider', 'midSliderEmbed', 'midValueEmbed', v => v],
    ['trebleSlider', 'trebleSliderEmbed', 'trebleValueEmbed', v => v],
    ['speedSlider', 'speedSliderEmbed', 'speedValueEmbed', v => v],
    ['gainSlider', 'gainSliderEmbed', 'gainValueEmbed', v => `${v}%`],
  ];
  linkPairs.forEach(([realId, embedId, valueId, fmt]) => {
    const real = document.getElementById(realId);
    const embed = document.getElementById(embedId);
    const val = document.getElementById(valueId);
    if (!real || !embed) return;

    // Reflect the real slider's current value into the embedded one.
    const pullFromReal = () => {
      embed.value = real.value;
      if (val) val.textContent = fmt(real.value);
    };
    pullFromReal();
    real.addEventListener('input', pullFromReal);

    // Dragging the embedded slider drives the real slider (and its
    // existing oninput handler, so bass/mid/treble/speed/gain actually
    // apply) by dispatching a real input event on it.
    embed.addEventListener('input', () => {
      real.value = embed.value;
      real.dispatchEvent(new Event('input', { bubbles: true }));
      if (val) val.textContent = fmt(embed.value);
    });
  });

  let currentFace = 'lyrics';
  function showFace(face) {
    if (!stage) return;
    currentFace = face;
    document.getElementById('lyricsToggleBtn')?.classList.toggle('active', face === 'lyrics');
    document.getElementById('effectsToggleBtn')?.classList.toggle('active', face === 'eq');
    document.getElementById('uqBtn')?.classList.toggle('active', face === 'queue');
    stage.classList.toggle('flipped', face === 'eq');
    stage.classList.toggle('show-queue', face === 'queue');
    if (face === 'queue' && typeof uqRender === 'function') uqRender();
  }
  // Clicking Queue again goes back to lyrics.
  function toggleQueue() { showFace(currentFace === 'queue' ? 'lyrics' : 'queue'); }

  return { isEmbedActive, showFace, toggleQueue };
})();

function fetchCurrentTrackLyrics() {
  if (!lyricsManager) return;
  const track = queue[currentTrackIndex];
  if (!track) { toast('No track playing'); return; }
  // Explicit user action: this is exactly the "actually wants lyrics right
  // now" signal, so arm the manager and go straight to the API regardless
  // of whatever passive auto-fetch state isOpen is currently in.
  lyricsManager.isOpen = true;
  lyricsManager.fetchLyrics(track);
}

function handleLyricsButtonClick() {
  if (PlayerEmbed.isEmbedActive()) {
    // Desktop: never open the slide-out panel or shift the layout.
    // Keep the lyrics manager permanently "live" so fetching/highlighting
    // keeps working, and just flip the embed to its lyrics face.
    if (lyricsManager && !lyricsManager.isOpen) {
      lyricsManager.isOpen = true;
      const track = queue[currentTrackIndex];
      if (track) lyricsManager.onTrackChange(); else lyricsManager.showEmpty();
    }
    document.getElementById('lyricsToggleBtn')?.classList.add('active');
    PlayerEmbed.showFace('lyrics');
  } else {
    toggleLyrics();
  }
}

function handleEffectsButtonClick() {
  if (PlayerEmbed.isEmbedActive()) {
    if (!audioContext) AudioEngine.init();
    PlayerEmbed.showFace('eq');
  } else {
    AudioEngine.toggleEffects();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ['playerImg', 'playerTitle', 'playerArtist'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    new MutationObserver(() => FullLyricsPlayer.syncTrackInfo()).observe(el, {
      attributes: true,
      childList: true,
      characterData: true
    });
  });
});

const LyricsPopout = (function () {
  let pipWindow = null;
  let lyricsObserver = null;
  let trackObserver = null;
  let themeObserver = null;

  // The theme CSS variables Youtify itself keys off of (see [data-theme="..."]
  // blocks near the top of the stylesheet). We read these live off the real
  // page so the popout always matches whatever theme/font is active — instead
  // of hardcoding one look.
  const THEME_VARS = [
    '--bg-primary', '--bg-secondary', '--bg-tertiary', '--bg-hover', '--bg-card',
    '--bg-elevated', '--text-primary', '--text-secondary', '--text-muted',
    '--accent', '--accent-hover', '--accent-secondary', '--border', '--border-hover',
    '--shadow', '--shadow-glow', '--radius-sm', '--radius-md', '--radius-lg',
    '--radius-xl', '--transition'
  ];

  function currentThemeCSS() {
    const cs = getComputedStyle(document.documentElement);
    const lines = THEME_VARS.map(v => {
      let val = cs.getPropertyValue(v).trim();
      if (v === '--shadow-glow') {
        const nums = val.match(/[\d.]+/g);
        if (nums) val = nums.slice(0, 3).join(',');
      }
      return `  ${v}: ${val};`;
    });
    return `:root {\n${lines.join('\n')}\n}`;
  }

  const PIP_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Margarine&display=swap');
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; height: 100%; overflow: hidden;
      background: var(--bg-primary); color: var(--text-primary);
      font-family: 'Margarine', system-ui;
      display: flex; flex-direction: column;
    }
    .pip-header {
      display: flex; align-items: center; gap: 14px;
      padding: 18px 20px; flex-shrink: 0;
      -webkit-app-region: drag;
    }
    .pip-art {
      width: 52px; height: 52px; border-radius: 12px;
      background-color: var(--bg-tertiary); background-size: cover;
      background-position: center; flex-shrink: 0;
      box-shadow: 0 6px 20px rgba(0,0,0,0.35);
      transition: width .2s ease, height .2s ease;
    }
    .pip-meta { min-width: 0; }
    .pip-title {
      font-size: 15px; font-weight: 700; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
      letter-spacing: -0.01em; margin-bottom: 3px;
    }
    .pip-artist {
      font-size: 12.5px; font-weight: 500; color: var(--text-secondary);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .pip-body { flex: 1; min-height: 0; position: relative; }

    .pip-line-mode {
      position: absolute; inset: 0; bottom: 98px;
      display: flex; align-items: center; justify-content: center;
      overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
      padding: 12px 28px; text-align: center;
    }
    .pip-line-mode::-webkit-scrollbar { width: 0; }
    .pip-current-line {
      font-size: clamp(15px, 6.5vw, 24px);
      font-weight: 700; line-height: 1.45; letter-spacing: -0.01em;
      color: var(--text-primary);
      overflow-wrap: break-word; word-break: break-word; hyphens: auto;
    }
    .pip-current-line.animate-in { animation: pipSlideIn .4s cubic-bezier(.22,.8,.3,1); }
    @keyframes pipSlideIn {
      from { transform: translateY(18px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    .pip-lyrics, .pip-list-mode {
      position: absolute; inset: 0; bottom: 98px; overflow-y: auto;
      padding: 4px 20px 16px;
      scroll-behavior: smooth; scrollbar-width: none;
      mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 100%);
    }
    .pip-lyrics::-webkit-scrollbar, .pip-list-mode::-webkit-scrollbar { width: 0; }
    .lyrics-line {
      padding: 9px 4px; font-size: 15px; line-height: 1.5; font-weight: 500;
      color: var(--text-muted); transition: color .25s ease, transform .25s ease;
      transform-origin: left center; cursor: default;
      overflow-wrap: break-word; word-break: break-word;
    }
    .lyrics-line.active {
      color: var(--text-primary); font-weight: 700; transform: scale(1.015);
    }
    .lyrics-line.passed { opacity: 0.55; }
    .pip-empty {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; height: 100%; gap: 10px;
      color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;
    }
    .pip-empty::before { content: '🎤'; font-size: 26px; opacity: 0.4; }

    .pip-controls-wrap {
      position: absolute; left: 0; right: 0; bottom: 0;
      padding: 10px 16px 16px;
      background: linear-gradient(to top, var(--bg-primary) 40%, transparent 100%);
    }
    .pip-seek-row {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 6px;
    }
    .pip-seek-time {
      font-size: 10.5px; font-weight: 600; color: var(--text-muted);
      min-width: 30px; flex-shrink: 0; font-variant-numeric: tabular-nums;
    }
    .pip-seek-time.pip-seek-duration { text-align: right; }
    .pip-seek-bar {
      flex: 1; height: 12px; display: flex; align-items: center;
      cursor: pointer; touch-action: none;
    }
    .pip-seek-track {
      position: relative; width: 100%; height: 4px; border-radius: 2px;
      background: var(--bg-hover);
      overflow: visible;
    }
    .pip-seek-fill {
      position: absolute; left: 0; top: 0; bottom: 0; width: 0%;
      background: var(--accent); border-radius: 2px;
    }
    .pip-seek-thumb {
      position: absolute; top: 50%; left: 0%;
      width: 11px; height: 11px; border-radius: 50%;
      background: var(--accent); transform: translate(-50%, -50%);
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      opacity: 0; transition: opacity .15s ease;
    }
    .pip-seek-bar:hover .pip-seek-thumb,
    .pip-seek-bar.dragging .pip-seek-thumb { opacity: 1; }
    .pip-controls {
      display: flex; align-items: center; justify-content: center; gap: 22px;
    }
    .pip-ctrl-btn {
      background: none; border: none; color: var(--text-secondary); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%; transition: all .15s ease;
      flex-shrink: 0;
    }
    .pip-ctrl-btn:hover { color: var(--text-primary); background: var(--bg-hover); }
    .pip-ctrl-btn.play-pause {
      width: 42px; height: 42px; background: var(--accent); color: #fff;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    }
    .pip-ctrl-btn.play-pause:hover { background: var(--accent-hover); }

    body.pip-compact .pip-header {
      flex-direction: column; text-align: center;
      padding: 26px 20px 6px;
    }
    body.pip-compact .pip-art { width: 84px; height: 84px; margin-bottom: 2px; }
    body.pip-compact .pip-title, body.pip-compact .pip-artist {
      white-space: normal; overflow: visible; text-overflow: clip; max-width: 100%;
    }
    body.pip-compact .pip-title { font-size: 16px; }

    body.pip-compact .pip-line-mode,
    body.pip-compact .pip-list-mode { display: none !important; }
    body.pip-compact .pip-controls-wrap {
      position: static; background: none; padding: 8px 16px 26px;
    }
  `;

  const ICONS = {
    shuffle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`,
    prev: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="19 20 9 12 19 4 19 20"></polygon><rect x="5" y="4" width="2" height="16"></rect></svg>`,
    next: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 4 15 12 5 20 5 4"></polygon><rect x="17" y="4" width="2" height="16"></rect></svg>`,
    play: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    pause: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
    repeat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">   <polyline points="17 1 21 5 17 9"></polyline>   <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>   <polyline points="7 23 3 19 7 15"></polyline>   <path d="M21 13v2a4 4 0 0 1-4 4H3"></path> </svg>`,
  };

  function buildDocument(win) {
    const themeStyle = win.document.createElement('style');
    themeStyle.id = 'pip-theme-vars';
    themeStyle.textContent = currentThemeCSS();
    win.document.head.appendChild(themeStyle);

    const style = win.document.createElement('style');
    style.textContent = PIP_STYLES;
    win.document.head.appendChild(style);

    win.document.title = 'Lyrics';
    win.document.body.innerHTML = `
      <div class="pip-header">
        <div class="pip-art" id="pipArt"></div>
        <div class="pip-meta">
          <div class="pip-title" id="pipTitle">No track playing</div>
          <div class="pip-artist" id="pipArtist"></div>
        </div>
      </div>
      <div class="pip-body">
        <div class="pip-line-mode" id="pipLineMode" style="display:none;">
          <div class="pip-current-line" id="pipCurrentLine"></div>
        </div>
        <div class="pip-list-mode" id="pipLyrics"><div class="pip-empty">No lyrics loaded for this track</div></div>
        <div class="pip-controls-wrap">
          <div class="pip-seek-row">
            <span class="pip-seek-time" id="pipSeekCurrent">0:00</span>
            <div class="pip-seek-bar" id="pipSeekBar">
              <div class="pip-seek-track">
                <div class="pip-seek-fill" id="pipSeekFill"></div>
                <div class="pip-seek-thumb" id="pipSeekThumb"></div>
              </div>
            </div>
            <span class="pip-seek-time pip-seek-duration" id="pipSeekDuration">0:00</span>
          </div>
          <div class="pip-controls">
            <button class="pip-ctrl-btn" id="pipShuffleBtn" title="Shuffle">${ICONS.shuffle}</button>
            <button class="pip-ctrl-btn" id="pipPrevBtn" title="Previous track">${ICONS.prev}</button>
            <button class="pip-ctrl-btn play-pause" id="pipPlayBtn" title="Play/Pause">${ICONS.play}</button>
            <button class="pip-ctrl-btn" id="pipNextBtn" title="Next track">${ICONS.next}</button>
            <button class="pip-ctrl-btn" id="pipRepeatBtn" title="Repeat">${ICONS.repeat}</button>
          </div>
        </div>
      </div>
    `;

    win.document.getElementById('pipPrevBtn').addEventListener('click', () => {
      if (typeof previousTrack === 'function') previousTrack();
    });
    win.document.getElementById('pipNextBtn').addEventListener('click', () => {
      if (typeof nextTrack === 'function') nextTrack(0, false);
    });
    win.document.getElementById('pipPlayBtn').addEventListener('click', () => {
      if (typeof togglePlay === 'function') togglePlay();
    });
    win.document.getElementById('pipRepeatBtn').addEventListener('click', () => {
      if (typeof togglePlay === 'function') {toggleRepeat();
      const btn = win.document.getElementById('pipRepeatBtn');
      if (!btn) return;

      const svgBase = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>`;
      const oneTag = `<text x="12" y="14" font-size="8" fill="currentColor" stroke="none" text-anchor="middle" font-weight="bold">1</text>`;

      btn.style.color = repeatMode === 'off' ? 'var(--text-secondary)' : 'var(--accent-secondary)';
      btn.innerHTML = repeatMode === 'one' ? svgBase + oneTag + '</svg>' : svgBase + '</svg>';
      }
    });
    win.document.getElementById('pipShuffleBtn').addEventListener('click', () => {
      if (typeof togglePlay === 'function') {toggleShuffle();
      const btn = win.document.getElementById('pipShuffleBtn');
      if (btn) btn.style.color = isShuffle ? 'var(--accent-secondary)' : 'var(--text-secondary)';
      }
    });

    // Seek bar: click-to-seek and drag-to-scrub.
    const seekBar = win.document.getElementById('pipSeekBar');
    let dragging = false;

    function ratioFromEvent(e) {
      const rect = seekBar.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return Math.max(0, Math.min(1, x / rect.width));
    }
    function applySeek(ratio) {
      if (typeof audio === 'undefined' || !audio || !Number.isFinite(audio.duration)) return;
      audio.currentTime = ratio * audio.duration;
      syncSeekBar();
    }

    seekBar.addEventListener('pointerdown', (e) => {
      dragging = true;
      seekBar.classList.add('dragging');
      applySeek(ratioFromEvent(e));
    });
    win.addEventListener('pointermove', (e) => {
      if (dragging) applySeek(ratioFromEvent(e));
    });
    win.addEventListener('pointerup', () => {
      dragging = false;
      seekBar.classList.remove('dragging');
    });
  }

  function syncSeekBar() {
    if (!pipWindow) return;
    const fill = pipWindow.document.getElementById('pipSeekFill');
    const thumb = pipWindow.document.getElementById('pipSeekThumb');
    const cur = pipWindow.document.getElementById('pipSeekCurrent');
    const dur = pipWindow.document.getElementById('pipSeekDuration');
    if (!fill || typeof audio === 'undefined' || !audio) return;

    const duration = audio.duration;
    const ratio = (Number.isFinite(duration) && duration > 0) ? (audio.currentTime / duration) : 0;
    const pct = Math.max(0, Math.min(100, ratio * 100));
    fill.style.width = pct + '%';
    if (thumb) thumb.style.left = pct + '%';
    if (cur) cur.textContent = formatPipTime(audio.currentTime);
    if (dur) dur.textContent = formatPipTime(duration);
  }

  function formatPipTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  const COMPACT_WIDTH = 300;
  const COMPACT_HEIGHT = 260;

  function updateLayoutMode() {
    if (!pipWindow) return;
    const compact = pipWindow.innerWidth < COMPACT_WIDTH || pipWindow.innerHeight < COMPACT_HEIGHT;
    pipWindow.document.body.classList.toggle('pip-compact', compact);
  }

  function syncPlayButton() {
    if (!pipWindow) return;
    const btn = pipWindow.document.getElementById('pipPlayBtn');
    if (!btn) return;
    btn.innerHTML = ((typeof isPlaying1 !== 'undefined' && isPlaying1) || (typeof isPlaying2 !== 'undefined' && isPlaying2)) ? ICONS.pause : ICONS.play;
  }

  function syncTheme() {
    if (!pipWindow) return;
    const themeStyle = pipWindow.document.getElementById('pip-theme-vars');
    if (themeStyle) themeStyle.textContent = currentThemeCSS();
  }

  function syncTrackInfo() {
    if (!pipWindow) return;
    const title = document.getElementById('playerTitle')?.textContent || 'No track playing';
    const artist = document.getElementById('playerArtist')?.textContent || '';
    const img = document.getElementById('playerImg');

    const pt = pipWindow.document.getElementById('pipTitle');
    const pa = pipWindow.document.getElementById('pipArtist');
    const part = pipWindow.document.getElementById('pipArt');
    if (pt) pt.textContent = title;
    if (pa) pa.textContent = artist;
    if (part) {
      part.style.backgroundImage = (img && img.src && img.style.display !== 'none')
        ? `url("${img.src}")` : 'none';
    }
  }

  function hasRealTiming() {
    return typeof lyricsManager !== 'undefined' && lyricsManager
      && (lyricsManager.currentSource === 'spotify' || lyricsManager.currentSource === 'musix')
      && !!lyricsManager.parsedLines?.length;
  }

  let lastShownLineIndex = null;

  function syncLyrics() {
    if (!pipWindow) return;
    const lineMode = pipWindow.document.getElementById('pipLineMode');
    const listMode = pipWindow.document.getElementById('pipLyrics');
    if (!lineMode || !listMode) return;

    if (hasRealTiming()) {
      lineMode.style.display = 'flex';
      listMode.style.display = 'none';

      const idx = lyricsManager.currentLineIndex;
      const line = (idx != null && idx >= 0) ? lyricsManager.parsedLines[idx] : null;
      const lineEl = pipWindow.document.getElementById('pipCurrentLine');
      if (!lineEl) return;

      if (!line) {
        if (lastShownLineIndex !== -1) {
          lineEl.textContent = '♪';
          lastShownLineIndex = -1;
        }
        return;
      }
      if (idx === lastShownLineIndex) return;
      lastShownLineIndex = idx;

      lineEl.textContent = line.text;
      lineEl.classList.remove('animate-in');
      void lineEl.offsetWidth;
      lineEl.classList.add('animate-in');
      return;
    }

    lineMode.style.display = 'none';
    listMode.style.display = 'block';
    lastShownLineIndex = null;

    const source = document.getElementById('lyricsContent');
    if (!source || !source.children.length) {
      listMode.innerHTML = '<div class="pip-empty">No lyrics loaded for this track</div>';
      return;
    }

    listMode.innerHTML = source.innerHTML;
    const active = listMode.querySelector('.lyrics-line.active');
    if (active) {
      const containerRect = listMode.getBoundingClientRect();
      const lineRect = active.getBoundingClientRect();
      const targetScroll = listMode.scrollTop + (lineRect.top - containerRect.top)
        - (listMode.clientHeight / 2) + (lineRect.height / 2);
      listMode.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }

  async function open() {
    if (pipWindow) { pipWindow.focus(); return; }

    if (!('documentPictureInPicture' in window)) {
      toast('Pop-out lyrics needs a Chromium browser (Chrome/Edge)');
      return;
    }

    pipWindow = await documentPictureInPicture.requestWindow({ width: 360, height: 480 });
    buildDocument(pipWindow);
    syncTrackInfo();
    syncLyrics();
    syncPlayButton();
    syncSeekBar();
    updateLayoutMode();

    pipWindow.addEventListener('resize', updateLayoutMode);

    const lyricsSource = document.getElementById('lyricsContent');
    if (lyricsSource) {
      lyricsObserver = new MutationObserver(syncLyrics);
      lyricsObserver.observe(lyricsSource, { childList: true, subtree: true, characterData: true, attributes: true });
    }

    trackObserver = new MutationObserver(syncTrackInfo);
    ['playerTitle', 'playerArtist', 'playerImg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) trackObserver.observe(el, { attributes: true, childList: true, characterData: true, subtree: true });
    });

    themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

    const pollId = setInterval(() => {
      if (!pipWindow) { clearInterval(pollId); return; }
      syncPlayButton();
      syncSeekBar();
      if (hasRealTiming()) syncLyrics();
    }, 250);

    pipWindow.addEventListener('pagehide', () => {
      lyricsObserver?.disconnect();
      trackObserver?.disconnect();
      themeObserver?.disconnect();
      clearInterval(pollId);
      pipWindow.removeEventListener('resize', updateLayoutMode);
      lyricsObserver = null;
      trackObserver = null;
      themeObserver = null;
      lastShownLineIndex = null;
      pipWindow = null;
      document.querySelectorAll('.lyrics-popout-btn').forEach(btn => { btn.style.display = ''; });
    }, { once: true });

    if (typeof lyricsManager !== 'undefined' && lyricsManager) {
      lyricsManager.isOpen = true;
      const track = (typeof queue !== 'undefined') ? queue?.[currentTrackIndex] : null;
      if (track && !lyricsManager.parsedLines?.length && !lyricsManager.isFetching) {
        lyricsManager.fetchLyrics(track);
      }
    }
  }

  return { open };
})();

function openLyricsPopout() {
  try {
    LyricsPopout.open();
    document.querySelectorAll('.lyrics-popout-btn').forEach(btn => { btn.style.display = 'none'; });
  } catch (e) {
    console.log(e);
  }
}

console.log(`🎵 Youtify Music Player (Version: ${version}) initialized!`);
console.log('Shortcuts: Press / for help, L for lyrics, E for effects');
document.addEventListener("DOMContentLoaded", (event) => {
  handleLyricsButtonClick();
});

/* ===================== chat.js ===================== */
(function () {
'use strict';
/* ==========================================================================
   YOUTIFY CHAT  —  logic
   public room + DMs + presence + profile pictures + remote command receiver
   ========================================================================== */

const CFG  = window.YOUTIFY_CHAT_CONFIG || {};
/* The app lets people rename it (Settings > title), so never hard-code "Youtify"
   when prefixing the unread count — that would wipe their custom name. */
const BASE_TITLE = (document.title || "Youtify").replace(/^\(\d+\)\s*/, "");
const ROOT = window.YOUTIFY_CHAT_ROOT || "youtify";
const BOOT = Date.now();

const $ = (id) => document.getElementById(id);

/* image limits */
const PFP_DIM       = 256;          // profile pictures are square, 256x256
const PFP_MAX_BYTES = 60 * 1024;    // ~60KB
const IMG_MAX_DIM   = 1024;         // chat pictures (was 1280)
const IMG_MAX_BYTES = 180 * 1024;   // was 320KB — images live in the database, keep them lean
const RAW_MAX_BYTES = 25 * 1024 * 1024; // refuse absurd source files up front

/* Animated GIFs can't go through the canvas — drawing one to a canvas only ever
   captures frame 1, which is exactly why GIFs used to arrive frozen. They get
   passed through byte-for-byte instead, so the ceiling has to be a lot tighter:
   nothing shrinks them on the way in. */
/* GIFs pass through uncompressed, so the cap is the only lever. 71 GIFs at up
   to 2MB each were two-thirds of the whole database. */
const GIF_MAX_BYTES     = 1024 * 1024;       // animated GIFs in chat (was 2MB)
const PFP_GIF_MAX_BYTES = 256 * 1024;        // animated avatars — everyone loads these

const state = {
  ready: false,
  uid: null,
  name: null,
  authUid: null,       // Firebase Auth uid once logged in — null while on the gate
  pfp: (function(){ try { return localStorage.getItem("yc_pfp") || null; } catch(e){ return null; } })(), // own profile picture
  view: "room",
  lastView: "room",
  openThread: null,        // { uid, name }
  people: {},              // uid -> presence
  profiles: {},            // uid -> { name, bio, pfp, ts }
  lastSeen: {},            // uid -> ts, lets offline people show when they were last around
  threads: {},             // otherUid -> thread index entry
  groups: {},              // groupId -> group info (name, owner, members, last)
  stats: {},               // uid -> shared listening summary
  bio: (function(){ try { return localStorage.getItem("yc_bio") || ""; } catch(e){ return ""; } })(),
  openProfile: null,       // uid whose profile is on screen
  profileFrom: "people",   // where the profile view was opened from
  unsubThread: null,
  unsubReads: null,
  unsubTyping: null,
  typing: {},              // uid -> { name, ts } for the scope you're looking at
  typingScope: null,
  threadReads: {},         // uid -> ts of the newest message they've read
  seenCommands: new Set(),
  muted: false,
  kicked: false,
  unread: 0,
  unreadRoom: 0,
  unreadDms: 0,
  sending: false,
  version: version
};

/* ---------- tiny helpers ---------- */
function shortTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
function dayLabel(ts) {
  const d = new Date(ts), now = new Date();
  const same = (a, b) => a.toDateString() === b.toDateString();
  if (same(d, now)) return "Today";
  const y = new Date(now); y.setDate(y.getDate() - 1);
  if (same(d, y)) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}
function initials(name) {
  return (name || "?").trim().slice(0, 1).toUpperCase() || "?";
}
function say(msg) {
  if (typeof window.toast === "function") { try { try { toast(msg); return; } catch (s) { } window.toast(msg); return; } catch (e) {} }
  console.log("[chat]", msg);
}
function status(left, right, cls) {
  const l = $("ycStatusLeft"), r = $("ycStatusRight");
  if (l) { l.textContent = left; l.className = cls || ""; }
  if (r) r.textContent = right || "";
}
/* A group chat is a thread whose "other person" is the group id (g_...). That is
   what lets groups reuse the DM code for replies, edits, reactions, pictures,
   paging, caching, typing and receipts. */
function isGroupId(id) { return typeof id === "string" && id.startsWith("g_"); }
function threadId(a, b) {
  if (isGroupId(b)) return b;
  if (isGroupId(a)) return a;
  return [a, b].sort().join("_");
}
/* where each kind of thread keeps its data */
function msgsPath(tid)   { return isGroupId(tid) ? `${ROOT}/groups/${tid}/msgs`   : `${ROOT}/dm/${tid}`; }
function metaPath(tid)   { return isGroupId(tid) ? `${ROOT}/groups/${tid}/meta`   : `${ROOT}/dmMeta/${tid}`; }
function readsPath(tid)  { return isGroupId(tid) ? `${ROOT}/groups/${tid}/reads`  : `${ROOT}/reads/${tid}`; }
function typingPath(sc)  { return isGroupId(sc)  ? `${ROOT}/groups/${sc}/typing`  : `${ROOT}/typing/${sc}`; }

function localUid() {
  let u = localStorage.getItem("yc_uid");
  if (!u) { u = "u" + Math.random().toString(36).slice(2, 10); localStorage.setItem("yc_uid", u); }
  return u;
}
function nowPlaying() {
  const t = $("playerTitle"), a = $("playerArtist"), au = $("audioPlayer");
  const title = t ? t.textContent.trim() : "";
  if (!title || title === "No track playing") return null;
  const artist = a ? a.textContent.trim() : "";
  const firstArt = artist.split(',')[0];
  return title + (artist && artist !== "Select a track to play" ? " by " + firstArt : "");
}

/* ---------- profile picture lookup ---------- */
function pfpFor(uid) {
  if (uid === state.uid) return state.pfp || null;
  const prof = state.profiles[uid];
  if (prof && prof.pfp) return prof.pfp;
  const pres = state.people[uid];
  if (pres && pres.pfp) return pres.pfp;
  return null;
}
function nameFor(uid, fallback) {
  if (isGroupId(uid)) {
    const g = state.groups && state.groups[uid];
    return (g && g.name) || fallback || "Group chat";
  }
  const p = state.people[uid] || state.profiles[uid];
  if (p && p.name) return p.name;
  const t = state.threads && state.threads[uid];
  if (t && t.name) return t.name;
  return fallback || uid;
}

/* Anyone who used the app before profile pictures existed has no /profiles
   entry, so they'd vanish from People while still showing up in DMs. Scrape
   every place a uid+name pair can appear and merge them. */
function knownPeople() {
  const out = {};
  const put = (uid, name, extra) => {
    if (!uid || uid === state.uid) return;
    const cur = out[uid] || (out[uid] = { uid, name: null, lastSeen: 0 });
    if (!cur.name && name) cur.name = name;
    if (extra && extra > cur.lastSeen) cur.lastSeen = extra;
  };

  Object.values(state.people   || {}).forEach((p) => p && put(p.uid, p.name, p.lastSeen));
  Object.values(state.profiles || {}).forEach((p) => p && put(p.uid, p.name, p.ts));
  Object.entries(state.lastSeen || {}).forEach(([uid, ts]) => put(uid, null, Number(ts) || 0));
  // legacy source #1: anyone you've ever had a DM with
  Object.entries(state.threads || {}).forEach(([uid, t]) => t && put(uid, t.name, t.lastTs));
  // legacy source #2: anyone who has posted in the room recently
  (lastRoomMsgs || []).forEach((m) => { if (m && !m.system) put(m.uid, m.name, m.ts); });
  Object.values(state.stats || {}).forEach((st) => st && put(st.uid, st.name, 0));

  return out;
}

/* builds an avatar element: picture if there is one, otherwise the initial */
function avatarEl(uid, name, size) {
  const el = document.createElement("span");
  el.className = "yc-av" + (size ? " " + size : "");
  const src = pfpFor(uid);
  if (src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = name || "";
    img.loading = "lazy";
    img.onerror = () => { el.innerHTML = ""; el.textContent = initials(name); };
    el.appendChild(img);
  } else {
    el.textContent = initials(name);
  }
  return el;
}
function paintAvatarInto(id, uid, name) {
  const host = $(id);
  if (!host) return;
  host.innerHTML = "";
  const src = pfpFor(uid);
  if (src) {
    const img = document.createElement("img");
    img.src = src; img.alt = name || "";
    img.onerror = () => { host.innerHTML = ""; host.textContent = initials(name); };
    host.appendChild(img);
  } else {
    host.textContent = initials(name);
  }
}
function refreshOwnAvatars() {
  paintAvatarInto("ycMeAv", state.uid, state.name);
  paintAvatarInto("ycMeBigAv", state.uid, state.name);
  paintAvatarInto("ycGateAv", state.uid, state.name || ($("ycNameInput") && $("ycNameInput").value));
  const btn = $("ycMeBtn");
  if (btn) btn.style.display = state.name ? "" : "none";
}

/* ---------- image handling (the part that used to be flaky) ---------- */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("couldn't read that file"));
    reader.onabort = () => reject(new Error("reading was cancelled"));
    reader.readAsDataURL(file);
  });
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error("that file isn't a readable image"));
    img.decoding = "async";
    img.src = src;
  });
}
function approxBytes(dataUrl) {
  const i = dataUrl.indexOf(",");
  return Math.round((dataUrl.length - i - 1) * 0.75);
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("couldn't read that file"));
    reader.readAsArrayBuffer(file);
  });
}

function fmtSize(b) {
  if (b >= 1024 * 1024) return (b / (1024 * 1024)).toFixed(1).replace(/\.0$/, "") + "MB";
  return Math.max(1, Math.round(b / 1024)) + "KB";
}

function looksLikeGif(bytes) {
  // "GIF87a" / "GIF89a"
  return bytes.length > 6 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46;
}

/* More than one Graphic Control Extension block (0x21 0xF9 0x04) means more than
   one frame. Static GIFs still go through the normal compressor. */
function isAnimatedGif(bytes) {
  let frames = 0;
  for (let i = 0; i < bytes.length - 3; i++) {
    if (bytes[i] === 0x21 && bytes[i + 1] === 0xF9 && bytes[i + 2] === 0x04) {
      if (++frames > 1) return true;
    }
  }
  return false;
}

function canvasHasAlpha(ctx, w, h) {
  const data = ctx.getImageData(0, 0, w, h).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

async function shrinkImage(file, { maxDim, maxBytes, square = false }) {
  if (!file) throw new Error("no file");
  if (!/^image\//i.test(file.type || "")) throw new Error("that's not an image");
  if (file.size > RAW_MAX_BYTES) throw new Error("that picture is way too big");

  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);
  const sw = img.naturalWidth || img.width;
  const sh = img.naturalHeight || img.height;
  if (!sw || !sh) throw new Error("that image is empty");

  let scale = 1;
  let quality = 0.82;

  for (let pass = 0; pass < 6; pass++) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";

    if (square) {
      const side = Math.round(maxDim * scale);
      canvas.width = canvas.height = side;
      const crop = Math.min(sw, sh);                 // centre-crop to a square
      ctx.drawImage(img, (sw - crop) / 2, (sh - crop) / 2, crop, crop, 0, 0, side, side);
    } else {
      const limit = maxDim * scale;
      const ratio = Math.min(1, limit / Math.max(sw, sh));
      canvas.width  = Math.max(1, Math.round(sw * ratio));
      canvas.height = Math.max(1, Math.round(sh * ratio));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    // jpeg for opaque images, webp (keeps alpha) when there's any transparency
    const hasAlpha = canvasHasAlpha(ctx, canvas.width, canvas.height);
    const mime = hasAlpha ? "image/webp" : "image/jpeg";

    let out = canvas.toDataURL(mime, quality);
    // if the browser can't do webp it silently returns png, which ignores quality
    const lossy = out.startsWith("data:" + mime);

    while (lossy && approxBytes(out) > maxBytes && quality > 0.4) {
      quality -= 0.12;
      out = canvas.toDataURL(mime, quality);
    }
    if (approxBytes(out) <= maxBytes) return out;

    scale *= 0.72;      // still too heavy — shrink the canvas and go again
    quality = 0.75;
  }
  throw new Error("couldn't get that picture small enough");
}

/* Front door for every picture. Animated GIFs are handed through untouched so
   they keep moving; everything else (including static GIFs) gets compressed. */
async function prepareImage(file, { maxDim, maxBytes, square = false, gifMaxBytes }) {
  if (!file) throw new Error("no file");
  if (!/^image\//i.test(file.type || "")) throw new Error("that's not an image");
  if (file.size > RAW_MAX_BYTES) throw new Error("that picture is way too big");

  const maybeGif = /gif/i.test(file.type || "") || /\.gif$/i.test(file.name || "");
  if (maybeGif) {
    const bytes = new Uint8Array(await readFileAsArrayBuffer(file));
    if (looksLikeGif(bytes) && isAnimatedGif(bytes)) {
      if (file.size > gifMaxBytes) {
        throw new Error(`that GIF is ${fmtSize(file.size)} — animated ones can't be shrunk, so keep it under ${fmtSize(gifMaxBytes)}`);
      }
      return { dataUrl: await readFileAsDataURL(file), gif: true };
    }
  }
  return { dataUrl: await shrinkImage(file, { maxDim, maxBytes, square }), gif: false };
}

/* ---------- config guard ---------- */
function configLooksFake() {
  return !CFG.databaseURL || String(CFG.databaseURL).includes("PASTE");
}

/* ---------- boot ---------- */
let db, dbfns, auth, authfns;

async function boot() {
  if (configLooksFake()) {
    status("not set up", "", "bad");
    showGateSetupNotice();
    return;
  }
  try {
    const appMod  = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
    const dbMod   = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js");
    const authMod = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
    dbfns = dbMod;
    authfns = authMod;
    const app = appMod.initializeApp(CFG, "youtify-chat");
    db = dbMod.getDatabase(app);
    auth = authMod.getAuth(app);
  } catch (err) {
    console.error("[chat] firebase load failed", err);
    status("offline — couldn't load Firebase", "", "bad");
    return;
  }

  state.uid  = localUid();
  state.name = localStorage.getItem("yc_name");

  // command receiver + announcements run whether or not you've picked a name
  listenCommands();
  listenAnnouncement();
  listenProfiles();

  refreshOwnAvatars();

  status("signing in…", "", "");
  authfns.onAuthStateChanged(auth, (user) => {
    state.authUid = user ? user.uid : null;
    if (!user) endSessionLocal();
    if (user && state.name) {
      // either a fresh login/signup, or Firebase quietly restoring a
      // session it remembered from last time — either way we're good.
      ensureSession();
    } else {
      // no linked account yet: brand new visitor, or someone who used
      // Youtify before this update and needs to lock in a password.
      showGate(defaultGateMode());
    }
  });

  state.ready = true;
}

function defaultGateMode() { return state.name ? "secure" : "signup"; }

function showGateSetupNotice() {
  markLoaded();
  showView("gate");
  const note = $("ycGateNote");
  if (note) {
    note.innerHTML = "Chat isn't configured yet. Paste your Firebase config into the <b>YOUTIFY_CHAT_CONFIG</b> block near the bottom of this file.";
  }
  const gi = $("ycNameInput"); if (gi) gi.disabled = true;
  const pi = $("ycPassInput"); if (pi) pi.disabled = true;
  const p2 = $("ycPass2Input"); if (p2) p2.disabled = true;
  const sb = $("ycGateSubmit"); if (sb) sb.disabled = true;
}

/* ---------- moderation ----------
   Mute used to be a one-off command that only set a variable, so refreshing the
   page cleared it. It lives in the database now and is re-read on every load. */
function applyMuted(on) {
  const changed = state.muted !== on;
  state.muted = !!on;
  if (state.muted) { try { stopTyping(); } catch (e) {} }
  const blocked = state.muted || state.kicked;

  const i = $("ycInput");
  if (i) {
    i.disabled = blocked;
    if (blocked) { i.value = ""; i.placeholder = state.kicked ? "You've been removed…" : "You've been muted…"; }
    else i.placeholder = state.view === "thread" ? ("message " + (state.openThread?.name || "")) : "message the room…";
  }
  const pb = $("ycPictureBtn"); if (pb) pb.disabled = blocked;
  const eb = $("ycEmojiBtn");    if (eb) eb.disabled = blocked;
  const sb = $("ycSendBtn");    if (sb) sb.disabled = blocked;

  if (changed) say(state.muted ? "You've been muted in chat." : "You can chat again.");
}

function applyBanned(on) {
  const changed = state.kicked !== !!on;
  state.kicked = !!on;
  if (state.kicked) {
    try { if (meRef) dbfns.remove(meRef); } catch (e) {}
    close();
  }
  applyMuted(state.muted);          // re-evaluate the composer either way
  if (changed) say(state.kicked ? "You've been removed from the chat." : "You're allowed back in.");
}

function listenModeration() {
  const { ref, onValue } = dbfns;
  return onValue(ref(db, `${ROOT}/moderation/${state.uid}`), (snap) => {
    const m = snap.val() || {};
    applyBanned(!!m.banned);
    applyMuted(!!m.muted);
  });
}

/* ---------- session / presence ---------- */
let meRef = null;
let connectedNow = false;
let reconnectTimer = null;
let profileHydrated = false;

/* startSession() attaches a pile of listeners and intervals and used to have no
   way back out. Logging out and in again in the same tab stacked a second copy
   of every one of them — double heartbeats, double renders. */
let sessionStarted = false;
const sessionTeardown = [];
function trackSession(x) { if (x) sessionTeardown.push(x); return x; }
function trackInterval(id) { sessionTeardown.push(() => clearInterval(id)); return id; }
function trackTimeout(id)  { sessionTeardown.push(() => clearTimeout(id));  return id; }

function ensureSession() {
  if (sessionStarted || !state.authUid || !state.name || !db) return;
  sessionStarted = true;
  startSession();
}

function endSessionLocal() {
  if (!sessionStarted) return;
  sessionStarted = false;
  try { if (jam.id && jam.host) endJam(); else if (jam.id) leaveJam(); } catch (e) {}
  try { stopTyping(); } catch (e) {}
  try { if (meRef) dbfns.remove(meRef); } catch (e) {}
  while (sessionTeardown.length) {
    const fn = sessionTeardown.pop();
    try { fn(); } catch (e) {}
  }
  meRef = null;
  profileHydrated = false;
  state.people = {}; state.profiles = {}; state.threads = {};
  state.stats = {}; state.lastSeen = {}; state.typing = {};
  state.people = {}; state.threads = {}; state.groups = {};
  lastRoomMsgs = null; lastThreadMsgs = null;
}

function startSession() {
  const { ref, set, onValue, onDisconnect, update } = dbfns;

  meRef = ref(db, `${ROOT}/presence/${state.uid}`);

  const lastSeenRef = ref(db, `${ROOT}/lastSeen/${state.uid}`);

  trackSession(onValue(ref(db, ".info/connected"), (snap) => {
    if (snap.val() !== true) {
      status("reconnecting…", "", "bad");
      /* Wait a moment before covering the chat — Firebase blips offline for a
         fraction of a second all the time, and flashing a full-screen overlay
         for each one would be worse than the drop itself. */
      clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        if (!connectedNow) setLoading(true, chatLoaded ? "reconnecting…" : "connecting…");
      }, 1500);
      connectedNow = false;
      return;
    }
    connectedNow = true;
    clearTimeout(reconnectTimer);
    // back online: drop the overlay once we've shown real data at least once
    if (chatLoaded) setLoading(false);
    if (state.kicked) return;        // a banned tab must not re-announce itself
    onDisconnect(meRef).remove();
    // stamped by the server when this tab drops, so "last seen" stays honest
    // even if the browser is killed without warning
    try { onDisconnect(lastSeenRef).set(dbfns.serverTimestamp()); } catch (e) {}
    set(lastSeenRef, Date.now()).catch(() => {});
    set(meRef, {
      uid: state.uid,
      name: state.name || "unnamed",
      joined: Date.now(),
      lastSeen: Date.now(),
      track: nowPlaying() || null,
      agent: (navigator.userAgent || "").slice(0, 120),
      version: state.version || null,
      hasPfp: !!state.pfp
    }).catch((err) => console.error("[chat] presence write failed", err));
    status("connected", "as " + state.name, "ok");
  }));

  publishProfile();

  // heartbeat + now-playing report
  let beats = 0;
  let lastTrack;
  trackInterval(setInterval(() => {
    if (state.kicked || !meRef) return;
    const t = nowPlaying() || null;
    const due = (++beats % 4 === 0);
    if (t === lastTrack && !due) return;
    lastTrack = t;
    update(meRef, { lastSeen: Date.now(), track: t, name: state.name || "unnamed" }).catch(() => {});
    if (due) set(lastSeenRef, Date.now()).catch(() => {});
  }, 15000));

  // when the host hits play/pause/seek/skip, push it out without waiting for the loop
  ["play", "pause", "seeked", "ended", "loadedmetadata"].forEach((ev) => {
    const a = document.getElementById("audioPlayer");
    if (a) a.addEventListener(ev, () => { if (jam.id && jam.host && !jam.applying) publishJam(true); });
  });

  window.addEventListener("beforeunload", () => {
    try { if (meRef) dbfns.remove(meRef); } catch (e) {}
    try { if (jam.id && jam.host) dbfns.remove(dbfns.ref(db, `${ROOT}/jams/${jam.id}`)); } catch (e) {}
    try { stopTyping(); } catch (e) {}
  });

  trackSession(listenModeration());
  trackSession(listenJams());
  startJamLoop();
  trackSession(listenPresence());
  trackSession(listenLastSeen());
  trackSession(listenRoom());
  trackSession(listenThreads());
  trackSession(listenGroups());
  trackSession(listenStats());
  if (!chatLoaded) setLoading(true, "loading chat…");

  hydrateProfile().then(pullFullStats);
  pullKeys();
  refreshOwnAvatars();

  // stats live in IndexedDB and load async, so give them a beat before the first push
  trackTimeout(setTimeout(() => publishStats(true), 4000));
  trackInterval(setInterval(() => publishStats(false), 60000));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { stopTyping(); return; }
    publishStats(false);
    markVisibleRead();
  });
  window.addEventListener("focus", markVisibleRead);

  showView("room");
}

/* profiles live in their own node so message payloads stay tiny */
function publishProfile() {
  if (!db || !state.name) return Promise.resolve();
  // On a new device this would otherwise fire before hydrateProfile() has read
  // the server, wiping your picture and bio with this device's blank ones.
  if (!profileHydrated) return Promise.resolve();
  const { ref, set } = dbfns;
  return set(ref(db, `${ROOT}/profiles/${state.uid}`), {
    uid: state.uid,
    name: state.name,
    bio: (state.bio || "").slice(0, 160),
    handle: state.handle || null,
    pfp: state.pfp || null,
    ts: Date.now()
  }).catch((err) => {
    console.error("[chat] profile write failed", err);
    say("Couldn't save your profile picture — try a smaller one.");
  });
}

/* The server owns your profile now; localStorage is only a cache so the avatar
   isn't blank for a second on reload. Pulling it down on login is what makes a
   second device show your picture and bio instead of nothing. */
async function hydrateProfile() {
  if (!db || !state.uid) return;
  try {
    const snap = await dbfns.get(dbfns.ref(db, `${ROOT}/profiles/${state.uid}`));
    const rec = snap && snap.val();
    if (rec) {
      if (rec.name) { state.name = rec.name; try { localStorage.setItem("yc_name", rec.name); } catch (e) {} }
      state.pfp = rec.pfp || null;
      state.bio = rec.bio || "";
      state.handle = rec.handle || null;
      try {
        if (state.pfp) localStorage.setItem("yc_pfp", state.pfp);
        else localStorage.removeItem("yc_pfp");
        localStorage.setItem("yc_bio", state.bio);
      } catch (e) {}
      profileHydrated = true;
      refreshOwnAvatars();
      if (state.view === "me") { const b = $("ycMeBio"); if (b) { b.value = state.bio; paintBioCount(); } }
    } else {
      // first time on the server — push whatever this device has
      profileHydrated = true;
      await publishProfile();
    }
  } catch (err) {
    console.error("[chat] couldn't load your profile", err);
  }
}

function listenProfiles() {
  const { ref, onChildAdded, onChildChanged, onChildRemoved } = dbfns;
  const r = ref(db, `${ROOT}/profiles`);
  const upd = (snap) => {
    const v = snap.val() || {};
    const old = state.profiles[snap.key];
    state.profiles[snap.key] = v;
    if (!old || old.name !== v.name || old.pfp !== v.pfp || old.handle !== v.handle || old.bio !== v.bio) {
      bumpPeople();
      schedule("repaint", repaint);
    }
  };
  onChildAdded(r, upd);
  onChildChanged(r, upd);
  onChildRemoved(r, (snap) => { delete state.profiles[snap.key]; bumpPeople(); schedule("repaint", repaint); });
}

function listenLastSeen() {
  const { ref, onValue } = dbfns;
  return onValue(ref(db, `${ROOT}/lastSeen`), (snap) => {
    state.lastSeen = snap.val() || {};
    if (state.view === "people") schedule("people", renderPeople);
  });
}

let presSig = "", presNames = "";
function listenPresence() {
  const { ref, onValue } = dbfns;
  presSig = ""; presNames = "";
  return onValue(ref(db, `${ROOT}/presence`), (snap) => {
    state.people = snap.val() || {};
    const list = Object.values(state.people).filter(Boolean);

    const names = list.map((p) => (p.uid || "") + "|" + (p.name || "")).sort().join("\n");
    if (names !== presNames) { presNames = names; bumpCandidates(); }

    const sig = list.map((p) => (p.uid || "") + "|" + (p.name || "") + "|" + (p.track || "")).sort().join("\n");
    if (sig === presSig) return;
    presSig = sig;

    const others = Object.keys(state.people).filter((k) => k !== state.uid).length;
    const c = $("ycOnlineCount"); if (c) c.textContent = others ? String(others) : "";
    if (state.view === "people") schedule("people", renderPeople);
    if (state.view === "dms") schedule("dms", renderThreads);
    if (state.view === "thread" && state.openThread) refreshThreadHead();
  });
}

/* redraw whatever is currently on screen (used when profiles change) */
function repaint() {
  refreshOwnAvatars();
  if (state.view === "people") renderPeople();
  else if (state.view === "dms") renderThreads();
  else if (state.view === "thread") { refreshThreadHead(); if (lastThreadMsgs) renderMessages($("ycThreadScroll"), lastThreadMsgs, "No messages yet — say hi."); }
  else if (state.view === "room" && lastRoomMsgs) renderMessages($("ycRoomScroll"), lastRoomMsgs, "No messages yet. Say something 👀");
  if (state.view === "profile" && state.openProfile) renderProfile(state.openProfile);
}

/* ---------- public room ---------- */
let lastRoomMsgs = null, lastThreadMsgs = null;

/* coalesce bursts of updates into one paint per frame */
const _sched = {};
function schedule(name, fn) {
  if (_sched[name]) return;
  _sched[name] = requestAnimationFrame(() => {
    _sched[name] = 0;
    try { fn(); } catch (e) { console.error("[chat] render failed", e); }
  });
}

const ROOM_LIMIT = 100;

function listenRoom() {
  const { ref, query, limitToLast, onChildAdded, onChildChanged, onChildRemoved } = dbfns;
  const q = query(ref(db, `${ROOT}/room`), limitToLast(ROOM_LIMIT));
  const map = new Map();

  const rebuild = () => {
    lastRoomMsgs = [...map.values()].sort((a, b) => (a.ts || 0) - (b.ts || 0));
    markLoaded();
    renderMessages($("ycRoomScroll"), lastRoomMsgs, "No messages yet. Say something 👀");
    if (canSee("room")) markRoomRead(); else recountUnread();
    if (state.view === "people") renderPeople();
  };
  const kick = () => schedule("room", rebuild);

  const put = (snap) => {
    const m = { key: snap.key, ...snap.val() };
    map.set(snap.key, m);
    maybeNotify(m, "room");
    kick();
  };

  const offs = [
    onChildAdded(q, put),
    onChildChanged(q, put),
    onChildRemoved(q, (s) => { map.delete(s.key); kick(); })
  ];
  // empty room never fires a child event, so make sure the loader still clears
  const t = setTimeout(kick, 1200);

  return () => { clearTimeout(t); offs.forEach((f) => { try { f(); } catch (e) {} }); };
}

/* ---------- DM threads ---------- */
function listenThreads() {
  const { ref, onValue } = dbfns;
  return onValue(ref(db, `${ROOT}/dmIndex/${state.uid}`), (snap) => {
    const prevThreads = state.threads || {};
    state.threads = snap.val() || {};
    bumpPeople();
    // a DM in a thread you're not looking at still deserves an alert
    Object.entries(state.threads).forEach(([uid, t]) => {
      if (!t || t.lastFrom === state.uid) return;
      const before = prevThreads[uid];
      if (before && (before.lastTs || 0) >= (t.lastTs || 0)) return;
      maybeNotify(
        { uid, key: uid + ":" + t.lastTs, name: t.name || nameFor(uid), text: t.lastText, ts: t.lastTs },
        "dm", uid
      );
    });
    recountUnread();
    if (state.view === "dms") renderThreads();
    if (state.view === "people") renderPeople();
  });
}

function readKey(other) { return `yc_read_${threadId(state.uid, other)}`; }
const ROOM_READ_KEY = "yc_read_room";

function readStamp(key) { return Number(localStorage.getItem(key) || 0); }
/* Only ever move a read marker forwards, so an out-of-order update can't
   un-read something you already saw. */
function bumpRead(key, ts) {
  const next = Math.max(readStamp(key), Number(ts) || 0);
  try { localStorage.setItem(key, String(next)); } catch (e) {}
}

function panelIsOpen() {
  const p = $("ycPanel");
  return !!p && p.classList.contains("open");
}
/* A message only counts as read if it was actually on screen: panel open,
   tab in the foreground, and the right view showing. */
function canSee(view) {
  return panelIsOpen() && !document.hidden && state.view === view;
}

/* ============================ LISTENING JAMS ============================
   One person hosts; everyone else follows. The host publishes what it's playing
   plus the position and the wall-clock time it was true, so guests can work out
   where playback *should* be right now rather than where it was when the
   message was sent. Guests only nudge themselves when drift gets audible. */
const JAM_DRIFT     = 0.45;    // seconds of slop we tolerate before correcting
const JAM_HEARTBEAT = 4000;    // host re-publishes at least this often
const JAM_STALE     = 20000;   // a jam with no heartbeat this long is dead

const jam = {
  id: null,          // jam you're in
  host: false,
  data: null,        // the jam node
  unsub: null,
  unsubList: null,
  list: {},          // all open jams, for the "join" prompt
  applying: false,   // guard so our own seeks don't look like host input
  wantId: null,      // track we're waiting on a download for
  lastSent: null,
  dismissed: new Set() // jam "id:createdAt" keys you've declined or left — stops the invite from nagging you
};

/* identifies one specific invite (not just the host) so a new jam from the
   same person later isn't dismissed just because the old one was */
function jamKey(j) { return `${j.id}:${j.createdAt || 0}`; }

function dismissJam(j) {
  jam.dismissed.add(jamKey(j));
  paintJam();
}

function visibleOpenJams() {
  return openJams().filter((j) => !jam.dismissed.has(jamKey(j)));
}

function P() { return window.YoutifyPlayer || null; }

/* ---------- host side ---------- */
function jamSnapshot() {
  const p = P();
  const np = p && p.nowPlaying();
  if (!np) return null;
  return {
    key: np.key || null,
    id: np.id || null,
    title: np.title,
    artist: np.artist,
    duration: np.duration,
    position: np.position,
    playing: np.playing,
    at: Date.now()
  };
}

function jamStateChanged(a, b) {
  if (!a || !b) return true;
  if (a.key !== b.key || a.playing !== b.playing) return true;
  // a jump the listener would actually notice
  return Math.abs((a.position || 0) - (b.position || 0)) > 1.5;
}

async function publishJam(force) {
  if (!jam.id || !jam.host || !db) return;
  const snap = jamSnapshot();
  if (!snap) return;
  if (!force && !jamStateChanged(snap, jam.lastSent) &&
      Date.now() - ((jam.lastSent && jam.lastSent.at) || 0) < JAM_HEARTBEAT) return;
  jam.lastSent = snap;
  try { await dbfns.update(dbfns.ref(db, `${ROOT}/jams/${jam.id}`), { now: snap, beat: Date.now() }); }
  catch (err) { console.error("[jam] publish failed", err); }
}

async function startJam(inviteUid) {
  if (!state.name || !db) return;
  if (jam.id) { say("You're already in a jam."); return; }
  const id = state.uid;                       // one jam per person, keeps it simple
  const now = jamSnapshot();
  const invite = inviteUid || null;            // set only when started from a DM — makes it private
  try {
    await dbfns.set(dbfns.ref(db, `${ROOT}/jams/${id}`), {
      id, host: state.uid, hostName: state.name,
      createdAt: Date.now(), beat: Date.now(),
      now: now || null,
      invite,
      members: { [state.uid]: { name: state.name, ts: Date.now() } }
    });
    try { dbfns.onDisconnect(dbfns.ref(db, `${ROOT}/jams/${id}`)).remove(); } catch (e) {}
    jam.id = id; jam.host = true; jam.lastSent = null;
    watchJam(id);
    say(invite ? `Private jam started — just for ${nameFor(invite)}.` : "Jam started — people can join from the chat panel.");
  } catch (err) {
    console.error("[jam] start failed", err);
    say("Couldn't start a jam.");
  }
}

async function endJam() {
  if (!jam.id || !jam.host) return;
  const id = jam.id;
  leaveJamLocal();
  try { await dbfns.remove(dbfns.ref(db, `${ROOT}/jams/${id}`)); } catch (e) {}
  say("Jam ended.");
}

/* ---------- guest side ---------- */
async function joinJam(id) {
  if (!id || !db || !state.name) return;
  if (jam.id === id) return;
  if (jam.id) await leaveJam();
  jam.id = id; jam.host = false; jam.wantId = null;
  try {
    await dbfns.set(dbfns.ref(db, `${ROOT}/jams/${id}/members/${state.uid}`),
                    { name: state.name, ts: Date.now() });
    try { dbfns.onDisconnect(dbfns.ref(db, `${ROOT}/jams/${id}/members/${state.uid}`)).remove(); } catch (e) {}
  } catch (err) { console.error("[jam] join failed", err); }
  watchJam(id);
  say("Listening along.");
}

function leaveJamLocal() {
  if (jam.unsub) { try { jam.unsub(); } catch (e) {} }
  jam.unsub = null; jam.id = null; jam.host = false;
  jam.data = null; jam.wantId = null; jam.lastSent = null;
  paintJam();
}

async function leaveJam() {
  const id = jam.id;
  if (!id) return;
  const wasHost = jam.host;
  const createdAt = jam.data && jam.data.createdAt; // grab before leaveJamLocal() clears jam.data
  leaveJamLocal();
  if (wasHost) { try { await dbfns.remove(dbfns.ref(db, `${ROOT}/jams/${id}`)); } catch (e) {} }
  else {
    try { await dbfns.remove(dbfns.ref(db, `${ROOT}/jams/${id}/members/${state.uid}`)); } catch (e) {}
    // don't immediately re-prompt to rejoin the same invite you just left
    jam.dismissed.add(`${id}:${createdAt || 0}`);
  }
  say("Left the jam.");
}

function watchJam(id) {
  if (jam.unsub) { try { jam.unsub(); } catch (e) {} }
  jam.unsub = dbfns.onValue(dbfns.ref(db, `${ROOT}/jams/${id}`), (snap) => {
    const v = snap.val();
    if (!v) { if (jam.id === id) { leaveJamLocal(); say("The jam ended."); } return; }
    jam.data = v;
    paintJam();
    if (!jam.host) followJam(v);
  });
}

/* Where should playback be right now, given when the host said what it said? */
function jamTargetPosition(now) {
  const base = Number(now.position) || 0;
  if (!now.playing) return base;
  return base + Math.max(0, (Date.now() - (Number(now.at) || Date.now())) / 1000);
}

async function followJam(v) {
  const p = P();
  const now = v && v.now;
  if (!p || !now || jam.applying) return;

  if (!now.key) return;

  const idx = p.findIndexByKey(now.key);
  if (idx === -1) {
    // Missing it. YouTube tracks can be pulled in; a local file nobody else has
    // simply isn't available, and we say so rather than spinning on "getting
    // the track" forever.
    if (jam.wantId !== now.key) {
      jam.wantId = now.key;
      const ok = now.id ? p.fetchById(now.id, now.title, now.artist) : false;
      say(ok ? "Getting " + (now.title || "the track") + "…"
             : "You don't have " + (now.title || "that track") + " — you'll be quiet until the next one.");
    }
    paintJam();
    return;
  }
  jam.wantId = null;

  const target = jamTargetPosition(now);
  const current = p.nowPlaying();
  const sameTrack = current && current.key === now.key;

  jam.applying = true;
  try {
    if (!sameTrack) {
      if (now.playing) await p.playAt(idx, target);
      else { await p.playAt(idx, target); p.pause(); }
    } else {
      if (Math.abs(p.position() - target) > JAM_DRIFT) p.seek(target);
      if (now.playing && !p.isPlaying()) p.resume();
      if (!now.playing && p.isPlaying()) p.pause();
    }
  } catch (err) {
    console.error("[jam] follow failed", err);
  } finally {
    // let the audio element settle before we trust our own readings again
    setTimeout(() => { jam.applying = false; }, 250);
  }
}

/* ---------- discovery ---------- */
function listenJams() {
  return dbfns.onValue(dbfns.ref(db, `${ROOT}/jams`), (snap) => {
    jam.list = snap.val() || {};
    paintJam();
  });
}

function openJams() {
  const now = Date.now();
  return Object.values(jam.list || {})
    .filter((j) => j && j.host && j.host !== state.uid && (now - (j.beat || j.createdAt || 0)) < JAM_STALE)
    .filter((j) => !j.invite || j.invite === state.uid); // private jams only show to the person invited
}

function jamMemberNames() {
  const m = (jam.data && jam.data.members) || {};
  return Object.entries(m).map(([uid, v]) => (uid === state.uid ? "you" : (v && v.name) || nameFor(uid)));
}

/* ---------- the bar in the chat panel ---------- */
function paintJam() {
  const bar = $("ycJam");
  if (!bar) return;
  const txt = bar.querySelector(".txt");
  const acts = bar.querySelector(".acts");
  if (!txt || !acts) return;
    const sigNow = JSON.stringify([
    jam.id, jam.host, jam.wantId,
    jam.data && [jam.data.hostName, jam.data.now && jam.data.now.title, Object.keys(jam.data.members || {}).length],
    visibleOpenJams().map((j) => [j.id, j.hostName, j.invite, j.now && j.now.title])
  ]);
  if (sigNow === jam._sig) return;
  jam._sig = sigNow;
  acts.innerHTML = "";

  const mk = (label, fn, cls) => {
    const b = document.createElement("button");
    b.textContent = label;
    if (cls) b.className = cls;
    b.onclick = (e) => { e.stopPropagation(); fn(); };
    acts.appendChild(b);
    return b;
  };

  if (jam.id && jam.data) {
    const names = jamMemberNames();
    const who = names.length > 1 ? names.length + " listening" : "waiting for people";
    const track = jam.data.now && jam.data.now.title;
    if (jam.host) {
      txt.textContent = "Hosting a jam · " + who;
      mk("End", endJam, "danger");
    } else {
      const waiting = jam.wantId
        ? (String(jam.wantId).startsWith("yt:") ? "Getting the track…" : "You don't have this one")
        : null;
      txt.textContent = (waiting || ("Listening with " + (jam.data.hostName || "someone"))) +
                        (track ? " · " + track : "");
      mk("Leave", leaveJam);
    }
    bar.classList.add("on");
    return;
  }

  const open = visibleOpenJams();
  if (open.length) {
    const j = open[0];
    const verb = j.invite ? "invited you to a jam" : "is hosting a jam";
    txt.textContent = (j.hostName || "Someone") + " " + verb +
                      (j.now && j.now.title ? " · " + j.now.title : "");
    mk("Join", () => joinJam(j.id), "accent");
    mk("Dismiss", () => dismissJam(j));
    bar.classList.add("on");
    return;
  }

  // no ambient "listen together" prompt anymore — jams are invite-only,
  // started explicitly with /jam from inside a DM
  bar.classList.remove("on");
  txt.textContent = "";
}

/* host publishes on a loop; guests re-check drift on the same loop */
function startJamLoop() {
  trackInterval(setInterval(() => {
    // repaint every tick: the idle "start a jam" state depends on what's
    // playing locally, which fires no database event at all
    paintJam();
    if (!jam.id) return;
    if (jam.host) publishJam(false);
    else if (jam.data) followJam(jam.data);
  }, 2000));
}

/* ---------- desktop notifications ----------
   Only for things actually aimed at you: a DM, or an @mention in the room. The
   room is too busy to notify on every message. Nothing fires while you're
   looking at the conversation it came from. */
const NOTIF_KEY = "yc_notifications";
function notifsOn() {
  try { return localStorage.getItem(NOTIF_KEY) === "1"; } catch (e) { return false; }
}
function notifSupported() { return typeof Notification !== "undefined"; }

async function toggleNotifs() {
  if (!notifSupported()) { say("This browser doesn't support notifications."); return; }
  if (notifsOn()) {
    try { localStorage.setItem(NOTIF_KEY, "0"); } catch (e) {}
    paintNotifSwitch();
    say("Notifications off.");
    return;
  }
  let perm = Notification.permission;
  if (perm === "default") {
    try { perm = await Notification.requestPermission(); } catch (e) { perm = "denied"; }
  }
  if (perm !== "granted") {
    say("Your browser is blocking notifications for this page.");
    paintNotifSwitch();
    return;
  }
  try { localStorage.setItem(NOTIF_KEY, "1"); } catch (e) {}
  paintNotifSwitch();
  say("Notifications on.");
}
function paintNotifSwitch() {
  const sw = $("ycNotifSwitch");
  if (!sw) return;
  const on = notifsOn() && notifSupported() && Notification.permission === "granted";
  sw.classList.toggle("on", on);
  const note = $("ycNotifNote");
  if (note) {
    note.textContent = !notifSupported() ? "Not supported in this browser."
      : Notification.permission === "denied" ? "Blocked in your browser settings."
      : "";
  }
}

/* keyed so the same message can't notify twice across re-renders */
const notified = new Set();
function notify(title, body, tag, onClick) {
  if (!notifsOn() || !notifSupported() || Notification.permission !== "granted") return;
  try {
    const n = new Notification(title, { body: String(body || "").slice(0, 140), tag, silent: false });
    n.onclick = () => {
      try { window.focus(); } catch (e) {}
      try { open(); if (onClick) onClick(); } catch (e) {}
      n.close();
    };
    setTimeout(() => { try { n.close(); } catch (e) {} }, 12000);
  } catch (e) {}
}

/* Decides whether a message deserves an alert. Deliberately quiet: nothing if
   you can already see it, nothing for your own messages, nothing for old ones. */
function maybeNotify(m, kind, threadUid) {
  if (!m || m.system || m.uid === state.uid) return;
  if (!sessionStarted || state.kicked) return;

  /* Mark it handled before any of the suppression checks. Otherwise a message
     you were already looking at — or one that arrived while notifications were
     off — sits unmarked and fires later as a backlog the moment something
     changes. */
  const seenKey = kind + ":" + (m.key || (threadUid + ":" + m.ts));
  if (notified.has(seenKey)) return;
  notified.add(seenKey);
  if (notified.size > 400) notified.clear();

  if ((m.ts || 0) < BOOT) return;                       // don't replay history on load
  if (Date.now() - (m.ts || 0) > 60000) return;         // nor anything stale

  /* Nudge once, the first time something would have alerted them, so the
     feature isn't buried in a settings panel nobody opens. */
  if (!notifsOn() && notifSupported() && Notification.permission !== "denied") {
    try {
      if (!localStorage.getItem("yc_notif_nudged")) {
        localStorage.setItem("yc_notif_nudged", "1");
        say("Want alerts when you're on another tab? Turn on Notifications in your profile.");
      }
    } catch (e) {}
  }

  if (kind === "room") {
    if (!mentionsMe(m)) return;                         // room only alerts on @you
    if (canSee("room")) return;
    notify(
      (m.name || nameFor(m.uid)) + " mentioned you",
      imageSrcOf(m) ? (m.gif ? "Sent a GIF" : "Sent a picture") : m.text,
      "room:" + m.key,
      () => showView("room")
    );
  } else {
    const looking = canSee("thread") && state.openThread && state.openThread.uid === threadUid;
    if (looking) return;
    notify(
      m.name || nameFor(m.uid),
      imageSrcOf(m) ? (m.gif ? "Sent a GIF" : "Sent a picture") : m.text,
      "dm:" + m.key,
      () => openThread(threadUid, nameFor(threadUid))
    );
  }
}

/* ---------- typing indicators ----------
   typing/<scope>/<uid> = { name, ts }. Writes are throttled hard, and readers
   treat anything older than TYPING_TTL as "stopped" — so a tab that dies
   mid-sentence can't leave someone typing forever. */
const TYPING_TTL    = 6000;    // how long an entry stays believable
const TYPING_REPEAT = 2500;    // don't re-announce more often than this
const TYPING_IDLE   = 3500;    // stop announcing after this long without a keystroke

let typingLastSent = 0;
let typingIdleTimer = null;
let typingTicker = null;

function typingScopeKey() {
  if (state.view === "thread" && state.openThread) return threadId(state.uid, state.openThread.uid);
  if (state.view === "room") return "room";
  return null;
}

function typingRef(scope) {
  return dbfns.ref(db, `${typingPath(scope)}/${state.uid}`);
}

function announceTyping() {
  if (!db || !state.name || state.kicked || state.muted) return;
  const scope = typingScopeKey();
  if (!scope) return;

  clearTimeout(typingIdleTimer);
  typingIdleTimer = setTimeout(() => stopTyping(), TYPING_IDLE);

  const now = Date.now();
  if (now - typingLastSent < TYPING_REPEAT) return;   // throttle the writes
  typingLastSent = now;

  const r = typingRef(scope);
  dbfns.set(r, { name: state.name, ts: now }).catch(() => {});
  try { dbfns.onDisconnect(r).remove(); } catch (e) {}
}

function stopTyping(scope) {
  clearTimeout(typingIdleTimer);
  typingIdleTimer = null;
  typingLastSent = 0;
  const key = scope || typingScopeKey();
  if (!db || !state.name || !key) return;
  dbfns.remove(typingRef(key)).catch(() => {});
}

function listenTyping(scope) {
  if (state.unsubTyping) { try { state.unsubTyping(); } catch (e) {} state.unsubTyping = null; }
  state.typing = {};
  state.typingScope = scope;
  paintTyping();
  if (!scope || !db) return;
  const { ref, onValue } = dbfns;
  state.unsubTyping = onValue(ref(db, typingPath(scope)), (snap) => {
    if (state.typingScope !== scope) return;
    state.typing = snap.val() || {};
    paintTyping();
  });
}

function typingNames() {
  const now = Date.now();
  return Object.entries(state.typing || {})
    .filter(([uid, v]) => uid !== state.uid && v && (now - (v.ts || 0) < TYPING_TTL))
    .map(([uid, v]) => nameFor(uid, v.name));
}

function paintTyping() {
  const el = $("ycTyping");
  if (!el) return;
  const names = typingNames();
  if (!names.length) { el.classList.remove("on"); el.querySelector(".who").textContent = ""; return; }

  let label;
  if (names.length === 1) label = names[0] + " is typing";
  else if (names.length === 2) label = names[0] + " and " + names[1] + " are typing";
  else label = names.length + " people are typing";

  el.querySelector(".who").textContent = label;
  el.classList.add("on");
}

/* Entries expire by time, not by an event, so nudge the label periodically. */
function startTypingTicker() {
  clearInterval(typingTicker);
  typingTicker = setInterval(() => { if (typingNames !== undefined) paintTyping(); }, 1500);
}

/* ---------- read receipts ----------
   Each side publishes the timestamp of the newest message it has actually seen
   to reads/<threadId>/<uid>. markThreadRead only fires when the message was
   genuinely on screen, so a receipt means what it says. */
const RECEIPTS_KEY = "yc_read_receipts";
function receiptsOn() {
  try { return localStorage.getItem(RECEIPTS_KEY) !== "0"; } catch (e) { return true; }
}

function publishRead(otherUid, ts) {
  if (!db || !state.name || !otherUid || !ts) return;
  if (!receiptsOn()) return;
  const { ref, set } = dbfns;
  set(ref(db, `${readsPath(threadId(state.uid, otherUid))}/${state.uid}`), ts)
    .catch((err) => console.error("[chat] read receipt failed", err));
}

function listenThreadReads(otherUid) {
  const { ref, onValue } = dbfns;
  if (state.unsubReads) { try { state.unsubReads(); } catch (e) {} state.unsubReads = null; }
  state.threadReads = {};
  state.unsubReads = onValue(ref(db, readsPath(threadId(state.uid, otherUid))), (snap) => {
    if (!state.openThread || state.openThread.uid !== otherUid) return;
    state.threadReads = snap.val() || {};
    if (lastThreadMsgs) renderMessages($("ycThreadScroll"), lastThreadMsgs, "No messages yet — say hi.");
  });
}

/* What to show under your newest message in a DM. */
function receiptFor(m) {
  if (!receiptsOn()) return null;                 // turning them off hides theirs too
  const other = state.openThread && state.openThread.uid;
  if (!other) return null;
  if (isGroupId(other)) {
    const seen = Object.entries(state.threadReads || {})
      .filter(([u, ts]) => u !== state.uid && Number(ts) >= (m.ts || 0)).length;
    return seen ? "Seen by " + seen : "Sent";
  }
  const theirs = Number((state.threadReads || {})[other] || 0);
  if (theirs && theirs >= (m.ts || 0)) return "Seen " + shortTime(theirs);
  return "Sent";
}

function toggleReceipts() {
  const on = !receiptsOn();
  try { localStorage.setItem(RECEIPTS_KEY, on ? "1" : "0"); } catch (e) {}
  paintReceiptSwitch();
  if (on) {
    // catch the other side up on everything already read
    Object.keys(allThreads()).forEach((uid) => {
      const seen = readStamp(readKey(uid));
      if (seen) publishRead(uid, seen);
    });
  } else {
    const { ref, remove } = dbfns;
    Object.keys(allThreads()).forEach((uid) => {
      remove(ref(db, `${readsPath(threadId(state.uid, uid))}/${state.uid}`)).catch(() => {});
    });
  }
  if (state.view === "thread" && lastThreadMsgs) {
    renderMessages($("ycThreadScroll"), lastThreadMsgs, "No messages yet — say hi.");
  }
  say(on ? "Read receipts on." : "Read receipts off — you won't see theirs either.");
}
function paintReceiptSwitch() {
  const sw = $("ycReceiptSwitch");
  if (sw) sw.classList.toggle("on", receiptsOn());
}

function markRoomRead() {
  if (!lastRoomMsgs || !lastRoomMsgs.length) return;
  bumpRead(ROOM_READ_KEY, lastRoomMsgs[lastRoomMsgs.length - 1].ts || 0);
  recountUnread();
}
function markThreadRead(uid, ts) {
  if (!uid) return;
  const t = allThreads()[uid];
  // Fall back to the newest message actually loaded, not just the dmIndex
  // preview — the index can lag, which would hold the receipt back.
  const onScreen = (state.openThread && state.openThread.uid === uid && lastThreadMsgs && lastThreadMsgs.length)
    ? (lastThreadMsgs[lastThreadMsgs.length - 1].ts || 0)
    : 0;
  const stamp = ts != null ? ts : Math.max(onScreen, (t && t.lastTs) || 0);
  bumpRead(readKey(uid), stamp);
  publishRead(uid, readStamp(readKey(uid)));
  recountUnread();
}
/* Called whenever visibility changes — catches "panel was open on a thread but
   the tab was in the background". */
function markVisibleRead() {
  if (canSee("room")) markRoomRead();
  else if (canSee("thread") && state.openThread) markThreadRead(state.openThread.uid);
  else recountUnread();
}

function recountUnread() {
  let dms = 0;
  Object.entries(allThreads()).forEach(([other, t]) => {
    const read = readStamp(readKey(other));
    if (t.lastFrom !== state.uid && (t.lastTs || 0) > read) dms++;
  });

  let room = 0;
  if (lastRoomMsgs && lastRoomMsgs.length) {
    const read = readStamp(ROOM_READ_KEY);
    // the room is busy by design — only an actual @mention is worth a badge
    room = lastRoomMsgs.filter((m) =>
      !m.system && m.uid !== state.uid && (m.ts || 0) > read && mentionsMe(m)
    ).length;
  }

  state.unreadDms = dms;
  state.unreadRoom = room;
  state.unread = dms + room;

  const b = $("ycDmBadge");    if (b) b.textContent = dms  ? String(dms)  : "";
  const r = $("ycRoomBadge");  if (r) r.textContent = room ? (room > 99 ? "99+" : String(room)) : "";
  const pip = $("ycNavPip");   if (pip) pip.textContent = state.unread ? String(state.unread) : "";

  const base = (function () {
    try { return localStorage.getItem("youtifiy_title") || BASE_TITLE; }
    catch (e) { return BASE_TITLE; }
  })();
  document.title = state.unread ? `(${state.unread}) ${base}` : base;
}

function refreshThreadHead() {
  if (!state.openThread) return;
  const uid = state.openThread.uid;
  const nm = nameFor(uid, state.openThread.name);
  $("ycThreadName").textContent = nm;
  if (isGroupId(uid)) { paintGroupHead(uid); return; }
  const p = state.people[uid];
  $("ycThreadSub").textContent = p ? (p.track || "online") : "offline";
  paintAvatarInto("ycThreadAv", uid, nm);

  const head = $("ycViewThread").querySelector(".yc-thread-head .yc-row-main");
  if (head) {
    head.style.cursor = "pointer";
    head.title = "See their profile";
    head.onclick = () => { state.profileFrom = "thread"; openProfile(uid); };
  }
  const avw = $("ycThreadAv").parentElement;
  if (avw) { avw.style.cursor = "pointer"; avw.onclick = () => { state.profileFrom = "thread"; openProfile(uid); }; }
}

/* ---------- local message cache ----------
   Messages are kept in IndexedDB and a tiny dmMeta node says what the newest
   message is. Opening a thread compares one small value instead of pulling the
   window again, so an unchanged conversation costs roughly 40 bytes instead of
   however many megabytes its last 30 messages weigh. */
const CACHE_DB = "YoutifyChatCache";
const CACHE_STORE = "dm";
const CACHE_MAX_AGE = 12 * 60 * 60 * 1000;   // refetch the window at least twice a day
let cacheDbPromise = null;

function cacheDb() {
  if (cacheDbPromise) return cacheDbPromise;
  cacheDbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(CACHE_DB, 1);
      req.onupgradeneeded = () => {
        const d = req.result;
        if (!d.objectStoreNames.contains(CACHE_STORE)) d.createObjectStore(CACHE_STORE, { keyPath: "tid" });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);     // no cache is fine, just slower
    } catch (e) { resolve(null); }
  });
  return cacheDbPromise;
}

async function cacheRead(tid) {
  const d = await cacheDb();
  if (!d) return null;
  return new Promise((resolve) => {
    try {
      const r = d.transaction([CACHE_STORE], "readonly").objectStore(CACHE_STORE).get(tid);
      r.onsuccess = () => resolve(r.result || null);
      r.onerror = () => resolve(null);
    } catch (e) { resolve(null); }
  });
}

async function cacheWrite(tid, msgs, rev) {
  const d = await cacheDb();
  if (!d || !msgs || !msgs.length) return;
  // no point caching megabytes of base64 — keep the text, drop the heavy bits
  const slim = msgs.slice(-400).map((m) => {
    const c = Object.assign({}, m);
    if (typeof c.image === "string" && c.image.length > 64 * 1024) { delete c.image; c.tooBig = true; }
    return c;
  });
  const newestKey = slim.reduce((mx, m) => (m.key > mx ? m.key : mx), slim[0].key);
  try {
    const tx = d.transaction([CACHE_STORE], "readwrite");
    tx.objectStore(CACHE_STORE).put({ tid, msgs: slim, newestKey, rev: rev || 0, savedAt: Date.now() });
  } catch (e) {}
}

/* Written by whoever changes a thread, so everyone else can tell at a glance
   whether their copy is current. Deliberately tiny. */
function bumpThreadMeta(tid, newestKey) {
  if (!db || !tid) return;
  try { dbfns.set(dbfns.ref(db, `${metaPath(tid)}`), { k: newestKey || "", r: Date.now() }).catch(() => {}); }
  catch (e) {}
}

/* ---------- DM pagination ---------- */
const THREAD_PAGE = 30;
let threadPage = null;

function mergeThreadPages() {
  /* Live data wins over the cached copy for the same message — otherwise an
     edit or reaction made on another device loses to the stale version we
     already had on disk. */
  const by = new Map();
  for (const m of threadPage.older) if (m && m.key) by.set(m.key, m);
  for (const m of threadPage.live)  if (m && m.key) by.set(m.key, m);
  return [...by.values()].sort((a, b) => (a.ts || 0) - (b.ts || 0));
}

function paintThreadTop() {
  const box = $("ycThreadScroll");
  if (!box || !threadPage) return;
  let el = $("ycThreadTop");
  if (!el) {
    el = document.createElement("div");
    el.id = "ycThreadTop";
    el.className = "yc-thread-top";
  }
  if (box.firstElementChild !== el) box.insertBefore(el, box.firstElementChild);
  el.textContent = threadPage.loading ? "loading older messages…"
                 : threadPage.hasMore ? "" : "this is the start of your conversation";
  el.classList.toggle("end", !threadPage.hasMore);
}

async function loadOlderThread() {
  const tp = threadPage;
  if (!tp || tp.loading || !tp.hasMore) return;
  const all = mergeThreadPages();
  if (!all.length) { tp.hasMore = false; paintThreadTop(); return; }

  const { ref, query, orderByKey, endBefore, limitToLast, get } = dbfns;
  if (!orderByKey || !endBefore) { tp.hasMore = false; paintThreadTop(); return; }

  tp.loading = true;
  paintThreadTop();
  const box = $("ycThreadScroll");
  const oldestKey = all.reduce((min, m) => (m.key < min ? m.key : min), all[0].key);
  const beforeH = box ? box.scrollHeight : 0;
  const beforeTop = box ? box.scrollTop : 0;

  try {
    const snap = await get(query(ref(db, `${msgsPath(tp.tid)}`), orderByKey(), endBefore(oldestKey), limitToLast(THREAD_PAGE)));
    if (threadPage !== tp) return;                 // switched threads mid-fetch
    const val = (snap && snap.val()) || {};
    const page = Object.entries(val).map(([k, v]) => ({ key: k, ...v }));
    tp.older = page.concat(tp.older);
    if (page.length < THREAD_PAGE) tp.hasMore = false;
    lastThreadMsgs = mergeThreadPages();
    renderMessages(box, lastThreadMsgs, "No messages yet — say hi.");
    cacheThread(tp.tid, lastThreadMsgs);
    // keep the message you were looking at in the same place on screen
    if (box) box.scrollTop = beforeTop + (box.scrollHeight - beforeH);
  } catch (err) {
    console.error("[chat] couldn't load older messages", err);
  } finally {
    if (threadPage === tp) { tp.loading = false; paintThreadTop(); }
  }
}

function openThread(uid, name) {
  const { ref, query, limitToLast, onValue } = dbfns;
  // a reply/edit belongs to the conversation it was started in
  cancelCompose();
  closeMentionPop();
  stopTyping();                                   // retract it from the old thread
  state.openThread = { uid, name };
  listenTyping(threadId(state.uid, uid));
  refreshThreadHead();

  if (state.unsubThread) { try { state.unsubThread(); } catch (e) {} state.unsubThread = null; }

  /* Wipe the previous conversation immediately. Firebase takes a round trip to
     deliver the new one, and without this you sit looking at the last person's
     messages until it lands. */
  lastThreadMsgs = null;
  const box = $("ycThreadScroll");
  if (box) {
    box.innerHTML = "";
    box.dataset.rendered = "";     // so the new thread pins to the bottom
    box.scrollTop = 0;
    const load = document.createElement("div");
    load.className = "yc-empty";
    load.textContent = "loading…";
    box.appendChild(load);
  }

  listenThreadReads(uid);

  const tid = threadId(state.uid, uid);

  /* Only the newest page is kept live. Opening a thread used to pull the last
     200 messages, GIFs and all — on the heaviest thread that was tens of MB
     per open, and it's what ran the download bill into gigabytes. Older pages
     are fetched once, on demand, when you scroll up. */
  threadPage = { tid, uid, older: [], live: [], loading: false, hasMore: true };
  openThreadSynced(tid, uid);
  showView("thread");
}

/* Works out how much actually needs downloading, then attaches the listener. */
async function openThreadSynced(tid, uid) {
  const { ref, query, limitToLast, startAfter, orderByKey, onChildAdded, onChildChanged, onChildRemoved, get } = dbfns;
  const tp = threadPage;

  // 1. paint what we already have, before touching the network
  const cached = await cacheRead(tid);
  if (threadPage !== tp) return;
  if (cached && cached.msgs && cached.msgs.length) {
    tp.older = cached.msgs;
    lastThreadMsgs = mergeThreadPages();
    renderMessages($("ycThreadScroll"), lastThreadMsgs, "No messages yet — say hi.");
    paintThreadTop();
  }

  // 2. has anything changed since we cached it?
  let fresh = false;
  if (cached && cached.newestKey && startAfter && orderByKey) {
    try {
      const meta = await get(ref(db, `${metaPath(tid)}`));
      const v = meta && meta.val();
      const young = Date.now() - (cached.savedAt || 0) < CACHE_MAX_AGE;
      fresh = !!(v && v.r && v.r === cached.rev && young);
    } catch (e) { fresh = false; }
  }
  if (threadPage !== tp) return;
  tp.fresh = fresh;

  // 3. listen
  const q = fresh
    ? query(ref(db, `${msgsPath(tid)}`), orderByKey(), startAfter(cached.newestKey))
    : query(ref(db, `${msgsPath(tid)}`), limitToLast(THREAD_PAGE));

  const liveMap = new Map();

  const apply = () => {
    if (threadPage !== tp || !state.openThread || state.openThread.uid !== uid) return;
    const nextLive = [...liveMap.values()];

    if (threadPage.live.length && nextLive.length) {
      const floor = nextLive.reduce((m, x) => (x.key < m ? x.key : m), nextLive[0].key);
      const keep = new Set(nextLive.map((x) => x.key));
      const slid = threadPage.live.filter((x) => !keep.has(x.key) && x.key < floor);
      if (slid.length) threadPage.older = threadPage.older.concat(slid);
    }
    threadPage.live = nextLive;
    if (!threadPage.older.length && threadPage.live.length < THREAD_PAGE) threadPage.hasMore = false;
    lastThreadMsgs = mergeThreadPages();
    renderMessages($("ycThreadScroll"), lastThreadMsgs, "No messages yet — say hi.");
    paintThreadTop();
    const newest = lastThreadMsgs.length ? (lastThreadMsgs[lastThreadMsgs.length - 1].ts || 0) : 0;
    if (canSee("thread")) markThreadRead(uid, newest);
    else recountUnread();
    cacheThread(tid, lastThreadMsgs);
  };
  const kick = () => schedule("thread", apply);
  const put = (s) => { liveMap.set(s.key, { key: s.key, ...s.val() }); kick(); };

  const offs = [
    onChildAdded(q, put),
    onChildChanged(q, put),
    onChildRemoved(q, (s) => { liveMap.delete(s.key); kick(); })
  ];
  setTimeout(kick, 1200); // empty thread never fires a child event
  state.unsubThread = () => offs.forEach((f) => { try { f(); } catch (e) {} });
}

/* Saves the thread against whatever revision the server is currently on. */
const cacheTimers = {};
function cacheThread(tid, msgs) {
  clearTimeout(cacheTimers[tid]);
  cacheTimers[tid] = setTimeout(async () => {
    let rev = 0;
    try {
      const mv = await dbfns.get(dbfns.ref(db, `${metaPath(tid)}`));
      rev = (mv && mv.val() && mv.val().r) || 0;
    } catch (e) {}
    cacheWrite(tid, msgs, rev);
  }, 1500);
}

/* ---------- message helpers ---------- */
const LEGACY_IMG_TAG = "[ThisIsAnImage]";

/* handles both the new {kind:"image"} payloads and the old inline-tag ones */
function imageSrcOf(m) {
  if (m.image) return m.image;
  if (m.kind === "image" && m.src) return m.src;
  const t = typeof m.text === "string" ? m.text : "";
  if (t.includes(LEGACY_IMG_TAG)) {
    const src = t.split(LEGACY_IMG_TAG).join("").trim();
    return src.startsWith("data:") || /^https?:/i.test(src) ? src : null;
  }
  return null;
}

/* ---------- @mentions ---------- */
/* Two counters on purpose. candVersion invalidates the mention lookup tables and
   is bumped by presence too. peopleVersion feeds message signatures and is only
   bumped by profile/thread changes — otherwise a presence heartbeat every 15s
   would invalidate every rendered row. */
let candVersion = 0;
let peopleVersion = 0;
function bumpCandidates() { candVersion++; }
function bumpPeople() { candVersion++; peopleVersion++; }

function escapeRe(x) { return String(x).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

/* Everyone we could plausibly mention, longest name first so "@Sam Smith"
   wins over "@Sam". */
let candCache = null, candCacheVer = -1;
function mentionCandidates() {
  if (candCache && candCacheVer === candVersion) return candCache;
  const out = [];
  const seen = new Set();
  const add = (uid, name) => {
    if (!uid || !name || seen.has(uid)) return;
    seen.add(uid);
    out.push({ uid, name: String(name) });
  };
  add(state.uid, state.name);
  Object.values(state.people   || {}).forEach((p) => p && add(p.uid, p.name));
  Object.values(state.profiles || {}).forEach((p) => p && add(p.uid, p.name));
  Object.entries(state.threads || {}).forEach(([uid, t]) => t && add(uid, t.name));
  out.sort((a, b) => b.name.length - a.name.length);
  candCache = out; candCacheVer = candVersion;
  return out;
}

/* Built once per change instead of once per message per render. */
let mentionRe = null, mentionReVer = -1;
function mentionRegex() {
  if (mentionRe && mentionReVer === candVersion) return mentionRe;
  const names = mentionCandidates().map((c) => escapeRe(c.name));
  mentionRe = new RegExp("@(" + [...names, "everyone", "here"].join("|") + ")(?![\\w])", "gi");
  mentionReVer = candVersion;
  return mentionRe;
}

let myMentionRe = null, myMentionReVer = -1, myMentionReName = null;
function myMentionRegex() {
  if (myMentionRe && myMentionReVer === candVersion && myMentionReName === state.name) return myMentionRe;
  myMentionRe = state.name
    ? new RegExp("(^|[^\\w@])@" + escapeRe(state.name) + "(?![\\w])", "i")
    : null;
  myMentionReVer = candVersion; myMentionReName = state.name;
  return myMentionRe;
}

/* Works out which uids a message actually mentions. Done at send time so the
   list is stored on the message and stays right even if someone renames. */
function findMentions(text) {
  const str = String(text || "");
  const hits = [];
  mentionCandidates().forEach((c) => {
    const re = new RegExp("(^|[^\\w@])@" + escapeRe(c.name) + "(?![\\w])", "i");
    if (re.test(str)) hits.push(c.uid);
  });
  if (/(^|[^\w@])@(everyone|here)(?![\w])/i.test(str)) hits.push("@everyone");
  return [...new Set(hits)];
}

function mentionsMe(m) {
  if (!m) return false;
  if (Array.isArray(m.mentions)) return m.mentions.includes(state.uid) || m.mentions.includes("@everyone");
  // older messages predate the mentions field, so fall back to reading the text
  const str = String(m.text || "");
  if (!str.includes("@")) return false;
  if (/(^|[^\w@])@(everyone|here)(?![\w])/i.test(str)) return true;
  const re = myMentionRegex();
  return re ? re.test(str) : false;
}

/* Splits text into mention spans and plain text. */
function paintMentions(host, text) {
  const str = String(text || "");
  const re = mentionRegex();
  re.lastIndex = 0;
  let last = 0, match;
  while ((match = re.exec(str)) !== null) {
    if (match.index > last) appendWithEmoji(host, str.slice(last, match.index));
    const span = document.createElement("span");
    const isEveryone = /^(everyone|here)$/i.test(match[1]);
    const me = state.name && (match[1].toLowerCase() === String(state.name).toLowerCase());
    span.className = "yc-mention" + ((me || isEveryone) ? " me" : "");
    span.textContent = match[0];
    host.appendChild(span);
    last = match.index + match[0].length;
  }
  if (last < str.length) appendWithEmoji(host, str.slice(last));
  return host;
}

/* ---------- universal emoji ----------
   Messages still store the plain unicode character — only the rendering swaps in
   a Twemoji SVG by URL, so nothing image-shaped ever goes into the database and
   old messages render the new way for free. Falls back to the system emoji if
   the CDN is unreachable. */
/* Pinned to 16.0.1 — 15.1.0 predates Unicode 16, so newer emoji like the
   bags-under-eyes face (1fae9) 404 there and fall through to a tofu box on
   systems without the font. Pinned rather than @latest so a CDN-side
   change can't silently alter how every message renders. */
const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/";
/* Order matters: keycaps and flags first, or the leading digit / first
   regional indicator gets eaten by a later branch. The modifier set must be a
   character class — as a plain group, "\u{1F3FB}-\u{1F3FF}" matches those
   three characters literally instead of the skin-tone range. */
const EMOJI_RUN_RE = new RegExp(
  "[0-9#*]\\uFE0F?\\u20E3" +
  "|\\p{RI}\\p{RI}" +
  "|\\p{Extended_Pictographic}[\\uFE0F\\u{1F3FB}-\\u{1F3FF}]*" +
  "(?:\\u200D\\p{Extended_Pictographic}[\\uFE0F\\u{1F3FB}-\\u{1F3FF}]*)*",
  "gu");

/* Sets an element's contents to an emoji, rendered the same way messages are.
   Cheap to call repeatedly — it no-ops when the emoji hasn't changed, which
   matters for the picker's recycled cells. */
function setEmoji(el, ch) {
  if (!el) return;
  if (el.dataset.ch === ch) return;
  el.dataset.ch = ch;
  el.textContent = "";
  appendWithEmoji(el, ch);
}

/* Twemoji's filenames aren't consistent about the variation selector: ZWJ
   sequences keep it, single characters and keycaps drop it. Rather than guess,
   hand back every plausible name and let the <img> try them in turn. */
function twemojiCandidates(ch) {
  const cps = [...ch].map((c) => c.codePointAt(0).toString(16));
  const withSel = cps.join("-");
  const noSel = cps.filter((c) => c !== "fe0f").join("-");
  const out = [];
  if (withSel) out.push(withSel);
  if (noSel && noSel !== withSel) out.push(noSel);
  return out;
}

/* Appends `text` to host, turning emoji into <img>. Everything else stays a
   plain text node, so nothing can be injected. */
function appendWithEmoji(host, text) {
  const str = String(text || "");
  if (!str) return;
  let last = 0, m;
  EMOJI_RUN_RE.lastIndex = 0;
  while ((m = EMOJI_RUN_RE.exec(str)) !== null) {
    if (m.index > last) host.appendChild(document.createTextNode(str.slice(last, m.index)));
    const ch = m[0];
    const names = twemojiCandidates(ch);
    if (names.length) {
      const img = document.createElement("img");
      img.className = "yc-twemoji";
      img.alt = ch;
      img.draggable = false;
      img.loading = "lazy";
      let at = 0;
      img.onerror = () => {
        at++;
        if (at < names.length) { img.src = TWEMOJI_BASE + names[at] + ".svg"; return; }
        /* No image exists — currently only Unicode 17 emoji, which Twemoji
           hasn't shipped yet. Fall back to the glyph, but label it so someone
           whose font also lacks it gets a name on hover instead of a blank box. */
        const span = document.createElement("span");
        span.className = "yc-emoji-fallback";
        span.textContent = ch;
        const nm = emojiName(ch);
        if (nm) span.title = nm;
        if (img.parentNode) img.parentNode.replaceChild(span, img);
      };
      img.src = TWEMOJI_BASE + names[0] + ".svg";
      host.appendChild(img);
    } else {
      host.appendChild(document.createTextNode(ch));
    }
    last = m.index + ch.length;
  }
  if (last < str.length) host.appendChild(document.createTextNode(str.slice(last)));
}

/* ---------- links in message text ---------- */
const URL_RE = /(https?:\/\/[^\s<>"']+)/gi;

/* Trailing punctuation usually belongs to the sentence, not the URL. */
function trimUrl(u) {
  let out = u;
  while (/[.,!?;:'"]$/.test(out)) out = out.slice(0, -1);
  // only drop a closing bracket if it was never opened
  while (/[)\]}]$/.test(out)) {
    const close = out[out.length - 1];
    const open = close === ")" ? "(" : close === "]" ? "[" : "{";
    if (out.split(open).length >= out.split(close).length) break;
    out = out.slice(0, -1);
  }
  return out;
}

function looksLikeImageUrl(u) {
  return /\.(gif|png|jpe?g|webp|bmp|avif)(\?|#|$)/i.test(u);
}
function looksLikeGifUrl(u) {
  return /\.gif(\?|#|$)/i.test(u) || /(^|\/\/|\.)(tenor\.com|giphy\.com)\//i.test(u);
}
/* Some hosts hand out a page URL rather than the image itself. */
function normalizeMediaUrl(u) {
  const giphy = u.match(/^https?:\/\/(?:www\.)?giphy\.com\/gifs\/(?:[\w-]*-)?([A-Za-z0-9]+)/i);
  if (giphy) return `https://media.giphy.com/media/${giphy[1]}/giphy.gif`;
  const tenor = u.match(/^https?:\/\/(?:www\.)?tenor\.com\/view\/[\w-]*-(\d+)$/i);
  if (tenor) return u + ".gif";       // tenor serves the media from the same path
  return u;
}
/* Worth *trying* to embed: a direct image, or a known gif host page. */
function embeddableUrl(text) {
  const found = String(text || "").match(URL_RE);
  if (!found) return null;
  for (const raw of found) {
    const u = trimUrl(raw);
    if (looksLikeImageUrl(u) || /(^|\/\/|\.)(tenor\.com\/view|giphy\.com\/gifs)/i.test(u)) {
      return { raw: u, src: normalizeMediaUrl(u), gif: looksLikeGifUrl(u) };
    }
  }
  return null;
}

/* Builds text with clickable links. Everything goes in via textContent, so a
   message can never inject markup. */
function linkify(host, text) {
  const str = String(text || "");
  let last = 0;
  str.replace(URL_RE, (match, _g, offset) => {
    if (offset > last) paintMentions(host, str.slice(last, offset));
    const url = trimUrl(match);
    const a = document.createElement("a");
    a.href = url;
    a.textContent = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer nofollow";
    a.onclick = (e) => e.stopPropagation();
    host.appendChild(a);
    if (url.length < match.length) host.appendChild(document.createTextNode(match.slice(url.length)));
    last = offset + match.length;
    return match;
  });
  if (last < str.length) paintMentions(host, str.slice(last));
  return host;
}

function openLightbox(src) {
  const box = $("ycLightbox"), img = $("ycLightboxImg"), dl = $("ycLightboxDl");
  if (!box || !img) return;
  img.src = src;
  if (dl) {
    dl.href = src;
    const isGif = /^data:image\/gif/i.test(src) || /\.gif(\?|#|$)/i.test(src) || /giphy\.com|tenor\.com/i.test(src);
    dl.setAttribute("download", isGif ? "youtify-image.gif" : "youtify-image.jpg");
  }
  box.classList.add("show");
}
function closeLightbox(e) {
  if (e && e.target && e.target.id === "ycLightboxImg") return;
  const box = $("ycLightbox");
  if (box) { box.classList.remove("show"); $("ycLightboxImg").src = ""; }
}

/* ---------- rendering ---------- */
function scrollToBottom(box, smooth) {
  if (!box) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.scrollTo({ top: box.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    });
  });
}

function buildMessageRow(m, ctx) {
  const mine = ctx.mine, isSystem = ctx.isSystem, grouped = ctx.grouped;
  const pinged = ctx.pinged, stick = ctx.stick, box = ctx.box;
    const wrap = document.createElement("div");
    wrap.className = "yc-msg" +
      (isSystem ? " system" + (m.kind === "announce" ? " announce" : "") : (mine ? " mine" : "")) +
      (grouped ? " grouped" : "") +
      (pinged ? " pinged" : "") +
      (ctx.quiet ? " noanim" : "");
    if (m.key) wrap.dataset.key = m.key;

    const src = isSystem ? null : imageSrcOf(m);

    if (!isSystem) {
      // avatar column (only drawn on the first message of a group)
      if (grouped) {
        const slot = document.createElement("span");
        slot.className = "yc-msg-slot";
        wrap.appendChild(slot);
      } else {
        wrap.appendChild(avatarEl(m.uid, mine ? state.name : (m.name || nameFor(m.uid)), "sm"));
      }
    }

    const col = document.createElement("div");
    col.className = "yc-msg-col";

    if (!isSystem && !grouped) {
      const meta = document.createElement("div");
      meta.className = "yc-msg-meta";
      const who = document.createElement("span");
      who.className = "yc-msg-who";
      who.textContent = mine ? "you" : (m.name || nameFor(m.uid, "someone"));
      const when = document.createElement("span");
      when.textContent = shortTime(m.ts);
      meta.append(who, when);
      if (m.edited) {
        const ed = document.createElement("span");
        ed.className = "yc-edited";
        ed.textContent = "(edited)";
        ed.title = "edited " + shortTime(m.edited);
        meta.append(ed);
      }
      col.appendChild(meta);
    }

    const bub = document.createElement("div");
    bub.className = "yc-msg-bubble" + (src ? " img" : "") +
      (!src && !isSystem && isEmojiOnly(m.text) ? " jumbo" : "");

    if (!isSystem && m.replyTo && m.replyTo.key) {
      bub.classList.add("has-quote");
      const q = document.createElement("div");
      q.className = "yc-quote";
      q.title = "Jump to the original";
      q.onclick = (e) => { e.stopPropagation(); jumpToMessage(m.replyTo.key); };
      const bar = document.createElement("span"); bar.className = "bar";
      const body = document.createElement("span"); body.className = "body";
      const who = document.createElement("span"); who.className = "who";
      who.textContent = m.replyTo.uid === state.uid ? "you" : (m.replyTo.name || "someone");
      const txt = document.createElement("span"); txt.className = "txt";
      txt.textContent = m.replyTo.text || "";
      body.append(who, txt);
      q.append(bar, body);
      // sits ABOVE the bubble, so the bubble only ever sizes to its own content
      bub.__quote = q;
    }

    if (src) {
      const isGif = !!m.gif || /^data:image\/gif/i.test(src);
      const img = document.createElement("img");
      img.src = src;
      img.alt = isGif ? "GIF" : "picture";
      // lazy-loading can leave an offscreen GIF paused, so don't defer those
      if (!isGif) img.loading = "lazy";
      img.title = "Click to view";
      img.onload = () => { if (stick) scrollToBottom(box); };   // image finally has height
      img.onclick = () => openLightbox(src);
      if (isGif) {
        bub.classList.add("gif");
        const tag = document.createElement("span");
        tag.className = "yc-gif-tag";
        tag.textContent = "GIF";
        bub.appendChild(tag);
      }
      img.onerror = () => { bub.classList.remove("img"); bub.textContent = "picture didn't load..."; };
      bub.appendChild(img);
      if (m.caption) {
        const cap = document.createElement("div");
        cap.style.cssText = "padding:6px 8px 3px;font-size:13.5px;line-height:1.4";
        cap.textContent = m.caption;
        bub.appendChild(cap);
      }
    } else {
      const link = isSystem ? null : embeddableUrl(m.text);
      const bare = link && String(m.text || "").trim() === link.raw;

      if (!bare) linkify(bub, m.text || "");

      if (link) {
        // Optimistic: try to show it, quietly fall back to a plain link if the
        // host won't serve it (wrong guess, hotlink block, mixed content...).
        if (bare) bub.classList.add("img", "embed-only");
        const wrap = document.createElement("div");
        wrap.className = "yc-embed" + (link.gif ? " gif" : "");

        const img = document.createElement("img");
        img.src = link.src;
        img.alt = link.gif ? "GIF" : "linked image";
        img.referrerPolicy = "no-referrer";
        if (!link.gif) img.loading = "lazy";
        img.title = "Click to view";
        img.onload = () => { if (stick) scrollToBottom(box); };
        img.onclick = (e) => { e.stopPropagation(); openLightbox(link.src); };
        img.onerror = () => {
          wrap.remove();
          bub.classList.remove("img", "embed-only");
          if (bare && !bub.childNodes.length) linkify(bub, m.text || "");
        };
        wrap.appendChild(img);

        if (link.gif) {
          const tag = document.createElement("span");
          tag.className = "yc-gif-tag";
          tag.textContent = "GIF";
          wrap.appendChild(tag);
        }
        bub.appendChild(wrap);
      }
    }

    if (bub.__quote) { col.appendChild(bub.__quote); bub.__quote = null; }
    col.appendChild(bub);

    if (!isSystem && m.reactions) {
      const rr = document.createElement("div");
      rr.className = "yc-reacts";
      Object.keys(m.reactions).forEach((emoji) => {
        const users = reactorsOf(m, emoji);
        if (!users.length) return;
        const chip = document.createElement("button");
        chip.className = "yc-react" + (users.includes(state.uid) ? " mine" : "");
        appendWithEmoji(chip, emoji);
        const n = document.createElement("span");
        n.className = "n";
        n.textContent = String(users.length);
        chip.appendChild(n);
        chip.title = users.map((u) => (u === state.uid ? "you" : nameFor(u))).join(", ");
        chip.onclick = (e) => { e.stopPropagation(); toggleReaction(m, emoji); };
        rr.appendChild(chip);
      });
      if (rr.children.length) col.appendChild(rr);
    }

    if (ctx.showReceipt && !isSystem) {
      const label = ctx.receiptLabel;
      if (label) {
        const r = document.createElement("div");
        r.className = "yc-receipt" + (/^Seen/.test(label) ? " seen" : "");
        r.textContent = label;
        col.appendChild(r);
      }
    }

    wrap.appendChild(col);

    if (!isSystem && m.key) {
      const acts = document.createElement("div");
      acts.className = "yc-msg-actions";

      const react = document.createElement("button");
      react.title = "React";
      react.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"></path><line x1="9" y1="9.5" x2="9.01" y2="9.5"></line><line x1="15" y1="9.5" x2="15.01" y2="9.5"></line></svg>';
      react.onclick = (e) => { e.stopPropagation(); openReactPicker(m, react); };
      acts.appendChild(react);

      const reply = document.createElement("button");
      reply.title = "Reply";
      reply.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>';
      reply.onclick = (e) => { e.stopPropagation(); startReply(m); };
      acts.appendChild(reply);

      if (mine && !src) {
        const edit = document.createElement("button");
        edit.title = "Edit";
        edit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>';
        edit.onclick = (e) => { e.stopPropagation(); startEdit(m); };
        acts.appendChild(edit);
      }
      wrap.appendChild(acts);
    }

    return wrap;
}

/* Everything that can change how a row looks. If this string is unchanged the
   existing DOM node is reused as-is — which is the whole point: a new message
   used to rebuild all 200 rows, re-decoding every base64 avatar. */
/* A message that is nothing but emoji (and whitespace) gets the jumbo treatment.
   Cheap test: strip every emoji-ish codepoint and see if anything is left. */
const EMOJI_ONLY_RE = /^(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F\u200D\u{1F3FB}-\u{1F3FF}\s])+$/u;
function isEmojiOnly(text) {
  const t = String(text || "").trim();
  if (!t || t.length > 24) return false;
  try { return EMOJI_ONLY_RE.test(t); } catch (e) { return false; }
}

function profStamp(uid) {
  const p = state.profiles && state.profiles[uid];
  return p ? ((p.name || "") + ":" + (p.pfp ? p.pfp.length : 0)) : "";
}

function msgSignature(m, grouped, pinged, receiptLabel) {
  return [
    m.key || "", m.ts || 0, m.edited || 0, m.text || "", m.caption || "",
    m.image ? 1 : 0, m.gif ? 1 : 0, m.system ? 1 : 0, m.kind || "", m.name || "",
    m.replyTo ? (m.replyTo.key + "|" + (m.replyTo.text || "")) : "",
    m.reactions ? JSON.stringify(m.reactions) : "",
    grouped ? 1 : 0, pinged ? 1 : 0, receiptLabel || "",
    profStamp(m.uid)
  ].join("\u0001");
}

function renderMessages(box, msgs, emptyText, force) {
  if (!box) return;

  // first paint, or the box is hidden (clientHeight 0) -> always pin to bottom
  const first = !box.dataset.rendered || box.clientHeight === 0;
  const stick = force || first ||
                (box.scrollHeight - box.scrollTop - box.clientHeight < 120);
  const keepScroll = box.scrollTop;

  if (!msgs || !msgs.length) {
    box.innerHTML = "";
    box.dataset.rendered = "1";
    box.__rows = new Map();
    const e = document.createElement("div");
    e.className = "yc-empty";
    e.textContent = emptyText;
    box.appendChild(e);
    return;
  }

  if (!box.__rows) box.__rows = new Map();
  const cache = box.__rows;

  // only the newest of your own messages carries the receipt
  const isThreadBox = box.id === "ycThreadScroll";
  let lastOwnIdx = -1;
  if (isThreadBox) msgs.forEach((m, i) => { if (!m.system && m.uid === state.uid) lastOwnIdx = i; });

  const want = [];
  const keep = new Set();
  let prev = null;

  msgs.forEach((m, idx) => {
    const day = dayLabel(m.ts);

    if (!prev || dayLabel(prev.ts) !== day) {
      const dkey = "day\u0001" + idx + "\u0001" + day;
      let d = cache.get(dkey);
      if (!d) {
        const el = document.createElement("div");
        el.className = "yc-day";
        el.textContent = day;
        d = { el, sig: day };
        cache.set(dkey, d);
      }
      want.push(d.el); keep.add(dkey);
    }

    const isSystem = !!m.system;
    const mine = m.uid === state.uid;
    const grouped = !isSystem && prev && !prev.system &&
                    prev.uid === m.uid &&
                    Math.abs((m.ts || 0) - (prev.ts || 0)) < 4 * 60 * 1000 &&
                    dayLabel(prev.ts) === day;
    const pinged = !isSystem && !mine && mentionsMe(m);
    const showReceipt = isThreadBox && idx === lastOwnIdx && !isSystem;
    const receiptLabel = showReceipt ? receiptFor(m) : null;

    const key = "msg\u0001" + (m.key || ("idx" + idx));
    const sig = msgSignature(m, grouped, pinged, receiptLabel);

    let entry = cache.get(key);
    if (!entry || entry.sig !== sig) {
      const el = buildMessageRow(m, { mine, isSystem, grouped, pinged, showReceipt, receiptLabel, stick, box, quiet: first || !!entry });
      entry = { el, sig };
      cache.set(key, entry);
    }
    want.push(entry.el); keep.add(key);
    prev = m;
  });

  cache.forEach((_, k) => { if (!keep.has(k)) cache.delete(k); });

  // patch the list in place; nodes already in the right spot aren't touched
  for (let i = 0; i < want.length; i++) {
    const cur = box.children[i];
    if (cur !== want[i]) box.insertBefore(want[i], cur || null);
  }
  while (box.children.length > want.length) box.removeChild(box.lastElementChild);

  box.dataset.rendered = "1";
  if (box.id === "ycThreadScroll" && threadPage) paintThreadTop();
  if (stick) scrollToBottom(box);
  else box.scrollTop = keepScroll;   // don't yank them to the top on a re-render
}

function personRow(p) {
  const row = document.createElement("div");
  row.className = "yc-row" + (p.online ? "" : " offline");
  row.title = "See their profile";
  row.onclick = () => { state.profileFrom = "people"; openProfile(p.uid); };

  const avWrap = document.createElement("span");
  avWrap.className = "yc-av-wrap";
  avWrap.appendChild(avatarEl(p.uid, p.name));
  const ring = document.createElement("span");
  ring.className = "yc-ring" + (p.online ? "" : " off");
  avWrap.appendChild(ring);

  const main = document.createElement("div");
  main.className = "yc-row-main";
  const nm = document.createElement("div");
  nm.className = "yc-row-name";
  const nmText = document.createElement("span");
  nmText.textContent = p.name;
  nm.append(nmText);

  const sub = document.createElement("div");
  sub.className = "yc-row-sub";
  if (p.online) sub.textContent = p.track || "not playing anything";
  else sub.textContent = p.lastSeen ? "last seen " + ago(p.lastSeen) : "offline";

  main.append(nm, sub);
  row.append(avWrap, main, dmIconBtn(p.uid, p.name));
  return row;
}

function renderPeople() {
  const box = $("ycPeopleList");
  if (!box) return;
  box.innerHTML = "";

  /* Presence only holds people connected right now — it's wiped on disconnect.
     knownPeople() merges every other place a person can be recorded, including
     the ones from before /profiles existed. */
  const known = knownPeople();

  const list = [];
  Object.values(known).forEach((k) => {
    const pres = state.people[k.uid];
    const prof = state.profiles[k.uid] || {};
    const name = (pres && pres.name) || prof.name || k.name;
    if (!name) return;                    // nothing worth showing
    list.push({
      uid: k.uid,
      name,
      online: !!pres,
      track: pres ? pres.track : null,
      lastSeen: Number(state.lastSeen[k.uid]) || k.lastSeen || 0
    });
  });

  if (!list.length) {
    const e = document.createElement("div");
    e.className = "yc-empty";
    e.style.margin = "20px auto";
    e.textContent = "Nobody else has joined yet.";
    box.appendChild(e);
    return;
  }

  const byName = (a, b) => (a.name || "").localeCompare(b.name || "");
  const online  = list.filter((p) => p.online).sort(byName);
  const offline = list.filter((p) => !p.online)
                      .sort((a, b) => (b.lastSeen - a.lastSeen) || byName(a, b));

  if (online.length) {
    box.appendChild(sectionTitle("Online — " + online.length));
    online.forEach((p) => box.appendChild(personRow(p)));
  }
  if (offline.length) {
    const t = sectionTitle("Offline — " + offline.length);
    if (online.length) t.style.marginTop = "10px";
    box.appendChild(t);
    offline.forEach((p) => box.appendChild(personRow(p)));
  }
}

function renderThreads() {
  const box = $("ycDmList");
  if (!box) return;
  box.innerHTML = "";

  // "new group" sits at the top of the list
  const make = document.createElement("div");
  make.className = "yc-row";
  make.onclick = () => openNewGroup();
  const mkAv = document.createElement("span");
  mkAv.className = "yc-av-wrap";
  const mkGlyph = document.createElement("span");
  mkGlyph.className = "yc-av";
  mkGlyph.textContent = "+";
  mkAv.appendChild(mkGlyph);
  const mkMain = document.createElement("div");
  mkMain.className = "yc-row-main";
  const mkName = document.createElement("div");
  mkName.className = "yc-row-name";
  mkName.textContent = "New group chat";
  const mkSub = document.createElement("div");
  mkSub.className = "yc-row-sub";
  mkSub.textContent = "Start a chat with a few people";
  mkMain.append(mkName, mkSub);
  make.append(mkAv, mkMain);
  box.appendChild(make);

  const entries = Object.entries(allThreads())
    .map(([uid, t]) => ({ uid, ...t }))
    .sort((a, b) => (b.lastTs || 0) - (a.lastTs || 0));

  if (!entries.length) {
    const e = document.createElement("div");
    e.className = "yc-empty";
    e.innerHTML = "No DMs yet.<br>Open <b>People</b> and tap someone to start one.";
    box.appendChild(e);
    return;
  }

  entries.forEach((t) => {
    const isGroup = !!t.group;
    const online = !isGroup && !!state.people[t.uid];
    const read = Number(localStorage.getItem(readKey(t.uid)) || 0);
    const unread = t.lastFrom !== state.uid && (t.lastTs || 0) > read;
    const nmStr = nameFor(t.uid, t.name);

    const row = document.createElement("div");
    row.className = "yc-row";
    row.onclick = () => openThread(t.uid, nmStr);

    const avWrap = document.createElement("span");
    avWrap.className = "yc-av-wrap";
    if (isGroup) {
      const g = document.createElement("span");
      g.className = "yc-av";
      g.textContent = "\u{1F465}";
      avWrap.appendChild(g);
    } else {
      avWrap.appendChild(avatarEl(t.uid, nmStr));
      const ring = document.createElement("span");
      ring.className = "yc-ring" + (online ? "" : " off");
      avWrap.appendChild(ring);
    }

    const main = document.createElement("div");
    main.className = "yc-row-main";
    const nm = document.createElement("div");
    nm.className = "yc-row-name";
    const nmText = document.createElement("span"); nmText.textContent = nmStr;
    nm.append(nmText);
    if (unread) {
      const b = document.createElement("span"); b.className = "yc-badge"; b.textContent = "new";
      nm.appendChild(b);
    }
    const sub = document.createElement("div");
    sub.className = "yc-row-sub";
    const who = t.lastFrom === state.uid ? "you: " : (isGroup && t.lastName ? t.lastName + ": " : "");
    sub.textContent = who + (t.lastText || "");
    main.append(nm, sub);

    const when = document.createElement("span");
    when.style.cssText = "color:var(--text-muted);font-size:11px;flex-shrink:0";
    when.textContent = shortTime(t.lastTs);

    row.append(avWrap, main, when);
    box.appendChild(row);
  });
}

/* ============================ GROUP CHATS ============================
   groups/<gid>/info    { name, owner, ownerAuth, ts, members:{uid:name}, last:{text,ts,from,name} }
   groups/<gid>/msgs    messages (same shape as DMs)
   groups/<gid>/reads   read receipts      groups/<gid>/meta     cache revision
   groups/<gid>/typing  typing indicators
   userGroups/<uid>/<gid> = true            your list of groups

   Only the person who made a group can delete it. Deleting removes the whole
   groups/<gid> node, so every message (and every picture inside them) is gone
   from the database and the space is freed. */
const GROUP_NAME_MAX = 32;
const GROUP_MAX_MEMBERS = 25;
const groupUi = { gid: null, picked: new Set(), deleting: null };

(function injectGroupCss() {
  if (document.getElementById("ycGroupCss")) return;
  const s = document.createElement("style");
  s.id = "ycGroupCss";
  s.textContent = `
    .yc-grp-form{display:flex;flex-direction:column;gap:12px;padding:14px;text-align:left}
    .yc-grp-input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.15));background:rgba(255,255,255,.05);color:inherit;font:inherit;outline:none}
    .yc-grp-input:focus{border-color:var(--accent-primary,#ff6b9d)}
    .yc-grp-note{font-size:12px;color:var(--text-muted,#999);line-height:1.5}
    .yc-grp-pick{display:flex;flex-direction:column;gap:2px;max-height:46vh;overflow-y:auto}
    .yc-grp-pick-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;cursor:pointer}
    .yc-grp-pick-row:hover{background:rgba(255,255,255,.06)}
    .yc-grp-pick-row input{accent-color:var(--accent-primary,#ff6b9d);width:16px;height:16px;flex-shrink:0}
    .yc-grp-pick-row .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .yc-grp-pick-row .st{font-size:11px;color:var(--text-muted,#999)}
    .yc-grp-btn{padding:11px 14px;border-radius:10px;border:0;font:inherit;font-weight:700;cursor:pointer;background:var(--accent-primary,#ff6b9d);color:#fff}
    .yc-grp-btn.danger{background:#e5484d}
    .yc-grp-btn.ghost{background:transparent;border:1px solid var(--border,rgba(255,255,255,.2));color:inherit}
    .yc-grp-btn:disabled{opacity:.5;cursor:default}
    .yc-grp-tag{font-size:10px;font-weight:700;padding:1px 6px;border-radius:6px;background:rgba(255,255,255,.12);margin-left:6px;vertical-align:middle}
  `;
  document.head.appendChild(s);
})();

function groupEntries() {
  const out = {};
  Object.entries(state.groups || {}).forEach(([gid, g]) => {
    if (!g) return;
    const l = g.last || {};
    out[gid] = {
      uid: gid, name: g.name, group: true,
      lastText: l.text || "", lastTs: l.ts || g.ts || 0,
      lastFrom: l.from || null, lastName: l.name || ""
    };
  });
  return out;
}
/* DM index entries and groups, merged — for the list, unread badges and read markers */
function allThreads() { return Object.assign({}, groupEntries(), state.threads || {}); }

async function cacheDelete(tid) {
  const d = await cacheDb();
  if (!d) return;
  try { d.transaction([CACHE_STORE], "readwrite").objectStore(CACHE_STORE).delete(tid); } catch (e) {}
}

/* Your list of groups, plus a small live listener on each one's info node
   (name, members, newest-message preview). Message bodies are only ever
   downloaded for the group you have open. */
function listenGroups() {
  const { ref, onValue } = dbfns;
  const infoUnsubs = {};

  const watch = (gid) => onValue(ref(db, `${ROOT}/groups/${gid}/info`), (snap) => {
    const info = snap.val();
    if (!info) { groupGone(gid); return; }
    const prev = state.groups[gid];
    state.groups[gid] = info;

    const l = info.last;
    if (l && l.from && l.from !== state.uid && (!prev || !prev.last || (prev.last.ts || 0) < (l.ts || 0))) {
      maybeNotify(
        { uid: l.from, key: gid + ":" + l.ts, name: (l.name || "Someone") + " · " + info.name, text: l.text || "", ts: l.ts },
        "dm", gid
      );
    }
    recountUnread();
    if (state.view === "dms") renderThreads();
    if (state.openThread && state.openThread.uid === gid) refreshThreadHead();
    if (state.view === "group" && groupUi.gid === gid) renderGroupInfo();
  }, (err) => console.warn("[chat] can't read group", gid, err && err.code));

  const offList = onValue(ref(db, `${ROOT}/userGroups/${state.uid}`), (snap) => {
    const ids = Object.keys(snap.val() || {}).filter(isGroupId);
    ids.forEach((gid) => { if (!infoUnsubs[gid]) infoUnsubs[gid] = watch(gid); });
    Object.keys(infoUnsubs).forEach((gid) => {
      if (ids.includes(gid)) return;
      try { infoUnsubs[gid](); } catch (e) {}
      delete infoUnsubs[gid];
      if (state.groups[gid]) groupGone(gid);
    });
    recountUnread();
    if (state.view === "dms") renderThreads();
  }, (err) => console.warn("[chat] group list unavailable", err && err.code));

  return () => {
    try { offList(); } catch (e) {}
    Object.keys(infoUnsubs).forEach((gid) => { try { infoUnsubs[gid](); } catch (e) {} });
  };
}

/* The group is gone for you — deleted by its owner, or you left. Clean up locally. */
function groupGone(gid) {
  const wasOpen = state.openThread && state.openThread.uid === gid;
  const wasInfo = state.view === "group" && groupUi.gid === gid;
  delete state.groups[gid];
  try { localStorage.removeItem(readKey(gid)); } catch (e) {}
  cacheDelete(gid);
  try { dbfns.remove(dbfns.ref(db, `${ROOT}/userGroups/${state.uid}/${gid}`)).catch(() => {}); } catch (e) {}
  if (wasOpen || wasInfo) {
    showView("dms");
    if (groupUi.deleting !== gid) say("That group chat was deleted.");
  }
  recountUnread();
  if (state.view === "dms") renderThreads();
}

/* newest-message preview shown in everyone's list */
function touchGroup(gid, preview, ts) {
  return dbfns.update(dbfns.ref(db, `${ROOT}/groups/${gid}/info/last`), {
    text: preview, ts, from: state.uid, name: state.name
  });
}

function paintGroupHead(gid) {
  const g = state.groups[gid];
  const n = g && g.members ? Object.keys(g.members).length : 0;
  const sub = $("ycThreadSub");
  if (sub) sub.textContent = n ? (n + " members \u00B7 tap for info") : "group chat";
  const av = $("ycThreadAv");
  if (av) { av.innerHTML = ""; av.textContent = "\u{1F465}"; }
  const open = () => openGroupInfo(gid);
  const head = $("ycViewThread").querySelector(".yc-thread-head .yc-row-main");
  if (head) { head.style.cursor = "pointer"; head.title = "Group info"; head.onclick = open; }
  const avw = av && av.parentElement;
  if (avw) { avw.style.cursor = "pointer"; avw.onclick = open; }
}

/* ---------- make a group ---------- */
function openNewGroup() {
  if (!sessionStarted) { say("You need to log in to make a group."); return; }
  groupUi.picked = new Set();
  showView("newgroup");
  renderNewGroup();
}

function renderNewGroup() {
  const box = $("ycNewGroupScroll");
  if (!box) return;
  box.innerHTML = "";
  const form = document.createElement("div");
  form.className = "yc-grp-form";

  const name = document.createElement("input");
  name.id = "ycGroupName";
  name.className = "yc-grp-input";
  name.placeholder = "group name";
  name.maxLength = GROUP_NAME_MAX;
  name.autocomplete = "off";
  form.appendChild(name);

  const note = document.createElement("div");
  note.className = "yc-grp-note";
  note.textContent = "Pick who to add (up to " + (GROUP_MAX_MEMBERS - 1) + " people). You'll be the owner \u2014 only you can delete the group, which erases all of its messages for everyone.";
  form.appendChild(note);

  const list = document.createElement("div");
  list.className = "yc-grp-pick";
  const people = Object.values(knownPeople()).filter((p) => p.name);
  people.sort((a, b) => (!!state.people[b.uid] - !!state.people[a.uid]) || String(a.name).localeCompare(String(b.name)));
  if (!people.length) {
    const none = document.createElement("div");
    none.className = "yc-grp-note";
    none.textContent = "Nobody to add yet \u2014 people show up here once they've been around.";
    list.appendChild(none);
  }
  people.forEach((p) => {
    const row = document.createElement("label");
    row.className = "yc-grp-pick-row";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.onchange = () => {
      if (cb.checked) {
        if (groupUi.picked.size >= GROUP_MAX_MEMBERS - 1) { cb.checked = false; say("That's the max for a group."); return; }
        groupUi.picked.add(p.uid);
      } else groupUi.picked.delete(p.uid);
    };
    const nm = document.createElement("span");
    nm.className = "nm";
    nm.textContent = p.name;
    const st = document.createElement("span");
    st.className = "st";
    st.textContent = state.people[p.uid] ? "online" : "";
    row.append(cb, avatarEl(p.uid, p.name, "sm"), nm, st);
    list.appendChild(row);
  });
  form.appendChild(list);

  const go = document.createElement("button");
  go.id = "ycGroupCreate";
  go.className = "yc-grp-btn";
  go.textContent = "Create group";
  go.onclick = () => createGroup();
  form.appendChild(go);

  box.appendChild(form);
}

async function createGroup() {
  if (!sessionStarted || !state.authUid) { say("You need to log in to make a group."); return; }
  if (state.kicked) { say("You've been removed from the chat."); return; }
  if (state.muted)  { say("You're muted in chat."); return; }

  const nameEl = $("ycGroupName");
  const name = (nameEl ? nameEl.value : "").trim().slice(0, GROUP_NAME_MAX);
  const picked = [...groupUi.picked].slice(0, GROUP_MAX_MEMBERS - 1);
  if (!name) { say("Give the group a name."); return; }
  if (!picked.length) { say("Pick at least one person."); return; }

  const btn = $("ycGroupCreate");
  if (btn) btn.disabled = true;

  const { ref, set } = dbfns;
  const gid = "g_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const ts = Date.now();
  const known = knownPeople();
  const members = {};
  members[state.uid] = state.name;
  picked.forEach((u) => { members[u] = (known[u] && known[u].name) || nameFor(u); });

  try {
    await set(ref(db, `${ROOT}/groups/${gid}/info`), {
      name, owner: state.uid, ownerAuth: state.authUid, ts, members,
      last: { text: "Group created", ts, from: state.uid, name: state.name }
    });
  } catch (err) {
    console.error("[chat] create group failed", err);
    say("Couldn't create the group \u2014 the database rules probably don't allow groups yet.");
    if (btn) btn.disabled = false;
    return;
  }

  // put it in everyone's list (yours first, so it shows up for you right away)
  await Promise.all(Object.keys(members).map((u) =>
    set(ref(db, `${ROOT}/userGroups/${u}/${gid}`), true).catch((e) => console.warn("[chat] couldn't add", u, e && e.code))
  ));
  groupUi.picked = new Set();
  openThread(gid, name);
}

/* ---------- group info / delete / leave ---------- */
function openGroupInfo(gid) {
  groupUi.gid = gid;
  showView("group");
  renderGroupInfo();
}
function closeGroupInfo() {
  if (state.openThread && state.openThread.uid === groupUi.gid) showView("thread");
  else showView("dms");
}

function renderGroupInfo() {
  const gid = groupUi.gid;
  const g = state.groups[gid];
  const box = $("ycGroupScroll");
  if (!box) return;
  box.innerHTML = "";
  const title = $("ycGroupTitle"), sub = $("ycGroupSub");

  if (!g) {
    if (title) title.textContent = "Group";
    if (sub) sub.textContent = "";
    const e = document.createElement("div");
    e.className = "yc-empty";
    e.textContent = "This group isn't available.";
    box.appendChild(e);
    return;
  }

  const ids = Object.keys(g.members || {});
  const ownerName = (g.members && g.members[g.owner]) || nameFor(g.owner, "the owner");
  if (title) title.textContent = g.name;
  if (sub) sub.textContent = ids.length + " members \u00B7 made by " + (g.owner === state.uid ? "you" : ownerName);

  box.appendChild(sectionTitle("Members \u2014 " + ids.length));
  ids.sort((a, b) => ((b === g.owner) - (a === g.owner)) || String((g.members || {})[a]).localeCompare(String((g.members || {})[b])))
     .forEach((u) => {
    const nm = u === state.uid ? state.name : ((g.members && g.members[u]) || nameFor(u));
    const row = document.createElement("div");
    row.className = "yc-row";
    const avWrap = document.createElement("span");
    avWrap.className = "yc-av-wrap";
    avWrap.appendChild(avatarEl(u, nm));
    const main = document.createElement("div");
    main.className = "yc-row-main";
    const n = document.createElement("div");
    n.className = "yc-row-name";
    n.textContent = nm + (u === state.uid ? " (you)" : "");
    if (u === g.owner) {
      const tag = document.createElement("span");
      tag.className = "yc-grp-tag";
      tag.textContent = "owner";
      n.appendChild(tag);
    }
    main.appendChild(n);
    row.append(avWrap, main);
    if (u !== state.uid) row.onclick = () => { state.profileFrom = "thread"; openProfile(u); };
    box.appendChild(row);
  });

  const actions = document.createElement("div");
  actions.className = "yc-grp-form";
  if (g.owner === state.uid) {
    const note = document.createElement("div");
    note.className = "yc-grp-note";
    note.textContent = "Deleting the group erases every message in it for everyone and frees the space it was using. This can't be undone.";
    const del = document.createElement("button");
    del.className = "yc-grp-btn danger";
    del.textContent = "Delete group chat";
    del.onclick = () => deleteGroup(gid);
    actions.append(note, del);
  } else {
    const note = document.createElement("div");
    note.className = "yc-grp-note";
    note.textContent = "Only " + (g.owner === state.uid ? "you" : ownerName) + " can delete this group. You can leave it \u2014 the messages stay for everyone else.";
    const leave = document.createElement("button");
    leave.className = "yc-grp-btn ghost";
    leave.textContent = "Leave group";
    leave.onclick = () => leaveGroup(gid);
    actions.append(note, leave);
  }
  box.appendChild(actions);
}

async function deleteGroup(gid) {
  const g = state.groups[gid];
  if (!g || g.owner !== state.uid) { say("Only the person who made this group can delete it."); return; }
  if (!window.confirm('Delete "' + g.name + '" for everyone?\n\nEvery message in it is permanently erased. This can\'t be undone.')) return;

  const { ref, remove } = dbfns;
  const members = Object.keys(g.members || {});
  groupUi.deleting = gid;
  try {
    await remove(ref(db, `${ROOT}/groups/${gid}`));      // messages, receipts, typing, everything
  } catch (err) {
    console.error("[chat] delete group failed", err);
    groupUi.deleting = null;
    say("Couldn't delete the group \u2014 the database rules may not allow it.");
    return;
  }
  // take it out of everyone's list (anyone this misses cleans itself up when it sees the group is gone)
  await Promise.all(members.map((u) => remove(ref(db, `${ROOT}/userGroups/${u}/${gid}`)).catch(() => {})));
  groupGone(gid);
  groupUi.deleting = null;
  say("Group deleted.");
}

async function leaveGroup(gid) {
  const g = state.groups[gid];
  if (!g) return;
  if (g.owner === state.uid) { say("You made this group \u2014 delete it instead."); return; }
  if (!window.confirm('Leave "' + g.name + '"?')) return;
  const { ref, remove } = dbfns;
  groupUi.deleting = gid;                                   // silences the "was deleted" toast
  try { await remove(ref(db, `${ROOT}/groups/${gid}/info/members/${state.uid}`)); } catch (e) {}
  await remove(ref(db, `${ROOT}/userGroups/${state.uid}/${gid}`)).catch(() => {});
  groupGone(gid);
  groupUi.deleting = null;
  say("You left the group.");
}

/* ---------- loading state ---------- */
let chatLoaded = false;
function setLoading(on, label) {
  const el = $("ycLoading");
  if (!el) return;
  el.classList.toggle("on", !!on);
  const t = $("ycLoadingText");
  if (t && label) t.textContent = label;
}
/* Called once the first room snapshot lands, or as soon as we know we're
   waiting on the person rather than the network. */
function markLoaded() {
  if (chatLoaded) return;
  chatLoaded = true;
  setLoading(false);
}

/* ---------- views ---------- */
function showView(v) {
  // Retract typing before anything clears the scope we'd be retracting from.
  if (v !== state.view) stopTyping();

  // Leaving a DM for good? stop listening, otherwise its messages keep
  // arriving in the background and getting silently marked as read.
  if ((state.view === "thread" || state.view === "group") && v !== "thread" && v !== "profile" && v !== "group" && state.unsubThread) {
    try { state.unsubThread(); } catch (e) {}
    if (state.unsubReads) { try { state.unsubReads(); } catch (e) {} }
    state.unsubThread = null;
    state.unsubReads = null;
    state.threadReads = {};
    state.openThread = null;
    threadPage = null;
  }
  if (v !== state.view) { cancelCompose(); closeMentionPop(); closeEmoji(); }
  closeReactPicker();
  if (v !== "me" && v !== "profile") state.lastView = v;
  state.view = v;
  const map = {
    gate: "ycViewGate", room: "ycViewRoom", dms: "ycViewDms",
    thread: "ycViewThread", people: "ycViewPeople", me: "ycViewMe",
    profile: "ycViewProfile", group: "ycViewGroup", newgroup: "ycViewNewGroup"
  };
  Object.entries(map).forEach(([k, id]) => {
    const el = $(id); if (el) el.style.display = k === v ? "flex" : "none";
  });

  document.querySelectorAll(".yc-tab").forEach((t) => {
    const key = t.dataset.tab;
    t.classList.toggle("active", key === v || (v === "thread" && key === "dms") || ((v === "group" || v === "newgroup") && key === "dms") || (v === "profile" && key === "people"));
  });

  const comp = $("ycComposer");
  if (comp) comp.style.display = (v === "room" || v === "thread") ? "flex" : "none";
  const inp = $("ycInput");
  if (inp) inp.placeholder = v === "thread" ? ("message " + (state.openThread?.name || "")) : "message the room…";
  if (state.openThread?.name === "System") {inp.disabled = true; comp.style.display = "none";} else {inp.disabled = false; comp.style.display = (v === "room" || v === "thread") ? "flex" : "none";}

  if (v === "room")   { markRoomRead(); scrollToBottom($("ycRoomScroll")); }
  // typing is scoped to whichever conversation you're looking at
  if (v === "room" || v === "thread") {
    const scope = v === "room" ? "room" : (state.openThread && threadId(state.uid, state.openThread.uid));
    if (scope && state.typingScope !== scope) listenTyping(scope);
  } else if (state.typingScope) {
    listenTyping(null);
  }
  if (v === "thread" && state.openThread) { markThreadRead(state.openThread.uid); scrollToBottom($("ycThreadScroll")); } 
  if (v === "people") renderPeople();
  if (v === "dms") renderThreads();
  if (v === "me") {
    refreshOwnAvatars();
    paintShareSwitch();
    paintReceiptSwitch();
    paintNotifSwitch();
    const n = $("ycMeName"); if (n) n.value = state.name || "";
    const b = $("ycMeBio"); if (b) { b.value = state.bio || ""; paintBioCount(); }
    const s = $("ycMeSub"); if (s) s.textContent = state.name ? ("@" + handleOf(state.uid)) : "";
    const hIn = $("ycMeHandle"); if (hIn) { hIn.value = state.handle || ""; paintHandleNote(); }
  }
  if (v === "gate") refreshOwnAvatars();
}

/* ---------- profile picture ---------- */
function pickAvatar() {
  // there's no account to attach it to yet, and it would just sit in
  // localStorage waiting to be inherited by whoever logs in next
  if (!sessionStarted) { say("Log in first, then you can set a picture."); return; }
  const el = $("ycAvatarInput");
  if (el) { el.value = ""; el.click(); }
}

async function handleAvatarFile(file) {
  if (!file) return;
  if (!sessionStarted) return;
  const note = $("ycMeNote") || $("ycGateNote");
  try {
    if (note) note.textContent = "resizing…";
    const { dataUrl, gif } = await prepareImage(file, {
      maxDim: PFP_DIM, maxBytes: PFP_MAX_BYTES, square: true, gifMaxBytes: PFP_GIF_MAX_BYTES
    });
    if (gif && note) note.textContent = "keeping the animation…";
    state.pfp = dataUrl;
    try { localStorage.setItem("yc_pfp", dataUrl); } catch (e) { /* quota — still works this session */ }
    refreshOwnAvatars();
    if (state.name && db) {
      await publishProfile();
      if (meRef) dbfns.update(meRef, { hasPfp: true }).catch(() => {});
      say("Profile picture updated 👀");
    }
    if (note) note.textContent = "Looking good.";
  } catch (err) {
    console.error("[chat] avatar failed", err);
    if (note) note.textContent = err.message || "couldn't use that picture";
    say(err.message || "Couldn't use that picture.");
  }
}

async function removeAvatar() {
  state.pfp = null;
  try { localStorage.removeItem("yc_pfp"); } catch (e) {}
  refreshOwnAvatars();
  if (state.name && db) {
    await publishProfile();
    if (meRef) dbfns.update(meRef, { hasPfp: false }).catch(() => {});
  }
  say("Profile picture removed.");
}

/* ---------- @handles ----------
   A display handle, separate from the uid. The uid is the key for messages, DM
   threads, receipts and moderation, so letting people change *that* would
   orphan their history and let a banned person walk away as someone new. */
const HANDLE_RE = /^[a-z0-9_.]{3,16}$/;
const UID_SHAPE = /^u[a-z0-9]{6,12}$/;   // what auto-generated uids look like

function handleOf(uid) {
  if (uid === state.uid && state.handle) return state.handle;
  const p = state.profiles && state.profiles[uid];
  return (p && p.handle) || uid;
}

function handleProblem(h) {
  if (!h) return null;
  if (!HANDLE_RE.test(h)) return "3–16 characters: letters, numbers, _ or .";
  // stop someone taking a handle that looks like another person's raw uid
  if (UID_SHAPE.test(h) && h !== state.uid) return "that looks like someone's account id — pick something else";
  return null;
}

async function claimHandle(raw) {
  const h = String(raw || "").trim().toLowerCase().replace(/^@/, "");
  if (!h || h === state.handle) return { ok: true, handle: state.handle };
  const bad = handleProblem(h);
  if (bad) return { ok: false, error: bad };

  const { ref, get: dbGet, set: dbSet, remove } = dbfns;
  const snap = await dbGet(ref(db, `${ROOT}/handles/${h}`));
  if (snap.exists() && snap.val() !== state.uid) return { ok: false, error: "that handle's taken" };

  await dbSet(ref(db, `${ROOT}/handles/${h}`), state.uid);
  // let go of the old one, but only if it was actually ours
  if (state.handle && state.handle !== h) {
    try {
      const old = await dbGet(ref(db, `${ROOT}/handles/${state.handle}`));
      if (old.val() === state.uid) await remove(ref(db, `${ROOT}/handles/${state.handle}`));
    } catch (e) {}
  }
  state.handle = h;
  return { ok: true, handle: h };
}

function paintHandleNote() {
  const inp = $("ycMeHandle"), note = $("ycHandleNote");
  if (!inp || !note) return;
  const h = inp.value.trim().toLowerCase().replace(/^@/, "");
  const bad = handleProblem(h);
  note.className = "yc-handle-note" + (bad ? " bad" : "");
  note.textContent = bad || (h ? "your profile will show @" + h : "leave blank to keep @" + state.uid);
}

async function saveProfile() {
  const hEl = $("ycMeHandle");
  if (hEl) {
    const res = await claimHandle(hEl.value);
    if (!res.ok) {
      const note = $("ycHandleNote");
      if (note) { note.className = "yc-handle-note bad"; note.textContent = res.error; }
      say(res.error);
      return;           // don't half-save the rest
    }
  }
  const el = $("ycMeName");
  const v = ((el && el.value) || "").trim().slice(0, 24);
  const bioEl = $("ycMeBio");
  if (bioEl) {
    state.bio = (bioEl.value || "").trim().slice(0, 160);
    try { localStorage.setItem("yc_bio", state.bio); } catch (e) {}
  }
  if (v && v !== state.name) {
    state.name = v;
    localStorage.setItem("yc_name", v);
    if (meRef) dbfns.update(meRef, { name: v }).catch(() => {});
    status("connected", "as " + state.name, "ok");
  }
  await publishProfile();
  refreshOwnAvatars();
  say("Profile saved.");
  showView(state.lastView);
}

/* ---------- sending pictures ---------- */
function sendPicture() {
  if (!state.ready || !state.name) return;
  if (!sessionStarted) { say("You need to log in to chat."); return; }
  if (state.kicked) { say("You've been removed from the chat."); return; }
  if (state.muted)  { say("You're muted in chat."); return; }
  const el = $("ycPictureInput");
  if (el) { el.value = ""; el.click(); }   // reset first so the same file can be picked twice
}

function setUploading(on, text) {
  state.sending = !!on;
  const bar = $("ycUploading");
  if (bar) bar.classList.toggle("on", !!on);
  const t = $("ycUploadingText");
  if (t && text) t.textContent = text;
  const b = $("ycPictureBtn"); if (b) b.disabled = !!on;
  const s = $("ycSendBtn");    if (s) s.disabled = !!on;
}

async function handlePictureFile(file) {
  if (!file) return;
  if (state.sending) { say("Hang on, still sending the last one."); return; }
  if (!state.ready || !state.name) return;
  if (!sessionStarted) { say("You need to log in to chat."); return; }
  if (state.kicked) { say("You've been removed from the chat."); return; }
  if (state.muted)  { say("You're muted in chat."); return; }

  const target = (state.view === "thread" && state.openThread) ? { ...state.openThread } : null;

  /* Pictures used to ignore an open reply entirely: you'd hit Reply, attach an
     image, and it would post as a plain message. Snapshot it now because the
     resize/upload is async. */
  const replyTarget = (compose.mode === "reply" && compose.target) ? {
    key:  compose.target.key,
    uid:  compose.target.uid || null,
    name: compose.target.name || nameFor(compose.target.uid) || "someone",
    text: excerptOf(compose.target)
  } : null;

  setUploading(true, "resizing picture…");
  try {
    const { dataUrl: image, gif } = await prepareImage(file, {
      maxDim: IMG_MAX_DIM, maxBytes: IMG_MAX_BYTES, gifMaxBytes: GIF_MAX_BYTES
    });
    setUploading(true, gif ? "sending GIF…" : "sending picture…");

    const { ref, push, update } = dbfns;
    const payload = {
      uid: state.uid,
      name: state.name,
      kind: "image",
      image,
      gif: !!gif,
      text: "",
      ts: Date.now()
    };
    if (replyTarget) payload.replyTo = replyTarget;

    if (target) {
      const tid = threadId(state.uid, target.uid);
      const pushed = await push(ref(db, `${msgsPath(tid)}`), payload);
      bumpThreadMeta(tid, pushed && pushed.key);   // tells other clients their cache is stale
      const preview = gif ? "GIF" : "📷 Picture";
      if (isGroupId(target.uid)) {
        await touchGroup(target.uid, preview, payload.ts);
      } else {
        await update(ref(db, `${ROOT}/dmIndex/${state.uid}/${target.uid}`), {
          name: target.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
        });
        await update(ref(db, `${ROOT}/dmIndex/${target.uid}/${state.uid}`), {
          name: state.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
        });
      }
      markThreadRead(target.uid, payload.ts);
    } else {
      await push(ref(db, `${ROOT}/room`), payload);
    }
    if (replyTarget && compose.mode === "reply") cancelCompose();
  } catch (err) {
    console.error("[chat] picture failed", err);
    say(err && err.message ? "Picture didn't send — " + err.message : "Picture didn't send.");
  } finally {
    setUploading(false);
    const el = $("ycPictureInput"); if (el) el.value = "";
  }
}

/* ---------- reply & edit ---------- */
/* compose.mode is null, "reply" or "edit" */
const compose = { mode: null, target: null };

function msgPath(key) {
  if (state.view === "thread" && state.openThread) {
    return `${msgsPath(threadId(state.uid, state.openThread.uid))}/${key}`;
  }
  return `${ROOT}/room/${key}`;
}

function excerptOf(m) {
  if (!m) return "";
  if (m.gif) return "GIF";
  if (imageSrcOf(m)) return "Picture";
  return String(m.text || "").replace(/\s+/g, " ").slice(0, 90);
}

function paintComposeChip() {
  const chip = $("ycComposeChip");
  if (!chip) return;
  if (!compose.mode) { chip.style.display = "none"; return; }
  chip.style.display = "flex";
  $("ycChipLabel").textContent = compose.mode === "edit"
    ? "Editing your message"
    : "Replying to " + (compose.target.name || nameFor(compose.target.uid));
  $("ycChipText").textContent = excerptOf(compose.target);
}

function startReply(m) {
  compose.mode = "reply";
  compose.target = m;
  paintComposeChip();
  const i = $("ycInput"); if (i) i.focus();
}

function startEdit(m) {
  if (!m || m.uid !== state.uid) return;
  if (imageSrcOf(m)) { say("Pictures can't be edited — delete and resend."); return; }
  compose.mode = "edit";
  compose.target = m;
  paintComposeChip();
  const i = $("ycInput");
  if (i) { i.value = m.text || ""; i.focus(); autoGrow(); }
}

function cancelCompose() {
  const wasEdit = compose.mode === "edit";
  compose.mode = null;
  compose.target = null;
  paintComposeChip();
  const i = $("ycInput");
  if (i && wasEdit) { i.value = ""; autoGrow(); i.focus(); }
}

async function saveEdit(text) {
  const m = compose.target;
  const { ref, update } = dbfns;
  const mentions = findMentions(text);
  try {
    await update(ref(db, msgPath(m.key)), {
      text,
      edited: Date.now(),
      mentions: mentions.length ? mentions : null
    });
    bumpOpenThreadMeta();
    // keep the DM list preview honest if this was the newest message
    if (state.view === "thread" && state.openThread) {
      const other = state.openThread.uid;
      const t = allThreads()[other];
      if (t && Math.abs((t.lastTs || 0) - (m.ts || 0)) < 1000) {
        const preview = text.slice(0, 60);
        if (isGroupId(other)) {
          await update(ref(db, `${ROOT}/groups/${other}/info/last`), { text: preview });
        } else {
          await update(ref(db, `${ROOT}/dmIndex/${state.uid}/${other}`), { lastText: preview });
          await update(ref(db, `${ROOT}/dmIndex/${other}/${state.uid}`), { lastText: preview });
        }
      }
    }
  } catch (err) {
    console.error("[chat] edit failed", err);
    say("Couldn't save that edit.");
  }
  cancelCompose();
}

function jumpToMessage(key) {
  const box = state.view === "thread" ? $("ycThreadScroll") : $("ycRoomScroll");
  if (!box) return;
  const el = box.querySelector(`[data-key="${CSS.escape(key)}"]`);
  if (!el) { say("That message isn't loaded any more."); return; }
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
}

/* Genre tags, so :sad finds every sad face rather than only the ones whose
   official name happens to contain "sad". Search looks at the name, these
   tags, and anything you add to YC_EMOJI_CUSTOM below. */
const YC_EMOJI_TAGS = {"😠":"angry","👿":"angry","😧":"sad","😰":"scared","😲":"scared","😁":"body happy","🐱":"animal","😹":"animal body drink funny happy sad","😼":"animal happy","🤡":"funny","😖":"sad","🐮":"animal","🤠":"animal clothes","😿":"animal sad","😢":"sad","😞":"hand sad","🥸":"cool","🐶":"animal","😓":"sad","🐲":"animal","🤤":"sleepy","😡":"angry","😘":"love","🥹":"body drink sad","😶‍🌫️":"nature weather","😋":"clothes food love","😱":"body scared","🤮":"sick","🫩":"body clothes sleepy","😵":"body","🫤":"body","🤭":"body hand","🤕":"sick","😷":"sick","🧐":"cool","🫢":"body hand work","😮":"body work","🫣":"body","🤨":"body hand","🙄":"body","😵‍💫":"body","😤":"angry body drink","🤬":"body","😂":"body drink funny happy sad","🤒":"sick weather","😛":"body funny","😶":"body","😨":"body scared","🌛":"nature space","😳":"scared","🙏":"hand","☹️":"sad","😦":"body sad work","🌝":"nature space","😺":"animal happy","😸":"animal body happy","😀":"happy","😃":"body happy","😄":"body happy","😅":"happy","😆":"happy","🙉":"animal body","🐴":"animal","😯":"scared","😽":"animal love","😗":"love","😚":"body love","😙":"body happy love","🌜":"nature space","😭":"sad","🤦‍♂️":"hand","🙍‍♂️":"sad","🙅‍♂️":"clothes love","🙆‍♂️":"clothes love","🙎‍♂️":"angry","🙋‍♂️":"hand","🤑":"body cool money","🐵":"animal","🐭":"animal tech","🤢":"sick","🤓":"cool","🌚":"nature space","🥳":"party","😔":"sad work","😣":"clothes love sad","🤦":"hand","🙍":"sad","🙅":"clothes love","🙆":"clothes love","🙎":"angry","🙋":"hand","🐷":"animal","😾":"angry animal","🐰":"animal","🙌":"hand","😌":"happy","😥":"happy sad","🙈":"animal","😴":"sleepy","😪":"sleepy","🙁":"sad","🙂":"happy","😻":"animal body happy love","☺️":"happy","😇":"happy","😍":"body happy love","🥰":"body happy love","😈":"happy","🤗":"hand happy work","😊":"body happy","😎":"clothes cool drink happy nature weather","🥲":"body drink happy sad","😏":"cool funny","🤧":"sick","🙊":"animal","😝":"body funny","🌞":"nature weather","🐯":"animal","😫":"sleepy","😒":"sad","🙃":"funny happy","🙀":"animal body sad","😩":"body sad","🌬️":"nature weather","😉":"funny","😜":"body funny","🤦‍♀️":"hand","🙍‍♀️":"sad","🙅‍♀️":"clothes love","🙆‍♀️":"clothes love","🙎‍♀️":"angry","🙋‍♀️":"hand","🥴":"sick","😟":"sad","🥱":"sleepy","🤪":"funny","🤐":"body","🇰🇾":"travel","🇭🇲":"body travel","👌":"hand","🎅":"animal","⏰":"time","🏈":"body sport","🫀":"body love","🍼":"drink","👇":"hand","👈":"hand","👉":"hand","👆":"hand","🐻":"animal body","💓":"body love","🖤":"body love","💙":"body love","💔":"body love sad","🤎":"body love","🎯":"body","🤙":"hand","👏":"hand","🍻":"animal drink party","🥂":"clothes drink party","👷":"work","💑":"body love","👨‍❤️‍👨":"body love","👩‍❤️‍👨":"body love","👩‍❤️‍👩":"body love","🤞":"hand","👂":"body","🌽":"body food","🦻":"body clothes love","👁️":"body","👁️‍🗨️":"body","👀":"body","🫆":"hand","🪭":"hand","🦶":"body","👣":"body","⚙️":"body work","💚":"body love","🩶":"body love","💗":"body love","🖐️":"hand","🫰":"hand","👜":"clothes hand","🤝":"hand","💟":"body love","❣️":"body love","🫶":"body hand love","❤️‍🔥":"body love nature","♥️":"body love","💘":"body love","💝":"body love","🥾":"clothes","🪯":"hand","👨‍❤️‍💋‍👨":"love","👩‍❤️‍💋‍👨":"love","👩‍❤️‍💋‍👩":"love","🤛":"hand","🫲":"hand","🫷":"hand","🦵":"body","🩵":"body love","👨‍🚀":"space","🧔‍♂️":"animal body","⛹️‍♂️":"sport","🤸‍♂️":"travel","🧗‍♂️":"sport","👷‍♂️":"work","👨‍🚒":"nature","🏌️‍♂️":"sport","👨‍🦼":"travel","👨‍🦼‍➡️":"travel","🧖‍♂️":"angry drink","🏋️‍♂️":"sport","🚵‍♂️":"nature","👨‍💼":"work","🤾‍♂️":"hand sport","🤽‍♂️":"nature","👮‍♂️":"work","🚣‍♂️":"travel","🏃‍♂️":"sport","🏃‍♂️‍➡️":"sport","🏄‍♂️":"sport","🏊‍♂️":"sport","👨‍🏫":"drink","💁‍♂️":"hand","🧛‍♂️":"scared","👳‍♂️":"body clothes love","🧟‍♂️":"scared","🥭":"food","🕰️":"animal food time","👞":"clothes","🦿":"body","👬":"hand","👯‍♂️":"body","❤️‍🩹":"body love","🖕":"hand","🪍":"hand","👃":"body","🧑‍💼":"work","👊":"hand","🚔":"travel","👐":"hand work","🧡":"body food love","🫳":"hand","🌴":"hand nature","🫴":"hand","🤲":"hand","🍐":"body food","🧑‍🤝‍🧑":"hand","🫂":"happy","👯":"body","🧔":"animal body","⛹️":"sport","🤸":"travel","🧗":"sport","🏌️":"sport","🛌":"sleepy","🧑‍🦼":"travel","🧑‍🦼‍➡️":"travel","🧖":"angry drink","🏋️":"sport","🚵":"nature","🤾":"hand sport","🤽":"nature","🚣":"travel","🏃":"sport","🏃‍➡️":"sport","🏄":"sport","🏊":"sport","🛀":"animal","💁":"hand","👳":"body clothes love","🫅":"clothes","👲":"scared","🐽":"animal body","🤌":"hand","🤏":"hand","🩷":"body love","🐻‍❄️":"animal body","🚓":"travel","🚨":"travel","👮":"work","🍗":"body","🫃":"animal","🫄":"animal","🤰":"animal","💜":"body love","🤚":"hand","✊":"hand","✋":"hand","❤️":"body love","💞":"body love","🤜":"hand","🫱":"hand","🫸":"hand","🏉":"body sport","☃️":"nature weather","⛄":"nature weather","💖":"body love","🍵":"drink hand","📆":"body drink sad time work","🧸":"animal body game","👎":"hand","👍":"hand","👅":"body funny","💕":"body love","🧛":"scared","✌️":"hand","👋":"hand","🤍":"body love","👫":"hand","👩‍🚀":"space","🧔‍♀️":"animal body","⛹️‍♀️":"sport","🤸‍♀️":"travel","🧗‍♀️":"sport","👷‍♀️":"work","👩‍🚒":"nature","🏌️‍♀️":"sport","👩‍🦼":"travel","👩‍🦼‍➡️":"travel","🧖‍♀️":"angry drink","🏋️‍♀️":"sport","🚵‍♀️":"nature","👩‍💼":"work","🤾‍♀️":"hand sport","🤽‍♀️":"nature","👮‍♀️":"work","🚣‍♀️":"travel","🏃‍♀️":"sport","🏃‍♀️‍➡️":"sport","🏄‍♀️":"sport","🏊‍♀️":"sport","👩‍🏫":"drink","💁‍♀️":"hand","🧛‍♀️":"scared","👳‍♀️":"body clothes love","🧕":"clothes travel","🧟‍♀️":"scared","👢":"clothes","👒":"clothes","👡":"clothes","👭":"hand","👯‍♀️":"body","✍️":"hand","💛":"body love","🧟":"scared","🇧🇭":"nature weather","🎄":"nature","🈸":"animal","🇺🇦":"nature weather","🐦":"animal","🐦‍⬛":"animal","🐈‍⬛":"animal","🐡":"animal","🧠":"body nature weather","🍄‍🟫":"nature","🐛":"animal","🚅":"nature travel weather","🌵":"nature","🎠":"animal travel","🐈":"animal","☁️":"nature weather","🌩️":"nature weather","⛈️":"nature weather","🌧️":"nature weather","🌨️":"nature weather","🖱️":"animal tech","🐄":"animal","🌙":"nature space","🍮":"nature space","🌳":"nature","🐕":"animal","🔯":"hand nature space","🍆":"animal food nature","✴️":"hand nature space","🌲":"nature","🍂":"nature","🫯":"nature weather","🔥":"nature","🚒":"nature","🧯":"nature","🧨":"nature","🧑‍🚒":"nature","🎆":"nature party","🌓":"nature space","🐟":"animal","🍥":"animal food party","🎣":"animal sport","🎴":"nature travel","🍀":"love nature","🦊":"animal","🐸":"animal","🌕":"nature space","🌎":"nature","🌏":"nature","🌍":"money nature","🌐":"nature","🌟":"nature space","🦮":"animal","🌿":"nature","🚄":"nature travel weather","🐎":"animal","🏇":"animal","🌭":"animal food","🪪":"animal travel","🪼":"animal","🌗":"nature space","🍃":"clothes love nature weather","🪾":"nature","🥬":"nature","🦁":"animal","🍁":"nature travel","🐒":"animal","🥮":"food nature party space","🎑":"nature space","🐁":"animal tech","🪤":"animal tech","🍄":"nature","🌑":"nature space","🌃":"nature space","🚱":"nature","🐧":"animal work","🐖":"animal","🚰":"nature","🪴":"animal nature","🌈":"nature weather","🐕‍🦺":"animal","🌠":"nature space","🏔️":"nature weather","🏂":"nature weather","❄️":"nature weather","🕷️":"animal","🕸️":"animal","🐳":"angry animal","⭐":"nature space","🤩":"happy nature space travel","☪️":"nature space","✡️":"nature space","☀️":"nature weather","⛅":"nature weather","🌥️":"nature weather","🌦️":"nature weather","🌤️":"nature weather","🌻":"nature weather","🕶️":"clothes cool drink nature weather","🌅":"nature weather","🌄":"nature weather","🌇":"nature weather","🎋":"animal nature","🐅":"animal","🚆":"nature travel weather","🐠":"animal","☔":"nature weather","🌘":"nature space","🌖":"nature space","🐃":"nature","🚾":"nature","🔫":"nature","🌊":"hand nature","🍉":"food nature","🌒":"nature space","🌔":"nature space","🐋":"animal","💮":"nature","🥀":"nature","🎐":"nature weather","🪟":"nature weather","🐺":"animal","♑":"food","🇬🇸":"food travel","🇵🇲":"food","🥑":"food","🥓":"food","🥖":"clothes food","🍌":"food","🍺":"animal drink","🫑":"food","🎂":"food party","🍞":"food","🧋":"drink","🍬":"food","🥫":"food","🥕":"food travel","🧀":"food","🌸":"food nature","🍫":"food","🍸":"drink","🥥":"food","🍚":"food","🍪":"food","🧁":"drink food party","🍛":"food","🥩":"food","🍩":"food","🥚":"food","🫓":"food","🥠":"food","🍟":"food","🥛":"drink","🍇":"food","🍏":"food","🥗":"food","🍔":"food","🌶️":"food","🍨":"food","🥝":"food","🔶":"food","🍋":"food","🍋‍🟩":"food","🍖":"body food","🍈":"food","🌌":"drink","🪺":"food","🩱":"food sport","📙":"food school","🟠":"food","🟧":"food","🥞":"food party","🍑":"food","🥧":"food","🍍":"food","🍕":"food","🍿":"food","🍲":"food","🥔":"food","🧩":"food game","🍎":"food","🍙":"food sport","🍘":"food","🍠":"food","🥪":"food","🥘":"food","🌾":"food","🍰":"food party","🔸":"food","🍦":"food","🍜":"angry animal drink","🍓":"food","🥙":"food","🍣":"food","🌮":"food","🧑‍🏫":"drink","🫖":"drink","🍅":"food","🍹":"drink","🦄":"animal food","🧇":"food","🍷":"drink","🥇":"sport","🥈":"sport","🥉":"sport","🇧🇳":"sport","🇧🇮":"sport","🧑‍🩰":"sport","🩰":"clothes sport","🎈":"party sport","🗳️":"sport","📊":"money work","⚾":"sport","🏀":"sport","🎳":"animal sport","📷":"tech","📸":"tech","📉":"money work","📈":"money work","💹":"money work","♟️":"animal game","🎊":"party sport","🏏":"game sport","🔮":"sad sport","🥁":"music","🎲":"game","🎸":"music","🎧":"music tech","⛸️":"sport","🕹️":"game happy","🪘":"music","🥋":"sport","🎤":"music tech","🎖️":"sport","🪩":"sport","🎥":"tech","🎹":"music tech","🎵":"music","🎶":"music","🎼":"music","🛢️":"music","🎉":"party","🛂":"sport travel","🎱":"game sport","🛼":"sport","🎽":"clothes sport","👟":"clothes sport","🛹":"sport","⛷️":"sport","🎿":"sport","⚽":"sport","🥎":"sport","💬":"party sport","🚙":"sport","🏅":"sport","🎙️":"music tech","💭":"party sport","🖲️":"sport","🏆":"sport","🎺":"music","📹":"tech","🎮":"game","🎻":"music","🏐":"sport","🇦🇨":"travel","🇧🇻":"travel","🇻🇬":"travel","🇮🇨":"travel","🇧🇶":"travel","🇨🇽":"travel","🇨🇵":"travel","🇨🇨":"travel","🇨🇰":"travel","🇫🇰":"travel","🇫🇴":"travel","🈺":"travel work","🇲🇬":"travel","🇲🇭":"travel","🇳🇮":"travel","🇳🇫":"travel","🇲🇵":"travel","🇵🇳":"travel","🇸🇧":"travel","🇹🇨":"travel","🇺🇲":"travel","🇻🇮":"travel","🚡":"travel","✈️":"travel","🛬":"travel","🛫":"travel","🏖️":"travel weather","🚲":"sport travel","🏗️":"work","🚌":"travel","🚏":"travel","👤":"travel","👥":"travel","🗃️":"travel work","📇":"travel","🗂️":"travel","🎏":"travel","🪚":"travel work","🎪":"travel","💳":"money travel","🚚":"travel","🏝️":"travel","🖋️":"work","🚁":"travel","🏨":"travel","🏩":"love travel","🗾":"travel","🚇":"travel","🚐":"travel","🛥️":"travel","🛵":"travel","🏍️":"travel","🦼":"travel","🛣️":"travel","⛰️":"nature","🚠":"nature","🚞":"nature","🚳":"sport travel","🏢":"work","🚍":"travel","🚖":"travel","🛳️":"travel","🛻":"travel","🪧":"travel","🛐":"travel","🏎️":"travel","🚃":"travel","🪐":"clothes love space travel","🚀":"space travel","⛵":"travel","🧣":"clothes travel","🚢":"travel","🛒":"travel","🛩️":"travel","🚤":"travel","🚉":"travel","🚕":"travel","⛺":"travel","🚊":"travel","🚋":"travel","🚎":"travel","🗺️":"travel","🇦🇽":"travel","🇦🇶":"animal","🇦🇬":"animal","🇹🇫":"animal","♊":"money","🏣":"work","🇰🇮":"animal","🇸🇮":"love","🇹🇹":"clothes","💤":"sleepy","🧮":"school","🪗":"music","🩹":"sick","👽":"scared space","👾":"scared space","🐜":"animal","📶":"animal tech","🧑‍🚀":"space","🚗":"tech","🪓":"weapon","🎒":"school","🏸":"sport","🥯":"clothes","🛄":"clothes","🪕":"music","🏦":"money","🦇":"animal","🛁":"animal","🔋":"animal tech","🛏️":"sleepy","🪲":"animal","🧃":"angry","👙":"clothes","🌼":"nature","📘":"school","💣":"weapon","🦴":"body","🔖":"school","📑":"school","📚":"school work","🍾":"drink","🥣":"animal","🥊":"clothes love sport","💼":"work","🧈":"food","🦋":"animal food","📅":"time work","🐪":"animal","🍒":"food","🐔":"animal","🎬":"hand","📋":"work","📕":"school","🌂":"weather","👝":"clothes","🧥":"clothes","🪙":"money","☄️":"space","💽":"tech","🚧":"work","🦀":"animal","🦗":"sport","🥐":"animal","👑":"clothes","🥤":"drink","🗡️":"weapon","🦌":"animal","🖥️":"tech","🤿":"sick","💫":"sick","🐉":"animal","👗":"clothes","🦆":"animal","🥟":"food","🦅":"animal","🕗":"time","🔌":"tech","🐘":"animal","🕚":"time","🏑":"sport","🗄️":"work","📁":"work","🕔":"time","🥿":"clothes","💾":"tech","🌫️":"weather","🌁":"weather","🍴":"weapon","🍽️":"weapon","🕓":"time","🍤":"angry","💎":"money","👻":"scared","🦒":"animal","👓":"clothes drink","🧤":"clothes love","🐐":"animal","👺":"scared","🎓":"school","📗":"school","🔨":"work","⚒️":"work","🛠️":"work","🐹":"animal","🪉":"music","🐣":"clothes","🦔":"animal","👠":"clothes","🍯":"food","🐝":"animal food","☕":"angry","♨️":"clothes love","⌛":"drink time","⏳":"drink time","💯":"hand","🏒":"sport","🫵":"hand","☝️":"hand","🎃":"animal","⌨️":"tech","👘":"clothes","💏":"love","💋":"love","🔪":"weapon","🪁":"game","🐨":"animal","🥼":"clothes","🐞":"animal","💻":"tech","🛅":"travel","🖇️":"work","🦙":"animal","🔏":"work","🧴":"drink","🤟":"love","🪫":"animal tech","🧳":"travel","🫁":"body","🔍":"drink","🔎":"drink","🀄":"animal","🧉":"drink","📣":"tech","📝":"work","🔬":"school","📱":"tech","📴":"tech","🫌":"animal food","💰":"clothes money","💸":"money","👄":"body","🪆":"game","🕘":"time","📓":"music school","📔":"music school","🐙":"animal","👹":"scared","🚘":"tech","🕐":"time","📖":"school work","📂":"work","💿":"tech","🦦":"animal","🦉":"animal","🐼":"animal","📎":"work","🐾":"animal","🖊️":"work","✏️":"school work","💊":"sick","🪅":"game","🪠":"body","🏤":"work","🫗":"clothes love","🖨️":"tech","👛":"clothes","🐇":"animal","📻":"music","☢️":"music","🧾":"money","🏮":"animal","💍":"clothes love","🛟":"clothes love","🤖":"tech","🤣":"funny happy","🐓":"animal","🌹":"love","🏵️":"love","🍶":"drink","🥻":"clothes","🛰️":"space tech","📡":"animal space tech","🎷":"music tech","🏫":"school","🌱":"nature","🕖":"time","🦈":"animal","🛡️":"weapon","🛍️":"clothes","🦐":"angry","🕕":"time","💀":"scared","🎰":"game","🦥":"animal game","🐍":"animal","🧦":"clothes","🎇":"party","🗓️":"time work","🗒️":"music","⏱️":"time","📏":"school","🚟":"work","💉":"clothes love sick","👕":"clothes","☎️":"tech","📞":"tech","🔭":"school space","📺":"tech","🕙":"time","🎾":"sport","🌡️":"sick weather","🩴":"clothes","🕒":"time","⏲️":"time","🦷":"body","🪥":"body","🎩":"clothes","🌪️":"weather","📐":"school","🪊":"body","🌷":"nature","🥃":"drink","🐢":"animal","🕛":"time","🐫":"animal","🕑":"time","☂️":"weather","⛱️":"weather","🌋":"nature","⌚":"time","🎁":"party","🔧":"work","🪀":"game","🦓":"animal","🆒":"cool","🇪🇺":"money","🇸🇯":"money","🔃":"time","🔄":"time","⚔️":"weapon","💵":"money music","💶":"money music","💲":"money","💌":"love","📲":"tech","🚯":"clothes love","📵":"tech","💷":"money music","🔘":"music","🔻":"hand","🔺":"hand","☠️":"body scared","💴":"money music","🏴":"flag","🏁":"flag","📪":"flag","📫":"flag hand","🎌":"flag","⛳":"flag","📭":"flag work","📬":"flag hand work","🏴‍☠️":"flag","🏳️‍🌈":"flag nature weather","🏳️‍⚧️":"flag","🚩":"flag","🏳️":"flag"};

/* Familiar Discord/Slack shortcodes (:joy:, :sob:, :pray:). Generated, so
   don't hand-edit this one — put your own names in YC_EMOJI_CUSTOM below,
   which overrides it. Emoji whose real name is already the familiar one
   (skull, eyes, fire) aren't listed because they need no alias. */
const YC_EMOJI_ALIASES = {"😠":"angry","👿":"imp","😧":"anguished","😰":"cold_sweat","😲":"astonished","😁":"grin","🐱":"cat","😹":"joy_cat","😼":"smirk_cat","😖":"confounded","😕":"confused","🐮":"cow","😿":"crying_cat_face","😢":"cry","😞":"disappointed","🐶":"dog","😓":"sweat","😡":"pout rage","😑":"expressionless","😘":"kissing_heart","😋":"yum","😱":"scream","🤮":"vomiting_face","😵":"dizzy_face knocked_out_face","🤭":"hand_over_mouth","😷":"mask","🧐":"monocle_face","😮":"open_mouth","🤨":"raised_eyebrow","🙄":"roll_eyes","😤":"triumph","🤬":"cursing_face","😂":"joy","😛":"stuck_out_tongue","😶":"no_mouth","😨":"fearful","🌛":"first_quarter_moon_with_face","😳":"flushed","🙏":"pray","☹️":"white_frowning_face","😦":"frowning","🌝":"full_moon_with_face","😬":"grimacing","😺":"smiley_cat","😸":"smile_cat","😀":"grinning","😃":"smiley","😄":"smile","😅":"sweat_smile","😆":"laughing satisfied","🙉":"hear_no_evil","🐴":"horse","😯":"hushed","😗":"kissing","😚":"kissing_closed_eyes","😙":"kissing_smiling_eyes","🌜":"last_quarter_moon_with_face","😭":"sob","🙇‍♂️":"bowing_man","🙍‍♂️":"frowning_man","🙅‍♂️":"ng_man no_good_man","🙆‍♂️":"ok_man","🙎‍♂️":"pouting_man","🙋‍♂️":"raising_hand_man","🐭":"mouse","🌚":"new_moon_with_face","😔":"pensive","😣":"persevere","🙇":"bow","🤦":"facepalm","🙍":"frowning_person","🙅":"no_good","🙆":"ok_person","🙎":"pouting_face person_with_pouting_face","🙋":"raising_hand","🐷":"pig","🐰":"rabbit","🙌":"raised_hands","😌":"relieved","😥":"disappointed_relieved","🙈":"see_no_evil","😴":"sleeping","😪":"sleepy","😻":"heart_eyes_cat","☺️":"relaxed","😇":"innocent","😍":"heart_eyes","🥰":"smiling_face_with_three_hearts","😈":"smiling_imp","🤗":"hugs hugging_face","😊":"blush","😎":"sunglasses","😏":"smirk","🙊":"speak_no_evil","😝":"stuck_out_tongue_closed_eyes","🤔":"thinking","🐯":"tiger","😒":"unamused","🙀":"scream_cat","😩":"weary","🌬️":"wind_blowing_face","😉":"wink","😜":"stuck_out_tongue_winking_eye","🙇‍♀️":"bowing_woman","🙍‍♀️":"frowning_woman","🙅‍♀️":"ng_woman no_good_woman","🙆‍♀️":"ok_woman","🙎‍♀️":"pouting_woman","🙋‍♀️":"raising_hand_woman","😟":"worried","🇦🇲":"flag_for_armenia","🇰🇾":"flag_for_cayman_islands","🇩🇪":"de flag_for_germany","🇭🇲":"heard_mcdonald_islands flag_for_heard_mcdonald_islands","🇮🇲":"flag_for_isle_of_man","🇴🇲":"flag_for_oman","🇷🇴":"flag_for_romania","🎅":"santa","🇬🇧":"gb uk flag_for_united_kingdom","🏈":"football","👼":"angel","👇":"point_down","👈":"point_left","👉":"point_right","👆":"point_up_2","💓":"heartbeat","🎯":"dart","👏":"clap","🍻":"beers","🍳":"egg fried_egg","🌽":"corn","👁️‍🗨️":"eye_speech_bubble","🐥":"hatched_chick","💗":"heartpulse","🖐️":"raised_hand_with_fingers_splayed","❣️":"heavy_heart_exclamation heavy_heart_exclamation_mark_ornament","♥️":"hearts","💘":"cupid","💝":"gift_heart","👨‍❤️‍💋‍👨":"couplekiss_man_man","👩‍❤️‍💋‍👨":"couplekiss_man_woman","👩‍❤️‍💋‍👩":"couplekiss_woman_woman","🤛":"fist_left","👨‍🦲":"bald_man","🚴‍♂️":"biking_man","👱‍♂️":"blond_haired_man","⛹️‍♂️":"basketball_man bouncing_ball_man","🧗‍♂️":"climbing_man","👷‍♂️":"construction_worker_man","👨‍🦱":"curly_haired_man","🕵️‍♂️":"male_detective","🧝‍♂️":"elf_man","🧚‍♂️":"fairy_man","🧞‍♂️":"genie_man","💇‍♂️":"haircut_man","💆‍♂️":"massage_man","🏌️‍♂️":"golfing_man","💂‍♂️":"guardsman","🧘‍♂️":"lotus_position_man","🧖‍♂️":"sauna_man","🧎‍♂️":"kneeling_man","🏋️‍♂️":"weight_lifting_man","🧙‍♂️":"mage_man","🚵‍♂️":"mountain_biking_man","👮‍♂️":"policeman","👨‍🦰":"red_haired_man","🚣‍♂️":"rowing_man","🏃‍♂️":"running_man","🧍‍♂️":"standing_man","🦸‍♂️":"superhero_man","🦹‍♂️":"supervillain_man","🏄‍♂️":"surfing_man","🏊‍♂️":"swimming_man","💁‍♂️":"sassy_man tipping_hand_man","🧛‍♂️":"vampire_man","🚶‍♂️":"walking_man","👳‍♂️":"man_with_turban","👨‍🦳":"white_haired_man","👨‍🦯":"man_with_probing_cane","🧟‍♂️":"zombie_man","👞":"shoe mans_shoe","👬":"two_men_holding_hands","👯‍♂️":"dancing_men","🖕":"fu reversed_hand_with_middle_finger_extended","👴":"older_man","👵":"older_woman","🧓":"older_adult","👊":"punch facepunch fist_oncoming","👯":"dancers","🤼":"wrestling","🧑":"adult","🧔":"bearded_person","🚴":"bicyclist","👱":"blond_haired_person person_with_blond_hair","⛹️":"person_with_ball bouncing_ball_person","🤸":"cartwheeling","🧗":"climbing","💇":"haircut","💆":"massage","🏌️":"golfer golfing","🛌":"sleeping_bed sleeping_accommodation","🧘":"lotus_position","🧖":"sauna_person","🕴️":"business_suit_levitating man_in_business_suit_levitating","🤹":"juggling_person","🧎":"kneeling_person","🏋️":"weight_lifter weight_lifting","🚵":"mountain_bicyclist","🤾":"handball_person","🤽":"water_polo","🚣":"rowboat","🏃":"runner running","🤷":"shrug","🧍":"standing_person","🏄":"surfer","🏊":"swimmer","🛀":"bath","💁":"tipping_hand_person information_desk_person","🚶":"walking","👳":"person_with_turban","👲":"man_with_gua_pi_mao","🧑‍🦯":"person_with_probing_cane","🚨":"rotating_light","👮":"cop","✊":"fist fist_raised","✋":"hand","❤️":"heart","⛑️":"rescue_worker_helmet rescue_workers_helmet helmet_with_white_cross","🤜":"fist_right","☃️":"snowman_with_snow","⛄":"snowman","🗣️":"speaking_head_in_silhouette","🍵":"tea","📆":"calendar","👎":"thumbsdown","👍":"thumbsup","👋":"wave","👫":"couple","👩‍🦲":"bald_woman","🚴‍♀️":"biking_woman","👱‍♀️":"blonde_woman blond_haired_woman","⛹️‍♀️":"basketball_woman bouncing_ball_woman","🧗‍♀️":"climbing_woman","👷‍♀️":"construction_worker_woman","👩‍🦱":"curly_haired_woman","💃":"dancer","🕵️‍♀️":"female_detective","🧝‍♀️":"elf_woman","🧚‍♀️":"fairy_woman","🧞‍♀️":"genie_woman","💇‍♀️":"haircut_woman","💆‍♀️":"massage_woman","🏌️‍♀️":"golfing_woman","💂‍♀️":"guardswoman","🧘‍♀️":"lotus_position_woman","🧖‍♀️":"sauna_woman","🧎‍♀️":"kneeling_woman","🏋️‍♀️":"weight_lifting_woman","🧙‍♀️":"mage_woman","🚵‍♀️":"mountain_biking_woman","👮‍♀️":"policewoman","👩‍🦰":"red_haired_woman","🚣‍♀️":"rowing_woman","🏃‍♀️":"running_woman","🧍‍♀️":"standing_woman","🦸‍♀️":"superhero_woman","🦹‍♀️":"supervillain_woman","🏄‍♀️":"surfing_woman","🏊‍♀️":"swimming_woman","💁‍♀️":"sassy_woman tipping_hand_woman","🧛‍♀️":"vampire_woman","🚶‍♀️":"walking_woman","👳‍♀️":"woman_with_turban","👩‍🦳":"white_haired_woman","👰‍♀️":"bride_with_veil","👩‍🦯":"woman_with_probing_cane","🧟‍♀️":"zombie_woman","👢":"boot womans_boot","👚":"womans_clothes","👒":"womans_hat","👡":"sandal womans_sandal","👭":"two_women_holding_hands","👯‍♀️":"dancing_women","🇧🇭":"flag_for_bahrain","🈸":"u7533","🇺🇦":"flag_for_ukraine","🐦‍⬛":"crow rook raven","🚅":"bullettrain_front","🐈":"cat2","⛈️":"thunder_cloud_and_rain","🖱️":"three_button_mouse","🐄":"cow2","🐕":"dog2","🔯":"six_pointed_star","✴️":"eight_pointed_black_star","🍥":"fish_cake","🎣":"fishing_pole_and_fish","🦊":"fox_face","🌎":"earth_americas","🌏":"earth_asia","🌍":"earth_africa","🌟":"star2","🚄":"bullettrain_side","🐎":"racehorse","🌭":"hotdog","🍃":"leaves","🦁":"lion_face","🎑":"rice_scene","🐁":"mouse2","🐖":"pig2","🌠":"stars","🏔️":"mountain_snow","🐳":"whale","☀️":"sunny","⛅":"partly_sunny","🌥️":"white_sun_behind_cloud","🌦️":"white_sun_behind_cloud_with_rain","🌤️":"white_sun_with_small_cloud","🕶️":"dark_sunglasses","🌇":"city_sunrise","🐅":"tiger2","🚆":"train2","☔":"umbrella","🚾":"wc","🔫":"gun","🌊":"ocean","🌔":"moon","🐋":"whale2","🇬🇸":"flag_for_south_georgia_south_sandwich_islands","🇵🇲":"flag_for_st_pierre_miquelon","🍺":"beer","🎂":"birthday","🧀":"cheese","🍸":"cocktail","🍚":"rice","🍛":"curry","🥚":"egg2","🍟":"fries","🥛":"milk_glass","🍲":"stew","🧩":"jigsaw","🍎":"apple","🍠":"sweet_potato","🌾":"ear_of_rice","🍰":"cake","🍦":"icecream","🍜":"ramen","🦄":"unicorn_face","🇧🇳":"flag_for_brunei","🇧🇮":"flag_for_burundi","🇲🇶":"flag_for_martinique","🇸🇽":"flag_for_sint_maarten","🇧🇱":"st_barthelemy flag_for_st_barth_lemy","🇲🇫":"flag_for_st_martin","🎟️":"tickets","🎨":"art","🗳️":"ballot_box","📸":"camera_flash","📉":"chart_with_downwards_trend","📈":"chart_with_upwards_trend","💹":"chart","🏏":"cricket_bat_and_ball","🎞️":"film_strip","🎧":"headphones","🎖️":"medal_military","🎶":"notes","🖌️":"lower_left_paintbrush","🎉":"tada","🎱":"8ball","🎽":"running_shirt_with_sash","👟":"athletic_shoe","🎿":"ski","⚽":"soccer","🚙":"blue_car","🏅":"medal_sports","📼":"vhs","🇦🇨":"flag_for_ascension_island","🇧🇻":"flag_for_bouvet_island","🇻🇬":"flag_for_british_virgin_islands","🇮🇨":"flag_for_canary_islands","🇧🇶":"flag_for_caribbean_netherlands","🇨🇽":"flag_for_christmas_island","🇨🇵":"flag_for_clipperton_island","🇨🇨":"cocos_islands flag_for_cocos_islands","🇨🇰":"flag_for_cook_islands","🇫🇰":"flag_for_falkland_islands","🇫🇴":"flag_for_faroe_islands","🈺":"u55b6","🇲🇬":"flag_for_madagascar","🇲🇭":"flag_for_marshall_islands","🇳🇮":"flag_for_nicaragua","🇳🇫":"flag_for_norfolk_island","🇲🇵":"flag_for_northern_mariana_islands","🇵🇳":"flag_for_pitcairn_islands","🇸🇧":"flag_for_solomon_islands","🇹🇨":"flag_for_turks_caicos_islands","🇺🇲":"us_outlying_islands flag_for_u_s_outlying_islands","🇻🇮":"us_virgin_islands flag_for_u_s_virgin_islands","🇻🇦":"flag_for_vatican_city","🛬":"flight_arrival airplane_arriving","🛫":"flight_departure","🏖️":"beach_umbrella","🚲":"bike","🚏":"busstop","🎏":"flags","🏰":"european_castle","🌆":"city_sunset","🚚":"truck","🏚️":"derelict_house_building","🖋️":"lower_left_fountain_pen","🏘️":"house_buildings","🗾":"japan","🏍️":"racing_motorcycle","🏢":"office","⛵":"boat","🚋":"train","🇦🇽":"aland_islands flag_for_land_islands","🇦🇫":"flag_for_afghanistan","🇦🇱":"flag_for_albania","🇩🇿":"flag_for_algeria","🇦🇸":"flag_for_american_samoa","🇦🇩":"flag_for_andorra","🇦🇴":"flag_for_angola","🇦🇮":"flag_for_anguilla","🇦🇶":"flag_for_antarctica","🇦🇬":"flag_for_antigua_barbuda","🇦🇷":"flag_for_argentina","🇦🇼":"flag_for_aruba","🇦🇺":"flag_for_australia","🇦🇹":"flag_for_austria","🇦🇿":"flag_for_azerbaijan","🇧🇸":"flag_for_bahamas","🇧🇩":"flag_for_bangladesh","🇧🇧":"flag_for_barbados","🇧🇾":"flag_for_belarus","🇧🇪":"flag_for_belgium","🇧🇿":"flag_for_belize","🇧🇯":"flag_for_benin","🇧🇲":"flag_for_bermuda","🇧🇹":"flag_for_bhutan","🇧🇴":"flag_for_bolivia","🇧🇦":"flag_for_bosnia_herzegovina","🇧🇼":"flag_for_botswana","🇧🇷":"flag_for_brazil","🇮🇴":"flag_for_british_indian_ocean_territory","🇧🇬":"flag_for_bulgaria","🇧🇫":"flag_for_burkina_faso","🇰🇭":"flag_for_cambodia","🇨🇲":"flag_for_cameroon","🇨🇦":"flag_for_canada","🇨🇻":"flag_for_cape_verde","🇨🇫":"flag_for_central_african_republic","🇪🇦":"flag_for_ceuta_melilla","🇹🇩":"flag_for_chad","🇨🇱":"flag_for_chile","🇨🇳":"cn flag_for_china","🇨🇴":"flag_for_colombia","🇰🇲":"flag_for_comoros","🇨🇬":"flag_for_congo_brazzaville","🇨🇩":"flag_for_congo_kinshasa","🇨🇷":"flag_for_costa_rica","🇭🇷":"flag_for_croatia","🇨🇺":"flag_for_cuba","🇨🇼":"curacao flag_for_cura_ao","🇨🇾":"flag_for_cyprus","🇨🇿":"czech_republic flag_for_czech_republic","🇨🇮":"cote_divoire flag_for_c_te_d_ivoire","🇩🇰":"flag_for_denmark","🇩🇬":"flag_for_diego_garcia","🇩🇯":"flag_for_djibouti","🇩🇲":"flag_for_dominica","🇩🇴":"flag_for_dominican_republic","🇪🇨":"flag_for_ecuador","🇪🇬":"flag_for_egypt","🇸🇻":"flag_for_el_salvador","🇬🇶":"flag_for_equatorial_guinea","🇪🇷":"flag_for_eritrea","🇪🇪":"flag_for_estonia","🇸🇿":"swaziland flag_for_swaziland","🇪🇹":"flag_for_ethiopia","🇫🇯":"flag_for_fiji","🇫🇮":"flag_for_finland","🇫🇷":"fr flag_for_france","🇬🇫":"flag_for_french_guiana","🇵🇫":"flag_for_french_polynesia","🇹🇫":"french_southern_territories flag_for_french_southern_territories","🇬🇦":"flag_for_gabon","🇬🇲":"flag_for_gambia","🇬🇪":"flag_for_georgia","🇬🇭":"flag_for_ghana","🇬🇮":"flag_for_gibraltar","🇬🇷":"flag_for_greece","🇬🇱":"flag_for_greenland","🇬🇩":"flag_for_grenada","🇬🇵":"flag_for_guadeloupe","🇬🇺":"flag_for_guam","🇬🇹":"flag_for_guatemala","🇬🇬":"flag_for_guernsey","🇬🇳":"flag_for_guinea","🇬🇼":"flag_for_guinea_bissau","🇬🇾":"flag_for_guyana","🇭🇹":"flag_for_haiti","🇭🇳":"flag_for_honduras","🇭🇰":"hong_kong flag_for_hong_kong","🇭🇺":"flag_for_hungary","🇮🇸":"flag_for_iceland","🇮🇳":"flag_for_india","🇮🇩":"flag_for_indonesia","🇮🇷":"flag_for_iran","🇮🇶":"flag_for_iraq","🇮🇪":"flag_for_ireland","🇮🇱":"flag_for_israel","🇮🇹":"it flag_for_italy","🇯🇲":"flag_for_jamaica","🇯🇵":"jp flag_for_japan","🎎":"dolls","🏣":"post_office","🇯🇪":"flag_for_jersey","🇯🇴":"flag_for_jordan","🇰🇿":"flag_for_kazakhstan","🇰🇪":"flag_for_kenya","🇰🇮":"flag_for_kiribati","🇽🇰":"flag_for_kosovo","🇰🇼":"flag_for_kuwait","🇰🇬":"flag_for_kyrgyzstan","🇱🇦":"flag_for_laos","🇱🇻":"flag_for_latvia","🇱🇧":"flag_for_lebanon","🇱🇸":"flag_for_lesotho","🇱🇷":"flag_for_liberia","🇱🇾":"flag_for_libya","🇱🇮":"flag_for_liechtenstein","🇱🇹":"flag_for_lithuania","🇱🇺":"flag_for_luxembourg","🇲🇴":"macau flag_for_macau","🇲🇼":"flag_for_malawi","🇲🇾":"flag_for_malaysia","🇲🇻":"flag_for_maldives","🇲🇱":"flag_for_mali","🇲🇹":"flag_for_malta","🇲🇷":"flag_for_mauritania","🇲🇺":"flag_for_mauritius","🇾🇹":"flag_for_mayotte","🇲🇽":"flag_for_mexico","🇫🇲":"flag_for_micronesia","🇲🇩":"flag_for_moldova","🇲🇨":"flag_for_monaco","🇲🇳":"flag_for_mongolia","🇲🇪":"flag_for_montenegro","🇲🇸":"flag_for_montserrat","🇲🇦":"flag_for_morocco","🇲🇿":"flag_for_mozambique","🇲🇲":"myanmar flag_for_myanmar","🇳🇦":"flag_for_namibia","🇳🇷":"flag_for_nauru","🇳🇵":"flag_for_nepal","🇳🇱":"flag_for_netherlands","🇳🇨":"flag_for_new_caledonia","🇳🇿":"flag_for_new_zealand","🇳🇪":"flag_for_niger","🇳🇬":"flag_for_nigeria","🇳🇺":"flag_for_niue","🇰🇵":"flag_for_north_korea","🇲🇰":"macedonia flag_for_macedonia","🇳🇴":"flag_for_norway","🇵🇰":"flag_for_pakistan","🇵🇼":"flag_for_palau","🇵🇸":"flag_for_palestinian_territories","🇵🇦":"flag_for_panama","🇵🇬":"flag_for_papua_new_guinea","🇵🇾":"flag_for_paraguay","🇵🇪":"flag_for_peru","🇵🇭":"flag_for_philippines","🇵🇱":"flag_for_poland","🇵🇹":"flag_for_portugal","🇵🇷":"flag_for_puerto_rico","🇶🇦":"flag_for_qatar","🇷🇺":"ru flag_for_russia","🇷🇼":"flag_for_rwanda","🇷🇪":"reunion flag_for_r_union","🇼🇸":"flag_for_samoa","🇸🇲":"flag_for_san_marino","🇨🇶":"flag_for_sark","🇸🇦":"flag_for_saudi_arabia","♏":"scorpius","🇸🇳":"flag_for_senegal","🇷🇸":"flag_for_serbia","🇸🇨":"flag_for_seychelles","🇸🇱":"flag_for_sierra_leone","🇸🇬":"flag_for_singapore","🇸🇰":"flag_for_slovakia","🇸🇮":"flag_for_slovenia","🇸🇴":"flag_for_somalia","🇿🇦":"flag_for_south_africa","🇰🇷":"kr flag_for_south_korea","🇸🇸":"flag_for_south_sudan","🇪🇸":"es flag_for_spain","🇱🇰":"flag_for_sri_lanka","🇸🇭":"st_helena flag_for_st_helena","🇰🇳":"flag_for_st_kitts_nevis","🇱🇨":"flag_for_st_lucia","🇻🇨":"flag_for_st_vincent_grenadines","🇸🇩":"flag_for_sudan","🇸🇷":"flag_for_suriname","🇸🇪":"flag_for_sweden","🇨🇭":"flag_for_switzerland","🇸🇾":"flag_for_syria","🇸🇹":"sao_tome_principe flag_for_s_o_tom_pr_ncipe","🇹🇼":"flag_for_taiwan","🇹🇯":"flag_for_tajikistan","🇹🇿":"flag_for_tanzania","🇹🇭":"flag_for_thailand","🇹🇱":"flag_for_timor_leste","🇹🇬":"flag_for_togo","🇹🇰":"flag_for_tokelau","🇹🇴":"flag_for_tonga","🇹🇹":"flag_for_trinidad_tobago","🇹🇦":"flag_for_tristan_da_cunha","🇹🇳":"flag_for_tunisia","🇹🇲":"flag_for_turkmenistan","🇹🇻":"flag_for_tuvalu","🇹🇷":"tr turkey flag_for_turkey","🇺🇬":"flag_for_uganda","🇦🇪":"flag_for_united_arab_emirates","🇺🇸":"us flag_for_united_states","🇺🇾":"flag_for_uruguay","🇺🇿":"flag_for_uzbekistan","🇻🇺":"flag_for_vanuatu","🇻🇪":"flag_for_venezuela","🇻🇳":"flag_for_vietnam","🇼🇫":"flag_for_wallis_futuna","🇪🇭":"flag_for_western_sahara","🇾🇪":"flag_for_yemen","🇿🇲":"flag_for_zambia","🇿🇼":"flag_for_zimbabwe","👾":"space_invader","📶":"signal_strength","🚗":"car red_car","🎒":"school_satchel","🏸":"badminton_racquet_and_shuttlecock","⚖️":"scales","💈":"barber","🔕":"no_bell","🍱":"bento","☣️":"biohazard_sign","🍾":"champagne","🧱":"bricks","🩲":"swim_brief","📅":"date","🐪":"dromedary_camel","🚬":"smoking","🗜️":"compression","🎬":"clapper","♣️":"clubs","👝":"pouch","💥":"boom","💽":"minidisc","🖍️":"lower_left_crayon","🗡️":"dagger_knife","💨":"dash","🕵️":"sleuth_or_spy","➗":"heavy_division_sign","🐬":"flipper","➿":"loop","🕊️":"dove_of_peace","📧":"email","🕣":"clock830","🕗":"clock8 eight_oclock","🕦":"clock1130","🕚":"clock11 eleven_oclock","🐑":"sheep","📠":"fax","🏑":"field_hockey_stick_and_ball","🕠":"clock530","🕔":"clock5 five_oclock","💪":"muscle","🍽️":"plate_with_cutlery","🕟":"clock430","🕓":"clock4 four_oclock","🖼️":"frame_with_picture","⛽":"fuelpump","💎":"gem","👓":"eyeglasses","👺":"japanese_goblin","🦍":"harambe","🎓":"mortar_board","👠":"high_heel","⚡":"zap","🐝":"bee","🚥":"traffic_light","☕":"coffee","♨️":"hotsprings","⌛":"hourglass","⏳":"hourglass_flowing_sand","💯":"100","🧊":"ice_cube","🏒":"ice_hockey_stick_and_puck","☝️":"point_up","ℹ️":"information_source","🃏":"black_joker","#️⃣":"hash","*️⃣":"asterisk","0️⃣":"zero","1️⃣":"one","🔟":"ten keycap_ten","2️⃣":"two","3️⃣":"three","4️⃣":"four","5️⃣":"five","6️⃣":"six","7️⃣":"seven","8️⃣":"eight","9️⃣":"nine","💏":"couplekiss","💋":"kiss","🔪":"hocho knife","🐞":"beetle","💻":"computer","💡":"bulb","🖇️":"paperclips","🔒":"lock","🔐":"closed_lock_with_key","🔏":"lock_with_ink_pen","🚂":"steam_locomotive","🔍":"mag","🔎":"mag_right","🀄":"mahjong","📣":"mega","📝":"pencil","🕎":"menorah_with_nine_branches","🚹":"mens mens_room","➖":"heavy_minus_sign","🗿":"moyai","📱":"iphone","💰":"moneybag","👄":"lips","✖️":"heavy_multiplication_x","🔇":"mute","💅":"nail_care","🕤":"clock930","🕘":"clock9 nine_oclock","👹":"japanese_ogre","🕉️":"om_symbol","🕜":"clock130","🕐":"clock1 one_oclock","📖":"book","💿":"cd","🐼":"panda_face","🐾":"feet","🖊️":"lower_left_ballpoint_pen","✏️":"pencil2","💩":"poop shit hankey","🎍":"bamboo","🏓":"table_tennis_paddle_and_ball","🪅":"pinata","➕":"heavy_plus_sign","🏤":"european_post_office","🐇":"rabbit2","☢️":"radioactive_sign","🏮":"lantern izakaya_lantern","🤖":"robot_face","🗞️":"newspaper_roll","🤣":"rofl","🛰️":"artificial_satellite","📡":"satellite","🕢":"clock730","🕖":"clock7 seven_oclock","🛍️":"shopping","🕡":"clock630","🕕":"clock6 six_oclock","♠️":"spades","🔊":"loud_sound","🔈":"speaker","🔉":"sound","🗓️":"spiral_calendar_pad","🗒️":"spiral_note_pad","🐚":"shell","💦":"sweat_drops","👕":"shirt tshirt","🍊":"orange mandarin","☎️":"phone","📺":"tv","🕥":"clock1030","🕙":"clock10 ten_oclock","🕞":"clock330","🕒":"clock3 three_oclock","🎩":"tophat","🌪️":"cloud_with_tornado","🔱":"trident","🕧":"clock1230","🕛":"clock12 twelve_oclock","🐫":"camel","🕝":"clock230","🕑":"clock2 two_oclock","☂️":"open_umbrella","⛱️":"parasol_on_ground","🔓":"unlock","🖖":"raised_hand_with_part_between_middle_and_ring_fingers","🦯":"probing_cane","🚺":"womens womens_room","🎁":"gift","🆎":"ab","🏧":"atm","🔙":"back","🆑":"cl","🆒":"cool","🔚":"end","🇪🇺":"eu flag_for_european_union","🆓":"free","🆔":"id","🉑":"accept","🉐":"ideograph_advantage","㊗️":"congratulations","🈹":"u5272","🈚":"u7121","🈁":"koko","🈷️":"u6708","🈵":"u6e80","🈶":"u6709","🈴":"u5408","🈲":"u7981","🈯":"u6307","㊙️":"secret","🈂️":"sa","🔰":"beginner","🈳":"u7a7a","🆕":"new","🆖":"ng","🆗":"ok","🔛":"on","🅾️":"o2","🅿️":"parking","🔜":"soon","🆘":"sos","🇸🇯":"flag_for_svalbard_jan_mayen","🔝":"top","🆙":"up","🆚":"vs","💢":"anger","🔵":"large_blue_circle","🔆":"high_brightness","☑️":"ballot_box_with_check","✔️":"heavy_check_mark","✅":"white_check_mark","🔃":"arrows_clockwise","🔄":"arrows_counterclockwise","❎":"negative_squared_cross_mark","♦️":"diamonds","💠":"diamond_shape_with_a_dot_inside","🔅":"low_brightness","💵":"dollar","‼️":"bangbang","↙️":"arrow_lower_left","↘️":"arrow_lower_right","⬇️":"arrow_down","🔽":"arrow_down_small","⏏️":"eject_symbol","💶":"euro","⁉️":"interrobang","⏩":"fast_forward","⏬":"arrow_double_down","⏪":"rewind","⏫":"arrow_double_up","🔤":"abc","🔡":"abcd","🔠":"capital_abcd","🔢":"1234","🔣":"symbols","⏮️":"previous_track_button black_left_pointing_double_triangle_with_vertical_bar","⬅️":"arrow_left","↪️":"arrow_right_hook","🚮":"put_litter_in_its_place","📲":"calling","⏭️":"black_right_pointing_double_triangle_with_vertical_bar","🚯":"do_not_litter","🔞":"underage","⏸️":"double_vertical_bar","▶️":"arrow_forward","⏯️":"black_right_pointing_triangle_with_double_vertical_bar","💷":"pound","🚫":"no_entry_sign","⏺️":"black_circle_for_record","♻️":"recycle","❗":"exclamation heavy_exclamation_mark","❓":"question","🔻":"small_red_triangle_down","🔺":"small_red_triangle","🔁":"repeat","🔂":"repeat_one","◀️":"arrow_backward","➡️":"arrow_right","⤵️":"arrow_heading_down","↩️":"leftwards_arrow_with_hook","⤴️":"arrow_heading_up","🔀":"twisted_rightwards_arrows","🤘":"metal","⏹️":"black_square_for_stop","™️":"tm","↕️":"arrow_up_down","↖️":"arrow_upper_left","↗️":"arrow_upper_right","⬆️":"arrow_up","🔼":"arrow_up_small","♿":"wheelchair","❕":"grey_exclamation","❔":"grey_question","💴":"yen","🏴":"waving_black_flag","🏁":"checkered_flag","📪":"mailbox_closed","📫":"mailbox","⛳":"golf","📭":"mailbox_with_no_mail","📬":"mailbox_with_mail","🚩":"triangular_flag_on_post","🏳️":"waving_white_flag"};

/* Your own names. Anything here beats the alias table above.
   Key is the emoji. Value is "newname" or "newname extra search words" —
   the first word becomes the :shortcode:, the rest only affect search:
       "\u{1FAE9}": "eyebags tired exhausted",
   Every original name keeps working either way. */
const YC_EMOJI_CUSTOM = {
};

const YC_EMOJI_RAW = {"smileys": "😠 angry face|👿 angry face with horns|😧 anguished face|😰 anxious face with sweat|😲 astonished face|😁 beaming face with smiling eyes|🐱 cat face|😹 cat with tears of joy|😼 cat with wry smile|🤡 clown face|🥶 cold face|😖 confounded face|😕 confused face|🐮 cow face|🤠 cowboy hat face|🫫 cracking face|😿 crying cat|😢 crying face|😞 disappointed face|🥸 disguised face|🫪 distorted face|🐶 dog face|🫥 dotted line face|😓 downcast face with sweat|🐲 dragon face|🤤 drooling face|😡 enraged face|😑 expressionless face|😘 face blowing a kiss|😮‍💨 face exhaling|🥹 face holding back tears|😶‍🌫️ face in clouds|😋 face savoring food|😱 face screaming in fear|🤮 face vomiting|🫩 face with bags under eyes|😵 face with crossed-out eyes|🫤 face with diagonal mouth|🤭 face with hand over mouth|🤕 face with head-bandage|😷 face with medical mask|🧐 face with monocle|🫢 face with open eyes and hand over mouth|😮 face with open mouth|🫣 face with peeking eye|🤨 face with raised eyebrow|🙄 face with rolling eyes|😵‍💫 face with spiral eyes|😤 face with steam from nose|🤬 face with symbols on mouth|😂 face with tears of joy|🤒 face with thermometer|😛 face with tongue|😶 face without mouth|😨 fearful face|🌛 first quarter moon face|😳 flushed face|🙏 folded hands|☹️ frowning face|😦 frowning face with open mouth|🌝 full moon face|😬 grimacing face|😺 grinning cat|😸 grinning cat with smiling eyes|😀 grinning face|😃 grinning face with big eyes|😄 grinning face with smiling eyes|😅 grinning face with sweat|😆 grinning squinting face|🙂‍↔️ head shaking horizontally|🙂‍↕️ head shaking vertically|🙉 hear-no-evil monkey|🐴 horse face|🥵 hot face|😯 hushed face|😽 kissing cat|😗 kissing face|😚 kissing face with closed eyes|😙 kissing face with smiling eyes|🌜 last quarter moon face|😭 loudly crying face|🤥 lying face|🙇‍♂️ man bowing|🤦‍♂️ man facepalming|🙍‍♂️ man frowning|🙅‍♂️ man gesturing NO|🙆‍♂️ man gesturing OK|🙎‍♂️ man pouting|🙋‍♂️ man raising hand|🫠 melting face|🤑 money-mouth face|🐵 monkey face|🐭 mouse face|🤢 nauseated face|🤓 nerd face|😐 neutral face|🌚 new moon face|🥳 partying face|😔 pensive face|😣 persevering face|🙇 person bowing|🤦 person facepalming|🙍 person frowning|🙅 person gesturing NO|🙆 person gesturing OK|🙎 person pouting|🙋 person raising hand|🐷 pig face|🥺 pleading face|😾 pouting cat|🐰 rabbit face|🙌 raising hands|😌 relieved face|😥 sad but relieved face|🫡 saluting face|🙈 see-no-evil monkey|🫨 shaking face|🤫 shushing face|😴 sleeping face|😪 sleepy face|🙁 slightly frowning face|🙂 slightly smiling face|😻 smiling cat with heart-eyes|☺️ smiling face|😇 smiling face with halo|😍 smiling face with heart-eyes|🥰 smiling face with hearts|😈 smiling face with horns|🤗 smiling face with open hands|😊 smiling face with smiling eyes|😎 smiling face with sunglasses|🥲 smiling face with tear|😏 smirking face|🤧 sneezing face|🙊 speak-no-evil monkey|😝 squinting face with tongue|🌞 sun with face|🤔 thinking face|🐯 tiger face|😫 tired face|😒 unamused face|🙃 upside-down face|🙀 weary cat|😩 weary face|🌬️ wind face|😉 winking face|😜 winking face with tongue|🙇‍♀️ woman bowing|🤦‍♀️ woman facepalming|🙍‍♀️ woman frowning|🙅‍♀️ woman gesturing NO|🙆‍♀️ woman gesturing OK|🙎‍♀️ woman pouting|🙋‍♀️ woman raising hand|🥴 woozy face|😟 worried face|🥱 yawning face|🤪 zany face|🤐 zipper-mouth face", "people": "🇦🇲 Armenia|🇰🇾 Cayman Islands|🇩🇪 Germany|🇭🇲 Heard Island & McDonald Islands|🇮🇲 Isle of Man|👌 OK hand|🇴🇲 Oman|🇷🇴 Romania|🎅 Santa Claus|🇬🇧 United Kingdom|⏰ alarm clock|🏈 american football|🫀 anatomical heart|👶 baby|👼 baby angel|🍼 baby bottle|🐤 baby chick|🚼 baby symbol|👇 backhand index pointing down|👈 backhand index pointing left|👉 backhand index pointing right|👆 backhand index pointing up|🐻 bear|💓 beating heart|🖤 black heart|💙 blue heart|👦 boy|💔 broken heart|🤎 brown heart|🎯 bullseye|🤙 call me hand|👏 clapping hands|🍻 clinking beer mugs|🥂 clinking glasses|👷 construction worker|🍳 cooking|💑 couple with heart|👨‍❤️‍👨 couple with heart man man|👩‍❤️‍👨 couple with heart woman man|👩‍❤️‍👩 couple with heart woman woman|🤞 crossed fingers|🧏‍♂️ deaf man|🧏 deaf person|🧏‍♀️ deaf woman|👂 ear|🌽 ear of corn|🦻 ear with hearing aid|🧝 elf|👁️ eye|👁️‍🗨️ eye in speech bubble|👀 eyes|🧑‍🏭 factory worker|🧚 fairy|👪 family|🧑‍🧑‍🧒 family adult adult child|🧑‍🧑‍🧒‍🧒 family adult adult child child|🧑‍🧒 family adult child|🧑‍🧒‍🧒 family adult child child|👨‍👦 family man boy|👨‍👦‍👦 family man boy boy|👨‍👧 family man girl|👨‍👧‍👦 family man girl boy|👨‍👧‍👧 family man girl girl|👨‍👨‍👦 family man man boy|👨‍👨‍👦‍👦 family man man boy boy|👨‍👨‍👧 family man man girl|👨‍👨‍👧‍👦 family man man girl boy|👨‍👨‍👧‍👧 family man man girl girl|👨‍👩‍👦 family man woman boy|👨‍👩‍👦‍👦 family man woman boy boy|👨‍👩‍👧 family man woman girl|👨‍👩‍👧‍👦 family man woman girl boy|👨‍👩‍👧‍👧 family man woman girl girl|👩‍👦 family woman boy|👩‍👦‍👦 family woman boy boy|👩‍👧 family woman girl|👩‍👧‍👦 family woman girl boy|👩‍👧‍👧 family woman girl girl|👩‍👩‍👦 family woman woman boy|👩‍👩‍👦‍👦 family woman woman boy boy|👩‍👩‍👧 family woman woman girl|👩‍👩‍👧‍👦 family woman woman girl boy|👩‍👩‍👧‍👧 family woman woman girl girl|🧑‍🌾 farmer|🫆 fingerprint|🪭 folding hand fan|🦶 foot|👣 footprints|🐥 front-facing baby chick|⚙️ gear|🧞 genie|👧 girl|💚 green heart|🩶 grey heart|💗 growing heart|🖐️ hand with fingers splayed|🫰 hand with index finger and thumb crossed|👜 handbag|🤝 handshake|🧑‍⚕️ health worker|💟 heart decoration|❣️ heart exclamation|🫶 heart hands|❤️‍🔥 heart on fire|♥️ heart suit|💘 heart with arrow|💝 heart with ribbon|🥾 hiking boot|🪯 khanda|👨‍❤️‍💋‍👨 kiss man man|👩‍❤️‍💋‍👨 kiss woman man|👩‍❤️‍💋‍👩 kiss woman woman|🤛 left-facing fist|🫲 leftwards hand|🫷 leftwards pushing hand|🦵 leg|🩵 light blue heart|👨 man|👨‍🎨 man artist|👨‍🚀 man astronaut|👨‍🦲 man bald|🧔‍♂️ man beard|🚴‍♂️ man biking|👱‍♂️ man blond hair|⛹️‍♂️ man bouncing ball|🤸‍♂️ man cartwheeling|🧗‍♂️ man climbing|👷‍♂️ man construction worker|👨‍🍳 man cook|👨‍🦱 man curly hair|🕺 man dancing|🕵️‍♂️ man detective|🧝‍♂️ man elf|👨‍🏭 man factory worker|🧚‍♂️ man fairy|👨‍🌾 man farmer|👨‍🍼 man feeding baby|👨‍🚒 man firefighter|🧞‍♂️ man genie|💇‍♂️ man getting haircut|💆‍♂️ man getting massage|🏌️‍♂️ man golfing|💂‍♂️ man guard|👨‍⚕️ man health worker|🧘‍♂️ man in lotus position|👨‍🦽 man in manual wheelchair|👨‍🦽‍➡️ man in manual wheelchair facing right|👨‍🦼 man in motorized wheelchair|👨‍🦼‍➡️ man in motorized wheelchair facing right|🧖‍♂️ man in steamy room|🤵‍♂️ man in tuxedo|👨‍⚖️ man judge|🤹‍♂️ man juggling|🧎‍♂️ man kneeling|🧎‍♂️‍➡️ man kneeling facing right|🏋️‍♂️ man lifting weights|🧙‍♂️ man mage|👨‍🔧 man mechanic|🚵‍♂️ man mountain biking|👨‍💼 man office worker|👨‍✈️ man pilot|🤾‍♂️ man playing handball|🤽‍♂️ man playing water polo|👮‍♂️ man police officer|👨‍🦰 man red hair|🚣‍♂️ man rowing boat|🏃‍♂️ man running|🏃‍♂️‍➡️ man running facing right|👨‍🔬 man scientist|🤷‍♂️ man shrugging|👨‍🎤 man singer|🧍‍♂️ man standing|👨‍🎓 man student|🦸‍♂️ man superhero|🦹‍♂️ man supervillain|🏄‍♂️ man surfing|🏊‍♂️ man swimming|👨‍🏫 man teacher|👨‍💻 man technologist|💁‍♂️ man tipping hand|🧛‍♂️ man vampire|🚶‍♂️ man walking|🚶‍♂️‍➡️ man walking facing right|👳‍♂️ man wearing turban|👨‍🦳 man white hair|👰‍♂️ man with veil|👨‍🦯 man with white cane|👨‍🦯‍➡️ man with white cane facing right|🧟‍♂️ man zombie|🥭 mango|🕰️ mantelpiece clock|🦽 manual wheelchair|👞 man’s shoe|🦾 mechanical arm|🦿 mechanical leg|👬 men holding hands|👯‍♂️ men with bunny ears|❤️‍🩹 mending heart|🧜‍♂️ merman|🧜 merperson|🖕 middle finger|🪍 net with handle|🚭 no smoking|👃 nose|🧑‍💼 office worker|👴 old man|👵 old woman|🧓 older person|👊 oncoming fist|🚔 oncoming police car|👐 open hands|🧡 orange heart|🫳 palm down hand|🌴 palm tree|🫴 palm up hand|🤲 palms up together|🍐 pear|🧑‍🤝‍🧑 people holding hands|🫂 people hugging|👯 people with bunny ears|🤼 people wrestling|🧑 person|🧑‍🦲 person bald|🧔 person beard|🚴 person biking|👱 person blond hair|⛹️ person bouncing ball|🤸 person cartwheeling|🧗 person climbing|🧑‍🦱 person curly hair|🧑‍🍼 person feeding baby|🤺 person fencing|💇 person getting haircut|💆 person getting massage|🏌️ person golfing|🛌 person in bed|🧘 person in lotus position|🧑‍🦽 person in manual wheelchair|🧑‍🦽‍➡️ person in manual wheelchair facing right|🧑‍🦼 person in motorized wheelchair|🧑‍🦼‍➡️ person in motorized wheelchair facing right|🧖 person in steamy room|🕴️ person in suit levitating|🤵 person in tuxedo|🤹 person juggling|🧎 person kneeling|🧎‍➡️ person kneeling facing right|🏋️ person lifting weights|🚵 person mountain biking|🤾 person playing handball|🤽 person playing water polo|🧑‍🦰 person red hair|🚣 person rowing boat|🏃 person running|🏃‍➡️ person running facing right|🤷 person shrugging|🧍 person standing|🏄 person surfing|🏊 person swimming|🛀 person taking bath|💁 person tipping hand|🚶 person walking|🚶‍➡️ person walking facing right|👳 person wearing turban|🧑‍🦳 person white hair|🫅 person with crown|👲 person with skullcap|👰 person with veil|🧑‍🦯 person with white cane|🧑‍🦯‍➡️ person with white cane facing right|🐽 pig nose|🤌 pinched fingers|🤏 pinching hand|🩷 pink heart|🐻‍❄️ polar bear|🚓 police car|🚨 police car light|👮 police officer|🍗 poultry leg|🫃 pregnant man|🫄 pregnant person|🤰 pregnant woman|💜 purple heart|🤚 raised back of hand|✊ raised fist|✋ raised hand|❤️ red heart|⛑️ rescue worker’s helmet|💞 revolving hearts|🤜 right-facing fist|🫱 rightwards hand|🫸 rightwards pushing hand|🏉 rugby football|🤳 selfie|☃️ snowman|⛄ snowman without snow|💖 sparkling heart|🗣️ speaking head|🍵 teacup without handle|📆 tear-off calendar|🧸 teddy bear|👎 thumbs down|👍 thumbs up|👅 tongue|💕 two hearts|🧛 vampire|✌️ victory hand|👋 waving hand|☸️ wheel of dharma|🤍 white heart|👩 woman|👫 woman and man holding hands|👩‍🎨 woman artist|👩‍🚀 woman astronaut|👩‍🦲 woman bald|🧔‍♀️ woman beard|🚴‍♀️ woman biking|👱‍♀️ woman blond hair|⛹️‍♀️ woman bouncing ball|🤸‍♀️ woman cartwheeling|🧗‍♀️ woman climbing|👷‍♀️ woman construction worker|👩‍🍳 woman cook|👩‍🦱 woman curly hair|💃 woman dancing|🕵️‍♀️ woman detective|🧝‍♀️ woman elf|👩‍🏭 woman factory worker|🧚‍♀️ woman fairy|👩‍🌾 woman farmer|👩‍🍼 woman feeding baby|👩‍🚒 woman firefighter|🧞‍♀️ woman genie|💇‍♀️ woman getting haircut|💆‍♀️ woman getting massage|🏌️‍♀️ woman golfing|💂‍♀️ woman guard|👩‍⚕️ woman health worker|🧘‍♀️ woman in lotus position|👩‍🦽 woman in manual wheelchair|👩‍🦽‍➡️ woman in manual wheelchair facing right|👩‍🦼 woman in motorized wheelchair|👩‍🦼‍➡️ woman in motorized wheelchair facing right|🧖‍♀️ woman in steamy room|🤵‍♀️ woman in tuxedo|👩‍⚖️ woman judge|🤹‍♀️ woman juggling|🧎‍♀️ woman kneeling|🧎‍♀️‍➡️ woman kneeling facing right|🏋️‍♀️ woman lifting weights|🧙‍♀️ woman mage|👩‍🔧 woman mechanic|🚵‍♀️ woman mountain biking|👩‍💼 woman office worker|👩‍✈️ woman pilot|🤾‍♀️ woman playing handball|🤽‍♀️ woman playing water polo|👮‍♀️ woman police officer|👩‍🦰 woman red hair|🚣‍♀️ woman rowing boat|🏃‍♀️ woman running|🏃‍♀️‍➡️ woman running facing right|👩‍🔬 woman scientist|🤷‍♀️ woman shrugging|👩‍🎤 woman singer|🧍‍♀️ woman standing|👩‍🎓 woman student|🦸‍♀️ woman superhero|🦹‍♀️ woman supervillain|🏄‍♀️ woman surfing|🏊‍♀️ woman swimming|👩‍🏫 woman teacher|👩‍💻 woman technologist|💁‍♀️ woman tipping hand|🧛‍♀️ woman vampire|🚶‍♀️ woman walking|🚶‍♀️‍➡️ woman walking facing right|👳‍♀️ woman wearing turban|👩‍🦳 woman white hair|🧕 woman with headscarf|👰‍♀️ woman with veil|👩‍🦯 woman with white cane|👩‍🦯‍➡️ woman with white cane facing right|🧟‍♀️ woman zombie|👢 woman’s boot|👚 woman’s clothes|👒 woman’s hat|👡 woman’s sandal|👭 women holding hands|👯‍♀️ women with bunny ears|✍️ writing hand|💛 yellow heart|🧟 zombie", "nature": "🇧🇭 Bahrain|🎄 Christmas tree|🈸 Japanese application button|🇺🇦 Ukraine|🐦 bird|🐦‍⬛ black bird|🐈‍⬛ black cat|🐡 blowfish|🧠 brain|🍄‍🟫 brown mushroom|🐛 bug|🚅 bullet train|🌵 cactus|🎠 carousel horse|🐈 cat|☁️ cloud|🌩️ cloud with lightning|⛈️ cloud with lightning and rain|🌧️ cloud with rain|🌨️ cloud with snow|🖱️ computer mouse|🐄 cow|🌙 crescent moon|🍮 custard|🌳 deciduous tree|🐕 dog|🔯 dotted six-pointed star|🍆 eggplant|✴️ eight-pointed star|🌲 evergreen tree|🍂 fallen leaf|🫯 fight cloud|🔥 fire|🚒 fire engine|🧯 fire extinguisher|🧨 firecracker|🧑‍🚒 firefighter|🎆 fireworks|🌓 first quarter moon|🐟 fish|🍥 fish cake with swirl|🎣 fishing pole|🎴 flower playing cards|🍀 four leaf clover|🦊 fox|🐸 frog|🌕 full moon|🌎 globe showing Americas|🌏 globe showing Asia-Australia|🌍 globe showing Europe-Africa|🌐 globe with meridians|🌟 glowing star|🦮 guide dog|🌿 herb|🚄 high-speed train|🐎 horse|🏇 horse racing|🌭 hot dog|🪪 identification card|🪼 jellyfish|🌗 last quarter moon|🍃 leaf fluttering in wind|🪾 leafless tree|🥬 leafy green|🦁 lion|🍁 maple leaf|🐒 monkey|🥮 moon cake|🎑 moon viewing ceremony|🐁 mouse|🪤 mouse trap|🍄 mushroom|🌑 new moon|🌃 night with stars|🚱 non-potable water|🐧 penguin|🐖 pig|🚰 potable water|🪴 potted plant|🌈 rainbow|🐕‍🦺 service dog|🌠 shooting star|🏔️ snow-capped mountain|🏂 snowboarder|❄️ snowflake|🕷️ spider|🕸️ spider web|🐳 spouting whale|⭐ star|🤩 star-struck|☪️ star and crescent|✡️ star of David|☀️ sun|⛅ sun behind cloud|🌥️ sun behind large cloud|🌦️ sun behind rain cloud|🌤️ sun behind small cloud|🌻 sunflower|🕶️ sunglasses|🌅 sunrise|🌄 sunrise over mountains|🌇 sunset|🎋 tanabata tree|🐅 tiger|🚆 train|🐠 tropical fish|☔ umbrella with rain drops|🌘 waning crescent moon|🌖 waning gibbous moon|🐃 water buffalo|🚾 water closet|🔫 water pistol|🌊 water wave|🍉 watermelon|🌒 waxing crescent moon|🌔 waxing gibbous moon|🐋 whale|💮 white flower|🥀 wilted flower|🎐 wind chime|🪟 window|🐺 wolf", "food": "♑ Capricorn|🇬🇸 South Georgia & South Sandwich Islands|🇵🇲 St. Pierre & Miquelon|🥑 avocado|🥓 bacon|🥖 baguette bread|🍌 banana|🍺 beer mug|🫑 bell pepper|🎂 birthday cake|🍞 bread|🧋 bubble tea|🍬 candy|🥫 canned food|🥕 carrot|🧀 cheese wedge|🌸 cherry blossom|🍫 chocolate bar|🍸 cocktail glass|🥥 coconut|🍚 cooked rice|🍪 cookie|🧁 cupcake|🍛 curry rice|🥩 cut of meat|🍩 doughnut|🥚 egg|🫓 flatbread|🥠 fortune cookie|🍟 french fries|🥛 glass of milk|🍇 grapes|🍏 green apple|🥗 green salad|🍔 hamburger|🌶️ hot pepper|🍨 ice cream|🥝 kiwi fruit|🔶 large orange diamond|🍋 lemon|🍋‍🟩 lime|🍖 meat on bone|🍈 melon|🌌 milky way|🪺 nest with eggs|🩱 one-piece swimsuit|📙 orange book|🟠 orange circle|🟧 orange square|🥞 pancakes|🍑 peach|🥧 pie|🍍 pineapple|🍕 pizza|🍿 popcorn|🍲 pot of food|🥔 potato|🧩 puzzle piece|🍎 red apple|🍙 rice ball|🍘 rice cracker|🍠 roasted sweet potato|🥪 sandwich|🥘 shallow pan of food|🌾 sheaf of rice|🍰 shortcake|🔸 small orange diamond|🍦 soft ice cream|🍜 steaming bowl|🍓 strawberry|🥙 stuffed flatbread|🍣 sushi|🌮 taco|🧑‍🏫 teacher|🫖 teapot|🍅 tomato|🍹 tropical drink|🦄 unicorn|🧇 waffle|🍷 wine glass", "activities": "🥇 1st place medal|🥈 2nd place medal|🥉 3rd place medal|🇧🇳 Brunei|🇧🇮 Burundi|🇲🇶 Martinique|🇸🇽 Sint Maarten|🇧🇱 St. Barthélemy|🇲🇫 St. Martin|🎟️ admission tickets|🚛 articulated lorry|🧑‍🎨 artist|🎨 artist palette|🧑‍🩰 ballet dancer|🩰 ballet shoes|🎈 balloon|🗳️ ballot box with ballot|📊 bar chart|⚾ baseball|🏀 basketball|🎳 bowling|📷 camera|📸 camera with flash|📉 chart decreasing|📈 chart increasing|💹 chart increasing with yen|♟️ chess pawn|🎊 confetti ball|🏏 cricket game|🔮 crystal ball|🏬 department store|🥁 drum|🎞️ film frames|📽️ film projector|🎲 game die|🎸 guitar|🎧 headphone|⛸️ ice skate|🕹️ joystick|🪘 long drum|🥋 martial arts uniform|🎤 microphone|🎖️ military medal|🪩 mirror ball|🎥 movie camera|🎹 musical keyboard|🎵 musical note|🎶 musical notes|🎼 musical score|🛢️ oil drum|🖌️ paintbrush|〽️ part alternation mark|🎉 party popper|🛂 passport control|🎭 performing arts|🎱 pool 8 ball|🛼 roller skate|🎽 running shirt|👟 running shoe|🛹 skateboard|⛷️ skier|🎿 skis|⚽ soccer ball|🥎 softball|💬 speech balloon|🚙 sport utility vehicle|🏅 sports medal|🎙️ studio microphone|💭 thought balloon|🎫 ticket|🖲️ trackball|🏆 trophy|🎺 trumpet|📹 video camera|🎮 video game|📼 videocassette|🎻 violin|🏐 volleyball", "travel": "🇦🇨 Ascension Island|🇧🇻 Bouvet Island|🇻🇬 British Virgin Islands|🇮🇨 Canary Islands|🇧🇶 Caribbean Netherlands|🇨🇽 Christmas Island|🇨🇵 Clipperton Island|🇨🇨 Cocos (Keeling) Islands|🇨🇰 Cook Islands|🇫🇰 Falkland Islands|🇫🇴 Faroe Islands|🏯 Japanese castle|🈺 Japanese open for business button|🇲🇬 Madagascar|🇲🇭 Marshall Islands|🇳🇮 Nicaragua|🇳🇫 Norfolk Island|🇲🇵 Northern Mariana Islands|🇵🇳 Pitcairn Islands|🇸🇧 Solomon Islands|🗽 Statue of Liberty|🇹🇨 Turks & Caicos Islands|🇺🇲 U.S. Outlying Islands|🇻🇮 U.S. Virgin Islands|🇻🇦 Vatican City|🚡 aerial tramway|✈️ airplane|🛬 airplane arrival|🛫 airplane departure|🏖️ beach with umbrella|🚲 bicycle|🌉 bridge at night|🏗️ building construction|🚌 bus|🚏 bus stop|👤 bust in silhouette|👥 busts in silhouette|🗃️ card file box|📇 card index|🗂️ card index dividers|🎏 carp streamer|🪚 carpentry saw|🏰 castle|⛪ church|🎪 circus tent|🏙️ cityscape|🌆 cityscape at dusk|🏛️ classical building|💳 credit card|🚚 delivery truck|🏚️ derelict house|🏝️ desert island|⛲ fountain|🖋️ fountain pen|🚁 helicopter|🛕 hindu temple|🏨 hotel|🏠 house|🏡 house with garden|🏘️ houses|🛙 lighthouse|🏩 love hotel|🗾 map of Japan|🚇 metro|🚐 minibus|🕌 mosque|🛥️ motor boat|🛵 motor scooter|🏍️ motorcycle|🦼 motorized wheelchair|🛣️ motorway|⛰️ mountain|🚠 mountain cableway|🚞 mountain railway|🚳 no bicycles|🏢 office building|🚍 oncoming bus|🚖 oncoming taxi|🛳️ passenger ship|🛻 pickup truck|🪧 placard|🛐 place of worship|🏎️ racing car|🚃 railway car|🪐 ringed planet|🚀 rocket|⛵ sailboat|🧣 scarf|⛩️ shinto shrine|🚢 ship|🛒 shopping cart|🛩️ small airplane|🚤 speedboat|🏟️ stadium|🚉 station|🚕 taxi|⛺ tent|🚊 tram|🚋 tram car|🚎 trolleybus|🗺️ world map|🇦🇽 Åland Islands", "objects": "🇦🇫 Afghanistan|🇦🇱 Albania|🇩🇿 Algeria|🇦🇸 American Samoa|🇦🇩 Andorra|🇦🇴 Angola|🇦🇮 Anguilla|🇦🇶 Antarctica|🇦🇬 Antigua & Barbuda|♒ Aquarius|🇦🇷 Argentina|♈ Aries|🇦🇼 Aruba|🇦🇺 Australia|🇦🇹 Austria|🇦🇿 Azerbaijan|🇧🇸 Bahamas|🇧🇩 Bangladesh|🇧🇧 Barbados|🇧🇾 Belarus|🇧🇪 Belgium|🇧🇿 Belize|🇧🇯 Benin|🇧🇲 Bermuda|🇧🇹 Bhutan|🇧🇴 Bolivia|🇧🇦 Bosnia & Herzegovina|🇧🇼 Botswana|🇧🇷 Brazil|🇮🇴 British Indian Ocean Territory|🇧🇬 Bulgaria|🇧🇫 Burkina Faso|🇰🇭 Cambodia|🇨🇲 Cameroon|🇨🇦 Canada|♋ Cancer|🇨🇻 Cape Verde|🇨🇫 Central African Republic|🇪🇦 Ceuta & Melilla|🇹🇩 Chad|🇨🇱 Chile|🇨🇳 China|🇨🇴 Colombia|🇰🇲 Comoros|🇨🇬 Congo-Brazzaville|🇨🇩 Congo-Kinshasa|🇨🇷 Costa Rica|🇭🇷 Croatia|🇨🇺 Cuba|🇨🇼 Curaçao|🇨🇾 Cyprus|🇨🇿 Czechia|🇨🇮 Côte d’Ivoire|🇩🇰 Denmark|🇩🇬 Diego Garcia|🇩🇯 Djibouti|🇩🇲 Dominica|🇩🇴 Dominican Republic|🇪🇨 Ecuador|🇪🇬 Egypt|🇸🇻 El Salvador|🏴󠁧󠁢󠁥󠁮󠁧󠁿 England|🇬🇶 Equatorial Guinea|🇪🇷 Eritrea|🇪🇪 Estonia|🇸🇿 Eswatini|🇪🇹 Ethiopia|🇫🇯 Fiji|🇫🇮 Finland|🇫🇷 France|🇬🇫 French Guiana|🇵🇫 French Polynesia|🇹🇫 French Southern and Antarctic Lands|🇬🇦 Gabon|🇬🇲 Gambia|♊ Gemini|🇬🇪 Georgia|🇬🇭 Ghana|🇬🇮 Gibraltar|🇬🇷 Greece|🇬🇱 Greenland|🇬🇩 Grenada|🇬🇵 Guadeloupe|🇬🇺 Guam|🇬🇹 Guatemala|🇬🇬 Guernsey|🇬🇳 Guinea|🇬🇼 Guinea-Bissau|🇬🇾 Guyana|🇭🇹 Haiti|🇭🇳 Honduras|🇭🇰 Hong Kong SAR China|🇭🇺 Hungary|🇮🇸 Iceland|🇮🇳 India|🇮🇩 Indonesia|🇮🇷 Iran|🇮🇶 Iraq|🇮🇪 Ireland|🇮🇱 Israel|🇮🇹 Italy|🇯🇲 Jamaica|🇯🇵 Japan|🎎 Japanese dolls|🏣 Japanese post office|🇯🇪 Jersey|🇯🇴 Jordan|🇰🇿 Kazakhstan|🇰🇪 Kenya|🇰🇮 Kiribati|🇽🇰 Kosovo|🇰🇼 Kuwait|🇰🇬 Kyrgyzstan|🇱🇦 Laos|🇱🇻 Latvia|🇱🇧 Lebanon|♌ Leo|🇱🇸 Lesotho|🇱🇷 Liberia|♎ Libra|🇱🇾 Libya|🇱🇮 Liechtenstein|🇱🇹 Lithuania|🇱🇺 Luxembourg|🇲🇴 Macao SAR China|🇲🇼 Malawi|🇲🇾 Malaysia|🇲🇻 Maldives|🇲🇱 Mali|🇲🇹 Malta|🇲🇷 Mauritania|🇲🇺 Mauritius|🇾🇹 Mayotte|🇲🇽 Mexico|🇫🇲 Micronesia|🇲🇩 Moldova|🇲🇨 Monaco|🇲🇳 Mongolia|🇲🇪 Montenegro|🇲🇸 Montserrat|🇲🇦 Morocco|🇲🇿 Mozambique|🤶 Mrs. Claus|🧑‍🎄 Mx Claus|🇲🇲 Myanmar (Burma)|🇳🇦 Namibia|🇳🇷 Nauru|🇳🇵 Nepal|🇳🇱 Netherlands|🇳🇨 New Caledonia|🇳🇿 New Zealand|🇳🇪 Niger|🇳🇬 Nigeria|🇳🇺 Niue|🇰🇵 North Korea|🇲🇰 North Macedonia|🇳🇴 Norway|⛎ Ophiuchus|🇵🇰 Pakistan|🇵🇼 Palau|🇵🇸 Palestinian Territories|🇵🇦 Panama|🇵🇬 Papua New Guinea|🇵🇾 Paraguay|🇵🇪 Peru|🇵🇭 Philippines|♓ Pisces|🇵🇱 Poland|🇵🇹 Portugal|🇵🇷 Puerto Rico|🇶🇦 Qatar|🇷🇺 Russia|🇷🇼 Rwanda|🇷🇪 Réunion|♐ Sagittarius|🇼🇸 Samoa|🇸🇲 San Marino|🇨🇶 Sark|🇸🇦 Saudi Arabia|♏ Scorpio|🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland|🇸🇳 Senegal|🇷🇸 Serbia|🇸🇨 Seychelles|🇸🇱 Sierra Leone|🇸🇬 Singapore|🇸🇰 Slovakia|🇸🇮 Slovenia|🇸🇴 Somalia|🇿🇦 South Africa|🇰🇷 South Korea|🇸🇸 South Sudan|🇪🇸 Spain|🇱🇰 Sri Lanka|🇸🇭 St. Helena Ascension & Tristan da Cunha|🇰🇳 St. Kitts & Nevis|🇱🇨 St. Lucia|🇻🇨 St. Vincent & Grenadines|🇸🇩 Sudan|🇸🇷 Suriname|🇸🇪 Sweden|🇨🇭 Switzerland|🇸🇾 Syria|🇸🇹 São Tomé & Príncipe|🦖 T-Rex|🇹🇼 Taiwan|🇹🇯 Tajikistan|🇹🇿 Tanzania|♉ Taurus|🇹🇭 Thailand|🇹🇱 Timor-Leste|🇹🇬 Togo|🇹🇰 Tokelau|🗼 Tokyo tower|🇹🇴 Tonga|🇹🇹 Trinidad & Tobago|🇹🇦 Tristan da Cunha|🇹🇳 Tunisia|🇹🇲 Turkmenistan|🇹🇻 Tuvalu|🇹🇷 Türkiye|🇺🇬 Uganda|🇦🇪 United Arab Emirates|🇺🇳 United Nations|🇺🇸 United States|🇺🇾 Uruguay|🇺🇿 Uzbekistan|🇻🇺 Vanuatu|🇻🇪 Venezuela|🇻🇳 Vietnam|♍ Virgo|🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales|🇼🇫 Wallis & Futuna|🇪🇭 Western Sahara|🇾🇪 Yemen|💤 ZZZ|🇿🇲 Zambia|🇿🇼 Zimbabwe|🧮 abacus|🪗 accordion|🩹 adhesive bandage|⚗️ alembic|👽 alien|👾 alien monster|🚑 ambulance|🏺 amphora|⚓ anchor|🐜 ant|📶 antenna bars|🧑‍🚀 astronaut|🛺 auto rickshaw|🚗 automobile|🪓 axe|🎒 backpack|🦡 badger|🏸 badminton|🥯 bagel|🛄 baggage claim|⚖️ balance scale|🪕 banjo|🏦 bank|💈 barber pole|🧺 basket|🦇 bat|🛁 bathtub|🔋 battery|🫘 beans|🦫 beaver|🛏️ bed|🪲 beetle|🔔 bell|🔕 bell with slash|🛎️ bellhop bell|🍱 bento box|🧃 beverage box|👙 bikini|🧢 billed cap|☣️ biohazard|🦬 bison|🫦 biting lip|✒️ black nib|🌼 blossom|📘 blue book|🫐 blueberries|🐗 boar|💣 bomb|🦴 bone|🔖 bookmark|📑 bookmark tabs|📚 books|🪃 boomerang|🍾 bottle with popping cork|💐 bouquet|🥣 bowl with spoon|🥊 boxing glove|🤱 breast-feeding|🧱 brick|💼 briefcase|🩲 briefs|🥦 broccoli|⛓️‍💥 broken chain|🧹 broom|🫧 bubbles|🪣 bucket|🌯 burrito|🧈 butter|🦋 butterfly|📅 calendar|🐪 camel|🏕️ camping|🕯️ candle|🛶 canoe|⛓️ chains|🪑 chair|🍒 cherries|🌰 chestnut|🐔 chicken|🧒 child|🐿️ chipmunk|🥢 chopsticks|🚬 cigarette|🎦 cinema|🗜️ clamp|🎬 clapper board|📋 clipboard|📕 closed book|🌂 closed umbrella|♣️ club suit|👝 clutch bag|🧥 coat|🪳 cockroach|⚰️ coffin|🪙 coin|💥 collision|☄️ comet|🧭 compass|💽 computer disk|🚧 construction|🎛️ control knobs|🏪 convenience store|🧑‍🍳 cook|🪸 coral|🛋️ couch and lamp|🦀 crab|🖍️ crayon|🦗 cricket|🐊 crocodile|🥐 croissant|👑 crown|🩼 crutch|🥒 cucumber|🥤 cup with straw|🥌 curling stone|➰ curly loop|🛃 customs|🌀 cyclone|🗡️ dagger|🍡 dango|💨 dashing away|🦌 deer|🏜️ desert|🖥️ desktop computer|🕵️ detective|➗ divide|🤿 diving mask|🪔 diya lamp|💫 dizzy|🧬 dna|🦤 dodo|🐬 dolphin|🫏 donkey|🚪 door|➿ double curly loop|🕊️ dove|🐉 dragon|👗 dress|🩸 drop of blood|💧 droplet|🦆 duck|🥟 dumpling|📀 dvd|📧 e-mail|🦅 eagle|✳️ eight-spoked asterisk|🕣 eight-thirty|🕗 eight o’clock|🔌 electric plug|🐘 elephant|🛗 elevator|🕦 eleven-thirty|🕚 eleven o’clock|🪹 empty nest|✉️ envelope|🪌 eraser|🐑 ewe|🤯 exploding head|🏭 factory|🧆 falafel|📠 fax machine|🪶 feather|🎡 ferris wheel|⛴️ ferry|🏑 field hockey|🗄️ file cabinet|📁 file folder|🕠 five-thirty|🕔 five o’clock|🦩 flamingo|🔦 flashlight|🥿 flat shoe|⚜️ fleur-de-lis|💪 flexed biceps|💾 floppy disk|🪈 flute|🪰 fly|🥏 flying disc|🛸 flying saucer|🌫️ fog|🌁 foggy|🫕 fondue|🍴 fork and knife|🍽️ fork and knife with plate|🕟 four-thirty|🕓 four o’clock|🖼️ framed picture|🍤 fried shrimp|⛽ fuel pump|⚱️ funeral urn|🧄 garlic|💎 gem stone|👻 ghost|🫚 ginger root|🦒 giraffe|👓 glasses|🧤 gloves|🥅 goal net|🐐 goat|👺 goblin|🥽 goggles|🪿 goose|🦍 gorilla|🎓 graduation cap|📗 green book|💂 guard|🪮 hair pick|🫈 hairy creature|🔨 hammer|⚒️ hammer and pick|🛠️ hammer and wrench|🪬 hamsa|🐹 hamster|🪉 harp|🐣 hatching chick|🪦 headstone|🦔 hedgehog|🌺 hibiscus|👠 high-heeled shoe|⚡ high voltage|🦛 hippopotamus|🕳️ hole|🍯 honey pot|🐝 honeybee|🪝 hook|🚥 horizontal traffic light|🏥 hospital|☕ hot beverage|♨️ hot springs|⌛ hourglass done|⏳ hourglass not done|💯 hundred points|🛖 hut|🪻 hyacinth|🧊 ice|🏒 ice hockey|📥 inbox tray|📨 incoming envelope|🫵 index pointing at the viewer|☝️ index pointing up|♾️ infinity|ℹ️ information|🎃 jack-o-lantern|🫙 jar|👖 jeans|🃏 joker|🧑‍⚖️ judge|🕋 kaaba|🦘 kangaroo|🔑 key|⌨️ keyboard|#️⃣ keycap #|*️⃣ keycap *|0️⃣ keycap 0|1️⃣ keycap 1|🔟 keycap 10|2️⃣ keycap 2|3️⃣ keycap 3|4️⃣ keycap 4|5️⃣ keycap 5|6️⃣ keycap 6|7️⃣ keycap 7|8️⃣ keycap 8|9️⃣ keycap 9|🛴 kick scooter|👘 kimono|💏 kiss|💋 kiss mark|🔪 kitchen knife|🪁 kite|🪢 knot|🐨 koala|🥼 lab coat|🏷️ label|🪜 ladder|🐞 lady beetle|🛘 landslide|💻 laptop|📒 ledger|🛅 left luggage|🗨️ left speech bubble|🐆 leopard|🎚️ level slider|💡 light bulb|🚈 light rail|🔗 link|🖇️ linked paperclips|💄 lipstick|🦎 lizard|🦙 llama|🦞 lobster|🔒 locked|🔐 locked with key|🔏 locked with pen|🚂 locomotive|🍭 lollipop|🧴 lotion bottle|🪷 lotus|📢 loudspeaker|🤟 love-you gesture|🪫 low battery|🧳 luggage|🫁 lungs|🧙 mage|🪄 magic wand|🧲 magnet|🔍 magnifying glass tilted left|🔎 magnifying glass tilted right|🀄 mahjong red dragon|🦣 mammoth|🪇 maracas|🧉 mate|🧑‍🔧 mechanic|📣 megaphone|📝 memo|🤼‍♂️ men wrestling|🕎 menorah|🚹 men’s room|🧜‍♀️ mermaid|🪋 meteor|🦠 microbe|🔬 microscope|🪖 military helmet|➖ minus|🪞 mirror|🗿 moai|📱 mobile phone|📴 mobile phone off|🫌 monarch butterfly|💰 money bag|💸 money with wings|🚝 monorail|🫎 moose|🦟 mosquito|🗻 mount fuji|👄 mouth|✖️ multiply|🔇 muted speaker|💅 nail polish|📛 name badge|🏞️ national park|🧿 nazar amulet|👔 necktie|🪆 nesting dolls|📰 newspaper|🕤 nine-thirty|🕘 nine o’clock|🥷 ninja|📓 notebook|📔 notebook with decorative cover|🔩 nut and bolt|🐙 octopus|🍢 oden|👹 ogre|🗝️ old key|🫒 olive|🕉️ om|🚘 oncoming automobile|🕜 one-thirty|🕐 one o’clock|🧅 onion|📖 open book|📂 open file folder|💿 optical disk|🦧 orangutan|🫍 orca|🦦 otter|📤 outbox tray|🦉 owl|🐂 ox|🦪 oyster|📦 package|📄 page facing up|📃 page with curl|📟 pager|🐼 panda|📎 paperclip|🪂 parachute|🦜 parrot|🐾 paw prints|🫛 pea pod|🦚 peacock|🥜 peanuts|🖊️ pen|✏️ pencil|🧫 petri dish|🐦‍🔥 phoenix|⛏️ pick|🫝 pickle|💩 pile of poo|💊 pill|🧑‍✈️ pilot|🎍 pine decoration|🏓 ping pong|🪅 piñata|🛝 playground slide|🪠 plunger|➕ plus|🐩 poodle|🏤 post office|📯 postal horn|📮 postbox|🫗 pouring liquid|📿 prayer beads|🥨 pretzel|🤴 prince|👸 princess|🖨️ printer|👛 purse|📌 pushpin|🐇 rabbit|🦝 raccoon|📻 radio|☢️ radioactive|🛤️ railway track|🐏 ram|🐀 rat|🪒 razor|🧾 receipt|🧧 red envelope|🏮 red paper lantern|🎗️ reminder ribbon|🚻 restroom|🦏 rhinoceros|🎀 ribbon|🗯️ right anger bubble|💍 ring|🛟 ring buoy|🤖 robot|🪨 rock|🧻 roll of paper|🗞️ rolled-up newspaper|🎢 roller coaster|🤣 rolling on the floor laughing|🐓 rooster|🫜 root vegetable|🌹 rose|🏵️ rosette|📍 round pushpin|🧷 safety pin|🦺 safety vest|🍶 sake|🧂 salt|🥻 sari|🛰️ satellite|📡 satellite antenna|🦕 sauropod|🎷 saxophone|🏫 school|🧑‍🔬 scientist|✂️ scissors|🦂 scorpion|🪛 screwdriver|📜 scroll|🦭 seal|💺 seat|🌱 seedling|🕢 seven-thirty|🕖 seven o’clock|🪡 sewing needle|☘️ shamrock|🦈 shark|🍧 shaved ice|🛡️ shield|🛍️ shopping bags|🩳 shorts|🪏 shovel|🚿 shower|🦐 shrimp|🧑‍🎤 singer|🕡 six-thirty|🕕 six o’clock|💀 skull|🦨 skunk|🛷 sled|🎰 slot machine|🦥 sloth|🐌 snail|🐍 snake|🧼 soap|🧦 socks|♠️ spade suit|🍝 spaghetti|❇️ sparkle|🎇 sparkler|✨ sparkles|🔊 speaker high volume|🔈 speaker low volume|🔉 speaker medium volume|🗓️ spiral calendar|🗒️ spiral notepad|🐚 spiral shell|🫟 splatter|🧽 sponge|🥄 spoon|🦑 squid|🩺 stethoscope|⏱️ stopwatch|📏 straight ruler|🧑‍🎓 student|🦸 superhero|🦹 supervillain|🚟 suspension railway|🦢 swan|💦 sweat droplets|🕍 synagogue|💉 syringe|👕 t-shirt|🥡 takeout box|🫔 tamale|🍊 tangerine|🧑‍💻 technologist|☎️ telephone|📞 telephone receiver|🔭 telescope|📺 television|🕥 ten-thirty|🕙 ten o’clock|🎾 tennis|🧪 test tube|🌡️ thermometer|🩴 thong sandal|🧵 thread|🕞 three-thirty|🕒 three o’clock|⏲️ timer clock|🚽 toilet|🧰 toolbox|🦷 tooth|🪥 toothbrush|🎩 top hat|🌪️ tornado|🚜 tractor|🪎 treasure chest|📐 triangular ruler|🔱 trident emblem|🧌 troll|🪊 trombone|🌷 tulip|🥃 tumbler glass|🦃 turkey|🐢 turtle|🕧 twelve-thirty|🕛 twelve o’clock|🐫 two-hump camel|🕝 two-thirty|🕑 two o’clock|☂️ umbrella|⛱️ umbrella on ground|🔓 unlocked|🚦 vertical traffic light|📳 vibration mode|🌋 volcano|🖖 vulcan salute|🗑️ wastebasket|⌚ watch|〰️ wavy dash|💒 wedding|🛞 wheel|🦯 white cane|🪽 wing|🛜 wireless|🤼‍♀️ women wrestling|🚺 women’s room|🪵 wood|🪱 worm|🎁 wrapped gift|🔧 wrench|🩻 x-ray|🧶 yarn|☯️ yin yang|🪀 yo-yo|🦓 zebra", "symbols": "🆎 AB button (blood type)|🏧 ATM sign|🅰️ A button (blood type)|🔙 BACK arrow|🅱️ B button (blood type)|🆑 CL button|🆒 COOL button|🔚 END arrow|🇪🇺 European Union|🆓 FREE button|🆔 ID button|🉑 Japanese acceptable button|🉐 Japanese bargain button|㊗️ Japanese congratulations button|🈹 Japanese discount button|🈚 Japanese free of charge button|🈁 Japanese here button|🈷️ Japanese monthly amount button|🈵 Japanese no vacancy button|🈶 Japanese not free of charge button|🈴 Japanese passing grade button|🈲 Japanese prohibited button|🈯 Japanese reserved button|㊙️ Japanese secret button|🈂️ Japanese service charge button|🔰 Japanese symbol for beginner|🈳 Japanese vacancy button|🆕 NEW button|🆖 NG button|🆗 OK button|🔛 ON! arrow|🅾️ O button (blood type)|🅿️ P button|🔜 SOON arrow|🆘 SOS button|🇸🇯 Svalbard & Jan Mayen|🔝 TOP arrow|🆙 UP! button|🆚 VS button|💢 anger symbol|⚛️ atom symbol|⚫ black circle|⬛ black large square|◾ black medium-small square|◼️ black medium square|▪️ black small square|🔲 black square button|🔵 blue circle|🟦 blue square|🏹 bow and arrow|🔆 bright button|🟤 brown circle|🟫 brown square|☑️ check box with check|✔️ check mark|✅ check mark button|🚸 children crossing|Ⓜ️ circled M|🔃 clockwise vertical arrows|©️ copyright|🔄 counterclockwise arrows button|❌ cross mark|❎ cross mark button|⚔️ crossed swords|💱 currency exchange|♦️ diamond suit|💠 diamond with a dot|🔅 dim button|💵 dollar banknote|‼️ double exclamation mark|↙️ down-left arrow|↘️ down-right arrow|⬇️ down arrow|🔽 downwards button|⏏️ eject button|📩 envelope with arrow|💶 euro banknote|⁉️ exclamation question mark|⏩ fast-forward button|⏬ fast down button|⏪ fast reverse button|⏫ fast up button|♀️ female sign|🟢 green circle|🟩 green square|💲 heavy dollar sign|🟰 heavy equals sign|⭕ hollow red circle|🔤 input latin letters|🔡 input latin lowercase|🔠 input latin uppercase|🔢 input numbers|🔣 input symbols|🥍 lacrosse|🔷 large blue diamond|⏮️ last track button|✝️ latin cross|↔️ left-right arrow|⬅️ left arrow|↪️ left arrow curving right|🫹 leftwards thumb sign|🚮 litter in bin sign|💌 love letter|♂️ male sign|⚕️ medical symbol|📲 mobile phone with arrow|⏭️ next track button|⛔ no entry|🚯 no littering|📵 no mobile phones|🔞 no one under eighteen|🚷 no pedestrians|☦️ orthodox cross|⏸️ pause button|☮️ peace symbol|▶️ play button|⏯️ play or pause button|💷 pound banknote|🚫 prohibited|🟣 purple circle|🟪 purple square|🔘 radio button|⏺️ record button|♻️ recycling symbol|🔴 red circle|❗ red exclamation mark|❓ red question mark|🟥 red square|🔻 red triangle pointed down|🔺 red triangle pointed up|®️ registered|🔁 repeat button|🔂 repeat single button|◀️ reverse button|➡️ right arrow|⤵️ right arrow curving down|↩️ right arrow curving left|⤴️ right arrow curving up|🫺 rightwards thumb sign|🔀 shuffle tracks button|🤘 sign of the horns|☠️ skull and crossbones|🔹 small blue diamond|⏹️ stop button|🛑 stop sign|™️ trade mark|⚧️ transgender symbol|↕️ up-down arrow|↖️ up-left arrow|↗️ up-right arrow|⬆️ up arrow|🔼 upwards button|⚠️ warning|♿ wheelchair symbol|⚪ white circle|❕ white exclamation mark|⬜ white large square|◽ white medium-small square|◻️ white medium square|❔ white question mark|▫️ white small square|🔳 white square button|🟡 yellow circle|🟨 yellow square|💴 yen banknote", "flags": "🏴 black flag|🏁 chequered flag|📪 closed mailbox with lowered flag|📫 closed mailbox with raised flag|🎌 crossed flags|⛳ flag in hole|📭 open mailbox with lowered flag|📬 open mailbox with raised flag|🏴‍☠️ pirate flag|🏳️‍🌈 rainbow flag|🏳️‍⚧️ transgender flag|🚩 triangular flag|🏳️ white flag"};

/* ---------- emoji picker ----------
   1,900-odd emoji. Rendering them all is what makes these things janky, so the
   grid is virtualised: only the rows actually on screen exist as DOM, and the
   buttons are recycled as you scroll. The dataset is parsed lazily on first
   open so it costs nothing at startup. */
const EMOJI_CELL = 34;
const EMOJI_CATS = [
  ["recent", "\u{1F551}"], ["smileys", "\u{1F600}"], ["people", "\u{1F44B}"],
  ["nature", "\u{1F33F}"], ["food", "\u{1F354}"], ["activities", "\u26BD"],
  ["travel", "\u2708\uFE0F"], ["objects", "\u{1F4A1}"], ["symbols", "\u2764\uFE0F"], ["flags", "\u{1F3C1}"]
];
const emojiState = {
  built: false, by: {}, all: [], view: [], pool: [],
  cols: 8, cat: "recent", onPick: null, anchor: null
};

function emojiRecents() {
  try { return JSON.parse(localStorage.getItem("yc_emoji_recent") || "[]").slice(0, 32); }
  catch (e) { return []; }
}
function rememberEmoji(ch) {
  try {
    const list = emojiRecents().filter((c) => c !== ch);
    list.unshift(ch);
    localStorage.setItem("yc_emoji_recent", JSON.stringify(list.slice(0, 32)));
  } catch (e) {}
}

/* A completed :shortcode: becomes the emoji even if the popup was never used.
   Typing the closing colon makes the popup let go (it tracks the last colon),
   so without this ":eyes:" went out as literal text. */
let shortcodeMap = null;
function shortcodeToEmoji(text) {
  const str = String(text || "");
  if (str.indexOf(":") === -1) return str;
  if (!shortcodeMap) {
    try {
      buildEmoji();
      shortcodeMap = new Map();
      // index every name an emoji answers to, not just the displayed one
      emojiState.all.forEach((e) => {
        const words = new Set([e.short, slugEmoji(e.n)]);
        String(e.q || "").split(" ").forEach((w) => { if (w) words.add(w); });
        words.forEach((w) => { if (w && w.length >= 2 && !shortcodeMap.has(w)) shortcodeMap.set(w, e.c); });
      });
    } catch (e) { shortcodeMap = new Map(); }
  }
  return str.replace(/:([A-Za-z0-9_+-]{2,}):/g, (whole, name) => shortcodeMap.get(slugEmoji(name)) || whole);
}

/* Char -> official name, built from the picker's dataset the first time a
   fallback actually needs it. */
let emojiNameMap = null;
function emojiName(ch) {
  if (!emojiNameMap) {
    try {
      buildEmoji();
      emojiNameMap = new Map(emojiState.all.map((e) => [e.c, e.n]));
    } catch (e) { emojiNameMap = new Map(); }
  }
  return emojiNameMap.get(ch) || "";
}

function slugEmoji(x) { return String(x || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""); }

function buildEmoji() {
  if (emojiState.built) return;
  Object.entries(YC_EMOJI_RAW).forEach(([cat, blob]) => {
    const arr = blob.split("|").map((entry) => {
      const sp = entry.indexOf(" ");
      const c = entry.slice(0, sp);
      const n = entry.slice(sp + 1);
      const alias  = (YC_EMOJI_ALIASES && YC_EMOJI_ALIASES[c]) || "";
      const custom = (YC_EMOJI_CUSTOM && YC_EMOJI_CUSTOM[c]) || alias;
      const genres = (YC_EMOJI_TAGS && YC_EMOJI_TAGS[c]) || "";
      // a custom rename wins for the shortcode; everything feeds the search
      const short = custom ? custom.trim().split(/\s+/)[0] : slugEmoji(n);
      return { c, n, short,
               q: [slugEmoji(n), slugEmoji(custom), slugEmoji(alias), slugEmoji(genres)].filter(Boolean).join(" ") };
    });
    emojiState.by[cat] = arr;
    emojiState.all.push(...arr);
  });
  emojiState.built = true;
}

function emojiSetView() {
  const q = (($("ycEmojiSearch") && $("ycEmojiSearch").value) || "").trim().toLowerCase();
  if (q) {
    // straight scan over ~1900 short strings — under a millisecond
    const needle = slugEmoji(q);
    const starts = [], contains = [];
    for (const e of emojiState.all) {
      const hay = e.q || slugEmoji(e.n);
      if (hay.startsWith(needle) || hay.includes("_" + needle) || (" " + hay).includes(" " + needle)) starts.push(e);
      else if (hay.includes(needle)) contains.push(e);
    }
    emojiState.view = starts.concat(contains).slice(0, 400);
  } else if (emojiState.cat === "recent") {
    const want = emojiRecents();
    const map = new Map(emojiState.all.map((e) => [e.c, e]));
    emojiState.view = want.map((c) => map.get(c)).filter(Boolean);
  } else {
    emojiState.view = emojiState.by[emojiState.cat] || [];
  }
  const sc = $("ycEmojiScroll"); if (sc) sc.scrollTop = 0;
  paintEmojiCats();
  renderEmojiGrid();
}

function paintEmojiCats() {
  const box = $("ycEmojiCats");
  if (!box) return;
  if (!box.children.length) {
    EMOJI_CATS.forEach(([key, icon]) => {
      const b = document.createElement("button");
      setEmoji(b, icon);
      b.title = key;
      b.dataset.cat = key;
      b.onclick = (e) => {
        e.stopPropagation();
        emojiState.cat = key;
        const si = $("ycEmojiSearch"); if (si) si.value = "";
        emojiSetView();
      };
      box.appendChild(b);
    });
  }
  const searching = !!(($("ycEmojiSearch") && $("ycEmojiSearch").value) || "").trim();
  [...box.children].forEach((b) => b.classList.toggle("on", !searching && b.dataset.cat === emojiState.cat));
}

function renderEmojiGrid() {
  const box = $("ycEmojiScroll"), layer = $("ycEmojiLayer");
  if (!box || !layer) return;

  const cols = Math.max(6, Math.floor((box.clientWidth || 300) / EMOJI_CELL));
  emojiState.cols = cols;

  const n = emojiState.view.length;
  const rows = Math.ceil(n / cols);
  layer.style.height = (rows * EMOJI_CELL) + "px";

  const empty = $("ycEmojiFoot");
  if (!n) {
    emojiState.pool.forEach((b) => { b.style.display = "none"; });
    if (empty) empty.textContent = emojiState.cat === "recent" && !($("ycEmojiSearch") || {}).value
      ? "Emoji you use will show up here" : "Nothing matches";
    return;
  }

  // only the rows in view (plus a little overscan) ever become DOM
  const first = Math.max(0, Math.floor(box.scrollTop / EMOJI_CELL) - 2);
  const last  = Math.min(rows - 1, Math.ceil((box.scrollTop + box.clientHeight) / EMOJI_CELL) + 2);

  let i = 0;
  for (let r = first; r <= last; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (idx >= n) break;
      let b = emojiState.pool[i];
      if (!b) {
        b = document.createElement("button");
        b.className = "yc-emoji-cell";
        b.type = "button";
        emojiState.pool.push(b);
        layer.appendChild(b);
      }
      const item = emojiState.view[idx];
      b.style.display = "";
      b.style.transform = `translate(${c * EMOJI_CELL}px, ${r * EMOJI_CELL}px)`;
      setEmoji(b, item.c);
      b.title = item.n;
      i++;
    }
  }
  for (; i < emojiState.pool.length; i++) emojiState.pool[i].style.display = "none";

  if (empty) empty.textContent = n + (n === 1 ? " emoji" : " emoji");
}

function insertEmojiIntoComposer(ch) {
  const inp = $("ycInput");
  if (!inp) return;
  const at = inp.selectionStart ?? inp.value.length;
  inp.value = inp.value.slice(0, at) + ch + inp.value.slice(inp.selectionEnd ?? at);
  const caret = at + ch.length;
  inp.setSelectionRange(caret, caret);
  autoGrow();
  inp.focus();
}

function openEmoji(onPick) {
  buildEmoji();
  emojiState.onPick = onPick || insertEmojiIntoComposer;
  const pop = $("ycEmojiPop");
  if (!pop) return;
  const si = $("ycEmojiSearch");
  if (si) si.value = "";
  if (emojiState.cat === "recent" && !emojiRecents().length) emojiState.cat = "smileys";
  pop.classList.add("open");
  emojiSetView();
  if (si) setTimeout(() => si.focus(), 30);
}
function closeEmoji() {
  const pop = $("ycEmojiPop");
  if (pop) pop.classList.remove("open");
  emojiState.onPick = null;
}
function toggleEmoji(e) {
  if (e) e.stopPropagation();
  const pop = $("ycEmojiPop");
  if (pop && pop.classList.contains("open")) closeEmoji();
  else openEmoji(null);
}

/* ---------- reactions ----------
   Stored under the message itself (msg/reactions/<emoji>/<uid> = true) so they
   arrive with the message snapshot — no extra listener, and one key per person
   per emoji means double-tapping can't inflate the count. */
const REACTION_SET = ["\u{1F44D}", "\u2764\uFE0F", "\u{1F602}", "\u{1F62E}", "\u{1F622}", "\u{1F525}", "\u{1F389}", "\u{1F440}"];

function reactorsOf(m, emoji) {
  const bag = m && m.reactions && m.reactions[emoji];
  if (!bag) return [];
  return Object.keys(bag).filter((u) => bag[u]);
}

/* Any change to a thread — not just a new message — has to move the revision,
   otherwise someone's cached copy keeps showing the old reaction or text. */
function bumpOpenThreadMeta() {
  if (state.view === "thread" && state.openThread) {
    const tid = threadId(state.uid, state.openThread.uid);
    const newest = (lastThreadMsgs && lastThreadMsgs.length) ? lastThreadMsgs[lastThreadMsgs.length - 1].key : "";
    bumpThreadMeta(tid, newest);
  }
}

async function toggleReaction(m, emoji) {
  if (!m || !m.key || !state.ready || !state.name || !sessionStarted) return;
  if (state.kicked) { say("You've been removed from the chat."); return; }
  if (state.muted)  { say("You're muted in chat."); return; }

  const { ref, set, remove } = dbfns;
  const path = `${msgPath(m.key)}/reactions/${emoji}/${state.uid}`;
  const mine = reactorsOf(m, emoji).includes(state.uid);
  try {
    if (mine) await remove(ref(db, path));
    else await set(ref(db, path), true);
    bumpOpenThreadMeta();
  } catch (err) {
    console.error("[chat] reaction failed", err);
    say("Couldn't save that reaction.");
  }
}

function closeReactPicker() {
  const p = $("ycReactPicker");
  if (p) p.classList.remove("open");
}

function openReactPicker(m, anchor) {
  const pop = $("ycReactPicker");
  const panel = $("ycPanel");
  if (!pop || !panel) return;

  pop.innerHTML = "";
  REACTION_SET.forEach((emoji) => {
    const b = document.createElement("button");
    setEmoji(b, emoji);
    b.title = emoji;
    if (reactorsOf(m, emoji).includes(state.uid)) b.classList.add("mine");
    b.onclick = (e) => { e.stopPropagation(); closeReactPicker(); toggleReaction(m, emoji); };
    pop.appendChild(b);
  });
  const more = document.createElement("button");
  more.textContent = "\u2795";
  more.title = "More emoji";
  more.onclick = (e) => {
    e.stopPropagation();
    closeReactPicker();
    openEmoji((ch) => toggleReaction(m, ch));
  };
  pop.appendChild(more);

  pop.classList.add("open");
  // anchor it to the button, then nudge it back inside the panel
  const a = anchor.getBoundingClientRect();
  const p = panel.getBoundingClientRect();
  const w = pop.offsetWidth || 240;
  let left = a.left - p.left + a.width / 2 - w / 2;
  left = Math.max(8, Math.min(left, p.width - w - 8));
  let top = a.top - p.top - (pop.offsetHeight || 46) - 8;
  if (top < 8) top = a.bottom - p.top + 8;
  pop.style.left = left + "px";
  pop.style.top = top + "px";
}

/* ---------- @ mentions / "/" commands (same popup, same keys) ---------- */
const mention = { open: false, mode: "user", start: -1, items: [], sel: 0 };

function closeMentionPop() {
  mention.open = false;
  mention.mode = "user";
  const pop = $("ycMentionPop");
  if (pop) { pop.classList.remove("open"); pop.innerHTML = ""; }
}

/* Only jam commands exist today, and only the ones that actually make sense
   right now — mirrors what the yc-jam bar itself would offer. Typing /jam
   inside a DM offers a private jam with just that person, invite-only. */
function slashCommands() {
  if (jam.id && jam.host) {
    return [{ name: "/endjam", note: "End your jam", run: endJam }];
  }
  if (jam.id && !jam.host) {
    return [{ name: "/leavejam", note: "Leave the jam", run: leaveJam }];
  }

  const cmds = [];
  const p = P(), np = p && p.nowPlaying();
  const inDm = state.view === "thread" && state.openThread && !isGroupId(state.openThread.uid) && state.openThread.uid;

  if (inDm && np && np.key) {
    const friend = state.openThread.name || nameFor(state.openThread.uid);
    cmds.push({ name: "/jam", note: `Start a private jam with ${friend}`, run: () => startJam(state.openThread.uid) });
  }

  const open = visibleOpenJams();
  if (open.length) {
    const j = open[0];
    cmds.push({
      name: "/jam",
      note: j.invite ? `${j.hostName || "Someone"} invited you — join` : `${j.hostName || "Someone"}'s jam is open — join`,
      run: () => joinJam(j.id)
    });
    cmds.push({ name: "/dismissjam", note: "Hide this invite", run: () => dismissJam(j) });
  }
  // no bare "/jam to start a public jam" fallback anymore — starting one
  // is only ever offered as an explicit invite from inside a DM

  return cmds;
}

function updateMentionPop() {
  const inp = $("ycInput");
  const pop = $("ycMentionPop");
  if (!inp || !pop) return;

  const upto = inp.value.slice(0, inp.selectionStart);

  /* :shortcode: lookup, sharing the mention popup. Typing ":cry" offers the
     matching emoji; picking one inserts the actual character, so nothing
     shortcode-shaped ever reaches the database. */
  const colon = upto.lastIndexOf(":");
  if (colon !== -1 && upto[0] !== "/" && !/\s/.test(upto.slice(colon + 1)) &&
      upto.length - colon > 2 && (colon === 0 || /[\s(]/.test(upto[colon - 1]))) {
    buildEmoji();
    const q = upto.slice(colon + 1).toLowerCase().replace(/[^a-z0-9_+-]/g, "");
    if (q) {
      const starts = [], has = [];
      for (const e of emojiState.all) {
        const hay = e.q || "";
        // "word starts with" beats "appears somewhere", so :sad leads with sad faces
        if (e.short.startsWith(q) || (" " + hay).includes(" " + q)) starts.push(e);
        else if (hay.includes(q)) has.push(e);
        if (starts.length >= 8) break;
      }
      const items = starts.concat(has).slice(0, 8)
        .map((e) => ({ uid: "emoji:" + e.c, name: ":" + e.short + ":", emoji: e.c }));
      if (items.length) {
        mention.open = true;
        mention.mode = "emoji";
        mention.start = colon;
        mention.items = items;
        if (mention.sel >= items.length) mention.sel = 0;
        pop.innerHTML = "";
        items.forEach((c, i) => {
          const row = document.createElement("div");
          row.className = "yc-mention-opt" + (i === mention.sel ? " sel" : "");
          const ic = document.createElement("span");
          ic.className = "nm";
          appendWithEmoji(ic, c.emoji);
          row.appendChild(ic);
          const nm = document.createElement("span");
          nm.className = "nm";
          nm.textContent = c.name;
          row.appendChild(nm);
          row.onmousedown = (ev) => { ev.preventDefault(); pickMention(i); };
          pop.appendChild(row);
        });
        pop.classList.add("open");
        return;
      }
    }
    closeMentionPop();
    return;
  }

  // "/" only counts as a command when it's the very first character typed
  if (upto[0] === "/" && !/\s/.test(upto.slice(1))) {
    const q = upto.slice(1).toLowerCase();
    const items = slashCommands().filter((c) => c.name.slice(1).toLowerCase().startsWith(q));
    if (!items.length) return closeMentionPop();

    mention.open = true;
    mention.mode = "slash";
    mention.start = 0;
    mention.items = items;
    if (mention.sel >= items.length) mention.sel = 0;

    pop.innerHTML = "";
    items.forEach((c, i) => {
      const row = document.createElement("div");
      row.className = "yc-mention-opt" + (i === mention.sel ? " sel" : "");
      const nm = document.createElement("span"); nm.className = "nm"; nm.textContent = c.name;
      row.appendChild(nm);
      const sub = document.createElement("span"); sub.className = "sub"; sub.textContent = c.note || "";
      row.appendChild(sub);
      row.onmousedown = (e) => { e.preventDefault(); pickMention(i); };
      pop.appendChild(row);
    });
    pop.classList.add("open");
    return;
  }

  const at = upto.lastIndexOf("@");
  // only trigger at a word boundary, and give up once they've typed a space
  if (at === -1 || (at > 0 && /[\w@]/.test(upto[at - 1])) || /\s/.test(upto.slice(at + 1))) {
    return closeMentionPop();
  }

  const q = upto.slice(at + 1).toLowerCase();
  let items = mentionCandidates()
    .filter((c) => c.uid !== state.uid)
    .sort((a, b) => a.name.localeCompare(b.name));
  items.unshift({ uid: "@everyone", name: "everyone", note: "notifies the room" });
  items = items.filter((c) => c.name.toLowerCase().startsWith(q)).slice(0, 6);

  if (!items.length) return closeMentionPop();

  mention.open = true;
  mention.mode = "user";
  mention.start = at;
  mention.items = items;
  if (mention.sel >= items.length) mention.sel = 0;

  pop.innerHTML = "";
  items.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "yc-mention-opt" + (i === mention.sel ? " sel" : "");
    if (c.uid !== "@everyone") row.appendChild(avatarEl(c.uid, c.name, "sm"));
    const nm = document.createElement("span"); nm.className = "nm"; nm.textContent = c.name;
    row.appendChild(nm);
    const sub = document.createElement("span"); sub.className = "sub";
    sub.textContent = c.note || (state.people[c.uid] ? "online" : "offline");
    row.appendChild(sub);
    row.onmousedown = (e) => { e.preventDefault(); pickMention(i); };
    pop.appendChild(row);
  });
  pop.classList.add("open");
}

function pickMention(i) {
  const c = mention.items[i];
  if (!c) return;

  if (mention.mode === "slash") {
    const inp = $("ycInput");
    closeMentionPop();
    if (inp) { inp.value = ""; autoGrow(); inp.focus(); }
    try { c.run(); } catch (err) { console.error("[chat] slash command failed", err); }
    return;
  }

  const inp = $("ycInput");
  if (!inp) return;
  const before = inp.value.slice(0, mention.start);
  const after  = inp.value.slice(inp.selectionStart);
  // a shortcode pick inserts the emoji itself, not "@name "
  const insert = c.emoji ? c.emoji : ("@" + c.name + " ");
  if (c.emoji) rememberEmoji(c.emoji);
  inp.value = before + insert + after;
  const caret = (before + insert).length;
  inp.setSelectionRange(caret, caret);
  closeMentionPop();
  autoGrow();
  inp.focus();
}

/* ---------- sending text ---------- */
async function send() {
  const inp = $("ycInput");
  if (!inp) return;
  const text = shortcodeToEmoji(inp.value.trim());
  if (!text || !state.ready || !state.name) return;
  if (!sessionStarted) { say("You need to log in to chat."); return; }
  if (state.kicked) { say("You've been removed from the chat."); return; }
  if (state.muted)  { say("You're muted in chat."); return; }

  inp.value = "";
  autoGrow();
  closeMentionPop();
  stopTyping();

  if (compose.mode === "edit") { await saveEdit(text); return; }

  const { ref, push, update } = dbfns;
  const mentions = findMentions(text);
  const payload = { uid: state.uid, name: state.name, text, ts: Date.now() };
  if (mentions.length) payload.mentions = mentions;
  if (compose.mode === "reply" && compose.target) {
    payload.replyTo = {
      key:  compose.target.key,
      uid:  compose.target.uid || null,
      name: compose.target.name || nameFor(compose.target.uid) || "someone",
      text: excerptOf(compose.target)
    };
  }
  const wasReply = compose.mode === "reply";

  try {
    if (state.view === "thread" && state.openThread) {
      const other = state.openThread.uid;
      const tid = threadId(state.uid, other);
      const pushed = await push(ref(db, `${msgsPath(tid)}`), payload);
      bumpThreadMeta(tid, pushed && pushed.key);   // tells other clients their cache is stale
      const preview = text.slice(0, 60);
      if (isGroupId(other)) {
        await touchGroup(other, preview, payload.ts);
      } else {
        await update(ref(db, `${ROOT}/dmIndex/${state.uid}/${other}`), {
          name: state.openThread.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
        });
        await update(ref(db, `${ROOT}/dmIndex/${other}/${state.uid}`), {
          name: state.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
        });
      }
      markThreadRead(other, payload.ts);
    } else {
      await push(ref(db, `${ROOT}/room`), payload);
    }
    if (wasReply) cancelCompose();
  } catch (err) {
    console.error("[chat] send failed", err);
    inp.value = text;   // don't eat the message
    autoGrow();
    say("Message didn't send — check your Firebase rules.");
  }
}

function autoGrow() {
  const inp = $("ycInput");
  if (!inp) return;
  inp.style.height = "auto";
  inp.style.height = Math.min(inp.scrollHeight, 140) + "px";
}

/* ---------- announcements (persistent, set from the control panel) ---------- */
function listenAnnouncement() {
  const { ref, onValue } = dbfns;
  onValue(ref(db, `${ROOT}/announcement`), (snap) => {
    const a = snap.val();
    const bar = $("ycAnnounce");
    const closeBtn = $("ycAnnounceClose");
    if (closeBtn) closeBtn.style.display = "";
    if (!a || !a.text) { if (bar) bar.classList.remove("show"); return; }
    if (localStorage.getItem("yc_announce_dismissed") === String(a.id)) return;
    $("ycAnnounceText").textContent = a.text;
    bar.classList.add("show");
    bar.dataset.id = a.id;
  });
}

function dismissAnnouncement() {
  const bar = $("ycAnnounce");
  if (bar) {
    localStorage.setItem("yc_announce_dismissed", bar.dataset.id || "");
    bar.classList.remove("show");
  }
}

/* ---------- COMMAND RECEIVER ---------- */
function listenCommands() {
  const { ref, query, limitToLast, onChildAdded } = dbfns;
  const q = query(ref(db, `${ROOT}/commands`), limitToLast(30));
  onChildAdded(q, (snap) => {
    const key = snap.key;
    const cmd = snap.val() || {};
    if (state.seenCommands.has(key)) return;
    state.seenCommands.add(key);

    // ignore anything issued before this tab loaded
    if (!cmd.ts || cmd.ts < BOOT - 3000) return;
    // targeting: "all" or a specific uid
    if (cmd.target && cmd.target !== "all" && cmd.target !== state.uid) return;

    runCommand(cmd);
  });
}

function runCommand(cmd) {
  const p = cmd.payload;
  switch (cmd.type) {
    case "toast":
      say(p || "");
      break;

    case "announce":
      $("ycAnnounceText").textContent = p || "";
      $("ycAnnounce").classList.add("show");
      $("ycAnnounce").dataset.id = cmd.ts;
      if ($("ycAnnounceText").textContent.includes('Update Available!')) {
        $("ycAnnounceClose").style.display = 'none';
        $("ycAnnounceUpBut").innerHTML = `<button class="yc-announce-close" onclick="if (document.referrer) { window.open('${document.referrer}'); window.close(); } else { window.location.reload(); }">Update</button>`;
      }
      say("📢 " + (p || ""));
      break;

    case "clearAnnounce":
      $("ycAnnounce").classList.remove("show");
      break;

    case "theme":
      if (typeof window.changeTheme === "function") { window.changeTheme(p); say("Theme set to " + p); }
      break;

    case "changelog":
      if (typeof window.showChangelogModal === "function") window.showChangelogModal(true);
      break;

    case "reload":
      say("Reloading…");
      setTimeout(() => location.reload(), 1200);
      break;

    case "play":
    case "pause":
      if (typeof window.togglePlay === "function") {
        const au = $("audioPlayer");
        const paused = au ? au.paused : true;
        if ((cmd.type === "play" && paused) || (cmd.type === "pause" && !paused)) window.togglePlay();
      }
      break;

    case "next":
      if (typeof window.nextTrack === "function") window.nextTrack(0, false);
      break;

    case "prev":
      if (typeof window.previousTrack === "function") window.previousTrack();
      break;

    // kept for older panels; the /moderation node is what actually persists
    case "mute":
      applyMuted(true);
      break;

    case "unmute":
      applyMuted(false);
      break;

    case "kick":
      applyBanned(true);
      break;

    case "rename":
      if (p) {
        state.name = p;
        localStorage.setItem("yc_name", p);
        publishProfile();
        refreshOwnAvatars();
        say("Your chat name is now " + p);
      }
      break;

    default:
      console.log("[chat] unknown command", cmd);
  }
}

/* ==========================================================================
   SHARED STATS
   Publishes a small summary of your listening stats so other people can see
   them. Album art is deliberately left out — it's base64 and would bloat the
   node badly. Anyone can switch this off from their profile.
   ========================================================================== */

const SHARE_KEY = "yc_share_stats";
let lastStatsSig = null;

function sharingStats() {
  return localStorage.getItem(SHARE_KEY) !== "0";   // on unless they turned it off
}

function statsSource() {
  if (typeof Stats !== "undefined" && Stats) return Stats;
  if (window.Stats) return window.Stats;
  return null;
}

function fmtDur(sec) {
  sec = Math.max(0, Math.round(sec || 0));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  if (h) return h + "h " + m + "m";
  if (m) return m + "m";
  return sec + "s";
}
function ago(ts) {
  if (!ts) return "never";
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60); if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
}

/* squeeze the full StatsManager cache down to something small enough to sync */
function buildStatsSummary() {
  const S = statsSource();
  if (!S || typeof S.getStats !== "function") return null;

  let cache, history;
  try { cache = S.getStats() || {}; history = (typeof S.getHistory === "function" ? S.getHistory() : []) || []; }
  catch (e) { return null; }

  const trackStats = cache.trackStats || {};
  const entries = Object.values(trackStats);

  const tracks = entries
    .slice()
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, 8)
    .map((t) => ({
      t: String(t.title  || "Unknown").slice(0, 70),
      a: String(t.artist || "Unknown Artist").slice(0, 50),
      p: t.plays || 0,
      s: Math.round(t.totalTime || 0)
    }));

  const artistPlays = {};
  entries.forEach((t) => {
    const a = ((t.artist || "").split(",")[0] || "").trim() || "Unknown Artist";
    artistPlays[a] = (artistPlays[a] || 0) + (t.plays || 0);
  });
  const artists = Object.entries(artistPlays)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([a, p]) => ({ a: a.slice(0, 50), p }));

  const recent = history.slice(0, 6).map((h) => ({
    t: String(h.title  || "Unknown").slice(0, 70),
    a: String(h.artist || "Unknown Artist").slice(0, 50),
    ts: h.time ? Date.parse(h.time) || null : null
  }));

  return {
    uid: state.uid,
    name: state.name || "unnamed",
    totalPlays: cache.totalPlays || 0,
    totalTime: Math.round(cache.totalTime || 0),
    uniqueTracks: entries.length,
    tracks, artists, recent,
    ts: Date.now()
  };
}

async function publishStats(force) {
  if (!db || !state.name || state.kicked) return;
  const { ref, set, remove } = dbfns;

  if (!sharingStats()) {
    if (lastStatsSig !== "off") {
      lastStatsSig = "off";
      try { await remove(ref(db, `${ROOT}/stats/${state.uid}`)); } catch (e) {}
      try { await remove(ref(db, `${ROOT}/statsFull/${state.uid}`)); } catch (e) {}
    }
    return;
  }

  const summary = buildStatsSummary();
  if (!summary) return;

  // don't spam writes when nothing actually changed
  const sig = JSON.stringify([summary.totalPlays, summary.totalTime, summary.tracks, summary.recent]);
  if (!force && sig === lastStatsSig) return;
  lastStatsSig = sig;

  try { await set(ref(db, `${ROOT}/stats/${state.uid}`), summary); }
  catch (err) { console.error("[chat] stats publish failed", err); }
  pushFullStats();
}

/* A trimmed copy of the real stats, kept server-side so they follow the account
   to another device. Album art is stripped — it's base64 and would balloon the
   node for no benefit. */
function fullStatsPayload() {
  const S = statsSource();
  if (!S || typeof S.getStats !== "function") return null;
  let cache;
  try { cache = S.getStats() || {}; } catch (e) { return null; }
  const tracks = {};
  Object.entries(cache.trackStats || {}).forEach(([uid, t]) => {
    if (!t) return;
    tracks[uid] = {
      title: String(t.title || "").slice(0, 120),
      artist: String(t.artist || "").slice(0, 80),
      plays: t.plays || 0,
      totalTime: Math.round(t.totalTime || 0)
    };
  });
  return { totalPlays: cache.totalPlays || 0, totalTime: Math.round(cache.totalTime || 0), tracks, ts: Date.now() };
}

async function pushFullStats() {
  if (!db || !state.name || !sharingStats()) return;
  const payload = fullStatsPayload();
  if (!payload) return;
  try { await dbfns.set(dbfns.ref(db, `${ROOT}/statsFull/${state.uid}`), payload); }
  catch (err) { console.error("[chat] stats sync failed", err); }
}

/* Pulled once per login and merged into the local store — never replacing it,
   so a device with more history doesn't lose anything. */
async function pullFullStats() {
  if (!db || !state.uid) return;
  const S = statsSource();
  if (!S || typeof S.mergeFromServer !== "function") return;
  try {
    const snap = await dbfns.get(dbfns.ref(db, `${ROOT}/statsFull/${state.uid}`));
    const rec = snap && snap.val();
    if (rec) await S.mergeFromServer(rec);
  } catch (err) {
    console.error("[chat] couldn't load your stats", err);
  }
}

/* ---------- API keys, saved with the account ----------
   Lives at ROOT/keys/<uid>. Newest write wins (by timestamp), so resetting a key
   on one device clears it everywhere instead of coming back from another one. */
const KEYS_TS = "youtifiy_keys_ts";
let keysPushTimer = null;

function localKeys() {
  return {
    api: localStorage.getItem("youtifiy_api_key") || "",
    lyrics: localStorage.getItem("youtifiy_lyrics_key") || ""
  };
}

function keysRef() { return dbfns.ref(db, `${ROOT}/keys/${state.uid}`); }

async function pushKeys() {
  if (!db || !state.authUid || !state.name || state.kicked) return;
  const k = localKeys();
  const ts = Number(localStorage.getItem(KEYS_TS)) || Date.now();
  try {
    await dbfns.set(keysRef(), { api: k.api, lyrics: k.lyrics, ts });
  } catch (err) {
    console.error("[chat] couldn't save your API key to your account", err);
    try { toast("couldn't sync your API key to your account"); } catch (e) {}
  }
}

/* called whenever a key is saved or reset in settings */
function keysChanged() {
  try { localStorage.setItem(KEYS_TS, String(Date.now())); } catch (e) {}
  if (!state.authUid || !state.name) return;      // not logged in — syncs on next login
  clearTimeout(keysPushTimer);
  keysPushTimer = setTimeout(pushKeys, 500);
}

async function pullKeys() {
  if (!db || !state.authUid || !state.uid) return;
  try {
    const snap = await dbfns.get(keysRef());
    const rec = snap && snap.val();
    const k = localKeys();
    const localHas = !!(k.api || k.lyrics);
    const localTs = Number(localStorage.getItem(KEYS_TS)) || 0;

    if (!rec) { if (localHas) { if (!localTs) localStorage.setItem(KEYS_TS, String(Date.now())); await pushKeys(); } return; }

    const serverTs = Number(rec.ts) || 0;
    const serverHas = !!(rec.api || rec.lyrics);

    if (serverTs > localTs) {
      // a key that only exists locally from before this feature shouldn't be wiped by an empty server copy
      if (!localTs && localHas && !serverHas) { localStorage.setItem(KEYS_TS, String(Date.now())); await pushKeys(); return; }
      localStorage.setItem(KEYS_TS, String(serverTs));
      if (typeof window.applySyncedKeys === "function") window.applySyncedKeys(rec.api || "", rec.lyrics || "");
    } else if (localTs > serverTs) {
      await pushKeys();
    }
  } catch (err) {
    console.error("[chat] couldn't load your API key", err);
  }
}

function listenStats() {
  const { ref, onValue } = dbfns;
  return onValue(ref(db, `${ROOT}/stats`), (snap) => {
    state.stats = snap.val() || {};
    if (state.view === "people") schedule("people", renderPeople);
    if (state.view === "profile" && state.openProfile) schedule("profile", () => renderProfile(state.openProfile));
  });
}

function toggleShareStats() {
  const on = !sharingStats();
  localStorage.setItem(SHARE_KEY, on ? "1" : "0");
  paintShareSwitch();
  publishStats(true);
  say(on ? "Your stats are visible to everyone now." : "Your stats are hidden.");
}
function paintShareSwitch() {
  const sw = $("ycShareSwitch");
  if (sw) sw.classList.toggle("on", sharingStats());
}

/* ---------- viewing someone's profile ---------- */
function openProfile(uid) {
  state.openProfile = uid;
  if (uid === state.uid) publishStats(true);
  showView("profile");
  renderProfile(uid);
}
function backFromProfile() {
  if (state.profileFrom === "thread" && state.openThread) return showView("thread");
  if (state.profileFrom === "me") return showView("me");
  showView("people");
}
function dmFromProfile() {
  const uid = state.openProfile;
  if (!uid || uid === state.uid) return;
  openThread(uid, nameFor(uid));
}

function statCard(label, value, wide) {
  const c = document.createElement("div");
  c.className = "yc-stat-card" + (wide ? " wide" : "");
  const v = document.createElement("div"); v.className = "v"; v.textContent = value;
  const k = document.createElement("div"); k.className = "k"; k.textContent = label;
  c.append(v, k);
  return c;
}
function sectionTitle(text) {
  const h = document.createElement("div");
  h.className = "yc-sec-title";
  h.textContent = text;
  return h;
}
function trackRow(rank, title, sub, right) {
  const row = document.createElement("div");
  row.className = "yc-trow";
  if (rank != null) {
    const n = document.createElement("div"); n.className = "n"; n.textContent = String(rank);
    row.append(n);
  }
  const main = document.createElement("div"); main.className = "yc-trow-main";
  const t = document.createElement("div"); t.className = "yc-trow-t"; t.textContent = title;
  main.append(t);
  if (sub) { const a = document.createElement("div"); a.className = "yc-trow-a"; a.textContent = sub; main.append(a); }
  row.append(main);
  if (right != null) {
    const p = document.createElement("div");
    if (typeof right === "string") { p.className = "yc-trow-p"; p.textContent = right; }
    else { p.style.cssText = "color:var(--text-muted);font-size:11px;flex-shrink:0"; p.textContent = right.muted; }
    row.append(p);
  }
  return row;
}

function renderProfile(uid) {
  const box = $("ycProfileScroll");
  if (!box) return;

  const mine = uid === state.uid;
  const prof = (state.profiles || {})[uid] || {};
  const pres = (state.people || {})[uid];
  const nm   = mine ? (state.name || "You") : nameFor(uid, prof.name);
  const bio  = mine ? (state.bio || "") : (prof.bio || "");

  $("ycProfileTitle").textContent = mine ? "Your profile" : "Profile";
  $("ycProfileSub").textContent = pres ? "online" : "offline";
  const dm = $("ycProfileDm");
  if (dm) dm.style.display = mine ? "none" : "";

  box.innerHTML = "";

  /* ---- hero ---- */
  const hero = document.createElement("div");
  hero.className = "yc-hero";
  hero.appendChild(avatarEl(uid, nm));

  const name = document.createElement("div");
  name.className = "yc-hero-name";
  name.textContent = nm;
  hero.appendChild(name);

  const handle = document.createElement("div");
  handle.className = "yc-hero-handle";
  handle.textContent = "@" + handleOf(uid);
  hero.appendChild(handle);

  const bioEl = document.createElement("div");
  bioEl.className = "yc-hero-bio" + (bio ? "" : " empty");
  bioEl.textContent = bio || (mine ? "No bio yet — add one from your profile." : "No bio yet.");
  hero.appendChild(bioEl);

  const track = pres && pres.track;
  const chip = document.createElement("div");
  chip.className = "yc-hero-chip" + (track ? " live" : "");
  if (track) {
    const eq = document.createElement("span");
    eq.className = "yc-eq";
    eq.innerHTML = "<i></i><i></i><i></i>";
    const t = document.createElement("span"); t.className = "t"; t.textContent = track;
    chip.append(eq, t);
  } else {
    const t = document.createElement("span"); t.className = "t";
    t.textContent = pres ? "not playing anything" : "offline";
    chip.append(t);
  }
  hero.appendChild(chip);

  const actions = document.createElement("div");
  actions.className = "yc-hero-actions";
  if (mine) {
    const edit = document.createElement("button");
    edit.className = "accent";
    edit.textContent = "Edit profile";
    edit.onclick = () => showView("me");
    actions.appendChild(edit);
  } else {
    const msg = document.createElement("button");
    msg.className = "accent";
    msg.textContent = "Message";
    msg.onclick = () => openThread(uid, nm);
    actions.appendChild(msg);
  }
  hero.appendChild(actions);
  box.appendChild(hero);

  /* ---- stats ---- */
  const data = (state.stats || {})[uid];

  if (!data) {
    const e = document.createElement("div");
    e.className = "yc-empty";
    e.style.margin = "22px auto";
    e.innerHTML = mine
      ? "No listening stats yet.<br>Play some music and they'll show up here."
      : "<b>" + nm + "</b> isn't sharing their stats.";
    box.appendChild(e);
    return;
  }

  box.appendChild(sectionTitle("Listening"));

  const grid = document.createElement("div");
  grid.className = "yc-stat-grid";
  grid.append(
    statCard("Total plays", (data.totalPlays || 0).toLocaleString()),
    statCard("Listening time", fmtDur(data.totalTime))
  );
  if (data.uniqueTracks) {
    grid.append(statCard("Tracks played", (data.uniqueTracks || 0).toLocaleString()));
    grid.append(statCard("Top artist", (data.artists && data.artists[0] ? data.artists[0].a : "—")));
  } else {
    grid.append(statCard("Top artist", (data.artists && data.artists[0] ? data.artists[0].a : "—"), true));
  }
  box.appendChild(grid);

  if (data.tracks && data.tracks.length) {
    box.appendChild(sectionTitle("Top tracks"));
    data.tracks.forEach((t, i) => {
      box.appendChild(trackRow(i + 1, t.t, t.a, (t.p || 0) + (t.p === 1 ? " play" : " plays")));
    });
  }

  if (data.artists && data.artists.length > 1) {
    box.appendChild(sectionTitle("Top artists"));
    data.artists.forEach((a, i) => {
      box.appendChild(trackRow(i + 1, a.a, null, (a.p || 0) + (a.p === 1 ? " play" : " plays")));
    });
  }

  if (data.recent && data.recent.length) {
    box.appendChild(sectionTitle("Recently played"));
    data.recent.forEach((r) => {
      box.appendChild(trackRow(null, r.t, r.a, r.ts ? { muted: ago(r.ts) } : null));
    });
  }

  const foot = document.createElement("div");
  foot.style.cssText = "font-size:11px;color:var(--text-muted);text-align:center;padding:12px 0 4px";
  foot.textContent = "stats updated " + ago(data.ts);
  box.appendChild(foot);
}

/* quick "message them" button on each person row */
function dmIconBtn(uid, name) {
  const b = document.createElement("button");
  b.className = "yc-statbtn";
  b.title = "Message them";
  b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.9-.9L3 21l2-4.9A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"></path></svg>';
  b.onclick = (e) => { e.stopPropagation(); openThread(uid, name); };
  return b;
}

function paintBioCount() {
  const el = $("ycMeBio"), c = $("ycMeBioCount");
  if (!el || !c) return;
  const n = (el.value || "").length;
  c.textContent = n + "/160";
  c.classList.toggle("over", n >= 160);
}

/* ---------- panel open/close ---------- */
function open() {
  $("ycPanel").classList.add("open");
  document.body.classList.add("yc-chat-open");
  if (!chatLoaded) setLoading(true, state.name ? "loading chat…" : "connecting…");
  if (!state.authUid && !configLooksFake()) showGate(defaultGateMode());
  markVisibleRead();
  setTimeout(() => { const i = $("ycInput"); if (i && state.name) i.focus(); scrollToBottom(state.view === "thread" ? $("ycThreadScroll") : $("ycRoomScroll")); }, 350);
}
function close() {
  $("ycPanel").classList.remove("open");
  document.body.classList.remove("yc-chat-open");
  stopTyping();
  recountUnread();
}
function toggle() { $("ycPanel").classList.contains("open") ? close() : open(); }

/* ---------- login / signup ---------- */
let gateMode = "signup"; // "signup" | "login" | "secure"
let gateBusy = false;

function usernameKey(raw) {
  return (raw || "").trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "").slice(0, 24);
}
function pseudoEmail(key) { return key + "@users.youtify.chat"; }

function showGate(mode) {
  markLoaded();
  gateMode = mode;
  showView("gate");
  paintGate();
}

function paintGate() {
  const title = $("ycGateTitle"), sub = $("ycGateSub");
  const nameInp = $("ycNameInput"), pass2 = $("ycPass2Input"),
        switchBtn = $("ycGateSwitch"), submitBtn = $("ycGateSubmit"), note = $("ycGateNote");
  if (note) note.textContent = "";
  if (!nameInp || !title || !sub || !switchBtn || !submitBtn) return;

  if (gateMode === "secure") {
    title.textContent = "Secure your name";
    sub.textContent = `You've used Youtify before without a password. Add one now so nobody else can chat as "${state.name}".`;
    nameInp.value = state.name || "";
    // Editable on purpose. Usernames normalise to [a-z0-9_.-], so two different
    // display names can collide ("Jayden (^w^)" and "Jayden" are both "jayden").
    // Locking this field left those people with no way forward at all.
    nameInp.disabled = false;
    if (pass2) pass2.style.display = "";
    submitBtn.textContent = "Secure my name";
    switchBtn.textContent = "Use a different name instead";
  } else if (gateMode === "login") {
    title.textContent = "Welcome back";
    sub.textContent = "Log in with your username and password.";
    nameInp.disabled = false;
    nameInp.placeholder = "username";
    if (pass2) pass2.style.display = "none";
    submitBtn.textContent = "Log in";
    switchBtn.textContent = "New here? Create an account";
  } else {
    title.textContent = "Join the chat";
    sub.textContent = "Pick a name and password. Everyone with Youtify open sees the same room.";
    nameInp.disabled = false;
    nameInp.placeholder = "username";
    if (pass2) pass2.style.display = "";
    submitBtn.textContent = "Join";
    switchBtn.textContent = "Already have an account? Log in";
  }
  refreshOwnAvatars();
}

function gateSwitchMode() {
  if (gateBusy) return;
  const passI = $("ycPassInput"), pass2I = $("ycPass2Input");
  if (gateMode === "secure") {
    if (!confirm(`Give up the name "${state.name}" and pick a new one instead?`)) return;
    localStorage.removeItem("yc_name");
    localStorage.removeItem("yc_uid");
    state.name = null;
    state.uid = localUid();
    showGate("signup");
  } else {
    showGate(gateMode === "login" ? "signup" : "login");
  }
  if (passI) passI.value = "";
  if (pass2I) pass2I.value = "";
}

function authErrorMessage(err) {
  const code = err && err.code;
  if (code === "auth/email-already-in-use") return "that name's already taken — try logging in, or pick another";
  if (code === "auth/wrong-password" || code === "auth/invalid-credential" || code === "auth/invalid-login-credentials") return "wrong password";
  if (code === "auth/user-not-found") return "no account with that name — check the spelling, or create one";
  if (code === "auth/weak-password") return "password needs to be at least 6 characters";
  if (code === "auth/too-many-requests") return "too many tries — wait a bit and try again";
  if (code === "auth/network-request-failed") return "couldn't reach the server — check your connection";
  if (code === "auth/operation-not-allowed") return "chat login isn't turned on yet — ask the admin to enable Email/Password sign-in in Firebase";
  if (code === "auth/invalid-email") return "that name has characters that won't work — try letters and numbers";
  return "something went wrong — try again";
}

async function gateSubmit() {
  if (gateBusy) return;
  if (!auth || !authfns) { const n = $("ycGateNote"); if (n) n.textContent = "still connecting… try again in a sec"; return; }
  const note = $("ycGateNote");
  const setNote = (t) => { if (note) note.textContent = t; };

  const rawName = gateMode === "secure" ? (state.name || "") : (($("ycNameInput").value || "").trim().slice(0, 24));
  if (!rawName) { setNote("pick a name first 👀"); return; }
  const key = usernameKey(rawName);
  if (!key) {
    setNote("that name needs at least one letter or number — emoji and symbols get stripped");
    const ni = $("ycNameInput"); if (ni) { ni.disabled = false; ni.focus(); }
    return;
  }

  const pass  = ($("ycPassInput").value || "");
  const pass2 = ($("ycPass2Input") ? $("ycPass2Input").value : "") || "";
  if (gateMode !== "login" && pass !== pass2) { setNote("passwords don't match"); return; }
  if (pass.length < 6) { setNote("password needs to be at least 6 characters"); return; }

  gateBusy = true;
  const btn = $("ycGateSubmit"); if (btn) btn.disabled = true;
  setNote(gateMode === "login" ? "logging in…" : "setting up…");

  try {
    const { ref, get, set: dbSet } = dbfns;

    if (gateMode === "login") {
      await authfns.signInWithEmailAndPassword(auth, pseudoEmail(key), pass);
      const snap = await get(ref(db, `${ROOT}/usernames/${key}`));
      const rec = snap.val();
      if (rec && rec.uid) {
        state.uid = rec.uid;
        state.name = rec.name || rawName;
      } else {
        state.name = rawName;
      }
      localStorage.setItem("yc_uid", state.uid);
      localStorage.setItem("yc_name", state.name);

      /* Re-assert who owns this chat uid. If someone registered twice from the
         same browser, the second account inherited the first one's uid while
         accountLinks still pointed at the first — and any rule that checks the
         link against auth.uid then rejects every message they send. Writing it
         on login lets the account they actually use take ownership. */
      try {
        const authUid = auth.currentUser && auth.currentUser.uid;
        if (authUid) {
          const linkRef = ref(db, `${ROOT}/accountLinks/${state.uid}`);
          const cur = await get(linkRef);
          if (cur.val() !== authUid) await dbSet(linkRef, authUid);
        }
      } catch (e) {
        console.warn("[chat] couldn't refresh the account link", e);
      }
    } else {
      // signup, or securing a legacy local name — first make sure nobody already owns it
      const snap = await get(ref(db, `${ROOT}/usernames/${key}`));
      if (snap.exists()) {
        const rec = snap.val() || {};
        const mine = rec.uid && rec.uid === state.uid;
        gateMode = "login";
        paintGate();
        const ni = $("ycNameInput");
        if (ni) { ni.value = rawName; ni.disabled = false; }
        const pi = $("ycPassInput"); if (pi) { pi.value = ""; pi.focus(); }
        setNote(mine
          ? "You've already registered this name — enter your password to log in."
          : `"${key}" is already registered. If it's yours, enter your password. If not, go back and pick a different name.`);
        gateBusy = false; if (btn) btn.disabled = false;
        return;
      }
      /* One account per browser. If this browser's uid is already linked to an
         account, a fresh signup would just be a second account for the same
         person — which is how the Alex/Al3x duplicate happened. Stop it here,
         before Firebase creates anything. Logging out clears the uid, so a
         shared computer can still make a second account on purpose. */
      try {
        const linked = await get(ref(db, `${ROOT}/accountLinks/${state.uid}`));
        if (linked.exists()) {
          gateMode = "login";
          paintGate();
          const ni = $("ycNameInput"); if (ni) { ni.value = ""; ni.disabled = false; ni.focus(); }
          const pi = $("ycPassInput"); if (pi) pi.value = "";
          setNote("This browser already has an account — log in to it. To make a separate one, log out first.");
          gateBusy = false; if (btn) btn.disabled = false;
          return;
        }
      } catch (e) { /* can't tell — let signup continue rather than lock people out */ }

      /* Set the name first. onAuthStateChanged can fire the moment the account
         exists, and if state.name isn't set yet it bounces you back to the gate
         with no session — a race that depends purely on timing. */
      state.name = rawName;
      localStorage.setItem("yc_name", state.name);
      let cred;
      try {
        cred = await authfns.createUserWithEmailAndPassword(auth, pseudoEmail(key), pass);
      } catch (err) {
        state.name = null;
        localStorage.removeItem("yc_name");
        throw err;
      }
      const authUid = cred.user.uid;

      await dbSet(ref(db, `${ROOT}/usernames/${key}`), { uid: state.uid, name: state.name, authUid, ts: Date.now() });
      await dbSet(ref(db, `${ROOT}/accountLinks/${state.uid}`), authUid);
    }

    $("ycPassInput").value = "";
    if ($("ycPass2Input")) $("ycPass2Input").value = "";
    // the observer normally gets here first; this covers the case where it
    // fired before the name was in place
    ensureSession();
    if (sessionStarted) showView("room");
  } catch (err) {
    console.error("[chat] auth failed", err);
    setNote(authErrorMessage(err));
  } finally {
    gateBusy = false;
    if (btn) btn.disabled = false;
  }
}

async function logOut() {
  endSessionLocal();                       // stop every listener and interval
  try { await authfns.signOut(auth); } catch (e) {}
  // the next person on this machine shouldn't inherit the last one's profile
  ["yc_name", "yc_uid", "yc_pfp", "yc_bio", KEYS_TS].forEach((k) => {
    try { localStorage.removeItem(k); } catch (e) {}
  });
  clearTimeout(keysPushTimer);
  // keys are on the account now, so they come back on next login
  try { if (typeof window.applySyncedKeys === "function") window.applySyncedKeys("", ""); } catch (e) {}
  state.name = null;
  state.pfp = null;
  state.bio = "";
  state.uid = localUid();
  state.authUid = null;
  state.muted = false;
  state.kicked = false;
  chatLoaded = false;
  refreshOwnAvatars();
  showGate("signup");
}

/* ---------- wire up ---------- */
window.YoutifyChat = {
  open, close, toggle, send,
  gateSubmit, gateSwitchMode, logOut,
  keysChanged,
  openNewGroup, createGroup, openGroupInfo, closeGroupInfo, deleteGroup, leaveGroup,

  /* Tell someone exactly why they can't send, instead of guessing.
     Have them run YoutifyChat.whyCantIChat() in the console. */
  whyCantIChat() {
    const reasons = [];
    if (configLooksFake()) reasons.push("Chat isn't configured (no Firebase config).");
    if (!db) reasons.push("Not connected to the database yet.");
    if (!state.authUid) reasons.push("Not logged in — no Firebase account on this browser.");
    if (!state.name) reasons.push("No username set.");
    if (!sessionStarted) reasons.push("Session never started, so the chat listeners aren't running.");
    if (state.kicked) reasons.push("You've been banned by the control panel.");
    if (state.muted) reasons.push("You've been muted by the control panel.");
    const inp = $("ycInput");
    if (inp && inp.disabled) reasons.push("The message box is disabled.");
    const info = {
      ok: reasons.length === 0,
      reasons,
      name: state.name,
      uid: state.uid,
      usernameKey: usernameKey(state.name || ""),
      loggedIn: !!state.authUid,
      sessionStarted,
      muted: state.muted,
      banned: state.kicked,
      view: state.view
    };
    console.log("[chat] diagnosis:", info);
    if (reasons.length) say(reasons[0]);
    else say("Everything looks fine on this end.");
    return info;
  },
  tab: (v) => (v === "dms" && state.openThread && state.view === "thread") ? showView("dms") : showView(v),
  dismissAnnouncement,
  openThread,
  sendPicture,
  cancelCompose,
  toggleEmoji, closeEmoji,
  get emojiState() { return emojiState; },
  toggleReaction,
  startReply,
  startEdit,
  pickAvatar,
  removeAvatar,
  saveProfile,
  openProfile,
  previewProfile: () => { state.profileFrom = "me"; openProfile(state.uid); },
  backFromProfile,
  dmFromProfile,
  toggleShareStats,
  toggleReceipts,
  toggleNotifs,
  startJam, endJam, joinJam, leaveJam,
  get jam() { return jam; },
  publishStats,
  closeLightbox,
  get state() { return state; }
};

document.addEventListener("DOMContentLoaded", () => {
  const inp = $("ycInput");
  if (inp) {
    inp.addEventListener("input", autoGrow);
    /* Swap a completed :shortcode: for the emoji as soon as the closing colon
       is typed, so you can see it worked instead of finding out on send. */
    inp.addEventListener("input", () => {
      const at = inp.selectionStart;
      if (at < 3 || inp.value[at - 1] !== ":") return;
      const before = inp.value.slice(0, at);
      const m = before.match(/:([A-Za-z0-9_+-]{2,}):$/);
      if (!m) return;
      const swapped = shortcodeToEmoji(m[0]);
      if (swapped === m[0]) return;
      const head = before.slice(0, before.length - m[0].length);
      inp.value = head + swapped + inp.value.slice(at);
      const caret = (head + swapped).length;
      inp.setSelectionRange(caret, caret);
      closeMentionPop();
      autoGrow();
    });

    inp.addEventListener("input", updateMentionPop);
    inp.addEventListener("input", () => {
      if (inp.value.trim()) announceTyping();
      else stopTyping();
    });
    inp.addEventListener("blur", () => stopTyping());
    inp.addEventListener("click", updateMentionPop);
    inp.addEventListener("blur", () => setTimeout(closeMentionPop, 120));

    inp.addEventListener("keydown", (e) => {
      if (mention.open) {
        if (e.key === "ArrowDown") { e.preventDefault(); mention.sel = (mention.sel + 1) % mention.items.length; updateMentionPop(); e.stopPropagation(); return; }
        if (e.key === "ArrowUp")   { e.preventDefault(); mention.sel = (mention.sel - 1 + mention.items.length) % mention.items.length; updateMentionPop(); e.stopPropagation(); return; }
        if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); pickMention(mention.sel); e.stopPropagation(); return; }
        if (e.key === "Escape") { e.preventDefault(); closeMentionPop(); e.stopPropagation(); return; }
      }
      // Escape backs out of a reply/edit before anything else
      if (e.key === "Escape" && compose.mode) { e.preventDefault(); cancelCompose(); e.stopPropagation(); return; }
      // up-arrow on an empty box edits your last message, like most chat apps
      if (e.key === "ArrowUp" && !inp.value && !compose.mode) {
        const list = state.view === "thread" ? lastThreadMsgs : lastRoomMsgs;
        const own = (list || []).filter((m) => m.uid === state.uid && !m.system && !imageSrcOf(m));
        if (own.length) { e.preventDefault(); startEdit(own[own.length - 1]); e.stopPropagation(); return; }
      }
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
      e.stopPropagation(); // don't trigger Youtify's keyboard shortcuts while typing
    });
    // paste a picture straight into the box
    inp.addEventListener("paste", (e) => {
      const items = (e.clipboardData || {}).items || [];
      for (const it of items) {
        if (it.kind === "file" && /^image\//.test(it.type)) {
          const f = it.getAsFile();
          if (f) { e.preventDefault(); handlePictureFile(f); }
          return;
        }
      }
    });
  }

  const nameInp = $("ycNameInput");
  if (nameInp) {
    nameInp.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") gateSubmit();
    });
    nameInp.addEventListener("input", () => {
      const av = $("ycGateAv");
      if (av && !state.pfp) av.textContent = initials(nameInp.value);
    });
  }
  [$("ycPassInput"), $("ycPass2Input")].forEach((el) => {
    if (!el) return;
    el.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") gateSubmit();
    });
  });

  const meBio = $("ycMeBio");
  if (meBio) {
    meBio.addEventListener("input", paintBioCount);
    const meHandle = $("ycMeHandle");
    if (meHandle) {
      meHandle.addEventListener("input", paintHandleNote);
      meHandle.addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") saveProfile(); });
    }
    meBio.addEventListener("keydown", (e) => e.stopPropagation());
  }

  const meNameInp = $("ycMeName");
  if (meNameInp) meNameInp.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") saveProfile();
  });

  const tScroll = $("ycThreadScroll");
  if (tScroll) tScroll.addEventListener("scroll", () => {
    if (tScroll.scrollTop < 120) loadOlderThread();
  }, { passive: true });

  const eScroll = $("ycEmojiScroll");
  if (eScroll) eScroll.addEventListener("scroll", () => renderEmojiGrid(), { passive: true });

  const eLayer = $("ycEmojiLayer");
  if (eLayer) eLayer.addEventListener("click", (e) => {
    const b = e.target.closest(".yc-emoji-cell");
    if (!b || !b.dataset.ch) return;
    e.stopPropagation();
    const ch = b.dataset.ch;
    rememberEmoji(ch);
    const fn = emojiState.onPick || insertEmojiIntoComposer;
    closeEmoji();
    try { fn(ch); } catch (err) { console.error("[chat] emoji pick failed", err); }
  });

  const eSearch = $("ycEmojiSearch");
  if (eSearch) eSearch.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Escape") { e.preventDefault(); closeEmoji(); const i = $("ycInput"); if (i) i.focus(); }
  });
  if (eSearch) eSearch.addEventListener("input", () => emojiSetView());

  const picInput = $("ycPictureInput");
  if (picInput) picInput.addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    handlePictureFile(f);
  });

  const avInput = $("ycAvatarInput");
  if (avInput) avInput.addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    handleAvatarFile(f);
    e.target.value = "";
  });

  // drag & drop a picture onto the panel
  const panel = $("ycPanel");
  if (panel) {
    panel.addEventListener("click", (e) => {
      if (!e.target.closest || !e.target.closest(".yc-react-picker, .yc-msg-actions")) closeReactPicker();
      if (!e.target.closest || !e.target.closest(".yc-emoji-pop, #ycEmojiBtn")) closeEmoji();
    });
    panel.addEventListener("dragover", (e) => { e.preventDefault(); });
    panel.addEventListener("drop", (e) => {
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f && /^image\//.test(f.type)) { e.preventDefault(); handlePictureFile(f); }
    });
  }

  /* Capture phase on purpose: the composer calls stopPropagation on keydown to
     keep Youtify's shortcuts from firing while you type, and it holds focus by
     default — so a bubbling listener here would never see Escape. */
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + Shift + C toggles the chat
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyC") { e.preventDefault(); toggle(); }
    if (e.key === "Escape") { closeReactPicker(); closeEmoji(); }
    if (e.key === "Escape" && $("ycLightbox") && $("ycLightbox").classList.contains("show")) {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    }
  }, true);

  refreshOwnAvatars();
  startTypingTicker();
  setLoading(true, "connecting…");
  boot();
});
})();

/* ===================== topbar.js ===================== */
/* top bar: show the song search box in the middle of the bar (desktop) */
(function () {
  var slot = document.getElementById('sbSearchSlot');
  var main = document.getElementById('mainContent');
  if (!slot || !main) return;
  var mq = window.matchMedia('(min-width: 861px)');

  // code elsewhere looks the box up by id; always hand back the freshest one
  var _gid = document.getElementById.bind(document);
  document.getElementById = function (id) {
    if (id === 'searchInput') {
      return main.querySelector('#searchInput') || slot.querySelector('#searchInput') || _gid(id);
    }
    return _gid(id);
  };

  function sync() {
    var hdr = main.querySelector('#searchContainer');
    var inMain = main.querySelector('#searchInput');
    if (mq.matches) {
      if (inMain) {
        var box = inMain.closest('.search-container');
        if (box) { slot.textContent = ''; slot.appendChild(box); }
      }
      // only the Home view had the song search; the other views hide it
      var view = (typeof currentView !== 'undefined') ? currentView : 'home';
      slot.style.visibility = (view === 'home') ? '' : 'hidden';
    } else {
      var inSlot = slot.querySelector('.search-container');
      if (inSlot && hdr) hdr.insertBefore(inSlot, hdr.firstChild);
      slot.style.visibility = '';
    }
  }

  new MutationObserver(sync).observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
  sync();
  setInterval(sync, 800); // safety net: re-check now and then
})();