// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://eflury.com',
  output: 'static',
  build: {
    format: 'file', // Generates /about.html instead of /about/index.html
  },
  trailingSlash: 'never',
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          // Separate vendor chunks for better caching
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('three')) {
                return 'three';
              }
              if (id.includes('emailjs')) {
                return 'emailjs';
              }
              if (id.includes('gsap')) {
                return 'gsap';
              }
              if (id.includes('lucide')) {
                return 'lucide';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
