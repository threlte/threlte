---
title: Line2
---

<script lang="ts">
import Example from '$examples/core/line-2/App.svelte'
</script>

!!!module_summary title=Line2|sourcePath=objects/Line2.svelte|name=Line2|from=core|type=component

Draw Lines using `THREE.Line2`.

<ExampleWrapper playgroundHref="/core/line-2">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/line-2/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/line-2/Scene.svelte)

</div>
</ExampleWrapper>

!!!

### Example

```svelte
<script>
  import { Line2 } from '@threlte/core'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
</script>

<Line2
  points={[
    [0, 1, 0],
    [0, 2, 1],
    [-1, 1, 4]
  ]}
  material={new LineMaterial({
    worldUnits: true,
    lineWidth: 0.2
  })}
/>
```

### Properties

```ts
// required
material: THREE.LineMaterial
points: (THREE.Vector3 | THREE.Vector3Tuple)[] = []

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
line2: THREE.Line2
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
