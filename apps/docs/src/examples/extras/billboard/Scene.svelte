<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, Billboard } from '@threlte/extras'

  export let follow = true
</script>

<Billboard
  {follow}
  position={[3, 1, 0]}
>
  <T.Mesh>
    <T.MeshBasicMaterial color="red" />
    <T.PlaneGeometry args={[2, 3]} />
  </T.Mesh>
</Billboard>

<Billboard
  {follow}
  position={[-4, 3, 0]}
>
  <T.Mesh>
    <T.MeshBasicMaterial color="green" />
    <T.PlaneGeometry args={[3, 2]} />
  </T.Mesh>
</Billboard>

<Billboard
  {follow}
  position={[-1, 5, 2]}
>
  <T.Mesh>
    <T.MeshBasicMaterial color="blue" />
    <T.PlaneGeometry args={[2, 2]} />
  </T.Mesh>
</Billboard>

<T.PerspectiveCamera
  makeDefault
  position.y={8}
  position.z={8}
  fov={90}
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
