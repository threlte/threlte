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
    svelte(),
    starlight({
      title: 'Threlte',
      social: {
        github: 'https://github.com/threlte/threlte',
        discord: 'https://discord.gg/EqUBCfCaGm',
        twitter: 'https://twitter.com/threlte'
      },
      sidebar: [
        {
          label: 'Start Here',
          autogenerate: {
            directory: 'getting-started'
          }
        },
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              link: '/guides/example/'
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
    }),
    tailwind()
  ]
})
