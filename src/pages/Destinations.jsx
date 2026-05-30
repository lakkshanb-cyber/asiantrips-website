import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { destinationService } from '@/services/cmsService';

const Destinations = () => {
  const destinations = destinationService.published();

  return (
    <>
      <SEO title="Destinations" description="Explore AsianTrips Holidays destination guides for Sikkim, Darjeeling, Bhutan, Northeast India, and Nepal." path="/destinations" />
      <main>
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-orange-500 px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Destination CMS</p>
            <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">Explore editable destination landing pages.</h1>
            <p className="mt-6 max-w-2xl text-lg text-blue-50">Every card links to a dynamic slug route and can be managed from the admin dashboard.</p>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article key={destination.id} className="overflow-hidden rounded-3xl border bg-white shadow-lg">
              <img src={destination.heroImage} alt={destination.name} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-900">{destination.name}</h2>
                <p className="mt-3 text-slate-600">{destination.shortDescription}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500"><Calendar className="h-4 w-4" /> Best time: {destination.bestTime}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {destination.highlights.slice(0, 4).map((highlight) => <span key={highlight} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-800"><MapPin className="mr-1 inline h-3 w-3" />{highlight}</span>)}
                </div>
                <Button asChild className="mt-6 w-full bg-orange-500 hover:bg-orange-600"><Link to={`/destinations/${destination.slug}`}>Explore {destination.name}</Link></Button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Destinations;
