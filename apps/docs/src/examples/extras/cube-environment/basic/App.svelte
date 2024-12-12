<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Folder, List, Pane, Slider } from 'svelte-tweakpane-ui'

  let autoRotateCamera = $state(false)
  let useEnvironment = $state(true)
  let environmentInputsDisabled = $derived(!useEnvironment)
  let environmentIsBackground = $state(true)
  let materialRoughness = $state(0)
  let materialMetalness = $state(1)

  const cubes = {
    bridge: 'bridge',
    pisa: 'pisa'
  }

  const pathMap = {
    bridge: '/textures/cube/Bridge2_cube/',
    pisa: '/textures/cube/pisaHDR/'
  }

  const filesMap = {
    bridge: ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'],
    pisa: ['nx.hdr', 'ny.hdr', 'nz.hdr', 'px.hdr', 'py.hdr', 'pz.hdr']
  }

  let cube = $state(cubes.bridge)

  const environmentFilesPath = $derived(pathMap[cube as keyof typeof pathMap])
  const environmentFiles = $derived(filesMap[cube as keyof typeof filesMap])
  const environmentUrls = $derived(
    environmentFiles.map((file) => `${environmentFilesPath}${file}`)
  ) as [string, string, string, string, string, string]
</script>

<Pane
  position="fixed"
  title="CubeEnvironment"
>
  <Checkbox
    bind:value={useEnvironment}
    label="use <Environment>"
  />
  <Checkbox
    bind:value={environmentIsBackground}
    disabled={environmentInputsDisabled}
    label="is background"
  />
  <List
    bind:value={cube}
    disabled={environmentInputsDisabled}
    label="cube environment map"
    options={cubes}
  />
  <Folder title="material props">
    <Slider
      disabled={environmentInputsDisabled}
      bind:value={materialMetalness}
      label="metalness"
      min={0}
      max={1}
      step={0.1}
    />
    <Slider
      disabled={environmentInputsDisabled}
      bind:value={materialRoughness}
      label="roughness"
      min={0}
      max={1}
      step={0.1}
    />
  </Folder>
  <Folder title="camera">
    <Checkbox
      bind:value={autoRotateCamera}
      label="auto rotate"
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {autoRotateCamera}
      {environmentIsBackground}
      {environmentUrls}
      {materialMetalness}
      {materialRoughness}
      {useEnvironment}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
