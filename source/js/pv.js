// aisurf.cc 访问量：文章阅读数 + 全站总访问量（footer「浏览总量」）
// 请求同域 /api/pv 接口，填入 Stun 渲染的阅读数/总量 span
// 同一会话同一页面只 +1（刷新不重复计数）；接口异常时静默，不留空白占位闪烁
(function () {
  function go() {
    var pageEl = document.getElementById("busuanzi_value_page_pv");
    var siteEl = document.getElementById("busuanzi_value_site_pv");
    if (!pageEl && !siteEl) return; // 两个都没有的页面直接退出（正常不会发生）
    var path = location.pathname;
    var key = "pv:" + path;
    var counted = false;
    try { counted = sessionStorage.getItem(key) === "1"; } catch (e) {}
    fetch("/api/pv?path=" + encodeURIComponent(path), { method: counted ? "GET" : "POST" })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d) return;
        if (pageEl && typeof d.pv === "number") pageEl.textContent = d.pv;
        if (siteEl && typeof d.total === "number") siteEl.textContent = d.total;
      })
      .catch(function () {});
    try { sessionStorage.setItem(key, "1"); } catch (e) {}
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", go);
  } else {
    go();
  }
})();
