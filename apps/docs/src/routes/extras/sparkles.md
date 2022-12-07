---
title: Sparkles
---

<script lang="ts">
import Example from '$examples/extras/sparkles/App.svelte'
</script>

!!!module_summary title=Sparkles|sourcePath=components/Sparkles/Sparkles.svelte|name=Sparkles|from=extras|type=component

This component is a port of [drei's `<Sparkles>` component](https://github.com/pmndrs/drei#sparkles) and adds sparkles / particles.

<ExampleWrapper playgroundHref="/extras/sparkles">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/sparkles/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/sparkles/Scene.svelte)
@[code svelte|title=Sphere.svelte](../../examples/extras/sparkles/Sphere.svelte)

</div>

</ExampleWrapper>

!!!

## Examples

### Basic Example

```svelte
<script lang="ts">
  import { T } from '@threlte/core'
  import { SphereGeometry, MeshBasicMaterial } from 'three'
  import { Sparkles } from '@threlte/extras'
</script>

<T.Mesh>
	<T.MeshBasicMaterial />
	<T.MeshBufferGeometry args={[1,1,1]} />
	<Sparkles count={amount} scale={size * 2} size={6} speed={0.4} color="pink" /> />
</T.Mesh>
```

### Properties

```ts
// optional
count: number = 100;
speed: number | Float32Array = 1;
opacity: number | Float32Array = 1;
color: ColorRepresentation | Float32Array = 100;
size: number | Float32Array = Math.random();
scale: number | [number, number, number] | Vector3 = 1;
noise: number | [number, number, number] | Vector3 | Float32Array = 1;
```
