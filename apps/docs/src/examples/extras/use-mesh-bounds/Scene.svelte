<script lang="ts">
  import { BoundsMesh } from './BoundsMesh.svelte.ts'
  import { OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { interactivity, meshBounds } from '@threlte/extras'
  import type { Vector3Tuple } from 'three'

  type Props = {
    showBounds: boolean
  }

  let { showBounds }: Props = $props()

  interactivity()

  const positions: Vector3Tuple[] = [
    [0, 1, 0],
    [1, -1, 0],
    [-1, -1, 0]
  ]

  const meshes = positions.map((position) => new BoundsMesh(position))

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

{#each meshes as mesh}
  <T.Mesh
    raycast={meshBounds}
    onpointerenter={() => {
      mesh.wireframe = false
    }}
    onpointerleave={() => {
      mesh.wireframe = true
    }}
    position={mesh.position}
  >
    <T.BoxGeometry args={[size, size, size]} />
    <T.MeshStandardMaterial
      color="hotpink"
      wireframe={mesh.wireframe}
    />
  </T.Mesh>
{/each}

<T.Group visible={showBounds}>
  {#each meshes as { position }}
    <T.Mesh {position}>
      <T.SphereGeometry args={[radius]} />
      <T.MeshStandardMaterial
        transparent
        opacity={0.25}
      />
    </T.Mesh>
  {/each}
</T.Group>
