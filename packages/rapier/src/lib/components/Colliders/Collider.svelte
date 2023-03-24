<script lang="ts">
  import {
    ActiveCollisionTypes,
    CoefficientCombineRule,
    Collider,
    ColliderDesc
  } from '@dimforge/rapier3d-compat'
  import { SceneGraphObject, useFrame } from '@threlte/core'
  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte'
  import { Object3D, Quaternion, Vector3 } from 'three'
  import { useCollisionGroups } from '../../hooks/useCollisionGroups'
  import { useHasEventListeners } from '../../hooks/useHasEventListener'
  import { useRapier } from '../../hooks/useRapier'
  import { useRigidBody } from '../../hooks/useRigidBody'
  import { applyColliderActiveEvents } from '../../lib/applyColliderActiveEvents'
  import { eulerToQuaternion } from '../../lib/eulerToQuaternion'
  import { getWorldPosition, getWorldQuaternion } from '../../lib/getWorldTransforms'
  import { scaleColliderArgs } from '../../lib/scaleColliderArgs'
  import type { ColliderEventMap } from '../../types/types'
  import type { ColliderProps, MassDef, Shape } from './Collider.svelte'

  type TShape = $$Generic<Shape>
  type TMassDef = $$Generic<MassDef>
  type $$Props = ColliderProps<TShape, TMassDef>

  export let shape: $$Props['shape']
  export let args: $$Props['args']
  export let restitution: $$Props['restitution'] = undefined as $$Props['restitution']
  export let restitutionCombineRule: $$Props['restitutionCombineRule'] =
    undefined as $$Props['restitutionCombineRule']
  export let friction: $$Props['friction'] = undefined as $$Props['friction']
  export let frictionCombineRule: $$Props['frictionCombineRule'] =
    undefined as $$Props['frictionCombineRule']
  export let sensor: $$Props['sensor'] = undefined as $$Props['sensor']
  export let contactForceEventThreshold: $$Props['contactForceEventThreshold'] =
    undefined as $$Props['contactForceEventThreshold']

  export let density: $$Props['density'] = undefined
  export let mass: $$Props['mass'] = undefined
  export let centerOfMass: $$Props['centerOfMass'] = undefined
  export let principalAngularInertia: $$Props['principalAngularInertia'] = undefined
  export let angularInertiaLocalFrame: $$Props['angularInertiaLocalFrame'] = undefined

  const object = new Object3D()

  const rigidBody = useRigidBody()
  const hasRigidBodyParent = !!rigidBody

  const rapierContext = useRapier()
  const { world } = rapierContext

  export let collider: Collider | undefined = undefined

  const collisionGroups = useCollisionGroups()

  /**
   * Events setup
   */
  type $$Events = {
    [key in keyof ColliderEventMap]: CustomEvent<ColliderEventMap[key]>
  }
  const dispatcher = createEventDispatcher<ColliderEventMap>()

  /**
   * Actual collider setup happens onMount as only then
   * the transforms are finished.
   */
  onMount(async () => {
    await tick()
    const scale = object.getWorldScale(new Vector3())

    const scaledArgs = scaleColliderArgs(shape, args, scale)

    // @ts-ignore
    const colliderDesc = ColliderDesc[shape](...scaledArgs) as ColliderDesc

    collider = world.createCollider(colliderDesc, rigidBody)

    /**
     * Add collider to context
     */
    rapierContext.addColliderToContext(collider, object, dispatcher)

    /**
     * For use in conjunction with component <CollisionGroups>
     */
    collisionGroups.registerColliders([collider])

    if (hasRigidBodyParent) {
      const rigidBodyWorldPos = new Vector3()
      const rigidBodyWorldQuatInversed = new Quaternion()
      object.traverseAncestors((child: Object3D) => {
        if (child.userData.isRigidBody) {
          child.getWorldPosition(rigidBodyWorldPos)
          child.getWorldQuaternion(rigidBodyWorldQuatInversed)
          rigidBodyWorldQuatInversed.invert()
        }
      })
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

  const { hasEventListeners: colliderHasEventListeners } = useHasEventListeners<typeof dispatcher>()

  $: {
    if (collider) {
      applyColliderActiveEvents(
        collider,
        colliderHasEventListeners,
        rigidBody?.userData?.hasEventListeners
      )
      collider.setActiveCollisionTypes(ActiveCollisionTypes.ALL)
      collider.setRestitution(restitution ?? 0)
      collider.setContactForceEventThreshold(1)
      collider.setRestitutionCombineRule(restitutionCombineRule ?? CoefficientCombineRule.Average)
      collider.setFriction(friction ?? 0.7)
      collider.setFrictionCombineRule(frictionCombineRule ?? CoefficientCombineRule.Average)
      collider.setSensor(sensor ?? false)
      collider.setContactForceEventThreshold(contactForceEventThreshold ?? 0)
      if (density) collider.setDensity(density)
      if (mass) {
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
    }
  }

  /**
   * If the Collider isAttached (i.e. NOT child of a RigidBody), update the
   * transforms on every frame.
   */
  useFrame(
    () => {
      if (!collider) return
      collider.setTranslation(getWorldPosition(object))
      collider.setRotation(getWorldQuaternion(object))
    },
    {
      autostart: !hasRigidBodyParent
    }
  )

  /**
   * Cleanup
   */
  onDestroy(() => {
    if (!collider) return
    rapierContext.removeColliderFromContext(collider)
    collisionGroups.removeColliders([collider])
    world.removeCollider(collider, true)
  })
</script>

<SceneGraphObject {object}>
  <slot />
</SceneGraphObject>
