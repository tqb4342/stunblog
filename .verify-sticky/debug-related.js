// 调试：逐步打印打分与入选过程
const pug = require('D:/stunblog/node_modules/pug');
const fs = require('fs');

const src = fs.readFileSync('D:/stunblog/themes/stun/layout/_partials/widgets/related-posts.pug', 'utf8');

const mk = (slug, path, title, tags, cats, date, archived) => ({
  slug, path, title, date: new Date(date), archived: !!archived,
  tags: { length: tags.length, each: cb => tags.forEach(cb) },
  categories: { length: cats.length, each: cb => cats.forEach(cb) },
});
const posts = [
  mk('p0', 'p0/', '当前文章', ['A', 'B'], ['C1'], '2026-11-01'),
  mk('p1', 'p1/', '白名单指定文', ['X'], ['C9'], '2026-01-01'),
  mk('p2', 'p2/', '双tag重合', ['A', 'B', 'Z'], ['C1'], '2026-05-01'),
  mk('p3', 'p3/', '单tag重合新', ['A'], ['C2'], '2026-10-01'),
  mk('p4', 'p4/', '单tag重合旧', ['B'], ['C2'], '2026-02-01'),
  mk('p5', 'p5/', '仅同分类', ['Y'], ['C1'], '2026-09-01'),
  mk('p6', 'p6/', '纯同分类兜底', ['W'], ['C1'], '2026-08-01'),
  mk('p7', 'p7/', '完全无关', ['Q'], ['C8'], '2026-07-01'),
  mk('p8', 'p8/', '已归档', ['A'], ['C1'], '2026-06-01'),
];
posts[8].archived = true;

// 手工复现模板逻辑（与 pug 内代码逐行一致），加日志
const page = posts[0];
var relatedPosts = [];
var relatedSeen = {};
var allPostsArr = posts;

var currentTags = {};
var currentCats = [];
if (page.tags && page.tags.length) page.tags.each(t => { currentTags[t.name] = true; });
if (page.categories && page.categories.length) page.categories.each(c => { currentCats.push(c.name); });
console.log('currentTags =', Object.keys(currentTags), '| currentCats =', currentCats);

var scored = [];
allPostsArr.forEach(function (p) {
  if (p.path === page.path || p.archived || relatedSeen[p.path]) return;
  var score = 0;
  if (p.tags && p.tags.length) p.tags.each(t => { if (currentTags[t.name]) score += 3; });
  if (p.categories && p.categories.length) p.categories.each(c => { if (currentCats.indexOf(c.name) !== -1) score += 1; });
  if (score > 0) scored.push({ post: p, score: score });
  console.log(p.title, '→ score', score);
});
scored.sort(function (a, b) {
  if (b.score !== a.score) return b.score - a.score;
  return b.post.date - a.post.date;
});
scored.forEach(function (s) {
  if (relatedPosts.length < 5) { relatedSeen[s.post.path] = true; relatedPosts.push(s.post); }
});
console.log('tier2 后:', relatedPosts.map(p => p.title));

if (relatedPosts.length < 5) {
  allPostsArr.forEach(function (p) {
    if (relatedPosts.length >= 5) return;
    if (p.path === page.path || p.archived || relatedSeen[p.path]) return;
    var hasCommon = false;
    if (p.categories && p.categories.length) {
      p.categories.each(function (c) { if (currentCats.indexOf(c.name) !== -1) hasCommon = true; });
    }
    console.log('tier3 尝试:', p.title, 'hasCommon =', hasCommon);
    if (hasCommon) { relatedSeen[p.path] = true; relatedPosts.push(p); }
  });
}
console.log('最终:', relatedPosts.map(p => p.title));
