import { ensureUniqueSlug } from '@/lib/slug';
import { supabaseRest, supabaseStorage } from '@/lib/supabaseClient';

const toCamel = (record = {}) => Object.fromEntries(Object.entries(record).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), value]));
const toSnake = (record = {}) => Object.fromEntries(Object.entries(record).map(([key, value]) => [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`), value]));
const isPublishedRecord = (item) => item.isPublished !== false && item.status !== 'draft';
const orderQuery = '?select=*&order=created_at.desc';

const tableConfig = {
  destinations: { table: 'destinations', imageFields: { heroImage: 'hero_image_url' } },
  packages: { table: 'packages' },
  blog: { table: 'blogs', imageFields: { coverImage: 'cover_image_url' } },
  gallery: { table: 'gallery', hasSlug: false },
  testimonials: { table: 'testimonials', hasSlug: false },
  inquiries: { table: 'inquiries' },
};

const toDb = (payload, config = {}) => {
  const next = { ...payload };
  Object.entries(config.imageFields || {}).forEach(([camel, snake]) => {
    if (camel in next) {
      next[snake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())] = next[camel];
      delete next[camel];
    }
  });
  delete next.createdAt;
  delete next.updatedAt;
  delete next.category;
  if (!config.hasSlug && config.hasSlug === false) delete next.slug;
  if (config.table === 'gallery') delete next.featured;
  const dbRecord = toSnake(next);
  if (dbRecord.hero_image) {
    dbRecord.hero_image_url = dbRecord.hero_image;
    delete dbRecord.hero_image;
  }
  if (dbRecord.cover_image) {
    dbRecord.cover_image_url = dbRecord.cover_image;
    delete dbRecord.cover_image;
  }
  Object.keys(dbRecord).forEach((key) => dbRecord[key] === undefined && delete dbRecord[key]);
  return dbRecord;
};

const fromDb = (record, config = {}) => {
  const next = toCamel(record);
  Object.entries(config.imageFields || {}).forEach(([camel, snake]) => {
    const camelFromSnake = snake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    if (camelFromSnake in next) {
      next[camel] = next[camelFromSnake];
      delete next[camelFromSnake];
    }
  });
  return next;
};

const normalizeSlug = (payload, records, slugField, currentId) => {
  const candidate = payload.slug || payload[slugField] || payload.name || payload.title || payload.customerName;
  return ensureUniqueSlug(candidate, records, currentId);
};

const createCrud = ({ type, slugField = 'title' }) => {
  const config = tableConfig[type];
  return {
    list: async () => (await supabaseRest.select(config.table, orderQuery)).map((item) => fromDb(item, config)),
    published: async () => (await supabaseRest.select(config.table, orderQuery)).map((item) => fromDb(item, config)).filter(isPublishedRecord),
    getById: async (id) => {
      const rows = await supabaseRest.select(config.table, `?select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
      return rows[0] ? fromDb(rows[0], config) : null;
    },
    getBySlug: async (slug) => {
      const rows = await supabaseRest.select(config.table, `?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`);
      const record = rows[0] ? fromDb(rows[0], config) : null;
      return record && isPublishedRecord(record) ? record : null;
    },
    create: async (payload) => {
      const records = config.hasSlug === false ? [] : await supabaseRest.select(config.table, '?select=id,slug');
      const record = config.hasSlug === false ? { ...payload } : { ...payload, slug: normalizeSlug(payload, records.map(toCamel), slugField) };
      const rows = await supabaseRest.insert(config.table, toDb(record, config));
      return fromDb(rows[0], config);
    },
    update: async (id, payload) => {
      const records = config.hasSlug === false ? [] : await supabaseRest.select(config.table, '?select=id,slug');
      const record = config.hasSlug === false ? { ...payload, updatedAt: new Date().toISOString() } : { ...payload, slug: normalizeSlug(payload, records.map(toCamel), slugField, id), updatedAt: new Date().toISOString() };
      const rows = await supabaseRest.update(config.table, id, toDb(record, config));
      return fromDb(rows[0], config);
    },
    remove: async (id) => supabaseRest.remove(config.table, id),
  };
};

export const destinationService = createCrud({ type: 'destinations', slugField: 'name' });
export const packageService = createCrud({ type: 'packages', slugField: 'title' });
export const blogService = createCrud({ type: 'blog', slugField: 'title' });
export const galleryService = createCrud({ type: 'gallery', slugField: 'title' });
export const testimonialService = createCrud({ type: 'testimonials', slugField: 'customerName' });

export const inquiryService = {
  list: async () => (await supabaseRest.select(tableConfig.inquiries.table, orderQuery)).map(toCamel),
  search: async ({ query = '', status = 'all' } = {}) => {
    const normalizedQuery = query.trim().toLowerCase();
    return (await inquiryService.list()).filter((item) => {
      const matchesStatus = status === 'all' || item.status === status;
      const searchable = [item.fullName, item.phone, item.whatsapp, item.destination, item.travelDate, item.month, item.budget, item.message, item.sourceType]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  },
  create: async (payload) => {
    const rows = await supabaseRest.insert(tableConfig.inquiries.table, toDb({ status: 'new', sourceType: 'quote_form', ...payload }, tableConfig.inquiries));
    return toCamel(rows[0]);
  },
  updateStatus: async (id, status) => {
    const rows = await supabaseRest.update(tableConfig.inquiries.table, id, { status, updated_at: new Date().toISOString() });
    return toCamel(rows[0]);
  },
  remove: async (id) => supabaseRest.remove(tableConfig.inquiries.table, id),
  stats: async () => {
    const records = await inquiryService.list();
    return {
      total: records.length,
      newCount: records.filter((item) => item.status === 'new').length,
      contacted: records.filter((item) => item.status === 'contacted').length,
      quoted: records.filter((item) => item.status === 'quoted').length,
      converted: records.filter((item) => item.status === 'converted').length,
      lost: records.filter((item) => item.status === 'lost').length,
    };
  },
};

export const uploadCmsImage = (bucket, file) => supabaseStorage.uploadPublicImage(bucket, file);

export const getDestinationName = async (destinationId) => (await destinationService.list()).find((destination) => destination.id === destinationId)?.name || 'Custom';
