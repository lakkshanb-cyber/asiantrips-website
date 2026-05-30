import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImagePlus, Plus, Save, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogService, destinationService, galleryService, packageService, testimonialService, uploadCmsImage } from '@/services/cmsService';
import { slugify } from '@/lib/slug';

const configs = {
  destinations: {
    title: 'Destination Management',
    description: 'Create, edit, delete, publish, and optimize destination landing pages.',
    newLabel: 'Add destination',
    service: destinationService,
    empty: { name: '', slug: '', shortDescription: '', description: '', heroImage: '', bestTime: '', highlights: [], seoTitle: '', seoDescription: '', isPublished: true, featured: false },
    fields: ['name', 'slug', 'shortDescription', 'description', 'heroImage', 'bestTime', 'highlights', 'seoTitle', 'seoDescription', 'featured', 'isPublished'],
    primary: 'name',
    slugSource: 'name',
  },
  packages: {
    title: 'Package Management',
    description: 'Manage package title, slug, destination, duration, price, itinerary, gallery, and featured state.',
    newLabel: 'Add package',
    service: packageService,
    empty: { title: '', slug: '', destinationId: '', duration: '', price: '', category: '', overview: '', itinerary: [], inclusions: [], exclusions: [], gallery: [], seoTitle: '', seoDescription: '', isPublished: true, featured: false },
    fields: ['title', 'slug', 'destinationId', 'duration', 'price', 'category', 'overview', 'itinerary', 'inclusions', 'exclusions', 'gallery', 'seoTitle', 'seoDescription', 'featured', 'isPublished'],
    primary: 'title',
    slugSource: 'title',
  },
  blog: {
    title: 'Blog Management',
    description: 'Create drafts, publish posts, and control SEO fields for public blog routes.',
    newLabel: 'Create blog',
    service: blogService,
    empty: { title: '', slug: '', excerpt: '', content: '', coverImage: '', status: 'published', seoTitle: '', seoDescription: '' },
    fields: ['title', 'slug', 'excerpt', 'content', 'coverImage', 'status', 'seoTitle', 'seoDescription'],
    primary: 'title',
    slugSource: 'title',
  },
  gallery: {
    title: 'Gallery Management',
    description: 'Manage public gallery records with Supabase Storage image uploads.',
    newLabel: 'Add gallery item',
    service: galleryService,
    empty: { title: '', imageUrl: '', altText: '', destinationId: '', isPublished: true, featured: false },
    fields: ['title', 'imageUrl', 'altText', 'destinationId', 'featured', 'isPublished'],
    primary: 'title',
    slugSource: 'title',
  },
  testimonials: {
    title: 'Testimonials Management',
    description: 'Create, edit, delete, feature, and publish customer testimonials.',
    newLabel: 'Add testimonial',
    service: testimonialService,
    empty: { customerName: '', location: '', rating: 5, quote: '', tripName: '', isPublished: true, featured: false },
    fields: ['customerName', 'location', 'rating', 'quote', 'tripName', 'featured', 'isPublished'],
    primary: 'customerName',
  },
};

const arrayFields = new Set(['highlights', 'itinerary', 'inclusions', 'exclusions', 'gallery']);
const textareaFields = new Set(['description', 'overview', 'content', 'quote', 'seoDescription', 'shortDescription', 'excerpt']);
const imageFields = new Set(['heroImage', 'coverImage', 'imageUrl', 'gallery']);
const uploadBuckets = { heroImage: 'destinations', coverImage: 'blogs', imageUrl: 'gallery', gallery: 'packages' };
const booleanFields = new Set(['isPublished', 'featured']);

const fieldLabels = {
  destinationId: 'Destination',
  heroImage: 'Hero image URL',
  coverImage: 'Cover image URL',
  imageUrl: 'Image URL',
  seoTitle: 'SEO title',
  seoDescription: 'SEO description',
  isPublished: 'Published',
};

const normalizeForForm = (record) => {
  const next = { ...record };
  Object.keys(next).forEach((key) => {
    if (Array.isArray(next[key])) next[key] = next[key].join('\n');
  });
  return next;
};

const normalizeForSave = (record) => {
  const next = { ...record };
  Object.keys(next).forEach((key) => {
    if (arrayFields.has(key)) next[key] = String(next[key] || '').split('\n').map((item) => item.trim()).filter(Boolean);
  });
  if (next.price !== undefined && next.price !== '') next.price = Number(next.price);
  if (next.rating !== undefined && next.rating !== '') next.rating = Number(next.rating);
  booleanFields.forEach((field) => {
    if (field in next) next[field] = Boolean(next[field]);
  });
  return next;
};

const AdminCrudPage = ({ type }) => {
  const config = configs[type];
  const [records, setRecords] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedId, setSelectedId] = useState('new');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const selected = useMemo(() => {
    if (selectedId === 'new') return normalizeForForm(config.empty);
    return normalizeForForm(records.find((record) => record.id === selectedId) || config.empty);
  }, [config.empty, records, selectedId]);
  const [form, setForm] = useState(selected);

  React.useEffect(() => {
    setForm(selected);
    setSlugManuallyEdited(Boolean(selected.slug));
  }, [selectedId, records]);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return records;
    return records.filter((record) => [record[config.primary], record.slug, record.seoTitle, record.seoDescription]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery));
  }, [config.primary, query, records]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const [items, destinationItems] = await Promise.all([config.service.list(), destinationService.list()]);
      setRecords(items);
      setDestinations(destinationItems);
      setSelectedId((current) => (current !== 'new' && !items.some((item) => item.id === current) ? items[0]?.id || 'new' : current));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [config.service]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateField = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: field === 'slug' ? slugify(value) : value };
      if (field === 'slug') setSlugManuallyEdited(true);
      if (field === config.slugSource && !slugManuallyEdited) next.slug = slugify(value);
      return next;
    });
  };

  const save = async () => {
    const payload = normalizeForSave(form);
    if (!payload.slug && config.slugSource) payload.slug = slugify(payload[config.slugSource]);
    const saved = selectedId === 'new' ? await config.service.create(payload) : await config.service.update(selectedId, payload);
    await refresh();
    setSelectedId(saved.id);
  };

  const remove = async (id) => {
    const record = records.find((item) => item.id === id);
    if (!window.confirm(`Delete ${record?.[config.primary] || 'this record'}?`)) return;
    await config.service.remove(id);
    await refresh();
    setSelectedId('new');
  };

  const uploadImage = async (field, file) => {
    if (!file) return;
    try {
      const url = await uploadCmsImage(uploadBuckets[field], file);
      updateField(field, field === 'gallery' ? [form.gallery, url].filter(Boolean).join('\n') : url);
    } catch (err) {
      setError(err.message);
    }
  };

  const startNewRecord = () => {
    setSelectedId('new');
    setSlugManuallyEdited(false);
  };

  const renderField = (field) => {
    const label = fieldLabels[field] || field.replace(/([A-Z])/g, ' $1');

    if (booleanFields.has(field)) {
      return (
        <label className="mt-7 flex items-center gap-3 rounded-xl border bg-slate-50 p-4 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={Boolean(form[field])} onChange={(event) => updateField(field, event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-orange-500" />
          {label}
        </label>
      );
    }

    return (
      <div className={textareaFields.has(field) || arrayFields.has(field) ? 'md:col-span-2' : ''}>
        <Label className="capitalize">{label}</Label>
        {field === 'destinationId' ? (
          <select className="mt-2 h-10 w-full rounded-md border px-3 text-sm" value={form[field] || ''} onChange={(event) => updateField(field, event.target.value)}>
            <option value="">Select destination</option>
            {destinations.map((destination) => <option key={destination.id} value={destination.id}>{destination.name}</option>)}
          </select>
        ) : field === 'status' ? (
          <select className="mt-2 h-10 w-full rounded-md border px-3 text-sm" value={form[field] || 'draft'} onChange={(event) => updateField(field, event.target.value)}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        ) : textareaFields.has(field) || arrayFields.has(field) ? (
          <Textarea className="mt-2 min-h-[120px]" value={form[field] || ''} onChange={(event) => updateField(field, event.target.value)} placeholder={arrayFields.has(field) ? 'One item per line' : undefined} />
        ) : (
          <Input className="mt-2" type={field === 'price' || field === 'rating' ? 'number' : 'text'} value={form[field] || ''} onChange={(event) => updateField(field, event.target.value)} />
        )}
        {field === 'destinationId' && form[field] && <p className="mt-1 text-xs text-slate-500">Selected: {destinations.find((destination) => destination.id === form[field])?.name || 'Custom'}</p>}
        {imageFields.has(field) && (
          <div className="mt-3 rounded-xl border border-dashed bg-orange-50/60 p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-medium text-orange-700"><ImagePlus className="h-4 w-4" /> Supabase Storage upload</div>
            <p className="mt-1">Upload an image to the {uploadBuckets[field]} bucket or paste an image URL manually.</p>
            <input type="file" accept="image/*" onChange={(event) => uploadImage(field, event.target.files?.[0])} className="mt-3 text-xs" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">{config.title}</h2>
          <p className="text-sm text-slate-600">{config.description}</p>
        </div>
        <Button onClick={startNewRecord} className="mb-4 w-full bg-orange-500 hover:bg-orange-600"><Plus className="mr-2 h-4 w-4" /> {config.newLabel}</Button>
        <label className="relative mb-4 block">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records..." className="pl-9" />
        </label>
        {isLoading && <p className="text-sm text-slate-500">Loading records...</p>}
        {error && <p className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="space-y-2">
          {filteredRecords.map((record) => (
            <button key={record.id} onClick={() => setSelectedId(record.id)} className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm ${selectedId === record.id ? 'border-orange-400 ring-2 ring-orange-100' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{record[config.primary]}</p>
                  <p className="text-xs text-slate-500">/{record.slug || record.id}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${record.isPublished === false || record.status === 'draft' ? 'bg-slate-100 text-slate-600' : 'bg-green-50 text-green-700'}`}>{record.status || (record.isPublished === false ? 'draft' : 'published')}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{selectedId === 'new' ? 'Add' : 'Edit'} record</p>
            <h3 className="text-xl font-bold text-slate-900">{form[config.primary] || config.newLabel}</h3>
          </div>
          <p className="max-w-xs text-sm text-slate-500">Slugs are generated automatically from the title/name and can be overridden manually.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {config.fields.map((field) => <React.Fragment key={field}>{renderField(field)}</React.Fragment>)}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t pt-6">
          <Button onClick={save} className="bg-blue-900 hover:bg-blue-950"><Save className="mr-2 h-4 w-4" /> Save</Button>
          {selectedId !== 'new' && <Button variant="destructive" onClick={() => remove(selectedId)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>}
        </div>
      </section>
    </div>
  );
};

export default AdminCrudPage;
