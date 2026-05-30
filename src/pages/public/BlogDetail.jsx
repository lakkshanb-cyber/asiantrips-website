import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import SEO from '@/components/shared/SEO';
import { blogService } from '@/services/cmsService';

const BlogDetail = () => {
  const post = blogService.getBySlug(useParams().slug);
  if (!post) return <Navigate to="/blog" replace />;
  return <><SEO title={post.seoTitle || post.title} description={post.seoDescription || post.excerpt} path={`/blog/${post.slug}`} image={post.coverImage} type="article" /><main className="mx-auto max-w-4xl px-4 py-16"><Link to="/blog" className="text-orange-600">← Blog</Link><h1 className="mt-6 text-4xl font-bold">{post.title}</h1><img src={post.coverImage} alt={post.title} className="mt-8 rounded-3xl" /><article className="prose prose-lg mt-8 max-w-none text-slate-700"><p>{post.content}</p></article></main><Footer /></>;
};

export default BlogDetail;
