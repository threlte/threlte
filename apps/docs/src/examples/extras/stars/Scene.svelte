<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, Stars } from '@threlte/extras'
</script>

<Stars />

<T.PerspectiveCamera
  makeDefault
  position.y={1}
  position.z={8}
  fov={90}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    enableZoom={false}
		autoRotate
  />
</T.PerspectiveCamera>

<Grid
  position.y={0}
  sectionThickness={1}
  infiniteGrid
  cellColor="#dddddd"
  sectionColor="#ffffff"
  sectionSize={10}
  cellSize={2}
/>
