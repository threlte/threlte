---
title: MeshInstance
---

!!!module_summary title=MeshInstance|sourcePath=instances/MeshInstance.svelte|name=MeshInstance|from=core|type=component
This component lets you use any manually instantiated object that extends `THREE.Mesh` in threlte.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { Mesh, MeshStandardMaterial, BoxBufferGeometry } from 'three'
  import { MeshInstance } from '@threlte/core'

  const material = new MeshStandardMaterial({
    wireframe: true,
    color: 'black'
  })
  const geometry = new BoxBufferGeometry(1, 1, 1)
  const mesh = new Mesh(geometry, material)
</script>

<MeshInstance {mesh} rotation={{ x: 90 * (Math.PI / 180) }} />
```

### Properties <!-- omit in toc -->

```ts
// required
mesh: THREE.Mesh

// optional
interactive: boolean = false
ignorePointer: boolean = false
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
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```
