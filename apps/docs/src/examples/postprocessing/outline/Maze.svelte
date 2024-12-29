<script lang="ts">
  import { T } from '@threlte/core'
  import type { Vector3Tuple } from 'three'

  type Wall = { position: Vector3Tuple; rotation: Vector3Tuple; size: Vector3Tuple }

  const walls: Wall[] = [
    {
      position: [6, 2, 4],
      rotation: [0, 0.5 * Math.PI, 0],
      size: [7, 4, 1]
    },
    {
      position: [-6, 2, 4],
      rotation: [0, 0.5 * Math.PI, 0],
      size: [7, 4, 1]
    },
    {
      position: [-4, 2, 0],
      rotation: [0, 0, 0],
      size: [5, 4, 1]
    },
    {
      position: [4, 2, 0],
      rotation: [0, 0, 0],
      size: [5, 4, 1]
    },
    {
      position: [-3, 2, 7],
      rotation: [0, 0, 0],
      size: [7, 4, 1]
    },
    {
      position: [5, 2, 7],
      rotation: [0, 0, 0],
      size: [3, 4, 1]
    },
    {
      position: [-1, 2, 3.5],
      rotation: [0, 0, 0],
      size: [10, 4, 1]
    }
  ]
</script>

{#each walls as { position, rotation, size }}
  <T.Mesh
    {position}
    {rotation}
  >
    {@render children?.()}
  </T.Mesh>
{/each}
