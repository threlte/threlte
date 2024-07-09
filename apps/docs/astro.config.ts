import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import preprocess from 'svelte-preprocess'
import mkcert from 'vite-plugin-mkcert'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'
import preact from '@astrojs/preact'
import svelte from '@astrojs/svelte'
import starlight from '@astrojs/starlight'

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
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false
    }),
    svelte({
      preprocess: preprocess({
        postcss: true
      })
    }),
    preact({
      compat: true,
      include: ['**/*.tsx']
    }),
    starlight({
      title: 'threlte',
      logo: {
        src: 'public/logo/threlte-logo.png',
        replacesTitle: true
      },
      social: {
        github: 'https://github.com/threlte/threlte',
        twitter: 'https://twitter.com/threlte',
        discord: 'https://discord.gg/EqUBCfCaGm'
      },
      customCss: ['$styles/app.css', '$styles/theme.css'],
      components: {
        Header: '$components/Header.astro'
      },
      expressiveCode: {
        themes: ['dracula-soft']
      }
    }),
    AutoImport({
      imports: ['$components/Example/Example.astro', '$components/Tip/Tip.astro']
    })
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
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },
    build: {
      target: 'esnext'
    }
  },
  markdown: {
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
  }
})
