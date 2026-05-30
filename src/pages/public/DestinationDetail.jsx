import React, { useCallback } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { createWhatsAppUrl, destinationWhatsAppMessage } from '@/lib/whatsapp';
import { destinationService, packageService } from '@/services/cmsService';
import { useAsyncData } from '@/hooks/useAsyncData';

const DestinationDetail = () => {
  const { slug } = useParams();
  const loadDestination = useCallback(() => destinationService.getBySlug(slug), [slug]);
  const loadPackages = useCallback(() => packageService.published(), []);
  const { data: destination, isLoading, error } = useAsyncData(loadDestination, null);
  const { data: allPackages } = useAsyncData(loadPackages, []);
  if (!isLoading && !destination && !error) return <Navigate to="/destinations" replace />;
  const packages = destination ? allPackages.filter((pkg) => pkg.destinationId === destination.id) : [];
  const jsonLd = destination ? {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.seoDescription || destination.shortDescription,
    image: destination.heroImage,
    url: `${SITE.baseUrl}/destinations/${destination.slug}`,
    touristType: 'Himalayan leisure travelers',
  } : null;

  return (
    <>
      <SEO title={destination?.seoTitle || destination?.name || 'Destination'} description={destination?.seoDescription || destination?.shortDescription || 'AsianTrips Holidays destination guide.'} path={`/destinations/${slug}`} image={destination?.heroImage} jsonLd={jsonLd} />
      <main>
        {isLoading && <section className="mx-auto max-w-7xl px-4 py-16 text-slate-500">Loading destination...</section>}
        {error && <section className="mx-auto max-w-7xl px-4 py-16 text-red-600">{error}</section>}
        {destination && <>
          <section className="relative bg-slate-900 text-white">
            <img src={destination.heroImage} alt={destination.name} className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="relative mx-auto max-w-7xl px-4 py-24">
              <Link to="/destinations" className="text-sm text-orange-200">← Back to destinations</Link>
              <h1 className="mt-6 text-5xl font-bold">{destination.name}</h1>
              <p className="mt-5 max-w-2xl text-lg text-blue-50">{destination.description}</p>
              <p className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-2"><Calendar className="mr-2 h-5 w-5" /> Best time: {destination.bestTime}</p>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="text-3xl font-bold">Highlights</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">{destination.highlights.map((highlight) => <div key={highlight} className="rounded-xl border bg-white p-4 shadow-sm">{highlight}</div>)}</div>
              <h2 className="mt-12 text-3xl font-bold">Related packages</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">{packages.map((pkg) => <Link key={pkg.id} to={`/packages/${pkg.slug}`} className="rounded-xl border p-5 shadow-sm hover:border-orange-300"><p className="font-bold">{pkg.title}</p><p className="text-sm text-slate-500">{pkg.duration} · ₹{Number(pkg.price).toLocaleString('en-IN')}+</p></Link>)}</div>
            </div>
            <aside className="h-fit rounded-3xl border bg-orange-50 p-6">
              <h3 className="text-2xl font-bold">Plan {destination.name}</h3>
              <p className="mt-2 text-slate-600">Ask for hotels, route, permits, and realistic travel timing.</p>
              <Button asChild className="mt-5 w-full bg-orange-500 hover:bg-orange-600"><a href={createWhatsAppUrl({ message: destinationWhatsAppMessage(destination) })} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp now</a></Button>
            </aside>
          </section>
        </>}
      </main>
      <Footer />
    </>
  );
};

export default DestinationDetail;
