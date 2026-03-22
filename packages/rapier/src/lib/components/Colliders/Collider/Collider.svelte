<script
  module
  lang="ts"
>
  const vec3 = new Vector3()
</script>

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
  import { useCollisionGroups } from '../../../hooks/useCollisionGroups.js'
  import { useRapier } from '../../../hooks/useRapier.js'
  import { useRigidBody } from '../../../hooks/useRigidBody.js'
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
    collider: externalCollider = $bindable(),
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
  const parentRigidBodyObject = useParentRigidbodyObject()
  const hasRigidBodyParent = !!rigidBody

  const rapierContext = useRapier()
  const { world } = rapierContext

  const collisionGroups = useCollisionGroups()

  const events = {
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit
  }

  const scale = $derived(object.getWorldScale(vec3))
  const scaledArgs = $derived(scaleColliderArgs(shape, args, scale))
  const colliderDesc = $derived(ColliderDesc[shape](...scaledArgs) as ColliderDesc)
  const collider = $derived(world.createCollider(colliderDesc, rigidBody))

  /**
   * Actual collider setup happens onMount as only then
   * the transforms are finished.
   */
  $effect(() => {
    collider.setActiveCollisionTypes(ActiveCollisionTypes.ALL)

    /**
     * Add collider to context
     */
    rapierContext.addColliderToContext(collider, object, events)

    /**
     * For use in conjunction with component <CollisionGroups>
     */
    collisionGroups.registerColliders([collider])

    if (hasRigidBodyParent) {
      const rigidBodyWorldPos = new Vector3()
      const rigidBodyWorldQuatInversed = new Quaternion()

      parentRigidBodyObject?.getWorldPosition(rigidBodyWorldPos)
      parentRigidBodyObject?.getWorldQuaternion(rigidBodyWorldQuatInversed)
      rigidBodyWorldQuatInversed.invert()

      const worldPosition = object.getWorldPosition(new Vector3()).sub(rigidBodyWorldPos)
      const worldRotation = object
        .getWorldQuaternion(new Quaternion())
        .premultiply(rigidBodyWorldQuatInversed)

      collider.setTranslationWrtParent(worldPosition)
      collider.setRotationWrtParent(worldRotation)
    } else {
      collider.setTranslation(object.getWorldPosition(new Vector3()))
      collider.setRotation(object.getWorldQuaternion(new Quaternion()))
    }
  })

  $effect.pre(() => {
    collider?.setRestitution(restitution ?? 0)
  })
  $effect.pre(() => {
    collider?.setRestitutionCombineRule(restitutionCombineRule ?? CoefficientCombineRule.Average)
  })
  $effect.pre(() => {
    collider?.setFriction(friction ?? 0.7)
  })
  $effect.pre(() => {
    collider?.setFrictionCombineRule(frictionCombineRule ?? CoefficientCombineRule.Average)
  })
  $effect.pre(() => {
    collider?.setSensor(sensor ?? false)
  })
  $effect.pre(() => {
    collider?.setContactForceEventThreshold(contactForceEventThreshold ?? 0)
  })
  $effect.pre(() => {
    if (density !== undefined) {
      collider?.setDensity(density)
    }
  })
  $effect.pre(() => {
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

  $effect.pre(() => {
    if (collider) {
      applyColliderActiveEvents(collider, events, rigidBody?.userData?.events)
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
  createParentObject3DContext(() => object)

  $effect.pre(() => {
    parent3DObject.current.add(object)
    return () => {
      parent3DObject.current.remove(object)
    }
  })

  $effect.pre(() => {
    const _collider = collider
    if (_collider) {
      return untrack(() => {
        externalCollider = collider
        return oncreate?.(_collider)
      })
    }
  })

  /**
   * Cleanup
   */
  $effect(() => {
    return () => {
      if (!collider) return
      rapierContext.removeColliderFromContext(collider)
      collisionGroups.removeColliders([collider])
      world.removeCollider(collider, true)
    }
  })
</script>

{@render children?.({ collider })}
