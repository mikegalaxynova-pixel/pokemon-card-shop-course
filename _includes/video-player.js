(function () {
  var modal = document.querySelector("[data-yt-modal]");
  var modalPlayer = modal ? modal.querySelector("[data-yt-modal-player]") : null;
  var modalTitle = modal ? modal.querySelector("[data-yt-modal-title]") : null;
  var modalMore = modal ? modal.querySelector("[data-yt-modal-more]") : null;
  var lastFocus = null;

  function embedUrl(id) {
    return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
  }
  function iframeEl(id, title) {
    var f = document.createElement("iframe");
    f.src = embedUrl(id);
    f.title = title || "YouTube 视频播放器";
    f.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    f.setAttribute("allowfullscreen", "");
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    return f;
  }
  function loadInline(box) {
    var id = box.getAttribute("data-yt");
    if (!id || box.querySelector("iframe")) return;
    var title = box.getAttribute("data-title") || "YouTube 视频播放器";
    box.innerHTML = "";
    box.appendChild(iframeEl(id, title));
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (modalPlayer) modalPlayer.innerHTML = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }
  function openModal(box, detailHref) {
    if (!modal || !modalPlayer) return;
    var id = box.getAttribute("data-yt");
    var title = box.getAttribute("data-title") || "视频";
    lastFocus = document.activeElement;
    modalPlayer.innerHTML = "";
    modalPlayer.appendChild(iframeEl(id, title));
    if (modalTitle) modalTitle.textContent = title;
    if (modalMore) {
      if (detailHref) {
        modalMore.href = detailHref;
        modalMore.hidden = false;
      } else {
        modalMore.removeAttribute("href");
        modalMore.hidden = true;
      }
    }
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector("[data-yt-modal-close]");
    if (closeBtn) closeBtn.focus();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".yt-lite-btn");
    if (!btn) return;
    var box = btn.closest(".yt-lite");
    if (!box) return;
    e.preventDefault();
    var mode = box.getAttribute("data-mode") || "inline";
    if (mode === "modal" && modal) {
      var card = box.closest(".vcard");
      var link = card ? card.querySelector(".vcard-body h3 a, .vcard-actions a") : null;
      openModal(box, link ? link.getAttribute("href") : null);
    } else {
      loadInline(box);
    }
  });

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-yt-modal-close]") || e.target.hasAttribute("data-yt-modal-backdrop")) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  document.querySelectorAll(".video-filter-root").forEach(function (root) {
    var group = root.querySelector(".nfilter");
    if (!group) return;
    var buttons = group.querySelectorAll(".nfilter-btn");
    var items = root.querySelectorAll("[data-topics]");
    var sections = root.querySelectorAll("[data-video-section]");
    function apply(id, idAlt) {
      buttons.forEach(function (btn) {
        var on = btn.getAttribute("data-filter") === id;
        btn.classList.toggle("is-on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      items.forEach(function (item) {
        var tags = " " + (item.getAttribute("data-topics") || "") + " ";
        var show = id === "all" || tags.indexOf(" " + id + " ") !== -1 || (idAlt && tags.indexOf(" " + idAlt + " ") !== -1);
        item.hidden = !show;
      });
      sections.forEach(function (sec) {
        var vis = sec.querySelectorAll("[data-topics]:not([hidden])");
        sec.hidden = vis.length === 0;
      });
    }
    group.addEventListener("click", function (e) {
      var btn = e.target.closest(".nfilter-btn");
      if (!btn || !group.contains(btn)) return;
      apply(btn.getAttribute("data-filter"), btn.getAttribute("data-filter-id"));
    });
  });
})();
