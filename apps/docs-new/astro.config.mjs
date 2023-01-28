import { defineConfig } from 'astro/config';
import { resolve, dirname } from 'path';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), image(), svelte()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '$lib': resolve('./src/lib'),
        '$components': resolve('./src/components'),
        '$layouts': resolve('./src/layouts'),
        '$pages': resolve('./src/pages'),
        '$styles': resolve('./src/styles'),
        '$assets': resolve('./src/assets')
      }
    }
  }
});