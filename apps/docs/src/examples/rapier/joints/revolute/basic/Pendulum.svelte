<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody, useRevoluteJoint } from '@threlte/rapier'

  const { rigidBodyA, rigidBodyB } = useRevoluteJoint([0, 0, 0], [0, 2, 0], [0, 0, 1])
</script>

<CollisionGroups
  memberships={[1]}
  filter={[0]}
>
  <T.Group position={[0, 6, 0]}>
    <RigidBody
      type="fixed"
      bind:rigidBody={$rigidBodyA}
    >
      <T.Mesh>
        <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
        <T.MeshStandardMaterial color="#222" />
      </T.Mesh>
    </RigidBody>
  </T.Group>

  <T.Group
    position={[1.732, 5, 0]}
    rotation={[0, 0, Math.PI / 3]}
  >
    <RigidBody bind:rigidBody={$rigidBodyB}>
      <Collider
        shape="cuboid"
        args={[0.2, 1.5, 0.2]}
        density={1}
      />
      <T.Group position.y={-1.7}>
        <Collider
          shape="ball"
          args={[0.5]}
          density={20}
        />
      </T.Group>

      <T.Mesh castShadow>
        <T.BoxGeometry args={[0.4, 3, 0.4]} />
        <T.MeshStandardMaterial color="#8B5A2B" />
      </T.Mesh>
      <T.Mesh
        castShadow
        position.y={-1.7}
      >
        <T.SphereGeometry args={[0.5, 24, 16]} />
        <T.MeshStandardMaterial
          color="#222"
          metalness={0.8}
          roughness={0.3}
        />
      </T.Mesh>
    </RigidBody>
  </T.Group>
</CollisionGroups>
