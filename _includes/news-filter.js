(function () {
  function setup(root) {
    var group = root.querySelector(".nfilter");
    if (!group) return;
    var buttons = group.querySelectorAll(".nfilter-btn");
    var items = root.querySelectorAll("[data-news-type]");
    function apply(id) {
      buttons.forEach(function (btn) {
        var on = btn.getAttribute("data-filter") === id;
        btn.classList.toggle("is-on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      items.forEach(function (item) {
        var show = id === "all" || item.getAttribute("data-news-type") === id || (id === "followup" && item.getAttribute("data-news-followup") === "1");
        item.hidden = !show;
      });
    }
    group.addEventListener("click", function (e) {
      var btn = e.target.closest(".nfilter-btn");
      if (!btn || !group.contains(btn)) return;
      apply(btn.getAttribute("data-filter"));
    });
  }
  document.querySelectorAll(".news-filter-root").forEach(setup);
})();
