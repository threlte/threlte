---
title: Edges
---

<script lang="ts">
import Wrapper from '$examples/edges/Wrapper.svelte'
</script>

!!!module_summary title=Edges|sourcePath=extras/components/abstractions/Edges.svelte|name=Edges|from=threlte/extras|type=component|divider=false

Abstracts `THREE.EdgesGeometry`. This component automatically pulls the geometry from its parent.

Edges are displayed when the angle between two faces exceeds the angle defined by the property `threshold`.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)

<details>
  <summary>Show code</summary>

@[code svelte|title=Wrapper.svelte](../../../../examples/edges/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../../examples/edges/Scene.svelte)

</details>

!!!

---

### Example

```svelte
<script lang="ts">
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
  import { Mesh } from 'threlte'
  import { Edges } from 'threlte/extras'
</script>

<Mesh geometry={new BoxBufferGeometry(1, 1, 1)} material={new MeshBasicMaterial()}>
  <Edges color: black />
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
