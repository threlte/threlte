<script lang="ts">
  import type { Vector3Tuple } from 'three'

  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'

  const positions: Vector3Tuple[] = $state([[0, 0, -1]])

  const context = interactivity()
  context.raycaster.near = 1
  context.raycaster.far = 10

  const spawnCube = () => {
    positions.push([0, 0, positions.at(-1)?.[2] ?? 0 - 1])
  }
</script>

{#each positions as position (position)}
  <T.Mesh onclick={() => spawnCube()} scale={0.2} {position}>
    <T.BoxGeometry />
  </T.Mesh>
{/each}
