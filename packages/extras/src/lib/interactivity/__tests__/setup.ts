/**
 * Pre-import heavy dependencies so the module graph is warm before
 * any test file is dynamically imported. This prevents flaky
 * "Failed to fetch dynamically imported module" errors in CI.
 */
import '@threlte/test'
import './__fixtures__/Scene.svelte'
import './__fixtures__/PropagationScene.svelte'
import './__fixtures__/OverlappingScene.svelte'
