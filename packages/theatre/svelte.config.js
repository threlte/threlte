import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess()],

  kit: {
    // prerender: {
    //   default: true
    // },

    adapter: adapter()

    // package: {
    //   dir: 'dist',
    //   emitTypes: true,
    //   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //   exports: (file) => file === 'index.ts'
    // }
  }
}

export default config
