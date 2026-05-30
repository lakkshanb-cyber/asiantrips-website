import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { SITE } from '@/lib/constants';
import { blogService } from '@/services/cmsService';

const BlogDetail = () => {
  const post = blogService.getBySlug(useParams().slug);
  if (!post) return <Navigate to="/blog" replace />;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage,
    url: `${SITE.baseUrl}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
  };

  return (
    <>
      <SEO title={post.seoTitle || post.title} description={post.seoDescription || post.excerpt} path={`/blog/${post.slug}`} image={post.coverImage} type="article" jsonLd={jsonLd} />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <Link to="/blog" className="text-orange-600">← Blog</Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Travel guide</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
        <img src={post.coverImage} alt={post.title} className="mt-8 w-full rounded-3xl object-cover shadow-lg" />
        <article className="prose prose-lg mt-8 max-w-none text-slate-700">
          {String(post.content || '').split('\n').filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
