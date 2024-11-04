import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import { resolve } from 'path'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const noExternal = ['three', 'troika-three-text', 'postprocessing', '@pmndrs/vanilla']
if (process.env.NODE_ENV === 'production') {
  noExternal.push('@theatre/core')
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap'
        }
      ]
    ]
  },
  integrations: [
    starlight({
      title: 'Threlte',
      logo: {
        src: '$assets/logo/threlte-logo.png',
        replacesTitle: true
      },
      favicon: '/icons/favicon.ico',
      social: {
        github: 'https://github.com/threlte/threlte',
        twitter: 'https://twitter.com/threlte',
        discord: 'https://discord.gg/EqUBCfCaGm'
      },
      customCss: ['src/styles/app.css', '@fontsource/inter/400.css'],
      components: {
        Head: '$components/Head.astro',
        Header: '$components/Header.astro',
        Sidebar: '$components/Sidebar.astro',
        MobileMenuFooter: '$components/MobileMenuFooter.astro',
        MarkdownContent: '$components/MarkdownContent.astro'
      },
      sidebar: [
        {
          label: 'learn',
          items: [
            {
              label: 'Getting Started',
              autogenerate: {
                directory: 'learn/getting-started'
              }
            },
            {
              label: 'Basics',
              autogenerate: {
                directory: 'learn/basics'
              }
            },
            {
              label: 'Advanced',
              autogenerate: {
                directory: 'learn/advanced'
              }
            },
            {
              label: 'More',
              autogenerate: {
                directory: 'learn/more'
              }
            }
          ]
        },
        {
          label: 'examples',
          autogenerate: {
            directory: 'examples'
          }
        },
        {
          label: 'core',
          items: [
            {
              label: 'Getting Started',
              link: 'reference/core/getting-started'
            },
            {
              label: 'Components',
              autogenerate: {
                directory: 'reference/core/components'
              }
            },
            {
              label: 'Hooks',
              autogenerate: {
                directory: 'reference/core/hooks'
              }
            },
            {
              label: 'Helpers',
              autogenerate: {
                directory: 'reference/core/helpers'
              }
            }
          ]
        },
        {
          label: 'extras',
          items: [
            {
              label: 'Getting Started',
              link: 'reference/extras/getting-started'
            },
            {
              label: 'Content',
              autogenerate: {
                directory: 'reference/extras/content'
              }
            },
            {
              label: 'Loading',
              autogenerate: {
                directory: 'reference/extras/loading'
              }
            },
            {
              label: 'Interaction',
              autogenerate: {
                directory: 'reference/extras/interaction'
              }
            },
            {
              label: 'Audio',
              autogenerate: {
                directory: 'reference/extras/audio'
              }
            },
            {
              label: 'Staging',
              autogenerate: {
                directory: 'reference/extras/staging'
              }
            },
            {
              label: 'Visual Effects',
              autogenerate: {
                directory: 'reference/extras/vfx'
              }
            },
            {
              label: 'Performance',
              autogenerate: {
                directory: 'reference/extras/performance'
              }
            },
            {
              label: 'Misc',
              autogenerate: {
                directory: 'reference/extras/misc'
              }
            }
          ]
        },
        {
          label: 'gltf',
          autogenerate: {
            directory: 'reference/gltf'
          }
        },
        {
          label: 'rapier',
          items: [
            {
              label: 'Getting Started',
              link: 'reference/rapier/getting-started'
            },
            {
              label: 'Concepts',
              autogenerate: {
                directory: 'reference/rapier/concepts'
              }
            },
            {
              label: 'Components',
              autogenerate: {
                directory: 'reference/rapier/components'
              }
            },
            {
              label: 'Hooks',
              autogenerate: {
                directory: 'reference/rapier/hooks'
              }
            },
            {
              label: 'Joints',
              autogenerate: {
                directory: 'reference/rapier/joints'
              }
            }
          ]
        },
        {
          label: 'theatre',
          items: [
            {
              label: 'Getting Started',
              link: 'reference/theatre/getting-started'
            },
            {
              label: 'Components',
              autogenerate: {
                directory: 'reference/theatre/components'
              }
            },
            {
              label: 'Sheet Object',
              autogenerate: {
                directory: 'reference/theatre/sheet-object'
              }
            },
            {
              label: 'Hooks',
              autogenerate: {
                directory: 'reference/theatre/hooks'
              }
            },
            {
              label: 'Actions',
              autogenerate: {
                directory: 'reference/theatre/actions'
              }
            }
          ]
        },
        {
          label: 'flex',
          items: [
            {
              label: 'Getting Started',
              link: 'reference/flex/getting-started'
            },
            {
              label: 'Examples',
              link: 'reference/flex/examples'
            },
            {
              label: 'Components',
              autogenerate: {
                directory: 'reference/flex/components'
              }
            },
            {
              label: 'Utilities',
              autogenerate: {
                directory: 'reference/flex/utilities'
              }
            },
            {
              label: 'Hooks',
              autogenerate: {
                directory: 'reference/flex/hooks'
              }
            }
          ]
        },
        {
          label: 'xr',
          items: [
            {
              label: 'Getting Started',
              link: 'reference/xr/getting-started'
            },
            {
              label: 'Components',
              autogenerate: {
                directory: 'reference/xr/components'
              }
            },
            {
              label: 'Controls',
              autogenerate: {
                directory: 'reference/xr/controls'
              }
            },
            {
              label: 'Hooks',
              autogenerate: {
                directory: 'reference/xr/hooks'
              }
            }
          ]
        },
        {
          label: 'studio',
          items: [
            {
              label: 'Getting Started',
              autogenerate: {
                directory: 'reference/studio/getting-started'
              }
            },
            {
              label: 'Components',
              autogenerate: {
                directory: 'reference/studio/components'
              }
            },
            {
              label: 'Extensions',
              autogenerate: {
                directory: 'reference/studio/extensions'
              }
            }
          ]
        }
      ],
      locales: {
        root: {
          lang: 'en',
          label: 'English'
        },
        de: {
          label: 'German',
          lang: 'de'
        }
      },
      editLink: {
        baseUrl: 'https://github.com/threlte/threlte/edit/main/apps/docs'
      },
      expressiveCode: {
        themes: ['dracula-soft']
      },
      plugins: [starlightLinksValidator()]
    }),
    svelte(),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false
    })
  ],
  site: 'https://threlte.xyz',
  vite: {
    resolve: {
      alias: {
        $components: resolve('./src/components'),
        $assets: resolve('./src/assets')
      }
    },
    ssr: {
      // "@theatre/core" needs to be externalized in development mode but not in production!
      noExternal: noExternal
    },
    // Use https and generate a cert to allow XR debugging.
    server: {
      https: process.argv.includes('--https')
    },
    plugins: process.argv.includes('--https') ? [mkcert()] : [],
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },
    build: {
      target: 'esnext'
    }
  }
})
