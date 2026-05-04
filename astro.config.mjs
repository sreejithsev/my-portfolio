import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://sreejithsev.github.io',
  base: '/my-portfolio',
  integrations: [tailwind()],
});
