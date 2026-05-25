<script
  lang="ts"
  module
>
  const geometry = new SphereGeometry(0.14, 16, 12)
  const material = new MeshStandardMaterial({
    color: '#e8e6f0',
    metalness: 0.9,
    roughness: 0.18
  })

  const enabledTranslations: [boolean, boolean, boolean] = [true, true, false]
  const enabledRotations: [boolean, boolean, boolean] = [false, false, true]
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier'
  import type {
    Collider as RapierCollider,
    RigidBody as RapierRigidBody
  } from '@dimforge/rapier3d-compat'
  import { MeshStandardMaterial, SphereGeometry } from 'three'
  import { untrack } from 'svelte'
  import { ballRegistry } from './gameState.svelte'
  import { spawnQueue } from './spawnQueue.svelte'

  interface Props {
    id: number
    position: [number, number, number]
    linearVelocity: [number, number, number]
  }

  let { id, position, linearVelocity }: Props = $props()

  let collider = $state.raw<RapierCollider>()
  let rigidBody = $state.raw<RapierRigidBody>()

  // Stable handler — created once per instance.
  const despawn = () => spawnQueue.despawn(id)

  $effect(() => {
    untrack(() => {
      rigidBody?.setLinvel({ x: linearVelocity[0], y: linearVelocity[1], z: 0 }, true)
    })
  })

  $effect(() => {
    if (!collider) return
    const { handle } = collider
    ballRegistry.set(handle, despawn)
    return () => {
      ballRegistry.delete(handle)
    }
  })
</script>

<!-- Balls live in group 1 and collide with the playfield (group 0) and with each other (group 1) -->
<CollisionGroups
  memberships={[1]}
  filter={[0, 1]}
>
  <T.Group {position}>
    <RigidBody
      type="dynamic"
      bind:rigidBody
      {enabledTranslations}
      {enabledRotations}
      linearDamping={0.05}
      angularDamping={0.4}
      ccd
      onsleep={despawn}
    >
      <Collider
        bind:collider
        shape="ball"
        args={[0.14]}
        restitution={0.55}
        friction={0.15}
        density={3}
      />
      <T.Mesh
        castShadow
        {geometry}
        {material}
      />
    </RigidBody>
  </T.Group>
</CollisionGroups>
