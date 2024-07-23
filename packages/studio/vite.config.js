import { sveltekit } from '@sveltejs/kit/vite'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import studioPlugin from './src/lib/plugin'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [studioPlugin(), sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  ssr: {
    noExternal: ['three']
  }
}

export default config
