<script lang="ts">
  import { Mesh, type ColorRepresentation } from 'three'
  import { T } from '@threlte/core'
  import { Grid, CameraControls, type CameraControlsRef } from '@threlte/extras'

  let {
    color = '#ff3e00',
    controls = $bindable(),
    mesh = $bindable()
  }: {
    color?: ColorRepresentation
    controls?: CameraControlsRef
    mesh?: Mesh
  } = $props()
</script>

<CameraControls
  bind:ref={controls}
  oncreate={(ref) => ref.setPosition(5, 5, 5)}
/>

<T.Mesh
  bind:ref={mesh}
  position.y={0.5}
>
  <T.BoxGeometry />
  <T.MeshBasicMaterial
    {color}
    wireframe
  />
</T.Mesh>

<Grid
  sectionColor={color}
  sectionThickness={1}
  cellColor="#cccccc"
  gridSize={40}
/>
