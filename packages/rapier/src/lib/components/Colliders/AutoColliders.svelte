<script lang="ts">
  import {
    ActiveCollisionTypes,
    CoefficientCombineRule,
    type Collider
  } from '@dimforge/rapier3d-compat'
  import { SceneGraphObject } from '@threlte/core'
  import { onDestroy, onMount } from 'svelte'
  import { Group } from 'three'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'
  import { useRapier } from '../../hooks/useRapier'
  import { useRigidBody } from '../../hooks/useRigidBody'
  import { useCreateEvent } from '../../lib/useCreateEvent'
  import { useParentRigidbodyObject } from '../../lib/rigidBodyObjectContext'
  import { applyColliderActiveEvents } from '../../lib/applyColliderActiveEvents'
  import { createCollidersFromChildren } from '../../lib/createCollidersFromChildren'
  import { eulerToQuaternion } from '../../lib/eulerToQuaternion'
  import type { ColliderEventMap } from '../../types/types'
  import type { AutoCollidersProps, MassDef } from './AutoColliders.svelte'

  type TMassDef = $$Generic<MassDef>

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
    refresh = $bindable(() => create()),
    colliders = $bindable(),
    ...props
  }: AutoCollidersProps<TMassDef> = $props()

  const group = new Group()

  const { updateRef } = useCreateEvent<Collider[]>(props.$$events)
  const rigidBody = useRigidBody()
  const rigidBodyParentObject = useParentRigidbodyObject()

  const { world, addColliderToContext, removeColliderFromContext } = useRapier()

  const collisionGroups = useCollisionGroups()

  /**
   * Events setup
   */
  type $$Events = ColliderEventMap

  const cleanup = () => {
    if (colliders === undefined) return

    collisionGroups.removeColliders(colliders)
    colliders.forEach((c) => {
      removeColliderFromContext(c)
      world.removeCollider(c, true)
    })
    colliders.length = 0
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
    colliders.forEach((c) => addColliderToContext(c, group, props.$$events))

    collisionGroups.registerColliders(colliders)

    colliders.forEach((collider) => {
      applyColliderActiveEvents(collider, props.$$events, rigidBody?.userData?.events)
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

  onMount(() => {
    create()
  })

  /**
   * Cleanup
   */
  onDestroy(cleanup)
</script>

<SceneGraphObject object={group}>
  <slot
    {colliders}
    {refresh}
  />
</SceneGraphObject>
