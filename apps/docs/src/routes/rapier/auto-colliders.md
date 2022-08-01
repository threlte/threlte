---
title: AutoColliders
---

<script lang="ts">
import Wrapper from '$examples/rapier/auto-colliders/Wrapper.svelte'
</script>

!!!module_summary title=AutoColliders|sourcePath=/components/AutoColliders/AutoColliders.svelte|name=AutoColliders|from=rapier|type=component|relatedDocs={[{name:"Rapier Collider reference",url:"https://rapier.rs/javascript3d/classes/Collider.html"}, {name:"Rapier Collider Guide",url:"https://rapier.rs/docs/user_guides/javascript/colliders"}]}

The `<AutoColliders>` component generates colliders based on its children. Currently these shapes are available:

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
@[code svelte|title=Wrapper.svelte](../../examples/rapier/auto-colliders/Wrapper.svelte)
@[code svelte|title=Button.svelte](../../examples/rapier/auto-colliders/Button.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/auto-colliders/Scene.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/auto-colliders/Ground.svelte)
&&&

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

### Transform Properties

If a `<AutoColliders>` component is not a child of a `<RigidBody>` component, the transform properties are reactive.

### Properties


`AutoCollidersDesc`, `CoefficientCombineRule` are types imported from `'@dimforge/rapier3d-compat'`.

If you don't provide any of the properties `density`, `mass` or `massProperties`, Rapier will figure that out for you.

You can provide either a property `density`, `mass` **or** `massProperties`.

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
density: number | undefined = undefined
mass: number | undefined = undefined
massProperties:
  | {
    mass: number
    centerOfMass: Position
    principalAngularInertia: Position
    angularInertiaLocalFrame: Rotation
  } | undefined = undefined
restitution: number | undefined = undefined
restitutionCombineRule: CoefficientCombineRule | undefined = undefined
friction: number | undefined = undefined
frictionCombineRule: CoefficientCombineRule | undefined = undefined
sensor: boolean | undefined = undefined
```

### Bindings

`AutoColliders` is a type imported from `'@dimforge/rapier3d-compat'`.

```ts
colliders: Colliders[]
```

### Events

`RigidBody`, `AutoColliders` and `TempContactManifold` are types imported from `'@dimforge/rapier3d-compat'`

```ts
collisionenter: CustomEvent<{
	targetAutoColliders: AutoColliders
	targetRigidBody: RigidBody | null
	manifold: TempContactManifold
	flipped: boolean
}>
collisionexit: CustomEvent<{
	targetAutoColliders: AutoColliders
	targetRigidBody: RigidBody | null
}>
sensorenter: CustomEvent<{
	targetAutoColliders: AutoColliders
	targetRigidBody: RigidBody | null
}>
sensorexit: CustomEvent<{
	targetAutoColliders: AutoColliders
	targetRigidBody: RigidBody | null
}>
```
