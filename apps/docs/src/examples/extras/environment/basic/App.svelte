<script lang="ts">
  import Scene from './Scene.svelte'
  import type { ListOptions } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { Pane, Checkbox, Folder, List } from 'svelte-tweakpane-ui'

  let autoRotateCamera = $state(false)
  let environmentIsBackground = $state(true)

  const environmentFilePaths = {
    '/exr/': '/environment-maps/exr/',
    '/hdr/': '/environment-maps/hdr/',
    '/jpg/': '/environment-maps/jpg/'
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

  let environmentPath: (typeof environmentFilePaths)[keyof typeof environmentFilePaths] = $state(
    environmentFilePaths['/hdr/']
  )

  let exrFile = $state('piz_compressed.exr')
  let hdrFile = $state('shanghai_riverside_1k.hdr')
  let jpgFile = $state('equirect_ruined_room.jpg')

  const pathIsHDR = $derived(environmentPath === '/environment-maps/hdr/')
  const pathIsEXR = $derived(environmentPath === '/environment-maps/exr/')

  const environmentFile = $derived(pathIsHDR ? hdrFile : pathIsEXR ? exrFile : jpgFile)

  let useEnvironment = $state(true)
</script>

<Pane
  title="Environment"
  position="fixed"
>
  <Checkbox
    label="use environment"
    bind:value={useEnvironment}
  />
  <Folder title="camera">
    <Checkbox
      label="auto rotate"
      bind:value={autoRotateCamera}
    />
  </Folder>
  {#if useEnvironment}
    <Folder title="props">
      <Checkbox
        label="isBackground"
        bind:value={environmentIsBackground}
      />
      <List
        options={environmentFilePaths}
        label="path"
        bind:value={environmentPath}
      />
      {#if pathIsHDR}
        <List
          options={hdrFiles}
          label="file"
          bind:value={hdrFile}
        />
      {:else if pathIsEXR}
        <List
          options={exrFiles}
          label="file"
          bind:value={exrFile}
        />
      {:else}
        <List
          options={jpgFiles}
          label="file"
          bind:value={jpgFile}
        />
      {/if}
    </Folder>
  {/if}
</Pane>

<div>
  <Canvas>
    <Scene
      {useEnvironment}
      {autoRotateCamera}
      {environmentIsBackground}
      {environmentPath}
      {environmentFile}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
