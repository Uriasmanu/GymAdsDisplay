const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';
  
  if (url === '/api/images' || url === '/api/parceiros' || url === '/api/all') {
    try {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
      
      const IMAGES_DIR = path.join(process.cwd(), 'images');
      const PARCEIROS_DIR = path.join(process.cwd(), 'parceiros');
      
      const getImagesFromDir = (dir, prefix) => {
        if (!fs.existsSync(dir)) return [];
        const files = fs.readdirSync(dir);
        return files
          .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
          })
          .map(file => ({
            filename: file,
            name: path.basename(file, path.extname(file)).replace(/[-_]/g, ' '),
            path: `${prefix}/${file}`,
            source: prefix
          }));
      };

      let images = [];
      
      if (url === '/api/images') {
        images = getImagesFromDir(IMAGES_DIR, 'images');
      } else if (url === '/api/parceiros') {
        images = getImagesFromDir(PARCEIROS_DIR, 'parceiros');
      } else if (url === '/api/all') {
        const imagesFromDir = getImagesFromDir(IMAGES_DIR, 'images');
        const parceirosFromDir = getImagesFromDir(PARCEIROS_DIR, 'parceiros');
        images = [...imagesFromDir, ...parceirosFromDir];
        // Shuffle array for random order
        for (let i = images.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [images[i], images[j]] = [images[j], images[i]];
        }
      }

      res.status(200).json({ images });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read images directory' });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
};
