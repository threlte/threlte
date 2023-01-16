---
title: useRender
---

<script lang="ts">
import Example from '$examples/core/use-render/App.svelte'
</script>

!!!module_summary title=useRender|sourcePath=hooks/useRender.ts|name=useRender|from=core|type=hook|needsContext=true|divider=false
This hook allows you to execute code on every **invalidated** frame and after all `useFrame` hooks have been executed.
You receive the state (the same as [`useThrelte`](/core/use-threlte)) and a clock delta in seconds.
Typically this hook is used to implement advanced rendering techniques such as post processing or custom render passes.

You may pass additional options to this hook. The property `order` is useful if you need to order the sequence of `useRender` callbacks across the component tree where callbacks are ordered from low to high.

```ts
type ThrelteUseRenderOptions = {
	order?: number
}
```

<ExampleWrapper playgroundHref="/core/use-render">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/use-render/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/use-render/Scene.svelte)

</div>
</ExampleWrapper>

!!!
