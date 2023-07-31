<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Project, Sheet } from '@threlte/theatre'

  import Scene from './Scene.svelte'
  import state from './state.json'
</script>

<Canvas>
  <Project config={{ state }}>
    <Sheet>
      <Scene />
    </Sheet>
  </Project>
</Canvas>

<style>
  :global(canvas) {
    height: 100%;
  }
</style>
