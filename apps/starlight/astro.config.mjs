import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Threlte',
      social: {
        github: 'https://github.com/threlte/threlte',
        'x.com': 'https://twitter.com/threlte',
        discord: 'https://discord.gg/EqUBCfCaGm'
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', link: '/guides/example/' }
          ]
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' }
        }
      ],
      components: {
        Header: './src/components/Header/Header.astro'
      }
    })
  ]
})
