---
title: Attractor
---

<script lang="ts">
import Wrapper1 from '$examples/rapier/attractor/Wrapper1.svelte'
</script>

!!!module_summary title=Attractor|sourcePath=components/Attractor/Attractor.svelte|name=Attractor|from=rapier|type=component

An attractor simulates a source of gravity. Any rigid-body within range will be "pulled" toward the attractor.

The force applied to rigid-bodies within range is calculated differently, depending on the `gravityType`.

## Basic Example

<ExampleWrapper>
  <Wrapper1 />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper1.svelte](../../examples/rapier/attractor/Wrapper1.svelte)
@[code svelte|title=BasicScene.svelte](../../examples/rapier/attractor/BasicScene.svelte)
@[code svelte|title=AdvancedScene.svelte](../../examples/rapier/attractor/AdvancedScene.svelte)
@[code svelte|title=RandomMeshes.svelte](../../examples/rapier/attractor/RandomMeshes.svelte)
&&&

!!!

## Gravity Types

### Static (Default)

Static gravity means that the same force (`strength`) is applied on all rigid-bodies within range, regardless of distance.

### Linear

Linear gravity means that force is calculated as `strength * distance / range`. That means the force applied decreases the farther a rigid-body is from the attractor position.

### Newtonian

Newtonian gravity uses the traditional method of calculating gravitational force (`F = GMm/r^2`) and as such force is calculated as `gravitationalConstant * mass1 * mass2 / Math.pow(distance, 2)`.

- `gravitationalConstant` defaults to 6.673e-11 but you can provide your own
- `mass1` here is the "mass" of the Attractor, which is just the `strength` property
- `mass2` is the mass of the rigid-body at the time of calculation. Note that rigid-bodies with colliders will use the mass provided to the collider. This is not a value you can control from the attractor, only from wherever you're creating rigid-body components in the scene.
- `distance` is the distance between the attractor and rigid-body at the time of calculation


### Properties

```ts
// optional
position: Position | undefined = undefined
strength: number = 1
range: number = 10
gravityType: "static" | "linear" | "newtonian"
gravitationalConstant: number = 6.673e-11
```
