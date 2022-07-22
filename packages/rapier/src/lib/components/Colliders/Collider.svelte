<script lang="ts">
  import {
    ActiveEvents,
    CoefficientCombineRule,
    Collider,
    ColliderDesc,
    type RigidBody
  } from '@dimforge/rapier3d-compat'
  import {
    SceneGraphObject,
    TransformableObject,
    useFrame,
    type TransformableObjectProperties
  } from '@threlte/core'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Object3D, Quaternion, Vector3 } from 'three'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'
  import { useRapier } from '../../hooks/useRapier'
  import { useRigidBody } from '../../hooks/useRigidBody'
  import { applyTransforms } from '../../lib/applyTransforms'
  import { getWorldPosition, getWorldQuaternion } from '../../lib/getWorldTransforms'
  import { positionToVector3 } from '../../lib/positionToVector3'
  import { scaleColliderArgs } from '../../lib/scaleColliderArgs'
  import type { ColliderProperties } from '../../types/components'
  import type { ThrelteRapierEventMap } from '../../types/types'

  type Shape = $$Generic<
    | 'ball'
    | 'capsule'
    | 'segment'
    | 'triangle'
    | 'roundTriangle'
    | 'polyline'
    | 'trimesh'
    | 'cuboid'
    | 'roundCuboid'
    | 'heightfield'
    | 'cylinder'
    | 'roundCylinder'
    | 'cone'
    | 'roundCone'
    | 'convexHull'
    | 'convexMesh'
    | 'roundConvexHull'
    | 'roundConvexMesh'
  >

  type Args = $$Generic<Parameters<typeof ColliderDesc[Shape]>>

  export let shape: Shape
  export let args: Args

  export let position: ColliderProperties<Shape>['position'] = undefined
  export let rotation: ColliderProperties<Shape>['rotation'] = undefined
  export let scale: ColliderProperties<Shape>['scale'] = undefined
  export let lookAt: ColliderProperties<Shape>['lookAt'] = undefined

  export let mass: ColliderProperties<Shape>['mass'] = undefined
  export let centerOfMass: ColliderProperties<Shape>['centerOfMass'] = undefined
  export let principalAngularInertia: ColliderProperties<Shape>['principalAngularInertia'] =
    undefined
  export let restitution: ColliderProperties<Shape>['restitution'] = undefined
  export let restitutionCombineRule: ColliderProperties<Shape>['restitutionCombineRule'] = undefined
  export let friction: ColliderProperties<Shape>['friction'] = undefined
  export let frictionCombineRule: ColliderProperties<Shape>['frictionCombineRule'] = undefined
  export let sensor: ColliderProperties<Shape>['sensor'] = undefined

  const object = new Object3D()

  /**
   * Immediately apply transforms
   */
  applyTransforms(object, position, rotation, scale, lookAt)
  object.updateWorldMatrix(true, false)

  const rigidBody = useRigidBody() as RigidBody | undefined
  const isAttached = !!rigidBody

  const { world, colliderEventDispatchers } = useRapier()

  let collider: Collider

  const { registerColliders, removeColliders } = useCollisionGroups()

  /**
   * Events setup
   */
  type $$Events = ThrelteRapierEventMap
  const dispatcher = createEventDispatcher<ThrelteRapierEventMap>()

  /**
   * Actual collider setup happens onMount as only then
   * the transforms are finished.
   */
  onMount(() => {
    const scale = object.getWorldScale(new Vector3())
    const scaledArgs = scaleColliderArgs(shape, args, scale)

    // @ts-ignore
    const colliderDesc = ColliderDesc[shape](...scaledArgs) as ColliderDesc

    collider = world.createCollider(colliderDesc, rigidBody)

    colliderEventDispatchers.set(collider.handle, dispatcher)

    /**
     * For use in conjunction with component <CollisionGroups>
     */
    registerColliders([collider])

    if (isAttached) {
      const rigidBodyWorldPos = new Vector3()
      const rigidBodyWorldQuatInversed = new Quaternion()
      object.traverseAncestors((child: Object3D) => {
        if (child.userData.isRigidBody) {
          child.getWorldPosition(rigidBodyWorldPos)
          child.getWorldQuaternion(rigidBodyWorldQuatInversed)
          rigidBodyWorldQuatInversed.invert()
        }
      })
      collider.setTranslationWrtParent(
        object.getWorldPosition(new Vector3()).sub(rigidBodyWorldPos)
      )
      collider.setRotationWrtParent(
        object.getWorldQuaternion(new Quaternion()).premultiply(rigidBodyWorldQuatInversed)
      )
    } else {
      collider.setTranslation(object.getWorldPosition(new Vector3()))
      collider.setRotation(object.getWorldQuaternion(new Quaternion()))
    }
  })

  $: {
    if (collider) {
      collider.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
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
    }
  }

  useFrame(
    () => {
      collider.setTranslation(getWorldPosition(object))
      collider.setRotation(getWorldQuaternion(object))
    },
    {
      autostart: !isAttached
    }
  )

  /**
   * Cleanup
   */
  onDestroy(() => {
    if (!collider) return
    removeColliders([collider])
    colliderEventDispatchers.delete(collider.handle)
    world.removeCollider(collider, true)
  })
</script>

<SceneGraphObject {object}>
  <slot />
</SceneGraphObject>

{#if !isAttached}
  <TransformableObject {object} {position} {rotation} {scale} />
{/if}
