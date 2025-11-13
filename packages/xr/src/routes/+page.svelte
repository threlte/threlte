<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { ARButton } from '$lib/index.js'
  import Scene from './scene.svelte'
</script>

<main>
  <Canvas>
    <Scene />
  </Canvas>

  <ARButton
    sessionInit={{
      domOverlay: typeof document !== 'undefined' ? { root: document.body } : undefined,
      optionalFeatures: ['dom-overlay', 'light-estimation', 'dom-overlay-for-handheld-ar']
    }}
  />
</main>

<style>
  :global(body) {
    margin: 0;
  }
  main {
    height: 100dvh;
  }
</style>
