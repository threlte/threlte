---
title: CollisionGroups
---

<script lang="ts">
import Wrapper from '$examples/rapier/collision-groups/Wrapper.svelte'
</script>

!!!module_summary title=CollisionGroups|sourcePath=/components/CollisionGroups/CollisionGroups.svelte|name=CollisionGroups|from=rapier|type=component

The most efficient way of preventing some pairs of colliders from interacting with each other is to use a `<CollisionGroups>` component.

Each collider that is a child (direct or indirect) of the component `<CollisionGroups>` is applied a `memberships` and `filters` attribute. The shorthand `groups` sets both properties at once.

For general usage instructions, see the relevant documentation [here](https://rapier.rs/docs/user_guides/javascript/colliders#collision-groups-and-solver-groups).


!!!

### Example

- <span style="color: red">Collider A</span> is affected by <span style="color: limegreen">Collider B</span> and not by <span style="color: blue">Collider C</span>
- <span style="color: limegreen">Collider B</span> is affected by <span style="color: red">Collider A</span> and <span style="color: blue">Collider C</span>
- <span style="color: blue">Collider C</span> is affected by <span style="color: limegreen">Collider B</span> and not by <span style="color: red">Collider A</span>

<ExampleWrapper>
  <Wrapper />
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

`CollisionGroupsDesc`, `CoefficientCombineRule` are types imported from `'@dimforge/rapier3d-compat'`.

```ts
// optional
shape:
	| 'cuboid'
	| 'ball'
	| 'capsule'
	| 'trimesh'
	| 'convexHull' = 'convexHull'
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
mass: number | undefined = undefined
centerOfMass: Position | undefined = undefined
principalAngularInertia: Position | undefined = undefined
restitution: number | undefined = undefined
restitutionCombineRule: CoefficientCombineRule | undefined = undefined
friction: number | undefined = undefined
frictionCombineRule: CoefficientCombineRule | undefined = undefined
sensor: boolean | undefined = undefined
```

### Bindings

`CollisionGroups` is a type imported from `'@dimforge/rapier3d-compat'`.

```ts
colliders: Colliders[]
```

### Events

`RigidBody`, `CollisionGroups` and `TempContactManifold` are types imported from `'@dimforge/rapier3d-compat'`

```ts
collisionenter: CustomEvent<{
	targetCollisionGroups: CollisionGroups
	targetRigidBody: RigidBody | null
	manifold: TempContactManifold
	flipped: boolean
}>
collisionexit: CustomEvent<{
	targetCollisionGroups: CollisionGroups
	targetRigidBody: RigidBody | null
}>
sensorenter: CustomEvent<{
	targetCollisionGroups: CollisionGroups
	targetRigidBody: RigidBody | null
}>
sensorexit: CustomEvent<{
	targetCollisionGroups: CollisionGroups
	targetRigidBody: RigidBody | null
}>
```
