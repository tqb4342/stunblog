'use strict'

// Google AdSense：全站 <head> 注入 AdSense 代码段（网站所有权验证 + 自动广告）
// 发布商 ID: ca-pub-2917586537958464
hexo.extend.injector.register(
  'head_end',
  `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2917586537958464" crossorigin="anonymous"></script>`,
  'default'
)
