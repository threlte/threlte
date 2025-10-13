import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import mkcert from 'vite-plugin-mkcert'
import { threlteStudio } from '@threlte/studio/vite'
import type { Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import preact from '@astrojs/preact'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import { cpus } from 'os'

const CPU_COUNT = cpus().length

// "@theatre/core" needs to be externalized in development mode but not in production!
const noExternal = ['three', 'troika-three-text', 'postprocessing', '@pmndrs/vanilla']
if (process.env.NODE_ENV === 'production') {
  noExternal.push('@theatre/core')
}

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  markdown: {
    syntaxHighlight: false
  },
  prefetch: {
    prefetchAll: true
  },
  experimental: {
    clientPrerender: true
  },
  integrations: [
    AutoImport({
      imports: ['$components/Example/Example.astro', '$components/Tip/Tip.astro']
    }),
    svelte(),
    starlight({
      title: 'Threlte',
      logo: {
        src: './src/assets/logo/threlte-logo.png',
        replacesTitle: true
      },
      social: [
        { icon: 'github', label: 'Github', href: 'https://github.com/threlte/threlte' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/EqUBCfCaGm' }
      ],
      components: {
        Sidebar: './src/components/Sidebar.astro'
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: 'Learn',
            link: '/learn/',
            icon: 'open-book',
            items: [
              { label: 'Getting Started', autogenerate: { directory: '/learn/getting-started' } },
              { label: 'Basics', autogenerate: { directory: '/learn/basics' } },
              { label: 'Advanced', autogenerate: { directory: '/learn/advanced' } },
              { label: 'More', autogenerate: { directory: '/learn/more' } }
            ]
          }
        ])
      ]
    }),
    mdx({
      gfm: false,
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
      ? [threlteStudio() as unknown as Plugin, mkcert(), tailwindcss()]
      : [threlteStudio() as unknown as Plugin, tailwindcss()],
    ssr: {
      noExternal: noExternal
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      terserOptions: {
        keep_classnames: true
      },
      rollupOptions: {
        external: ['sharp'],
        maxParallelFileOps: CPU_COUNT * 3,
        output: {
          manualChunks: undefined
        }
      }
    }
  },
  build: {
    concurrency: 4
  }
})
