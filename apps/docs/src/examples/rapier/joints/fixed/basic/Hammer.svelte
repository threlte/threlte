<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier'
  import type { Vector3Tuple } from 'three'
  import FixedJoint from './FixedJoint.svelte'

  interface Props {
    position?: Vector3Tuple
    rotation?: Vector3Tuple
    velocity?: Vector3Tuple
  }

  let {
    position = [0, 6, 0],
    rotation = [0, 0, Math.PI / 6],
    velocity = [0, 0, 0]
  }: Props = $props()

  let handle = $state<RapierRigidBody>()
  let head = $state<RapierRigidBody>()
</script>

<T.Group
  {position}
  {rotation}
>
  <CollisionGroups
    memberships={[1]}
    filter={[0, 2]}
  >
    <T.Group position={[-0.6, 0, 0]}>
      <RigidBody
        bind:rigidBody={handle}
        linearVelocity={velocity}
      >
        <Collider
          shape="cuboid"
          args={[1.2, 0.15, 0.15]}
          density={0.5}
        />
        <T.Mesh castShadow>
          <T.BoxGeometry args={[2.4, 0.3, 0.3]} />
          <T.MeshStandardMaterial color="#8B5A2B" />
        </T.Mesh>
      </RigidBody>
    </T.Group>

    <T.Group position={[1, 0, 0]}>
      <RigidBody
        bind:rigidBody={head}
        linearVelocity={velocity}
      >
        <Collider
          shape="cuboid"
          args={[0.4, 0.4, 0.4]}
          density={8}
        />
        <T.Mesh castShadow>
          <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
          <T.MeshStandardMaterial
            color="#444"
            metalness={0.8}
            roughness={0.3}
          />
        </T.Mesh>
      </RigidBody>
    </T.Group>
  </CollisionGroups>
</T.Group>

{#if handle && head}
  <FixedJoint
    bodyA={handle}
    bodyB={head}
    anchorA={[1.2, 0, 0]}
    anchorB={[-0.4, 0, 0]}
  />
{/if}
