import React from 'react';
import { Star } from 'lucide-react';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { testimonialService } from '@/services/cmsService';

const Testimonials = () => {
  const testimonials = testimonialService.published();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE.name,
    url: SITE.baseUrl,
    review: testimonials.map((item) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: item.rating, bestRating: 5 },
      author: { '@type': 'Person', name: item.customerName },
      reviewBody: item.quote,
    })),
  };

  return (
    <>
      <SEO title="Testimonials" description="Reviews from AsianTrips Holidays travelers." path="/testimonials" jsonLd={jsonLd} />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Guest stories</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Traveler Testimonials</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-3xl border bg-white p-6 shadow-lg">
              <div className="mb-4 flex text-orange-400">{Array.from({ length: Number(item.rating) || 0 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}</div>
              <p className="text-lg text-slate-700">“{item.quote}”</p>
              <p className="mt-5 font-bold text-slate-900">{item.customerName}</p>
              <p className="text-sm text-slate-500">{item.location} · {item.tripName}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Testimonials;
