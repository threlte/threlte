import { vitePreprocess } from '@astrojs/svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    experimental: {
      async: true
    }
  },
  preprocess: vitePreprocess({
    style: {
      css: {
        postcss: true
      }
    }
  })
}

export default config
