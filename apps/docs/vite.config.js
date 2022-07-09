import { resolve } from 'path'
import { sveltekit } from '@sveltejs/kit/vite'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import Icons from 'unplugin-icons/vite'

/** @type {import('vite').UserConfig} */
const config = {
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	plugins: [
		{ ...threeMinifier(), enforce: 'pre' },
		Icons({ compiler: 'svelte' }),
		kitDocsPlugin({
			shiki: {
				theme: 'material-ocean'
			},
			markdown: {
				components: [
					{ name: 'ModuleSummary', type: 'custom', container: { marker: '!' } },
					{ name: 'CodeWrapper', type: 'custom', container: { marker: '&' } }
				]
			}
		}),
		// Icons({ compiler: 'svelte' }),
		// kitDocsPlugin({
		// 	shiki: {
		// 		theme: 'material-ocean',
		// 	},
		// }),
		sveltekit()
	],
	resolve: {
		alias: {
			$components: resolve('src/components'),
			$examples: resolve('src/examples')
		}
	}
}

export default config
