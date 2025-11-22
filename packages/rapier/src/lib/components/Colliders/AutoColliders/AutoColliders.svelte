<script
  lang="ts"
  generics="TMassDef extends MassDef"
>
  import { ActiveCollisionTypes, CoefficientCombineRule } from '@dimforge/rapier3d-compat'
  import { createParentObject3DContext, useParentObject3D, watch } from '@threlte/core'
  import { onDestroy, onMount } from 'svelte'
  import { Group } from 'three'
  import { useCollisionGroups } from '../../../hooks/useCollisionGroups.js'
  import { useRapier } from '../../../hooks/useRapier.js'
  import { useRigidBody } from '../../../hooks/useRigidBody.js'
  import { applyColliderActiveEvents } from '../../../lib/applyColliderActiveEvents.js'
  import { createCollidersFromChildren } from '../../../lib/createCollidersFromChildren.js'
  import { eulerToQuaternion } from '../../../lib/eulerToQuaternion.js'
  import { useParentRigidbodyObject } from '../../../lib/rigidBodyObjectContext.js'
  import { useCreateEvent } from '../../../lib/useCreateEvent.js'
  import type { AutoCollidersProps, MassDef } from './types.js'

  let {
    shape = 'convexHull',
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
    colliders = $bindable(),
    oncreate,
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit,
    children
  }: AutoCollidersProps<TMassDef> = $props()

  const group = new Group()

  const { updateRef } = useCreateEvent(oncreate)
  const rigidBody = useRigidBody()
  const rigidBodyParentObject = useParentRigidbodyObject()

  const { world, addColliderToContext, removeColliderFromContext } = useRapier()

  const collisionGroups = useCollisionGroups()

  const cleanup = () => {
    if (colliders === undefined) return

    collisionGroups.removeColliders(colliders)
    colliders.forEach((c) => {
      removeColliderFromContext(c)
      world.removeCollider(c, true)
    })
    colliders.length = 0
  }

  const events = {
    oncollisionenter,
    oncollisionexit,
    oncontact,
    onsensorenter,
    onsensorexit
  }

  const create = () => {
    cleanup()
    colliders = createCollidersFromChildren(
      group,
      shape ?? 'convexHull',
      world,
      rigidBody,
      rigidBodyParentObject
    )
    colliders.forEach((c) => addColliderToContext(c, group, events))

    collisionGroups.registerColliders(colliders)

    colliders.forEach((collider) => {
      applyColliderActiveEvents(collider, events, rigidBody?.userData?.events)
      collider.setActiveCollisionTypes(ActiveCollisionTypes.ALL)
      collider.setRestitution(restitution ?? 0)
      collider.setRestitutionCombineRule(restitutionCombineRule ?? CoefficientCombineRule.Average)
      collider.setFriction(friction ?? 0.7)
      collider.setFrictionCombineRule(frictionCombineRule ?? CoefficientCombineRule.Average)
      collider.setSensor(sensor ?? false)
      collider.setContactForceEventThreshold(contactForceEventThreshold ?? 0)
      if (density) collider.setDensity(density)
      if (mass) {
        if (centerOfMass && principalAngularInertia && angularInertiaLocalFrame)
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
        else collider.setMass(mass)
      }
    })

    updateRef(colliders)
  }

  /**
   * Refresh the colliders.
   */
  export const refresh = () => create()

  onMount(() => {
    create()
  })

  /**
   * Cleanup
   */
  onDestroy(cleanup)

  const parent3DObject = useParentObject3D()
  createParentObject3DContext(group)
  watch(parent3DObject, (parent) => {
    parent?.add(group)
    return () => {
      parent?.remove(group)
    }
  })
</script>

{@render children?.({ colliders: colliders ?? [], refresh })}
