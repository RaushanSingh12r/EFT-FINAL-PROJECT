// Handles the login and signup forms.
(function () {
  "use strict";
  const t = (k) => SB_I18N.t(k);
  const $ = (id) => document.getElementById(id);
  const msg = $("authMsg");
  let role = "user", last = null;

  function show(res, good) {
    if (!msg) return;
    last = { res, good };
    const key = good ? res : res.err;
    msg.textContent = t(key).replace("%s", res.fmt || "");
    msg.className = "auth-msg " + (good ? "ok" : "err");
  }
  document.addEventListener("sb-language", () => { if (last && msg.textContent) show(last.res, last.good); });

  // Role tabs (login page only)
  const tabs = document.querySelectorAll(".role-tab");
  tabs.forEach((b) => b.addEventListener("click", () => {
    role = b.dataset.role;
    tabs.forEach((x) => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-selected", on); });
    const demo = $("adminDemo"); if (demo) demo.hidden = role !== "admin";
    const su = $("signupLine"); if (su) su.hidden = role === "admin"; // admins cannot self-register
    msg.textContent = "";
  }));

  // Show/hide password
  document.querySelectorAll(".pw-toggle").forEach((c) => c.addEventListener("change", () => {
    document.querySelectorAll("input.pw").forEach((i) => { i.type = c.checked ? "text" : "password"; });
  }));

  const go = (r) => setTimeout(() => { location.href = "04_dashboard.html"; }, 700);

  const lf = $("loginForm");
  if (lf) lf.addEventListener("submit", async (e) => {
    e.preventDefault();
    const r = await SB_AUTH.login($("email").value, $("password").value, role);
    if (r.err) return show(r, false);
    show("ok_login", true); go();
  });

  const sf = $("signupForm");
  if (sf) sf.addEventListener("submit", async (e) => {
    e.preventDefault();
    const r = await SB_AUTH.signup($("name").value, $("email").value, $("password").value, $("confirm").value);
    if (r.err) return show(r, false);
    show("ok_signup", true); go();
  });
})();
