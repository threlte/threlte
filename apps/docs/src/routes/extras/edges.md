---
title: Edges
---

<script lang="ts">
	import Example from '$examples/extras/edges/App.svelte'
</script>

!!!module_summary title=Edges|sourcePath=components/Edges/Edges.svelte|name=Edges|from=extras|type=component|relatedDocs={[{name:"three.js EdgesGeometry reference",url:"https://threejs.org/docs/api/en/geometries/EdgesGeometry.html"}]}

Abstracts `THREE.EdgesGeometry`. This component automatically pulls the geometry from its parent.

Edges are displayed when the angle between two faces exceeds the angle defined by the property `threshold`.

<ExampleWrapper playgroundHref="/extras/edges">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/edges/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/edges/Scene.svelte)

</div>
</ExampleWrapper>

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

### Example

```svelte
<script lang="ts">
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
  import { Mesh } from '@threlte/core'
  import { Edges } from '@threlte/extras'
</script>

<Mesh geometry={new BoxBufferGeometry(1, 1, 1)} material={new MeshBasicMaterial()}>
  <Edges color="black" />
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
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
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
