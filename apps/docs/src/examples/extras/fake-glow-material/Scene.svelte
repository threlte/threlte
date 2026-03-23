<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, FakeGlowMaterial } from '@threlte/extras'
</script>

<T.Group
  position.y={2}
  position.x={-3}
>
  <T.Mesh>
    <T.MeshBasicMaterial color="green" />
    <T.IcosahedronGeometry args={[2, 4]} />
  </T.Mesh>

  <T.Mesh>
    <FakeGlowMaterial />
    <T.IcosahedronGeometry args={[4, 4]} />
  </T.Mesh>
</T.Group>

<T.Group
  position.y={3}
  position.x={3}
>
  <T.Mesh>
    <T.MeshBasicMaterial color="blue" />
    <T.BoxGeometry args={[2, 2, 2]} />
  </T.Mesh>

  <T.Mesh>
    <FakeGlowMaterial glowColor="blue" />
    <T.IcosahedronGeometry args={[3, 4]} />
  </T.Mesh>
</T.Group>

<T.Group
  position.y={6}
  position.x={0}
>
  <T.Mesh>
    <T.MeshBasicMaterial color="red" />
    <T.TorusKnotGeometry args={[1, 0.25, 128]} />
  </T.Mesh>

  <T.Mesh>
    <FakeGlowMaterial glowColor="red" />
    <T.TorusKnotGeometry args={[1, 0.8, 128]} />
  </T.Mesh>
</T.Group>

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
