---
title: World
---

<script lang="ts">
import Wrapper from '$examples/rapier/world/Wrapper.svelte'
</script>

!!!module_summary title=World|sourcePath=/components/World/World.svelte|name=World|from=extras|type=component

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/World/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/World/Scene.svelte)
&&&

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

### Example

```svelte
<script lang="ts">
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
  import { Mesh } from '@threlte/core'
  import { World } from '@threlte/extras'
</script>

<Mesh geometry={new BoxBufferGeometry(1, 1, 1)} material={new MeshBasicMaterial()}>
  <World color="black" />
</Mesh>
```

### Properties

```ts
// optional
color: THREE.ColorRepresentation | undefined = undefined
material: THREE.Material | THREE.Material[] | undefined = undefined
threshold: number | undefined = undefined
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
interactive: boolean = false
ignorePointer: boolean = false
```

### Bindings

```ts
inViewport: boolean
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```
