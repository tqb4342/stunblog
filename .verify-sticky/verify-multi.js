// 多滚动点验证：sticky 应在大部分行程吸附于 ~70px，仅在页面最底端被包含块底边顶起
const path = require('path');
const { chromium } = require('C:/Users/庆波/.workbuddy/binaries/node/workspace/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ headless: true }));
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:4000/accounts-google/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  const maxScroll = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  const stops = [0, 600, 1500, 3000, 4500, 6000, maxScroll];
  const results = [];
  for (const y of stops) {
    await page.evaluate(v => window.scrollTo(0, v), y);
    await page.waitForTimeout(250);
    const r = await page.evaluate(() => {
      const el = document.querySelector('.sidebar-sticky');
      const rect = el.getBoundingClientRect();
      const cards = el.querySelectorAll('.sidebar-ov-card');
      const first = cards[0].getBoundingClientRect();
      return {
        stickyTop: Math.round(rect.top),
        visibleCards: [...cards].filter(c => {
          const b = c.getBoundingClientRect();
          return b.bottom > 70 && b.top < window.innerHeight;
        }).length,
        totalCards: cards.length,
        firstCardTop: Math.round(first.top),
      };
    });
    results.push({ scrollY: y, ...r });
  }
  console.table(results);
  const mid = results.filter(r => r.scrollY > 0 && r.scrollY < maxScroll);
  const allStuck = mid.every(r => r.stickyTop >= 60 && r.stickyTop <= 80);
  const anyVisible = mid.every(r => r.visibleCards >= 2);
  console.log(allStuck ? '✔ 中途各点吸附正常（60-80px）' : '✘ 中途存在未吸附点');
  console.log(anyVisible ? '✔ 中途各点至少 2 张卡片可见' : '✘ 存在卡片全不可见的滚动点');
  await browser.close();
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
