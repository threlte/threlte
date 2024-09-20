<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, Float } from '@threlte/extras'
  import Diamond from './Diamond.svelte'
</script>

<Float
  floatIntensity={5}
  rotationIntensity={1}
  rotationSpeed={[0, 0, 0]}
>
  <Diamond
    scale={3}
    position.y={2}
  />
</Float>

<T.PerspectiveCamera
  makeDefault
  position.y={7}
  position.z={-8}
  fov={90}
>
  <OrbitControls
    enableDamping
    autoRotate
    enablePan={false}
    enableZoom={false}
  />
</T.PerspectiveCamera>

<Grid
  cellColor={'#46536b'}
  sectionThickness={0}
  infiniteGrid
  cellSize={5}
/>
