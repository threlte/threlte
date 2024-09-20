import { vitePreprocess } from '@astrojs/svelte'

export default {
	extensions: ['.svelte'],
	preprocess: vitePreprocess()
}
