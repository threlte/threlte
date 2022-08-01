<script lang="ts">
  import {
    ActiveCollisionTypes,
    ActiveEvents,
    CoefficientCombineRule,
    type Collider,
    type RigidBody
  } from '@dimforge/rapier3d-compat'
  import { SceneGraphObject, type TransformableObjectProperties } from '@threlte/core'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Object3D } from 'three'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'
  import { useRapier } from '../../hooks/useRapier'
  import { useRigidBody } from '../../hooks/useRigidBody'
  import { applyTransforms } from '../../lib/applyTransforms'
  import { createCollidersFromChildren } from '../../lib/createCollidersFromChildren'
  import { positionToVector3 } from '../../lib/positionToVector3'
  import { rotationToQuaternion } from '../../lib/rotationToQuaternion'
  import type { AutoCollidersShapes, ColliderEventMap } from '../../types/types'

  interface Props {
    shape?: AutoCollidersShapes
    position?: NonNullable<TransformableObjectProperties['position']>
    rotation?: TransformableObjectProperties['rotation']
    scale?: NonNullable<TransformableObjectProperties['scale']>
    lookAt?: NonNullable<TransformableObjectProperties['lookAt']>
    restitution?: number
    restitutionCombineRule?: CoefficientCombineRule
    friction?: number
    frictionCombineRule?: CoefficientCombineRule
    sensor?: boolean
    colliders?: Collider[]
  }

  type Density = $$Generic<number | undefined>
  type Mass = $$Generic<Density extends undefined ? number | undefined : undefined>
  type MassProperties = $$Generic<
    Density extends undefined
      ? Mass extends undefined
        ? {
            mass: number
            centerOfMass: Position
            principalAngularInertia: Position
            angularInertiaLocalFrame: Rotation
          }
        : undefined
      : undefined
  >

  interface WithDensity extends Props {
    density?: Density
  }

  interface WithMass extends Props {
    mass?: Mass
  }

  interface WithMassProperties extends WithMass {
    massProperties?: MassProperties
  }

  type $$Props = WithDensity | WithMass | WithMassProperties

  export let shape: $$Props['shape'] = 'convexHull'

  export let position: $$Props['position'] = undefined
  export let rotation: $$Props['rotation'] = undefined
  export let scale: $$Props['scale'] = undefined
  export let lookAt: $$Props['lookAt'] = undefined
  export let restitution: $$Props['restitution'] = undefined
  export let restitutionCombineRule: $$Props['restitutionCombineRule'] = undefined
  export let friction: $$Props['friction'] = undefined
  export let frictionCombineRule: $$Props['frictionCombineRule'] = undefined
  export let sensor: $$Props['sensor'] = undefined

  export let density = undefined as Density
  export let mass = undefined as Mass
  export let massProperties = undefined as MassProperties

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
    colliders = createCollidersFromChildren(object, shape ?? 'convexHull', world, rigidBody)
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
        if (density) collider.setDensity(density)
        if (mass) collider.setMass(mass)
        if (massProperties)
          collider.setMassProperties(
            massProperties.mass,
            positionToVector3(massProperties.centerOfMass),
            positionToVector3(massProperties.principalAngularInertia),
            rotationToQuaternion(massProperties.angularInertiaLocalFrame)
          )
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
