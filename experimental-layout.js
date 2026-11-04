/* Experimental Studio layout — opt-in UI layer, never replaces the music engine. */
(function () {
  'use strict';

  const STORAGE_KEY = 'youtify_experimental_layout';
  const source = document.currentScript && document.currentScript.src;
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet';
  sheet.id = 'experimentalStudioStyles';
  sheet.href = new URL('experimental-layout.css', source || window.YOUTIFY_GATE?.appJs || location.href).href;
  document.head.appendChild(sheet);

  const get = (id) => document.getElementById(id);
  const isEnabled = () => document.body.classList.contains('experimental-layout');

  function remember(enabled) {
    try { localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off'); } catch (_) {}
  }

  function syncToggle() {
    const button = get('experimentalLayoutBtn');
    if (!button) return;
    button.setAttribute('aria-checked', String(isEnabled()));
    const status = get('experimentalLayoutStatus');
    if (status) status.textContent = isEnabled() ? 'On — Studio' : 'Off — Classic';
  }

  function setEnabled(enabled, persist = true) {
    const home = get('homeView');
    const hero = home?.querySelector('.ios-home-hero');
    const feature = home?.querySelector('.exp-feature-grid');
    // Reparent the real now-playing hero only while Studio is enabled.
    // Classic mode gets its original direct-child markup back.
    if (feature && hero) {
      if (enabled && hero.parentNode !== feature) feature.appendChild(hero);
      if (!enabled && hero.parentNode === feature) feature.parentNode.insertBefore(hero, feature);
    }
    const library = home?.querySelector('.exp-library-grid');
    const queue = home?.querySelector('.queue-container');
    const lyricHost = home?.querySelector('.exp-lyrics-card-content');
    const embed = get('playerEmbed');
    const player = get('player');
    if (enabled) {
      if (library && queue && queue.parentNode !== library) {
        library.insertBefore(queue, library.querySelector('.exp-lyrics-card'));
      }
      if (lyricHost && embed && embed.parentNode !== lyricHost) lyricHost.appendChild(embed);
    } else {
      if (library && queue && queue.parentNode === library) library.parentNode.insertBefore(queue, library);
      if (lyricHost && embed && player && embed.parentNode === lyricHost) {
        const right = player.querySelector('.player-right');
        if (right) player.insertBefore(embed, right);
        else player.appendChild(embed);
      }
    }
    document.body.classList.toggle('experimental-layout', Boolean(enabled));
    if (persist) remember(Boolean(enabled));
    syncToggle();
  }

  function addSettingsControl() {
    if (get('experimentalLayoutBtn')) return;
    const sections = Array.from(document.querySelectorAll('#settingsModal .settings-section'));
    const misc = sections.find((section) => section.querySelector('.settings-section-title')?.textContent.trim() === 'Misc');
    if (!misc) return;

    const row = document.createElement('div');
    row.className = 'setting-toggle-row experimental-settings-row';
    row.innerHTML = `
      <span class="exp-setting-copy">
        <span class="setting-toggle-label">Experimental Studio Layout <span class="exp-beta-mark">BETA</span></span>
        <span class="exp-setting-description">A completely different interface. Your music, themes and settings are kept.</span>
        <span class="exp-setting-status" id="experimentalLayoutStatus">Off — Classic</span>
      </span>
      <button class="toggle-slider" id="experimentalLayoutBtn" type="button"
        role="switch" aria-label="Experimental Studio Layout" aria-checked="false">
        <span class="slider-thumb"></span>
      </button>`;
    (misc.querySelector('.form-group') || misc).appendChild(row);
    get('experimentalLayoutBtn').addEventListener('click', () => setEnabled(!isEnabled()));
    syncToggle();
  }

  function buildStudio() {
    const app = get('app');
    const main = get('mainContent');
    const home = get('homeView');
    const hero = home?.querySelector('.ios-home-hero');
    if (!app || !main || !home || !hero || get('experimentalStudioHeader')) return false;

    const header = document.createElement('header');
    header.id = 'experimentalStudioHeader';
    header.className = 'exp-studio-header';
    header.innerHTML = `
      <div class="exp-header-brand">
        <span class="exp-led" aria-hidden="true"></span>
        <span class="exp-overline">YOUTIFIY / STUDIO 001</span>
        <span class="exp-header-rule" aria-hidden="true"></span>
        <span class="exp-header-section" id="expHeaderSection">LIBRARY</span>
      </div>
      <div class="exp-header-tools">
        <span class="exp-header-online"><span aria-hidden="true">●</span> YOUR PERSONAL SPACE</span>
        <button type="button" class="exp-head-btn" onclick="openFolderPicker()" title="Import your music">+ ADD MUSIC</button>
        <button type="button" class="exp-head-btn exp-head-settings" onclick="openSettings()" title="Open settings" aria-label="Open settings">⚙</button>
      </div>`;
    main.insertBefore(header, main.firstChild);

    const feature = document.createElement('div');
    feature.className = 'exp-feature-grid';
    feature.innerHTML = `
      <section class="exp-editorial" aria-label="Music library">
        <div class="exp-editorial-label"><span class="exp-lime-dot"></span> YOUR OWN FREQUENCY <span>— 001</span></div>
        <h1>PLAY IT<br><span>YOUR WAY.</span></h1>
        <p>No distractions. Just the music you came for.</p>
        <div class="exp-editorial-actions">
          <button type="button" class="exp-action-main" onclick="togglePlay()">▶ <span>PLAY / PAUSE</span></button>
          <button type="button" class="exp-action-quiet" onclick="shuffleQueue()">⤨ <span>SHUFFLE LIBRARY</span></button>
        </div>
        <div class="exp-editorial-footer"><span>01 / LISTEN</span><span>YOUR LIBRARY, REIMAGINED</span></div>
      </section>`;
    hero.parentNode.insertBefore(feature, hero);


    // Reuse the live lyrics / EQ / queue embed beside the music collection.
    const queue = home.querySelector('.queue-container');
    if (queue) {
      const library = document.createElement('div');
      library.className = 'exp-library-grid';
      library.innerHTML = '<aside class="exp-lyrics-card" aria-label="Live lyrics and audio controls"><div class="exp-lyrics-card-head"><span>03 / LIVE STATION</span><span>LYRICS · EQ · UP NEXT</span></div><div class="exp-lyrics-card-content"></div></aside>';
      queue.parentNode.insertBefore(library, queue);
    }

    const sidebar = get('sidebar');
    if (sidebar) {
      const foot = document.createElement('div');
      foot.className = 'exp-sidebar-foot';
      foot.innerHTML = '<span class="exp-sidebar-foot-no">01 / STUDIO</span><span>ANOTHER WAY<br>TO LISTEN.</span><span class="exp-sidebar-foot-line" aria-hidden="true"></span>';
      sidebar.appendChild(foot);
    }

    const queueTitle = home.querySelector('.queue-title');
    if (queueTitle && !get('expQueueEyebrow')) {
      const label = document.createElement('span');
      label.id = 'expQueueEyebrow';
      label.className = 'exp-queue-eyebrow';
      label.textContent = '02 / YOUR COLLECTION';
      queueTitle.parentNode.insertBefore(label, queueTitle);
    }

    document.querySelectorAll('#sidebar .nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        const text = item.querySelector('.nav-text')?.textContent?.trim();
        const section = get('expHeaderSection');
        if (section && text) section.textContent = text.toUpperCase();
      });
    });
    return true;
  }

  function init() {
    if (!buildStudio()) return;
    addSettingsControl();
    let saved = false;
    try { saved = localStorage.getItem(STORAGE_KEY) === 'on'; } catch (_) {}
    setEnabled(saved, false);
  }

  window.ExperimentalStudioLayout = { enable: () => setEnabled(true), disable: () => setEnabled(false), toggle: () => setEnabled(!isEnabled()), isEnabled };
  if (get('app')) init();
  else document.addEventListener('DOMContentLoaded', init, { once: true });
})();