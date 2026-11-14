(function () {
  function isSvg(el) {
    if (!el) return false;
    var src = (el.currentSrc || el.src || el.getAttribute("src") || "").split("?")[0];
    return /\.svg$/i.test(src);
  }

  /* Group consecutive raster figures into a compact Zhihu-style gallery. SVGs stay full-width. */
  function groupFigures() {
    var roots = document.querySelectorAll(".page-main article, .page-main .prose");
    roots.forEach(function (root) {
      var nodes = Array.prototype.slice.call(root.children);
      var run = [];
      function flush() {
        if (run.length < 2) { run = []; return; }
        var wrap = document.createElement("div");
        var n = run.length;
        wrap.className = "img-gallery " + (n === 2 ? "img-gallery-2" : n === 3 ? "img-gallery-3" : "img-gallery-3x");
        run[0].parentNode.insertBefore(wrap, run[0]);
        run.forEach(function (fig, i) {
          fig.classList.add("img-gallery-item");
          if (n > 9 && i === 8) {
            var more = document.createElement("span");
            more.className = "feed-igrid-more";
            more.textContent = "+" + (n - 9);
            fig.appendChild(more);
          }
          if (i < 9) wrap.appendChild(fig);
        });
        if (n > 9) {
          run.slice(9).forEach(function (fig) { fig.hidden = true; fig.classList.add("img-gallery-extra"); wrap.appendChild(fig); });
        }
        run = [];
      }
      nodes.forEach(function (node) {
        var img = node.matches && node.matches("figure.fig, .fig") ? node.querySelector("img") : null;
        if (img && !isSvg(img)) run.push(node);
        else flush();
      });
      flush();
    });
    document.querySelectorAll(".page-main .fig img").forEach(function (img) {
      if (isSvg(img)) img.closest(".fig") && img.closest(".fig").classList.add("fig-diagram");
    });
  }

  /* Lightbox: swipe, captions, credits, close. */
  function setupLightbox() {
    if (document.getElementById("lightbox")) return;
    var box = document.createElement("div");
    box.id = "lightbox";
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "查看图片");
    box.innerHTML = '<button type="button" class="lightbox-close" data-lb-close aria-label="关闭">关闭</button>' +
      '<button type="button" class="lightbox-nav lightbox-prev" data-lb-prev aria-label="上一张">‹</button>' +
      '<button type="button" class="lightbox-nav lightbox-next" data-lb-next aria-label="下一张">›</button>' +
      '<figure class="lightbox-figure"><img alt=""><figcaption class="lightbox-cap"></figcaption></figure>';
    document.body.appendChild(box);
    var imgEl = box.querySelector("img");
    var capEl = box.querySelector(".lightbox-cap");
    var items = [];
    var index = 0;
    var lastFocus = null;

    function collect() {
      items = [];
      document.querySelectorAll(".page-main img").forEach(function (img) {
        if (img.closest(".feed-header, .site-footer, .brand, .yt-lite, .lightbox")) return;
        if (isSvg(img)) return;
        var w = img.naturalWidth || img.width || 0;
        if (w && w < 48 && !img.closest(".fig")) return;
        items.push(img);
      });
    }
    function captionFor(img) {
      var fig = img.closest("figure");
      if (fig) {
        var cap = fig.querySelector("figcaption");
        if (cap) return cap.textContent.replace(/\s+/g, " ").trim();
      }
      return img.getAttribute("alt") || "";
    }
    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      var srcImg = items[index];
      imgEl.src = srcImg.currentSrc || srcImg.src;
      imgEl.alt = srcImg.alt || "";
      capEl.textContent = captionFor(srcImg) + (items.length > 1 ? " （" + (index + 1) + " / " + items.length + "）" : "");
      box.hidden = false;
      document.body.style.overflow = "hidden";
      var closeBtn = box.querySelector("[data-lb-close]");
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      box.hidden = true;
      document.body.style.overflow = "";
      imgEl.removeAttribute("src");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    box.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-close]") || e.target === box) close();
      else if (e.target.closest("[data-lb-prev]")) show(index - 1);
      else if (e.target.closest("[data-lb-next]")) show(index + 1);
    });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    var startX = 0, startY = 0;
    box.addEventListener("touchstart", function (e) {
      if (!e.changedTouches[0]) return;
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
    }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (!e.changedTouches[0]) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    document.addEventListener("click", function (e) {
      var img = e.target.closest(".page-main img");
      if (!img || img.closest(".lightbox, .yt-lite, .feed-header")) return;
      if (isSvg(img)) return;
      if (e.target.closest("a") && !e.target.closest(".fig, .img-gallery")) return;
      e.preventDefault();
      collect();
      lastFocus = img;
      var i = items.indexOf(img);
      if (i < 0) { items.push(img); i = items.length - 1; }
      show(i);
    });
  }

  /* Back / 今日 on detail pages */
  var back = document.getElementById("page-back");
  if (back) {
    back.addEventListener("click", function (e) {
      var sameHost = document.referrer && document.referrer.indexOf(location.host) !== -1;
      if (sameHost && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  }

  /* Back to top */
  var topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    function syncTop() {
      topBtn.hidden = window.scrollY < 400;
    }
    window.addEventListener("scroll", syncTop, { passive: true });
    syncTop();
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (document.querySelector(".page-main")) {
    groupFigures();
    setupLightbox();
  }
})();
