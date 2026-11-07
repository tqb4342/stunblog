// aisurf.cc 文章访问量：请求同域 /api/pv 接口，填入 Stun 渲染的阅读数 span
// 同一会话同一篇文章只 +1（刷新不重复计数）；接口异常时静默，不留空白占位闪烁
(function () {
  function go() {
    var el = document.getElementById("busuanzi_value_page_pv");
    if (!el) return; // 非文章页无此元素，直接退出
    var path = location.pathname;
    var key = "pv:" + path;
    var counted = false;
    try { counted = sessionStorage.getItem(key) === "1"; } catch (e) {}
    fetch("/api/pv?path=" + encodeURIComponent(path), { method: counted ? "GET" : "POST" })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && typeof d.pv === "number") el.textContent = d.pv; })
      .catch(function () {});
    try { sessionStorage.setItem(key, "1"); } catch (e) {}
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", go);
  } else {
    go();
  }
})();
