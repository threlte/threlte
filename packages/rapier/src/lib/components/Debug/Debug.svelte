<script lang="ts">
  import { Group, useFrame } from '@threlte/core'
  import type { Material } from 'three'
  import { MeshBasicMaterial } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import ColliderDebugShape from './ColliderDebugShape.svelte'

  const { world } = useRapier()

  let sensors: number[] = []
  let colliders: number[] = []
  let rigidBodies: number[] = []

  export let sensorMaterial: Material = new MeshBasicMaterial({
    wireframe: true,
    color: 'green'
  })
  export let colliderMaterial: Material = new MeshBasicMaterial({
    wireframe: true,
    color: 'blue'
  })
  export let rigidBodyMaterial: Material = new MeshBasicMaterial({
    wireframe: true,
    color: 'red'
  })

  useFrame(() => {
    const newSensors: number[] = []
    const newColliders: number[] = []
    const newRigidBodies: number[] = []

    world.forEachCollider((collider) => {
      if (collider.isSensor()) newSensors.push(collider.handle)
      else if (collider.parent()) newRigidBodies.push(collider.handle)
      else newColliders.push(collider.handle)
    })

    sensors = newSensors
    colliders = newColliders
    rigidBodies = newRigidBodies
  })
</script>

<Group>
  {#each colliders as collider}
    {#key collider}
      <ColliderDebugShape material={colliderMaterial} colliderHandle={collider} />
    {/key}
  {/each}

  {#each sensors as sensor}
    {#key sensor}
      <ColliderDebugShape material={sensorMaterial} colliderHandle={sensor} />
    {/key}
  {/each}

  {#each rigidBodies as rigidBody}
    {#key rigidBody}
      <ColliderDebugShape material={rigidBodyMaterial} colliderHandle={rigidBody} />
    {/key}
  {/each}
</Group>
