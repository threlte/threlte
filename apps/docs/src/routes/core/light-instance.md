---
title: LightInstance
---

!!!module_summary title=LightInstance|sourcePath=instances/LightInstance.svelte|name=LightInstance|from=core|type=component|relatedDocs={[{name:"three.js Light reference",url:"https://threejs.org/docs/#api/en/lights/Light"}]}
This component lets you use any manually instantiated object that extends `THREE.Light` in threlte.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { RectAreaLight } from 'three'
  import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
  import { LightInstance } from '@threlte/core'

  RectAreaLightUniformsLib.init()

  export let intensity

  const light = new RectAreaLight(0xffffff, intensity, 10, 10)
</script>

<LightInstance {light} {intensity} position={{ x: 5, y: 5 }} />
```

### Properties <!-- omit in toc -->

```ts
// required
light: THREE.Light

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
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
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
