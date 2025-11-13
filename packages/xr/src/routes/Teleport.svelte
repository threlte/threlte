<script lang="ts">
  import { T } from '@threlte/core'
  import { teleportControls } from '$lib/index.js'

  teleportControls('left')
  teleportControls('right')
</script>

<!-- 
<T.Mesh
  receiveShadow
  teleportSurface
  position.y={-0.05}
>
  <T.CylinderGeometry args={[2, 2, 0.1]} />
  <T.MeshStandardMaterial />
</T.Mesh> -->

<T.Mesh
  teleportSurface
  receiveShadow
  position.y={-0.01}
  rotation.x={-90 * (Math.PI / 180)}
>
  <T.PlaneGeometry args={[10, 10]} />
  <T.MeshStandardMaterial />
</T.Mesh>
