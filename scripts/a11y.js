'use strict'

// 无障碍增强：
// 1) role="button"/"switch" 的 div/span（菜单抽屉/搜索/夜间开关/关闭按钮）键盘可达——Enter/Space 触发 click
// 2) 夜间模式开关 aria-checked 与视觉状态（.mode--checked 类）保持同步，供屏幕阅读器播报
hexo.extend.injector.register('body_end', () => {
  return `<script>
(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target;
    if (!el || !el.getAttribute) return;
    var role = el.getAttribute('role');
    if (role === 'button' || role === 'switch') {
      e.preventDefault();
      el.click();
    }
  });

  var mode = document.querySelector('.mode');
  if (mode) {
    var syncMode = function () {
      mode.setAttribute('aria-checked', mode.classList.contains('mode--checked') ? 'true' : 'false');
    };
    syncMode();
    mode.addEventListener('click', function () { setTimeout(syncMode, 0); });
  }
})();
</script>`;
});
