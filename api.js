const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime'); // Install this package: npm install mime

const router = express.Router();

// Dynamic API endpoint to serve any font file from public/fonts
router.get('/fonts/:fontFileName', (req, res) => {
  const fontFileName = req.params.fontFileName;
  const fontPath = path.join('/app', 'public', 'fonts', fontFileName);

  fs.stat(fontPath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Font file not found.');
      }
      return res.status(500).send('Error serving font file');
    }

    const contentType = mime.getType(fontPath);
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    } else {
      res.setHeader('Content-Type', 'application/octet-stream'); // Default to a generic binary type
    }

    const fontStream = fs.createReadStream(fontPath);
    fontStream.pipe(res);
  });
});

module.exports = router;