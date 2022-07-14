---
title: ContextBridge
---

!!!module_summary title=ContextBridge|sourcePath=misc/ContextBridge.svelte|name=ContextBridge|from=core|type=component
This component is used to consume the context and rootContext provided by the `<Canvas>` component outside of it.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { Canvas, ContextBridge } from 'threlte'

  let ctx
  $: console.log(ctx)
</script>

<Canvas>
  <ContextBridge bind:ctx />
</Canvas>
```

### Bindings <!-- omit in toc -->

```ts
ctx: ThrelteContext
rootCtx: ThrelteRootContext
```
