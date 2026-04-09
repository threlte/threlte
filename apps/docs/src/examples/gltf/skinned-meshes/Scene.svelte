<script lang="ts">
  import { T } from '@threlte/core'
  import Robot from './Robot.svelte'
  import { Grid } from '@threlte/extras'
  import { Vector3 } from 'three'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 4, 15]}
  fov={50}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<Grid
  cellColor="yellow"
  sectionColor="orange"
  infiniteGrid
  fadeDistance={10}
  fadeOrigin={new Vector3(0, 0, 0)}
/>

<T.DirectionalLight
  position={[5, 5, 5]}
  intensity={1.5}
/>

<T.AmbientLight intensity={0.5} />

<Robot
  action="Walking"
  position={[-4, 0, 0]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<Robot
  action="Running"
  position={[0, 0, 0]}
/>

<Robot
  action="Dance"
  position={[4, 0, 0]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>
