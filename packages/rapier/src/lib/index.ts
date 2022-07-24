// hooks
export { useRapier } from './hooks/useRapier'
export { useCollisionGroups } from './hooks/useCollisionGroups'
export { useRigidBody } from './hooks/useRigidBody'

// components
export { default as World } from './components/World/World.svelte'
export { default as RigidBody } from './components/RigidBody/RigidBody.svelte'
export { default as Debug } from './components/Debug/Debug.svelte'
export { default as Collider } from './components/Colliders/Collider.svelte'
export { default as AutoColliders } from './components/Colliders/AutoColliders.svelte'
export { default as CollisionGroups } from './components/CollisionGroups/CollisionGroups.svelte'

// recipes
// recipes -> controllers
export { default as BasicPlayerController } from './recipes/BasicPlayerController.svelte'

export type {
  AutoCollidersProperties,
  ColliderProperties,
  Boolean3Array,
  RigidBodyProperties,
  WorldProperties
} from './types/components'

export type {
  CollisionGroupsBitMask,
  AutoCollidersShapes,
  ColliderEventDispatcher,
  ColliderShapes,
  RapierContext,
  RigidBodyEventDispatcher
} from './types/types'
