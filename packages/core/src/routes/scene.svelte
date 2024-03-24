<script lang="ts">
  import { T, useTask } from '$lib'
  import type { Mesh } from 'three'

  let ref: Mesh

  useTask(() => {
    ref.rotation.x += 0.01
    ref.rotation.y += 0.01
  })
</script>

<!-- <T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => {
    console.log('create')
    ref.lookAt(0, 0, 0)
  }}
/> -->

<T.Mesh
  castShadow
  receiveShadow
  bind:ref
>
  <T.MeshStandardMaterial color="hotpink" />
  <T.BoxGeometry />
</T.Mesh>

<T.Mesh
  receiveShadow
  position.y={-1}
>
  <T.MeshStandardMaterial color="turquoise" />
  <T.CylinderGeometry args={[1, 1, 0.1]} />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight
  castShadow
  shadow.mapSize={4096}
  shadow.camera.left={-5}
  shadow.camera.right={5}
  shadow.camera.top={5}
  shadow.camera.bottom={-5}
/>
