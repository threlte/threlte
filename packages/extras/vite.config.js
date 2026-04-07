import { resolve } from 'path'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig(({ mode }) => ({
  plugins: [mode === 'test' ? svelte() : sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : undefined
  },
  ...(mode === 'test' && {
    optimizeDeps: {
      exclude: ['@threlte/core', '@threlte/extras'],
      entries: ['src/lib/**/*.svelte', resolve('../core/src/lib/index.ts')],
      include: ['three', 'svelte']
    },
    server: {
      warmup: {
        clientFiles: ['src/lib/interactivity/__tests__/**/*.spec.ts']
      }
    }
  }),
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    testTimeout: 20_000,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    }
  }
}))
