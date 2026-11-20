// Sidecar uses only handles granted by the browser's local folder picker.
(() => {
  'use strict';

  const dialog = document.getElementById('sidecarDialog');
  if (!dialog) return;

  const canPick = window.isSecureContext && window.top === window &&
    typeof window.showDirectoryPicker === 'function';
  const status = dialog.querySelector('[data-sidecar-status]');
  const closeButton = dialog.querySelector('[data-sidecar-close]');
  const prompt = dialog.querySelector('.sidecar-prompt');
  const editor = dialog.querySelector('.sidecar-editor');
  const textarea = editor.querySelector('textarea');
  const saveButton = editor.querySelector('[data-editor-save]');
  const editorStatus = editor.querySelector('[data-editor-status]');
  const listLimit = 500;
  const textLimit = 8 * 1024 * 1024;
  const nameOrder = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  const dateFormat = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
  const skippedSearchFolders = new Set(['.git', 'node_modules']);
  const imageExtensions = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif']);
  const textExtensions = new Set(('txt md markdown json jsonc lrc m3u m3u8 srt vtt html htm css scss sass less js mjs cjs jsx ts tsx vue svelte py cs xaml xml svg yml yaml toml ini cfg conf config log csv tsv sql sh bash zsh ps1 psm1 bat cmd java kt go rs rb php c h cpp hpp cc swift dart lua r tex gitignore gitattributes editorconfig env properties gradle lock dockerfile makefile gitmodules npmrc prettierrc eslintrc').split(' '));
  const iconPaths = {
    file: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10zM13 3v7h7"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="9" r="1.5"/><path d="m21 16-5-5-8 8"/>',
    up: '<path d="m6 11 6-6 6 6M12 5v14"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-5L4 8m0-5v5h5M4 13a8 8 0 0 0 14 5l2-2m0 5v-5h-5"/>',
    'new-file': '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10zM13 3v7h7M12 13v5m-2.5-2.5h5"/>',
    'new-folder': '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 11v5m-2.5-2.5h5"/>'
  };

  let busy = false;
  let drag;
  let activePane;
  let openedFile;
  let opener;
  let promptRequest;

  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
  }

  function sourceEntry(handle, parents) {
    return { handle, parents, name: handle.name, kind: handle.kind };
  }

  function extension(name) {
    return name.toLowerCase().split('.').pop();
  }

  function formatSize(bytes) {
    if (bytes == null) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  }

  function message(error) {
    if (['NotAllowedError', 'SecurityError'].includes(error.name)) return 'Folder access was denied. Choose the folder again and allow access.';
    if (error.name === 'NotFoundError') return 'This item is gone. Refresh the folder and try again.';
    return error.message || String(error);
  }

  function say(text, isError = false) {
    status.textContent = text;
    status.classList.toggle('sidecar-error', isError);
  }

  function currentFolder(pane) {
    return pane.folders.at(-1);
  }

  async function exists(directory, name) {
    for (const method of ['getFileHandle', 'getDirectoryHandle']) {
      try {
        await directory[method](name);
        return true;
      } catch (err) {
        if (err.name === 'TypeMismatchError') return true;
        if (err.name !== 'NotFoundError') throw err;
      }
    }
    return false;
  }

  async function assertAvailable(directory, name) {
    if (await exists(directory, name)) throw new Error(`“${name}” already exists.`);
  }

  function validName(name) {
    return name.length > 0 && name.length <= 255 && name === name.trim() &&
      !/[<>:"/\\|?*\x00-\x1f]/.test(name) && !name.endsWith('.') &&
      !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i.test(name);
  }

  function makePane(side, index) {
    const element = dialog.querySelector('[data-sidecar-pane]').content.firstElementChild.cloneNode(true);
    const title = element.querySelector('[data-sidecar-title]');
    title.id = `sidecarPane${index}`;
    title.textContent = side;
    element.setAttribute('aria-labelledby', title.id);
    const buttons = Object.fromEntries([...element.querySelectorAll('[data-action]')].map(button => [button.dataset.action, button]));
    for (const [name, button] of Object.entries(buttons)) {
      if (button.classList.contains('sidecar-icon-button')) button.innerHTML = icon(name);
    }
    const other = index === 0 ? 'Right' : 'Left';
    for (const verb of ['copy', 'move']) {
      const label = verb === 'copy' ? 'Copy' : 'Move';
      buttons[verb].textContent = index === 0 ? `${label} →` : `← ${label}`;
      buttons[verb].setAttribute('aria-label', `${label} to ${other.toLowerCase()} folder`);
    }
    const list = element.querySelector('.sidecar-list');
    list.setAttribute('aria-label', `${side} folder contents`);
    dialog.querySelector('.sidecar-panes').append(element);
    return {
      side, element, list, buttons, folders: [], entries: [], selected: null, results: null,
      loading: false, searching: false, searchVersion: 0, searchTimer: 0,
      search: element.querySelector('input'),
      sort: element.querySelector('select'),
      path: element.querySelector('[data-sidecar-path]'),
      count: element.querySelector('[data-sidecar-count]'),
      actions: element.querySelector('.sidecar-actions'),
      empty: element.querySelector('[data-sidecar-empty]'),
      emptyList: element.querySelector('[data-sidecar-list-empty]'),
      browser: element.querySelector('.sidecar-browser')
    };
  }

  const panes = ['Left', 'Right'].map(makePane);
  const otherPane = pane => pane === panes[0] ? panes[1] : panes[0];

  function updateControls() {
    closeButton.disabled = busy;
    saveButton.disabled = busy || !openedFile?.dirty;
    textarea.readOnly = busy;
    for (const pane of panes) {
      const hasFolder = pane.folders.length > 0;
      const searching = pane.results !== null;
      pane.buttons.pick.disabled = busy || !canPick;
      pane.buttons.pick.textContent = hasFolder ? 'Change folder' : 'Choose folder';
      pane.buttons.up.disabled = busy || pane.folders.length < 2;
      pane.search.disabled = busy;
      pane.sort.disabled = busy || searching;
      pane.actions.hidden = !pane.selected || pane.loading;
      for (const button of pane.path.querySelectorAll('button')) button.disabled = busy;
      for (const action of ['refresh', 'new-file', 'new-folder', 'open', 'show', 'copy', 'move', 'rename', 'delete']) {
        const isTransfer = action === 'copy' || action === 'move';
        const button = pane.buttons[action];
        button.disabled = busy || (isTransfer && !currentFolder(otherPane(pane)));
        if (['show', 'copy', 'move', 'rename', 'delete'].includes(action)) {
          button.hidden = action === 'show' ? !searching : searching;
        }
      }
    }
  }

  async function run(action) {
    if (busy) return;
    const focusBefore = document.activeElement;
    busy = true;
    updateControls();
    try {
      await action();
    } catch (err) {
      if (err.name !== 'AbortError') say(message(err), true);
    } finally {
      busy = false;
      updateControls();
      if (document.activeElement === document.body && dialog.open) {
        const currentDialog = editor.open ? editor : dialog;
        if (focusBefore?.isConnected && currentDialog.contains(focusBefore)) focusBefore.focus();
        if (document.activeElement === document.body) currentDialog.querySelector('[autofocus]')?.focus();
      }
    }
  }

  function renderPath(pane) {
    const oldFocus = document.activeElement;
    const focusedIndex = Array.from(pane.path.children).indexOf(oldFocus);
    pane.path.replaceChildren();
    pane.folders.forEach((folder, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = folder.name;
      button.title = folder.name;
      if (index === pane.folders.length - 1) button.setAttribute('aria-current', 'location');
      button.addEventListener('click', () => run(() => navigate(pane, pane.folders.slice(0, index + 1))));
      pane.path.append(button);
    });
    if (focusedIndex >= 0) (pane.path.children[focusedIndex] || pane.path.lastElementChild)?.focus();
    pane.path.scrollLeft = pane.path.scrollWidth;
  }

  function renderRow(entry, pane, index) {
    const row = document.createElement('div');
    const directory = entry.kind === 'directory';
    const selected = pane.selected === entry;
    row.className = 'sidecar-columns sidecar-row';
    row.dataset.kind = entry.kind;
    row.setAttribute('role', 'option');
    row.setAttribute('aria-selected', String(selected));
    row.tabIndex = selected || (!pane.selected && index === 0) ? 0 : -1;
    row.draggable = pane.results === null;
    row.innerHTML = `<span class="sidecar-name">${icon(directory ? 'folder' : imageExtensions.has(extension(entry.name)) ? 'image' : 'file')}<span><strong></strong></span></span><span></span><span></span>`;
    const title = row.querySelector('strong');
    title.textContent = entry.name;
    title.title = entry.name;
    if (pane.results) {
      const location = document.createElement('small');
      location.textContent = entry.parents.slice(pane.folders.length).map(folder => folder.name).join(' / ') || 'In this folder';
      title.after(location);
    }
    if (!directory) {
      row.children[1].textContent = formatSize(entry.size);
      row.children[2].textContent = entry.modified == null ? '' : dateFormat.format(entry.modified);
    }
    row.addEventListener('focus', () => { activePane = pane; });
    row.addEventListener('click', () => select(pane, entry, row, true));
    row.addEventListener('dblclick', () => run(() => openEntry(pane, entry)));
    row.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        run(() => openEntry(pane, entry));
      } else if (event.key === ' ') {
        event.preventDefault();
        select(pane, entry, row);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        (event.key === 'ArrowUp' ? row.previousElementSibling : row.nextElementSibling)?.click();
      }
    });
    row.addEventListener('dragstart', event => {
      if (busy || !row.draggable) {
        event.preventDefault();
        return;
      }
      select(pane, entry, row);
      drag = { pane, entry };
      event.dataTransfer.setData('text/plain', entry.name);
      event.dataTransfer.effectAllowed = 'copyMove';
    });
    row.addEventListener('dragend', clearDrag);
    return row;
  }

  function compareNames(a, b) {
    if (a.kind !== b.kind) return a.kind === 'directory' ? -1 : 1;
    return nameOrder.compare(a.name, b.name);
  }

  function renderList(pane) {
    const browsing = !!currentFolder(pane);
    pane.empty.hidden = browsing;
    pane.browser.hidden = !browsing;
    if (!browsing) return;

    const mode = pane.sort.value;
    const items = pane.results ?? [...pane.entries].sort((a, b) => {
      if (a.kind === b.kind) {
        if (mode === 'modified' && (b.modified ?? 0) !== (a.modified ?? 0)) return (b.modified ?? 0) - (a.modified ?? 0);
        if (mode === 'size' && (b.size ?? -1) !== (a.size ?? -1)) return (b.size ?? -1) - (a.size ?? -1);
      }
      return compareNames(a, b);
    });
    const waiting = pane.loading || pane.searching;
    const showRows = !waiting && items.length > 0;
    const restoreRow = pane.list.contains(document.activeElement);
    const rows = document.createDocumentFragment();
    if (showRows) items.forEach((entry, index) => rows.append(renderRow(entry, pane, index)));
    pane.list.replaceChildren(rows);
    pane.list.hidden = !showRows;
    pane.emptyList.hidden = showRows;
    pane.emptyList.textContent = pane.loading ? 'Loading…' : pane.searching ? 'Searching…' : pane.results ? 'No matches' : 'This folder is empty.';
    pane.count.textContent = waiting ? '' : pane.results
      ? (items.length === listLimit ? `First ${listLimit} matches` : `${items.length} found`)
      : `${items.length} item${items.length === 1 ? '' : 's'}`;
    if (restoreRow) (pane.list.querySelector('[tabindex="0"]') || pane.search).focus();
    else pane.list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    updateControls();
  }

  function select(pane, entry, row, focus = false) {
    if (busy) return;
    activePane = pane;
    pane.selected = entry;
    for (const item of pane.list.children) {
      item.setAttribute('aria-selected', String(item === row));
      item.tabIndex = item === row ? 0 : -1;
    }
    if (focus) row.focus();
    updateControls();
  }

  function resetSearch(pane, clearInput = true) {
    clearTimeout(pane.searchTimer);
    pane.searchVersion++;
    pane.searching = false;
    pane.results = null;
    if (clearInput) pane.search.value = '';
  }

  function updateSearch(pane) {
    resetSearch(pane, false);
    pane.selected = null;
    const query = pane.search.value.trim().toLowerCase();
    if (!query) {
      renderList(pane);
      return;
    }
    const version = pane.searchVersion;
    pane.results = [];
    pane.searching = true;
    renderList(pane);
    pane.searchTimer = setTimeout(() => searchTree(pane, query, version), 220);
  }

  async function searchTree(pane, query, version) {
    const results = [];
    async function walk(parents) {
      for await (const handle of parents.at(-1).values()) {
        if (pane.searchVersion !== version || results.length >= listLimit) return;
        if (handle.name.toLowerCase().includes(query)) results.push(sourceEntry(handle, parents));
        if (handle.kind === 'directory' && !skippedSearchFolders.has(handle.name) && results.length < listLimit) {
          await walk([...parents, handle]);
        }
      }
    }
    try {
      await walk([...pane.folders]);
    } catch (err) {
      if (pane.searchVersion === version) say(message(err), true);
    }
    if (pane.searchVersion !== version) return;
    pane.results = results.sort(compareNames);
    pane.searching = false;
    renderList(pane);
  }

  async function refresh(pane, selectedName = pane.selected?.name) {
    if (!currentFolder(pane)) return;
    const restoreFocus = pane.list.contains(document.activeElement);
    resetSearch(pane, false);
    pane.loading = true;
    pane.selected = null;
    pane.entries = [];
    renderList(pane);
    try {
      const entries = [];
      for await (const handle of currentFolder(pane).values()) entries.push(sourceEntry(handle, pane.folders));
      const files = entries.filter(entry => entry.kind === 'file');
      let cursor = 0;
      await Promise.all(Array.from({ length: Math.min(8, files.length) }, async () => {
        while (cursor < files.length) {
          const entry = files[cursor++];
          try {
            const file = await entry.handle.getFile();
            entry.size = file.size;
            entry.modified = file.lastModified;
          } catch {
            // Entries can disappear or become unreadable while reading metadata.
          }
        }
      }));
      pane.entries = entries;
      pane.selected = entries.find(entry => entry.name === selectedName) ?? null;
    } catch (err) {
      if (err.name === 'NotFoundError' && pane.folders.length > 1) {
        await navigate(pane, pane.folders.slice(0, -1));
        return;
      }
      throw err;
    } finally {
      pane.loading = false;
      if (pane.search.value.trim()) updateSearch(pane);
      else renderList(pane);
      if (restoreFocus && document.activeElement === document.body) {
        (pane.list.querySelector('[tabindex="0"]') || pane.buttons.pick).focus();
      }
    }
  }

  async function navigate(pane, folders, selectedName = null) {
    pane.folders = folders;
    resetSearch(pane);
    await refresh(pane, selectedName);
    renderPath(pane);
  }

  async function pickFolder(pane) {
    const folder = await window.showDirectoryPicker({ id: `youtify-sidecar-${pane.side.toLowerCase()}`, mode: 'readwrite' });
    await navigate(pane, [folder]);
    say(`Opened ${folder.name}.`);
  }

  function ask(options) {
    const input = prompt.querySelector('input');
    const submit = prompt.querySelector('[type="submit"]');
    prompt.querySelector('h2').textContent = options.title;
    prompt.querySelector('#sidecarPromptText').textContent = options.description;
    prompt.querySelector('.sidecar-error').textContent = '';
    input.closest('label').hidden = !options.directory;
    input.disabled = !options.directory;
    input.value = options.initial ?? '';
    submit.textContent = options.action;
    submit.classList.toggle('dialog-danger', !!options.danger);
    prompt.showModal();
    if (options.directory) {
      input.focus();
      input.select();
    } else {
      prompt.querySelector('[data-cancel]').focus();
    }
    return new Promise(resolve => { promptRequest = { options, resolve, result: null }; });
  }

  prompt.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault();
    const request = promptRequest;
    const input = prompt.querySelector('input');
    const error = prompt.querySelector('.sidecar-error');
    const submit = prompt.querySelector('[type="submit"]');
    if (!request || submit.disabled) return;
    if (!request.options.directory) {
      request.result = true;
      prompt.close();
      return;
    }
    submit.disabled = true;
    try {
      if (!validName(input.value)) throw new Error('Enter a name without reserved characters, leading or trailing spaces, or a trailing period.');
      const name = input.value;
      if (name !== request.options.unchanged) await assertAvailable(request.options.directory, name);
      if (promptRequest !== request || !prompt.open) return;
      request.result = name;
      prompt.close();
    } catch (err) {
      if (promptRequest === request && prompt.open) {
        error.textContent = message(err);
        input.focus();
      }
    } finally {
      submit.disabled = false;
    }
  });
  prompt.querySelector('[data-cancel]').addEventListener('click', () => prompt.close());
  prompt.addEventListener('close', () => {
    const request = promptRequest;
    promptRequest = null;
    request?.resolve(request.result);
  });

  async function refreshAfterChange(pane, selection, otherSelection) {
    const results = await Promise.allSettled([refresh(pane, selection), refresh(otherPane(pane), otherSelection)]);
    const failure = results.find(result => result.status === 'rejected');
    return failure ? ` Refresh failed: ${message(failure.reason)}` : '';
  }

  async function createEntry(pane, folder) {
    const directory = currentFolder(pane);
    const name = await ask({
      title: folder ? 'New folder' : 'New file',
      description: folder ? 'Name the new folder.' : 'Use a name with an extension, like notes.txt.',
      initial: folder ? 'New folder' : 'untitled.txt', action: 'Create', directory
    });
    if (name === null) return;
    await assertAvailable(directory, name);
    const handle = folder
      ? await directory.getDirectoryHandle(name, { create: true })
      : await directory.getFileHandle(name, { create: true });
    const note = await refreshAfterChange(pane, name);
    say(`Created ${name}.${note}`, !!note);
    if (!folder) await openEntry(pane, sourceEntry(handle, pane.folders));
  }

  async function copyEntry(handle, directory, name) {
    if (handle.kind === 'directory') {
      await assertAvailable(directory, name);
      const target = await directory.getDirectoryHandle(name, { create: true });
      for await (const child of handle.values()) await copyEntry(child, target, child.name);
    } else {
      const file = await handle.getFile();
      await assertAvailable(directory, name);
      const target = await directory.getFileHandle(name, { create: true });
      const writer = await target.createWritable({ mode: 'exclusive' });
      await file.stream().pipeTo(writer);
    }
  }

  async function copyThenRemove(pane, entry, target, name, remove, targetPane) {
    let copied = false;
    try {
      await copyEntry(entry.handle, target, name);
      copied = true;
      if (remove) await entry.parents.at(-1).removeEntry(entry.name, { recursive: entry.kind === 'directory' });
    } catch (err) {
      const note = await refreshAfterChange(pane);
      const prefix = copied ? 'Copied, but could not remove the original.' : 'Copy failed. Check the destination for a partial copy.';
      say(`${prefix} ${message(err)}${note}`, true);
      return;
    }
    const changedName = targetPane === pane ? name : remove ? null : entry.name;
    const note = await refreshAfterChange(pane, changedName, targetPane === pane ? undefined : name);
    const report = targetPane === pane ? `Renamed to ${name}.` : `${remove ? 'Moved' : 'Copied'} ${name} to the ${targetPane.side.toLowerCase()} folder.`;
    say(report + note, !!note);
  }

  async function renameEntry(pane, entry) {
    const directory = currentFolder(pane);
    const name = await ask({ title: 'Rename', description: `Rename “${entry.name}”.`, initial: entry.name, unchanged: entry.name, action: 'Rename', directory });
    if (name === null || name === entry.name) return;
    await copyThenRemove(pane, entry, directory, name, true, pane);
  }

  async function deleteEntry(pane, entry) {
    const description = entry.kind === 'directory'
      ? 'This folder and everything inside it will be deleted permanently.'
      : 'This file will be deleted permanently.';
    if (!await ask({ title: `Delete “${entry.name}”?`, description, action: 'Delete', danger: true })) return;
    await currentFolder(pane).removeEntry(entry.name, { recursive: entry.kind === 'directory' });
    const note = await refreshAfterChange(pane, null);
    say(`Deleted ${entry.name}.${note}`, !!note);
  }

  function copyName(entry) {
    const dot = entry.kind === 'file' ? entry.name.lastIndexOf('.') : -1;
    return dot > 0 ? `${entry.name.slice(0, dot)} (copy)${entry.name.slice(dot)}` : `${entry.name} (copy)`;
  }

  async function transfer(pane, entry, move) {
    const targetPane = otherPane(pane);
    const destination = currentFolder(targetPane);
    if (!destination) return;
    if (entry.kind === 'directory' && await entry.handle.resolve(destination) !== null) {
      throw new Error('Choose a destination outside the selected folder.');
    }
    if (move && await currentFolder(pane).isSameEntry(destination)) throw new Error('This item is already in the destination folder.');

    let name = entry.name;
    if (await exists(destination, name)) {
      name = await ask({
        title: 'Name already in use', description: `Choose a new name for “${entry.name}” in the ${targetPane.side.toLowerCase()} folder.`,
        initial: copyName(entry), action: 'Use this name', directory: destination
      });
      if (name === null) return;
    }
    say(`${move ? 'Moving' : 'Copying'} ${entry.name}…`);
    await copyThenRemove(pane, entry, destination, name, move, targetPane);
  }

  async function inspectFile(file) {
    const ext = extension(file.name);
    if (imageExtensions.has(ext) || (file.type.startsWith('image/') && ext !== 'svg' && file.type !== 'image/svg+xml')) return { mode: 'image' };
    const knownText = textExtensions.has(ext) || /^(text\/)|json|javascript|xml/.test(file.type);
    if (file.size > textLimit || (!knownText && file.size > 512 * 1024)) return { mode: 'other' };
    const bytes = new Uint8Array(await file.arrayBuffer());
    try {
      const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text)) return { mode: 'other' };
      const bom = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
      const crlf = /\r\n/.test(text) && !/[\r\n]/.test(text.replaceAll('\r\n', ''));
      return { mode: 'text', text, bom, crlf };
    } catch {
      return { mode: 'other' };
    }
  }

  async function openEntry(pane, entry) {
    if (entry.kind === 'directory') {
      await navigate(pane, [...entry.parents, entry.handle]);
      return;
    }
    const file = await entry.handle.getFile();
    const contents = await inspectFile(file);
    const preview = editor.querySelector('.sidecar-preview');
    openedFile = { entry, mode: contents.mode, pane, snapshot: file, contents, dirty: false };
    editor.querySelector('h2').textContent = entry.name;
    editor.querySelector('h2').title = entry.name;
    const path = editor.querySelector('[data-editor-path]');
    path.textContent = entry.parents.map(folder => folder.name).join(' / ');
    path.title = path.textContent;
    textarea.value = contents.text ?? '';
    openedFile.initial = textarea.value;
    textarea.hidden = contents.mode !== 'text';
    saveButton.hidden = contents.mode !== 'text';
    editorStatus.textContent = '';
    preview.replaceChildren();
    preview.hidden = contents.mode === 'text';
    if (contents.mode === 'image') {
      const image = new Image();
      openedFile.url = URL.createObjectURL(file);
      image.src = openedFile.url;
      image.alt = entry.name;
      image.addEventListener('error', () => { preview.textContent = 'This image could not be displayed.'; }, { once: true });
      preview.append(image);
    } else if (contents.mode === 'other') {
      preview.textContent = 'Preview is available for images and UTF-8 text files up to 8 MB.';
    }
    editor.showModal();
    if (contents.mode === 'text') textarea.focus();
  }

  async function saveEditor() {
    if (!openedFile?.dirty) return;
    try {
      const { entry, contents, snapshot } = openedFile;
      const current = await entry.handle.getFile();
      if (current.lastModified !== snapshot.lastModified || current.size !== snapshot.size ||
          (await inspectFile(current)).text !== contents.text) {
        throw new Error('This file changed on disk. Reopen it before saving.');
      }
      const value = textarea.value;
      const text = contents.crlf ? value.replaceAll('\n', '\r\n') : value;
      const writer = await entry.handle.createWritable({ mode: 'exclusive' });
      try {
        await writer.write((contents.bom ? '\ufeff' : '') + text);
        await writer.close();
      } catch (err) {
        await writer.abort().catch(() => {});
        throw err;
      }
      openedFile.initial = value;
      openedFile.dirty = false;
      openedFile.snapshot = await entry.handle.getFile();
      contents.text = text;
      editorStatus.textContent = 'Saved';
      const note = await refreshAfterChange(openedFile.pane);
      say(`Saved ${entry.name}.${note}`, !!note);
    } catch (err) {
      editorStatus.textContent = message(err);
    }
  }

  async function closeEditor() {
    if (!openedFile) return;
    if (openedFile.dirty && !await ask({
      title: 'Discard changes?', description: `“${openedFile.entry.name}” has unsaved changes.`, action: 'Discard', danger: true
    })) return;
    editor.close();
  }

  editor.addEventListener('close', () => {
    if (openedFile?.url) URL.revokeObjectURL(openedFile.url);
    openedFile = null;
    textarea.value = '';
    editor.querySelector('.sidecar-preview').replaceChildren();
  });
  editor.addEventListener('cancel', event => {
    event.preventDefault();
    run(closeEditor);
  });
  editor.querySelector('[data-editor-close]').addEventListener('click', () => run(closeEditor));
  saveButton.addEventListener('click', () => run(saveEditor));
  textarea.addEventListener('input', () => {
    openedFile.dirty = textarea.value !== openedFile.initial;
    editorStatus.textContent = openedFile.dirty ? 'Unsaved changes' : '';
    updateControls();
  });

  const help = dialog.querySelector('.sidecar-help');
  dialog.querySelector('[data-sidecar-help]').addEventListener('click', () => {
    if (!busy) help.showModal();
  });
  help.querySelector('[data-close]').addEventListener('click', () => help.close());

  function dispatch(pane, action) {
    const entry = pane.selected;
    switch (action) {
      case 'pick': return pickFolder(pane);
      case 'up': return navigate(pane, pane.folders.slice(0, -1));
      case 'refresh': return refresh(pane);
      case 'new-file': return createEntry(pane, false);
      case 'new-folder': return createEntry(pane, true);
      case 'open': return entry && openEntry(pane, entry);
      case 'show': return entry && navigate(pane, entry.parents, entry.name);
      case 'copy': return entry && transfer(pane, entry, false);
      case 'move': return entry && transfer(pane, entry, true);
      case 'rename': return entry && renameEntry(pane, entry);
      case 'delete': return entry && deleteEntry(pane, entry);
    }
  }

  function clearDrag() {
    drag = null;
    for (const pane of panes) pane.element.classList.remove('is-drop-target');
  }

  for (const pane of panes) {
    pane.element.addEventListener('focusin', () => { activePane = pane; });
    pane.element.addEventListener('pointerdown', () => { activePane = pane; });
    for (const [action, button] of Object.entries(pane.buttons)) {
      button.addEventListener('click', () => run(() => dispatch(pane, action)));
    }
    pane.search.addEventListener('input', () => updateSearch(pane));
    pane.sort.addEventListener('change', () => renderList(pane));
    pane.element.addEventListener('dragover', event => {
      if (busy || !drag || drag.pane === pane || !currentFolder(pane)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = event.shiftKey ? 'move' : 'copy';
      pane.element.classList.add('is-drop-target');
    });
    pane.element.addEventListener('dragleave', event => {
      if (!pane.element.contains(event.relatedTarget)) pane.element.classList.remove('is-drop-target');
    });
    pane.element.addEventListener('drop', event => {
      if (busy || !drag || drag.pane === pane || !currentFolder(pane)) return;
      event.preventDefault();
      const { pane: from, entry } = drag;
      clearDrag();
      run(() => transfer(from, entry, event.shiftKey));
    });
  }

  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (prompt.open || help.open || busy) return;
    const modified = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();
    if (editor.open) {
      if (modified && key === 's') {
        event.preventDefault();
        run(saveEditor);
      }
      return;
    }
    const pane = activePane || panes[0];
    if (modified && key === 'f' && currentFolder(pane)) {
      event.preventDefault();
      pane.search.focus();
      pane.search.select();
    } else if (pane.selected && !pane.results && !event.target.matches('input, textarea, select')) {
      if (key === 'f2' || key === 'delete') {
        event.preventDefault();
        run(() => dispatch(pane, key === 'f2' ? 'rename' : 'delete'));
      }
    }
  });
  window.addEventListener('beforeunload', event => {
    if (!openedFile?.dirty) return;
    event.preventDefault();
    event.returnValue = '';
  });

  closeButton.addEventListener('click', () => { if (!busy) dialog.close(); });
  dialog.addEventListener('cancel', event => {
    if (event.target === dialog && busy) event.preventDefault();
  });
  dialog.addEventListener('close', () => {
    clearDrag();
    if (opener?.isConnected) opener.focus();
  });

  dialog.querySelector('[data-sidecar-unavailable]').hidden = canPick;
  updateControls();
  window.YoutifySidecar = {
    open(from) {
      if (dialog.open) return;
      opener = from;
      dialog.showModal();
    }
  };
})();
