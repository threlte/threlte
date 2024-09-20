<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  interactivity()

  const scale = spring(1)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[3, 10, 7]}
  intensity={Math.PI}
/>

<T.AmbientLight intensity={0.3} />

<T.Group
  scale={$scale}
  onpointerenter={() => scale.set(1.5)}
  onpointerleave={() => scale.set(1)}
>
  <T.Mesh position.y={1}>
    <T.SphereGeometry args={[1]} />
    <T.MeshStandardMaterial
      color="#FE3D00"
      toneMapped={false}
    />
  </T.Mesh>
</T.Group>

<Grid
  cellColor="#FE3D00"
  sectionColor="#FE3D00"
/>
