const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const IMAGES_DIR = path.join(__dirname, 'images');
const PARCEIROS_DIR = path.join(__dirname, 'parceiros');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint to list images from a directory
  if (req.url === '/api/images' || req.url === '/api/parceiros' || req.url === '/api/all') {
    try {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
      
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
      
      if (req.url === '/api/images') {
        images = getImagesFromDir(IMAGES_DIR, 'images');
      } else if (req.url === '/api/parceiros') {
        images = getImagesFromDir(PARCEIROS_DIR, 'parceiros');
      } else if (req.url === '/api/all') {
        const imagesFromDir = getImagesFromDir(IMAGES_DIR, 'images');
        const parceirosFromDir = getImagesFromDir(PARCEIROS_DIR, 'parceiros');
        images = [...imagesFromDir, ...parceirosFromDir];
        // Shuffle array for random order
        for (let i = images.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [images[i], images[j]] = [images[j], images[i]];
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ images }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read images directory' }));
    }
    return;
  }

  // Static file serving
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Images API: http://localhost:${PORT}/api/images`);
  console.log(`Parceiros API: http://localhost:${PORT}/api/parceiros`);
  console.log(`All (shuffled): http://localhost:${PORT}/api/all`);
});
