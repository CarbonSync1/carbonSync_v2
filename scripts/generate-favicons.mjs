import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE = 'public/carbonsync.png';
const FAVICON_SIZES = [16, 32, 48];
const ICON_SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
];

function squareExtend(image, meta, size) {
  const maxDim = Math.max(meta.width, meta.height);
  const padLeft = Math.round((maxDim - meta.width) / 2);
  const padTop = Math.round((maxDim - meta.height) / 2);
  const padRight = maxDim - meta.width - padLeft;
  const padBottom = maxDim - meta.height - padTop;
  return image.extend({
    left: padLeft,
    top: padTop,
    right: padRight,
    bottom: padBottom,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
}

function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  let dataOffset = offset;
  for (const buf of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    entry.writeUInt8(w >= 256 ? 0 : w, 0);
    entry.writeUInt8(h >= 256 ? 0 : h, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(dataOffset, 12);
    dirEntries.push(entry);
    dataOffset += buf.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

async function main() {
  const outDir = 'public';
  const appDir = 'src/app';

  const srcImg = sharp(SOURCE);
  const meta = await srcImg.metadata();
  console.log(`Source: ${SOURCE} (${meta.width}x${meta.height}, ${meta.format})`);

  for (const { name, size } of ICON_SIZES) {
    const outPath = path.join(outDir, name);
    await squareExtend(sharp(SOURCE), meta, size).png().toFile(outPath);
    console.log(`Generated: ${outPath}`);
  }

  const png16 = await squareExtend(sharp(SOURCE), meta, 16).png().toBuffer();
  const png32 = await squareExtend(sharp(SOURCE), meta, 32).png().toBuffer();
  const ico = createIco([png16, png32]);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);
  console.log(`Generated: ${appDir}\\favicon.ico`);

  // Copy 180x180 to app/ as apple-icon.png (Next.js file convention)
  fs.copyFileSync(path.join(outDir, 'apple-touch-icon.png'), path.join(appDir, 'apple-icon.png'));
  console.log(`Generated: ${appDir}\\apple-icon.png`);

  console.log('Done!');
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
