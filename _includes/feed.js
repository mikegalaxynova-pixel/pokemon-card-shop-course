(function () {
  var root = document.getElementById("feed");
  var list = document.getElementById("feed-list");
  if (!root || !list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll(".feed-item"));
  var tabs = root.querySelectorAll(".feed-tab");
  var statusEl = document.getElementById("feed-status");
  var emptyEl = document.getElementById("feed-empty");
  var markBtn = document.getElementById("feed-mark-read");
  var searchInput = document.getElementById("feed-search");
  var READ_KEY = "pcsc-read";
  var VIEW_KEY = "pcsc-views";
  var THEME_KEY = "pcsc-theme";
  var validTabs = { featured: 1, all: 1, news: 1, shops: 1, videos: 1, kb: 1 };

  function norm(u) {
    if (!u) return "";
    try { u = decodeURI(u); } catch (e) {}
    u = String(u).split("#")[0].split("?")[0];
    u = u.replace(/\/index\.html$/, "/");
    if (u.length > 1 && u.charAt(u.length - 1) !== "/") u += "/";
    return u;
  }
  function getMap(key) {
    try { return JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch (e) { return {}; }
  }
  function setMap(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function ts(el) { return parseInt(el.getAttribute("data-ts"), 10) || 0; }
  function kind(el) { return el.getAttribute("data-kind") || ""; }
  function urlOf(el) { return norm(el.getAttribute("data-url")); }
  function rankOf(el) {
    var r = el.getAttribute("data-featured-rank");
    return r === null || r === "" ? 999 : parseInt(r, 10);
  }

  function newestFirst(nodes) {
    return nodes.slice().sort(function (a, b) { return ts(b) - ts(a); });
  }

  /* Keep given order, but never allow 3+ consecutive items of the same kind. */
  function interleavePreserve(nodes) {
    var remaining = nodes.slice();
    var out = [];
    while (remaining.length) {
      var pick = 0;
      var l1 = out[out.length - 1], l2 = out[out.length - 2];
      if (l1 && l2 && kind(l1) === kind(l2)) {
        var forbid = kind(l1);
        for (var i = 0; i < remaining.length; i++) {
          if (kind(remaining[i]) !== forbid) { pick = i; break; }
        }
      }
      out.push(remaining.splice(pick, 1)[0]);
    }
    return out;
  }

  /* Newest first, skipping an item if it would make 3 in a row of the same kind. */
  function interleaveNewest(nodes) {
    return interleavePreserve(newestFirst(nodes));
  }

  function splitUnreadFirst(nodes) {
    var readMap = getMap(READ_KEY);
    var views = getMap(VIEW_KEY);
    var unread = [], read = [];
    nodes.forEach(function (n) {
      if (readMap[urlOf(n)]) read.push(n);
      else unread.push(n);
    });
    read.forEach(function (n, i) { n._stable = i; });
    read.sort(function (a, b) {
      var dv = (views[urlOf(b)] || 0) - (views[urlOf(a)] || 0);
      if (dv) return dv;
      return a._stable - b._stable;
    });
    return unread.concat(read);
  }

  function applyMeta() {
    var readMap = getMap(READ_KEY);
    var views = getMap(VIEW_KEY);
    items.forEach(function (el) {
      var u = urlOf(el);
      var n = views[u] || 0;
      var isRead = !!readMap[u];
      el.classList.toggle("is-read", isRead);
      var viewEl = el.querySelector("[data-feed-views]");
      var freq = el.querySelector("[data-feed-frequent]");
      var readBadge = el.querySelector("[data-feed-read]");
      if (viewEl) {
        if (isRead && n >= 1) {
          viewEl.hidden = false;
          viewEl.textContent = "看过 " + n + " 次";
        } else {
          viewEl.hidden = true;
          viewEl.textContent = "";
        }
      }
      if (freq) freq.hidden = n < 3;
      if (readBadge) readBadge.hidden = !isRead;
      el.querySelectorAll("[data-read-url]").forEach(function (badge) {
        if (isRead) {
          badge.classList.add("read");
          if (!badge.getAttribute("data-feed-read") && !badge.getAttribute("data-feed-frequent")) {
            /* keep NEW/更新 text but mark as read */
          }
        }
      });
    });
  }

  function currentTab() {
    var t = (location.hash || "").replace(/^#/, "");
    if (t === "recommended") t = "featured";
    return validTabs[t] ? t : "featured";
  }

  function setTab(tab, pushHash) {
    if (!validTabs[tab]) tab = "featured";
    root.setAttribute("data-tab", tab);
    tabs.forEach(function (btn) {
      var on = btn.getAttribute("data-tab") === tab;
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (pushHash) {
      var hash = tab === "featured" ? "" : "#" + tab;
      if (hash) {
        if (history.replaceState) history.replaceState(null, "", hash);
        else location.hash = hash;
      } else if (history.replaceState) {
        history.replaceState(null, "", location.pathname + location.search);
      }
    }
    render();
  }

  function render() {
    var tab = root.getAttribute("data-tab") || "featured";
    var q = (searchInput && searchInput.value || "").trim().toLowerCase();
    var vis = items.filter(function (el) {
      if (tab === "featured" && el.getAttribute("data-featured") !== "1") return false;
      if (tab !== "featured" && tab !== "all" && kind(el) !== tab) return false;
      if (q) {
        var hay = (el.getAttribute("data-search") || "").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    if (tab === "featured") {
      vis = vis.slice().sort(function (a, b) { return rankOf(a) - rankOf(b); });
      vis = interleavePreserve(vis);
    } else if (tab === "all") {
      vis = interleaveNewest(vis);
    } else {
      vis = newestFirst(vis);
    }
    vis = splitUnreadFirst(vis);
    items.forEach(function (el) { el.hidden = true; });
    vis.forEach(function (el) {
      el.hidden = false;
      list.appendChild(el);
    });
    if (emptyEl) emptyEl.hidden = vis.length > 0;
    if (statusEl) {
      var label = tab === "featured" ? "今日推荐" : tab === "all" ? "全部" : ({ news: "新闻", shops: "店铺案例", videos: "视频", kb: "基础知识" }[tab] || "");
      if (q) statusEl.textContent = "找到 " + vis.length + " 条（" + label + "）";
      else if (tab === "featured") statusEl.textContent = vis.length ? "今天先看这 " + vis.length + " 条" : "今日推荐暂无内容";
      else statusEl.textContent = vis.length + " 条";
    }
    applyMeta();
  }

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () { setTab(btn.getAttribute("data-tab"), true); });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim();
      if (q && (root.getAttribute("data-tab") === "featured")) setTab("all", true);
      else render();
    });
    searchInput.closest("form") && searchInput.closest("form").addEventListener("submit", function (e) {
      e.preventDefault();
      render();
    });
  }

  if (markBtn) {
    markBtn.addEventListener("click", function () {
      var readMap = getMap(READ_KEY);
      var now = Date.now();
      var n = 0;
      items.forEach(function (el) {
        var u = urlOf(el);
        if (u && !readMap[u]) { readMap[u] = now; n++; }
      });
      /* 一键已读只标记已读，不增加「看过 N 次」 */
      setMap(READ_KEY, readMap);
      applyMeta();
      render();
      if (statusEl) statusEl.textContent = n ? "已把 " + n + " 条标为已读" : "没有未读内容";
    });
  }

  function bumpView(u) {
    u = norm(u);
    if (!u) return;
    var views = getMap(VIEW_KEY);
    views[u] = (views[u] || 0) + 1;
    setMap(VIEW_KEY, views);
    var readMap = getMap(READ_KEY);
    if (!readMap[u]) {
      readMap[u] = Date.now();
      setMap(READ_KEY, readMap);
    }
    applyMeta();
  }

  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".feed-yt-btn");
    if (!btn) return;
    var box = btn.closest(".feed-yt");
    if (!box || box.querySelector("iframe")) return;
    e.preventDefault();
    var id = box.getAttribute("data-yt");
    if (!id) return;
    var title = box.getAttribute("data-title") || "YouTube 视频播放器";
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    f.title = title;
    f.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    f.setAttribute("allowfullscreen", "");
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    box.innerHTML = "";
    box.appendChild(f);
    if (!box.getAttribute("data-viewed")) {
      box.setAttribute("data-viewed", "1");
      bumpView(box.getAttribute("data-url"));
    }
  });

  var themeBtn = document.getElementById("theme-toggle");
  function themeLabel(t) {
    return t === "dark" ? "切换到浅色模式" : "切换到深色模式";
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#121212" : "#ffffff");
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", themeLabel(t));
      themeBtn.setAttribute("data-theme-now", t);
    }
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, now); } catch (e) {}
      applyTheme(now);
    });
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }

  window.addEventListener("hashchange", function () { setTab(currentTab(), false); });
  applyMeta();
  setTab(currentTab(), false);
})();
