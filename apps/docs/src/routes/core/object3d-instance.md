---
title: Object3DInstance
---

!!!module_summary title=Object3DInstance|sourcePath=instances/Object3DInstance.svelte|name=Object3DInstance|from=core|type=component|relatedDocs={[{name:"three.js Object3D reference",url:"https://threejs.org/docs/api/en/core/Object3D.html"}]}
This component lets you use any manually instantiated object that extends `THREE.Object3D` in threlte.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { Object3D } from 'three'
  import { Object3DInstance } from '@threlte/core'

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
dispose: boolean | undefined = undefined
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
