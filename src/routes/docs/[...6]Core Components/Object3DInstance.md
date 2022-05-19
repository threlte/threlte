---
title: <Object3DInstance>
---

# \<Object3DInstance>

### Example <!-- omit in toc -->

```svelte
<script>
  import { Object3D } from 'three'
  import { Object3DInstance } from 'threlte'

  const object = new Object3D()
</script>

<Object3DInstance {object} position={{ y: 1 }} />
```

### Properties <!-- omit in toc -->

```ts
// required
object: THREE.Object3D

// optional
viewportAware: boolean = false
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
