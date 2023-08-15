<script lang='ts'>

import { T } from '@threlte/core'
import { XR } from '$lib'
import Sabers from './sabers.svelte'
import Blocks from './blocks.svelte'

</script>

<XR foveation={0.5}>
  <Sabers />
  <Blocks />
</XR>

<T.AmbientLight />
<T.DirectionalLight />

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.8, 1]}
  on:create={({ ref }) => ref.lookAt(0, 1.8, 0)}
/>

<!-- floor -->
<T.Mesh position.y={-50}>
  <T.CylinderGeometry args={[2, 2, 100]} />
  <T.MeshStandardMaterial color='white' />
</T.Mesh>
