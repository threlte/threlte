<script lang='ts'>
  import { T } from '@threlte/core'
  import { teleportControls } from '$lib'

  teleportControls('left')
  teleportControls('right')
</script>

<T.Mesh
  receiveShadow
  teleportSurface
  position.y={-0.05}
>
  <T.CylinderGeometry args={[2, 2, 0.1]} />
  <T.MeshStandardMaterial />
</T.Mesh>
