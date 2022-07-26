---
title: Mesh
---

!!!module_summary title=Mesh|sourcePath=objects/Mesh.svelte|name=Mesh|from=core|type=component|relatedDocs={[{name:"three.js Mesh reference",url:"https://threejs.org/docs/#api/en/objects/Mesh"}]}
This component represents triangular polygon mesh based objects.
!!!

### Example

```svelte
<script>
  import { Mesh } from '@threlte/core'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
</script>

<Mesh
  position={{ y: 1 }}
  geometry={new BoxBufferGeometry(1, 2, 1)}
  material={new MeshBasicMaterial({ wireframe: true })}
/>
```

### Properties

```ts
// required
geometry: THREE.BufferGeometry
material: THREE.Material | THREE.Material[]

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
interactive: boolean = false
ignorePointer: boolean = false
```

### Bindings

```ts
inViewport: boolean
mesh: THREE.Mesh
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
