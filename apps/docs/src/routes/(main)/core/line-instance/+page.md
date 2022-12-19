---
title: LineInstance
---

!!!module_summary title=LineInstance|sourcePath=instances/LineInstance.svelte|name=LineInstance|from=core|type=component|relatedDocs={[{name:"three.js Line reference",url:"https://threejs.org/docs/#api/en/objects/Line"}]}

:::deprecated
:::

This component lets you use any manually instantiated object that extends `THREE.Line` in threlte.
!!!

### Example <!-- omit in toc -->

```svelte
<script lang="ts">
  import { LineInstance } from '@threlte/core'
  import { LineBasicMaterial, Line, Vector3, BufferGeometry } from 'three'

  const points: Vector3[] = [
    new Vector3(-10, 0, 0),
    new Vector3(0, 10, 0),
    new Vector3(10, 0, 0),
    new Vector3(0, 20, 0)
  ]

  const geometry = new BufferGeometry().setFromPoints(points)
  const material = new LineBasicMaterial()
  const line = new Line(geometry, material)
</script>

<LineInstance {line} />
```

### Properties

```ts
// required
line: THREE.Line

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
