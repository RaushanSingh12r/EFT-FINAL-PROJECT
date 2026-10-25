// Role-based dashboard: users see their profile and shortcuts, admins see user management.
(function () {
  "use strict";
  const t = (k) => SB_I18N.t(k);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const LOCALES = { en: "en-IN", hi: "hi-IN", ta: "ta-IN", te: "te-IN", kn: "kn-IN" };

  function date(ts) {
    try { return new Date(ts).toLocaleDateString(LOCALES[SB_I18N.getLang()] || "en-IN", { year: "numeric", month: "short", day: "numeric" }); }
    catch (e) { return ""; }
  }

  function render() {
    const s = SB_AUTH.session();
    const root = $("dashRoot");
    if (!s) {
      root.innerHTML = `<div class="dash-card"><p>${t("not_logged")}</p><a class="button button-primary" href="02_login.html">${t("login")}</a></div>`;
      return;
    }
    const me = SB_AUTH.allUsers().find((u) => u.email === s.email) || {};
    const isAdmin = s.role === "admin";
    const L = SB_I18N.LANGS[SB_I18N.getLang()].label;
    let html = `<div class="dash-head"><p class="eyebrow">${t(isAdmin ? "role_admin" : "role_user").toUpperCase()}</p>
      <h1>${isAdmin ? t("dash_admin_title") : t("dash_welcome") + ", " + esc(s.name)}</h1>
      <p class="dash-sub">${t(isAdmin ? "dash_admin_sub" : "dash_user_sub")}</p></div>`;

    if (isAdmin) {
      const users = SB_AUTH.allUsers();
      html += `<div class="stat-row">
        <div class="stat"><strong>${users.filter((u) => u.role === "user").length}</strong><span>${t("stat_users")}</span></div>
        <div class="stat"><strong>${users.filter((u) => u.role === "admin").length}</strong><span>${t("stat_admins")}</span></div>
        <div class="stat"><strong>${esc(L)}</strong><span>${t("stat_lang")}</span></div></div>
        <div class="dash-card"><h2>${t("users_title")}</h2><div class="table-wrap"><table>
        <thead><tr><th>${t("f_name")}</th><th>${t("f_email")}</th><th>${t("dash_role")}</th><th>${t("dash_joined")}</th><th>${t("col_action")}</th></tr></thead><tbody>`;
      if (!users.length) html += `<tr><td colspan="5">${t("no_users")}</td></tr>`;
      users.forEach((u) => {
        html += `<tr><td>${esc(u.name)} ${u.email === s.email ? t("you") : ""}</td><td>${esc(u.email)}</td>
          <td><span class="pill ${u.role}">${t(u.role === "admin" ? "role_admin" : "role_user")}</span></td><td>${date(u.created)}</td>
          <td>${u.role === "admin" ? "—" : `<button class="del-btn" data-email="${esc(u.email)}">${t("delete")}</button>`}</td></tr>`;
      });
      html += `</tbody></table></div></div>`;
    } else {
      html += `<div class="dash-grid"><div class="dash-card"><h2>${t("dash_actions")}</h2><div class="action-grid">
        <a href="01_index.html#communicate">💬 ${t("go_communicate")}</a><a href="01_index.html#learn">📚 ${t("go_learn")}</a>
        <a href="01_index.html#vocabulary">🔤 ${t("go_vocab")}</a><a href="01_index.html#quiz">🧠 ${t("go_quiz")}</a></div></div>
        <div class="dash-card"><h2>${t("dash_profile")}</h2><dl>
        <dt>${t("f_name")}</dt><dd>${esc(s.name)}</dd><dt>${t("f_email")}</dt><dd>${esc(s.email)}</dd>
        <dt>${t("dash_role")}</dt><dd>${t("role_user")}</dd><dt>${t("dash_lang")}</dt><dd>${esc(L)}</dd>
        <dt>${t("dash_joined")}</dt><dd>${date(me.created)}</dd></dl></div></div>`;
    }
    root.innerHTML = html;
    root.querySelectorAll(".del-btn").forEach((b) => b.addEventListener("click", () => {
      if (confirm(t("confirm_del"))) { SB_AUTH.deleteUser(b.dataset.email); render(); }
    }));
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("sb-language", render);
})();
