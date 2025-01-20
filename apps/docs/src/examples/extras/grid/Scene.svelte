<script lang="ts">
  import { BoxGeometry, Vector2 } from 'three'
  import { Gizmo, OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'

  const positions: Vector2[] = []
  const count = 4
  for (let j = 0; j < count; j += 1) {
    for (let i = 0; i < count; i += 1) {
      positions.push(new Vector2(i, j).multiplyScalar(2).subScalar(3))
    }
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={15}
  fov={60}
>
  <OrbitControls>
    <Gizmo />
  </OrbitControls>
</T.PerspectiveCamera>

<!-- Make a box in every second cell to show aligment -->
{#each positions as { x, y }}
  <T.Group position={[x, 0.5, y]}>
    <T.Mesh>
      <T.BoxGeometry />
      <T.MeshBasicMaterial
        color="white"
        opacity={0.9}
        transparent
      />
    </T.Mesh>
    <T.LineSegments>
      <T.EdgesGeometry args={[new BoxGeometry()]} />
      <T.LineBasicMaterial
        color="black"
        linewidth={2}
      />
    </T.LineSegments>
  </T.Group>
{/each}
