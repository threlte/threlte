<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'
</script>

<T.Group position={[0, -0.5, 0]}>
  <AutoColliders shape={'cuboid'}>
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[100, 1, 100]} />
      <T.MeshStandardMaterial />
    </T.Mesh>
  </AutoColliders>
</T.Group>
