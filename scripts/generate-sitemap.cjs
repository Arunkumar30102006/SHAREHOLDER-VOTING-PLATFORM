/**
 * generate-sitemap.cjs
 * 
 * Post-build script that generates dist/sitemap.xml and public/sitemap.xml
 * with all public routes adhering to specific priorities, change frequencies, and dates.
 * 
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.shareholdervoting.in';
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

const routeEntries = [
  // Homepage
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-08-23' },

  // Service Pages
  { path: '/shareholder-voting', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/agm-voting', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/egm-voting', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/online-e-voting', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/corporate-voting', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-23' },

  // Info Pages
  { path: '/compliance', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/security', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/how-it-works', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/services', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/pricing', priority: '0.8', changefreq: 'weekly', lastmod: '2026-08-23' },

  // Conversion Pages
  { path: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/company-register', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-23' },
  { path: '/live-demo', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-23' },

  // Content
  { path: '/blog', priority: '0.6', changefreq: 'weekly', lastmod: '2026-08-23' },

  // Legal
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-01' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-01' },
];

const urlEntries = routeEntries.map(({ path: routePath, priority, changefreq, lastmod }) => {
  const loc = routePath === '/' ? SITE_URL + '/' : SITE_URL + routePath;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}

if (fs.existsSync(PUBLIC_DIR)) {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}

console.log(`✅ sitemap.xml generated with ${routeEntries.length} URLs → dist/sitemap.xml & public/sitemap.xml`);
