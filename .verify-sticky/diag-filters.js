'use strict';
// 诊断：确认 scripts/seo-nofollow.js 是否被 Hexo 加载、filter 注册顺序
process.chdir('D:/stunblog');
var Hexo = require('D:/stunblog/node_modules/hexo');
var hexo = new Hexo(process.cwd() || 'D:/stunblog', {});

hexo.init().then(function () {
  return hexo.load(); // scripts/ 目录在这里加载
}).then(function () {
  var list = hexo.extend.filter.list();
  var apr = list['after_post_render'] || [];
  console.log('after_post_render filters（按 priority 排序）:');
  apr.forEach(function (f) {
    console.log('  priority=' + f.priority, f.name || 'anonymous');
  });
  var hasNofollow = apr.some(function (f) { return /seoNofollow/i.test(f.name || ''); });
  console.log('\nseo-nofollow 已注册:', hasNofollow ? '✔ 是' : '✘ 否');
  process.exit(0);
}).catch(function (e) {
  console.error('init 失败:', e.message);
  process.exit(1);
});
