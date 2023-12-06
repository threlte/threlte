<script>
  import { T, useTask } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  // import { spring } from 'svelte/motion'
  import CameraControls from './CameraControls.svelte'

  // interactivity()
  // const scale = spring(1)
  // let rotation = 0
  // useTask((delta) => {
  //   rotation += delta
  // })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
  <CameraControls />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />

<T.Mesh position.y={1}>
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
