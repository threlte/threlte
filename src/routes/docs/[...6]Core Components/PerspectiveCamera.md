---
title: <PerspectiveCamera>
---

# \<PerspectiveCamera>

### Example

```svelte
<script>
  import { PerspectiveCamera } from 'threlte'
</script>

<PerspectiveCamera fov={60} position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }} />
```

### Properties

```ts
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
useCamera: boolean = true
near: number = undefined
far: number = undefined
fov: number = undefined
```

### Bindings

```ts
inViewport: boolean
camera: THREE.PerspectiveCamera
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
