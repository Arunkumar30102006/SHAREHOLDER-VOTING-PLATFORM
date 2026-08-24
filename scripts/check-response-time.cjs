const urls = [
  'https://www.shareholdervoting.in/',
  'https://www.shareholdervoting.in/compliance',
  'https://www.shareholdervoting.in/shareholder-voting',
  'https://www.shareholdervoting.in/sitemap.xml',
  'https://www.shareholdervoting.in/robots.txt',
  'https://shareholdervoting.in/' // Non-www redirect check
];

async function measure() {
  console.log('=== Performance & Response Time Benchmark ===');
  for (const url of urls) {
    const start = performance.now();
    try {
      const res = await fetch(url, {
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        }
      });
      const duration = (performance.now() - start).toFixed(2);
      const cache = res.headers.get('x-vercel-cache') || 'N/A';
      const redirectLoc = res.headers.get('location') || '';
      console.log(`[Status: ${res.status}] ${url}`);
      console.log(`  Response Time: ${duration}ms | Vercel Cache: ${cache}${redirectLoc ? ' | Redirect to: ' + redirectLoc : ''}`);
    } catch (e) {
      console.error(`[Error] ${url}: ${e.message}`);
    }
  }
}

measure();
