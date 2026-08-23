/* eslint-disable react-refresh/only-export-components */
export const SITE_URL = 'https://www.shareholdervoting.in';

/**
 * 1. Organization Schema (Single Source of Truth)
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Vote India Secure',
  alternateName: ['Vote India Secure Platform', 'ShareholderVoting.in'],
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: '512',
    height: '512',
    caption: 'Vote India Secure Logo',
  },
  image: `${SITE_URL}/og-image.jpg`,
  description: 'Secure electronic voting and corporate governance platform for shareholder general meetings, AGMs, EGMs, and resolutions.',
  sameAs: [
    'https://www.linkedin.com/company/vote-india-secure',
    'https://github.com/Arunkumar30102006/SHAREHOLDER-VOTING-PLATFORM',
    'https://twitter.com/VoteIndiaSecure',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@shareholdervoting.in',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
};

/**
 * 2. WebSite Schema with Sitelinks Searchbox
 */
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Vote India Secure',
  alternateName: 'Shareholder Voting Platform India',
  description: 'Secure online shareholder electronic voting platform for AGMs, EGMs, postal ballots, and corporate governance.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-IN',
};

/**
 * 3. SoftwareApplication Schema
 */
export const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vote India Secure',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android (Progressive Web App)',
  url: `${SITE_URL}/`,
  description: 'Cloud platform for statutory electronic shareholder voting, resolution tracking, and scrutinizer audit reporting.',
  softwareVersion: '2.4.0',
  featureList: [
    'Remote E-Voting for AGMs, EGMs, and Postal Ballots',
    'Weighted shareholding ballot calculation',
    'Cryptographic vote integrity (AES-256 and SHA-256)',
    'Independent Scrutinizer digital portal with report generation',
    'Two-Factor Authentication (2FA OTP)',
    'Real-time quorum progression monitoring',
  ],
};

/**
 * Helper: Generate BreadcrumbList Schema
 */
export const createBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
};

/**
 * Helper: Generate FAQPage Schema (Only for pages with visible, complete FAQs)
 */
export const createFaqSchema = (
  faqs: { question: string; answer: string }[]
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Helper: Generate Article Schema
 */
export const createArticleSchema = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = 'Vote India Secure Editorial Team',
  image = `${SITE_URL}/og-image.jpg`,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) => {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    author: {
      '@type': 'Organization',
      name: author,
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vote India Secure',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  };
};

export default {
  organizationSchema,
  webSiteSchema,
  softwareAppSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createArticleSchema,
};
