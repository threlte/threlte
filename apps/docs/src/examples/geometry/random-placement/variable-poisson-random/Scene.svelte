<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { width, height } from './stores'
  import Random from './Random.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[20, 20, 20]}
>
  <OrbitControls maxPolarAngle={1.56} />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[6, 13, 10]}
  castShadow
  shadow.camera.top={12}
  shadow.camera.left={-12}
  shadow.camera.right={12}
  shadow.camera.bottom={-12}
/>
<T.AmbientLight />

<T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.PlaneGeometry args={[width, height, 1, 1]} />
  <T.MeshStandardMaterial color="green" />
</T.Mesh>

<Random />
