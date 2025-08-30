import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import mkcert from 'vite-plugin-mkcert'
import { threlteStudio } from '@threlte/studio/vite'
import type { Plugin } from 'vite'
import tailwind from '@astrojs/tailwind'
import preact from '@astrojs/preact'
import svelte from '@astrojs/svelte'
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
    svelte(),
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
      ...(process.argv.includes('--https') ? { https: {} } : {})
    },
    plugins: process.argv.includes('--https')
      ? [threlteStudio() as unknown as Plugin, mkcert()]
      : [threlteStudio() as unknown as Plugin],
    ssr: {
      // "@theatre/core" needs to be externalized in development mode but not in production!
      noExternal: noExternal
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        keep_classnames: true
      }
    }
  },
  markdown: {
    syntaxHighlight: false
    // rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
})
