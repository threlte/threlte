---
title: Float
---

<script lang="ts">
import Wrapper from '$examples/extras/float/Wrapper.svelte'
</script>

!!!module_summary title=Float|sourcePath=extras/components/abstractions/Float.svelte|name=Float|from=threlte/extras|type=component

This component is a port of [drei's `<Float>` component](https://github.com/pmndrs/drei#float) and makes its contents float or hover.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../../../examples/extras/float/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../../examples/extras/float/Scene.svelte)
@[code svelte|title=Blob.svelte](../../../../examples/extras/float/Blob.svelte)
&&&

!!!

### Examples

#### Basic Example

```svelte
<script lang="ts">
  import { Mesh } from 'threlte'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
  import { Float } from 'threlte/extras'
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
