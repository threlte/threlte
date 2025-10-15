import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import mkcert from 'vite-plugin-mkcert'
import { threlteStudio } from '@threlte/studio/vite'
import type { Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
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
      editLink: {
        baseUrl: 'https://github.com/threlte/threlte/edit/main/'
      },
      components: {
        Sidebar: './src/components/Sidebar.astro'
      },
      customCss: ['./src/styles/app.css', './src/styles/globals.css'],
      plugins: [
        starlightSidebarTopics([
          {
            label: 'Learn',
            link: '/learn/getting-started/introduction',
            icon: 'open-book',
            items: [
              { label: 'Getting Started', autogenerate: { directory: '/learn/getting-started' } },
              { label: 'Basics', autogenerate: { directory: '/learn/basics' } },
              { label: 'Advanced', autogenerate: { directory: '/learn/advanced' } },
              { label: 'More', autogenerate: { directory: '/learn/more' } }
            ]
          },
          {
            label: 'Examples',
            link: '/examples/getting-started',
            icon: 'document',
            items: [
              { label: 'Getting Started', link: '/examples/getting-started' },
              { label: 'Content', autogenerate: { directory: '/examples/content' } },
              { label: 'Staging', autogenerate: { directory: '/examples/staging' } },
              { label: 'Visual Effects', autogenerate: { directory: '/examples/visual-effects' } },
              { label: 'Misc', autogenerate: { directory: '/examples/misc' } }
            ]
          },
          {
            label: 'Core',
            link: '/reference/core/getting-started',
            icon: 'right-caret',
            items: [
              { label: 'Getting Started', link: '/reference/core/getting-started' },
              { label: 'Components', autogenerate: { directory: '/reference/core/components' } },
              { label: 'Hooks', autogenerate: { directory: '/reference/core/hooks' } },
              { label: 'Helpers', autogenerate: { directory: '/reference/core/helpers' } }
            ]
          },
          {
            label: 'Extras',
            link: '/reference/extras/getting-started',
            icon: 'right-caret',
            items: [
              { label: 'Getting Started', link: '/reference/extras/getting-started' },
              { label: 'Content', autogenerate: { directory: '/reference/extras/content' } },
              {
                label: 'Interaction',
                autogenerate: { directory: '/reference/extras/interaction' }
              },
              { label: 'Loading', autogenerate: { directory: '/reference/extras/loading' } },
              { label: 'Staging', autogenerate: { directory: '/reference/extras/staging' } },
              {
                label: 'Visual Effects',
                autogenerate: { directory: '/reference/extras/visual-effects' }
              },
              { label: 'Audio', autogenerate: { directory: '/reference/extras/audio' } },
              {
                label: 'Performance',
                autogenerate: { directory: '/reference/extras/performance' }
              },
              { label: 'Misc', autogenerate: { directory: '/reference/extras/misc' } }
            ]
          },
          {
            label: 'Rapier',
            icon: 'right-caret',
            link: '/reference/rapier/getting-started',
            items: [
              { label: 'Getting Started', link: '/reference/rapier/getting-started' },
              { label: 'Concepts', autogenerate: { directory: '/reference/rapier/concepts' } },
              { label: 'Components', autogenerate: { directory: '/reference/rapier/components' } },
              { label: 'Hooks', autogenerate: { directory: '/reference/rapier/hooks' } },
              { label: 'Joints', autogenerate: { directory: '/reference/rapier/joints' } }
            ]
          },
          {
            label: 'Theatre',
            icon: 'right-caret',
            link: '/reference/theatre/getting-started',
            items: [
              { label: 'Getting Started', link: '/reference/theatre/getting-started' },
              { label: 'Components', autogenerate: { directory: '/reference/theatre/components' } },
              {
                label: 'Sheet Object',
                autogenerate: { directory: '/reference/theatre/sheet-object' }
              },
              { label: 'Hooks', autogenerate: { directory: '/reference/theatre/hooks' } },
              { label: 'Actions', autogenerate: { directory: '/reference/theatre/actions' } }
            ]
          },
          {
            label: 'XR',
            icon: 'right-caret',
            link: '/reference/xr/getting-started',
            items: [
              { label: 'Getting Started', link: '/reference/xr/getting-started' },
              { label: 'Components', autogenerate: { directory: '/reference/xr/components' } },
              { label: 'Controls', autogenerate: { directory: '/reference/xr/controls' } },
              { label: 'Hooks', autogenerate: { directory: '/reference/xr/hooks' } }
            ]
          },
          {
            label: 'Flex',
            icon: 'right-caret',
            link: '/reference/flex/getting-started',
            items: [
              { label: 'Getting Started', link: '/reference/flex/getting-started' },
              { label: 'Examples', link: '/reference/flex/examples' },
              { label: 'Components', autogenerate: { directory: '/reference/flex/components' } },
              { label: 'Utilities', autogenerate: { directory: '/reference/flex/utilities' } },
              { label: 'Hooks', autogenerate: { directory: '/reference/flex/hooks' } }
            ]
          },
          {
            label: 'Studio',
            icon: 'right-caret',
            link: '/reference/studio/getting-started',
            items: [
              { label: 'Getting Started', link: '/reference/studio/getting-started' },
              {
                label: 'Deploying to Production',
                link: '/reference/studio/deploying-to-production'
              },
              { label: 'Components', autogenerate: { directory: '/reference/studio/components' } },
              { label: 'Advanced', autogenerate: { directory: '/reference/studio/advanced' } },
              { label: 'Extensions', autogenerate: { directory: '/reference/studio/extensions' } }
            ]
          },
          {
            label: 'GLTF (cli)',
            icon: 'forward-slash',
            link: '/reference/gltf/getting-started',
            items: [{ label: 'Getting Started', link: '/reference/gltf/getting-started' }]
          }
        ])
      ]
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
