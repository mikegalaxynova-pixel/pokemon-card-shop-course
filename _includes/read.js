(function(){try{
  function norm(u){
    if(!u) return u;
    try{u=decodeURI(u);}catch(e){}
    u=String(u).split("#")[0].split("?")[0];
    u=u.replace(/\/index\.html$/,"/");
    if(u.length>1 && u.charAt(u.length-1)!=="/") u+="/";
    return u;
  }
  function shouldCount(p){
    return /\/daily\/\d{4}-\d{2}-\d{2}/.test(p) ||
      /\/shops\/[^/]+\/$/.test(p) ||
      /\/videos\/[^/]+\/$/.test(p) ||
      /\/kb\/.+\//.test(p);
  }
  var rk="pcsc-read", vk="pcsc-views";
  var r=JSON.parse(localStorage.getItem(rk)||"{}")||{};
  var v=JSON.parse(localStorage.getItem(vk)||"{}")||{};
  var p=norm(location.pathname);
  r[p]=Date.now();
  if(shouldCount(p)) v[p]=(v[p]||0)+1;
  localStorage.setItem(rk, JSON.stringify(r));
  localStorage.setItem(vk, JSON.stringify(v));
  document.querySelectorAll("[data-read-url]").forEach(function(e){
    var u=norm(e.getAttribute("data-read-url"));
    if(r[u]){ e.classList.add("read"); e.title=e.title||"已读"; }
  });
}catch(e){}})();
