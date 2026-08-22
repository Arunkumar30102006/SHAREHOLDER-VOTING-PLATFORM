/**
 * generate-sitemap.cjs
 * 
 * Post-build script that generates dist/sitemap.xml with all public routes.
 * Runs automatically after `vite-react-ssg build` via the chained build command.
 * 
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.shareholdervoting.in';
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// All public routes with their SEO priority and change frequency
const routes = [
  // ─── Core Pages ───
  { path: '/',          priority: '1.0', changefreq: 'monthly' },
  { path: '/features',  priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing',   priority: '0.9', changefreq: 'monthly' },
  { path: '/about',     priority: '0.8', changefreq: 'monthly' },
  { path: '/services',  priority: '0.8', changefreq: 'monthly' },
  { path: '/compliance', priority: '0.8', changefreq: 'monthly' },

  // ─── Blog ───
  { path: '/blog',      priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/sebi-compliant-evoting-guide',              priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/how-online-shareholder-voting-works',       priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/agm-evoting-vs-physical-meeting',           priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/benefits-electronic-voting-shareholders',   priority: '0.7', changefreq: 'monthly' },

  // ─── Contact & Demo ───
  { path: '/contact',   priority: '0.7', changefreq: 'yearly' },
  { path: '/demo',      priority: '0.7', changefreq: 'monthly' },
  { path: '/live-demo', priority: '0.7', changefreq: 'monthly' },

  // ─── Legal ───
  { path: '/sebi-compliance',  priority: '0.5', changefreq: 'yearly' },
  { path: '/privacy-policy',   priority: '0.4', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.4', changefreq: 'yearly' },
  { path: '/data-protection',  priority: '0.4', changefreq: 'yearly' },
];

// Generate XML
const urlEntries = routes.map(({ path: routePath, priority, changefreq }) => {
  const loc = routePath === '/' ? SITE_URL + '/' : SITE_URL + routePath;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urlEntries}

</urlset>
`;

// Write to dist/ and public/
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
if (fs.existsSync(PUBLIC_DIR)) {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}
console.log(`✅ sitemap.xml generated with ${routes.length} URLs → dist/sitemap.xml & public/sitemap.xml`);
