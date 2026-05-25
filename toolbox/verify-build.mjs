import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const indexPath = path.join(root, 'public', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Build verification failed: public/index.html not found');
  process.exit(1);
}

const content = fs.readFileSync(indexPath, 'utf8').trim();
if (content.length < 500) {
  console.error('Build verification failed: index.html is empty or too small');
  console.error('ShokaX requires at least 6 images in source/_data/images.yml');
  process.exit(1);
}

console.log('Build verification passed');
