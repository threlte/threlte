---
title: OrthographicCamera
---

!!!module_summary title=OrthographicCamera|sourcePath=cameras/OrthographicCamera.svelte|name=OrthographicCamera|from=threlte|type=component
A camera that uses orthographic projection.

In this projection mode, an object's size in the rendered image stays constant regardless of its distance from the camera.

This can be useful for rendering 2D scenes and UI elements, amongst other things.
!!!

### Example

```svelte
<script>
  import { OrthographicCamera } from 'threlte'
</script>

<OrthographicCamera position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }} />
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
useCamera: boolean = true
near: number = undefined
far: number = undefined
zoom: number = undefined
```

### Bindings

```ts
inViewport: boolean
camera: THREE.OrthographicCamera
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
