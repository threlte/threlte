---
title: BasicCarController
---

<script lang="ts">
import Wrapper from '$examples/rapier/basic-car-controller/Wrapper.svelte'
</script>

!!!module_summary title=BasicCarController|sourcePath=/components/BasicCarController/BasicCarController.svelte|name=BasicCarController|from=rapier|type=component|relatedDocs={[{name:"Rapier Collider reference",url:"https://rapier.rs/javascript3d/classes/Collider.html"}, {name:"Rapier Collider Guide",url:"https://rapier.rs/docs/user_guides/javascript/colliders"}]}

The `<BasicCarController>` component generates colliders based on its children. Currently these shapes are available:

1. `cuboid` – uses each child mesh bounding box and generates a cuboid collider
2. `ball` – uses each child mesh bounding box and generates a ball collider
3. `capsule` – uses each child mesh bounding box and generates a capsule collider
4. `trimesh` – uses each child mesh geometry and generates a polygonal collider which resembles the geometry
5. `convexHull` – uses each child mesh geometry and generates a collider which resembles a convex hull around the geometry

The resulting colliders can be transformed (i.e. positioned, rotated and scaled) as well as given regular collider properties such as `mass` or `centerOfMass`.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/basic-car-controller/Wrapper.svelte)
@[code svelte|title=Button.svelte](../../examples/rapier/basic-car-controller/Button.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/basic-car-controller/Scene.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/basic-car-controller/Ground.svelte)
&&&

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

### Transform Properties

If a `<BasicCarController>` component is not a child of a `<RigidBody>` component, the transform properties are reactive.

### Properties


`BasicCarControllerDesc`, `CoefficientCombineRule` are types imported from `'@dimforge/rapier3d-compat'`.

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

`BasicCarController` is a type imported from `'@dimforge/rapier3d-compat'`.

```ts
colliders: Colliders[]
```

### Events

`RigidBody`, `BasicCarController` and `TempContactManifold` are types imported from `'@dimforge/rapier3d-compat'`

```ts
collisionenter: CustomEvent<{
	targetBasicCarController: BasicCarController
	targetRigidBody: RigidBody | null
	manifold: TempContactManifold
	flipped: boolean
}>
collisionexit: CustomEvent<{
	targetBasicCarController: BasicCarController
	targetRigidBody: RigidBody | null
}>
sensorenter: CustomEvent<{
	targetBasicCarController: BasicCarController
	targetRigidBody: RigidBody | null
}>
sensorexit: CustomEvent<{
	targetBasicCarController: BasicCarController
	targetRigidBody: RigidBody | null
}>
```
