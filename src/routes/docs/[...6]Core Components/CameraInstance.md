---
title: <CameraInstance>
---

# \<CameraInstance>

### Example <!-- omit in toc -->

```svelte
<script>
  import { PerspectiveCamera } from 'three'
  import { CameraInstance } from 'threlte'

  const camera = new PerspectiveCamera(45, 1, 1, 1000)
</script>

<CameraInstance useCamera={false} {camera} />
```

### Properties <!-- omit in toc -->

```ts
// required
camera: THREE.Camera

// optional
viewportAware: boolean = false
useCamera: boolean = false
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
```

### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
```

### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```
