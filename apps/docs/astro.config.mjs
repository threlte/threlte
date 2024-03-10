import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'

// import AutoImport from 'astro-auto-import'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'

// "@theatre/core" needs to be externalized in development mode but not in production!
const noExternal = ['three', 'troika-three-text', 'postprocessing', '@pmndrs/vanilla']
if (process.env.NODE_ENV === 'production') {
  noExternal.push('@theatre/core')
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    // AutoImport({
    //   imports: [
    //     // '$components/Example/Example.astro',
    //     './src/components/Tip/Tip.astro'
    //     // '$components/ManualInstallGuide/ManualInstallGuide.svelte',
    //     // '$components/Card/Card.astro'
    //   ]
    // }),
    tailwind({
      nesting: true
    }),
    svelte(),
    starlight({
      title: 'Threlte',
      favicon: '/icons/favicon.ico',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            href: '/icons/favicon-32x32.png',
            sizes: '32x32'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            href: '/icons/favicon-16x16.png',
            sizes: '16x16'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'mask-icon',
            href: '/icons/safari-pinned-tab.svg',
            color: '#fe3d00'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'shortcut icon',
            href: '/icons/favicon.ico'
          }
        }
      ],
      social: {
        github: 'https://github.com/threlte/threlte',
        discord: 'https://discord.gg/EqUBCfCaGm',
        twitter: 'https://twitter.com/threlte'
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            {
              label: 'Getting Started',
              link: '/getting-started/'
            },
            {
              label: 'Installation',
              link: '/getting-started/installation'
            },
            {
              label: 'Migration Guides',
              link: 'getting-started/migration-guides'
            }
          ]
        },
        {
          label: 'Basics',
          items: [
            {
              label: 'App Structure',
              link: 'basics/app-structure'
            },
            {
              label: 'Scheduling Tasks',
              link: 'basics/scheduling-tasks'
            },
            {
              label: 'Handling Events',
              link: 'basics/handling-events'
            },
            {
              label: 'Loading Assets',
              link: 'basics/loading-assets'
            },
            {
              label: 'Render Modes',
              link: 'basics/render-modes'
            },
            {
              label: 'Disposing Objects',
              link: 'basics/disposing-objects'
            },
            {
              label: 'Plugins',
              link: 'basics/plugins'
            }
          ]
        },
        {
          label: 'Tutorials',
          link: 'tutorials/'
        },
        {
          label: 'Reference',
          items: [
            {
              label: 'Core',
              link: '/reference/core/'
            },
            {
              label: 'Extras',
              link: '/reference/extras/'
            },
            {
              label: 'Rapier',
              link: '/reference/rapier/'
            },
            {
              label: 'Theatre',
              link: '/reference/theatre/'
            },
            {
              label: 'XR',
              link: '/reference/xr/'
            },
            {
              label: 'Flex',
              link: '/reference/flex/'
            },
            {
              label: 'gltf',
              link: '/reference/gltf/'
            }
          ]
        }
      ],
      logo: {
        replacesTitle: true,
        src: './src/assets/logo/threlte-logo.png'
      },
      components: {
        Header: './src/components/Header/Header.astro',
        PageFrame: './src/layouts/PageFrame.astro'
        // MobileTableOfContents: './src/components/MobileTableOfContents.astro'
      }

      // customCss: [
      //   // Relative path to your custom CSS file
      //   './src/styles/app.css',
      //   './src/styles/code.css',
      //   './src/styles/dracula.css',
      //   './src/styles/markprompt.css',
      //   './src/styles/prose.css',
      //   './src/styles/variables.css'
      // ],

      // links validator needs work to complete and should be turned on at the end
      // plugins: [starlightLinksValidator()]
    })
  ],
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
        $hooks: resolve('./src/hooks'),
        $data: resolve('./src/data')
      }
    },
    ssr: {
      noExternal: noExternal
    },
    legacy: {
      // vite 5 changed how externalized modules work - need to use this flag to keep old behaviour
      // https://vitejs.dev/guide/migration#ssr-externalized-modules-value-now-matches-production
      proxySsrExternalModules: true
    }
  }
  //   // Use https and generate a cert to allow XR debugging.
  //   // server: {
  //   //   https: process.argv.includes('--https')
  //   // },
  //   // plugins: process.argv.includes('--https') ? [mkcert()] : [],
  // }
})
