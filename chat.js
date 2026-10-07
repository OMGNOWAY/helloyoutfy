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
function threadId(a, b) { return [a, b].sort().join("_"); }

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
  state.people = {}; state.threads = {};
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
  trackSession(listenStats());
  if (!chatLoaded) setLoading(true, "loading chat…");

  hydrateProfile().then(pullFullStats);
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
  return dbfns.ref(db, `${ROOT}/typing/${scope}/${state.uid}`);
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
  state.unsubTyping = onValue(ref(db, `${ROOT}/typing/${scope}`), (snap) => {
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
  set(ref(db, `${ROOT}/reads/${threadId(state.uid, otherUid)}/${state.uid}`), ts)
    .catch((err) => console.error("[chat] read receipt failed", err));
}

function listenThreadReads(otherUid) {
  const { ref, onValue } = dbfns;
  if (state.unsubReads) { try { state.unsubReads(); } catch (e) {} state.unsubReads = null; }
  state.threadReads = {};
  state.unsubReads = onValue(ref(db, `${ROOT}/reads/${threadId(state.uid, otherUid)}`), (snap) => {
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
    Object.keys(state.threads || {}).forEach((uid) => {
      const seen = readStamp(readKey(uid));
      if (seen) publishRead(uid, seen);
    });
  } else {
    const { ref, remove } = dbfns;
    Object.keys(state.threads || {}).forEach((uid) => {
      remove(ref(db, `${ROOT}/reads/${threadId(state.uid, uid)}/${state.uid}`)).catch(() => {});
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
  const t = state.threads[uid];
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
  Object.entries(state.threads).forEach(([other, t]) => {
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
  try { dbfns.set(dbfns.ref(db, `${ROOT}/dmMeta/${tid}`), { k: newestKey || "", r: Date.now() }).catch(() => {}); }
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
    const snap = await get(query(ref(db, `${ROOT}/dm/${tp.tid}`), orderByKey(), endBefore(oldestKey), limitToLast(THREAD_PAGE)));
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
      const meta = await get(ref(db, `${ROOT}/dmMeta/${tid}`));
      const v = meta && meta.val();
      const young = Date.now() - (cached.savedAt || 0) < CACHE_MAX_AGE;
      fresh = !!(v && v.r && v.r === cached.rev && young);
    } catch (e) { fresh = false; }
  }
  if (threadPage !== tp) return;
  tp.fresh = fresh;

  // 3. listen
  const q = fresh
    ? query(ref(db, `${ROOT}/dm/${tid}`), orderByKey(), startAfter(cached.newestKey))
    : query(ref(db, `${ROOT}/dm/${tid}`), limitToLast(THREAD_PAGE));

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
      const mv = await dbfns.get(dbfns.ref(db, `${ROOT}/dmMeta/${tid}`));
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
  const entries = Object.entries(state.threads)
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
    const online = !!state.people[t.uid];
    const read = Number(localStorage.getItem(readKey(t.uid)) || 0);
    const unread = t.lastFrom !== state.uid && (t.lastTs || 0) > read;
    const nmStr = nameFor(t.uid, t.name);

    const row = document.createElement("div");
    row.className = "yc-row";
    row.onclick = () => openThread(t.uid, nmStr);

    const avWrap = document.createElement("span");
    avWrap.className = "yc-av-wrap";
    avWrap.appendChild(avatarEl(t.uid, nmStr));
    const ring = document.createElement("span");
    ring.className = "yc-ring" + (online ? "" : " off");
    avWrap.appendChild(ring);

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
    sub.textContent = (t.lastFrom === state.uid ? "you: " : "") + (t.lastText || "");
    main.append(nm, sub);

    const when = document.createElement("span");
    when.style.cssText = "color:var(--text-muted);font-size:11px;flex-shrink:0";
    when.textContent = shortTime(t.lastTs);

    row.append(avWrap, main, when);
    box.appendChild(row);
  });
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
  if (state.view === "thread" && v !== "thread" && v !== "profile" && state.unsubThread) {
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
    profile: "ycViewProfile"
  };
  Object.entries(map).forEach(([k, id]) => {
    const el = $(id); if (el) el.style.display = k === v ? "flex" : "none";
  });

  document.querySelectorAll(".yc-tab").forEach((t) => {
    const key = t.dataset.tab;
    t.classList.toggle("active", key === v || (v === "thread" && key === "dms") || (v === "profile" && key === "people"));
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
      const pushed = await push(ref(db, `${ROOT}/dm/${tid}`), payload);
      bumpThreadMeta(tid, pushed && pushed.key);   // tells other clients their cache is stale
      const preview = gif ? "GIF" : "📷 Picture";
      await update(ref(db, `${ROOT}/dmIndex/${state.uid}/${target.uid}`), {
        name: target.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
      });
      await update(ref(db, `${ROOT}/dmIndex/${target.uid}/${state.uid}`), {
        name: state.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
      });
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
    return `${ROOT}/dm/${threadId(state.uid, state.openThread.uid)}/${key}`;
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
      const t = state.threads[other];
      if (t && Math.abs((t.lastTs || 0) - (m.ts || 0)) < 1000) {
        const preview = text.slice(0, 60);
        await update(ref(db, `${ROOT}/dmIndex/${state.uid}/${other}`), { lastText: preview });
        await update(ref(db, `${ROOT}/dmIndex/${other}/${state.uid}`), { lastText: preview });
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

const YC_EMOJI_RAW = {"smileys": "😠 angry face|👿 angry face with horns|😧 anguished face|😰 anxious face with sweat|😲 astonished face|😁 beaming face with smiling eyes|🐱 cat face|😹 cat with tears of joy|😼 cat with wry smile|🤡 clown face|🥶 cold face|😖 confounded face|😕 confused face|🐮 cow face|🤠 cowboy hat face|🫫 cracking face|😿 crying cat|😢 crying face|😞 disappointed face|🥸 disguised face|🫪 distorted face|🐶 dog face|🫥 dotted line face|😓 downcast face with sweat|🐲 dragon face|🤤 drooling face|😡 enraged face|😑 expressionless face|😘 face blowing a kiss|😮‍💨 face exhaling|🥹 face holding back tears|😶‍🌫️ face in clouds|😋 face savoring food|😱 face screaming in fear|🤮 face vomiting|🫩 face with bags under eyes|😵 face with crossed-out eyes|🫤 face with diagonal mouth|🤭 face with hand over mouth|🤕 face with head-bandage|😷 face with medical mask|🧐 face with monocle|🫢 face with open eyes and hand over mouth|😮 face with open mouth|🫣 face with peeking eye|🤨 face with raised eyebrow|🙄 face with rolling eyes|😵‍💫 face with spiral eyes|😤 face with steam from nose|🤬 face with symbols on mouth|😂 face with tears of joy|🤒 face with thermometer|😛 face with tongue|😶 face without mouth|😨 fearful face|🌛 first quarter moon face|😳 flushed face|🙏 folded hands|☹️ frowning face|😦 frowning face with open mouth|🌝 full moon face|😬 grimacing face|😺 grinning cat|😸 grinning cat with smiling eyes|😀 grinning face|😃 grinning face with big eyes|😄 grinning face with smiling eyes|😅 grinning face with sweat|😆 grinning squinting face|🙂‍↔️ head shaking horizontally|🙂‍↕️ head shaking vertically|🙉 hear-no-evil monkey|🐴 horse face|🥵 hot face|😯 hushed face|😽 kissing cat|😗 kissing face|😚 kissing face with closed eyes|😙 kissing face with smiling eyes|🌜 last quarter moon face|😭 loudly crying face|🤥 lying face|🙇‍♂️ man bowing|🤦‍♂️ man facepalming|🙍‍♂️ man frowning|🙅‍♂️ man gesturing NO|🙆‍♂️ man gesturing OK|🙎‍♂️ man pouting|🙋‍♂️ man raising hand|🫠 melting face|🤑 money-mouth face|🐵 monkey face|🐭 mouse face|🤢 nauseated face|🤓 nerd face|😐 neutral face|🌚 new moon face|🥳 partying face|😔 pensive face|😣 persevering face|🙇 person bowing|🤦 person facepalming|🙍 person frowning|🙅 person gesturing NO|🙆 person gesturing OK|🙎 person pouting|🙋 person raising hand|🐷 pig face|🥺 pleading face|😾 pouting cat|🐰 rabbit face|🙌 raising hands|😌 relieved face|😥 sad but relieved face|🫡 saluting face|🙈 see-no-evil monkey|🫨 shaking face|🤫 shushing face|😴 sleeping face|😪 sleepy face|🙁 slightly frowning face|🙂 slightly smiling face|😻 smiling cat with heart-eyes|☺️ smiling face|😇 smiling face with halo|😍 smiling face with heart-eyes|🥰 smiling face with hearts|😈 smiling face with horns|🤗 smiling face with open hands|😊 smiling face with smiling eyes|😎 smiling face with sunglasses|🥲 smiling face with tear|😏 smirking face|🤧 sneezing face|🙊 speak-no-evil monkey|😝 squinting face with tongue|🌞 sun with face|🤔 thinking face|🐯 tiger face|😫 tired face|😒 unamused face|🙃 upside-down face|🙀 weary cat|😩 weary face|🌬️ wind face|😉 winking face|😜 winking face with tongue|🙇‍♀️ woman bowing|🤦‍♀️ woman facepalming|🙍‍♀️ woman frowning|🙅‍♀️ woman gesturing NO|🙆‍♀️ woman gesturing OK|🙎‍♀️ woman pouting|🙋‍♀️ woman raising hand|🥴 woozy face|😟 worried face|🥱 yawning face|🤪 zany face|🤐 zipper-mouth face", "people": "🇦🇲 Armenia|🇰🇾 Cayman Islands|🇩🇪 Germany|🇭🇲 Heard Island & McDonald Islands|🇮🇲 Isle of Man|👌 OK hand|🇴🇲 Oman|🇷🇴 Romania|🎅 Santa Claus|🇬🇧 United Kingdom|⏰ alarm clock|🏈 american football|🫀 anatomical heart|👶 baby|👼 baby angel|🍼 baby bottle|🐤 baby chick|🚼 baby symbol|👇 backhand index pointing down|👈 backhand index pointing left|👉 backhand index pointing right|👆 backhand index pointing up|🐻 bear|💓 beating heart|🖤 black heart|💙 blue heart|👦 boy|💔 broken heart|🤎 brown heart|🎯 bullseye|🤙 call me hand|👏 clapping hands|🍻 clinking beer mugs|🥂 clinking glasses|👷 construction worker|🍳 cooking|💑 couple with heart|👨‍❤️‍👨 couple with heart man man|👩‍❤️‍👨 couple with heart woman man|👩‍❤️‍👩 couple with heart woman woman|🤞 crossed fingers|🧏‍♂️ deaf man|🧏 deaf person|🧏‍♀️ deaf woman|👂 ear|🌽 ear of corn|🦻 ear with hearing aid|🧝 elf|👁️ eye|👁️‍🗨️ eye in speech bubble|👀 eyes|🧑‍🏭 factory worker|🧚 fairy|👪 family|🧑‍🧑‍🧒 family adult adult child|🧑‍🧑‍🧒‍🧒 family adult adult child child|🧑‍🧒 family adult child|🧑‍🧒‍🧒 family adult child child|👨‍👦 family man boy|👨‍👦‍👦 family man boy boy|👨‍👧 family man girl|👨‍👧‍👦 family man girl boy|👨‍👧‍👧 family man girl girl|👨‍👨‍👦 family man man boy|👨‍👨‍👦‍👦 family man man boy boy|👨‍👨‍👧 family man man girl|👨‍👨‍👧‍👦 family man man girl boy|👨‍👨‍👧‍👧 family man man girl girl|👨‍👩‍👦 family man woman boy|👨‍👩‍👦‍👦 family man woman boy boy|👨‍👩‍👧 family man woman girl|👨‍👩‍👧‍👦 family man woman girl boy|👨‍👩‍👧‍👧 family man woman girl girl|👩‍👦 family woman boy|👩‍👦‍👦 family woman boy boy|👩‍👧 family woman girl|👩‍👧‍👦 family woman girl boy|👩‍👧‍👧 family woman girl girl|👩‍👩‍👦 family woman woman boy|👩‍👩‍👦‍👦 family woman woman boy boy|👩‍👩‍👧 family woman woman girl|👩‍👩‍👧‍👦 family woman woman girl boy|👩‍👩‍👧‍👧 family woman woman girl girl|🧑‍🌾 farmer|🫆 fingerprint|🪭 folding hand fan|🦶 foot|👣 footprints|🐥 front-facing baby chick|⚙️ gear|🧞 genie|👧 girl|💚 green heart|🩶 grey heart|💗 growing heart|🖐️ hand with fingers splayed|🫰 hand with index finger and thumb crossed|👜 handbag|🤝 handshake|🧑‍⚕️ health worker|💟 heart decoration|❣️ heart exclamation|🫶 heart hands|❤️‍🔥 heart on fire|♥️ heart suit|💘 heart with arrow|💝 heart with ribbon|🥾 hiking boot|🪯 khanda|👨‍❤️‍💋‍👨 kiss man man|👩‍❤️‍💋‍👨 kiss woman man|👩‍❤️‍💋‍👩 kiss woman woman|🤛 left-facing fist|🫲 leftwards hand|🫷 leftwards pushing hand|🦵 leg|🩵 light blue heart|👨 man|👨‍🎨 man artist|👨‍🚀 man astronaut|👨‍🦲 man bald|🧔‍♂️ man beard|🚴‍♂️ man biking|👱‍♂️ man blond hair|⛹️‍♂️ man bouncing ball|🤸‍♂️ man cartwheeling|🧗‍♂️ man climbing|👷‍♂️ man construction worker|👨‍🍳 man cook|👨‍🦱 man curly hair|🕺 man dancing|🕵️‍♂️ man detective|🧝‍♂️ man elf|👨‍🏭 man factory worker|🧚‍♂️ man fairy|👨‍🌾 man farmer|👨‍🍼 man feeding baby|👨‍🚒 man firefighter|🧞‍♂️ man genie|💇‍♂️ man getting haircut|💆‍♂️ man getting massage|🏌️‍♂️ man golfing|💂‍♂️ man guard|👨‍⚕️ man health worker|🧘‍♂️ man in lotus position|👨‍🦽 man in manual wheelchair|👨‍🦽‍➡️ man in manual wheelchair facing right|👨‍🦼 man in motorized wheelchair|👨‍🦼‍➡️ man in motorized wheelchair facing right|🧖‍♂️ man in steamy room|🤵‍♂️ man in tuxedo|👨‍⚖️ man judge|🤹‍♂️ man juggling|🧎‍♂️ man kneeling|🧎‍♂️‍➡️ man kneeling facing right|🏋️‍♂️ man lifting weights|🧙‍♂️ man mage|👨‍🔧 man mechanic|🚵‍♂️ man mountain biking|👨‍💼 man office worker|👨‍✈️ man pilot|🤾‍♂️ man playing handball|🤽‍♂️ man playing water polo|👮‍♂️ man police officer|👨‍🦰 man red hair|🚣‍♂️ man rowing boat|🏃‍♂️ man running|🏃‍♂️‍➡️ man running facing right|👨‍🔬 man scientist|🤷‍♂️ man shrugging|👨‍🎤 man singer|🧍‍♂️ man standing|👨‍🎓 man student|🦸‍♂️ man superhero|🦹‍♂️ man supervillain|🏄‍♂️ man surfing|🏊‍♂️ man swimming|👨‍🏫 man teacher|👨‍💻 man technologist|💁‍♂️ man tipping hand|🧛‍♂️ man vampire|🚶‍♂️ man walking|🚶‍♂️‍➡️ man walking facing right|👳‍♂️ man wearing turban|👨‍🦳 man white hair|👰‍♂️ man with veil|👨‍🦯 man with white cane|👨‍🦯‍➡️ man with white cane facing right|🧟‍♂️ man zombie|🥭 mango|🕰️ mantelpiece clock|🦽 manual wheelchair|👞 man's shoe|🦾 mechanical arm|🦿 mechanical leg|👬 men holding hands|👯‍♂️ men with bunny ears|❤️‍🩹 mending heart|🧜‍♂️ merman|🧜 merperson|🖕 middle finger|🪍 net with handle|🚭 no smoking|👃 nose|🧑‍💼 office worker|👴 old man|👵 old woman|🧓 older person|👊 oncoming fist|🚔 oncoming police car|👐 open hands|🧡 orange heart|🫳 palm down hand|🌴 palm tree|🫴 palm up hand|🤲 palms up together|🍐 pear|🧑‍🤝‍🧑 people holding hands|🫂 people hugging|👯 people with bunny ears|🤼 people wrestling|🧑 person|🧑‍🦲 person bald|🧔 person beard|🚴 person biking|👱 person blond hair|⛹️ person bouncing ball|🤸 person cartwheeling|🧗 person climbing|🧑‍🦱 person curly hair|🧑‍🍼 person feeding baby|🤺 person fencing|💇 person getting haircut|💆 person getting massage|🏌️ person golfing|🛌 person in bed|🧘 person in lotus position|🧑‍🦽 person in manual wheelchair|🧑‍🦽‍➡️ person in manual wheelchair facing right|🧑‍🦼 person in motorized wheelchair|🧑‍🦼‍➡️ person in motorized wheelchair facing right|🧖 person in steamy room|🕴️ person in suit levitating|🤵 person in tuxedo|🤹 person juggling|🧎 person kneeling|🧎‍➡️ person kneeling facing right|🏋️ person lifting weights|🚵 person mountain biking|🤾 person playing handball|🤽 person playing water polo|🧑‍🦰 person red hair|🚣 person rowing boat|🏃 person running|🏃‍➡️ person running facing right|🤷 person shrugging|🧍 person standing|🏄 person surfing|🏊 person swimming|🛀 person taking bath|💁 person tipping hand|🚶 person walking|🚶‍➡️ person walking facing right|👳 person wearing turban|🧑‍🦳 person white hair|🫅 person with crown|👲 person with skullcap|👰 person with veil|🧑‍🦯 person with white cane|🧑‍🦯‍➡️ person with white cane facing right|🐽 pig nose|🤌 pinched fingers|🤏 pinching hand|🩷 pink heart|🐻‍❄️ polar bear|🚓 police car|🚨 police car light|👮 police officer|🍗 poultry leg|🫃 pregnant man|🫄 pregnant person|🤰 pregnant woman|💜 purple heart|🤚 raised back of hand|✊ raised fist|✋ raised hand|❤️ red heart|⛑️ rescue worker's helmet|💞 revolving hearts|🤜 right-facing fist|🫱 rightwards hand|🫸 rightwards pushing hand|🏉 rugby football|🤳 selfie|☃️ snowman|⛄ snowman without snow|💖 sparkling heart|🗣️ speaking head|🍵 teacup without handle|📆 tear-off calendar|🧸 teddy bear|👎 thumbs down|👍 thumbs up|👅 tongue|💕 two hearts|🧛 vampire|✌️ victory hand|👋 waving hand|☸️ wheel of dharma|🤍 white heart|👩 woman|👫 woman and man holding hands|👩‍🎨 woman artist|👩‍🚀 woman astronaut|👩‍🦲 woman bald|🧔‍♀️ woman beard|🚴‍♀️ woman biking|👱‍♀️ woman blond hair|⛹️‍♀️ woman bouncing ball|🤸‍♀️ woman cartwheeling|🧗‍♀️ woman climbing|👷‍♀️ woman construction worker|👩‍🍳 woman cook|👩‍🦱 woman curly hair|💃 woman dancing|🕵️‍♀️ woman detective|🧝‍♀️ woman elf|👩‍🏭 woman factory worker|🧚‍♀️ woman fairy|👩‍🌾 woman farmer|👩‍🍼 woman feeding baby|👩‍🚒 woman firefighter|🧞‍♀️ woman genie|💇‍♀️ woman getting haircut|💆‍♀️ woman getting massage|🏌️‍♀️ woman golfing|💂‍♀️ woman guard|👩‍⚕️ woman health worker|🧘‍♀️ woman in lotus position|👩‍🦽 woman in manual wheelchair|👩‍🦽‍➡️ woman in manual wheelchair facing right|👩‍🦼 woman in motorized wheelchair|👩‍🦼‍➡️ woman in motorized wheelchair facing right|🧖‍♀️ woman in steamy room|🤵‍♀️ woman in tuxedo|👩‍⚖️ woman judge|🤹‍♀️ woman juggling|🧎‍♀️ woman kneeling|🧎‍♀️‍➡️ woman kneeling facing right|🏋️‍♀️ woman lifting weights|🧙‍♀️ woman mage|👩‍🔧 woman mechanic|🚵‍♀️ woman mountain biking|👩‍💼 woman office worker|👩‍✈️ woman pilot|🤾‍♀️ woman playing handball|🤽‍♀️ woman playing water polo|👮‍♀️ woman police officer|👩‍🦰 woman red hair|🚣‍♀️ woman rowing boat|🏃‍♀️ woman running|🏃‍♀️‍➡️ woman running facing right|👩‍🔬 woman scientist|🤷‍♀️ woman shrugging|👩‍🎤 woman singer|🧍‍♀️ woman standing|👩‍🎓 woman student|🦸‍♀️ woman superhero|🦹‍♀️ woman supervillain|🏄‍♀️ woman surfing|🏊‍♀️ woman swimming|👩‍🏫 woman teacher|👩‍💻 woman technologist|💁‍♀️ woman tipping hand|🧛‍♀️ woman vampire|🚶‍♀️ woman walking|🚶‍♀️‍➡️ woman walking facing right|👳‍♀️ woman wearing turban|👩‍🦳 woman white hair|🧕 woman with headscarf|👰‍♀️ woman with veil|👩‍🦯 woman with white cane|👩‍🦯‍➡️ woman with white cane facing right|🧟‍♀️ woman zombie|👢 woman's boot|👚 woman's clothes|👒 woman's hat|👡 woman's sandal|👭 women holding hands|👯‍♀️ women with bunny ears|✍️ writing hand|💛 yellow heart|🧟 zombie", "nature": "🇧🇭 Bahrain|🎄 Christmas tree|🈸 Japanese application button|🇺🇦 Ukraine|🐦 bird|🐦‍⬛ black bird|🐈‍⬛ black cat|🐡 blowfish|🧠 brain|🍄‍🟫 brown mushroom|🐛 bug|🚅 bullet train|🌵 cactus|🎠 carousel horse|🐈 cat|☁️ cloud|🌩️ cloud with lightning|⛈️ cloud with lightning and rain|🌧️ cloud with rain|🌨️ cloud with snow|🖱️ computer mouse|🐄 cow|🌙 crescent moon|🍮 custard|🌳 deciduous tree|🐕 dog|🔯 dotted six-pointed star|🍆 eggplant|✴️ eight-pointed star|🌲 evergreen tree|🍂 fallen leaf|🫯 fight cloud|🔥 fire|🚒 fire engine|🧯 fire extinguisher|🧨 firecracker|🧑‍🚒 firefighter|🎆 fireworks|🌓 first quarter moon|🐟 fish|🍥 fish cake with swirl|🎣 fishing pole|🎴 flower playing cards|🍀 four leaf clover|🦊 fox|🐸 frog|🌕 full moon|🌎 globe showing Americas|🌏 globe showing Asia-Australia|🌍 globe showing Europe-Africa|🌐 globe with meridians|🌟 glowing star|🦮 guide dog|🌿 herb|🚄 high-speed train|🐎 horse|🏇 horse racing|🌭 hot dog|🪪 identification card|🪼 jellyfish|🌗 last quarter moon|🍃 leaf fluttering in wind|🪾 leafless tree|🥬 leafy green|🦁 lion|🍁 maple leaf|🐒 monkey|🥮 moon cake|🎑 moon viewing ceremony|🐁 mouse|🪤 mouse trap|🍄 mushroom|🌑 new moon|🌃 night with stars|🚱 non-potable water|🐧 penguin|🐖 pig|🚰 potable water|🪴 potted plant|🌈 rainbow|🐕‍🦺 service dog|🌠 shooting star|🏔️ snow-capped mountain|🏂 snowboarder|❄️ snowflake|🕷️ spider|🕸️ spider web|🐳 spouting whale|⭐ star|🤩 star-struck|☪️ star and crescent|✡️ star of David|☀️ sun|⛅ sun behind cloud|🌥️ sun behind large cloud|🌦️ sun behind rain cloud|🌤️ sun behind small cloud|🌻 sunflower|🕶️ sunglasses|🌅 sunrise|🌄 sunrise over mountains|🌇 sunset|🎋 tanabata tree|🐅 tiger|🚆 train|🐠 tropical fish|☔ umbrella with rain drops|🌘 waning crescent moon|🌖 waning gibbous moon|🐃 water buffalo|🚾 water closet|🔫 water pistol|🌊 water wave|🍉 watermelon|🌒 waxing crescent moon|🌔 waxing gibbous moon|🐋 whale|💮 white flower|🥀 wilted flower|🎐 wind chime|🪟 window|🐺 wolf", "food": "♑ Capricorn|🇬🇸 South Georgia & South Sandwich Islands|🇵🇲 St. Pierre & Miquelon|🥑 avocado|🥓 bacon|🥖 baguette bread|🍌 banana|🍺 beer mug|🫑 bell pepper|🎂 birthday cake|🍞 bread|🧋 bubble tea|🍬 candy|🥫 canned food|🥕 carrot|🧀 cheese wedge|🌸 cherry blossom|🍫 chocolate bar|🍸 cocktail glass|🥥 coconut|🍚 cooked rice|🍪 cookie|🧁 cupcake|🍛 curry rice|🥩 cut of meat|🍩 doughnut|🥚 egg|🫓 flatbread|🥠 fortune cookie|🍟 french fries|🥛 glass of milk|🍇 grapes|🍏 green apple|🥗 green salad|🍔 hamburger|🌶️ hot pepper|🍨 ice cream|🥝 kiwi fruit|🔶 large orange diamond|🍋 lemon|🍋‍🟩 lime|🍖 meat on bone|🍈 melon|🌌 milky way|🪺 nest with eggs|🩱 one-piece swimsuit|📙 orange book|🟠 orange circle|🟧 orange square|🥞 pancakes|🍑 peach|🥧 pie|🍍 pineapple|🍕 pizza|🍿 popcorn|🍲 pot of food|🥔 potato|🧩 puzzle piece|🍎 red apple|🍙 rice ball|🍘 rice cracker|🍠 roasted sweet potato|🥪 sandwich|🥘 shallow pan of food|🌾 sheaf of rice|🍰 shortcake|🔸 small orange diamond|🍦 soft ice cream|🍜 steaming bowl|🍓 strawberry|🥙 stuffed flatbread|🍣 sushi|🌮 taco|🧑‍🏫 teacher|🫖 teapot|🍅 tomato|🍹 tropical drink|🦄 unicorn|🧇 waffle|🍷 wine glass", "activities": "🥇 1st place medal|🥈 2nd place medal|🥉 3rd place medal|🇧🇳 Brunei|🇧🇮 Burundi|🇲🇶 Martinique|🇸🇽 Sint Maarten|🇧🇱 St. Barthélemy|🇲🇫 St. Martin|🎟️ admission tickets|🚛 articulated lorry|🧑‍🎨 artist|🎨 artist palette|🧑‍🩰 ballet dancer|🩰 ballet shoes|🎈 balloon|🗳️ ballot box with ballot|📊 bar chart|⚾ baseball|🏀 basketball|🎳 bowling|📷 camera|📸 camera with flash|📉 chart decreasing|📈 chart increasing|💹 chart increasing with yen|♟️ chess pawn|🎊 confetti ball|🏏 cricket game|🔮 crystal ball|🏬 department store|🥁 drum|🎞️ film frames|📽️ film projector|🎲 game die|🎸 guitar|🎧 headphone|⛸️ ice skate|🕹️ joystick|🪘 long drum|🥋 martial arts uniform|🎤 microphone|🎖️ military medal|🪩 mirror ball|🎥 movie camera|🎹 musical keyboard|🎵 musical note|🎶 musical notes|🎼 musical score|🛢️ oil drum|🖌️ paintbrush|〽️ part alternation mark|🎉 party popper|🛂 passport control|🎭 performing arts|🎱 pool 8 ball|🛼 roller skate|🎽 running shirt|👟 running shoe|🛹 skateboard|⛷️ skier|🎿 skis|⚽ soccer ball|🥎 softball|💬 speech balloon|🚙 sport utility vehicle|🏅 sports medal|🎙️ studio microphone|💭 thought balloon|🎫 ticket|🖲️ trackball|🏆 trophy|🎺 trumpet|📹 video camera|🎮 video game|📼 videocassette|🎻 violin|🏐 volleyball", "travel": "🇦🇨 Ascension Island|🇧🇻 Bouvet Island|🇻🇬 British Virgin Islands|🇮🇨 Canary Islands|🇧🇶 Caribbean Netherlands|🇨🇽 Christmas Island|🇨🇵 Clipperton Island|🇨🇨 Cocos (Keeling) Islands|🇨🇰 Cook Islands|🇫🇰 Falkland Islands|🇫🇴 Faroe Islands|🏯 Japanese castle|🈺 Japanese open for business button|🇲🇬 Madagascar|🇲🇭 Marshall Islands|🇳🇮 Nicaragua|🇳🇫 Norfolk Island|🇲🇵 Northern Mariana Islands|🇵🇳 Pitcairn Islands|🇸🇧 Solomon Islands|🗽 Statue of Liberty|🇹🇨 Turks & Caicos Islands|🇺🇲 U.S. Outlying Islands|🇻🇮 U.S. Virgin Islands|🇻🇦 Vatican City|🚡 aerial tramway|✈️ airplane|🛬 airplane arrival|🛫 airplane departure|🏖️ beach with umbrella|🚲 bicycle|🌉 bridge at night|🏗️ building construction|🚌 bus|🚏 bus stop|👤 bust in silhouette|👥 busts in silhouette|🗃️ card file box|📇 card index|🗂️ card index dividers|🎏 carp streamer|🪚 carpentry saw|🏰 castle|⛪ church|🎪 circus tent|🏙️ cityscape|🌆 cityscape at dusk|🏛️ classical building|💳 credit card|🚚 delivery truck|🏚️ derelict house|🏝️ desert island|⛲ fountain|🖋️ fountain pen|🚁 helicopter|🛕 hindu temple|🏨 hotel|🏠 house|🏡 house with garden|🏘️ houses|🛙 lighthouse|🏩 love hotel|🗾 map of Japan|🚇 metro|🚐 minibus|🕌 mosque|🛥️ motor boat|🛵 motor scooter|🏍️ motorcycle|🦼 motorized wheelchair|🛣️ motorway|⛰️ mountain|🚠 mountain cableway|🚞 mountain railway|🚳 no bicycles|🏢 office building|🚍 oncoming bus|🚖 oncoming taxi|🛳️ passenger ship|🛻 pickup truck|🪧 placard|🛐 place of worship|🏎️ racing car|🚃 railway car|🪐 ringed planet|🚀 rocket|⛵ sailboat|🧣 scarf|⛩️ shinto shrine|🚢 ship|🛒 shopping cart|🛩️ small airplane|🚤 speedboat|🏟️ stadium|🚉 station|🚕 taxi|⛺ tent|🚊 tram|🚋 tram car|🚎 trolleybus|🗺️ world map|🇦🇽 Åland Islands", "objects": "🇦🇫 Afghanistan|🇦🇱 Albania|🇩🇿 Algeria|🇦🇸 American Samoa|🇦🇩 Andorra|🇦🇴 Angola|🇦🇮 Anguilla|🇦🇶 Antarctica|🇦🇬 Antigua & Barbuda|♒ Aquarius|🇦🇷 Argentina|♈ Aries|🇦🇼 Aruba|🇦🇺 Australia|🇦🇹 Austria|🇦🇿 Azerbaijan|🇧🇸 Bahamas|🇧🇩 Bangladesh|🇧🇧 Barbados|🇧🇾 Belarus|🇧🇪 Belgium|🇧🇿 Belize|🇧🇯 Benin|🇧🇲 Bermuda|🇧🇹 Bhutan|🇧🇴 Bolivia|🇧🇦 Bosnia & Herzegovina|🇧🇼 Botswana|🇧🇷 Brazil|🇮🇴 British Indian Ocean Territory|🇧🇬 Bulgaria|🇧🇫 Burkina Faso|🇰🇭 Cambodia|🇨🇲 Cameroon|🇨🇦 Canada|♋ Cancer|🇨🇻 Cape Verde|🇨🇫 Central African Republic|🇪🇦 Ceuta & Melilla|🇹🇩 Chad|🇨🇱 Chile|🇨🇳 China|🇨🇴 Colombia|🇰🇲 Comoros|🇨🇬 Congo-Brazzaville|🇨🇩 Congo-Kinshasa|🇨🇷 Costa Rica|🇭🇷 Croatia|🇨🇺 Cuba|🇨🇼 Curaçao|🇨🇾 Cyprus|🇨🇿 Czechia|🇨🇮 Côte d'Ivoire|🇩🇰 Denmark|🇩🇬 Diego Garcia|🇩🇯 Djibouti|🇩🇲 Dominica|🇩🇴 Dominican Republic|🇪🇨 Ecuador|🇪🇬 Egypt|🇸🇻 El Salvador|🏴󠁧󠁢󠁥󠁮󠁧󠁿 England|🇬🇶 Equatorial Guinea|🇪🇷 Eritrea|🇪🇪 Estonia|🇸🇿 Eswatini|🇪🇹 Ethiopia|🇫🇯 Fiji|🇫🇮 Finland|🇫🇷 France|🇬🇫 French Guiana|🇵🇫 French Polynesia|🇹🇫 French Southern and Antarctic Lands|🇬🇦 Gabon|🇬🇲 Gambia|♊ Gemini|🇬🇪 Georgia|🇬🇭 Ghana|🇬🇮 Gibraltar|🇬🇷 Greece|🇬🇱 Greenland|🇬🇩 Grenada|🇬🇵 Guadeloupe|🇬🇺 Guam|🇬🇹 Guatemala|🇬🇬 Guernsey|🇬🇳 Guinea|🇬🇼 Guinea-Bissau|🇬🇾 Guyana|🇭🇹 Haiti|🇭🇳 Honduras|🇭🇰 Hong Kong SAR China|🇭🇺 Hungary|🇮🇸 Iceland|🇮🇳 India|🇮🇩 Indonesia|🇮🇷 Iran|🇮🇶 Iraq|🇮🇪 Ireland|🇮🇱 Israel|🇮🇹 Italy|🇯🇲 Jamaica|🇯🇵 Japan|🎎 Japanese dolls|🏣 Japanese post office|🇯🇪 Jersey|🇯🇴 Jordan|🇰🇿 Kazakhstan|🇰🇪 Kenya|🇰🇮 Kiribati|🇽🇰 Kosovo|🇰🇼 Kuwait|🇰🇬 Kyrgyzstan|🇱🇦 Laos|🇱🇻 Latvia|🇱🇧 Lebanon|♌ Leo|🇱🇸 Lesotho|🇱🇷 Liberia|♎ Libra|🇱🇾 Libya|🇱🇮 Liechtenstein|🇱🇹 Lithuania|🇱🇺 Luxembourg|🇲🇴 Macao SAR China|🇲🇼 Malawi|🇲🇾 Malaysia|🇲🇻 Maldives|🇲🇱 Mali|🇲🇹 Malta|🇲🇷 Mauritania|🇲🇺 Mauritius|🇾🇹 Mayotte|🇲🇽 Mexico|🇫🇲 Micronesia|🇲🇩 Moldova|🇲🇨 Monaco|🇲🇳 Mongolia|🇲🇪 Montenegro|🇲🇸 Montserrat|🇲🇦 Morocco|🇲🇿 Mozambique|🤶 Mrs. Claus|🧑‍🎄 Mx Claus|🇲🇲 Myanmar (Burma)|🇳🇦 Namibia|🇳🇷 Nauru|🇳🇵 Nepal|🇳🇱 Netherlands|🇳🇨 New Caledonia|🇳🇿 New Zealand|🇳🇪 Niger|🇳🇬 Nigeria|🇳🇺 Niue|🇰🇵 North Korea|🇲🇰 North Macedonia|🇳🇴 Norway|⛎ Ophiuchus|🇵🇰 Pakistan|🇵🇼 Palau|🇵🇸 Palestinian Territories|🇵🇦 Panama|🇵🇬 Papua New Guinea|🇵🇾 Paraguay|🇵🇪 Peru|🇵🇭 Philippines|♓ Pisces|🇵🇱 Poland|🇵🇹 Portugal|🇵🇷 Puerto Rico|🇶🇦 Qatar|🇷🇺 Russia|🇷🇼 Rwanda|🇷🇪 Réunion|♐ Sagittarius|🇼🇸 Samoa|🇸🇲 San Marino|🇨🇶 Sark|🇸🇦 Saudi Arabia|♏ Scorpio|🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland|🇸🇳 Senegal|🇷🇸 Serbia|🇸🇨 Seychelles|🇸🇱 Sierra Leone|🇸🇬 Singapore|🇸🇰 Slovakia|🇸🇮 Slovenia|🇸🇴 Somalia|🇿🇦 South Africa|🇰🇷 South Korea|🇸🇸 South Sudan|🇪🇸 Spain|🇱🇰 Sri Lanka|🇸🇭 St. Helena Ascension & Tristan da Cunha|🇰🇳 St. Kitts & Nevis|🇱🇨 St. Lucia|🇻🇨 St. Vincent & Grenadines|🇸🇩 Sudan|🇸🇷 Suriname|🇸🇪 Sweden|🇨🇭 Switzerland|🇸🇾 Syria|🇸🇹 São Tomé & Príncipe|🦖 T-Rex|🇹🇼 Taiwan|🇹🇯 Tajikistan|🇹🇿 Tanzania|♉ Taurus|🇹🇭 Thailand|🇹🇱 Timor-Leste|🇹🇬 Togo|🇹🇰 Tokelau|🗼 Tokyo tower|🇹🇴 Tonga|🇹🇹 Trinidad & Tobago|🇹🇦 Tristan da Cunha|🇹🇳 Tunisia|🇹🇲 Turkmenistan|🇹🇻 Tuvalu|🇹🇷 Türkiye|🇺🇬 Uganda|🇦🇪 United Arab Emirates|🇺🇳 United Nations|🇺🇸 United States|🇺🇾 Uruguay|🇺🇿 Uzbekistan|🇻🇺 Vanuatu|🇻🇪 Venezuela|🇻🇳 Vietnam|♍ Virgo|🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales|🇼🇫 Wallis & Futuna|🇪🇭 Western Sahara|🇾🇪 Yemen|💤 ZZZ|🇿🇲 Zambia|🇿🇼 Zimbabwe|🧮 abacus|🪗 accordion|🩹 adhesive bandage|⚗️ alembic|👽 alien|👾 alien monster|🚑 ambulance|🏺 amphora|⚓ anchor|🐜 ant|📶 antenna bars|🧑‍🚀 astronaut|🛺 auto rickshaw|🚗 automobile|🪓 axe|🎒 backpack|🦡 badger|🏸 badminton|🥯 bagel|🛄 baggage claim|⚖️ balance scale|🪕 banjo|🏦 bank|💈 barber pole|🧺 basket|🦇 bat|🛁 bathtub|🔋 battery|🫘 beans|🦫 beaver|🛏️ bed|🪲 beetle|🔔 bell|🔕 bell with slash|🛎️ bellhop bell|🍱 bento box|🧃 beverage box|👙 bikini|🧢 billed cap|☣️ biohazard|🦬 bison|🫦 biting lip|✒️ black nib|🌼 blossom|📘 blue book|🫐 blueberries|🐗 boar|💣 bomb|🦴 bone|🔖 bookmark|📑 bookmark tabs|📚 books|🪃 boomerang|🍾 bottle with popping cork|💐 bouquet|🥣 bowl with spoon|🥊 boxing glove|🤱 breast-feeding|🧱 brick|💼 briefcase|🩲 briefs|🥦 broccoli|⛓️‍💥 broken chain|🧹 broom|🫧 bubbles|🪣 bucket|🌯 burrito|🧈 butter|🦋 butterfly|📅 calendar|🐪 camel|🏕️ camping|🕯️ candle|🛶 canoe|⛓️ chains|🪑 chair|🍒 cherries|🌰 chestnut|🐔 chicken|🧒 child|🐿️ chipmunk|🥢 chopsticks|🚬 cigarette|🎦 cinema|🗜️ clamp|🎬 clapper board|📋 clipboard|📕 closed book|🌂 closed umbrella|♣️ club suit|👝 clutch bag|🧥 coat|🪳 cockroach|⚰️ coffin|🪙 coin|💥 collision|☄️ comet|🧭 compass|💽 computer disk|🚧 construction|🎛️ control knobs|🏪 convenience store|🧑‍🍳 cook|🪸 coral|🛋️ couch and lamp|🦀 crab|🖍️ crayon|🦗 cricket|🐊 crocodile|🥐 croissant|👑 crown|🩼 crutch|🥒 cucumber|🥤 cup with straw|🥌 curling stone|➰ curly loop|🛃 customs|🌀 cyclone|🗡️ dagger|🍡 dango|💨 dashing away|🦌 deer|🏜️ desert|🖥️ desktop computer|🕵️ detective|➗ divide|🤿 diving mask|🪔 diya lamp|💫 dizzy|🧬 dna|🦤 dodo|🐬 dolphin|🫏 donkey|🚪 door|➿ double curly loop|🕊️ dove|🐉 dragon|👗 dress|🩸 drop of blood|💧 droplet|🦆 duck|🥟 dumpling|📀 dvd|📧 e-mail|🦅 eagle|✳️ eight-spoked asterisk|🕣 eight-thirty|🕗 eight o'clock|🔌 electric plug|🐘 elephant|🛗 elevator|🕦 eleven-thirty|🕚 eleven o'clock|🪹 empty nest|✉️ envelope|🪌 eraser|🐑 ewe|🤯 exploding head|🏭 factory|🧆 falafel|📠 fax machine|🪶 feather|🎡 ferris wheel|⛴️ ferry|🏑 field hockey|🗄️ file cabinet|📁 file folder|🕠 five-thirty|🕔 five o'clock|🦩 flamingo|🔦 flashlight|🥿 flat shoe|⚜️ fleur-de-lis|💪 flexed biceps|💾 floppy disk|🪈 flute|🪰 fly|🥏 flying disc|🛸 flying saucer|🌫️ fog|🌁 foggy|🫕 fondue|🍴 fork and knife|🍽️ fork and knife with plate|🕟 four-thirty|🕓 four o'clock|🖼️ framed picture|🍤 fried shrimp|⛽ fuel pump|⚱️ funeral urn|🧄 garlic|💎 gem stone|👻 ghost|🫚 ginger root|🦒 giraffe|👓 glasses|🧤 gloves|🥅 goal net|🐐 goat|👺 goblin|🥽 goggles|🪿 goose|🦍 gorilla|🎓 graduation cap|📗 green book|💂 guard|🪮 hair pick|🫈 hairy creature|🔨 hammer|⚒️ hammer and pick|🛠️ hammer and wrench|🪬 hamsa|🐹 hamster|🪉 harp|🐣 hatching chick|🪦 headstone|🦔 hedgehog|🌺 hibiscus|👠 high-heeled shoe|⚡ high voltage|🦛 hippopotamus|🕳️ hole|🍯 honey pot|🐝 honeybee|🪝 hook|🚥 horizontal traffic light|🏥 hospital|☕ hot beverage|♨️ hot springs|⌛ hourglass done|⏳ hourglass not done|💯 hundred points|🛖 hut|🪻 hyacinth|🧊 ice|🏒 ice hockey|📥 inbox tray|📨 incoming envelope|🫵 index pointing at the viewer|☝️ index pointing up|♾️ infinity|ℹ️ information|🎃 jack-o-lantern|🫙 jar|👖 jeans|🃏 joker|🧑‍⚖️ judge|🕋 kaaba|🦘 kangaroo|🔑 key|⌨️ keyboard|#️⃣ keycap #|*️⃣ keycap *|0️⃣ keycap 0|1️⃣ keycap 1|🔟 keycap 10|2️⃣ keycap 2|3️⃣ keycap 3|4️⃣ keycap 4|5️⃣ keycap 5|6️⃣ keycap 6|7️⃣ keycap 7|8️⃣ keycap 8|9️⃣ keycap 9|🛴 kick scooter|👘 kimono|💏 kiss|💋 kiss mark|🔪 kitchen knife|🪁 kite|🪢 knot|🐨 koala|🥼 lab coat|🏷️ label|🪜 ladder|🐞 lady beetle|🛘 landslide|💻 laptop|📒 ledger|🛅 left luggage|🗨️ left speech bubble|🐆 leopard|🎚️ level slider|💡 light bulb|🚈 light rail|🔗 link|🖇️ linked paperclips|💄 lipstick|🦎 lizard|🦙 llama|🦞 lobster|🔒 locked|🔐 locked with key|🔏 locked with pen|🚂 locomotive|🍭 lollipop|🧴 lotion bottle|🪷 lotus|📢 loudspeaker|🤟 love-you gesture|🪫 low battery|🧳 luggage|🫁 lungs|🧙 mage|🪄 magic wand|🧲 magnet|🔍 magnifying glass tilted left|🔎 magnifying glass tilted right|🀄 mahjong red dragon|🦣 mammoth|🪇 maracas|🧉 mate|🧑‍🔧 mechanic|📣 megaphone|📝 memo|🤼‍♂️ men wrestling|🕎 menorah|🚹 men's room|🧜‍♀️ mermaid|🪋 meteor|🦠 microbe|🔬 microscope|🪖 military helmet|➖ minus|🪞 mirror|🗿 moai|📱 mobile phone|📴 mobile phone off|🫌 monarch butterfly|💰 money bag|💸 money with wings|🚝 monorail|🫎 moose|🦟 mosquito|🗻 mount fuji|👄 mouth|✖️ multiply|🔇 muted speaker|💅 nail polish|📛 name badge|🏞️ national park|🧿 nazar amulet|👔 necktie|🪆 nesting dolls|📰 newspaper|🕤 nine-thirty|🕘 nine o'clock|🥷 ninja|📓 notebook|📔 notebook with decorative cover|🔩 nut and bolt|🐙 octopus|🍢 oden|👹 ogre|🗝️ old key|🫒 olive|🕉️ om|🚘 oncoming automobile|🕜 one-thirty|🕐 one o'clock|🧅 onion|📖 open book|📂 open file folder|💿 optical disk|🦧 orangutan|🫍 orca|🦦 otter|📤 outbox tray|🦉 owl|🐂 ox|🦪 oyster|📦 package|📄 page facing up|📃 page with curl|📟 pager|🐼 panda|📎 paperclip|🪂 parachute|🦜 parrot|🐾 paw prints|🫛 pea pod|🦚 peacock|🥜 peanuts|🖊️ pen|✏️ pencil|🧫 petri dish|🐦‍🔥 phoenix|⛏️ pick|🫝 pickle|💩 pile of poo|💊 pill|🧑‍✈️ pilot|🎍 pine decoration|🏓 ping pong|🪅 piñata|🛝 playground slide|🪠 plunger|➕ plus|🐩 poodle|🏤 post office|📯 postal horn|📮 postbox|🫗 pouring liquid|📿 prayer beads|🥨 pretzel|🤴 prince|👸 princess|🖨️ printer|👛 purse|📌 pushpin|🐇 rabbit|🦝 raccoon|📻 radio|☢️ radioactive|🛤️ railway track|🐏 ram|🐀 rat|🪒 razor|🧾 receipt|🧧 red envelope|🏮 red paper lantern|🎗️ reminder ribbon|🚻 restroom|🦏 rhinoceros|🎀 ribbon|🗯️ right anger bubble|💍 ring|🛟 ring buoy|🤖 robot|🪨 rock|🧻 roll of paper|🗞️ rolled-up newspaper|🎢 roller coaster|🤣 rolling on the floor laughing|🐓 rooster|🫜 root vegetable|🌹 rose|🏵️ rosette|📍 round pushpin|🧷 safety pin|🦺 safety vest|🍶 sake|🧂 salt|🥻 sari|🛰️ satellite|📡 satellite antenna|🦕 sauropod|🎷 saxophone|🏫 school|🧑‍🔬 scientist|✂️ scissors|🦂 scorpion|🪛 screwdriver|📜 scroll|🦭 seal|💺 seat|🌱 seedling|🕢 seven-thirty|🕖 seven o'clock|🪡 sewing needle|☘️ shamrock|🦈 shark|🍧 shaved ice|🛡️ shield|🛍️ shopping bags|🩳 shorts|🪏 shovel|🚿 shower|🦐 shrimp|🧑‍🎤 singer|🕡 six-thirty|🕕 six o'clock|💀 skull|🦨 skunk|🛷 sled|🎰 slot machine|🦥 sloth|🐌 snail|🐍 snake|🧼 soap|🧦 socks|♠️ spade suit|🍝 spaghetti|❇️ sparkle|🎇 sparkler|✨ sparkles|🔊 speaker high volume|🔈 speaker low volume|🔉 speaker medium volume|🗓️ spiral calendar|🗒️ spiral notepad|🐚 spiral shell|🫟 splatter|🧽 sponge|🥄 spoon|🦑 squid|🩺 stethoscope|⏱️ stopwatch|📏 straight ruler|🧑‍🎓 student|🦸 superhero|🦹 supervillain|🚟 suspension railway|🦢 swan|💦 sweat droplets|🕍 synagogue|💉 syringe|👕 t-shirt|🥡 takeout box|🫔 tamale|🍊 tangerine|🧑‍💻 technologist|☎️ telephone|📞 telephone receiver|🔭 telescope|📺 television|🕥 ten-thirty|🕙 ten o'clock|🎾 tennis|🧪 test tube|🌡️ thermometer|🩴 thong sandal|🧵 thread|🕞 three-thirty|🕒 three o'clock|⏲️ timer clock|🚽 toilet|🧰 toolbox|🦷 tooth|🪥 toothbrush|🎩 top hat|🌪️ tornado|🚜 tractor|🪎 treasure chest|📐 triangular ruler|🔱 trident emblem|🧌 troll|🪊 trombone|🌷 tulip|🥃 tumbler glass|🦃 turkey|🐢 turtle|🕧 twelve-thirty|🕛 twelve o'clock|🐫 two-hump camel|🕝 two-thirty|🕑 two o'clock|☂️ umbrella|⛱️ umbrella on ground|🔓 unlocked|🚦 vertical traffic light|📳 vibration mode|🌋 volcano|🖖 vulcan salute|🗑️ wastebasket|⌚ watch|〰️ wavy dash|💒 wedding|🛞 wheel|🦯 white cane|🪽 wing|🛜 wireless|🤼‍♀️ women wrestling|🚺 women's room|🪵 wood|🪱 worm|🎁 wrapped gift|🔧 wrench|🩻 x-ray|🧶 yarn|☯️ yin yang|🪀 yo-yo|🦓 zebra", "symbols": "🆎 AB button (blood type)|🏧 ATM sign|🅰️ A button (blood type)|🔙 BACK arrow|🅱️ B button (blood type)|🆑 CL button|🆒 COOL button|🔚 END arrow|🇪🇺 European Union|🆓 FREE button|🆔 ID button|🉑 Japanese acceptable button|🉐 Japanese bargain button|㊗️ Japanese congratulations button|🈹 Japanese discount button|🈚 Japanese free of charge button|🈁 Japanese here button|🈷️ Japanese monthly amount button|🈵 Japanese no vacancy button|🈶 Japanese not free of charge button|🈴 Japanese passing grade button|🈲 Japanese prohibited button|🈯 Japanese reserved button|㊙️ Japanese secret button|🈂️ Japanese service charge button|🔰 Japanese symbol for beginner|🈳 Japanese vacancy button|🆕 NEW button|🆖 NG button|🆗 OK button|🔛 ON! arrow|🅾️ O button (blood type)|🅿️ P button|🔜 SOON arrow|🆘 SOS button|🇸🇯 Svalbard & Jan Mayen|🔝 TOP arrow|🆙 UP! button|🆚 VS button|💢 anger symbol|⚛️ atom symbol|⚫ black circle|⬛ black large square|◾ black medium-small square|◼️ black medium square|▪️ black small square|🔲 black square button|🔵 blue circle|🟦 blue square|🏹 bow and arrow|🔆 bright button|🟤 brown circle|🟫 brown square|☑️ check box with check|✔️ check mark|✅ check mark button|🚸 children crossing|Ⓜ️ circled M|🔃 clockwise vertical arrows|©️ copyright|🔄 counterclockwise arrows button|❌ cross mark|❎ cross mark button|⚔️ crossed swords|💱 currency exchange|♦️ diamond suit|💠 diamond with a dot|🔅 dim button|💵 dollar banknote|‼️ double exclamation mark|↙️ down-left arrow|↘️ down-right arrow|⬇️ down arrow|🔽 downwards button|⏏️ eject button|📩 envelope with arrow|💶 euro banknote|⁉️ exclamation question mark|⏩ fast-forward button|⏬ fast down button|⏪ fast reverse button|⏫ fast up button|♀️ female sign|🟢 green circle|🟩 green square|💲 heavy dollar sign|🟰 heavy equals sign|⭕ hollow red circle|🔤 input latin letters|🔡 input latin lowercase|🔠 input latin uppercase|🔢 input numbers|🔣 input symbols|🥍 lacrosse|🔷 large blue diamond|⏮️ last track button|✝️ latin cross|↔️ left-right arrow|⬅️ left arrow|↪️ left arrow curving right|🫹 leftwards thumb sign|🚮 litter in bin sign|💌 love letter|♂️ male sign|⚕️ medical symbol|📲 mobile phone with arrow|⏭️ next track button|⛔ no entry|🚯 no littering|📵 no mobile phones|🔞 no one under eighteen|🚷 no pedestrians|☦️ orthodox cross|⏸️ pause button|☮️ peace symbol|▶️ play button|⏯️ play or pause button|💷 pound banknote|🚫 prohibited|🟣 purple circle|🟪 purple square|🔘 radio button|⏺️ record button|♻️ recycling symbol|🔴 red circle|❗ red exclamation mark|❓ red question mark|🟥 red square|🔻 red triangle pointed down|🔺 red triangle pointed up|®️ registered|🔁 repeat button|🔂 repeat single button|◀️ reverse button|➡️ right arrow|⤵️ right arrow curving down|↩️ right arrow curving left|⤴️ right arrow curving up|🫺 rightwards thumb sign|🔀 shuffle tracks button|🤘 sign of the horns|☠️ skull and crossbones|🔹 small blue diamond|⏹️ stop button|🛑 stop sign|™️ trade mark|⚧️ transgender symbol|↕️ up-down arrow|↖️ up-left arrow|↗️ up-right arrow|⬆️ up arrow|🔼 upwards button|⚠️ warning|♿ wheelchair symbol|⚪ white circle|❕ white exclamation mark|⬜ white large square|◽ white medium-small square|◻️ white medium square|❔ white question mark|▫️ white small square|🔳 white square button|🟡 yellow circle|🟨 yellow square|💴 yen banknote", "flags": "🏴 black flag|🏁 chequered flag|📪 closed mailbox with lowered flag|📫 closed mailbox with raised flag|🎌 crossed flags|⛳ flag in hole|📭 open mailbox with lowered flag|📬 open mailbox with raised flag|🏴‍☠️ pirate flag|🏳️‍🌈 rainbow flag|🏳️‍⚧️ transgender flag|🚩 triangular flag|🏳️ white flag"};

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
  const inDm = state.view === "thread" && state.openThread && state.openThread.uid;

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
      const pushed = await push(ref(db, `${ROOT}/dm/${tid}`), payload);
      bumpThreadMeta(tid, pushed && pushed.key);   // tells other clients their cache is stale
      const preview = text.slice(0, 60);
      await update(ref(db, `${ROOT}/dmIndex/${state.uid}/${other}`), {
        name: state.openThread.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
      });
      await update(ref(db, `${ROOT}/dmIndex/${other}/${state.uid}`), {
        name: state.name, lastText: preview, lastTs: payload.ts, lastFrom: state.uid
      });
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
  ["yc_name", "yc_uid", "yc_pfp", "yc_bio"].forEach((k) => {
    try { localStorage.removeItem(k); } catch (e) {}
  });
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
</script>

<script>
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