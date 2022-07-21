<script lang="ts" context="module">
  import {
    ActiveEvents,
    CoefficientCombineRule,
    Collider,
    ColliderDesc
  } from '@dimforge/rapier3d-compat'
  import { useFrame, type TransformableObjectProperties } from '@threlte/core'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'

  import type { Vector3Array } from '../../types/components'

  export type RigidBodyShape =
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

  type ColliderProperties<U extends RigidBodyShape> = Omit<
    TransformableObjectProperties,
    'object'
  > & {
    shape: RigidBodyShape

    /**
     * Arguments to pass to the collider specific to shape
     */
    args: Parameters<typeof ColliderDesc[U]>

    /**
     * The mass of this rigid body.
     * The mass and density is automatically calculated based on the shape of the collider.
     * Generally, it's not recommended to adjust the mass properties as it could lead to
     * unexpected behaviors.
     * More info https://rapier.rs/docs/user_guides/javascript/colliders#mass-properties
     */
    mass?: number

    /**
     * The center of mass of this rigid body
     */
    centerOfMass?: Vector3Array

    /**
     * Principal angular inertia of this rigid body
     */
    principalAngularInertia?: Vector3Array

    /**
     * Restitution controls how elastic (aka. bouncy) a contact is. Le elasticity of a contact is controlled by the restitution coefficient
     */
    restitution?: number

    /**
     * What happens when two bodies meet. See https://rapier.rs/docs/user_guides/javascript/colliders#friction.
     */
    restitutionCombineRule?: CoefficientCombineRule

    /**
     * Friction is a force that opposes the relative tangential motion between two rigid-bodies with colliders in contact.
     * A friction coefficient of 0 implies no friction at all (completely sliding contact) and a coefficient
     * greater or equal to 1 implies a very strong friction. Values greater than 1 are allowed.
     */
    friction?: number

    /**
     * What happens when two bodies meet. See https://rapier.rs/docs/user_guides/javascript/colliders#friction.
     */
    frictionCombineRule?: CoefficientCombineRule

    /**
     * The position of this collider relative to the rigid body
     */
    position?: Vector3Array

    /**
     * The rotation of this collider relative to the rigid body
     */
    rotation?: Vector3Array

    sensor?: boolean

    attach?: boolean
  }

  export const scaleVertices = (vertices: ArrayLike<number>, scale: Vector3) => {
    const scaledVerts = Array.from(vertices)

    for (let i = 0; i < vertices.length / 3; i++) {
      scaledVerts[i * 3] *= scale.x
      scaledVerts[i * 3 + 1] *= scale.y
      scaledVerts[i * 3 + 2] *= scale.z
    }

    return scaledVerts
  }

  export const scaleColliderArgs = <U extends RigidBodyShape>(
    shape: RigidBodyShape,
    args: ColliderProperties<U>['args'],
    scale: Vector3
  ) => {
    // Heightfield only scales the last arg
    const newArgs = args.slice()

    if (shape === 'heightfield') {
      ;(newArgs[3] as number) *= scale.x
      return newArgs
    }

    // Trimesh and convex scale the vertices
    if (shape === 'trimesh' || shape === 'convexHull') {
      newArgs[0] = scaleVertices(newArgs[0] as ArrayLike<number>, scale)
      return newArgs
    }

    const scaleArray = [scale.x, scale.y, scale.z]
    return newArgs.map((arg, index) => scaleArray[index] * (arg as number))
  }
</script>

<script lang="ts">
  import { Object3DInstance } from '@threlte/core'
  import { Object3D, Quaternion, Vector3 } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import { positionToVector3 } from '../../lib/positionToVector3'
  import { rotationToQuaternion } from '../../lib/rotationToQuaternion'
  import type { ThrelteRapierEventMap } from '../../types/types'
  import { useRigidBody } from '../RigidBody/RigidBody.svelte'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'

  const object = new Object3D()

  const { world, colliderEventDispatchers } = useRapier()

  type Shape = $$Generic<RigidBodyShape> // string or whatever base type

  export let shape: Shape
  export let args: ColliderProperties<Shape>['args']
  export let mass: ColliderProperties<Shape>['mass'] = undefined
  export let centerOfMass: ColliderProperties<Shape>['centerOfMass'] = undefined
  export let principalAngularInertia: ColliderProperties<Shape>['principalAngularInertia'] =
    undefined
  export let restitution: ColliderProperties<Shape>['restitution'] = undefined
  export let restitutionCombineRule: ColliderProperties<Shape>['restitutionCombineRule'] = undefined
  export let friction: ColliderProperties<Shape>['friction'] = undefined
  export let frictionCombineRule: ColliderProperties<Shape>['frictionCombineRule'] = undefined

  export let position: TransformableObjectProperties['position'] = undefined
  export let rotation: TransformableObjectProperties['rotation'] = undefined
  export let scale: TransformableObjectProperties['scale'] = undefined
  export let lookAt: TransformableObjectProperties['lookAt'] = undefined

  export let sensor: ColliderProperties<Shape>['sensor'] = false
  export let attach: ColliderProperties<Shape>['attach'] = true

  /**
   * It's perfectly fine to use a Collider without a <RigidBody> component.
   * In this case, the Collider will receive the events.
   * The use case is most likely a sensor.
   */
  const rigidBody = useRigidBody()

  const attachToRigidBody = attach && !!rigidBody

  type $$Events = ThrelteRapierEventMap
  const dispatcher = createEventDispatcher<ThrelteRapierEventMap>()

  let collider: Collider | undefined = undefined

  const { registerColliders, removeColliders } = useCollisionGroups()

  onMount(() => {
    const objectWorldPosition = object.getWorldPosition(new Vector3())
    const objectWorldScale = object.getWorldScale(new Vector3())
    const objectWorldQuaternion = object.getWorldQuaternion(new Quaternion())

    const [cmx, cmy, cmz] = centerOfMass || [0, 0, 0]
    const [pix, piy, piz] = principalAngularInertia || [
      mass ?? 1 * 0.2,
      mass ?? 1 * 0.2,
      mass ?? 1 * 0.2
    ]

    const colliderPos = attachToRigidBody ? positionToVector3(position) : objectWorldPosition
    const scaledColliderPos = colliderPos.multiply(objectWorldScale)
    const colliderRotation = attachToRigidBody
      ? rotationToQuaternion(rotation)
      : objectWorldQuaternion

    const scaledArgs = scaleColliderArgs(shape, args, objectWorldScale)

    let colliderDesc = (
      ColliderDesc[shape](
        // @ts-ignore
        ...scaledArgs
      ) as ColliderDesc
    )
      .setTranslation(scaledColliderPos.x, scaledColliderPos.y, scaledColliderPos.z)
      .setRotation(colliderRotation)
      .setRestitution(restitution ?? 0)
      .setRestitutionCombineRule(restitutionCombineRule ?? CoefficientCombineRule.Average)
      .setFriction(friction ?? 0.7)
      .setFrictionCombineRule(frictionCombineRule ?? CoefficientCombineRule.Average)
      .setSensor(sensor ?? false)

    colliderDesc = colliderDesc.setActiveEvents(ActiveEvents.COLLISION_EVENTS)

    // If any of the mass properties are specified, add mass properties
    if (mass || centerOfMass || principalAngularInertia) {
      colliderDesc.setDensity(0)
      colliderDesc.setMassProperties(
        mass ?? 1,
        { x: cmx, y: cmy, z: cmz },
        { x: pix, y: piy, z: piz },
        { x: 0, y: 0, z: 0, w: 1 }
      )
    }

    collider = world.createCollider(colliderDesc, attachToRigidBody ? rigidBody : undefined)
    registerColliders([collider])
    colliderEventDispatchers.set(collider.handle, dispatcher)
  })

  onDestroy(() => {
    if (!collider) return
    removeColliders([collider])
    colliderEventDispatchers.delete(collider.handle)
    world.removeCollider(collider, false)
  })

  /**
   * If the collider is not attached to a rigidBody, it's using
   * the objects transforms. These need to be updated onFrame
   */
  const worldPosition = new Vector3()
  const worldQuaternion = new Quaternion()
  const worldScale = new Vector3()

  useFrame(() => {
    if (attachToRigidBody || !collider) return

    object.getWorldPosition(worldPosition)
    object.getWorldQuaternion(worldQuaternion)
    object.getWorldScale(worldScale)

    collider.setTranslation(worldPosition.multiply(worldScale))
    collider.setRotation(worldQuaternion)
  })
</script>

<Object3DInstance {object} {position} {scale} {rotation} {lookAt}>
  <slot />
</Object3DInstance>
