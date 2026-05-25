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

function imageUrlHelper(img, path = '') {
  const { statics } = hexo.theme.config;
  const { post_asset_folder } = hexo.config;
  if (img.startsWith('//') || img.startsWith('http')) {
    return img;
  }
  return url_for.call(this, statics + (post_asset_folder ? path : '') + img);
}

function pickCover(item, count, server, list) {
  if (item.cover) {
    return imageUrlHelper.call(this, item.cover, item.path);
  }
  if (item.photos?.length > 0) {
    return imageUrlHelper.call(this, item.photos[0], item.path);
  }
  const fromServer = randomFromServer(count, server);
  if (fromServer) return fromServer;
  return randomFromList(count || 1, list);
}

hexo.extend.helper.register('_cover', function (item, num) {
  const { image_server, image_list } = hexo.theme.config;
  return pickCover.call(this, item, num || 1, image_server, image_list);
});

hexo.extend.helper.register('_cover_index', function (item) {
  const { index_image_server, image_server, image_list, index_images } = hexo.theme.config;
  const server = index_image_server || image_server;
  const list = index_images?.length ? index_images : image_list;
  return pickCover.call(this, item, 6, server, list);
});
