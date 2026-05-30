import React, { useCallback, useMemo } from 'react';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { destinationService, galleryService } from '@/services/cmsService';
import { useAsyncData } from '@/hooks/useAsyncData';

const Gallery = () => {
  const loadItems = useCallback(() => galleryService.published(), []);
  const loadDestinations = useCallback(() => destinationService.published(), []);
  const { data: items, isLoading, error } = useAsyncData(loadItems, []);
  const { data: destinations } = useAsyncData(loadDestinations, []);
  const destinationNames = useMemo(() => Object.fromEntries(destinations.map((destination) => [destination.id, destination.name])), [destinations]);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${SITE.name} Destination Gallery`,
    url: `${SITE.baseUrl}/gallery`,
    image: items.map((item) => item.imageUrl),
  };

  return (
    <>
      <SEO title="Gallery" description="AsianTrips Holidays destination gallery." path="/gallery" jsonLd={jsonLd} />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Destination images</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Gallery</h1>
        <p className="mt-3 text-slate-600">Image records are ready for Supabase Storage integration and currently support CMS-managed URLs.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p className="text-slate-500">Loading gallery...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {items.map((item) => (
            <figure key={item.id} className="overflow-hidden rounded-3xl border bg-white shadow-lg">
              <img src={item.imageUrl} alt={item.altText || item.title} className="h-64 w-full object-cover" />
              <figcaption className="p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                {item.destinationId && <p className="text-sm text-slate-500">{destinationNames[item.destinationId] || 'Custom'}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
