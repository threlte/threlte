import { threeMinifier } from '@yushijinhun/three-minifier-rollup'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [{ ...threeMinifier(), enforce: 'pre' }],
  ssr: {
    noExternal: ['three']
  }
}

export default config
