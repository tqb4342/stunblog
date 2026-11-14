'use strict'

// utterances 评论框配色跟随夜间模式（从 footer.custom.text 迁出，footer 精简为两行）
// 脚本无 UI，body_end 注入全站
hexo.extend.injector.register(
  'body_end',
  `<script>
  (function(){
    var t;
    function sync(){
      var f=document.querySelector(".utterances-frame");
      if(!f)return;
      var d=document.documentElement.classList.contains("nightmode");
      f.contentWindow.postMessage({type:"set-theme",theme:d?"github-dark":"github-light"},"https://utteranc.es");
    }
    function retry(n){sync();if(n>0)setTimeout(function(){retry(n-1);},700);}
    new MutationObserver(function(){clearTimeout(t);t=setTimeout(sync,50);}).observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
    window.addEventListener("load",function(){retry(4);});
  })();
  </script>`,
  'default'
)
