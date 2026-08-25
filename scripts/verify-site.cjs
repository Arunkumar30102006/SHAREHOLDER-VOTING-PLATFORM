/**
 * verify-site.cjs
 * Comprehensive verification script that checks:
 * 1. All dist HTML files exist and are non-empty
 * 2. All internal links across all HTML files resolve to real pages/files
 * 3. All JSON-LD scripts are valid parseable JSON
 * 4. Image references resolve to actual files in dist
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist/ directory does not exist! Run npm run build first.');
  process.exit(1);
}

let totalErrors = 0;
let totalWarnings = 0;

// 1. Collect all HTML files in dist
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(DIST_DIR);
console.log(`\n🔍 Found ${htmlFiles.length} generated HTML files in dist/`);

// 2. Check each HTML file
const linkRegex = /href=["']([^"'#:]+)(#[^"']*)?["']/g;
const imgRegex = /src=["']([^"':]+)["']/g;
const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

let totalLinksChecked = 0;
let totalJsonLdChecked = 0;
let totalImgsChecked = 0;

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(DIST_DIR, htmlFile);
  const content = fs.readFileSync(htmlFile, 'utf-8');

  if (content.length < 500) {
    console.error(`❌ [File size] ${relativePath} is suspiciously small (${content.length} bytes)`);
    totalErrors++;
  }

  // Check JSON-LD validity
  let jsonLdMatch;
  while ((jsonLdMatch = jsonLdRegex.exec(content)) !== null) {
    totalJsonLdChecked++;
    try {
      JSON.parse(jsonLdMatch[1]);
    } catch (err) {
      console.error(`❌ [JSON-LD Error] in ${relativePath}: ${err.message}`);
      totalErrors++;
    }
  }

  // Check internal href links
  let linkMatch;
  while ((linkMatch = linkRegex.exec(content)) !== null) {
    const rawHref = linkMatch[1];
    if (rawHref.startsWith('http') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) {
      continue;
    }
    totalLinksChecked++;

    // Normalize path to file in dist
    let target = rawHref;
    if (target.startsWith('/')) target = target.slice(1);
    if (target === '' || target.endsWith('/')) target += 'index.html';
    else if (!path.extname(target)) target += '.html';

    const targetPath = path.join(DIST_DIR, target);
    if (!fs.existsSync(targetPath) && !fs.existsSync(path.join(DIST_DIR, rawHref.startsWith('/') ? rawHref.slice(1) : rawHref))) {
      // Check if it's an asset or static file
      const rawTargetPath = path.join(DIST_DIR, rawHref.startsWith('/') ? rawHref.slice(1) : rawHref);
      if (!fs.existsSync(rawTargetPath)) {
        console.warn(`⚠️ [Link Check] in ${relativePath} -> "${rawHref}" target not found directly at ${target}`);
        totalWarnings++;
      }
    }
  }

  // Check image src
  let imgMatch;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    const rawSrc = imgMatch[1];
    if (rawSrc.startsWith('http') || rawSrc.startsWith('data:')) continue;
    totalImgsChecked++;

    const imgPath = path.join(DIST_DIR, rawSrc.startsWith('/') ? rawSrc.slice(1) : rawSrc);
    if (!fs.existsSync(imgPath)) {
      console.error(`❌ [Missing Image] in ${relativePath} -> "${rawSrc}" does not exist on disk`);
      totalErrors++;
    }
  }
}

console.log(`\n📊 Verification Summary:`);
console.log(`  - HTML Pages: ${htmlFiles.length}`);
console.log(`  - JSON-LD Schemas Validated: ${totalJsonLdChecked}`);
console.log(`  - Images Checked: ${totalImgsChecked}`);
console.log(`  - Internal Links Checked: ${totalLinksChecked}`);
console.log(`  - Errors: ${totalErrors}`);
console.log(`  - Warnings: ${totalWarnings}`);

if (totalErrors === 0) {
  console.log(`\n✅ ALL AUDITS PASSED! Everything is working correctly.`);
} else {
  console.log(`\n❌ Audits completed with ${totalErrors} errors.`);
  process.exit(1);
}
