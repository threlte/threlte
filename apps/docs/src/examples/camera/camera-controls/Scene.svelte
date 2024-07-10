<script>
  import { T, useTask } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import CameraControls from './CameraControls.svelte'
  import { cameraControls, mesh } from './stores'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
  <CameraControls
    oncreate={({ ref }) => {
      $cameraControls = ref
    }}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />

<T.Mesh
  position.y={1}
  oncreate={({ ref }) => {
    $mesh = ref
  }}
>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial
    color="red"
    wireframe={true}
  />
</T.Mesh>

<Grid
  sectionColor={'#ff3e00'}
  sectionThickness={1}
  cellColor={'#cccccc'}
  gridSize={40}
/>
