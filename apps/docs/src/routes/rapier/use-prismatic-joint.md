---
title: usePrismaticJoint
---

!!!module_summary title=usePrismaticJoint|sourcePath=/hooks/usePrismaticJoint.svelte|name=usePrismaticJoint|from=rapier|type=component

Use this hook to initialize a [`PrismaticImpulseJoint`](https://rapier.rs/docs/user_guides/javascript/joints#prismatic-joint).

```svelte
<script>
	import { usePrismaticJoint, RigidBody, Collider } from '@threlte/rapier'

	const { joint, rigidBodyA, rigidBodyB } = usePrismaticJoint({ x: 1 }, {}, { y: 1 }, [0, 1])
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
	joint: Writable<PrismaticImpulseJoint>
	rigidBodyA: Writable<RAPIER.RigidBody>
	rigidBodyB: Writable<RAPIER.RigidBody>
} = usePrismaticJoint(
	anchorA,  // Position
  anchorB,  // Position
  axis,     // Rotation
  limits    // [min, max] | undefined
)
```
