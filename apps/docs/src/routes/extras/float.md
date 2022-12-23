---
title: Float
---

<script lang="ts">
import Example from '$examples/extras/float/App.svelte'
</script>

!!!module_summary title=Float|sourcePath=components/Float/Float.svelte|name=Float|from=extras|type=component

This component is a port of [drei's `<Float>` component](https://github.com/pmndrs/drei#float) and makes its contents float or hover.

<ExampleWrapper playgroundHref="/extras/float">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/float/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/float/Scene.svelte)
@[code svelte|title=Blob.svelte](../../examples/extras/float/Blob.svelte)

</div>
</ExampleWrapper>

!!!

### Examples

#### Basic Example

```svelte
<script lang="ts">
  import { T } from '@threlte/core'
  import { Float } from '@threlte/extras'
</script>

<Float floatIntensity={5} scale={$scale} rotationIntensity={2} rotationSpeed={[1, 0.5, 0.2]}>
	<T.Mesh>
		<T.MeshStandardMaterial color={'orange'} />
		<T.BoxGeometry args={[5, 5, 5]} />		
	</T.Mesh>
</Float>
```

## Floating

`floatingRange` determines the allowed range of position trasformation, and by extension the **direction** in which the children will move. If you provide a single number tuple, like `[-0.1,0.1]` the movement will happen on y axis. Alternatively you can provide an array of three tuples to change the movement axes. For example `[[0,0],[0,0],[-0.5,0.5]]` will move children between -0.5 and 0.5 relative to the starting position on the Z axis.

## Rotation

Rotation is set by `rotationSpeed` and `rotationIntensity`. Both of them need to be different from 0 to enable rotation. Providing a `number` in either of them applies it to all three axes. You get more granual control by passing an array `[x: number, y: number, z: number]`. `rotationSpeed` is responsible for the speed of the animation and `rotationIntensity` for the angle.

`seed` is responsible for the starting state of the animations and is random by default. Setting to a fixed value to get a predictable starting result.

### Properties

```ts
// floating - y axis float by default
speed?: number | [x: number, y: number, z: number] = 1
floatIntensity?: number | [x: number, y: number, z: number] = 1
floatingRange?: [number, number] | [x: [number, number], y: [number, number], z: [number, number]] = [-0.1,0.1]

// rotation - disabled by default
rotationIntensity?: number | [x: number, y: number, z: number] = 0
rotationSpeed?: number | [x: number, y: number, z: number] = 0

// seed
seed?: number = Math.random() * 10000
```