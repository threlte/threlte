import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  resolve: {
    alias: {
      threlte: resolve('./src/lib')
    }
  },
  ssr: {
    noExternal: ['three']
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
}

export default config
