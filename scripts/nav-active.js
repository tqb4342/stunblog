'use strict'

// 导航栏当前页激活态：给匹配当前路径的菜单链接加 .active 类
// 纯前端匹配（Injector 注入到 body 尾部，DOMContentLoaded 后执行）
hexo.extend.injector.register(
  'body_end',
  `<script>
  (function () {
    var cur = location.pathname.replace(/\\/index\\.html$/, '/');
    if (cur !== '/' && cur.slice(-1) !== '/') cur += '/';
    var links = document.querySelectorAll('.header-nav-menu-item__link');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href === 'javascript:;') return;
      try {
        var p = new URL(a.href, location.origin).pathname.replace(/\\/index\\.html$/, '/');
        if (p !== '/' && p.slice(-1) !== '/') p += '/';
        // 根路径仅精确匹配（避免全站高亮首页）；其余前缀匹配
        if (cur === p || (p !== '/' && cur.indexOf(p) === 0)) {
          a.classList.add('active');
        }
      } catch (e) { /* ignore */ }
    });
  })();
  </script>`
)
