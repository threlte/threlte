---
title: SpotLight
---

!!!module_summary title=SpotLight|sourcePath=lights/SpotLight.svelte|name=SpotLight|from=core|type=component|relatedDocs={[{name:"three.js SpotLight reference",url:"https://threejs.org/docs/#api/en/lights/SpotLight"}]}
This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.

This light can cast shadows.
!!!

### Example

```svelte
<script>
  import { SpotLight, Mesh } from '@threlte/core'
  let mesh
</script>

<Mesh … bind:mesh />
<SpotLight position={{ x: 3, y: 3 }} target={mesh} />
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
angle: number | undefined = undefined
decay: number | undefined = undefined
distance: number | undefined = undefined
penumbra: number | undefined = undefined
power: number | undefined = undefined
target: LookAt | undefined = undefined
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
light: THREE.SpotLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
