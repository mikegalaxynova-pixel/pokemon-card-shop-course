(function(){try{
  /* 宽屏双栏：在 <head> 里尽早决定，避免闪烁。
     - 在右侧窗格（iframe）里：加 in-pane，隐藏页头页脚。
     - 首页且宽度 ≥ 840px：加 has-split（左列表、右文章）。
     - 文章页被直接打开且宽度 ≥ 840px：跳到首页 ?pane=，由首页在右侧打开它，地址栏仍是文章网址。 */
  var d=document.documentElement, SPLIT="(min-width: 840px)";
  var fe=null; try{fe=window.frameElement;}catch(e){}
  if(fe && fe.id==="pane-frame"){ d.classList.add("in-pane"); return; }
  var wide=window.matchMedia && matchMedia(SPLIT).matches;
  if(d.getAttribute("data-nav")==="home"){ if(wide) d.classList.add("has-split"); return; }
  if(wide && d.getAttribute("data-paneable")==="1" && !/bot|crawl|spider|slurp|preview|lighthouse/i.test(navigator.userAgent||"")){
    var home=d.getAttribute("data-home")||"/";
    location.replace(home+"?pane="+encodeURIComponent(location.pathname+location.search+location.hash));
  }
}catch(e){}})();
