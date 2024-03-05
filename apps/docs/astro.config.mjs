import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'

import AutoImport from 'astro-auto-import'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({
      imports: [
        // '$components/Example/Example.astro',
        '$components/Tip/Tip.astro'
        // '$components/ManualInstallGuide/ManualInstallGuide.svelte',
        // '$components/Card/Card.astro'
      ]
    }),
    tailwind(),
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
              label: 'Introduction',
              link: '/getting-started/introduction'
            },
            {
              label: 'Installation',
              link: '/getting-started/installation'
            }
          ]
        },
        {
          label: 'Core Concepts',
          items: [
            {
              label: 'Why Threlte?',
              link: 'concepts/threlte'
            }
          ]
        },
        {
          label: 'Tutorials',
          link: 'tutorials'
        },
        {
          label: 'Basics',
          items: [
            {
              label: 'App Structure',
              link: 'basics/structure'
            }
          ]
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
      },
      plugins: [starlightLinksValidator()]
    })
  ]
})
