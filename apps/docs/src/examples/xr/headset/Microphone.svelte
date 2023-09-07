<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.Mesh position={[0, 0, -1]}>
  {@const size = 0.01}
  <T.CylinderGeometry args={[size, size, size * 10]} />
  <T.MeshStandardMaterial />
  <T.Mesh position={[size * 3, -size * 8, 0]} rotation.z={Math.PI / 4}>
    <T.CylinderGeometry args={[size, size, size * 10]} />
    <T.MeshStandardMaterial />
    <T.Mesh position={[0, -size * 8, 0]} rotation.z={Math.PI / 4}>
      <T.IcosahedronGeometry args={[size * 3, 2]} />
      <T.MeshStandardMaterial color='gray' />
    </T.Mesh>
  </T.Mesh>
</T.Mesh>
