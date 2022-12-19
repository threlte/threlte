import adapter from '@sveltejs/adapter-static'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import preprocess from 'svelte-preprocess'
import { preprocessThrelte } from '@threlte/preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: seqPreprocessor([
		preprocess({
			postcss: true
		}),
		preprocessThrelte({
			extensions: {
				'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
				'three/examples/jsm/controls/TransformControls': ['TransformControls']
			}
		})
	]),

	kit: {
		adapter: adapter({
			pages: './build',
			assets: './build'
		})
	}
}

export default config
