import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.shareholdervoting.in';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    type?: string;
    name?: string;
    image?: string;
    schema?: object;
}

export const SEO = ({
    title,
    description,
    canonical,
    type = 'website',
    name = 'Vote India Secure',
    image = '/og-image.jpg',
    schema
}: SEOProps) => {
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
    const fullTitle = canonical === '/' ? title : `${title} | Vote India Secure`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${SITE_URL}${image}`} />
            <meta property="og:site_name" content={name} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@VoteIndiaSecure" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${SITE_URL}${image}`} />

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
