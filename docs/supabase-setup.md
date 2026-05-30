# AsianTrips CMS Supabase setup

This application uses the live Supabase project for CMS data, admin authentication, inquiry storage, and public image hosting.

## 1. Environment variables

Create `.env.local` for local development and configure the same variables in your hosting provider:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
```

Only the public anon key is used by the browser app. Do not expose the service role key in Vite environment variables.

## 2. SQL to run in Supabase

Open **Supabase Dashboard → SQL Editor** and run the repository schema:

```sql
-- Copy and run the full contents of:
-- supabase/sql/schema.sql
```

The schema creates these live CMS tables:

- `public.destinations`
- `public.packages`
- `public.inquiries`
- `public.blogs`
- `public.gallery`
- `public.testimonials`

It also enables Row Level Security so published public content is readable by visitors, inquiries can be inserted publicly, and authenticated admin users can manage CMS records.

## 3. Storage bucket setup

The schema includes SQL for these public Supabase Storage buckets:

- `destinations`
- `packages`
- `blogs`
- `gallery`

If you prefer dashboard setup instead, create each bucket in **Storage → Buckets**, mark it public, and keep the bucket IDs exactly as listed above. Authenticated admin users can upload/update/delete files in these buckets, while public visitors can read the uploaded images.

## 4. Admin authentication

1. Go to **Authentication → Users** in Supabase.
2. Click **Add user** or invite the AsianTrips admin account.
3. Confirm the user email if your project requires confirmation.
4. Sign in at `/admin/login` with that live Supabase Auth email and password.

## 5. Optional seed content

The previous in-browser demo data was removed from the live CMS service layer. Add initial destinations, packages, blog posts, gallery images, and testimonials from `/admin` after signing in, or insert rows directly in Supabase using the table columns in `supabase/sql/schema.sql`.
