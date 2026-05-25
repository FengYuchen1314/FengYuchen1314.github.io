import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const themeRoot = path.join(root, 'node_modules', 'hexo-theme-shokax');

const files = [
  path.join(themeRoot, 'source', 'js', '_app', 'pjax', 'siteInit.ts'),
  path.join(themeRoot, 'source', 'js', '_app', 'pjax', 'refresh.ts'),
  path.join(themeRoot, 'scripts', 'generaters', 'script.js'),
];

let patched = 0;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.warn(`skip missing: ${file}`);
    continue;
  }

  const original = fs.readFileSync(file, 'utf8');
  let content = original;

  if (file.endsWith('.ts')) {
    content = content.replace(/__shokax_antiFakeWebsite__/g, 'false');
  }

  if (file.endsWith('script.js')) {
    content = content.replace(
      /__shokax_antiFakeWebsite__:\s*theme\.experiments\.antiFakeWebsite\s*\?\s*"true"\s*:\s*"false"/,
      '__shokax_antiFakeWebsite__: "false"'
    );
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    patched += 1;
    console.log(`patched: ${path.relative(root, file)}`);
  }
}

console.log(patched ? `anti-fake patch: updated ${patched} file(s)` : 'anti-fake patch: already applied');
