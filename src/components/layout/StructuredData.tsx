/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Head } from 'vite-react-ssg';

const SITE_URL = 'https://www.shareholdervoting.in';

/**
 * 1. Organization Schema
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Vote India Secure',
  alternateName: ['Vote Secure', 'Shareholder Voting Platform India'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: '512',
    height: '512',
    caption: 'Vote India Secure Logo',
  },
  image: `${SITE_URL}/og-image.jpg`,
  description: 'Enterprise-grade electronic voting and corporate governance platform for Indian listed companies, unlisted enterprises, and RTAs.',
  sameAs: [
    'https://www.linkedin.com/company/vote-india-secure',
    'https://github.com/Arunkumar30102006/SHAREHOLDER-VOTING-PLATFORM',
    'https://twitter.com/VoteIndiaSecure',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-1800-VOTE-SECURE',
      contactType: 'customer support',
      email: 'support@shareholdervoting.in',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
};

/**
 * 2. WebSite Schema with SearchAction
 */
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'eVote Secure',
  alternateName: 'eVote Secure',
  description: 'Secure, transparent, and SEBI-compliant shareholder electronic voting platform for AGMs, EGMs, and postal ballots.',
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
  url: SITE_URL,
  description: 'Enterprise cloud platform for statutory electronic voting, resolution tracking, and scrutinizer audit reporting built for Indian listed corporations and RTAs.',
  softwareVersion: '2.4.0',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '15000',
    highPrice: '150000',
    offerCount: '3',
    offers: [
      {
        '@type': 'Offer',
        name: 'Single Meeting Tier (AGM / EGM)',
        price: '15000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Annual Corporate Tier',
        price: '45000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Enterprise / RTA Multi-Company Tier',
        price: '120000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
      },
    ],
  },
  featureList: [
    'SEBI-compliant e-voting (LODR Regulation 44)',
    'Companies Act 2013 Section 108 Compliance',
    'End-to-end encryption (AES-256 & SHA-256)',
    'AGM/EGM & Postal Ballot support',
    'Immutable cryptographic audit trail & Merkle proof',
    'Real-time quorum progression analytics',
    'Independent scrutinizer digital portal with 1-click reports',
    'Multi-factor authentication (2FA OTP & Biometric)',
  ],
};

/**
 * 4. FAQPage Schema (5 Statutory & Operational Questions for Indian Listed Companies)
 */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is e-voting mandatory under the Companies Act 2013 and SEBI regulations for Indian companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under Section 108 of the Companies Act 2013 read with Rule 20 of the Companies (Management and Administration) Rules 2014, every listed company and companies with 1,000 or more shareholders must provide e-voting facility to their members. Furthermore, Regulation 44 of SEBI (Listing Obligations and Disclosure Requirements) Regulations 2015 mandates remote e-voting facility for all shareholder general meetings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does remote e-voting work during an Annual General Meeting (AGM) or EGM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The issuer company configures the meeting schedule and resolutions on the platform and syncs the depository benpos (NSDL/CDSL). Shareholders receive secure access credentials via email/SMS. During the voting window (typically open for at least 3 days prior to the AGM), shareholders log in via 2-Factor OTP authentication and cast weighted ballots corresponding to their shareholding. Once cast, votes are cryptographically sealed and cannot be modified.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vote India Secure guarantee vote integrity and prevent tampering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vote India Secure enforces military-grade AES-256 encryption at rest and in transit. Each ballot is hashed using SHA-256 and anchored to an immutable Merkle tree audit ledger. Even database administrators cannot alter votes. At meeting conclusion, only the designated independent Scrutinizer can unblock the encrypted ballots using digital signature verification.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Scrutinizer access the platform and submit statutory reports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Independent Scrutinizers (practicing Company Secretaries or Chartered Accountants) receive dedicated portal access. After the e-voting window closes, the scrutinizer unblocks the electronic votes in the presence of at least two independent witnesses, verifies the counts, and auto-generates Form MGT-13 and SEBI LODR Regulation 44 compliant voting result reports in 1-click.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the pricing options for conducting shareholder e-voting on Vote India Secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing starts at ₹15,000 for single meetings (AGM/EGM/Postal Ballot) with full scrutinizer support, ₹45,000 for annual unlimited corporate plans, and customized volume pricing for RTAs (Registrar and Transfer Agents) managing multi-company registries. All plans include 2FA OTP delivery, live quorum tracking, and statutory compliance assistance.',
      },
    },
  ],
};

interface StructuredDataProps {
  /**
   * Optional custom schemas to append
   */
  additionalSchemas?: object[];
}

/**
 * <StructuredData />
 * Renders Organization, WebSite (SearchAction), SoftwareApplication,
 * and FAQPage JSON-LD schemas into <head> for Google Rich Results.
 */
export const StructuredData: React.FC<StructuredDataProps> = ({ additionalSchemas = [] }) => {
  const schemas = [
    organizationSchema,
    webSiteSchema,
    softwareAppSchema,
    faqSchema,
    ...additionalSchemas,
  ];

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
};

export default StructuredData;
