// Prefixează căile interne cu `base` din astro.config (ex. /dj pe GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => base + path;
