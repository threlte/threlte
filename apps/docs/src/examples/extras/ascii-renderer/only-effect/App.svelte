<script lang="ts">
  import Scene from './Scene.svelte'
  import type { AsciiEffect } from 'three/examples/jsm/Addons.js'
  import type { AsciiEffectOptions } from 'three/examples/jsm/Addons.js'
  import { AsciiRenderer } from '@threlte/extras'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let asciiRenderer: Component | undefined = $state()

  let color = $state(false)

  const options: AsciiEffectOptions = $derived({ color })
</script>

<Pane
  title="render on update"
  position="fixed"
>
  <Checkbox
    bind:value={color}
    label="color"
  />
</Pane>

<div>
  <Canvas>
    <AsciiRenderer
      autoRender={false}
      bind:this={asciiRenderer}
      {options}
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
