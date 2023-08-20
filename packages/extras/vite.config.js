import { sveltekit } from '@sveltejs/kit/vite'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  ssr: {
    noExternal: ['three']
  }
}

export default config
