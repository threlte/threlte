<script lang="ts">
  import { LayerableObject, SceneGraphObject } from '@threlte/core'
  import { createEventDispatcher, onDestroy, setContext } from 'svelte'
  import { Object3D, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import { applyTransforms } from '../../lib/applyTransforms'
  import { getWorldPosition, getWorldQuaternion } from '../../lib/getWorldTransforms'
  import { parseRigidBodyType } from '../../lib/parseRigidBodyType'
  import { positionToVector3 } from '../../lib/positionToVector3'
  import { rotationToEuler } from '../../lib/rotationToEuler'
  import type { RigidBodyProperties } from '../../types/components'
  import type { RigidBodyContext, RigidBodyEventMap } from '../../types/types'

  const { world, rapier, addRigidBodyToContext, removeRigidBodyFromContext } = useRapier()

  export let type: NonNullable<RigidBodyProperties['type']> = 'dynamic'
  export let canSleep: NonNullable<RigidBodyProperties['canSleep']> = true
  export let linearVelocity: NonNullable<RigidBodyProperties['linearVelocity']> = {}
  export let angularVelocity: NonNullable<RigidBodyProperties['angularVelocity']> = {}
  export let gravityScale: NonNullable<RigidBodyProperties['gravityScale']> = 1
  export let ccd: NonNullable<RigidBodyProperties['ccd']> = false

  export let position: RigidBodyProperties['position'] = undefined
  export let rotation: RigidBodyProperties['rotation'] = undefined
  export let scale: RigidBodyProperties['scale'] = undefined
  export let lookAt: RigidBodyProperties['lookAt'] = undefined

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
  export let dominance: NonNullable<RigidBodyProperties['dominance']> = 0

  /**
   * Every RigidBody receives and forwards collision-related events
   */
  type $$Events = RigidBodyEventMap
  const dispatcher = createEventDispatcher<RigidBodyEventMap>()

  const object = new Object3D()

  /**
   * Used to traverseAncestors to restore transform
   */
  object.userData.isRigidBody = true

  /**
   * isSleeping used for events "sleep" and "wake" in `useFrameHandler`
   */
  object.userData.isSleeping = false

  /**
   * Immediately apply transforms to get the objects
   * world position to apply to the RigidBody.
   * This is a one-off operation as RigidBodies should
   * not be moved around after initialization.
   */
  applyTransforms(object, position, rotation, scale, lookAt)

  /**
   * Update the world matrix of the object before applying
   * the world position to the RigidBody
   */
  object.updateWorldMatrix(true, false)

  const worldPosition = getWorldPosition(object)
  const worldRotation = getWorldQuaternion(object)
  const parentWorldScale = object.parent?.getWorldScale(new Vector3()) || new Vector3(1, 1, 1)

  /**
   * RigidBody Description
   */
  const desc = new rapier.RigidBodyDesc(parseRigidBodyType(type))
    .setCanSleep(canSleep)
    .setTranslation(
      worldPosition.x * parentWorldScale.x,
      worldPosition.y * parentWorldScale.y,
      worldPosition.z * parentWorldScale.z
    )
    .setRotation({ x: worldRotation.x, y: worldRotation.y, z: worldRotation.z, w: worldRotation.w })

  /**
   * RigidBody init
   */
  export const rigidBody = world.createRigidBody(desc)

  /**
   * Reactive RigidBody properties
   */
  $: {
    rigidBody.setBodyType(parseRigidBodyType(type))
    rigidBody.setLinvel(positionToVector3(linearVelocity), true)
    rigidBody.setAngvel(rotationToEuler(angularVelocity), true)
    rigidBody.setGravityScale(gravityScale, true)
    rigidBody.enableCcd(ccd)
    rigidBody.setDominanceGroup(dominance)
    rigidBody.lockRotations(lockRotations, true)
    rigidBody.lockTranslations(lockTranslations, true)
    rigidBody.setEnabledRotations(...enabledRotations, true)
    rigidBody.setEnabledTranslations(...enabledTranslations, true)
  }

  /**
   * Setting the RigidBody context so that colliders can
   * hook onto.
   */
  setContext<RigidBodyContext>('threlte-rapier-rigidbody', rigidBody)

  /**
   * Add the mesh to the context
   */
  addRigidBodyToContext(rigidBody, object, dispatcher)

  /**
   * cleanup
   */
  onDestroy(() => {
    removeRigidBodyFromContext(rigidBody)
    world.removeRigidBody(rigidBody)
  })
</script>

<SceneGraphObject {object}>
  <slot />
</SceneGraphObject>

<LayerableObject {object} />
