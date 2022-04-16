import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import Icons from 'unplugin-icons/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  preprocess: [
    preprocess()
  ],

  kit: {
    adapter: adapter(),

    package: {
      emitTypes: true,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      exports: (file) => file === 'index.ts'
    },

    vite: {
      plugins: [
        { ...threeMinifier(), enforce: 'pre' },
        Icons({ compiler: 'svelte' }),
        kitDocsPlugin({
          shiki: {
            theme: 'material-ocean'
          }
        })
      ],
      resolve: {
        alias: {
          threlte: resolve('src/lib'),
          $components: resolve('src/components'),
          $examples: resolve('src/examples')
        }
      },
      ssr: {
        noExternal: ['three']
      }
    }
  }
}

export default config
