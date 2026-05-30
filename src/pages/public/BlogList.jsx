import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { blogService } from '@/services/cmsService';

const BlogList = () => {
  const posts = blogService.published();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Travel Blog`,
    url: `${SITE.baseUrl}/blog`,
    description: 'AsianTrips Holidays travel guides and planning tips.',
    blogPost: posts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: `${SITE.baseUrl}/blog/${post.slug}` })),
  };

  return (
    <>
      <SEO title="Travel Blog" description="AsianTrips Holidays travel guides and planning tips." path="/blog" jsonLd={jsonLd} />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Travel insights</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Travel Blog</h1>
        <p className="mt-3 max-w-2xl text-slate-600">SEO travel articles are managed in the admin dashboard and rendered through dynamic public routes.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="overflow-hidden rounded-3xl border bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <img src={post.coverImage} alt={post.title} className="h-52 w-full object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900">{post.title}</h2>
                <p className="mt-2 text-slate-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogList;
