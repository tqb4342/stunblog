// 侧栏 sticky 吸附验证脚本：数值断言 + 截图
const path = require('path');
const { chromium } = require('C:/Users/庆波/.workbuddy/binaries/node/workspace/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(async () => {
    return chromium.launch({ headless: true }); // msedge 不行就退回自带 chromium
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:4000/accounts-google/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  const before = await page.evaluate(() => {
    const cs = el => el ? getComputedStyle(el) : null;
    const container = cs(document.querySelector('.container'));
    const sticky = cs(document.querySelector('.sidebar-sticky'));
    const sidebarOv = document.querySelector('.sidebar-ov');
    const stickyEl = document.querySelector('.sidebar-sticky');
    return {
      containerOverflow: container.overflow,
      stickyPosition: sticky.position,
      stickyTop: sticky.top,
      sidebarOvHeight: sidebarOv ? Math.round(sidebarOv.getBoundingClientRect().height) : null,
      stickyHeight: stickyEl ? Math.round(stickyEl.getBoundingClientRect().height) : null,
      sidebarCardCount: document.querySelectorAll('.sidebar-ov .sidebar-ov-card').length,
    };
  });
  console.log('[滚动前]', JSON.stringify(before, null, 2));

  // 滚到接近底部（留一点距离，避免页面高度变化影响）
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - window.innerHeight - 50));
  await page.waitForTimeout(600);

  const after = await page.evaluate(() => {
    const stickyEl = document.querySelector('.sidebar-sticky');
    const r = stickyEl.getBoundingClientRect();
    const firstCard = stickyEl.querySelector('.sidebar-ov-card');
    const fr = firstCard ? firstCard.getBoundingClientRect() : null;
    return {
      stickyRectTop: Math.round(r.top),
      stickyRectBottom: Math.round(r.bottom),
      firstCardVisible: fr ? (fr.top >= 0 && fr.top < window.innerHeight) : null,
      firstCardTop: fr ? Math.round(fr.top) : null,
      pageScrollY: Math.round(window.scrollY),
      pageHeight: document.body.scrollHeight,
    };
  });
  console.log('[滚动后]', JSON.stringify(after, null, 2));

  const stuck = after.stickyRectTop >= 60 && after.stickyRectTop <= 80; // 应吸附在 ~70px
  console.log(stuck ? '✔ PASS：sticky 组吸附在 ' + after.stickyRectTop + 'px（预期 ~70px），左侧卡片全程可见' : '✘ FAIL：sticky 组 rect.top=' + after.stickyRectTop + 'px，未吸附');

  await page.screenshot({ path: path.join(__dirname, 'verify-scrolled.png') });

  // 顺带截一张顶部视图，确认侧栏初始形态（卡壳去除后的样子）
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(__dirname, 'verify-top.png') });

  await browser.close();
  console.log('截图已保存: verify-top.png / verify-scrolled.png');
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
