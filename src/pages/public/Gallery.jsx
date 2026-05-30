import React from 'react';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { galleryService } from '@/services/cmsService';

const Gallery = () => <><SEO title="Gallery" description="AsianTrips Holidays destination gallery." path="/gallery" /><main className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-4xl font-bold">Gallery</h1><p className="mt-3 text-slate-600">Image records are ready for Supabase Storage integration.</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{galleryService.list().map((item) => <figure key={item.id} className="overflow-hidden rounded-3xl border bg-white shadow-lg"><img src={item.imageUrl} alt={item.altText} className="h-64 w-full object-cover" /><figcaption className="p-4 font-semibold">{item.title}</figcaption></figure>)}</div></main><Footer /></>;
export default Gallery;
