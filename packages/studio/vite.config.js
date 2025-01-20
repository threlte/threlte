import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { threlteStudio } from './src/lib/vite'
import Inspect from 'vite-plugin-inspect'

const config = defineConfig({
  plugins: [Inspect(), threlteStudio(), sveltekit()],
  test: {
    include: ['src/**/*.test.ts']
  }
})

export default config
