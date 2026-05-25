'use strict';

const guard = `<script>(function(){var block=function(m){return typeof m==="string"&&(m.indexOf("\\u4eff\\u5192")!==-1||m.indexOf("fake website")!==-1);};var alert0=window.alert;window.alert=function(m){if(block(m))return;alert0.apply(window,arguments);};})();</script>`;

hexo.extend.injector.register('head_begin', guard, 'default');
