import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import { resolve } from 'path'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
				}
				// {
				// 	label: 'GLTF',
				// 	autogenerate: {
				// 		directory: 'reference/gltf'
				// 	}
				// },
				// {
				// 	label: 'Rapier',
				// 	autogenerate: {
				// 		directory: 'reference/rapier'
				// 	}
				// },
				// {
				// 	label: 'Theatre',
				// 	autogenerate: {
				// 		directory: 'reference/theatre'
				// 	}
				// },
				// {
				// 	label: 'Flex',
				// 	autogenerate: {
				// 		directory: 'reference/flex'
				// 	}
				// }
			],
			locales: {
				root: {
					lang: 'en',
					label: 'English'
				},
				'zh-cn': {
					label: '简体中文',
					lang: 'zh-CN'
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
	vite: {
		resolve: {
			alias: {
				$components: resolve('./src/components'),
				$assets: resolve('./src/assets')
			}
		}
	}
})
