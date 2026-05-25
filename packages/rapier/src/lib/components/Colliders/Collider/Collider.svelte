<script
  lang="ts"
  generics="TShape extends Shape, TMassDef extends MassDef"
>
  import {
    ActiveCollisionTypes,
    CoefficientCombineRule,
    ColliderDesc
  } from '@dimforge/rapier3d-compat'
  import { createParentObject3DContext, useParentObject3D, useTask } from '@threlte/core'
  import { untrack } from 'svelte'
  import { Object3D, Quaternion, Vector3 } from 'three'
  import { useCollisionGroups } from '../../../hooks/useCollisionGroups.svelte.js'
  import { useRapier } from '../../../hooks/useRapier.js'
  import { useRigidBody, useRigidBodyEvents } from '../../../hooks/useRigidBody.js'
  import { applyColliderActiveEvents } from '../../../lib/applyColliderActiveEvents.js'
  import { eulerToQuaternion } from '../../../lib/eulerToQuaternion.js'
  import { getWorldPosition, getWorldQuaternion } from '../../../lib/getWorldTransforms.js'
  import { useParentRigidbodyObject } from '../../../lib/rigidBodyObjectContext.js'
  import { scaleColliderArgs } from '../../../lib/scaleColliderArgs.js'
  import type { ColliderProps, MassDef, Shape } from './types.js'

  let {
    shape,
    args,
    type,
    restitution,
    restitutionCombineRule,
    friction,
    frictionCombineRule,
    sensor,
    contactForceEventThreshold,
    density,
    mass,
    centerOfMass,
    principalAngularInertia,
    angularInertiaLocalFrame,
    collider = $bindable(),
    oncreate,
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit,
    children
  }: ColliderProps<TShape, TMassDef> = $props()

  const object = new Object3D()
  const rigidBody = useRigidBody()
  const rigidBodyEvents = useRigidBodyEvents()
  const parentRigidBodyObject = useParentRigidbodyObject()
  const hasRigidBodyParent = $derived(rigidBody.current !== undefined)

  const rapierContext = useRapier()
  const { world } = rapierContext

  const collisionGroups = useCollisionGroups()

  const events = $derived({
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit
  })

  /**
   * Actual collider setup happens onMount as only then
   * the transforms are finished.
   */
  $effect(() => {
    const scale = object.getWorldScale(new Vector3())

    const scaledArgs = scaleColliderArgs(shape, args, scale)

    // @ts-expect-error Todo
    const colliderDesc = ColliderDesc[shape](...scaledArgs) as ColliderDesc

    const currentCollider = world.createCollider(colliderDesc, rigidBody.current)
    currentCollider.setActiveCollisionTypes(ActiveCollisionTypes.ALL)

    /**
     * Add collider to context
     */
    rapierContext.addColliderToContext(
      currentCollider,
      object,
      untrack(() => events)
    )

    /**
     * For use in conjunction with component <CollisionGroups>
     */
    collisionGroups.registerColliders([currentCollider])

    if (hasRigidBodyParent) {
      const rigidBodyWorldPos = new Vector3()
      const rigidBodyWorldQuatInversed = new Quaternion()

      parentRigidBodyObject.current?.getWorldPosition(rigidBodyWorldPos)
      parentRigidBodyObject.current?.getWorldQuaternion(rigidBodyWorldQuatInversed)
      rigidBodyWorldQuatInversed.invert()

      const worldPosition = object.getWorldPosition(new Vector3()).sub(rigidBodyWorldPos)
      const worldRotation = object
        .getWorldQuaternion(new Quaternion())
        .premultiply(rigidBodyWorldQuatInversed)

      currentCollider.setTranslationWrtParent(worldPosition)
      currentCollider.setRotationWrtParent(worldRotation)
    } else {
      currentCollider.setTranslation(object.getWorldPosition(new Vector3()))
      currentCollider.setRotation(object.getWorldQuaternion(new Quaternion()))
    }

    collider = currentCollider

    return () => {
      rapierContext.removeColliderFromContext(currentCollider)
      collisionGroups.removeColliders([currentCollider])
      world.removeCollider(currentCollider, true)
      collider = undefined
    }
  })

  $effect(() => {
    collider?.setRestitution(restitution ?? 0)
  })

  $effect(() => {
    collider?.setRestitutionCombineRule(restitutionCombineRule ?? CoefficientCombineRule.Average)
  })

  $effect(() => {
    collider?.setFriction(friction ?? 0.7)
  })

  $effect(() => {
    collider?.setFrictionCombineRule(frictionCombineRule ?? CoefficientCombineRule.Average)
  })

  $effect(() => {
    collider?.setSensor(sensor ?? false)
  })

  $effect(() => {
    collider?.setContactForceEventThreshold(contactForceEventThreshold ?? 0)
  })

  $effect(() => {
    if (density !== undefined) {
      collider?.setDensity(density)
    }
  })

  $effect(() => {
    if (collider && mass) {
      if (centerOfMass && principalAngularInertia && angularInertiaLocalFrame) {
        collider.setMassProperties(
          mass,
          { x: centerOfMass[0], y: centerOfMass[1], z: centerOfMass[2] },
          {
            x: principalAngularInertia[0],
            y: principalAngularInertia[1],
            z: principalAngularInertia[2]
          },
          eulerToQuaternion(angularInertiaLocalFrame)
        )
      } else {
        collider.setMass(mass)
      }
    }
  })

  $effect(() => {
    if (collider) {
      rapierContext.addColliderToContext(collider, object, events)
      applyColliderActiveEvents(collider, events, rigidBodyEvents.current)
    }
  })

  export const refresh = () => {
    if (!collider) return
    collider.setTranslation(getWorldPosition(object))
    collider.setRotation(getWorldQuaternion(object))
  }

  /**
   * If the Collider isAttached (i.e. NOT child of a RigidBody), update the
   * transforms on every frame.
   */
  useTask(
    () => {
      refresh()
    },
    {
      running: () => !hasRigidBodyParent && type === 'dynamic'
    }
  )

  const parent3DObject = useParentObject3D()
  createParentObject3DContext(object)

  $effect.pre(() => {
    $parent3DObject?.add(object)
    return () => {
      $parent3DObject?.remove(object)
    }
  })

  $effect(() => {
    if (collider) {
      return untrack(() => {
        if (collider) {
          return oncreate?.(collider)
        }
      })
    }
  })
</script>

{@render children?.({ collider })}
