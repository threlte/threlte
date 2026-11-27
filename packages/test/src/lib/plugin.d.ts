import type { Plugin } from 'vite'

/**
 * Vite plugin to configure @threlte/test.
 *
 * Ensures Svelte is imported correctly in tests
 * and that the DOM is cleaned up after each test.
 */
export function threlteTesting(options?: {
  resolveBrowser?: boolean
  autoCleanup?: boolean
}): Plugin
