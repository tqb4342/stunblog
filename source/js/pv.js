// aisurf.cc 访问量：文章阅读数 + 全站总访问量（footer「浏览总量」）+ 列表页批量阅读数
// 请求同域 /api/pv 接口，填入 Stun 渲染的阅读数/总量 span
// 同一会话同一页面只 +1（刷新不重复计数）；接口异常时静默，不留空白占位闪烁
// 列表页（首页卡片/归档时间线）通过 [data-pv-path] 元素走 /api/pv-batch 批量只读填充
(function () {
  // 数字格式化：千分位显示真实数（1,803 / 12,345 / 20,000），不做万位缩写
  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
        // {pv:0,total:0} 是接口的降级错误形状（如 KV 写入配额耗尽）：不覆盖已显示的值
        if (d.pv === 0 && d.total === 0) return;
        if (pageEl && typeof d.pv === "number") pageEl.textContent = fmt(d.pv);
        if (siteEl && typeof d.total === "number") siteEl.textContent = fmt(d.total);
      })
      .catch(function () {});
    try { sessionStorage.setItem(key, "1"); } catch (e) {}
  }

  // 列表页批量阅读数：收集 [data-pv-path] 元素，一次请求拉回全部
  function batch() {
    var els = document.querySelectorAll("[data-pv-path]");
    if (!els.length) return;
    var paths = [];
    for (var i = 0; i < els.length; i++) {
      var p = els[i].getAttribute("data-pv-path");
      if (p && paths.indexOf(p) === -1) paths.push(p);
    }
    if (!paths.length) return;
    fetch("/api/pv-batch?paths=" + encodeURIComponent(paths.join(",")))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.pvs) return;
        for (var i = 0; i < els.length; i++) {
          var p = els[i].getAttribute("data-pv-path");
          if (d.pvs[p] !== undefined) {
            // 结构含内层数字节点（归档时间线「-- 阅读」胶囊）时只填数字，否则整块填充
            var num = els[i].querySelector("[data-pv-num]") || els[i];
            num.textContent = fmt(d.pvs[p]);
          }
        }
      })
      .catch(function () {});
  }

  function start() { go(); batch(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
