import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function deepMerge(base, override) {
  const result = { ...base };
  for (const [key, value] of Object.entries(override || {})) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

const basePath = path.join(root, 'config', 'shokax.base.yml');
const userPath = path.join(root, 'user.config.yml');
const outputPath = path.join(root, '_config.shokax.yml');

const base = yaml.load(fs.readFileSync(basePath, 'utf8'));
const user = yaml.load(fs.readFileSync(userPath, 'utf8'));
const merged = deepMerge(base, user);

fs.writeFileSync(outputPath, yaml.dump(merged, { lineWidth: -1, noRefs: true }));
console.log('Generated _config.shokax.yml from user.config.yml');
