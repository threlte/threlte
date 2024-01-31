import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [mkcert(), sveltekit()],
  ssr: {
    noExternal: ['three']
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
