<script lang="ts" context="module">
  export const useRigidBody = () => {
    return getContext<RigidBody | undefined>('threlte-rapier-rigidbody')
  }
</script>

<script lang="ts">
  import type { Collider, RigidBody, TempContactManifold } from '@dimforge/rapier3d-compat'
  import {
    HierarchicalObject,
    TransformableObject,
    type TransformableObjectProperties
  } from '@threlte/core'
  import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte'
  import { Object3D, Quaternion, Vector3 } from 'three'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'
  import { useRapier } from '../../hooks/useRapier'
  import { createCollidersFromChildren } from '../../lib/createCollidersFromChildren'
  import { parseRigidBodyType } from '../../lib/parseBodyType'
  import type { RigidBodyProperties } from '../../types/components'
  import type { ThrelteRapierEventMap } from '../../types/types'

  let children: Object3D[] = []

  const object = new Object3D()

  export let type: NonNullable<RigidBodyProperties['type']> = 'dynamic'
  let previousType = type

  export let canSleep: NonNullable<RigidBodyProperties['canSleep']> = true
  export let linearVelocity: NonNullable<RigidBodyProperties['linearVelocity']> = [0, 0, 0]
  export let angularVelocity: NonNullable<RigidBodyProperties['angularVelocity']> = [0, 0, 0]
  export let gravityScale: NonNullable<RigidBodyProperties['gravityScale']> = 1
  export let ccd: NonNullable<RigidBodyProperties['ccd']> = false

  export let position: TransformableObjectProperties['position'] = undefined
  export let rotation: TransformableObjectProperties['rotation'] = undefined
  export let scale: TransformableObjectProperties['scale'] = undefined
  export let lookAt: TransformableObjectProperties['lookAt'] = undefined

  export let colliders: NonNullable<RigidBodyProperties['colliders']> = 'hull'
  export let friction: NonNullable<RigidBodyProperties['friction']> = 0.7
  export let restitution: NonNullable<RigidBodyProperties['restitution']> = 0
  export let lockRotations: NonNullable<RigidBodyProperties['lockRotations']> = false
  export let lockTranslations: NonNullable<RigidBodyProperties['lockTranslations']> = false
  export let enabledRotations: NonNullable<RigidBodyProperties['enabledRotations']> = [
    true,
    true,
    true
  ]
  export let enabledTranslations: NonNullable<RigidBodyProperties['enabledTranslations']> = [
    true,
    true,
    true
  ]

  const { world, rapier, rigidBodyMeshes, rigidBodyEventDispatchers } = useRapier()

  // create RigidBody
  const desc = new rapier.RigidBodyDesc(parseRigidBodyType(type))
    .setLinvel(...linearVelocity)
    .setAngvel({ x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] })
    .setGravityScale(gravityScale)
    .setCanSleep(canSleep)
    .setCcdEnabled(ccd)
    .enabledRotations(...enabledRotations)
    .enabledTranslations(...enabledTranslations)

  if (lockRotations) desc.lockRotations()
  if (lockTranslations) desc.lockTranslations()

  export const rigidBody = world.createRigidBody(desc)

  $: if (type !== previousType) {
    rigidBody.setBodyType(parseRigidBodyType(type))
    previousType = type
  }

  setContext<RigidBody>('threlte-rapier-rigidbody', rigidBody)

  rigidBodyMeshes.set(rigidBody.handle, object)

  let autoColliders: Collider[] = []

  type $$Events = ThrelteRapierEventMap
  const dispatcher = createEventDispatcher<ThrelteRapierEventMap>()
  rigidBodyEventDispatchers.set(rigidBody.handle, dispatcher)

  const { registerColliders, removeColliders } = useCollisionGroups()

  /**
   * A RigidBody is set up as soon as the first transform happened
   */
  const setup = () => {
    // isSleeping used for onSleep and onWake events
    object.userData.isSleeping = false

    // Get intitial world transforms
    const worldPosition = object.getWorldPosition(new Vector3())
    const worldRotation = object.getWorldQuaternion(new Quaternion())
    const scale = object.parent?.getWorldScale(new Vector3()) || { x: 1, y: 1, z: 1 }

    // Set initial transforms based on world transforms
    rigidBody.setTranslation(
      {
        x: worldPosition.x * scale.x,
        y: worldPosition.y * scale.y,
        z: worldPosition.z * scale.z
      },
      false
    )

    rigidBody.setRotation(
      { x: worldRotation.x, y: worldRotation.y, z: worldRotation.z, w: worldRotation.w },
      false
    )

    rigidBody.resetForces(false)
    rigidBody.resetTorques(false)

    if (colliders) {
      autoColliders = createCollidersFromChildren(
        object,
        rigidBody,
        world,
        friction,
        restitution,
        colliders
      )
      registerColliders(autoColliders)
    }
  }

  const cleanup = () => {
    rigidBodyEventDispatchers.delete(rigidBody.handle)
    world.removeRigidBody(rigidBody)
    autoColliders.forEach((collider) => world.removeCollider(collider, false))
    removeColliders(autoColliders)
    autoColliders = []
    rigidBodyMeshes.delete(rigidBody.handle)
  }

  onDestroy(cleanup)

  let transformed = false
</script>

<HierarchicalObject
  {object}
  onChildMount={(child) => object.add(child)}
  onChildDestroy={(child) => object.remove(child)}
  bind:children
>
  <slot />
</HierarchicalObject>

<!--
	Flow:
	- transform object via component <TransformableObject>
	- wait for event "transform"
	- unmount component <TransformableObject> to prevent further transforms
	- setup rigidBody onMount
-->
{#if !transformed}
  <TransformableObject
    on:transform={() => (transformed = true)}
    on:transform={setup}
    {object}
    position={position ?? { x: 0, y: 0, z: 0 }}
    {scale}
    {rotation}
    {lookAt}
  />
{/if}
