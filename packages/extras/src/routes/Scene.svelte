<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky } from '../lib'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Sky />

<Grid />

<T.Mesh position.y={1}>
  <T.MeshStandardMaterial
    transparent
    color="white"
  />
  <T.SphereGeometry />
</T.Mesh>
