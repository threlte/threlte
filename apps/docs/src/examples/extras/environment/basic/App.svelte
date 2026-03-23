<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Folder, List, Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let autoRotateCamera = $state(false)
  let environmentIsBackground = $state(true)
  let useEnvironment = $state(true)
  let environmentInputsDisabled = $derived(!useEnvironment)

  const extensions = {
    exr: 'exr',
    hdr: 'hdr',
    jpg: 'jpg'
  }

  const hdrFiles = {
    aerodynamics_workshop: 'aerodynamics_workshop_1k.hdr',
    industrial_sunset_puresky: 'industrial_sunset_puresky_1k.hdr',
    mpumalanga_veld_puresky: 'mpumalanga_veld_puresky_1k.hdr',
    shanghai_riverside: 'shanghai_riverside_1k.hdr'
  }

  const exrFiles = {
    piz_compressed: 'piz_compressed.exr'
  }

  const jpgFiles = {
    equirect_ruined_room: 'equirect_ruined_room.jpg'
  }

  let extension = $state(extensions.hdr)
  const extensionFilePath = $derived(`/textures/equirectangular/${extension}/`)

  let exrFile = $state(exrFiles.piz_compressed)
  let hdrFile = $state(hdrFiles.shanghai_riverside)
  let jpgFile = $state(jpgFiles.equirect_ruined_room)

  const extensionIsEXR = $derived(extension === 'exr')
  const extensionIsHDR = $derived(extension === 'hdr')

  const environmentFile = $derived(extensionIsHDR ? hdrFile : extensionIsEXR ? exrFile : jpgFile)

  let materialMetalness = $state(1)
  let materialRoughness = $state(0)

  const environmentUrl = $derived(extensionFilePath + environmentFile)
</script>

<Pane
  title="Environment"
  position="fixed"
>
  <Checkbox
    label="use <Environment>"
    bind:value={useEnvironment}
  />
  <Checkbox
    disabled={environmentInputsDisabled}
    label="is background"
    bind:value={environmentIsBackground}
  />
  <List
    disabled={environmentInputsDisabled}
    options={extensions}
    bind:value={extension}
    label="extension"
  />
  {#if extensionIsHDR}
    <List
      disabled={environmentInputsDisabled}
      options={hdrFiles}
      bind:value={hdrFile}
      label="file"
    />
  {:else if extensionIsEXR}
    <List
      disabled={environmentInputsDisabled}
      options={exrFiles}
      bind:value={exrFile}
      label="file"
    />
  {:else}
    <List
      disabled={environmentInputsDisabled}
      options={jpgFiles}
      bind:value={jpgFile}
      label="file"
    />
  {/if}
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
      {environmentUrl}
      {environmentIsBackground}
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
