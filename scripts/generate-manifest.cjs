const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const IMAGES_DIR = path.join(rootDir, 'images');
const PARCEIROS_DIR = path.join(rootDir, 'parceiros');
const OUTPUT = path.join(rootDir, 'public', 'images.json');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

function listImages(dir, source) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .map(file => ({
      filename: file,
      name: path.basename(file, path.extname(file)).replace(/[-_]/g, ' '),
      path: `${source}/${file}`,
      source
    }));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const images = shuffle(listImages(IMAGES_DIR, 'images'));
const parceiros = shuffle(listImages(PARCEIROS_DIR, 'parceiros'));

const all = [];
let useImages = true;

while (images.length > 0 || parceiros.length > 0) {
  if (useImages && images.length > 0) {
    all.push(images.shift());
  } else if (!useImages && parceiros.length > 0) {
    all.push(parceiros.shift());
  } else if (images.length > 0) {
    all.push(images.shift());
  } else if (parceiros.length > 0) {
    all.push(parceiros.shift());
  }
  useImages = !useImages;
}

fs.writeFileSync(OUTPUT, JSON.stringify({ images: all }, null, 2));
console.log(`Gerado images.json com ${all.length} imagens (alternando images/ <-> parceiros/)`);
