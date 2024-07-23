<script lang="ts">
  import { T } from '@threlte/core'
  import { XR } from '@threlte/xr'
  import Sabers from './Sabers.svelte'
  import Blocks from './Blocks.svelte'
</script>

<XR>
  <Sabers />
  <Blocks />
</XR>

<T.AmbientLight />
<T.DirectionalLight />

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.8, 1]}
  oncreate={({ ref }) => ref.lookAt(0, 1.8, 0)}
/>

<!-- floor -->
<T.Mesh position.y={-50}>
  <T.CylinderGeometry args={[2, 2, 100]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>
