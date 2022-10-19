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
  import { Mesh } from '@threlte/core'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
  import { Float } from '@threlte/extras'
</script>

<Float speed={2}>
  <Mesh geometry={new BoxBufferGeometry(1, 1, 1)} material={new MeshBasicMaterial()} />
</Float>
```

### Properties

```ts
// optional
speed: number = 1
rotationIntensity: number = 1
floatIntensity: number = 1
floatingRange: [number, number] = [-0.1, 0.1]
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
viewportAware: boolean = false
```

### Bindings <!-- omit in toc -->

```ts
group: THREE.Group
inViewport: boolean
```

### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```
