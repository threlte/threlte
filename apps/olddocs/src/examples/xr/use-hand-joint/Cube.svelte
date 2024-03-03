<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh, Instance } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'

  const size = 0.02
  const limit = 100
</script>

<T.Group position={[0, 1.7, 0]}>
  <InstancedMesh {limit}>
    <T.BoxGeometry args={[size, size, size]} />
    <T.MeshStandardMaterial
      roughness={0}
      metalness={0.2}
    />

    {#each { length: limit } as _, index (index)}
      <RigidBody>
        <Collider
          shape="cuboid"
          args={[size / 2, size / 2, size / 2]}
        />
        <Instance color="hotpink" />
      </RigidBody>
    {/each}
  </InstancedMesh>
</T.Group>
