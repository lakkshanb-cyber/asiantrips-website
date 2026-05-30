export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  if (import.meta.env.DEV) {
    console.info('[analytics:mock]', eventName, params);
  }
};

export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, { page_path: path });
  }
  if (import.meta.env.DEV) {
    console.info('[analytics:pageview:mock]', path);
  }
};
