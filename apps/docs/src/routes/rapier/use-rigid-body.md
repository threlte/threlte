---
title: useRigidBody
---

!!!module_summary title=useRigidBody|sourcePath=hooks/useRigidBody.svelte|name=useRigidBody|from=rapier|type=component

This hook provides access to the `RAPIER.RigidBody` from a parent [`<RigidBody>`](/rapier/rigid-body) component.

Use this hook to e.g. add custom colliders to a `RAPIER.RigidBody` defined by a parent `<RigidBody>` component.

```svelte
<script>
	import { useRapier, useRigidBody } from '@threlte/rapier'

	const { world } = useRapier()

	// rigidBody is undefined if there's
	// no parent `<RigidBody>` component
	const rigidBody = useRigidBody()

	const collider = world.createCollider(colliderDesc, rigidBody)

	onDestroy(() => {
		world.removeCollider(collider, true)
	})
</script>
```

!!!

### Types

```ts
const rigidBody = useRigidBody() // RAPIER.RigidBody | undefined
```
