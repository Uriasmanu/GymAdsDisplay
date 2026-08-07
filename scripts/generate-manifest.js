const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const IMAGES_DIR = path.join(rootDir, 'images');
const PARCEIROS_DIR = path.join(rootDir, 'parceiros');
const OUTPUT = path.join(rootDir, 'images.json');

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

const imagesFromDir = listImages(IMAGES_DIR, 'images');
const parceirosFromDir = listImages(PARCEIROS_DIR, 'parceiros');
const all = [...imagesFromDir, ...parceirosFromDir];

for (let i = all.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [all[i], all[j]] = [all[j], all[i]];
}

fs.writeFileSync(OUTPUT, JSON.stringify({ images: all }, null, 2));
console.log(`Gerado images.json com ${all.length} imagens (${imagesFromDir.length} images + ${parceirosFromDir.length} parceiros)`);
