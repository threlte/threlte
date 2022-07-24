---
title: useCollisionGroups
---

!!!module_summary title=useCollisionGroups|sourcePath=/hooks/useCollisionGroups.svelte|name=useCollisionGroups|from=rapier|type=component

This hook can be used in conjunction with the component [`<CollisionGroups>`](/rapier/collision-groups). It uses the collision groups provided by a parent `<CollisionGroups>` component and lets you easily apply them to colliders.

```svelte
<script>
	import { useRapier, useCollisionGroups } from '@threlte/rapier'

	const { world } = useRapier()
	const { registerColliders, removeColliders } = useCollisionGroups()

	const collider = world.createCollider(…)

	// collider will be assigned the collision groups
	// provided by a parent `<CollisionGroups>` component.
	registerColliders([collider])

	onDestroy(() => {
		removeColliders([collider])
	})
</script>
```

!!!

### Types

```ts
const {
	registerColliders, // (colliders: RAPIER.Collider[]) => void
	removeColliders // (colliders: RAPIER.Collider[]) => void
} = useCollisionGroups()
```
