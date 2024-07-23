<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, AutoColliders } from '@threlte/rapier'

  let {
    ongoal,
    position,
    rotation
  }: {
    ongoal: () => void
    position: [number, number, number]
    rotation: [number, number, number]
  } = $props()
</script>

<T.Group
  {position}
  {rotation}
>
  <T.Group position.y={0.1}>
    <Collider
      shape="cuboid"
      args={[0.4, 0.5, 0.4]}
      sensor
      onsensorenter={ongoal}
    />
  </T.Group>

  <AutoColliders>
    <T.Mesh>
      <T.BoxGeometry args={[1, 1, 1]} />
      <T.MeshStandardMaterial color="green" />
    </T.Mesh>
  </AutoColliders>
</T.Group>
