'use strict';
// 调试：真实跑一遍 after_post_render 管线，看 seoNofollowFilter 的输入输出
process.chdir('D:/stunblog');
var Hexo = require('D:/stunblog/node_modules/hexo');
var hexo = new Hexo(process.cwd() || 'D:/stunblog', {});

hexo.init().then(function () { return hexo.load(); }).then(function () {
  // 找 accounts-google 文章
  var Post = hexo.model('Post');
  var post = Post.findOne({ slug: 'accounts-google' });
  if (!post) { console.log('找不到文章'); process.exit(1); }

  var data = {
    content: post.content,
    excerpt: post.excerpt,
    __post: post
  };
  console.log('--- 原始 content 中 aff 链接形态 ---');
  var m1 = (data.content || '').match(/<a[^>]*(hero-sms|goingbus|yizhihongxing)[^>]*>/g) || [];
  m1.slice(0, 3).forEach(function (x) { console.log('  ', x.substring(0, 140)); });

  // 依次执行 after_post_render filters（列表元素就是函数，带 name/priority 属性）
  var filters = hexo.extend.filter.list()['after_post_render'] || [];
  console.log('\n--- 管线 filter 顺序 ---');
  filters.forEach(function (f) { console.log('  p' + (f.priority || 10), f.name || 'anonymous'); });

  var chain = Promise.resolve(data);
  filters.forEach(function (f) {
    chain = chain.then(function (d) {
      var out = f.call(hexo, d);
      return Promise.resolve(out).then(function (r) { return r || d; });
    });
  });

  return chain.then(function (result) {
    console.log('\n--- 管线跑完后 aff 链接形态 ---');
    var m2 = (result.content || '').match(/<a[^>]*(hero-sms|goingbus|yizhihongxing)[^>]*>/g) || [];
    m2.slice(0, 5).forEach(function (x) { console.log('  ', x.substring(0, 140)); });
    var hasNf = /nofollow/.test((result.content || '').match(/<a[^>]*(hero-sms|goingbus|yizhihongxing)[^>]*>/g) ? result.content : '');
    console.log('\ncontent 含 nofollow:', /nofollow sponsored/.test(result.content) ? '✔' : '✘');
    console.log('excerpt 含 nofollow:', /nofollow sponsored/.test(result.excerpt || '') ? '✔' : '✘');
    process.exit(0);
  });
}).catch(function (e) {
  console.error('失败:', e.stack || e.message);
  process.exit(1);
});
