---
title: <PointLight>
---

# \<PointLight>

### Example

```svelte
<script>
  import { PointLight } from 'threlte'
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
