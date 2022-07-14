---
title: DirectionalLight
---

!!!module_summary title=DirectionalLight|sourcePath=lights/DirectionalLight.svelte|name=DirectionalLight|from=core|type=component
The `<DirectionalLight>` component accepts a property `target` which acts like the property `lookAt`: Provide either a `Position` (`{ x: 5, z: 3 }`) or another Object3D instance. In the latter case the `DirectionalLight` will track the provided object. This is especially useful if you want to move the area that the shadow is applied to.

See the three.js [DirectionalLight documentation](https://threejs.org/index.html?q=direct#api/en/lights/DirectionalLight) for details.
!!!

### Example

```svelte
<script>
  import { DirectionalLight } from 'threlte'
</script>

<DirectionalLight shadow intensity={0.6} position={{ x: 3, y: 10, z: 3 }} target={{ x: 1 }} />
```

### Properties

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
viewportAware: boolean = false
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
target: Position | THREE.Object3D | undefined = undefined
shadow:
  | boolean
  | {
      mapSize?: [number, number] | undefined
      camera?:
        | {
            left?: number | undefined
            right?: number | undefined
            top?: number | undefined
            bottom?: number | undefined
            near?: number | undefined
            far?: number | undefined
          }
        | undefined
      bias?: number | undefined
      radius?: number | undefined
    }
  | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
light: THREE.DirectionalLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
