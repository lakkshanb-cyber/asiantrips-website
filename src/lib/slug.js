export const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const ensureUniqueSlug = (title, records = [], currentId) => {
  const base = slugify(title) || 'item';
  let slug = base;
  let index = 2;
  while (records.some((record) => record.slug === slug && record.id !== currentId)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
};
