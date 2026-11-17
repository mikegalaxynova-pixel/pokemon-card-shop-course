(function () {
  var THEME_KEY = "pcsc-theme";
  var themeBtn = document.getElementById("theme-toggle");
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#121212" : "#d6001c");
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", t === "dark" ? "切换到浅色模式" : "切换到深色模式");
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

  function isStandalone() {
    return (window.matchMedia && (matchMedia("(display-mode: standalone)").matches || matchMedia("(display-mode: fullscreen)").matches || matchMedia("(display-mode: minimal-ui)").matches))
      || window.navigator.standalone === true;
  }
  function isIos() {
    var ua = navigator.userAgent || "";
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  var installBtn = document.getElementById("pwa-install");
  var hint = document.getElementById("pwa-hint");
  var deferredPrompt = null;
  if (installBtn) {
    if (isStandalone()) {
      installBtn.hidden = true;
    } else if (isIos()) {
      installBtn.hidden = false;
      installBtn.addEventListener("click", function () {
        if (!hint) return;
        hint.hidden = false;
      });
    } else {
      window.addEventListener("beforeinstallprompt", function (e) {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.hidden = false;
      });
      installBtn.addEventListener("click", function () {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(function () {
          deferredPrompt = null;
          installBtn.hidden = true;
        });
      });
      window.addEventListener("appinstalled", function () {
        installBtn.hidden = true;
        deferredPrompt = null;
      });
    }
  }
  if (hint) {
    hint.addEventListener("click", function (e) {
      if (e.target.closest("[data-hint-close]")) hint.hidden = true;
    });
  }

  if ("serviceWorker" in navigator) {
    var swUrl = document.documentElement.getAttribute("data-sw") || "sw.js";
    var swScope = document.documentElement.getAttribute("data-sw-scope") || "./";
    navigator.serviceWorker.register(swUrl, { scope: swScope, updateViaCache: "none" }).then(function (reg) {
      if (reg && reg.update) reg.update().catch(function () {});
    }).catch(function () {});
  }
})();
