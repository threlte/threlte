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
			customCss: ['./src/styles/app.css', '@fontsource/inter/400.css'],
			components: {
				Head: '$components/Head.astro',
				Header: '$components/Header.astro',
				Sidebar: '$components/Sidebar.astro',
				MobileMenuFooter: '$components/MobileMenuFooter.astro'
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
					autogenerate: {
						directory: 'reference/core'
					}
				},
				{
					label: 'extras',
					autogenerate: {
						directory: 'reference/extras'
					}
				},
				{
					label: 'gltf',
					autogenerate: {
						directory: 'reference/gltf'
					}
				},
				{
					label: 'rapier',
					autogenerate: {
						directory: 'reference/rapier'
					}
				},
				{
					label: 'theatre',
					autogenerate: {
						directory: 'reference/theatre'
					}
				},
				{
					label: 'flex',
					autogenerate: {
						directory: 'reference/flex'
					}
				},
				{
					label: 'xr',
					autogenerate: {
						directory: 'reference/xr'
					}
				},
				{
					label: 'studio',
					autogenerate: {
						directory: 'reference/studio'
					}
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
