<script lang="ts">
  import type { RigidBody } from '@dimforge/rapier3d-compat'
  import { SceneGraphObject } from '@threlte/core'
  import { onDestroy, setContext, tick } from 'svelte'
  import { Object3D, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import { getWorldPosition, getWorldQuaternion, getWorldScale } from '../../lib/getWorldTransforms'
  import { parseRigidBodyType } from '../../lib/parseRigidBodyType'
  import type { RigidBodyContext, RigidBodyEvents, ThrelteRigidBody } from '../../types/types'
  import type { RigidBodyProps } from './RigidBody.svelte'
  import { setParentRigidbodyObject } from '../../lib/rigidBodyObjectContext'
  import { useCreateEvent } from '../../lib/useCreateEvent'

  const { world, rapier, addRigidBodyToContext, removeRigidBodyFromContext } = useRapier()

  let {
    linearVelocity,
    angularVelocity,
    type = 'dynamic',
    canSleep = true,
    gravityScale = 1,
    ccd = false,
    angularDamping = 0,
    linearDamping = 0,
    lockRotations = false,
    lockTranslations = false,
    enabledRotations = [true, true, true],
    enabledTranslations = [true, true, true],
    dominance = 0,
    enabled = true,
    userData = {},
    rigidBody = $bindable(),
    oncreate,
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit,
    onsleep,
    onwake
  }: RigidBodyProps & RigidBodyEvents = $props()

  /**
   * Every RigidBody receives and forwards collision-related events
   */
  const { updateRef } = useCreateEvent<RigidBody>(oncreate)

  const object = new Object3D()

  /**
   * isSleeping used for events "sleep" and "wake" in `useFrameHandler`
   */
  object.userData.isSleeping = false

  /**
   * RigidBody Description
   */
  const desc = new rapier.RigidBodyDesc(parseRigidBodyType(type)).setCanSleep(canSleep)

  /**
   * Temporary RigidBody init
   */
  let rigidBodyInternal = world.createRigidBody(desc) as ThrelteRigidBody
  rigidBody = rigidBodyInternal

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
    rigidBodyInternal.setTranslation(worldPosition, true)
    rigidBodyInternal.setRotation(worldQuaternion, true)
    updateRef(rigidBodyInternal)
  }
  initPosition()

  /**
   * Will come in handy in the future for joints
   */
  object.userData.rigidBody = rigidBodyInternal

  $effect.pre(() => rigidBodyInternal.setBodyType(parseRigidBodyType(type), true))
  $effect.pre(() => {
    if (linearVelocity) {
      rigidBodyInternal.setLinvel(
        { x: linearVelocity[0], y: linearVelocity[1], z: linearVelocity[2] },
        true
      )
    }
  })
  $effect.pre(() => {
    if (angularVelocity) {
      rigidBodyInternal.setAngvel(
        { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
        true
      )
    }
  })
  $effect.pre(() => rigidBodyInternal.setGravityScale(gravityScale, true))
  $effect.pre(() => rigidBodyInternal.enableCcd(ccd))
  $effect.pre(() => rigidBodyInternal.setDominanceGroup(dominance))
  $effect.pre(() => rigidBodyInternal.lockRotations(lockRotations, true))
  $effect.pre(() => rigidBodyInternal.lockTranslations(lockTranslations, true))
  $effect.pre(() => rigidBodyInternal.setEnabledRotations(...enabledRotations, true))
  $effect.pre(() => rigidBodyInternal.setEnabledTranslations(...enabledTranslations, true))
  $effect.pre(() => rigidBodyInternal.setAngularDamping(angularDamping))
  $effect.pre(() => rigidBodyInternal.setLinearDamping(linearDamping))
  $effect.pre(() => rigidBodyInternal.setEnabled(enabled))

  /**
   * Add userData to the rigidBody
   */
  $effect.pre(() => {
    rigidBodyInternal.userData = {
      events: {
        oncollisionenter,
        oncollisionexit,
        oncontact,
        onsensorenter,
        onsensorexit,
        onsleep,
        onwake
      },
      ...userData
    }
  })

  /**
   * Setting the RigidBody context so that colliders can
   * hook onto.
   */
  setContext<RigidBodyContext>('threlte-rapier-rigidbody', rigidBodyInternal)

  /**
   * Used by child colliders to restore transform
   */
  setParentRigidbodyObject(object)

  /**
   * Add the mesh to the context
   */
  addRigidBodyToContext(rigidBodyInternal, object, {
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit,
    onsleep,
    onwake
  })

  /**
   * cleanup
   */
  onDestroy(() => {
    removeRigidBodyFromContext(rigidBodyInternal)
    world.removeRigidBody(rigidBodyInternal)
  })
</script>

<SceneGraphObject {object}>
  <slot rigidBody={rigidBodyInternal} />
</SceneGraphObject>
