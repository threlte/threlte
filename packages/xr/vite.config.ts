import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import mkcertModule from 'vite-plugin-mkcert'
const mkcert = mkcertModule as unknown as typeof import('vite-plugin-mkcert').default

export default defineConfig({
  plugins: [mkcert(), sveltekit()]
})
