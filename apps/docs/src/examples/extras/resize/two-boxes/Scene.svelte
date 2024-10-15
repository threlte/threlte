<script lang="ts">
  import { OrbitControls, Resize } from '@threlte/extras'
  import { T } from '@threlte/core'
</script>

<T.PerspectiveCamera
  makeDefault
  position={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight position={[1, 5, 3]} />

<Resize position.x={1}>
  <T.Mesh>
    <T.BoxGeometry args={[5, 5, 5]} />
    <T.MeshStandardMaterial color="hotpink" />
  </T.Mesh>
</Resize>

<T.Mesh position.x={-1}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

<Resize position.x={-5}>
  <T.Mesh>
    <T.BoxGeometry args={[5, 5, 5]} />
    <T.MeshStandardMaterial color="red" />
  </T.Mesh>
  <T.Mesh position.z={5}>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="red" />
  </T.Mesh>
</Resize>

<T.Group position.z={-10}>
  <T.Mesh>
    <T.BoxGeometry args={[5, 5, 5]} />
    <T.MeshStandardMaterial color="blue" />
  </T.Mesh>
  <T.Mesh position.z={5}>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="blue" />
  </T.Mesh>
</T.Group>
