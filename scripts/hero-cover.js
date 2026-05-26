'use strict';

// 头图使用随机风景 API，每次加载追加时间戳避免浏览器缓存同一张图
const HERO_API = 'https://api.fuchenboke.cn/api/fengjing.php';

const script = `<script>
(function(){
  var api = ${JSON.stringify(HERO_API)};
  function refresh() {
    var img = document.querySelector('#header #imgs img');
    if (img) img.src = api + (api.indexOf('?') >= 0 ? '&' : '?') + 't=' + Date.now();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();
</script>`;

hexo.extend.injector.register('body_end', script, 'default');
