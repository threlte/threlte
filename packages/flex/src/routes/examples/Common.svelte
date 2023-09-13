<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls } from '@threlte/extras'
  import Gizmo from '../Gizmo.svelte'
  import { MOUSE } from 'three'
</script>

<T.OrthographicCamera
  makeDefault
  near={100}
  far={10000}
  position={[0, 0, 5000]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls
    mouseButtons={{
      LEFT: MOUSE.PAN,
      RIGHT: MOUSE.ROTATE
    }}
    zoomToCursor
  />
</T.OrthographicCamera>

<T.DirectionalLight />

<!-- <Grid
  sectionSize={100}
  cellSize={10}
  cellColor="#838383"
  sectionColor="#838383"
  axes="xyz"
  infiniteGrid
  fadeStrength={0}
/> -->

<!-- <Gizmo
  size={100}
  thickness={2}
  arrows
  hideZ
/> -->
