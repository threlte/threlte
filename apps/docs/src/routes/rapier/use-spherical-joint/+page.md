---
title: useSphericalJoint
---

!!!module_summary title=useSphericalJoint|sourcePath=hooks/useSphericalJoint.svelte|name=useSphericalJoint|from=rapier|type=component

Use this hook to initialize a [`SphericalImpulseJoint`](https://rapier.rs/docs/user_guides/javascript/joints#spherical-joint).

```svelte
<script>
	import { useSphericalJoint, RigidBody, Collider } from '@threlte/rapier'

	const { joint, rigidBodyA, rigidBodyB } = useSphericalJoint({ x: 1 }, { x: -1 })
</script>

<RigidBody bind:rigidBody={$rigidBodyA}>
	<Collider shape="cuboid" args={[1, 1, 1]} />
</RigidBody>

<RigidBody bind:rigidBody={$rigidBodyB}>
	<Collider shape="cuboid" args={[1, 1, 1]} />
</RigidBody>
```

!!!

### Signature

```ts
const {
	joint: Writable<SphericalImpulseJoint>
	rigidBodyA: Writable<RAPIER.RigidBody>
	rigidBodyB: Writable<RAPIER.RigidBody>
} = useSphericalJoint(
	anchorA,  // Position
  anchorB,  // Position
)
```
