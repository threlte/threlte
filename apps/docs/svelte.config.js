import { vitePreprocess } from '@astrojs/svelte'

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        postcss: true
      }
    }
  })
}
