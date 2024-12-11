<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, List, Pane } from 'svelte-tweakpane-ui'

  let flipY = $state(true)

  const urlOptions = {
    aerodynamics_workshop_1k: '/textures/equirectangular/hdr/aerodynamics_workshop_1k.hdr',
    shanghai_riverside_1k: '/textures/equirectangular/hdr/shanghai_riverside_1k.hdr'
  }

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
