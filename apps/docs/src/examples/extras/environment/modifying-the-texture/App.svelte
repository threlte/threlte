<script lang="ts">
  import Scene from './Scene.svelte'
  import type { ListOptions } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { Checkbox, List, Pane } from 'svelte-tweakpane-ui'

  let flipY = $state(true)

  const fileOptions: ListOptions<string> = {
    aerodynamics_workshop_1k: '/textures/equirectangular/hdr/aerodynamics_workshop_1k.hdr',
    shanghai_riverside_1k: '/textures/equirectangular/hdr/shanghai_riverside_1k.hdr'
  } as const

  let file = $state(fileOptions.aerodynamics_workshop_1k)
</script>

<Pane
  position="fixed"
  title="Modifying the Texture"
>
  <Checkbox
    bind:value={flipY}
    label="flipY"
  />
  <List
    options={fileOptions}
    label="file"
    bind:value={file}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {file}
      {flipY}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
