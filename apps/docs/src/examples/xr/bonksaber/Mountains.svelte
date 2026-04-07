<script lang="ts">
  import { Vector2 } from 'three'
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'

  const positions = Array(35)
    .keys()
    .map((index) => {
      const size = Math.random() * 20 + 4
      return {
        size,
        position: new Vector2(Math.cos(index), Math.sin(index))
          .subScalar(0.5)
          .normalize()
          .multiplyScalar(100)
      }
    })
</script>

<T.Mesh
  rotation.x={-Math.PI / 2}
  position.y={-0.1}
>
  <T.CircleGeometry args={[100]} />
  <T.MeshBasicMaterial color="rgb(14, 22, 37)" />
</T.Mesh>

{#each positions as { position, size }}
  <T.Group
    position={[position.x, size / 2 - 1, position.y]}
    oncreate={(ref) => ref.lookAt(0, size / 2, 0)}
  >
    <T.Mesh rotation.z={Math.PI / 2}>
      <T.CircleGeometry args={[size, 3]} />
      <Edges />
      <T.MeshBasicMaterial color="rgb(14, 22, 37)" />
    </T.Mesh>
  </T.Group>
{/each}
