---
title: PointLight
---

!!!module_summary title=PointLight|sourcePath=lights/PointLight.svelte|name=PointLight|from=core|type=component
A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

This light can cast shadows.
!!!

### Example

```svelte
<script>
  import { PointLight } from '@threlte/core'
</script>

<PointLight position={{ x: 3, y: 3 }} />
```

### Properties

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
distance: number | undefined = undefined
decay: number | undefined = undefined
power: number | undefined = undefined
shadow:
  | boolean
  | {
      mapSize?: [number, number]
      camera?: { near?: number; far?: number }
      bias?: number
      radius?: number
    }
  | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
light: THREE.PointLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
