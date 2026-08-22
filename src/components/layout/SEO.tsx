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
    keywords = 'SEBI compliant evoting, shareholder voting platform India, AGM e-voting, postal ballot, Companies Act 2013 evoting, corporate governance software',
    schema,
    schemas,
    noindex = false,
}: SEOProps) => {
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
    
    // Prevent duplicate branding if title already contains brand name
    const hasBranding = title.includes('Vote India Secure') || title.includes('Vote Secure');
    const fullTitle = hasBranding || canonical === '/' ? title : `${title} | Vote India Secure`;

    // Merge single schema and schemas array
    const allSchemas: object[] = [];
    if (schema) allSchemas.push(schema);
    if (schemas) allSchemas.push(...schemas);

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonicalUrl} />

            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:locale" content="en_IN" />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${SITE_URL}${image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${name} Platform`} />
            <meta property="og:site_name" content={name} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@VoteIndiaSecure" />
            <meta name="twitter:site" content="@VoteIndiaSecure" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${SITE_URL}${image}`} />
            <meta name="twitter:image:alt" content={`${name} Platform`} />

            {/* JSON-LD Schemas */}
            {allSchemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Head>
    );
};

export default SEO;
