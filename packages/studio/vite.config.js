import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

const config = defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.test.ts']
  }
})

export default config
