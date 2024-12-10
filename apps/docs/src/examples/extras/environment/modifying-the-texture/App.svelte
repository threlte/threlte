<script lang="ts">
  import Scene from './Scene.svelte'
  import type { ListOptions } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { Checkbox, List, Pane } from 'svelte-tweakpane-ui'

  let flipY = $state(true)

  const urlOptions: ListOptions<string> = {
    aerodynamics_workshop_1k: '/textures/equirectangular/hdr/aerodynamics_workshop_1k.hdr',
    shanghai_riverside_1k: '/textures/equirectangular/hdr/shanghai_riverside_1k.hdr'
  } as const

  let url = $state(urlOptions.aerodynamics_workshop_1k)
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
    options={urlOptions}
    label="url"
    bind:value={url}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {url}
      {flipY}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
