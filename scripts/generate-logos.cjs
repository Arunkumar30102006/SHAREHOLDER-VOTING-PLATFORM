/**
 * Logo Optimization Script
 * Run: npx -y sharp-cli resize 48 48 --input public/logo.png --output public/logo-48.webp --format webp
 * 
 * Or run this script with: node scripts/generate-logos.cjs
 * (requires: npm install sharp)
 */

const sharp = require('sharp');
const path = require('path');

const srcLogo = path.join(__dirname, '..', 'public', 'logo.png');
const outDir = path.join(__dirname, '..', 'public');

async function generate() {
  console.log('Generating optimized logo variants from:', srcLogo);

  // Favicon 32x32 PNG
  await sharp(srcLogo)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'favicon-32x32.png'));
  console.log('✅ favicon-32x32.png');

  // Favicon 48x48 PNG
  await sharp(srcLogo)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'favicon-48x48.png'));
  console.log('✅ favicon-48x48.png');

  // Apple Touch Icon 180x180 PNG
  await sharp(srcLogo)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png');

  // WebP 48x48 for Navbar
  await sharp(srcLogo)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(outDir, 'logo-48.webp'));
  console.log('✅ logo-48.webp');

  // WebP 96x96 for Footer / 2x retina
  await sharp(srcLogo)
    .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(outDir, 'logo-96.webp'));
  console.log('✅ logo-96.webp');

  // PWA icon 192x192 PNG
  await sharp(srcLogo)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'logo-192.png'));
  console.log('✅ logo-192.png');

  // PWA icon 512x512 PNG
  await sharp(srcLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'logo-512.png'));
  console.log('✅ logo-512.png');

  console.log('\n🎉 All logo variants generated successfully!');
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
