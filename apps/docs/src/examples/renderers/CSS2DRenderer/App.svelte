<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let element = $state<HTMLElement>()
</script>

<div
  id="css-renderer-target"
  bind:this={element}
></div>

<div id="main">
  <Canvas>
    {#if element !== undefined}
      <Scene {element} />
    {/if}
  </Canvas>
</div>

<style>
  div#main {
    height: 100%;
  }
  #css-renderer-target {
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
  }
</style>
