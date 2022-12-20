---
title: useRapier
---

!!!module_summary title=useRapier|sourcePath=hooks/useRapier.svelte|name=useRapier|from=rapier|type=component

This hook provides access to the underlying `RAPIER.World` as well as the means to add and remove colliders and rigid bodies from the events system.

```svelte
<script>
	import { useRapier } from '@threlte/rapier'

	const { world } = useRapier()

	const noGravity = () => world.gravity = { x: 0, y: 0, z: 0 }
	const normalGravity = () => world.gravity = { x: 0, y: 9.81, z: 0 }
</script>
```

!!!

### Types

```ts
// type RapierContext
const {
    rapier, // RAPIER
    world, // RAPIER.World
    colliderObjects, // Map<number, Object3D<Event>>
    rigidBodyObjects, //Map<number, Object3D<Event>>
    rigidBodyEventDispatchers, //RigidBodyEventDispatchers
    colliderEventDispatchers, //ColliderEventDispatchers
    addColliderToContext, // (collider: Collider, object: Object3D<Event>, eventDispatcher: ColliderEventDispatcher) => void
    removeColliderFromContext, // (collider: Collider) => void
    addRigidBodyToContext, // (rigidBody: RigidBody, object: Object3D<Event>, eventDispatcher: RigidBodyEventDispatcher) => void
    removeRigidBodyFromContext, // (rigidBody: RigidBody) => void
} = useRapier()
```
