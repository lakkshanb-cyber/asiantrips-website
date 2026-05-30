export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

export const supabase = {
  isConfigured: isSupabaseConfigured,
  message:
    'Supabase client placeholder. Install @supabase/supabase-js and replace this mock when package installation is available.',
};
