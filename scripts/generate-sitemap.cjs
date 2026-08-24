/**
 * generate-sitemap.cjs
 * 
 * Post-build script that generates dist/sitemap.xml and public/sitemap.xml
 * with all canonical public routes.
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
  { path: '/', lastmod: '2026-08-24' },

  // E-Voting Solutions
  { path: '/shareholder-voting', lastmod: '2026-08-24' },
  { path: '/remote-e-voting', lastmod: '2026-08-24' },
  { path: '/agm-voting', lastmod: '2026-08-24' },
  { path: '/egm-voting', lastmod: '2026-08-24' },
  { path: '/online-e-voting', lastmod: '2026-08-24' },
  { path: '/corporate-voting', lastmod: '2026-08-24' },

  // Trust, Security & Compliance
  { path: '/compliance', lastmod: '2026-08-24' },
  { path: '/security', lastmod: '2026-08-24' },
  { path: '/how-it-works', lastmod: '2026-08-24' },
  { path: '/faqs', lastmod: '2026-08-24' },
  { path: '/about', lastmod: '2026-08-24' },
  { path: '/services', lastmod: '2026-08-24' },
  { path: '/pricing', lastmod: '2026-08-24' },

  // Interactive & Contact
  { path: '/contact', lastmod: '2026-08-24' },
  { path: '/company-register', lastmod: '2026-08-24' },
  { path: '/live-demo', lastmod: '2026-08-24' },

  // Blog & Educational Regulatory Analysis
  { path: '/blog', lastmod: '2026-08-24' },
  { path: '/blog/sebi-compliant-evoting-guide', lastmod: '2026-08-24' },
  { path: '/blog/role-of-scrutinizer-form-mgt-13', lastmod: '2026-08-24' },
  { path: '/blog/agm-remote-evoting-timeline-checklist', lastmod: '2026-08-24' },
  { path: '/blog/how-online-shareholder-voting-works', lastmod: '2026-08-24' },
  { path: '/blog/agm-evoting-vs-physical-meeting', lastmod: '2026-08-24' },
  { path: '/blog/benefits-electronic-voting-shareholders', lastmod: '2026-08-24' },

  // Legal
  { path: '/privacy-policy', lastmod: '2026-08-01' },
  { path: '/terms-of-service', lastmod: '2026-08-01' },
];

const urlEntries = routeEntries.map(({ path: routePath, lastmod }) => {
  const loc = routePath === '/' ? SITE_URL + '/' : SITE_URL + routePath;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
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
