-- AsianTrips Holidays CMS platform schema
-- Apply after creating a Supabase project. This app connects directly to Supabase Auth, PostgREST, and Storage from the browser.

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  best_time text,
  highlights jsonb not null default '[]'::jsonb,
  hero_image_url text,
  gallery jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  is_published boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.package_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order int not null default 0
);

create table if not exists public.packages (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  destination_id uuid references public.destinations(id) on delete set null,
  category_id uuid references public.package_categories(id) on delete set null,
  duration text,
  price numeric(12,2),
  overview text,
  itinerary jsonb not null default '[]'::jsonb,
  inclusions jsonb not null default '[]'::jsonb,
  exclusions jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  is_published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  whatsapp text,
  destination text,
  destination_id uuid references public.destinations(id) on delete set null,
  package_id uuid references public.packages(id) on delete set null,
  travel_date text,
  travelers text,
  budget text,
  message text,
  source_type text not null default 'quote_form',
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'converted', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default uuid_generate_v4(),
  title text,
  image_url text not null,
  alt_text text,
  destination_id uuid references public.destinations(id) on delete set null,
  package_id uuid references public.packages(id) on delete set null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  location text,
  rating int not null default 5 check (rating between 1 and 5),
  quote text not null,
  trip_name text,
  package_id uuid references public.packages(id) on delete set null,
  image_url text,
  featured boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.destinations enable row level security;
alter table public.package_categories enable row level security;
alter table public.packages enable row level security;
alter table public.inquiries enable row level security;
alter table public.blogs enable row level security;
alter table public.gallery enable row level security;
alter table public.testimonials enable row level security;

create policy "Published destinations are public" on public.destinations for select using (is_published = true);
create policy "Published packages are public" on public.packages for select using (is_published = true);
create policy "Published blogs are public" on public.blogs for select using (status = 'published');
create policy "Published gallery is public" on public.gallery for select using (is_published = true);
create policy "Published testimonials are public" on public.testimonials for select using (is_published = true);
create policy "Anyone can create inquiries" on public.inquiries for insert with check (true);

-- Replace with stricter JWT role checks after admin users are provisioned.
create policy "Authenticated users can manage CMS" on public.destinations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage packages" on public.packages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage inquiries" on public.inquiries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage blogs" on public.blogs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage gallery" on public.gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');


-- Public image storage buckets used by the CMS upload fields.
insert into storage.buckets (id, name, public) values
  ('destinations', 'destinations', true),
  ('packages', 'packages', true),
  ('blogs', 'blogs', true),
  ('gallery', 'gallery', true)
on conflict (id) do update set public = excluded.public;

create policy "Public can view AsianTrips CMS images"
on storage.objects for select
using (bucket_id in ('destinations', 'packages', 'blogs', 'gallery'));

create policy "Authenticated users can upload AsianTrips CMS images"
on storage.objects for insert
with check (auth.role() = 'authenticated' and bucket_id in ('destinations', 'packages', 'blogs', 'gallery'));

create policy "Authenticated users can update AsianTrips CMS images"
on storage.objects for update
using (auth.role() = 'authenticated' and bucket_id in ('destinations', 'packages', 'blogs', 'gallery'))
with check (auth.role() = 'authenticated' and bucket_id in ('destinations', 'packages', 'blogs', 'gallery'));

create policy "Authenticated users can delete AsianTrips CMS images"
on storage.objects for delete
using (auth.role() = 'authenticated' and bucket_id in ('destinations', 'packages', 'blogs', 'gallery'));
