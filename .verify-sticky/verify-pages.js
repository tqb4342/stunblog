// 回归检查：归档/分类/标签/关于/首页 —— 滚动前后页面高度不变（无闪跳）+ 侧栏卡片可见
const { chromium } = require('C:/Users/庆波/.workbuddy/binaries/node/workspace/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ headless: true }));
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const pages = ['/', '/archives/', '/categories/', '/tags/', '/about/', '/codex-install-guide/'];

  for (const p of pages) {
    try {
      await page.goto('http://localhost:4000' + p, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(500);
      const h0 = await page.evaluate(() => document.body.scrollHeight);
      // 滚到中部再回顶，模拟用户滚动
      await page.evaluate(() => window.scrollTo(0, Math.min(1200, document.body.scrollHeight)));
      await page.waitForTimeout(300);
      const mid = await page.evaluate(() => {
        const el = document.querySelector('.sidebar-sticky');
        const card = document.querySelector('.sidebar-sticky .sidebar-ov-card');
        return {
          h: document.body.scrollHeight,
          stickyTop: el ? Math.round(el.getBoundingClientRect().top) : null,
          cardVisible: card ? (card.getBoundingClientRect().bottom > 70) : false,
          jsStickyClass: !!document.querySelector('#sidebar.sidebar--sticky'),
        };
      });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      const hEnd = await page.evaluate(() => document.body.scrollHeight);
      const noJump = h0 === mid.h && mid.h === hEnd;
      console.log(
        p.padEnd(22),
        noJump ? '✔无闪跳' : '✘高度变化 ' + h0 + '→' + mid.h + '→' + hEnd,
        '| 滚动中卡片可见:', mid.cardVisible ? '✔' : '✘',
        '| stickyTop:', mid.stickyTop
      );
    } catch (e) {
      console.log(p.padEnd(22), 'ERROR:', e.message.slice(0, 80));
    }
  }
  await browser.close();
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
