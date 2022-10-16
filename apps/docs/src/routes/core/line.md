---
title: Line
---

<script lang="ts">
import Wrapper from '$examples/line/Wrapper.svelte'
</script>

!!!module_summary title=Line|sourcePath=objects/Line.svelte|name=Line|from=core|type=component|relatedDocs={[{name:"three.js Line reference",url:"https://threejs.org/docs/#api/en/objects/Line"}]}

Draw Lines using `THREE.Line`. Due to limitations of the OpenGL Core Profile with the `THREE.WebGLRenderer` on most platforms the line width will always be `1` regardless of the value `lineWidth` of the used Material.

Provide either `points` or a `geometry` to draw lines.

<ExampleWrapper playgroundHref="/line">
  <Wrapper />
</ExampleWrapper>

!!!

### Example

```svelte
<script>
  import { Line } from '@threlte/core'
  import { LineBasicMaterial } from 'three'
</script>

<Line
  points={[
    [0, 1, 0],
    [0, 2, 1],
    [-1, 1, 4]
  ]}
  material={new LineBasicMaterial()}
/>
```

### Properties

```ts
// required
material: THREE.Material | THREE.Material[]

// optional
geometry: THREE.BufferGeometry | undefined = undefined
points: (THREE.Vector3 | THREE.Vector3Tuple)[] = []

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
line: THREE.Line
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
