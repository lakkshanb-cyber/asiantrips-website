export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

const AUTH_STORAGE_KEY = 'asiantrips_supabase_session';

const trimTrailingSlash = (value) => value.replace(/\/$/, '');
const baseUrl = () => trimTrailingSlash(supabaseConfig.url);

export const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const storeSession = (session) => {
  if (typeof window === 'undefined') return;
  if (session) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

const getAccessToken = () => getStoredSession()?.access_token;

const assertConfigured = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.');
  }
};

const headers = (extra = {}) => {
  const token = getAccessToken();
  return {
    apikey: supabaseConfig.anonKey,
    Authorization: `Bearer ${token || supabaseConfig.anonKey}`,
    'Content-Type': 'application/json',
    ...extra,
  };
};

const parseResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || data?.hint || 'Supabase request failed.';
    throw new Error(message);
  }
  return data;
};

const request = async (path, options = {}) => {
  assertConfigured();
  const response = await fetch(`${baseUrl()}${path}`, {
    ...options,
    headers: headers(options.headers),
  });
  return parseResponse(response);
};

export const supabaseAuth = {
  getSession: getStoredSession,
  signInWithPassword: async ({ email, password }) => {
    const data = await request('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    storeSession(data);
    return data;
  },
  signOut: async () => {
    const token = getAccessToken();
    if (token && isSupabaseConfigured) {
      await request('/auth/v1/logout', { method: 'POST' }).catch(() => null);
    }
    storeSession(null);
  },
};

export const supabaseRest = {
  select: (table, query = '') => request(`/rest/v1/${table}${query}`, { method: 'GET' }),
  insert: (table, payload) => request(`/rest/v1/${table}`, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  }),
  update: (table, id, payload) => request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  }),
  remove: (table, id) => request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  }),
};

const safeFileName = (file) => `${Date.now()}-${file.name}`.replace(/[^a-zA-Z0-9._-]/g, '-');

export const supabaseStorage = {
  uploadPublicImage: async (bucket, file) => {
    assertConfigured();
    const path = safeFileName(file);
    const token = getAccessToken();
    const response = await fetch(`${baseUrl()}/storage/v1/object/${bucket}/${path}`, {
      method: 'POST',
      headers: {
        apikey: supabaseConfig.anonKey,
        Authorization: `Bearer ${token || supabaseConfig.anonKey}`,
        'Content-Type': file.type || 'application/octet-stream',
        'x-upsert': 'false',
      },
      body: file,
    });
    await parseResponse(response);
    return `${baseUrl()}/storage/v1/object/public/${bucket}/${path}`;
  },
};
