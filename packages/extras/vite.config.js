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
      exclude: ['@threlte/core', '@threlte/extras', '@threlte/test'],
      entries: ['src/lib/**/*.svelte', resolve('../core/src/lib/index.ts')]
    }
  }),
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    // Retry once — Vite browser mode can reload mid-import when dep
    // optimization discovers new dependencies during the first run.
    // The retry always succeeds because deps are cached after the first pass.
    retry: 1,
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    }
  }
}))
