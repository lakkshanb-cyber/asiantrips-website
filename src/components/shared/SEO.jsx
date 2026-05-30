import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE } from '@/lib/constants';

const absoluteUrl = (path = '/') => {
  if (path.startsWith('http')) return path;
  return `${SITE.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const SEO = ({ title, description, path = '/', image = SITE.defaultOgImage, type = 'website', jsonLd }) => {
  const fullTitle = title?.includes(SITE.name) ? title : `${title || SITE.name} | ${SITE.name}`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || SITE.tagline} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || SITE.tagline} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || SITE.tagline} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
