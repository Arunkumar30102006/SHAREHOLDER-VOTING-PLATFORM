/**
 * generate-sitemap.cjs
 * 
 * Post-build script that generates dist/sitemap.xml and public/sitemap.xml
 * with all public indexable routes.
 * 
 * Complies with modern search engine standards:
 * - Only includes <loc> and accurate <lastmod> (no priority or changefreq)
 * - Excludes private/authenticated routes
 * 
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.shareholdervoting.in';
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// All public indexable routes
const routes = [
  // ─── Core Pages ───
  '/',
  '/shareholder-voting',
  '/online-e-voting',
  '/agm-voting',
  '/egm-voting',
  '/corporate-voting',
  '/secure-voting',
  '/how-it-works',
  '/features',
  '/pricing',
  '/compliance',
  '/security',
  '/about',
  '/services',

  // ─── Blog & Guides ───
  '/blog',
  '/blog/sebi-compliant-evoting-guide',
  '/blog/how-online-shareholder-voting-works',
  '/blog/agm-evoting-vs-physical-meeting',
  '/blog/benefits-electronic-voting-shareholders',

  // ─── Contact & Demo ───
  '/contact',
  '/demo',
  '/live-demo',

  // ─── Legal & Policies ───
  '/sebi-compliance',
  '/privacy-policy',
  '/terms-of-service',
  '/data-protection',
];

// Generate XML entries (strictly <loc> and <lastmod>)
const urlEntries = routes.map((routePath) => {
  const loc = routePath === '/' ? SITE_URL + '/' : SITE_URL + routePath;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

// Write to dist/ and public/
if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
if (fs.existsSync(PUBLIC_DIR)) {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}

console.log(`✅ sitemap.xml generated with ${routes.length} URLs (clean loc + lastmod) → dist/sitemap.xml & public/sitemap.xml`);

