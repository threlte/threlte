---
title: Attractor
---

<script lang="ts">
import Wrapper from '$examples/rapier/attractor/Wrapper.svelte'
</script>

!!!module_summary title=Attractor|sourcePath=components/Attractor/Attractor.svelte|name=Attractor|from=rapier|type=component

An Attractor simulates a source of gravity. Any RigidBody within range will be "pulled" toward the Attractor at the specified strength.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/rapier/attractor/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/rapier/attractor/Scene.svelte)
@[code svelte|title=RandomMeshes.svelte](../../examples/rapier/attractor/RandomMeshes.svelte)
&&&

!!!

### Properties

```ts
// optional
position: Position | undefined = undefined
strength: number | = 1
range: number = 10
```
