<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'
  import type { Snippet } from 'svelte'

  let {
    position,
    rotation,
    children
  }: { position: [number, number, number]; rotation: [number, number, number]; children: Snippet } =
    $props()
</script>

<T.Group
  {position}
  {rotation}
>
  {@render children()}

  <AutoColliders>
    <T.Mesh position={[0, -1.1, 0]}>
      <T.BoxGeometry />
      <T.MeshStandardMaterial color="red" />
    </T.Mesh>
  </AutoColliders>
</T.Group>
