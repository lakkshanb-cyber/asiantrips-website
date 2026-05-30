export const SITE = {
  name: 'AsianTrips Holidays',
  tagline: 'Honest Himalayan travel planning with real support',
  baseUrl: import.meta.env.VITE_SITE_URL || 'https://asiantripsholidays.com',
  phone: '9933649669',
  phoneDisplay: '+91 99336 49669',
  whatsapp: '919933649669',
  email: 'info@asiantripsholidays.com',
  supportEmail: 'lakkshanb@gmail.com',
  address: 'Siliguri, West Bengal, India',
  defaultOgImage: '/og-asiantrips.jpg',
};

export const INQUIRY_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
];

export const ADMIN_DEMO_USER = {
  email: 'admin@asiantripsholidays.com',
  password: 'asiantrips-demo',
  name: 'AsianTrips Admin',
};
