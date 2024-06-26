<script lang="ts">
  import { T } from '../lib'
  import Mesh from './mesh.svelte'
</script>

<T.PerspectiveCamera makeDefault position={[3, 3, 3]} oncreate={({ ref }) => ref.lookAt(0, 0, 0)} />

<Mesh />

<T.Mesh receiveShadow position.y={-1}>
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
