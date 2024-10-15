<script lang="ts">
  import { OrbitControls, Resize } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { MeshStandardMaterial } from 'three'

  const material = new MeshStandardMaterial({ color: 'hotpink' })
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
    <T is={material} />
  </T.Mesh>
</Resize>

<T.Mesh position.x={-1}>
  <T.BoxGeometry />
  <T is={material} />
</T.Mesh>
