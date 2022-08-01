<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'

  import { LayerableObject, SceneGraphObject } from '@threlte/core'
  import { createEventDispatcher, onDestroy, setContext, tick } from 'svelte'
  import { Object3D, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import { applyTransforms } from '../../lib/applyTransforms'
  import { getWorldPosition, getWorldQuaternion, getWorldScale } from '../../lib/getWorldTransforms'
  import { parseRigidBodyType } from '../../lib/parseRigidBodyType'
  import { positionToVector3 } from '../../lib/positionToVector3'
  import { rotationToEuler } from '../../lib/rotationToEuler'
  import type { RigidBodyProperties } from '../../types/components'
  import type { RigidBodyContext, RigidBodyEventMap } from '../../types/types'

  const { world, rapier, addRigidBodyToContext, removeRigidBodyFromContext } = useRapier()

  export let debug = false

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

  /**
   * RigidBody Description
   */
  const desc = new rapier.RigidBodyDesc(parseRigidBodyType(type)).setCanSleep(canSleep)

  export let rigidBody: RigidBody | undefined = undefined

  /**
   * RigidBody init
   */
  export const rigidBodyTemp = world.createRigidBody(desc)

  /**
   * Apply transforms after the parent component added "object" to itself
   */
  const initPosition = async () => {
    await tick()
    applyTransforms(object, position, rotation, scale, lookAt)
    object.updateMatrix()
    object.updateWorldMatrix(true, false)
    const parentWorldScale = object.parent ? getWorldScale(object.parent) : new Vector3(1, 1, 1)
    const worldPosition = getWorldPosition(object).multiply(parentWorldScale)
    const worldQuaternion = getWorldQuaternion(object)
    rigidBodyTemp.setTranslation(worldPosition, true)
    rigidBodyTemp.setRotation(worldQuaternion, true)
    if (debug) {
      console.log('worldPosition', worldPosition)
      console.log('worldQuaternion', worldQuaternion)
    }
    if (debug) console.log(JSON.stringify(desc, null, 2))
    rigidBody = rigidBodyTemp
  }
  initPosition()

  /**
   * Will come in handy in the future for joints
   */
  object.userData.rigidBody = rigidBodyTemp

  /**
   * Reactive RigidBody properties
   */
  $: {
    rigidBodyTemp.setBodyType(parseRigidBodyType(type))
    rigidBodyTemp.setLinvel(positionToVector3(linearVelocity), true)
    rigidBodyTemp.setAngvel(rotationToEuler(angularVelocity), true)
    rigidBodyTemp.setGravityScale(gravityScale, true)
    rigidBodyTemp.enableCcd(ccd)
    rigidBodyTemp.setDominanceGroup(dominance)
    rigidBodyTemp.lockRotations(lockRotations, true)
    rigidBodyTemp.lockTranslations(lockTranslations, true)
    rigidBodyTemp.setEnabledRotations(...enabledRotations, true)
    rigidBodyTemp.setEnabledTranslations(...enabledTranslations, true)
  }

  /**
   * Setting the RigidBody context so that colliders can
   * hook onto.
   */
  setContext<RigidBodyContext>('threlte-rapier-rigidbody', rigidBodyTemp)

  /**
   * Add the mesh to the context
   */
  addRigidBodyToContext(rigidBodyTemp, object, dispatcher)

  /**
   * cleanup
   */
  onDestroy(() => {
    removeRigidBodyFromContext(rigidBodyTemp)
    world.removeRigidBody(rigidBodyTemp)
  })
</script>

<SceneGraphObject {object}>
  <slot />
</SceneGraphObject>

<LayerableObject {object} />
