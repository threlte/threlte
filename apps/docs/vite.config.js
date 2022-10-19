import { resolve } from 'path'
import { sveltekit } from '@sveltejs/kit/vite'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import Icons from 'unplugin-icons/vite'

/** @type {import('vite').UserConfig} */
const config = {
	legacy: { buildSsrCjsExternalHeuristics: true },
	optimizeDeps: {
		include: [
			'codemirror',
			'codemirror/mode/javascript/javascript.js',
			'codemirror/mode/handlebars/handlebars.js',
			'codemirror/mode/htmlmixed/htmlmixed.js',
			'codemirror/mode/xml/xml.js',
			'codemirror/mode/css/css.js',
			'codemirror/mode/markdown/markdown.js',
			'codemirror/addon/edit/closebrackets.js',
			'codemirror/addon/edit/closetag.js',
			'codemirror/addon/edit/continuelist.js',
			'codemirror/addon/comment/comment.js',
			'codemirror/addon/fold/foldcode.js',
			'codemirror/addon/fold/foldgutter.js',
			'codemirror/addon/fold/brace-fold.js',
			'codemirror/addon/fold/xml-fold.js',
			'codemirror/addon/fold/indent-fold.js',
			'codemirror/addon/fold/markdown-fold.js',
			'codemirror/addon/fold/comment-fold.js'
		]
	},
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	plugins: [
		{ ...threeMinifier(), enforce: 'pre' },
		Icons({ compiler: 'svelte' }),
		kitDocsPlugin({
			shiki: {
				theme: 'github-dark'
			},
			markdown: {
				components: [
					{ name: 'ModuleSummary', type: 'custom', container: { marker: '!' } },
					{ name: 'CodeWrapper', type: 'custom', container: { marker: '&' } },
					{ name: 'OpenInPlayground', type: 'custom', container: { marker: ':' } }
				]
			}
		}),
		sveltekit()
	],
	resolve: {
		alias: {
			$examples: resolve('./src/examples')
		}
	}
}

export default config
