// ============================================================================
// BOOTSTRAP
// ============================================================================

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
let playStats = { totalPlays: 0, totalTime: 0, trackStats: {} };
let playHistory = [];

let audio  = document.getElementById('audioPlayer');
let audio2 = document.getElementById('audioPlayer2');
const aab_button = document.getElementById('aab');
const performanceModeButton = document.getElementById('performanceModeBtn');

// ============================================================================
// YOUTUBE API
// ============================================================================

class YouTubeAPI {
  constructor(key) {
    this.key = key;                       // still only used for search()
    this.hosting = 'https://thisisatestthing-2.onrender.com';   // downloader backend (no key needed)
  }

  parseID(input) {
    if (!input) return '';
    const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?\s]+)/);
    return match ? match[1] : input;
  }

  async search(query) {
    if (!this.key) throw new Error('API key not set');
    const res = await fetch('https://youtube-v2.p.rapidapi.com/search/?query=' + encodeURIComponent(query), {
      method: 'GET',
      headers: { 'x-rapidapi-key': this.key, 'x-rapidapi-host': 'youtube-v2.p.rapidapi.com' }
    });
    return res.json();
  }

  async getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  async api(path, options = {}) {
  const res = await fetch(`${this.hosting}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `${path} failed (${res.status})`);
  }
  return res;
}

async download(track) {
  try {
    const url = `https://www.youtube.com/watch?v=${track.id}`;
    track.status = 'Fetching...';
    renderDownloads();

    // analyze (first request can take ~1 min if Render was asleep)
    const info = await (await this.api('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })).json();

    // fill in title / thumbnail for tracks added via pasted link
    if (info.title && (!track.title || track.title.startsWith('YT: '))) track.title = info.title;
    if (!track.albumArt) {
      track.albumArt = info.thumbnailUrl || `https://i.ytimg.com/vi/${track.id}/hqdefault.jpg`;
    }

    const mp3 = (info.formats || []).find(f => f.ext === 'mp3');
    if (!mp3) { track.status = 'Error'; renderDownloads(); return; }

    // download as blob (with progress if the server sends content-length)
    track.status = 'Downloading...';
    track.progress = 0;
    renderDownloads();

    const res = await this.api('/api/download', {
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
  } catch (e) {
    console.error(e);
    track.status = 'Error';
    renderDownloads();
  }
}
}

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
  }

  static resetApiKey() {
    apiKey = '';
    localStorage.removeItem('youtifiy_api_key');
    localStorage.removeItem('youtifiy_lyrics_key');
    youtubeAPI.key = '';
    document.getElementById('apiKeyInput').value = '';
    toast('API key reset');
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
    setApiKey(key) { this.apiKey = key; localStorage.setItem('youtifiy_lyrics_key', key); }
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

console.log('🎵 Youtify Music Player initialized!');
console.log('Shortcuts: Press / for help, L for lyrics, E for effects');
document.addEventListener("DOMContentLoaded", (event) => {
  handleLyricsButtonClick();
});