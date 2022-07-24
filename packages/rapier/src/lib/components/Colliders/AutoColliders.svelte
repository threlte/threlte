<script lang="ts">
  import {
    ActiveCollisionTypes,
    ActiveEvents,
    CoefficientCombineRule,
    type Collider,
    type RigidBody
  } from '@dimforge/rapier3d-compat'
  import { SceneGraphObject } from '@threlte/core'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Object3D, Vector3 } from 'three'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'
  import { useRapier } from '../../hooks/useRapier'
  import { useRigidBody } from '../../hooks/useRigidBody'
  import { applyTransforms } from '../../lib/applyTransforms'
  import { createCollidersFromChildren } from '../../lib/createCollidersFromChildren'
  import { positionToVector3 } from '../../lib/positionToVector3'
  import type { AutoCollidersProperties } from '../../types/components'
  import type { ColliderEventMap } from '../../types/types'

  export let shape: AutoCollidersProperties['shape'] = 'convexHull'

  export let position: AutoCollidersProperties['position'] = undefined
  export let rotation: AutoCollidersProperties['rotation'] = undefined
  export let scale: AutoCollidersProperties['scale'] = undefined
  export let lookAt: AutoCollidersProperties['lookAt'] = undefined

  export let mass: AutoCollidersProperties['mass'] = undefined
  export let centerOfMass: AutoCollidersProperties['centerOfMass'] = undefined
  export let principalAngularInertia: AutoCollidersProperties['principalAngularInertia'] = undefined
  export let restitution: AutoCollidersProperties['restitution'] = undefined
  export let restitutionCombineRule: AutoCollidersProperties['restitutionCombineRule'] = undefined
  export let friction: AutoCollidersProperties['friction'] = undefined
  export let frictionCombineRule: AutoCollidersProperties['frictionCombineRule'] = undefined
  export let sensor: AutoCollidersProperties['sensor'] = undefined

  const object = new Object3D()

  /**
   * Immediately apply transforms
   */
  applyTransforms(object, position, rotation, scale, lookAt)
  object.updateWorldMatrix(true, false)

  const rigidBody = useRigidBody() as RigidBody | undefined

  const { world, addColliderToContext, removeColliderFromContext } = useRapier()

  export let colliders: Collider[] = []

  const collisionGroups = useCollisionGroups()

  /**
   * Events setup
   */
  type $$Events = ColliderEventMap
  const dispatcher = createEventDispatcher<ColliderEventMap>()

  onMount(() => {
    colliders = createCollidersFromChildren(object, shape, world, rigidBody)
    colliders.forEach((c) => addColliderToContext(c, object, dispatcher))
    collisionGroups.registerColliders(colliders)
  })

  $: {
    if (colliders.length > 0) {
      colliders.forEach((collider) => {
        collider.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
        collider.setActiveCollisionTypes(ActiveCollisionTypes.ALL)
        collider.setRestitution(restitution ?? 0)
        collider.setRestitutionCombineRule(restitutionCombineRule ?? CoefficientCombineRule.Average)
        collider.setFriction(friction ?? 0.7)
        collider.setFrictionCombineRule(frictionCombineRule ?? CoefficientCombineRule.Average)
        collider.setSensor(sensor ?? false)

        const { x: cmx, y: cmy, z: cmz } = positionToVector3(centerOfMass) || new Vector3()
        const {
          x: pix,
          y: piy,
          z: piz
        } = positionToVector3(principalAngularInertia) ||
        new Vector3(mass ?? 1 * 0.2, mass ?? 1 * 0.2, mass ?? 1 * 0.2)

        if (mass || centerOfMass || principalAngularInertia) {
          collider.setDensity(0)
          collider.setMassProperties(
            mass ?? 1,
            { x: cmx, y: cmy, z: cmz },
            { x: pix, y: piy, z: piz },
            { x: 0, y: 0, z: 0, w: 1 }
          )
        }
      })
    }
  }

  /**
   * Cleanup
   */
  onDestroy(() => {
    collisionGroups.removeColliders(colliders)
    colliders.forEach((c) => {
      removeColliderFromContext(c)
      world.removeCollider(c, true)
    })
  })
</script>

<SceneGraphObject {object}>
  <slot />
</SceneGraphObject>
