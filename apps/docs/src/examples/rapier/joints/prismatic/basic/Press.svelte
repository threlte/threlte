<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody, usePrismaticJoint } from '@threlte/rapier'

  let rail = $state<RapierRigidBody>()
  let platform = $state<RapierRigidBody>()

  const { rigidBodyA, rigidBodyB } = usePrismaticJoint([0, 0, 0], [0, 0, 0], [0, 1, 0], [-2.5, 2.5])

  $effect(() => {
    if (rail && platform) {
      rigidBodyA.set(rail)
      rigidBodyB.set(platform)
    }
  })

  const PUMP_INTERVAL = 1.4
  let elapsed = 0

  useTask((delta) => {
    if (!platform) return
    elapsed += delta
    if (elapsed >= PUMP_INTERVAL) {
      elapsed = 0
      platform.applyImpulse({ x: 0, y: 70, z: 0 }, true)
    }
  })
</script>

<CollisionGroups
  memberships={[1]}
  filter={[0]}
>
  <T.Group position={[0, 3, 0]}>
    <RigidBody
      type="fixed"
      bind:rigidBody={rail}
    >
      <Collider
        shape="cuboid"
        args={[0.15, 3, 0.15]}
      />
      <T.Mesh>
        <T.BoxGeometry args={[0.3, 6, 0.3]} />
        <T.MeshStandardMaterial
          color="#444"
          metalness={0.7}
          roughness={0.3}
        />
      </T.Mesh>
    </RigidBody>
  </T.Group>

  <T.Group position={[0, 0.5, 0]}>
    <RigidBody bind:rigidBody={platform}>
      <Collider
        shape="cuboid"
        args={[1.5, 0.2, 1]}
        density={5}
        friction={1.5}
      />
      <T.Mesh
        castShadow
        receiveShadow
      >
        <T.BoxGeometry args={[3, 0.4, 2]} />
        <T.MeshStandardMaterial
          color="#222"
          metalness={0.6}
          roughness={0.4}
        />
      </T.Mesh>
    </RigidBody>
  </T.Group>
</CollisionGroups>
