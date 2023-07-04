import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { resolve } from 'path'
import preprocess from 'svelte-preprocess'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import image from '@astrojs/image'

// https://astro.build/config
import svelte from '@astrojs/svelte'

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({
      imports: [
        '$components/Example/Example.astro',
        '$components/Tip/Tip.astro',
        '$components/ManualInstallGuide/ManualInstallGuide.svelte'
      ]
    }),
    tailwind(),
    image(),
    svelte({
      preprocess: preprocess({
        postcss: true
      })
    }),
    mdx({
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
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
    ssr: {
      noExternal: ['three', 'troika-three-text', 'postprocessing']
    }
  },
  markdown: {
    syntaxHighlight: false
    // rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
})
