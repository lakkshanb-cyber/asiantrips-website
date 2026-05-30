import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter, MapPin, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { destinationService, packageService } from '@/services/cmsService';
import { useAsyncData } from '@/hooks/useAsyncData';

const Packages = () => {
  const [query, setQuery] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const loadDestinations = useCallback(() => destinationService.published(), []);
  const loadPackages = useCallback(() => packageService.published(), []);
  const { data: destinations, error: destinationError } = useAsyncData(loadDestinations, []);
  const { data: packages, isLoading, error: packageError } = useAsyncData(loadPackages, []);
  const destinationNames = useMemo(() => Object.fromEntries(destinations.map((destination) => [destination.id, destination.name])), [destinations]);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AsianTrips Holidays tour packages',
    itemListElement: packages.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'TouristTrip', name: pkg.title, url: `${SITE.baseUrl}/packages/${pkg.slug}` },
    })),
  };

  const filtered = useMemo(() => packages.filter((pkg) => {
    const matchesQuery = [pkg.title, pkg.overview, pkg.category].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesDestination = !destinationId || pkg.destinationId === destinationId;
    return matchesQuery && matchesDestination;
  }), [packages, query, destinationId]);

  return (
    <>
      <SEO title="Tour Packages" description="Search AsianTrips Holidays packages for Sikkim, Darjeeling, Bhutan, Northeast India, and Nepal." path="/packages" jsonLd={jsonLd} />
      <main>
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-orange-500 px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Dynamic packages</p>
            <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">Find honest, customizable Himalayan tour packages.</h1>
            <p className="mt-6 max-w-2xl text-lg text-blue-50">Package records load from Supabase through the CMS service layer.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 rounded-2xl border bg-white p-4 shadow-lg md:grid-cols-[1fr_260px]">
            <label className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by package, theme, or destination..." className="h-12 w-full rounded-xl border pl-10 pr-4 outline-none focus:border-orange-400" />
            </label>
            <label className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <select value={destinationId} onChange={(event) => setDestinationId(event.target.value)} className="h-12 w-full rounded-xl border pl-10 pr-4 outline-none focus:border-orange-400">
                <option value="">All destinations</option>
                {destinations.map((destination) => <option key={destination.id} value={destination.id}>{destination.name}</option>)}
              </select>
            </label>
          </div>
          {(destinationError || packageError) && <p className="mt-4 text-red-600">{destinationError || packageError}</p>}
        </section>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p className="text-slate-500">Loading packages...</p>}
          {filtered.map((pkg) => (
            <article key={pkg.id} className="overflow-hidden rounded-3xl border bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <img src={pkg.gallery?.[0]} alt={pkg.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {destinationNames[pkg.destinationId] || 'Custom'}</span>
                  {pkg.featured && <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-orange-700"><Star className="h-3 w-3" /> Featured</span>}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{pkg.title}</h2>
                <p className="mt-3 line-clamp-3 text-slate-600">{pkg.overview}</p>
                <div className="mt-5 flex items-center justify-between border-t pt-5">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-600"><Clock className="h-4 w-4" /> {pkg.duration}</span>
                  <span className="font-bold text-orange-600">₹{Number(pkg.price).toLocaleString('en-IN')}+</span>
                </div>
                <Button asChild className="mt-5 w-full bg-orange-500 hover:bg-orange-600"><Link to={`/packages/${pkg.slug}`}>View Details</Link></Button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Packages;
