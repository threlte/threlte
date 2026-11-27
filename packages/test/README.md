## @threlte/test

`@threlte/test` is a lightweight component testing toolkit for Threlte.

```
npm i @threlte/test
```

It supports Svelte 5 + Threlte 8 onwards.

```ts
import { describe, it, expect } from 'vitest'
import { render } from '@threlte/test'
import Scene from './Scene.svelte'

describe('Scene', () => {
  it('creates a box mesh with a boxGeometry and meshStandardMaterial', () => {
    const { scene } = render(Scene)

    const mesh = scene.getObjectByProperty('isMesh', true) as Mesh
    expect(mesh).toBeDefined()
    expect(mesh.material).toBeInstanceOf(MeshStandardMaterial)
    expect(mesh.geometry).toBeInstanceOf(BoxGeometry)
  })
})
```

It provides a function, `render`, which will instantiate a Threlte context and whatever component you pass to it.

Calling `render` will provide useful tools for testing your component's behavior.

```ts
const {
  component, // SvelteComponent
  scene, // THREE.Scene
  camera, // CurrentWritable<THREE.Camera>
  advance, // ({ count?: number; delta?: number }) => { frameInvalidated: boolean }
  fireEvent, // (object3D: THREE.Object3D, event, payload) => Promise<void>
  toCanvasPosition, // (input: string | THREE.Object3D) => { x: number, y: number }
  rerender, // (props) => Promise<void>
  unmount, // () => void
} = render(Component)
```

### Scene

`scene` is the `THREE.Scene` created by a Threlte context without any modifications. Querying objects from it can be useful for verifying that your component is doing what you expect it to.

### Advance

If you wish to test results produced by running `useTask`, you must call `advance`. `advance` runs the scheduler and returns `{ frameInvalidated }` indicating whether the frame needed rendering. The delta defaults to 16ms but can be configured.

```ts
// Runs advance() 10 times with a 33.3ms delta
advance({ delta: 33.3, count: 10 })
```

`advance` returns `{ frameInvalidated: boolean }`, which reflects whether `shouldRender()` was true for that frame. This is useful for testing on-demand and manual render mode invalidation logic.

```ts
const { advance } = render(MyComponent)

const { frameInvalidated } = advance()
expect(frameInvalidated).toBe(true)
```

#### Initial advance on render

`render()` automatically calls `advance({ delta: 0 })` once before returning. This ensures that scene matrices (`matrixWorld`) are computed for all objects, so positional assertions are immediately valid without requiring a manual `advance()` call first.

There are a few consequences worth knowing:

**The first user `advance()` is the second scheduler tick.** Any `useTask` with `autoStart: true` will have already run once with `delta: 0` by the time `render()` returns. If your task has side effects that should only run from explicit test code, start the task with `autoStart: false` and control it manually.

**The initial `frameInvalidated` signal is consumed internally.** Any `invalidate()` calls that fire during component initialization are cleared before `render()` returns. You do not need to drain a setup frame before testing invalidation logic — assertions on `frameInvalidated` reflect only what happened during your explicit `advance()` call.

**Note:** tasks that compute `1 / delta` will receive `Infinity` on this initial tick and should guard against it.

The initial delta can be overridden via the third argument to `render()`:

```ts
render(MyComponent, {}, { delta: 16 })
```

### fireEvent

If your component uses the `interactivity` plugin, you can test events using the `fireEvent` function. Let's say we have a component like this:

```svelte
<script>
  let { onclick } = $props()
</script>

<T.Mesh {onclick} />
```

We can write a test like this:

```ts
const onclick = vi.fn()
const { render, fireEvent } = render(Scene, {
  props: { onclick }
})

const mesh = scene.getObjectByName('myMesh')
await fireEvent(mesh, 'click', someOptionalCustomPayload)
expect(onclick).toHaveBeenCalledOnce()
```

Note that if you use the event object, you will have to design a mock payload.

### toCanvasPosition

`toCanvasPosition` projects a 3D object's world position into canvas pixel coordinates. It accepts either an object name string or a `THREE.Object3D` directly, and returns `{ x, y }` in pixels relative to the canvas.

This is primarily useful when you want to simulate a real pointer event at the location of a 3D object:

```ts
import { userEvent } from 'vitest/browser'

const { container, toCanvasPosition } = render(Scene)

await userEvent.click(container, {
  position: toCanvasPosition('box-1' /* a Mesh with name='box-1' */),
})
```

### Setup

`@threlte/test` currently only supports vitest as your test runner. To get started, add the `threlteTesting` plugin to your Vite or Vitest config.

```ts
// vite.config.js
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { threlteTesting } from '@threlte/test/vite'

export default defineConfig({
  plugins: [
    svelte(),
    threlteTesting(),
  ]
});
```

Additionally, the [Vitest environment](https://vitest.dev/guide/environment.html) must be set to a DOM enviroment, like happy-dom or vitest browser mode.

### Limitations

The test renderer runs in a node.js environment, unless if running in vite browser mode. It creates a Threlte context and renders your component with this context provided. This must be considered when testing `<Canvas>` or `WebGLRenderer` related configuration and behavior.
