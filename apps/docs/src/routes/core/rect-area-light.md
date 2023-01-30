---
title: RectAreaLight
---

!!!module_summary title=RectAreaLight|sourcePath=lights/RectAreaLight.svelte|name=RectAreaLight|from=core|type=component|relatedDocs={[{name:"three.js RectAreaLight reference",url:"https://threejs.org/docs/#api/en/lights/RectAreaLight"}]}

:::deprecated
:::

A light that emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting.

This light cannot cast shadows.
!!!

### Example

```svelte
<script>
  import { RectAreaLight } from '@threlte/core'
</script>

<RectAreaLight position={{ x: 3, y: 3 }} width={50} height={50}/>
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
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
width: number | undefined = undefined
height: number | undefined = undefined
power: number | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
light: THREE.RectAreaLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
