---
title: useThrelte
---

!!!module_summary title=useThrelte|sourcePath=hooks/useThrelte.ts|name=useThrelte|from=threlte|type=hook|needsContext=true
This hook lets you consume the main context of the `<Canvas>` component which contains the renderer, camera, scene and other properties.

Use this hook to manually invalidate the current frame …

```ts
const { invalidate } = useThrelte()
invalidate()
```

… access the current pointer coordinates …

```ts
const { pointer } = useThrelte()
console.log($pointer)
```

… or use the currently active camera:

```ts
const { camera } = useThrelte()
$camera.updateProjectionMatrix()
```

!!!

### Types

```ts
const {
  size, // Readable<Size>
  pointer, // Writable<Vector2>
  pointerOverCanvas, // Writable<boolean>
  clock, // Clock
  camera, // Writable<Camera>
  scene, // Scene
  renderer, // WebGLRenderer
  composer, // EffectComposer
  invalidate, // (debugFrameloopMessage?: string) => void
  advance // () => void
} = useThrelte()
```

### Frameloop

If the [frameloop is set to `'demand'`](/docs/components/01-canvas) and you are manually editing objects or materials, be sure to invalidate the current frame to request a rerender:

```ts
const { invalidate } = useThrelte()

invalidate()

// Optionally provide a debugFrameloopMessage to debug the frame loop
invalidate('changed material color')
```

If the [frameloop is set to `'never'`](/docs/components/01-canvas) you must manually advance the frameloop to request a new render:

```ts
const { advance } = useThrelte()

advance()
```
