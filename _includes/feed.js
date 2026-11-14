(function () {
  var root = document.getElementById("feed");
  var list = document.getElementById("feed-list");
  if (!root || !list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll(".feed-item"));
  var tabs = root.querySelectorAll(".feed-tab");
  var statusEl = document.getElementById("feed-status");
  var emptyEl = document.getElementById("feed-empty");
  var markBtn = document.getElementById("feed-mark-read");
  var searchInput = document.getElementById("site-search") || document.getElementById("feed-search");
  var toast = document.getElementById("feed-toast");
  var READ_KEY = "pcsc-read";
  var VIEW_KEY = "pcsc-views";
  var validTabs = { featured: 1, all: 1 };
  tabs.forEach(function (btn) {
    var id = btn.getAttribute("data-tab");
    if (id) validTabs[id] = 1;
  });
  var tabLabels = { featured: "今日推荐", all: "全部" };
  tabs.forEach(function (btn) {
    var id = btn.getAttribute("data-tab");
    if (id) tabLabels[id] = btn.textContent.trim();
  });

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
  function dayOf(el) { return el.getAttribute("data-day") || ""; }
  function rankOf(el) {
    var r = el.getAttribute("data-featured-rank");
    return r === null || r === "" ? 999 : parseInt(r, 10);
  }
  function hasTopic(el, id) {
    var t = " " + (el.getAttribute("data-topics") || "") + " ";
    return t.indexOf(" " + id + " ") !== -1;
  }
  function formatDay(day) {
    var p = String(day).split("-");
    if (p.length < 3) return day;
    return parseInt(p[1], 10) + "/" + parseInt(p[2], 10);
  }

  function newestFirst(nodes) {
    return nodes.slice().sort(function (a, b) { return ts(b) - ts(a); });
  }
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
  function interleaveNewest(nodes) {
    return interleavePreserve(newestFirst(nodes));
  }
  function sortRead(nodes) {
    var views = getMap(VIEW_KEY);
    var arr = nodes.slice();
    arr.forEach(function (n, i) { n._stable = i; });
    arr.sort(function (a, b) {
      var dv = (views[urlOf(b)] || 0) - (views[urlOf(a)] || 0);
      if (dv) return dv;
      return a._stable - b._stable;
    });
    return arr;
  }
  function groupByDayInterleaved(nodes) {
    var days = {};
    var order = [];
    newestFirst(nodes).forEach(function (el) {
      var d = dayOf(el) || "0";
      if (!days[d]) { days[d] = []; order.push(d); }
      days[d].push(el);
    });
    var out = [];
    order.forEach(function (d) {
      out = out.concat(interleaveNewest(days[d]));
    });
    return out;
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
        if (isRead) badge.classList.add("read");
      });
    });
  }

  function clearHelpers() {
    list.querySelectorAll(".feed-day, .feed-read-split").forEach(function (n) { n.remove(); });
  }
  function appendDayHead(day, lastRef) {
    if (!day || day === lastRef.value) return;
    var sep = document.createElement("p");
    sep.className = "feed-day";
    sep.textContent = formatDay(day);
    list.appendChild(sep);
    lastRef.value = day;
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
    var on = root.querySelector('.feed-tab[aria-selected="true"]');
    if (on && on.scrollIntoView) on.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
    render();
  }

  function render() {
    var tab = root.getAttribute("data-tab") || "featured";
    var q = (searchInput && searchInput.value || "").trim().toLowerCase();
    var vis = items.filter(function (el) {
      if (tab === "featured" && el.getAttribute("data-featured") !== "1") return false;
      if (tab !== "featured" && tab !== "all" && !hasTopic(el, tab)) return false;
      if (q) {
        var hay = (el.getAttribute("data-search") || "").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    var readMap = getMap(READ_KEY);
    var unread = vis.filter(function (el) { return !readMap[urlOf(el)]; });
    var read = vis.filter(function (el) { return readMap[urlOf(el)]; });

    if (tab === "featured") {
      unread.sort(function (a, b) { return rankOf(a) - rankOf(b); });
      unread = interleavePreserve(unread);
      read.sort(function (a, b) { return rankOf(a) - rankOf(b); });
      read = sortRead(interleavePreserve(read));
    } else if (tab === "all") {
      unread = groupByDayInterleaved(unread);
      read = sortRead(groupByDayInterleaved(read));
    } else {
      unread = newestFirst(unread);
      read = sortRead(newestFirst(read));
    }

    clearHelpers();
    items.forEach(function (el) { el.hidden = true; });
    var withDates = tab === "all";
    var last = { value: "" };
    unread.forEach(function (el) {
      if (withDates) appendDayHead(dayOf(el), last);
      el.hidden = false;
      list.appendChild(el);
    });
    if (read.length && (unread.length || vis.length)) {
      var div = document.createElement("p");
      div.className = "feed-read-split";
      div.textContent = "以下为已读";
      list.appendChild(div);
    }
    last.value = "";
    read.forEach(function (el) {
      el.hidden = false;
      list.appendChild(el);
    });

    if (emptyEl) emptyEl.hidden = vis.length > 0;
    if (statusEl) {
      var label = tabLabels[tab] || "";
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
      if (q && root.getAttribute("data-tab") === "featured") setTab("all", true);
      else render();
    });
    var form = searchInput.closest("form");
    if (form) form.addEventListener("submit", function (e) {
      if (document.getElementById("feed")) { e.preventDefault(); render(); }
    });
  }

  var undoRead = null;
  var toastTimer = null;
  function hideToast() {
    if (toast) toast.hidden = true;
    undoRead = null;
  }
  function showToast(msg, snapshot) {
    if (!toast) return;
    var msgEl = toast.querySelector("[data-toast-msg]");
    if (msgEl) msgEl.textContent = msg;
    undoRead = snapshot;
    toast.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 8000);
  }
  if (toast) {
    toast.addEventListener("click", function (e) {
      if (!e.target.closest("[data-toast-undo]")) return;
      if (undoRead) {
        setMap(READ_KEY, undoRead);
        hideToast();
        applyMeta();
        render();
        if (statusEl) statusEl.textContent = "已撤销";
      }
    });
  }

  if (markBtn) {
    markBtn.addEventListener("click", function () {
      var readMap = getMap(READ_KEY);
      var snapshot = JSON.parse(JSON.stringify(readMap));
      var now = Date.now();
      var n = 0;
      items.forEach(function (el) {
        var u = urlOf(el);
        if (u && !readMap[u]) { readMap[u] = now; n++; }
      });
      if (!n) {
        if (statusEl) statusEl.textContent = "没有未读内容";
        return;
      }
      setMap(READ_KEY, readMap);
      applyMeta();
      render();
      if (statusEl) statusEl.textContent = "已把 " + n + " 条标为已读";
      showToast("已把 " + n + " 条标为已读", snapshot);
    });
  }

  var POS_KEY = "pcsc-feed-pos";
  function savePos() {
    try {
      sessionStorage.setItem(POS_KEY, JSON.stringify({
        tab: root.getAttribute("data-tab") || "featured",
        y: window.scrollY || 0,
        t: Date.now()
      }));
    } catch (e) {}
  }
  list.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a || !a.getAttribute("href")) return;
    try { sessionStorage.setItem("pcsc-feed-back", "1"); } catch (err) {}
    savePos();
  });
  window.addEventListener("pagehide", savePos);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") savePos();
  });

  window.addEventListener("hashchange", function () { setTab(currentTab(), false); });
  applyMeta();

  var navType = "";
  try { navType = performance.getEntriesByType("navigation")[0].type; } catch (e) {}
  var shouldRestore = false;
  try { shouldRestore = navType === "back_forward" || sessionStorage.getItem("pcsc-feed-back") === "1"; sessionStorage.removeItem("pcsc-feed-back"); } catch (e) {}
  var saved = null;
  try { saved = JSON.parse(sessionStorage.getItem(POS_KEY) || "null"); } catch (e) {}
  var startTab = currentTab();
  if (shouldRestore && saved && saved.tab && validTabs[saved.tab] && !location.hash) startTab = saved.tab;
  setTab(startTab, false);
  if (shouldRestore && saved && typeof saved.y === "number") {
    requestAnimationFrame(function () { window.scrollTo(0, saved.y); });
    setTimeout(function () { window.scrollTo(0, saved.y); }, 50);
  }
})();
