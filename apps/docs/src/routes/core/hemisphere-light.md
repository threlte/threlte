---
title: HemisphereLight
---

!!!module_summary title=HemisphereLight|sourcePath=lights/HemisphereLight.svelte|name=HemisphereLight|from=core|type=component|relatedDocs={[{name:"three.js HemisphereLight reference",url:"https://threejs.org/docs/#api/en/lights/HemisphereLight"}]}
A light source positioned directly above the scene, with color fading from the sky color to the ground color.
This light cannot be used to cast shadows.
!!!

### Example

```svelte
<script>
  import { HemisphereLight } from '@threlte/core'
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
dispose: boolean | undefined = undefined
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
