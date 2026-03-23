<script lang="ts">
  import { T } from '@threlte/core'
  import { BakeShadows, MeshDiscardMaterial, OrbitControls } from '@threlte/extras'
  import { MeshStandardMaterial, SphereGeometry } from 'three'

  const geometry = new SphereGeometry()
  const material = new MeshStandardMaterial({ color: 'orangered' })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 7, 5]}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[0, 5, 5]}
  castShadow
/>

<T.Mesh
  {geometry}
  {material}
  position.x={-2}
  castShadow
/>

<T.Mesh
  {geometry}
  {material}
  castShadow
  visible={false}
/>

<T.Mesh
  {geometry}
  position={2}
  castShadow
>
  <MeshDiscardMaterial />
</T.Mesh>

<T.Mesh
  receiveShadow
  rotation.x={-1 * 0.5 * Math.PI}
  position.y={-1 * 1.25}
>
  <T.MeshStandardMaterial />
  <T.CircleGeometry args={[5]} />
</T.Mesh>

<BakeShadows />
