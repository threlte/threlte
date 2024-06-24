import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import preprocess from 'svelte-preprocess'
import mkcert from 'vite-plugin-mkcert'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import preact from '@astrojs/preact'
import svelte from '@astrojs/svelte'

// https://astro.build/config
import mdx from '@astrojs/mdx'

const noExternal = ['three', 'troika-three-text', 'postprocessing', '@pmndrs/vanilla']
if (process.env.NODE_ENV === 'production') {
  noExternal.push('@theatre/core')
}

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  experimental: {
    clientPrerender: true
  },
  build: {
    inlineStylesheets: 'never'
  },
  integrations: [
    AutoImport({
      imports: [
        '$components/Example/Example.astro',
        '$components/Tip/Tip.astro',
        '$components/Card/Card.astro'
      ]
    }),
    tailwind(),
    svelte({
      preprocess: preprocess({
        postcss: true
      })
    }),
    mdx({
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
    }),
    preact({ compat: true, include: ['**/*.tsx'] })
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
        $examples: resolve('./src/examples'),
        $hooks: resolve('./src/hooks')
      }
    },
    // Use https and generate a cert to allow XR debugging.
    server: {
      https: process.argv.includes('--https')
    },
    plugins: process.argv.includes('--https') ? [mkcert()] : [],
    ssr: {
      // "@theatre/core" needs to be externalized in development mode but not in production!
      noExternal: noExternal
    },
    legacy: {
      // vite 5 changed how externalized modules work - need to use this flag to keep old behaviour
      // https://vitejs.dev/guide/migration#ssr-externalized-modules-value-now-matches-production
      proxySsrExternalModules: true
    }
  },
  markdown: {
    syntaxHighlight: false
    // rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
})
