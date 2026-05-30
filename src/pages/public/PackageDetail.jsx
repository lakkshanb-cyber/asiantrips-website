import React, { useCallback } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, MessageCircle, XCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { createWhatsAppUrl, packageWhatsAppMessage } from '@/lib/whatsapp';
import { destinationService, packageService } from '@/services/cmsService';
import { useAsyncData } from '@/hooks/useAsyncData';

const PackageDetail = () => {
  const { slug } = useParams();
  const loadPackage = useCallback(() => packageService.getBySlug(slug), [slug]);
  const loadDestinations = useCallback(() => destinationService.published(), []);
  const { data: pkg, isLoading, error } = useAsyncData(loadPackage, null);
  const { data: destinations } = useAsyncData(loadDestinations, []);
  if (!isLoading && !pkg && !error) return <Navigate to="/packages" replace />;
  const destinationName = destinations.find((destination) => destination.id === pkg?.destinationId)?.name || 'Custom';

  const jsonLd = pkg ? {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.overview,
    image: pkg.gallery?.[0],
    url: `${SITE.baseUrl}/packages/${pkg.slug}`,
    touristType: 'Families, couples, and small groups',
    itinerary: pkg.itinerary?.map((day, index) => ({ '@type': 'ListItem', position: index + 1, name: `Day ${index + 1}`, description: day })),
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: pkg.price, availability: 'https://schema.org/InStock' },
  } : null;

  return (
    <>
      <SEO title={pkg?.seoTitle || pkg?.title || 'Package'} description={pkg?.seoDescription || pkg?.overview || 'AsianTrips Holidays package.'} path={`/packages/${slug}`} image={pkg?.gallery?.[0]} jsonLd={jsonLd} />
      <main>
        {isLoading && <section className="mx-auto max-w-7xl px-4 py-16 text-slate-500">Loading package...</section>}
        {error && <section className="mx-auto max-w-7xl px-4 py-16 text-red-600">{error}</section>}
        {pkg && <>
          <section className="relative min-h-[520px] bg-slate-900 text-white">
            <img src={pkg.gallery?.[0]} alt={pkg.title} className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="relative mx-auto max-w-7xl px-4 py-24">
              <Link to="/packages" className="text-sm text-orange-200">← Back to packages</Link>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold md:text-6xl">{pkg.title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-blue-50">{pkg.overview}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/15 px-4 py-2">{destinationName}</span>
                <span className="rounded-full bg-white/15 px-4 py-2">{pkg.duration}</span>
                <span className="rounded-full bg-orange-500 px-4 py-2 font-semibold">₹{Number(pkg.price).toLocaleString('en-IN')}+ per person</span>
              </div>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_420px]">
            <div className="space-y-10">
              <div><h2 className="text-3xl font-bold">Overview</h2><p className="mt-3 text-slate-600">{pkg.overview}</p></div>
              <div><h2 className="text-3xl font-bold">Itinerary</h2><ol className="mt-4 space-y-3">{pkg.itinerary.map((day, index) => <li key={day} className="rounded-xl border p-4"><strong>Day {index + 1}:</strong> {day}</li>)}</ol></div>
              <div className="grid gap-6 md:grid-cols-2">
                <div><h2 className="text-2xl font-bold">Inclusions</h2><ul className="mt-4 space-y-2">{pkg.inclusions.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" />{item}</li>)}</ul></div>
                <div><h2 className="text-2xl font-bold">Exclusions</h2><ul className="mt-4 space-y-2">{pkg.exclusions.map((item) => <li key={item} className="flex gap-2"><XCircle className="h-5 w-5 text-red-500" />{item}</li>)}</ul></div>
              </div>
            </div>
            <aside className="h-fit rounded-3xl border bg-white p-6 shadow-xl">
              <h2 className="text-2xl font-bold">Request this package</h2>
              <p className="mb-5 mt-2 text-sm text-slate-600">Inquiry will be stored in Supabase.</p>
              <QuoteForm sourceType="package_inquiry" packageId={pkg.id} initialDestination={destinationName} compact />
              <a onClick={() => trackEvent('whatsapp_click', { package_slug: pkg.slug })} href={createWhatsAppUrl({ message: packageWhatsAppMessage(pkg) })} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-700"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp {SITE.phoneDisplay}</a>
            </aside>
          </section>
        </>}
      </main>
      <Footer />
    </>
  );
};

export default PackageDetail;
