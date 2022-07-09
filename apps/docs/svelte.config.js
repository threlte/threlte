import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		prerender: {
			default: true
		},

		adapter: adapter()
	}
}

export default config
