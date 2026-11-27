import { sveltekit } from '@sveltejs/kit/vite'
import { playwright } from '@vitest/browser-playwright'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'

import { threlteTesting } from './src/lib/plugin'

const require = createRequire(import.meta.url)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [sveltekit(), threlteTesting()],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    coverage: { include: ['src'] },
    mockReset: true,
    unstubGlobals: true,
    alias: {
      '@threlte/test/plugin': require.resolve('./src/lib/plugin.js'),
      '@threlte/test': require.resolve('./src/lib/index.js'),
    },
  },
}))
