import path from 'node:path'
import url from 'node:url'

/**
 * Vite plugin to configure @threlte/test.
 *
 * Ensures Svelte is imported correctly in tests
 * and that the DOM is cleaned up after each test.
 *
 * @param {{resolveBrowser?: boolean, autoCleanup?: boolean}} options
 * @returns {import('vite').Plugin}
 */
export const threlteTesting = ({
  resolveBrowser = true,
  autoCleanup = true,
  noExternal = true,
} = {}) => {
  return {
    name: 'vite-plugin-threlte-test-renderer',

    config: (config) => {
      if (!process.env.VITEST) {
        return
      }

      if (resolveBrowser) {
        addBrowserCondition(config)
      }

      if (autoCleanup) {
        addAutoCleanup(config)
      }

      if (noExternal) {
        addNoExternal(config)
      }
    },
  }
}

/**
 * Add `browser` to `resolve.conditions` before `node`.
 *
 * This ensures that Svelte's browser code is used in tests,
 * rather than its SSR code.
 *
 * @param {import('vitest/config').UserConfig} config
 */
const addBrowserCondition = (config) => {
  const resolve = config.resolve ?? {}
  const conditions = resolve.conditions ?? []
  const nodeConditionIndex = conditions.indexOf('node')
  const browserConditionIndex = conditions.indexOf('browser')

  if (
    nodeConditionIndex !== -1 &&
    (nodeConditionIndex < browserConditionIndex || browserConditionIndex === -1)
  ) {
    conditions.splice(nodeConditionIndex, 0, 'browser')
  }

  resolve.conditions = conditions
  config.resolve = resolve
}

/**
 * Add auto-cleanup file to Vitest's setup files.
 *
 * @param {import('vitest/config').UserConfig} config
 */
const addAutoCleanup = (config) => {
  const test = config.test ?? {}
  let setupFiles = test.setupFiles ?? []

  if (test.globals) {
    return
  }

  if (typeof setupFiles === 'string') {
    setupFiles = [setupFiles]
  }

  setupFiles.push(
    path.join(path.dirname(url.fileURLToPath(import.meta.url)), './vitest.js')
  )

  test.setupFiles = setupFiles
  config.test = test
}

/**
 * Add `@threlte/test` to Vite's noExternal rules, if not present.
 *
 * This ensures `@threlte/test` is processed by `@sveltejs/vite-plugin-svelte`
 * in certain monorepo setups.
 *
 *
 * @param {import('vitest/config').UserConfig} config
 */
const addNoExternal = (config) => {
  const ssr = config.ssr ?? {}
  let noExternal = ssr.noExternal ?? []

  if (noExternal === true) {
    return
  }

  if (typeof noExternal === 'string' || noExternal instanceof RegExp) {
    noExternal = [noExternal]
  }

  if (!Array.isArray(noExternal)) {
    return
  }

  for (const rule of noExternal) {
    if (typeof rule === 'string' && rule === '@threlte/test') {
      return
    }

    if (rule instanceof RegExp && rule.test('@threlte/test')) {
      return
    }
  }

  noExternal.push('@threlte/test')
  ssr.noExternal = noExternal
  config.ssr = ssr
}
