// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Demo publicat pe GitHub Pages: https://rtr-tech-solutions.github.io/dj/
// TODO(real): la domeniul clientului, `site` devine domeniul lui și `base` se scoate.
export default defineConfig({
  site: 'https://rtr-tech-solutions.github.io',
  base: '/dj',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
