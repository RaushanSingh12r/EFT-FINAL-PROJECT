// SignBridge demo authentication (front-end only).
// Accounts live in this browser's localStorage. There is no server, so do NOT use real passwords.
(function () {
  "use strict";
  const USERS = "sb_users", SESSION = "sb_session";
  const t = (k) => (window.SB_I18N ? SB_I18N.t(k) : k);

  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; } }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  async function hash(text) {
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("signbridge:" + text));
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    let h = 5381; for (const c of "signbridge:" + text) h = ((h << 5) + h + c.charCodeAt(0)) | 0; // fallback
    return "x" + h;
  }

  async function seedAdmin() {
    const users = read(USERS, []);
    if (!users.some((u) => u.role === "admin")) {
      users.push({ name: "Admin", email: "admin@signbridge.com", hash: await hash("admin123"), role: "admin", created: Date.now() });
      write(USERS, users);
    }
  }

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  async function signup(name, email, pw, confirm) {
    await seedAdmin();
    name = (name || "").trim(); email = (email || "").trim().toLowerCase();
    if (!name || !email || !pw || !confirm) return { err: "err_required" };
    if (!validEmail(email)) return { err: "err_email" };
    if (pw.length < 6) return { err: "err_short" };
    if (pw !== confirm) return { err: "err_match" };
    const users = read(USERS, []);
    if (users.some((u) => u.email === email)) return { err: "err_exists" };
    const user = { name, email, hash: await hash(pw), role: "user", created: Date.now() };
    users.push(user); write(USERS, users);
    write(SESSION, { email, name, role: "user" });
    return { ok: true, role: "user" };
  }

  async function login(email, pw, role) {
    await seedAdmin();
    email = (email || "").trim().toLowerCase();
    if (!email || !pw) return { err: "err_required" };
    const u = read(USERS, []).find((x) => x.email === email);
    if (!u || u.hash !== (await hash(pw))) return { err: "err_bad" };
    if (u.role !== role) return { err: "err_role", fmt: t(role === "admin" ? "role_admin" : "role_user") };
    write(SESSION, { email: u.email, name: u.name, role: u.role });
    return { ok: true, role: u.role };
  }

  const session = () => read(SESSION, null);
  function logout() { try { localStorage.removeItem(SESSION); } catch (e) {} }
  function allUsers() { return read(USERS, []); }
  function deleteUser(email) { write(USERS, read(USERS, []).filter((u) => u.email !== email || u.role === "admin")); }

  window.SB_AUTH = { signup, login, session, logout, allUsers, deleteUser, seedAdmin };
  seedAdmin();

  // Header buttons on every page that has <span id="authSlot">
  function renderHeader() {
    const slot = document.getElementById("authSlot"); if (!slot) return;
    const s = session();
    slot.innerHTML = s
      ? `<a class="button button-outline" href="04_dashboard.html">${t("dashboard")}</a><button class="button button-primary" type="button" id="sbLogout">${t("logout")}</button>`
      : `<a class="button button-outline" href="02_login.html">${t("login")}</a><a class="button button-primary" href="03_signup.html">${t("signup")}</a>`;
    const out = document.getElementById("sbLogout");
    if (out) out.addEventListener("click", () => { logout(); location.href = "01_index.html"; });
  }
  document.addEventListener("DOMContentLoaded", renderHeader);
  document.addEventListener("sb-language", renderHeader);
})();
