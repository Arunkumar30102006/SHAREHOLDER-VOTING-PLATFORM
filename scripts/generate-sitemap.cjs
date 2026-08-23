/**
 * generate-sitemap.cjs
 * 
 * Post-build script that generates dist/sitemap.xml and public/sitemap.xml
 * with all public indexable routes.
 * 
 * Complies with modern search engine standards:
 * - Only includes <loc> and accurate <lastmod> derived from source git/file revision
 * - Excludes private/authenticated routes
 * 
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = 'https://www.shareholdervoting.in';
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DEFAULT_DATE = '2026-08-23';

// Map each public route to its underlying source component
const routeFileMap = {
  '/': 'src/pages/Index.tsx',
  '/shareholder-voting': 'src/pages/seo/ShareholderVoting.tsx',
  '/online-e-voting': 'src/pages/seo/OnlineEVoting.tsx',
  '/agm-voting': 'src/pages/seo/AgmVoting.tsx',
  '/egm-voting': 'src/pages/seo/EgmVoting.tsx',
  '/corporate-voting': 'src/pages/seo/CorporateVoting.tsx',
  '/secure-voting': 'src/pages/seo/SecureVoting.tsx',
  '/how-it-works': 'src/pages/seo/HowItWorks.tsx',
  '/features': 'src/pages/Features.tsx',
  '/pricing': 'src/pages/Pricing.tsx',
  '/compliance': 'src/pages/Compliance.tsx',
  '/security': 'src/pages/Security.tsx',
  '/about': 'src/pages/About.tsx',
  '/services': 'src/pages/Services.tsx',
  '/blog': 'src/pages/Blog.tsx',
  '/blog/sebi-compliant-evoting-guide': 'src/pages/blog/SebiCompliantEvotingGuide.tsx',
  '/blog/how-online-shareholder-voting-works': 'src/pages/blog/HowOnlineShareholderVotingWorks.tsx',
  '/blog/agm-evoting-vs-physical-meeting': 'src/pages/blog/AgmEvotingVsPhysicalMeeting.tsx',
  '/blog/benefits-electronic-voting-shareholders': 'src/pages/blog/BenefitsElectronicVotingShareholders.tsx',
  '/contact': 'src/pages/Contact.tsx',
  '/demo': 'src/pages/Demo.tsx',
  '/live-demo': 'src/pages/LiveDemo.tsx',
  '/sebi-compliance': 'src/pages/legal/SebiCompliance.tsx',
  '/privacy-policy': 'src/pages/legal/PrivacyPolicy.tsx',
  '/terms-of-service': 'src/pages/legal/TermsOfService.tsx',
  '/data-protection': 'src/pages/legal/DataProtection.tsx',
};

function getLastModDate(relFilePath) {
  const fullPath = path.resolve(ROOT_DIR, relFilePath);
  if (!fs.existsSync(fullPath)) return DEFAULT_DATE;

  try {
    const gitDate = execSync(`git log -1 --format=%cs -- "${fullPath}"`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    if (gitDate && /^\d{4}-\d{2}-\d{2}$/.test(gitDate)) {
      return gitDate;
    }
  } catch {
    // Fallback to file system stat if git command fails
  }

  try {
    const stat = fs.statSync(fullPath);
    return stat.mtime.toISOString().split('T')[0];
  } catch {
    return DEFAULT_DATE;
  }
}

// Generate XML entries (strictly <loc> and <lastmod>)
const routes = Object.keys(routeFileMap);
const urlEntries = routes.map((routePath) => {
  const loc = routePath === '/' ? SITE_URL + '/' : SITE_URL + routePath;
  const lastmod = getLastModDate(routeFileMap[routePath]);
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

// Write to dist/ and public/
if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}

const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
if (fs.existsSync(PUBLIC_DIR)) {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf-8');
}

console.log(`✅ sitemap.xml generated with ${routes.length} URLs (accurate lastmod) → dist/sitemap.xml & public/sitemap.xml`);


