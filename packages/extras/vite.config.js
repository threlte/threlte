import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [mode === 'test' ? svelte() : sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : undefined
  },
  ...(mode === 'test' && {
    optimizeDeps: {
      exclude: ['@threlte/core', '@threlte/extras'],
      entries: ['src/lib/**/*.svelte', resolve('../core/src/lib/index.ts')]
    }
  }),
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    // Run test files sequentially and retry once to handle Vite browser mode
    // reload races. Late dep discovery can trigger a server reload that kills
    // in-flight module fetches. Sequential execution limits this to at most one
    // file, and the retry succeeds because deps are cached after the first pass.
    fileParallelism: false,
    retry: 1,
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    }
  }
}))
