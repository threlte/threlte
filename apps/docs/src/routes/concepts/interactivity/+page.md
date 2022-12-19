---
title: Interactivity
---

# Interactivity

[Open the interactivity example in a Svelte REPL](https://svelte.dev/repl/612bfb61f8f84e299fe5083e4767b1e1?version=3.46.2)

Listen to events of a `<Mesh>` and a `<MeshInstance>` as if it would be a regular DOM element:

```jsx
<Mesh … interactive on:click={onClick} />
```

## Supported Events

- `click`
- `contextmenu`
- `pointerup`
- `pointerdown`
- `pointerenter`
- `pointerleave`
- `pointermove`

All events include the raycast Intersection object:

```svelte
<script lang="ts">
  import { Mesh, ThreltePointerEvent } from '@threlte/core'

  const onClick = (e: CustomEvent<ThreltePointerEvent>) => {
    const distanceToMesh = e.detail.distance
  }
</script>

<Mesh … interactive on:click={onClick}>
```

All events but `pointerleave` and `pointerenter` also include the underlying `PointerEvent` or `MouseEvent`:

```svelte
<script>
  import { Mesh, ThreltePointerEvent } from '@threlte/core'

  const onPointerMove = (e) => {
    console.log(e.detail.event.clientX, e.detail.event.clientY)
  }
</script>

<Mesh … interactive on:pointermove={onPointerMove}>
```

:::admonition type="tip"
You must add `interactive` to your component to be able to listen to pointer events
:::
