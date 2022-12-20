---
title: LineSegments
---

<script lang="ts">
import Example from '$examples/core/line-segments/App.svelte'
</script>

!!!module_summary title=LineSegments|sourcePath=objects/LineSegments.svelte|name=LineSegments|from=core|type=component|relatedDocs={[{name:"three.js LineSegments reference",url:"https://threejs.org/docs/#api/en/objects/LineSegments"}]}

:::deprecated
:::

Draw lines using `THREE.LineSegments`.

<ExampleWrapper playgroundHref="/core/line-segments">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/line-segments/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/line-segments/Scene.svelte)

</div>
</ExampleWrapper>

!!!

### Example

```svelte
<script lang="ts">
  import { EdgesGeometry, LineBasicMaterial, OctahedronBufferGeometry } from 'three'
  import { LineSegments } from '@threlte/core'

  const geometry = new EdgesGeometry(new OctahedronBufferGeometry(1, 1), 30)
</script>

<LineSegments {geometry} material={new LineBasicMaterial()} />
```

### Properties

```ts
// required
material: THREE.Material | THREE.Material[]
geometry: THREE.BufferGeometry

// optional
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
lineSegments: THREE.LineSegments
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
