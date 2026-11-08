// 离线渲染验证 related-posts.pug 三级逻辑
const pug = require('D:/stunblog/node_modules/pug');
const fs = require('fs');

const src = fs.readFileSync('D:/stunblog/themes/stun/layout/_partials/widgets/related-posts.pug', 'utf8');
const fn = pug.compile(src, { filename: 'related-posts.pug', basedir: 'D:/stunblog/themes/stun/layout' });

// mock：6 篇文章。当前页 = P0（tags: A,B；cat: C1）
const mk = (slug, path, title, tags, cats, date, archived) => ({
  slug, path, title, date: new Date(date), archived: !!archived,
  // Hexo 真实结构：tags/categories 是带 .name 的对象集合
  tags: { length: tags.length, each: cb => tags.forEach(n => cb({ name: n })) },
  categories: { length: cats.length, each: cb => cats.forEach(n => cb({ name: n })) },
});
const posts = [
  mk('p0', 'p0/', '当前文章', ['A', 'B'], ['C1'], '2026-11-01'),
  mk('p1', 'p1/', '白名单指定文', ['X'], ['C9'], '2026-01-01'),          // ① 手动指定（不同 tag/cat，只能来自白名单）
  mk('p2', 'p2/', '双tag重合', ['A', 'B', 'Z'], ['C1'], '2026-05-01'),   // ② 3+3+1=7 分
  mk('p3', 'p3/', '单tag重合新', ['A'], ['C2'], '2026-10-01'),           // ② 3 分，日期新
  mk('p4', 'p4/', '单tag重合旧', ['B'], ['C2'], '2026-02-01'),           // ② 3 分，日期旧
  mk('p5', 'p5/', '仅同分类', ['Y'], ['C1'], '2026-09-01'),              // ② 1 分（同分类）→ 也走打分级
  mk('p6', 'p6/', '纯同分类兜底', ['W'], ['C1'], '2026-08-01'),          // ② 1 分
  mk('p7', 'p7/', '完全无关', ['Q'], ['C8'], '2026-07-01'),              // 0 分，不应出现
  mk('p8', 'p8/', '已归档', ['A'], ['C1'], '2026-06-01'),                // archived，不应出现
];
posts[8].archived = true;

const locals = {
  site: { posts: { toArray: () => posts } },
  url_for: p => '/' + p,
  date: (d, f) => d.toISOString().slice(0, 10),
  __: s => s,
};

// 场景1：无 related 白名单 → 纯打分+兜底
let html = fn(Object.assign({ page: posts[0] }, locals));
console.log('=== 场景1：无白名单 ===');
console.log(html.match(/post-related__link[^>]*>[^<]+/g).map(s => s.split('>')[1]));

// 场景2：手动白名单（含自定义锚文本）→ 指定文排最前，其余打分补齐
const pageRelated = Object.assign({}, posts[0], { related: ['p1', { slug: 'p7', text: '自定义锚文本：完全无关文' }] });
html = fn(Object.assign({ page: pageRelated }, locals));
console.log('=== 场景2：白名单 p1 + p7(自定义锚文本) ===');
console.log(html.match(/post-related__link[^>]*>[^<]+/g).map(s => s.split('>')[1]));
console.log('p7 链接用自定义文本:', html.includes('自定义锚文本：完全无关文') ? '✔' : '✘');
console.log('p1 排第一:', html.indexOf('p1') < html.indexOf('p2') ? '✔' : '✘');

// 断言
const titles1 = fn(Object.assign({ page: posts[0] }, locals)).match(/post-related__link[^>]*>[^<]+/g).map(s => s.split('>')[1]);
console.log('---');
console.log('场景1 共', titles1.length, '篇（预期5）:', titles1.length === 5 ? '✔' : '✘');
console.log('双tag重合排第一:', titles1[0] === '双tag重合' ? '✔' : '✘');
console.log('单tag重合新 排在 单tag重合旧 前:', titles1.indexOf('单tag重合新') < titles1.indexOf('单tag重合旧') ? '✔' : '✘');
console.log('完全无关未入选:', !titles1.includes('完全无关') ? '✔' : '✘');
console.log('已归档未入选:', !titles1.includes('已归档') ? '✔' : '✘');
console.log('当前文章未入选:', !titles1.includes('当前文章') ? '✔' : '✘');
console.log('纯同分类兜底入选:', titles1.includes('纯同分类兜底') || titles1.includes('仅同分类') ? '✔（有 1 分打分项占位）' : '✘');
