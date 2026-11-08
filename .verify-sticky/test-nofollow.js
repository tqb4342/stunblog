'use strict';
// 单测 scripts/seo-nofollow.js 的替换逻辑（与脚本内容同步复制）
var AFF_DOMAINS = /(goingbus\.com|yizhihongxing\.(org|club)|hero-sms\.com)/i;

var addNofollow = function (html) {
  if (!html) return html;
  return html.replace(/<a\s+([^>]*?)>/g, function (m, attrs) {
    var hrefMatch = attrs.match(/href="([^"]*)"/);
    if (!hrefMatch) return m;
    if (!AFF_DOMAINS.test(hrefMatch[1])) return m;
    if (/rel="[^"]*nofollow/.test(attrs)) return m;
    if (/rel="([^"]*)"/.test(attrs)) {
      return '<a ' + attrs.replace(/rel="([^"]*)"/, 'rel="nofollow sponsored $1"') + '>';
    }
    return '<a ' + attrs + ' rel="nofollow sponsored">';
  });
};

var tests = [
  ['<p><a href="https://order.yizhihongxing.org/aff.php?aff=4818">一枝红杏</a></p>', true],
  ['<a href="http://cn.goingbus.com/?s=wX0haoloon">环球巴士</a>', true],
  ['<a href="https://hero-sms.com/?ref=1716362">Hero-SMS</a>', true],
  ['<a href="https://order.yizhihongxing.org/index.php?rp=/knowledgebase/27/">知识库</a>', true],
  ['<a href="https://www.trae.cn/">Trae官网</a>', false],
  ['<a href="https://github.com/tqb4342/Open-Internet">GitHub</a>', false],
  ['<a href="/codex-install-guide/">内链</a>', false],
  ['<a href="https://scamalytics.com/ip">Scamalytics</a>', false],
  ['<a href="https://order.yizhihongxing.org/aff.php" rel="noopener">带rel</a>', true],
  ['<a href="https://cn.goingbus.com/" rel="nofollow noopener">已nofollow</a>', false], // 不重复加
];
var pass = 0, fail = 0;
tests.forEach(function (t) {
  var out = addNofollow(t[0]);
  var changed = out !== t[0];
  var ok = changed === t[1] && (!changed || out.indexOf('nofollow sponsored') > -1);
  if (ok) { pass++; }
  else { fail++; console.log('FAIL:', t[0], '\n  →', out); }
});
console.log('nofollow 单测: ' + pass + '/' + tests.length + ' 通过' + (fail ? '，' + fail + ' 个失败' : ''));
