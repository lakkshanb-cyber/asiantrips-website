import React from 'react';
import { Star } from 'lucide-react';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { testimonialService } from '@/services/cmsService';

const Testimonials = () => <><SEO title="Testimonials" description="Reviews from AsianTrips Holidays travelers." path="/testimonials" /><main className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-4xl font-bold">Traveler Testimonials</h1><div className="mt-10 grid gap-6 md:grid-cols-2">{testimonialService.published().map((item) => <article key={item.id} className="rounded-3xl border bg-white p-6 shadow-lg"><div className="mb-4 flex text-orange-400">{Array.from({ length: item.rating }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}</div><p className="text-lg text-slate-700">“{item.quote}”</p><p className="mt-5 font-bold">{item.customerName}</p><p className="text-sm text-slate-500">{item.location} · {item.tripName}</p></article>)}</div></main><Footer /></>;
export default Testimonials;
