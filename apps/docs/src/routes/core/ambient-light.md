---
title: AmbientLight
---

!!!module_summary title=AmbientLight|name=AmbientLight|sourcePath=lights/AmbientLight.svelte|from=core|type=component|relatedDocs={[{name:"three.js AmbientLight reference",url:"https://threejs.org/docs/#api/en/lights/AmbientLight"}]}
This light globally illuminates all objects in the scene equally.
This light cannot be used to cast shadows as it does not have a direction.
!!!

### Example

```svelte
<script>
  import { AmbientLight } from '@threlte/core'
</script>

<AmbientLight color={0xd7681c} intensity={0.3} />
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
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
light: THREE.AmbientLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
