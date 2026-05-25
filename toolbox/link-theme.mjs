import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve('node_modules/hexo-theme-shokax');
const link = path.resolve('themes/shokax');

if (!fs.existsSync(target)) {
  console.warn('hexo-theme-shokax not installed, skip theme link');
  process.exit(0);
}

fs.mkdirSync(path.dirname(link), { recursive: true });

try {
  const stat = fs.lstatSync(link);
  if (stat.isSymbolicLink() || stat.isDirectory()) {
    process.exit(0);
  }
} catch {
  // link does not exist
}

fs.symlinkSync(target, link, process.platform === 'win32' ? 'junction' : 'dir');
console.log('Linked themes/shokax -> node_modules/hexo-theme-shokax');
