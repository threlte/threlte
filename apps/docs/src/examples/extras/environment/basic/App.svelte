<script lang="ts">
  import Scene from './Scene.svelte'
  import type { ListOptions } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { Pane, Checkbox, Folder, List } from 'svelte-tweakpane-ui'

  let autoRotateCamera = $state(false)
  let environmentIsBackground = $state(true)

  const environmentFilePaths = {
    '/exr/': '/textures/equirectangular/exr/',
    '/hdr/': '/textures/equirectangular/hdr/',
    '/jpg/': '/textures/equirectangular/jpg/'
  } as const

  const hdrFiles: ListOptions<string> = {
    aerodynamics_workshop_1k: 'aerodynamics_workshop_1k.hdr',
    industrial_sunset_puresky_1k: 'industrial_sunset_puresky_1k.hdr',
    mpumalanga_veld_puresky_1k: 'mpumalanga_veld_puresky_1k.hdr',
    shanghai_riverside_1k: 'shanghai_riverside_1k.hdr'
  }

  const exrFiles: ListOptions<string> = {
    piz_compressed: 'piz_compressed.exr'
  }

  const jpgFiles: ListOptions<string> = {
    equirect_ruined_room: 'equirect_ruined_room.jpg'
  }

  let environmentPath = $state<(typeof environmentFilePaths)[keyof typeof environmentFilePaths]>(
    environmentFilePaths['/hdr/']
  )

  let exrFile = $state('piz_compressed.exr')
  let hdrFile = $state('shanghai_riverside_1k.hdr')
  let jpgFile = $state('equirect_ruined_room.jpg')

  const pathIsEXR = $derived(environmentPath === '/textures/equirectangular/exr/')
  const pathIsHDR = $derived(environmentPath === '/textures/equirectangular/hdr/')

  const environmentFile = $derived(pathIsHDR ? hdrFile : pathIsEXR ? exrFile : jpgFile)

  let useEnvironment = $state(true)
</script>

<Pane
  title="Environment"
  position="fixed"
>
  <Checkbox
    label="use <Environment>"
    bind:value={useEnvironment}
  />
  {#if useEnvironment}
    <Checkbox
      label="isBackground"
      bind:value={environmentIsBackground}
    />
    <List
      options={environmentFilePaths}
      bind:value={environmentPath}
      label="path"
    />
    {#if pathIsHDR}
      <List
        options={hdrFiles}
        bind:value={hdrFile}
        label="file"
      />
    {:else if pathIsEXR}
      <List
        options={exrFiles}
        bind:value={exrFile}
        label="file"
      />
    {:else}
      <List
        options={jpgFiles}
        bind:value={jpgFile}
        label="file"
      />
    {/if}
  {/if}
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
      {environmentFile}
      {environmentIsBackground}
      {environmentPath}
      {useEnvironment}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
