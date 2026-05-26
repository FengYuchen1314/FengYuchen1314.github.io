'use strict';

// Shokax 前端 bundle 未读取 modules.visibilityListener，仅改 yml 不会生效
hexo.extend.injector.register('head_begin', `<script>
(function () {
  document.addEventListener('visibilitychange', function (e) {
    e.stopImmediatePropagation();
  }, true);
})();
</script>`, 'default');
