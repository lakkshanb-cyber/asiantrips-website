import React, { useCallback } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { blogService } from '@/services/cmsService';
import { useAsyncData } from '@/hooks/useAsyncData';

const BlogDetail = () => {
  const { slug } = useParams();
  const loadPost = useCallback(() => blogService.getBySlug(slug), [slug]);
  const { data: post, isLoading, error } = useAsyncData(loadPost, null);
  if (!isLoading && !post && !error) return <Navigate to="/blog" replace />;

  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage,
    url: `${SITE.baseUrl}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
  } : null;

  return (
    <>
      <SEO title={post?.seoTitle || post?.title || 'Travel Blog'} description={post?.seoDescription || post?.excerpt || 'AsianTrips Holidays travel guide.'} path={`/blog/${slug}`} image={post?.coverImage} type="article" jsonLd={jsonLd} />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <Link to="/blog" className="text-orange-600">← Blog</Link>
        {isLoading && <p className="mt-8 text-slate-500">Loading post...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {post && <>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Travel guide</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
          <img src={post.coverImage} alt={post.title} className="mt-8 w-full rounded-3xl object-cover shadow-lg" />
          <article className="prose prose-lg mt-8 max-w-none text-slate-700">
            {String(post.content || '').split('\n').filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        </>}
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
