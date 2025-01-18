<script lang="ts">
  import CameraControls from './CameraControls.svelte'
  import type CC from 'camera-controls'
  import { Grid } from '@threlte/extras'
  import { Mesh, type ColorRepresentation } from 'three'
  import { T } from '@threlte/core'

  let {
    color = '#ff3e00',
    controls = $bindable(),
    mesh
  }: {
    color?: ColorRepresentation
    controls: CC
    mesh: Mesh
  } = $props()

  $effect(() => {
    controls.setPosition(5, 5, 5, false)
  })
</script>

<CameraControls bind:ref={controls} />

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
