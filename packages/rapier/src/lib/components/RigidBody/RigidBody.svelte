<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { createRawEventDispatcher, SceneGraphObject } from '@threlte/core'
  import { onDestroy, setContext, tick } from 'svelte'
  import { Object3D, Vector3 } from 'three'
  import { useHasEventListeners } from '../../hooks/useHasEventListener'
  import { useRapier } from '../../hooks/useRapier'
  import { getWorldPosition, getWorldQuaternion, getWorldScale } from '../../lib/getWorldTransforms'
  import { parseRigidBodyType } from '../../lib/parseRigidBodyType'
  import type { RigidBodyContext, RigidBodyEventMap, ThrelteRigidBody } from '../../types/types'
  import type { RigidBodyProps } from './RigidBody.svelte'

  const { world, rapier, addRigidBodyToContext, removeRigidBodyFromContext } = useRapier()

  type $$Props = Required<RigidBodyProps>
  type OptProps = RigidBodyProps

  export let linearVelocity: OptProps['linearVelocity'] = undefined
  export let angularVelocity: OptProps['angularVelocity'] = undefined

  export let type: $$Props['type'] = 'dynamic'
  export let canSleep: $$Props['canSleep'] = true
  export let gravityScale: $$Props['gravityScale'] = 1
  export let ccd: $$Props['ccd'] = false
  export let angularDamping: $$Props['angularDamping'] = 0
  export let linearDamping: $$Props['linearDamping'] = 0
  export let lockRotations: $$Props['lockRotations'] = false
  export let lockTranslations: $$Props['lockTranslations'] = false
  export let enabledRotations: $$Props['enabledRotations'] = [true, true, true]
  export let enabledTranslations: $$Props['enabledTranslations'] = [true, true, true]
  export let dominance: $$Props['dominance'] = 0
  export let enabled: $$Props['enabled'] = true

  /**
   * Every RigidBody receives and forwards collision-related events
   */
  type $$Events = {
    [key in keyof RigidBodyEventMap]: CustomEvent<RigidBodyEventMap[key]>
  }
  const dispatcher = createRawEventDispatcher<RigidBodyEventMap>()

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
   * RigidBody Description
   */
  const desc = new rapier.RigidBodyDesc(parseRigidBodyType(type)).setCanSleep(canSleep)

  /**
   * Export the rigidBody only after positional initialization
   */
  export let rigidBody: RigidBody | undefined = undefined

  /**
   * Temporary RigidBody init
   */
  const rigidBodyTemp = world.createRigidBody(desc) as ThrelteRigidBody

  /**
   * Apply transforms after the parent component added "object" to itself
   */
  const initPosition = async () => {
    await tick()
    object.updateMatrix()
    object.updateWorldMatrix(true, false)
    const parentWorldScale = object.parent ? getWorldScale(object.parent) : new Vector3(1, 1, 1)
    const worldPosition = getWorldPosition(object).multiply(parentWorldScale)
    const worldQuaternion = getWorldQuaternion(object)
    rigidBodyTemp.setTranslation(worldPosition, true)
    rigidBodyTemp.setRotation(worldQuaternion, true)
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
  $: rigidBodyTemp.setBodyType(parseRigidBodyType(type), true)
  $: if (linearVelocity)
    rigidBodyTemp.setLinvel(
      { x: linearVelocity[0], y: linearVelocity[1], z: linearVelocity[2] },
      true
    )
  $: if (angularVelocity)
    rigidBodyTemp.setAngvel(
      { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
      true
    )
  $: rigidBodyTemp.setGravityScale(gravityScale, true)
  $: rigidBodyTemp.enableCcd(ccd)
  $: rigidBodyTemp.setDominanceGroup(dominance)
  $: rigidBodyTemp.lockRotations(lockRotations, true)
  $: rigidBodyTemp.lockTranslations(lockTranslations, true)
  $: rigidBodyTemp.setEnabledRotations(...enabledRotations, true)
  $: rigidBodyTemp.setEnabledTranslations(...enabledTranslations, true)
  $: rigidBodyTemp.setAngularDamping(angularDamping)
  $: rigidBodyTemp.setLinearDamping(linearDamping)
  $: rigidBodyTemp.setEnabled(enabled)

  /**
   * Add userData to the rigidBody
   */
  const { hasEventListeners } = useHasEventListeners<typeof dispatcher>()
  rigidBodyTemp.userData = {
    hasEventListeners
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
