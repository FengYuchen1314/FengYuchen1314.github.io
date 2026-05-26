'use strict';

// 覆盖可能缓存的墨绿变量，恢复 Shokax 默认粉红按钮/高亮
const themeColors = `<style id="theme-colors-default">
:root {
  --color-pink: #ed6ea0;
  --color-orange: #ec8c69;
  --color-pink-a3: rgba(237, 110, 160, 0.3);
  --color-red: #e9546b;
  --primary-color: var(--color-red);
}
[data-theme="dark"]:root {
  --color-pink: rgba(241, 139, 179, 0.8);
  --color-orange: rgba(240, 163, 135, 0.8);
  --color-pink-a3: rgba(237, 110, 160, 0.35);
}
</style>`;

hexo.extend.injector.register('head_end', themeColors, 'default');
