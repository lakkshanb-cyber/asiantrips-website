import { destinations, packages, blogPosts, galleryItems, testimonials, inquiries } from '@/data/mockCmsData';
import { ensureUniqueSlug } from '@/lib/slug';

const STORAGE_PREFIX = 'asiantrips_cms_';
const clone = (value) => JSON.parse(JSON.stringify(value));

const readCollection = (key, fallback) => {
  if (typeof window === 'undefined') return clone(fallback);
  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
  if (!raw) {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(fallback));
    return clone(fallback);
  }
  return JSON.parse(raw);
};

const writeCollection = (key, value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  }
  return clone(value);
};

const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const createCrud = ({ key, fallback, prefix, slugField = 'title' }) => ({
  list: () => readCollection(key, fallback),
  published: () => readCollection(key, fallback).filter((item) => item.isPublished !== false && item.status !== 'draft'),
  getById: (id) => readCollection(key, fallback).find((item) => item.id === id),
  getBySlug: (slug) => readCollection(key, fallback).find((item) => item.slug === slug && item.isPublished !== false && item.status !== 'draft'),
  create: (payload) => {
    const records = readCollection(key, fallback);
    const record = {
      ...payload,
      id: makeId(prefix),
      slug: payload.slug || ensureUniqueSlug(payload[slugField] || payload.name || payload.title, records),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return writeCollection(key, [record, ...records])[0];
  },
  update: (id, payload) => {
    const records = readCollection(key, fallback);
    const next = records.map((item) => {
      if (item.id !== id) return item;
      const merged = { ...item, ...payload, updatedAt: new Date().toISOString() };
      if (!merged.slug) merged.slug = ensureUniqueSlug(merged[slugField] || merged.name || merged.title, records, id);
      return merged;
    });
    writeCollection(key, next);
    return next.find((item) => item.id === id);
  },
  remove: (id) => {
    const records = readCollection(key, fallback);
    writeCollection(key, records.filter((item) => item.id !== id));
  },
});

export const destinationService = createCrud({ key: 'destinations', fallback: destinations, prefix: 'dest', slugField: 'name' });
export const packageService = createCrud({ key: 'packages', fallback: packages, prefix: 'pkg', slugField: 'title' });
export const blogService = createCrud({ key: 'blog_posts', fallback: blogPosts, prefix: 'blog', slugField: 'title' });
export const galleryService = createCrud({ key: 'gallery_items', fallback: galleryItems, prefix: 'gal', slugField: 'title' });
export const testimonialService = createCrud({ key: 'testimonials', fallback: testimonials, prefix: 'test', slugField: 'customerName' });

export const inquiryService = {
  list: () => readCollection('inquiries', inquiries),
  create: (payload) => {
    const records = readCollection('inquiries', inquiries);
    const record = {
      id: makeId('inq'),
      status: 'new',
      sourceType: 'quote_form',
      createdAt: new Date().toISOString(),
      ...payload,
    };
    writeCollection('inquiries', [record, ...records]);
    return record;
  },
  updateStatus: (id, status) => {
    const records = readCollection('inquiries', inquiries);
    const next = records.map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
    writeCollection('inquiries', next);
    return next.find((item) => item.id === id);
  },
  remove: (id) => {
    const records = readCollection('inquiries', inquiries);
    writeCollection('inquiries', records.filter((item) => item.id !== id));
  },
  stats: () => {
    const records = readCollection('inquiries', inquiries);
    return {
      total: records.length,
      newCount: records.filter((item) => item.status === 'new').length,
      contacted: records.filter((item) => item.status === 'contacted').length,
      converted: records.filter((item) => item.status === 'converted').length,
    };
  },
};

export const getDestinationName = (destinationId) => destinationService.list().find((destination) => destination.id === destinationId)?.name || 'Custom';
