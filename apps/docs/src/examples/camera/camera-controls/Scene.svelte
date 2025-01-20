<script lang="ts">
  import CameraControls from './CameraControls.svelte'
  import type CC from 'camera-controls'
  import type { Camera } from './types'
  import type { ColorRepresentation } from 'three'
  import { Grid } from '@threlte/extras'
  import { Mesh, PerspectiveCamera } from 'three'
  import { T } from '@threlte/core'

  let {
    camera = new PerspectiveCamera(),
    color = '#ff3e00',
    controls = $bindable(),
    enabled = true,
    mesh
  }: {
    camera?: Camera
    color?: ColorRepresentation
    controls: CC | undefined
    enabled?: boolean
    mesh: Mesh
  } = $props()

  $effect(() => {
    if (controls !== undefined) {
      controls.enabled = enabled
    }
  })

  $effect(() => {
    controls?.setPosition(5, 5, 5)
  })
</script>

<CameraControls
  bind:ref={controls}
  {camera}
/>

<T
  is={mesh}
  position.y={0.5}
>
  <T.BoxGeometry />
  <T.MeshBasicMaterial
    {color}
    wireframe
  />
</T>

<Grid
  sectionColor={color}
  sectionThickness={1}
  cellColor="#cccccc"
  gridSize={40}
/>

<T
  is={camera}
  makeDefault
/>
