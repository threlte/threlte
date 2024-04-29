<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.Mesh position={[0,0,0]}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh>
