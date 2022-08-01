---
title: Collider
---

<script lang="ts">
import Wrapper from '$examples/rapier/collider/Wrapper.svelte'
</script>

!!!module_summary title=Collider|sourcePath=/components/Collider/Collider.svelte|name=Collider|from=rapier|type=component|relatedDocs={[{name:"Rapier Collider reference",url:"https://rapier.rs/javascript3d/classes/Collider.html"}, {name:"Rapier Collider Guide",url:"https://rapier.rs/docs/user_guides/javascript/colliders"}]}

Colliders represent the geometric shapes that generate contacts and collision events when they touch. Attaching one or multiple colliders to a rigid body allow the rigid-body to be affected by contact forces.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/collider/Wrapper.svelte)
@[code svelte|title=Button.svelte](../../examples/rapier/collider/Button.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/collider/Scene.svelte)
@[code svelte|title=TestBed.svelte](../../examples/rapier/collider/TestBed.svelte)
@[code svelte|title=Emitter.svelte](../../examples/rapier/collider/Emitter.svelte)
@[code svelte|title=Particle.svelte](../../examples/rapier/collider/Particle.svelte)
@[code svelte|title=AttachedCollider.svelte](../../examples/rapier/collider/AttachedCollider.svelte)
@[code svelte|title=StandaloneCollider.svelte](../../examples/rapier/collider/StandaloneCollider.svelte)
@[code svelte|title=Sensor.svelte](../../examples/rapier/collider/Sensor.svelte)
&&&

!!!

### Transform Properties

If a `<Collider>` component is not a child of a `<RigidBody>` component, the transform properties are reactive.

### Properties

`ColliderDesc`, `CoefficientCombineRule` are types imported from `'@dimforge/rapier3d-compat'`.

If you don't provide any of the properties `density`, `mass` or `massProperties`, Rapier will figure that out for you.

You can provide either a property `density`, `mass` **or** `massProperties`.

```ts
// required
shape:
    | 'ball'
    | 'capsule'
    | 'segment'
    | 'triangle'
    | 'roundTriangle'
    | 'polyline'
    | 'trimesh'
    | 'cuboid'
    | 'roundCuboid'
    | 'heightfield'
    | 'cylinder'
    | 'roundCylinder'
    | 'cone'
    | 'roundCone'
    | 'convexHull'
    | 'convexMesh'
    | 'roundConvexHull'
    | 'roundConvexMesh'
args: Parameters<typeof ColliderDesc[Shape]>

// optional
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

`Collider` is a type imported from `'@dimforge/rapier3d-compat'`.

```ts
collider: Collider | undefined
```

### Events

`RigidBody`, `Collider` and `TempContactManifold` are types imported from `'@dimforge/rapier3d-compat'`

```ts
collisionenter: CustomEvent<{
  targetCollider: Collider
  targetRigidBody: RigidBody | null
  manifold: TempContactManifold
  flipped: boolean
}>
collisionexit: CustomEvent<{
  targetCollider: Collider
  targetRigidBody: RigidBody | null
}>
sensorenter: CustomEvent<{
  targetCollider: Collider
  targetRigidBody: RigidBody | null
}>
sensorexit: CustomEvent<{
  targetCollider: Collider
  targetRigidBody: RigidBody | null
}>
```
