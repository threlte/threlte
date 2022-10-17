---
title: CollisionGroups
---

<script lang="ts">
import Wrapper from '$examples/rapier/collision-groups/Wrapper.svelte'
</script>

!!!module_summary title=CollisionGroups|sourcePath=components/CollisionGroups/CollisionGroups.svelte|name=CollisionGroups|from=rapier|type=component|relatedDocs={[{name:"Rapier Collider Guide – Collision Groups",url:"https://rapier.rs/docs/user_guides/javascript/colliders#collision-groups-and-solver-groups"}]}

The most efficient way of preventing some pairs of colliders from interacting with each other is to use a `<CollisionGroups>` component.

Each collider that is a child (direct or indirect) of the component `<CollisionGroups>` is applied a `memberships` and `filters` attribute. The shorthand `groups` sets both properties at once.

For general usage instructions, see the relevant documentation [here](https://rapier.rs/docs/user_guides/javascript/colliders#collision-groups-and-solver-groups).

!!!

### Example

- <span style="color: red">Collider A</span> is affected by <span style="color: limegreen">Collider B</span> and not by <span style="color: blue">Collider C</span>
- <span style="color: limegreen">Collider B</span> is affected by <span style="color: red">Collider A</span> and <span style="color: blue">Collider C</span>
- <span style="color: blue">Collider C</span> is affected by <span style="color: limegreen">Collider B</span> and not by <span style="color: red">Collider A</span>

<ExampleWrapper playgroundHref="/rapier/collision-groups">
<Wrapper />

<div slot="code">

@[code svelte|title=Wrapper.svelte](../../examples/rapier/collision-groups/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/collision-groups/Scene.svelte)
@[code svelte|title=Button.svelte](../../examples/rapier/collision-groups/Button.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/collision-groups/Ground.svelte)

</div>
</ExampleWrapper>

```svelte
<!-- Collider A -->
	<CollisionGroups memberships={[1]} filter={[2]}>
		<RigidBody>
			<AutoColliders shape={'cuboid'}>
				<Mesh	castShadow {geometry} {material} />
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>

	<!-- Collider B -->
	<CollisionGroups memberships={[2]} filter={[1, 3]}>
		<RigidBody>
			<AutoColliders shape={'cuboid'}>
				<Mesh	castShadow {geometry} {material} />
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>

	<!-- Collider C -->
	<CollisionGroups memberships={[3]} filter={[2]}>
		<RigidBody>
			<AutoColliders shape={'cuboid'}>
				<Mesh	castShadow {geometry} {material} />
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>
```

### Properties

Provide either the shorthand property `groups` to set both `memberships` and `filter` to the same value or set them up individually.

```ts
// required

// Provide either …
groups: CollisionGroupsBitMask

// … or …
filter: CollisionGroupsBitMask
memberships: CollisionGroupsBitMask
```
