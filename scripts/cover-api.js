'use strict';

const { url_for } = require('hexo-util');

function randomFromServer(count, server) {
  if (!server) return null;
  if (count && count > 1) {
    return Array.from({ length: count }, () => server + '?' + Math.floor(Math.random() * 999999));
  }
  return server + '?' + Math.floor(Math.random() * 999999);
}

function randomFromList(count, list) {
  if (!list?.length) {
    throw new Error('image_list must have at least 6 items');
  }
  let shuffled = list.slice();
  while (shuffled.length <= 6) {
    shuffled = shuffled.concat(list.slice());
  }
  let i = shuffled.length;
  const min = i - count;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function imageUrl(img, path = '') {
  const { statics } = hexo.theme.config;
  const { post_asset_folder } = hexo.config;
  if (img.startsWith('//') || img.startsWith('http')) {
    return img;
  }
  return url_for(statics + (post_asset_folder ? path : '') + img);
}

function pickIndexCover(item, count, server, list) {
  if (item.cover) {
    return imageUrl(item.cover, item.path);
  }
  if (item.photos?.length > 0) {
    return imageUrl(item.photos[0], item.path);
  }
  const fromServer = randomFromServer(count, server);
  if (fromServer) return fromServer;
  return randomFromList(count || 1, list);
}

// 仅覆盖站点头图逻辑；文章封面仍走主题默认 _cover
hexo.extend.helper.register('_cover_index', function (item) {
  const { index_image_server, image_list, index_images } = hexo.theme.config;
  const list = index_images?.length ? index_images : image_list;
  return pickIndexCover(item, 6, index_image_server, list);
});
