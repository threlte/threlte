<script lang="ts">
  import { createParentObject3D, useParentObject3D } from '@threlte/core'
  import { setContext, tick, untrack } from 'svelte'
  import { Object3D, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier.js'
  import {
    initializeRigidBodyUserData,
    setInitialRigidBodyState
  } from '../../lib/createPhysicsTasks.js'
  import {
    getWorldPosition,
    getWorldQuaternion,
    getWorldScale
  } from '../../lib/getWorldTransforms.js'
  import { parseRigidBodyType } from '../../lib/parseRigidBodyType.js'
  import { setParentRigidbodyObject } from '../../lib/rigidBodyObjectContext.js'
  import type { RigidBodyContext, ThrelteRigidBody } from '../../types/types.js'
  import { overrideTeleportMethods } from './overrideTeleportMethods.js'
  import type { RigidBodyProps } from './types.js'

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
    rigidBody: externalRigidBody = $bindable(),
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit,
    onsleep,
    onwake,
    oncreate,
    children
  }: RigidBodyProps = $props()

  const object = new Object3D()
  initializeRigidBodyUserData(object)

  /**
   * isSleeping used for events "sleep" and "wake" in `createPhysicsTasks`
   */
  object.userData.isSleeping = false

  /**
   * RigidBody Description
   */
  const desc = new rapier.RigidBodyDesc(parseRigidBodyType(type)).setCanSleep(canSleep)

  /**
   * Temporary RigidBody init
   */
  let rigidBody = world.createRigidBody(desc) as ThrelteRigidBody

  overrideTeleportMethods(rigidBody, object)

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
    setInitialRigidBodyState(object, worldPosition, worldQuaternion)
    rigidBody.setTranslation(worldPosition, true)
    rigidBody.setRotation(worldQuaternion, true)
  }
  initPosition()

  /**
   * Will come in handy in the future for joints
   */
  object.userData.rigidBody = rigidBody

  $effect.pre(() => {
    rigidBody.setBodyType(parseRigidBodyType(type), true)
  })

  $effect.pre(() => {
    if (linearVelocity) {
      rigidBody.setLinvel(
        { x: linearVelocity[0], y: linearVelocity[1], z: linearVelocity[2] },
        true
      )
    }
  })
  $effect.pre(() => {
    if (angularVelocity) {
      rigidBody.setAngvel(
        { x: angularVelocity[0], y: angularVelocity[1], z: angularVelocity[2] },
        true
      )
    }
  })
  $effect.pre(() => {
    rigidBody.setGravityScale(gravityScale, true)
  })
  $effect.pre(() => {
    rigidBody.enableCcd(ccd)
  })
  $effect.pre(() => {
    rigidBody.setDominanceGroup(dominance)
  })
  $effect.pre(() => {
    rigidBody.lockRotations(lockRotations, true)
  })
  $effect.pre(() => {
    rigidBody.lockTranslations(lockTranslations, true)
  })
  $effect.pre(() => {
    rigidBody.setEnabledRotations(...enabledRotations, true)
  })
  $effect.pre(() => {
    rigidBody.setEnabledTranslations(...enabledTranslations, true)
  })
  $effect.pre(() => {
    rigidBody.setAngularDamping(angularDamping)
  })
  $effect.pre(() => {
    rigidBody.setLinearDamping(linearDamping)
  })
  $effect.pre(() => {
    rigidBody.setEnabled(enabled)
  })

  /**
   * Add userData to the rigidBody
   */
  $effect.pre(() => {
    rigidBody.userData = {
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
  setContext<RigidBodyContext>('threlte-rapier-rigidbody', rigidBody)

  /**
   * Used by child colliders to restore transform
   */
  setParentRigidbodyObject(object)

  /**
   * Add the mesh to the context
   */
  addRigidBodyToContext(rigidBody, object, {
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit,
    onsleep,
    onwake
  })

  const parent3DObject = useParentObject3D()
  createParentObject3D(() => object)

  $effect(() => {
    parent3DObject.current.add(object)
    return () => {
      parent3DObject.current.remove(object)
    }
  })

  $effect.pre(() => {
    const _rigidBody = rigidBody
    if (_rigidBody) {
      return untrack(() => {
        externalRigidBody = _rigidBody
        return oncreate?.(_rigidBody)
      })
    }
  })

  /**
   * cleanup
   */
  $effect(() => {
    return () => {
      removeRigidBodyFromContext(rigidBody)
      world.removeRigidBody(rigidBody)
    }
  })
</script>

{@render children?.({ rigidBody: rigidBody })}
