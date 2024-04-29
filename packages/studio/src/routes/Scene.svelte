<script lang="ts">
  import { T } from '@threlte/core'
  import { PerspectiveCamera } from 'three'
</script>

<T.Mesh position={[0, 0, 0]}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh>

<T.PerspectiveCamera
  makeDefault
  position={[-0.1, 0, 5.3]}
/>
