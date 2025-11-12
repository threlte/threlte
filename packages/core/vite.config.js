import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : undefined,
    alias: {
      threlte: resolve('./src/lib')
    }
  },
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    environment: 'happy-dom',
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true
  }
}))
