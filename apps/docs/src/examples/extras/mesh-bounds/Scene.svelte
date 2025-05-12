<script lang="ts">
  import type { Vector3Tuple } from 'three'
  import { OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { interactivity, meshBounds } from '@threlte/extras'

  let { showBounds = false }: { showBounds?: boolean } = $props()

  interactivity()

  const positions: Vector3Tuple[] = [
    [0, 1, 0],
    [1, -1, 0],
    [-1, -1, 0]
  ]

  class BoundsItem {
    wireframe = $state(true)
    position: Vector3Tuple

    constructor(position: Vector3Tuple) {
      this.position = position
    }
  }

  const boundsItems = positions.map((position) => {
    return new BoundsItem(position)
  })

  const size = 1
  // half of the box's diagonal === radius of the bounding sphere
  const radius = 0.5 * size * Math.sqrt(3)
</script>

<T.AmbientLight />

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

{#each boundsItems as boundsItem}
  <T.Mesh
    raycast={meshBounds}
    onpointerenter={() => {
      boundsItem.wireframe = false
    }}
    onpointerleave={() => {
      boundsItem.wireframe = true
    }}
    position={boundsItem.position}
  >
    <T.BoxGeometry args={[size, size, size]} />
    <T.MeshStandardMaterial
      color="hotpink"
      wireframe={boundsItem.wireframe}
    />
  </T.Mesh>
{/each}

<T.Group visible={showBounds}>
  {#each positions as position}
    <T.Mesh {position}>
      <T.SphereGeometry args={[radius]} />
      <T.MeshStandardMaterial
        transparent
        opacity={0.25}
      />
    </T.Mesh>
  {/each}
</T.Group>
