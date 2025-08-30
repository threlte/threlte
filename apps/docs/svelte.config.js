import { vitePreprocess } from '@astrojs/svelte'

export default {
  extensions: ['.svelte'],
  preprocess: vitePreprocess({
    style: {
      css: {
        postcss: true
      }
    }
  })
}
