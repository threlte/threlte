---
title: <HemisphereLight>
---

# \<HemisphereLight>

### Example

```svelte
<script>
  import { HemisphereLight } from 'threlte'
</script>

<HemisphereLight skyColor={0xfb9796} groundColor={0xc1b8a5} />
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
castShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
intensity: number | undefined = undefined
skyColor: THREE.ColorRepresentation | undefined = undefined
groundColor: THREE.ColorRepresentation | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
light: THREE.HemisphereLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
