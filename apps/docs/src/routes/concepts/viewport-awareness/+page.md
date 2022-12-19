---
title: Viewport Awareness
---

# Viewport Awareness

[Open the viewport awareness example in a Svelte REPL](https://svelte.dev/repl/549eb76e8f994a34b9dd1c0b65540c79?version=3.46.2)

Additionally, most Objects (Lights, Cameras, Meshes, …) can be made _viewport aware_. Use it to lazily load textures, models and more.

```svelte
<script lang="ts">
  import { PointLight } from '@threlte/core'
  import type { Object3D } from 'three'

  let inViewport

  const onViewportEnter = (e: CustomEvent<Object3D>) => {
    console.log('PointLight entered the viewport.')
  }
  const onViewportLeave = (e: CustomEvent<Object3D>) => {
    console.log('PointLight left the viewport.')
  }
</script>

<PointLight
  viewportAware
  bind:inViewport
  on:viewportenter={onViewportEnter}
  on:viewportleave={onViewportLeave}
/>
```

These events are supported:

- `viewportenter`
- `viewportleave`

Bind `inViewport` if you wish to not use events.

:::admonition type="info"
You must add `viewportAware` to your component to make it viewport aware
:::
