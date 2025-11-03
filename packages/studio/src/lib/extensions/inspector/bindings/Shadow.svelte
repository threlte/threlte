<script lang="ts">
  import type { LightShadow, OrthographicCamera, PerspectiveCamera } from 'three'
  import TransactionalList from './TransactionalList.svelte'
  import TransactionalBinding from './TransactionalBinding.svelte'
  import { haveProperty } from './utils.js'
  import { Folder } from 'svelte-tweakpane-ui'
  import Camera from './Camera.svelte'

  type Props = {
    objects: LightShadow[]
  }

  let { objects }: Props = $props()

  const keys = ['autoUpdate', 'bias', 'blurSamples', 'normalBias', 'radius'] as const

  const getCameras = (lightShadows: LightShadow[]): (PerspectiveCamera | OrthographicCamera)[] => {
    return lightShadows
      .map((lightShadow) => lightShadow.camera)
      .filter(
        (camera): camera is PerspectiveCamera | OrthographicCamera =>
          'isPerspectiveCamera' in camera || 'isOrthographicCamera' in camera
      )
  }
</script>

<TransactionalList
  {objects}
  key="mapSize.width"
  label="mapSize.width"
  options={{
    128: 128,
    256: 256,
    512: 512,
    1024: 1024,
    2048: 2048,
    4096: 4096
  }}
  on:change={() => {
    objects.forEach((object) => {
      object.dispose()
      object.map = null
    })
  }}
/>

<TransactionalList
  {objects}
  key="mapSize.height"
  label="mapSize.height"
  options={{
    128: 128,
    256: 256,
    512: 512,
    1024: 1024,
    2048: 2048,
    4096: 4096
  }}
  on:change={() => {
    objects.forEach((object) => {
      object.dispose()
      object.map = null
    })
  }}
/>

{#each keys as key (key)}
  <TransactionalBinding
    {objects}
    {key}
    label={key}
  />
{/each}

{#if haveProperty(objects, 'camera')}
  {@const cameras = getCameras(objects)}
  <Folder
    title="Shadow Camera"
    expanded={false}
  >
    <Camera objects={cameras} />
  </Folder>
{/if}
