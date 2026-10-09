/* ===================== config.js ===================== */
/* config.js — loaded on every page load (before login), so keep secrets OUT of here.
   Firebase web config values are public by design; what protects your data is your
   Realtime Database rules, not hiding these. */
window.YOUTIFY_CHAT_CONFIG = {
    apiKey: "AIzaSyBkgs-8vgQYIT1N1wteHjl0-0Y2bcmftz0",
    authDomain: "youtify-server-2.firebaseapp.com",
    projectId: "youtify-server-2",
    storageBucket: "youtify-server-2.firebasestorage.app",
    messagingSenderId: "400559221389",
    appId: "1:400559221389:web:7d84a40530d1e10cb350c4",
    measurementId: "G-19V0GRZXFC",
    databaseURL: "https://youtify-server-2-default-rtdb.firebaseio.com"
  };

/* Change this if you ever want a fresh/separate chat (e.g. "youtify-v2"). */
window.YOUTIFY_CHAT_ROOT = "youtify";

/* Login gate settings */
window.YOUTIFY_GATE = {
  /* where the app is loaded from AFTER login (nothing below is in the page before that) */
  appHtml: "https://cdn.jsdelivr.net/gh/OMGNOWAY/helloyoutfy/app.html",
  appJs:   "https://cdn.jsdelivr.net/gh/OMGNOWAY/helloyoutfy/app-main.js",
  libs: [
    "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  ],
  /* false = invite-only look: the gate only shows "log in", no "create account".
     NOTE: this only hides the button. Anyone can still call Firebase's signup API
     directly with the public apiKey — to truly block signups, see the rules notes. */
  signupsOpen: false
};

/* ===================== gate.js (login wall) ===================== */
(function () {
'use strict';
/* gate.js — login wall. Nothing from the app (markup, CSS, JS) is loaded
   until Firebase says you're signed in. Uses the SAME accounts as the chat
   (username@users.youtify.chat), so existing users just log in. */

const CFG  = window.YOUTIFY_CHAT_CONFIG || {};
const ROOT = window.YOUTIFY_CHAT_ROOT || "youtify";
const G    = window.YOUTIFY_GATE || {};
const FB   = "https://www.gstatic.com/firebasejs/10.12.5/";
const $    = (id) => document.getElementById(id);

let auth, db, authfns, dbfns;
let launched = false;   // app code has been loaded
let busy = false;       // a login/signup is in flight (ignore auth observer)
let mode = "login";     // "login" | "signup"

/* ---------- helpers (match the chat's account scheme) ---------- */
function usernameKey(raw) {
  return (raw || "").trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "").slice(0, 24);
}
function pseudoEmail(key) { return key + "@users.youtify.chat"; }
function localUid() {
  let u = localStorage.getItem("yc_uid");
  if (!u) { u = "u" + Math.random().toString(36).slice(2, 10); localStorage.setItem("yc_uid", u); }
  return u;
}
function authErrorMessage(err) {
  const code = err && err.code;
  if (code === "auth/email-already-in-use") return "that name's already taken — try logging in, or pick another";
  if (code === "auth/wrong-password" || code === "auth/invalid-credential" || code === "auth/invalid-login-credentials") return "wrong username or password";
  if (code === "auth/user-not-found") return "no account with that name — check the spelling";
  if (code === "auth/weak-password") return "password needs to be at least 6 characters";
  if (code === "auth/too-many-requests") return "too many tries — wait a bit and try again";
  if (code === "auth/network-request-failed") return "couldn't reach the server — check your connection";
  if (code === "auth/operation-not-allowed") return "login isn't turned on — enable Email/Password sign-in in Firebase";
  if (code === "auth/invalid-email") return "that name has characters that won't work — try letters and numbers";
  return "something went wrong — try again";
}
const setNote = (t) => { const n = $("gNote"); if (n) n.textContent = t || ""; };

/* ---------- UI ---------- */
function showLoading(text) {
  $("gForm").hidden = true;
  const l = $("gLoading"); l.hidden = false; l.textContent = text || "connecting…";
}
function showForm(m) {
  mode = (m === "signup" && G.signupsOpen) ? "signup" : "login";
  $("gLoading").hidden = true;
  $("gForm").hidden = false;
  const signup = mode === "signup";
  $("gTitle").textContent = signup ? "Create account" : "Log in";
  $("gSub").textContent = signup
    ? "Pick a username and password."
    : (G.signupsOpen ? "Log in with your Youtify chat account." : "Youtify is invite-only. Log in with your account.");
  $("gPass2").hidden = !signup;
  $("gPass").autocomplete = signup ? "new-password" : "current-password";
  $("gSubmit").textContent = signup ? "Create account" : "Log in";
  $("gSubmit").disabled = false;
  const sw = $("gSwitch");
  sw.hidden = !G.signupsOpen;
  sw.textContent = signup ? "Already have an account? Log in" : "New here? Create an account";
  setNote("");
}

/* ---------- boot ---------- */
async function boot() {
  if (!CFG.databaseURL || String(CFG.databaseURL).includes("PASTE")) {
    showLoading("login isn't configured (config.js)");
    return;
  }
  try {
    const appMod = await import(FB + "firebase-app.js");
    dbfns   = await import(FB + "firebase-database.js");
    authfns = await import(FB + "firebase-auth.js");
    const app = appMod.initializeApp(CFG, "youtify-chat");   // same name the chat uses
    db   = dbfns.getDatabase(app);
    auth = authfns.getAuth(app);
  } catch (e) {
    console.error("[gate] firebase load failed", e);
    showLoading("couldn't reach Firebase — refresh to try again");
    return;
  }

  authfns.onAuthStateChanged(auth, (user) => {
    if (launched) { if (!user) location.reload(); return; }   // logged out from inside the app
    if (busy) return;                                          // login/signup handler will launch
    if (user && localStorage.getItem("yc_name")) { launch(); return; }
    if (user) { authfns.signOut(auth).catch(() => {}); return; }   // signed in but no chat name -> start clean
    showForm("login");
    const n = localStorage.getItem("yc_name"); if (n) $("gName").value = n;
  });
}

/* ---------- submit ---------- */
async function submit(ev) {
  ev.preventDefault();
  if (busy || !auth) return;

  const rawName = ($("gName").value || "").trim().slice(0, 24);
  const key = usernameKey(rawName);
  const pass = $("gPass").value || "";
  const pass2 = $("gPass2").value || "";

  if (!key) { setNote("enter your username"); return; }
  if (pass.length < 6) { setNote("password needs to be at least 6 characters"); return; }
  if (mode === "signup" && !G.signupsOpen) { setNote("signups are closed"); return; }
  if (mode === "signup" && pass !== pass2) { setNote("passwords don't match"); return; }

  busy = true;
  $("gSubmit").disabled = true;
  setNote(mode === "login" ? "logging in…" : "setting up…");

  const { ref, get, set } = dbfns;
  try {
    let uid = localUid(), name = rawName;

    if (mode === "login") {
      await authfns.signInWithEmailAndPassword(auth, pseudoEmail(key), pass);
      const rec = (await get(ref(db, `${ROOT}/usernames/${key}`))).val();
      if (rec && rec.uid) { uid = rec.uid; name = rec.name || rawName; }
      localStorage.setItem("yc_uid", uid);
      localStorage.setItem("yc_name", name);
      try {                                   // re-assert chat uid -> auth uid link (same as chat does)
        const authUid = auth.currentUser && auth.currentUser.uid;
        if (authUid) {
          const linkRef = ref(db, `${ROOT}/accountLinks/${uid}`);
          if ((await get(linkRef)).val() !== authUid) await set(linkRef, authUid);
        }
      } catch (e) { console.warn("[gate] couldn't refresh account link", e); }
    } else {
      if ((await get(ref(db, `${ROOT}/usernames/${key}`))).exists()) {
        setNote(`"${key}" is already registered — log in instead`);
        busy = false; $("gSubmit").disabled = false; return;
      }
      try {                                   // one account per browser, same rule as the chat
        if ((await get(ref(db, `${ROOT}/accountLinks/${uid}`))).exists()) {
          setNote("this browser already has an account — log in to it");
          busy = false; $("gSubmit").disabled = false; return;
        }
      } catch (e) { /* can't tell — don't lock people out */ }

      const cred = await authfns.createUserWithEmailAndPassword(auth, pseudoEmail(key), pass);
      localStorage.setItem("yc_uid", uid);
      localStorage.setItem("yc_name", name);
      await set(ref(db, `${ROOT}/usernames/${key}`), { uid, name, authUid: cred.user.uid, ts: Date.now() });
      await set(ref(db, `${ROOT}/accountLinks/${uid}`), cred.user.uid);
    }

    $("gPass").value = ""; $("gPass2").value = "";
    busy = false;
    launch();
  } catch (err) {
    console.error("[gate]", err);
    busy = false;
    $("gSubmit").disabled = false;
    setNote(authErrorMessage(err));
  }
}

/* ---------- let the user into the app (everything is already loaded) ---------- */
function launch() {
  if (launched) return;
  launched = true;
  loadApp();
}

/* ---------- nothing from the app exists until this runs ----------
   1. fetch the app markup (app.html)      -> put it in the page
   2. load the libraries + app-main.js     -> the app code
   3. replay DOMContentLoaded / load       -> the app code was loaded late, so its
                                              startup listeners would otherwise never fire
   4. remove the login screen                                                       */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("failed to load " + src));
    document.head.appendChild(s);
  });
}
async function loadApp() {
  showLoading("loading…");
  try {
    const res = await fetch(G.appHtml, { cache: "no-cache" });
    if (!res.ok) throw new Error("app.html " + res.status);
    const html = await res.text();
    const t = document.createElement("template");
    t.innerHTML = html;
    document.body.appendChild(t.content);

    for (const lib of (G.libs || [])) { try { await loadScript(lib); } catch (e) { console.warn("[gate]", e.message); } }
    await loadScript(G.appJs);

    document.dispatchEvent(new Event("DOMContentLoaded"));
    window.dispatchEvent(new Event("load"));

    const el = $("gate");
    if (el) el.remove();
  } catch (err) {
    console.error("[gate] couldn't load the app", err);
    launched = false;
    showLoading("couldn't load the app — refresh to try again");
  }
}

$("gForm").addEventListener("submit", submit);
$("gSwitch").addEventListener("click", () => showForm(mode === "login" ? "signup" : "login"));
boot();
})();
