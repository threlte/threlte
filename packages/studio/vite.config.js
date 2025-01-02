import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { threlteStudio } from './src/lib/vite'

const config = defineConfig({
  plugins: [threlteStudio(), sveltekit()],
  test: {
    include: ['src/**/*.test.ts']
  }
})

export default config
