import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { preprocessThrelte } from '@threlte/preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocessThrelte({
			prefix: 'T.',
			extensions: {
				OrbitControls: 'three/examples/jsm/controls/OrbitControls'
			}
		}),
		preprocess({
			postcss: true
		})
	],

	kit: {
		prerender: {
			default: true
		},

		adapter: adapter({
			pages: './build',
			assets: './build'
		})
	}
}

export default config
