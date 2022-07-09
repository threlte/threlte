
import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [
    { ...threeMinifier(), enforce: 'pre' },
  ],
  resolve: {
    alias: {
      threlte: resolve('src/lib'),
    }
  },
  ssr: {
    noExternal: ['three']
  }
}

export default config