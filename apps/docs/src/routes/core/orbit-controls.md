---
title: OrbitControls
---

!!!module_summary title=OrbitControls|sourcePath=controls/OrbitControls.svelte|name=OrbitControls|from=core|type=component
`<OrbitControls>` allow the camera to orbit around a target.

The component `<OrbitControls>` must be a direct child of a camera component and will mount itself to that camera.
If the properties `autoRotate` or `enableDamping` are set to true, the frame loop will run continously.
!!!

### Example

```svelte
<script>
  import { PerspectiveCamera, OrbitControls } from 'threlte'
</script>

<PerspectiveCamera fov={50}>
  <OrbitControls enableDamping />
</PerspectiveCamera>
```

### Properties

```ts
// optional
autoRotate: boolean | undefined = undefined
autoRotateSpeed: number | undefined = undefined
dampingFactor: number | undefined = undefined
enableDamping: boolean | undefined = undefined
enabled: boolean | undefined = undefined
enablePan: boolean | undefined = undefined
enableRotate: boolean | undefined = undefined
enableZoom: boolean | undefined = undefined
keyPanSpeed: number | undefined = undefined
keys:
  | {
      LEFT: string
      UP: string
      RIGHT: string
      BOTTOM: string
    }
  | undefined = undefined
maxAzimuthAngle: number | undefined = undefined
maxDistance: number | undefined = undefined
maxPolarAngle: number | undefined = undefined
maxZoom: number | undefined = undefined
minAzimuthAngle: number | undefined = undefined
minDistance: number | undefined = undefined
minPolarAngle: number | undefined = undefined
minZoom: number | undefined = undefined
mouseButtons:
  | {
        LEFT: MOUSE
        MIDDLE: MOUSE
        RIGHT: MOUSE
    }
  | undefined = undefined
panSpeed: number | undefined = undefined
rotateSpeed: number | undefined = undefined
screenSpacePanning: boolean | undefined = undefined
touches:
  | {
        ONE: TOUCH
        TWO: TOUCH
    }
  | undefined = undefined
zoomSpeed: number | undefined = undefined
target: Position | undefined = undefined
```

### Bindings

```ts
controls: THREE.OrbitControls
```

### Events

```ts
change: undefined
start: undefined
end: undefined
```
