import { Head } from 'vite-react-ssg';

const SITE_URL = 'https://www.shareholdervoting.in';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  name?: string;
  image?: string;
  keywords?: string;
  schema?: object;
  schemas?: object[];
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  canonical,
  type = 'website',
  name = 'Vote India Secure',
  image = '/og-image.jpg',
  keywords = 'shareholder voting platform, online shareholder voting, AGM e-voting, EGM e-voting, corporate voting software, electronic voting platform India, scrutinizer reporting',
  schema,
  schemas,
  noindex = false,
}: SEOProps) => {
  // Ensure canonical URL is always absolute and normalized
  const canonicalUrl = canonical
    ? (canonical === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`)
    : `${SITE_URL}/`;

  // Prevent duplicate brand name if title already includes it
  const hasBranding = title.includes('Vote India Secure') || title.includes('Vote Secure');
  const fullTitle = hasBranding ? title : `${title} | Vote India Secure`;

  // Full image URL
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  // Merge single schema and schemas array
  const allSchemas: object[] = [];
  if (schema) allSchemas.push(schema);
  if (schemas) allSchemas.push(...schemas);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={name} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${name} Platform`} />
      <meta property="og:site_name" content={name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${name} Platform`} />

      {/* JSON-LD Schemas */}
      {allSchemas.map((s, i) => (
        <script key={`schema-${i}`} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Head>
  );
};

export default SEO;
