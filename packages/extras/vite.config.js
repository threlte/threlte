/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import { searchForWorkspaceRoot, defineConfig } from 'vite'
import { threeMinifier } from '@yushijinhun/three-minifier-rollup'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { playwright } from '@vitest/browser-playwright'

const packageRoot = __dirname
const workspaceRoot = searchForWorkspaceRoot(packageRoot)

export default defineConfig(({ mode }) => ({
  root: packageRoot,
  plugins: [
    mode === 'test' ? [...svelte()] : [...sveltekit(), { ...threeMinifier(), enforce: 'pre' }]
  ],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : undefined
  },
  server:
    mode === 'test'
      ? {
          fs: {
            allow: [workspaceRoot, packageRoot]
          }
        }
      : undefined,
  optimizeDeps:
    mode === 'test'
      ? {
          exclude: ['@threlte/core', '@threlte/extras'],
          entries: ['src/lib/**/*.svelte', resolve(packageRoot, '../core/src/lib/index.ts')],
          include: ['three', 'svelte']
        }
      : undefined,
  test: {
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.svelte.ts'],
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    fileParallelism: true,
    testTimeout: 20_000,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    }
  }
}))
