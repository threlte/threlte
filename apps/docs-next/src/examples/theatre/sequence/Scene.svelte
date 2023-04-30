<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Editable } from '@threlte/theatre'
</script>

<T.PerspectiveCamera
  position={[4, 5, 10]}
  makeDefault
>
  <OrbitControls target={[0, 0.5, 0]} />
</T.PerspectiveCamera>

<!-- Box -->
<T.Mesh
  receiveShadow
  castShadow
>
  <Editable
    name="Box / Mesh"
    transform
    controls
  />
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshStandardMaterial color="#b00d03" />
</T.Mesh>

<T.DirectionalLight
  position={[0.5, 2, 1]}
  castShadow
/>

<T.AmbientLight intensity={0.2} />
