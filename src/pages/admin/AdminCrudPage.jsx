import React, { useMemo, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogService, destinationService, galleryService, getDestinationName, packageService, testimonialService } from '@/services/cmsService';
import { slugify } from '@/lib/slug';

const configs = {
  destinations: {
    title: 'Destination Management',
    description: 'Create destination landing pages with image, highlights, slug, and SEO fields.',
    service: destinationService,
    empty: { name: '', slug: '', shortDescription: '', description: '', heroImage: '', bestTime: '', highlights: [], seoTitle: '', seoDescription: '', isPublished: true, featured: false },
    fields: ['name', 'slug', 'shortDescription', 'description', 'heroImage', 'bestTime', 'highlights', 'seoTitle', 'seoDescription'],
    primary: 'name',
  },
  packages: {
    title: 'Package Management',
    description: 'Manage title, slug, destination, duration, price, overview, itinerary, inclusions, exclusions, gallery, and featured state.',
    service: packageService,
    empty: { title: '', slug: '', destinationId: '', duration: '', price: '', category: '', overview: '', itinerary: [], inclusions: [], exclusions: [], gallery: [], seoTitle: '', seoDescription: '', isPublished: true, featured: false },
    fields: ['title', 'slug', 'destinationId', 'duration', 'price', 'category', 'overview', 'itinerary', 'inclusions', 'exclusions', 'gallery', 'seoTitle', 'seoDescription'],
    primary: 'title',
  },
  blog: {
    title: 'Blog Management',
    description: 'Draft and publish SEO-focused travel guides.',
    service: blogService,
    empty: { title: '', slug: '', excerpt: '', content: '', coverImage: '', status: 'published', seoTitle: '', seoDescription: '' },
    fields: ['title', 'slug', 'excerpt', 'content', 'coverImage', 'status', 'seoTitle', 'seoDescription'],
    primary: 'title',
  },
  gallery: {
    title: 'Gallery Management',
    description: 'Prepare gallery records for future Supabase Storage uploads.',
    service: galleryService,
    empty: { title: '', imageUrl: '', altText: '', destinationId: '' },
    fields: ['title', 'imageUrl', 'altText', 'destinationId'],
    primary: 'title',
  },
  testimonials: {
    title: 'Testimonials Management',
    description: 'Moderate customer testimonials and ratings.',
    service: testimonialService,
    empty: { customerName: '', location: '', rating: 5, quote: '', tripName: '', isPublished: true, featured: false },
    fields: ['customerName', 'location', 'rating', 'quote', 'tripName'],
    primary: 'customerName',
  },
};

const arrayFields = new Set(['highlights', 'itinerary', 'inclusions', 'exclusions', 'gallery']);
const textareaFields = new Set(['description', 'overview', 'content', 'quote', 'seoDescription', 'shortDescription', 'excerpt']);

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
  if (next.price) next.price = Number(next.price);
  if (next.rating) next.rating = Number(next.rating);
  return next;
};

const AdminCrudPage = ({ type }) => {
  const config = configs[type];
  const [records, setRecords] = useState(config.service.list());
  const [selectedId, setSelectedId] = useState(records[0]?.id || 'new');

  const selected = useMemo(() => {
    if (selectedId === 'new') return normalizeForForm(config.empty);
    return normalizeForForm(records.find((record) => record.id === selectedId) || config.empty);
  }, [config.empty, records, selectedId]);
  const [form, setForm] = useState(selected);

  React.useEffect(() => setForm(selected), [selectedId, records]);

  const refresh = () => setRecords(config.service.list());
  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: field === 'slug' ? slugify(value) : value }));

  const save = () => {
    const payload = normalizeForSave(form);
    if (!payload.slug && (payload.title || payload.name)) payload.slug = slugify(payload.title || payload.name);
    const saved = selectedId === 'new' ? config.service.create(payload) : config.service.update(selectedId, payload);
    refresh();
    setSelectedId(saved.id);
  };

  const remove = (id) => {
    config.service.remove(id);
    refresh();
    setSelectedId('new');
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">{config.title}</h2>
          <p className="text-sm text-slate-600">{config.description}</p>
        </div>
        <Button onClick={() => setSelectedId('new')} className="mb-4 w-full bg-orange-500 hover:bg-orange-600"><Plus className="mr-2 h-4 w-4" /> New record</Button>
        <div className="space-y-2">
          {records.map((record) => (
            <button key={record.id} onClick={() => setSelectedId(record.id)} className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm ${selectedId === record.id ? 'border-orange-400 ring-2 ring-orange-100' : ''}`}>
              <p className="font-semibold text-slate-900">{record[config.primary]}</p>
              <p className="text-xs text-slate-500">/{record.slug || record.id}</p>
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          {config.fields.map((field) => (
            <div key={field} className={textareaFields.has(field) || arrayFields.has(field) ? 'md:col-span-2' : ''}>
              <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</Label>
              {field === 'destinationId' ? (
                <select className="mt-2 h-10 w-full rounded-md border px-3 text-sm" value={form[field] || ''} onChange={(event) => updateField(field, event.target.value)}>
                  <option value="">Select destination</option>
                  {destinationService.list().map((destination) => <option key={destination.id} value={destination.id}>{destination.name}</option>)}
                </select>
              ) : textareaFields.has(field) || arrayFields.has(field) ? (
                <Textarea className="mt-2 min-h-[110px]" value={form[field] || ''} onChange={(event) => updateField(field, event.target.value)} placeholder={arrayFields.has(field) ? 'One item per line' : undefined} />
              ) : (
                <Input className="mt-2" value={form[field] || ''} onChange={(event) => updateField(field, event.target.value)} />
              )}
              {field === 'destinationId' && form[field] && <p className="mt-1 text-xs text-slate-500">Selected: {getDestinationName(form[field])}</p>}
            </div>
          ))}
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
