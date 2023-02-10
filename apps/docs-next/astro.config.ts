import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import preprocess from 'svelte-preprocess'
import { preprocessThrelte } from '@threlte/preprocess'
import AutoImport from 'astro-auto-import'
import type { Options } from 'rehype-pretty-code'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import image from '@astrojs/image'

// https://astro.build/config
import svelte from '@astrojs/svelte'

// https://astro.build/config
import mdx from '@astrojs/mdx'

const prettyCodeOptions: Partial<Options> = {
  theme: 'dracula-soft',
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: 'text',
          value: ' '
        }
      ]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word']
  },
  tokensMap: {},
  keepBackground: true
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({
      imports: ['$components/Example/Example.astro']
    }),
    tailwind(),
    image(),
    svelte({
      preprocess: seqPreprocessor([
        preprocess({
          postcss: true
        }),
        preprocessThrelte({
          extensions: {
            'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
            'three/examples/jsm/controls/TransformControls': ['TransformControls']
          }
        })
      ])
    }),
    mdx()
  ],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        $lib: resolve('./src/lib'),
        $components: resolve('./src/components'),
        $layouts: resolve('./src/layouts'),
        $pages: resolve('./src/pages'),
        $styles: resolve('./src/styles'),
        $assets: resolve('./src/assets'),
        $examples: resolve('./src/examples')
      }
    },
    ssr: {
      noExternal: ['three', 'troika-three-text', 'postprocessing']
    }
  },
  markdown: {
    syntaxHighlight: false
    // rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
})
