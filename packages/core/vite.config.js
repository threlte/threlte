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
  // Workaround: vite-plugin-svelte's optimize-module plugin doesn't strip
  // TypeScript from .svelte.ts files before calling svelte.compileModule(),
  // causing parse errors during dep pre-bundling in browser mode.
  ...(mode === 'test' && {
    optimizeDeps: {
      exclude: ['@threlte/core', '@threlte/extras', '@threlte/test']
    }
  }),
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    }
  }
}))
