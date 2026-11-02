import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');

async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImages() {
  console.log('Optimizing images in:', assetsDir);
  const allFiles = await getFiles(assetsDir);
  const imageFiles = allFiles.filter((f) => /\.(png|jpe?g)$/i.test(f));

  console.log(`Found ${imageFiles.length} image files to analyze.`);
  let totalSaved = 0;
  let optimizedCount = 0;

  for (const filePath of imageFiles) {
    try {
      const stat = await fs.promises.stat(filePath);
      const originalSize = stat.size;

      // Only optimize files larger than 120KB
      if (originalSize < 120 * 1024) continue;

      const ext = path.extname(filePath).toLowerCase();
      const meta = await sharp(filePath).metadata();
      const isWide = (meta.width || 0) > 1200 || (meta.height || 0) > 1200;

      let pipeline = sharp(filePath);
      if (isWide) {
        pipeline = pipeline.resize({
          width: 1200,
          height: 1200,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      let optimizedBuf;
      if (ext === '.png') {
        optimizedBuf = await pipeline
          .png({ quality: 80, compressionLevel: 9, effort: 6 })
          .toBuffer();
      } else {
        optimizedBuf = await pipeline
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();
      }

      // Also create a modern webp copy for ultrafast next-gen loading
      const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
      const webpBuf = await sharp(filePath)
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      await fs.promises.writeFile(webpPath, webpBuf);

      if (optimizedBuf.length < originalSize) {
        await fs.promises.writeFile(filePath, optimizedBuf);
        const saved = originalSize - optimizedBuf.length;
        totalSaved += saved;
        optimizedCount++;
        console.log(
          `Optimized: ${path.basename(filePath)} (${(originalSize / 1024).toFixed(0)}KB -> ${(optimizedBuf.length / 1024).toFixed(0)}KB | WebP: ${(webpBuf.length / 1024).toFixed(0)}KB)`
        );
      }
    } catch (err) {
      console.warn(`Could not optimize ${filePath}:`, err.message);
    }
  }

  console.log(`\nDone! Optimized ${optimizedCount} images. Total saved: ${(totalSaved / (1024 * 1024)).toFixed(1)} MB`);
}

optimizeImages();
