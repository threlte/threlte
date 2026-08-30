<script lang="ts">
  import { T } from '@threlte/core/webgpu'
  import { BakeShadows, MeshDiscardMaterial, OrbitControls } from '@threlte/extras/webgpu'
  import { MeshStandardMaterial, SphereGeometry } from 'three/webgpu'

  const geometry = new SphereGeometry()
  const material = new MeshStandardMaterial({ color: 'orangered' })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 7, 5]}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
  />
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
  <T.CircleGeometry args={[5, 128]} />
</T.Mesh>

<BakeShadows />
