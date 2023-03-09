import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: seqPreprocessor([preprocess(), preprocessThrelte()]),

  kit: {
    prerender: {
      default: true
    },

    adapter: adapter(),

    package: {
      dir: 'dist',
      emitTypes: true,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      exports: (file) => file === 'index.ts'
    }
  }
}

export default config
