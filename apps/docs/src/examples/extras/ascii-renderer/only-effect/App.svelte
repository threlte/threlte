<script lang="ts">
  import Scene from './Scene.svelte'
  import type { AsciiEffect } from 'three/examples/jsm/Addons.js'
  import { AsciiRenderer } from '@threlte/extras'
  import { Canvas } from '@threlte/core'

  let asciiRenderer: Component | undefined = $state()
</script>

<div>
  <Canvas>
    <AsciiRenderer
      autoRender={false}
      bind:this={asciiRenderer}
      options={{ color: true }}
    >
      {#snippet children({ asciiEffect })}
        <Scene {asciiEffect} />
      {/snippet}
    </AsciiRenderer>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
