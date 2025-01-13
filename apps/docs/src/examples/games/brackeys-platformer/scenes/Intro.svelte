<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.DirectionalLight position={[0, 10, 10]} />

<!-- the platform -->
<T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[4, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>
