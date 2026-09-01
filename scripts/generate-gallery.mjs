import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryDirectory = path.join(projectRoot, 'public', 'assets', 'gallery');
const dataDirectory = path.join(projectRoot, 'public', 'data');
const outputFile = path.join(dataDirectory, 'gallery.json');
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);

await mkdir(galleryDirectory, { recursive: true });
await mkdir(dataDirectory, { recursive: true });

const files = (await readdir(galleryDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const humaniseFilename = (filename) => {
  const withoutExtension = filename.replace(/\.[^.]+$/, '');
  const withoutOrderingPrefix = withoutExtension.replace(/^\d+[\s._-]*/, '');
  const words = withoutOrderingPrefix.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();

  if (!words) return 'Umnotho Hygiene service photo';
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const gallery = files.map((filename, index) => ({
  id: index + 1,
  filename,
  src: `assets/gallery/${encodeURIComponent(filename)}`,
  alt: humaniseFilename(filename),
  caption: humaniseFilename(filename)
}));

await writeFile(outputFile, `${JSON.stringify(gallery, null, 2)}\n`, 'utf8');

console.log(`Generated ${path.relative(projectRoot, outputFile)} with ${gallery.length} image${gallery.length === 1 ? '' : 's'}.`);
