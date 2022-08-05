---
title: RigidBody
---

<script lang="ts">
import Wrapper from '$examples/rapier/rigid-body/Wrapper.svelte'
</script>

!!!module_summary title=RigidBody|sourcePath=/components/RigidBody/RigidBody.svelte|name=RigidBody|from=rapier|type=component|relatedDocs={[{name:"Rapier RigidBody reference",url:"https://rapier.rs/javascript3d/classes/RigidBody.html"}, {name:"Rapier Collider Guide",url:"https://rapier.rs/docs/user_guides/javascript/rigid_bodies"}]}

The real-time simulation of rigid bodies subjected to forces and contacts is the main feature of a physics engine for videogames, robotics, or animation. Rigid bodies are typically used to simulate the dynamics of non-deformable solids as well as to integrate the trajectory of solids which velocities are controlled by the user (e.g. moving platforms).

Note that rigid-bodies are only responsible for the dynamics and kinematics of the solid. Colliders can be attached to a rigid-body to specify its shape and enable collision-detection. A rigid-body without collider attached to it will not be affected by contacts (because there is no shape to compute contact against).

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/rigid-body/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/rigid-body/Scene.svelte)
@[code svelte|title=Ground.svelte](../../examples/rapier/rigid-body/Ground.svelte)
@[code svelte|title=Emitter.svelte](../../examples/rapier/rigid-body/Emitter.svelte)
@[code svelte|title=Particle.svelte](../../examples/rapier/rigid-body/Particle.svelte)
&&&

[Open In Playground](/playground/rapier/rigid-body)

!!!

### Properties

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
type: 'fixed' | 'dynamic' | 'kinematicPosition' | 'kinematicVelocity' = 'dynamic'
canSleep: boolean = true
linearVelocity: Position = {}
angularVelocity: Rotation = {}
gravityScale: number = 1
ccd: boolean = false
lockRotations: boolean = false
lockTranslations: boolean = false
enabledRotations: Boolean3Array = [true, true, true]
enabledTranslations: Boolean3Array = [true, true, true]
dominance: number = 0
```

### Bindings

`RigidBody` is a type imported from `'@dimforge/rapier3d-compat'`

```ts

rigidBody: RigidBody
```

### Events

`RigidBody`, `Collider` and `TempContactManifold` are types imported from `'@dimforge/rapier3d-compat'`

```ts
sleep: void
wake: void
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
contact: CustomEvent<{
  targetCollider: Collider
  targetRigidBody: RigidBody | null
  manifold: TempContactManifold
  flipped: boolean
  maxForceDirection: Vector
  maxForceMagnitude: number
  totalForce: Vector
  totalForceMagnitude: number
}>
```
