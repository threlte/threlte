---
title: useFrame
---

!!!module_summary title=useFrame|sourcePath=hooks/useFrame.svelte|name=useFrame|from=threlte|type=hook|needsContext=true|divider=false
This hook allows you to execute code on every frame inside the unified frameloop.  
You receive the state (the same as [`useThrelte`](/docs/hooks/01-use-threlte)) and a clock delta in seconds.  
Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the frame loop.

You may pass additional options to this hook. The property `order` is useful if you need to order the sequence of `useFrame` callbacks across the component tree where callbacks are ordered from low to high. To debug your frameloop, provide a `debugFrameloopMessage` and add `debugFrameloop` to your [`<Canvas>`](/docs/components/01-canvas) component.

```ts
type ThrelteUseFrameOptions = {
  autostart?: boolean
  order?: number
  debugFrameloopMessage?: string
}
```

`useFrame` returns an object containing functions `start` and `stop` to control the execution of the callback and a store `started` to subscribe to its state.
!!!

<script lang="ts">
import Wrapper from '$examples/use-frame/Wrapper.svelte'
</script>

<ExampleWrapper>
  <Wrapper /> 
</ExampleWrapper>

<details>
  <summary>Show code</summary>

@[code svelte|title=Wrapper.svelte](../../../examples/use-frame/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../examples/use-frame/Scene.svelte)

</details>

---

### Example <!-- omit in toc -->

Starting and stopping the execution of a frameloop handler:

```ts
const { start, stop, started } = useFrame(
  () => {
    console.log('rendering…')
  },
  {
    autostart: false
  }
)

const toggleUseFrame = () => {
  if ($started) {
    stop()
  } else {
    start()
  }
}
```

Accessing the context inside a frameloop handler:

```ts
useFrame(({ camera }) => {
  get(camera) // camera is a store, so you have to unwrap it
})
```
