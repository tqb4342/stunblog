'use strict';

/**
 * SEO：推广/aff 链接自动加 rel="nofollow sponsored"
 * - 防止权重流向推广站（链接农场的常见特征就是 dofollow aff 泛滥）
 * - 符合 Google 付费/推广链接规范（sponsored 属性）
 * - 编辑性外链（trae.io、scamalytics、GitHub 等）保持 dofollow，不误伤
 *
 * 命中域名的链接才处理；已有 nofollow 的不重复加。
 */
var AFF_DOMAINS = /(goingbus\.com|yizhihongxing\.(org|club)|hero-sms\.com)/i;

hexo.extend.filter.register('after_post_render', function seoNofollowFilter(data) {
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

  if (data.content) data.content = addNofollow(data.content);
  if (data.excerpt) data.excerpt = addNofollow(data.excerpt);
  return data;
});
