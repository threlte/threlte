<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
</script>

<T.Group position={[0, -0.5, 0]}>
  <AutoColliders shape={'cuboid'}>
    <T.Mesh
      receiveShadow
      geometry={new BoxGeometry(10, 1, 10)}
      material={new MeshStandardMaterial()}
    />
  </AutoColliders>
</T.Group>
