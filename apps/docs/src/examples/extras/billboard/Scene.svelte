<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, Billboard } from '@threlte/extras'
</script>

<Billboard>
  <T.Mesh position={[3, 1, 0]}>
    <T.MeshBasicMaterial color="red" />
    <T.PlaneGeometry args={[2, 3]} />
  </T.Mesh>

  <T.Mesh position={[-4, 3, 0]}>
    <T.MeshBasicMaterial color="green" />
    <T.PlaneGeometry args={[3, 2]} />
  </T.Mesh>

  <T.Mesh position={[-1, 5, 2]}>
    <T.MeshBasicMaterial color="blue" />
    <T.PlaneGeometry args={[2, 2]} />
  </T.Mesh>
</Billboard>

<T.PerspectiveCamera
  makeDefault
  position.y={8}
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
