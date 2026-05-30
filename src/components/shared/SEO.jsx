import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE } from '@/lib/constants';

const absoluteUrl = (path = '/') => {
  if (!path) return SITE.baseUrl;
  if (path.startsWith('http')) return path;
  return `${SITE.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const defaultStructuredData = (canonical) => ([
  {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE.name,
    url: SITE.baseUrl,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    address: SITE.address,
    image: absoluteUrl(SITE.defaultOgImage),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.baseUrl}/packages?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    sameAs: [canonical],
  },
]);

const SEO = ({ title, description, path = '/', image = SITE.defaultOgImage, type = 'website', jsonLd }) => {
  const metaDescription = description || SITE.tagline;
  const fullTitle = title?.includes(SITE.name) ? title : `${title || SITE.name} | ${SITE.name}`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image || SITE.defaultOgImage);
  const pageStructuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const structuredData = [...defaultStructuredData(canonical), ...pageStructuredData];

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {structuredData.map((item, index) => <script key={index} type="application/ld+json">{JSON.stringify(item)}</script>)}
    </Helmet>
  );
};

export default SEO;
