import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'

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
