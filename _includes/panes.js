/* 宽屏 / 展开的折叠屏：主从双栏。
   ≥ 840px：左边是首页列表（窗口滚动），右边固定窗格（iframe）打开文章。
   600〜840px：列表占满宽度，文章从右侧滑出盖住列表，返回键或「返回列表」回到原来位置。
   < 600px：完全保持原来的单栏跳转。 */
(function () {
  var d = document.documentElement;
  var HOME = d.getAttribute("data-home") || "/";
  var ORIGIN = location.origin;
  function inPane() { return d.classList.contains("in-pane"); }
  function parentApi() { try { return window.parent && window.parent.PCSCPanes; } catch (e) { return null; } }

  function paneableUrl(href) {
    var u;
    try { u = new URL(href, location.href); } catch (e) { return null; }
    if (u.origin !== ORIGIN) return null;
    if (u.pathname.indexOf(HOME) !== 0) return null;
    if (u.pathname === HOME || u.pathname === HOME + "index.html") return null;
    if (/\.(xml|json|webmanifest|png|jpe?g|webp|gif|svg|pdf|txt|js|css)$/i.test(u.pathname)) return null;
    if (/^\/[^/]+\/404/.test(u.pathname)) return null;
    return u;
  }
  function plainClick(e, a) {
    return !(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      (a.target && a.target !== "_self") || a.hasAttribute("download"));
  }

  /* ---------- 在右侧窗格里面 ---------- */
  if (inPane()) {
    var api = parentApi();
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || !plainClick(e, a)) return;
      var raw = a.getAttribute("href");
      if (!raw || raw.charAt(0) === "#") return;
      var u;
      try { u = new URL(a.href); } catch (err) { return; }
      if (u.origin !== ORIGIN) { e.preventDefault(); window.open(u.href, "_blank", "noopener"); return; }
      if (u.pathname === location.pathname && u.hash) return;
      var p = paneableUrl(u.href);
      e.preventDefault();
      api = parentApi();
      if (p && api) api.open(p.pathname + p.search + p.hash, true);
      else window.top.location.href = u.href;
    });
    window.addEventListener("storage", function (e) {
      if (e.key === "pcsc-theme" && (e.newValue === "dark" || e.newValue === "light")) d.setAttribute("data-theme", e.newValue);
    });
    function report() { var a = parentApi(); if (a) a.loaded(location.pathname + location.search + location.hash, document.title); }
    if (document.readyState === "complete") report(); else window.addEventListener("load", report);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !document.querySelector(".lightbox:not([hidden]), .yt-modal:not([hidden])")) { var a = parentApi(); if (a) a.close(); }
    });
    return;
  }

  /* ---------- 首页：建立窗格 ---------- */
  if (d.getAttribute("data-nav") !== "home") return;

  var mqSplit = window.matchMedia("(min-width: 840px)");
  var mqOver = window.matchMedia("(min-width: 600px)");
  function mode() { return mqSplit.matches ? "split" : (mqOver.matches ? "over" : "none"); }

  var pane = document.createElement("aside");
  pane.className = "pane";
  pane.id = "pane";
  pane.setAttribute("aria-label", "文章");
  pane.innerHTML =
    '<div class="pane-bar">' +
      '<button type="button" class="pane-close" data-pane-close><span class="pane-close-over">‹ 返回列表</span><span class="pane-close-split" aria-label="关闭右侧文章">✕ 关闭</span></button>' +
      '<span class="pane-title" aria-live="polite"></span>' +
      '<a class="pane-newtab" target="_blank" rel="noopener" href="#">新窗口打开</a>' +
    '</div>' +
    '<div class="pane-body">' +
      '<div class="pane-empty"></div>' +
      '<div class="pane-loading" hidden>加载中…</div>' +
      '<iframe id="pane-frame" class="pane-frame" title="文章内容" hidden></iframe>' +
    '</div>';
  document.body.appendChild(pane);
  var frame = pane.querySelector("#pane-frame");
  var titleEl = pane.querySelector(".pane-title");
  var newTab = pane.querySelector(".pane-newtab");
  var loading = pane.querySelector(".pane-loading");
  var empty = pane.querySelector(".pane-empty");
  var current = "";
  function depth() { return (history.state && history.state.depth) || 0; }

  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fillEmpty() {
    var top = document.querySelector('.feed-item[data-featured-rank="1"]') || document.querySelector(".feed-item[data-featured]");
    var html = '<div class="pane-empty-inner"><p class="pane-empty-kicker">今日推荐</p>';
    if (top) {
      var t = top.querySelector(".feed-title a");
      var sum = top.querySelector(".feed-summary, .feed-excerpt, .feed-reason");
      var img = top.querySelector("img");
      html += '<a class="pane-empty-card" href="' + esc(t ? t.getAttribute("href") : HOME) + '">' +
        (img ? '<img src="' + esc(img.currentSrc || img.src) + '" alt="" loading="lazy">' : "") +
        '<strong>' + esc(t ? t.textContent : "") + '</strong>' +
        (sum ? '<span>' + esc(sum.textContent.replace(/^为什么今天先看/, "")) + '</span>' : "") +
        '<em>点开在这里阅读 ›</em></a>';
    }
    html += '<p class="pane-empty-hint">在左边点任意一条，文章会在这里打开；左边的位置和栏目都会保留。</p></div>';
    empty.innerHTML = html;
  }

  function applyMode() {
    var m = mode();
    d.classList.toggle("has-split", m === "split");
    d.classList.toggle("has-over", m === "over");
    pane.hidden = !(m === "split" || d.classList.contains("pane-open"));
  }

  function showFrame(url) {
    empty.hidden = true;
    frame.hidden = false;
    loading.hidden = false;
    newTab.href = url;
    try { frame.contentWindow.location.replace(url); } catch (e) { frame.src = url; }
  }
  function open(url, push) {
    if (!url) return;
    var target = new URL(url, location.href);
    var path = target.pathname + target.search + target.hash;
    d.classList.add("pane-open");
    applyMode();
    try { sessionStorage.removeItem("pcsc-feed-back"); } catch (e) {}
    if (path !== current) { current = path; showFrame(path); }
    if (push) history.pushState({ pane: path, depth: depth() + 1 }, "", path);
    // 先在左边标为已读（iframe 里 read.js 也会写入）
    var el = document.querySelector('.feed-item[data-url="' + target.pathname.replace(/"/g, "") + '"]');
    document.querySelectorAll(".feed-item.pane-current").forEach(function (n) { n.classList.remove("pane-current"); });
    if (el) el.classList.add("pane-current");
    if (mode() !== "split") { try { frame.focus(); } catch (e) {} }
  }
  function hide() {
    current = "";
    d.classList.remove("pane-open");
    frame.hidden = true;
    loading.hidden = true;
    try { frame.contentWindow.location.replace("about:blank"); } catch (e) {}
    empty.hidden = false;
    titleEl.textContent = "";
    document.title = homeTitle;
    document.querySelectorAll(".feed-item.pane-current").forEach(function (n) { n.classList.remove("pane-current"); });
    applyMode();
  }
  function close() {
    var n = depth();
    if (n > 0) { history.go(-n); return; }
    history.replaceState(null, "", HOME + (savedHash || ""));
    hide();
  }
  var homeTitle = document.title;
  var savedHash = location.hash;

  window.PCSCPanes = {
    open: open,
    close: close,
    loaded: function (path, title) {
      loading.hidden = true;
      if (!d.classList.contains("pane-open")) return;
      titleEl.textContent = title || "";
      if (title) document.title = title;
      newTab.href = path;
      if (path !== current) {
        current = path;
        history.replaceState({ pane: path, depth: depth() }, "", path);
      }
      if (window.PCSCFeed && window.PCSCFeed.refreshMeta) window.PCSCFeed.refreshMeta();
    }
  };

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || mode() === "none" || !plainClick(e, a)) return;
    if (a.closest(".pane-bar")) return;
    if (a.closest(".feed-header")) return; // 顶部品牌、搜索等保持原样
    var u = paneableUrl(a.href);
    if (!u) return;
    e.preventDefault();
    if (!d.classList.contains("pane-open")) savedHash = location.hash;
    open(u.pathname + u.search + u.hash, true);
  });
  pane.addEventListener("click", function (e) { if (e.target.closest("[data-pane-close]")) close(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && d.classList.contains("pane-open") && mode() === "over") close();
  });

  window.addEventListener("popstate", function (e) {
    var st = e.state;
    if (st && st.pane) { open(st.pane, false); }
    else if (d.classList.contains("pane-open")) hide();
  });
  function onMq() { applyMode(); }
  if (mqSplit.addEventListener) { mqSplit.addEventListener("change", onMq); mqOver.addEventListener("change", onMq); }
  else { mqSplit.addListener(onMq); mqOver.addListener(onMq); }

  fillEmpty();
  applyMode();

  // 直接打开文章网址时，文章页会跳到 ?pane=…，这里把它放进右侧并把地址栏换回文章网址
  var q = new URLSearchParams(location.search).get("pane");
  if (q) {
    var u0 = paneableUrl(q);
    if (u0) {
      var p0 = u0.pathname + u0.search + u0.hash;
      savedHash = "";
      if (mode() === "none") { location.replace(p0); return; }
      open(p0, false);
      history.replaceState({ pane: p0, depth: 0 }, "", p0);
    } else {
      history.replaceState(null, "", HOME + location.hash);
    }
  } else if (history.state && history.state.pane) {
    open(history.state.pane, false);
  }
})();
