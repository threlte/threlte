---
title: useCursor
---

<script lang="ts">
import Example from '$examples/extras/use-cursor/App.svelte'
</script>

!!!module_summary title=useCursor|sourcePath=hooks/useCursor.ts|name=useCursor|from=extras|type=hook
A hook that sets the css cursor property according to the hover state of a mesh, so that you can give the user visual feedback.

If a context is present, the cursor property will be set on the DOM element of the renderer, otherwise it will be set on the body element.

<ExampleWrapper playgroundHref="/extras/use-cursor">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/use-cursor/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/use-cursor/Scene.svelte)

</div>
</ExampleWrapper>

!!!

## Examples <!-- omit in toc -->

### Simple Usage

Provide arguments to determine the cursor style. The defaults are`'pointer'` for `onPointerOver` and `'auto'` for `onPointerOut`. `useCursor` returns event handlers that you can use to set the hovering state:

```svelte
<script lang="ts">
  import { Mesh } from '@threlte/core'
  import { useCursor } from '@threlte/extras'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'

  // Set the cursor to 'grab' if the pointer is
  // hovering over the mesh and to 'crosshair'
  // if the pointer is outside the mesh
  const { onPointerEnter, onPointerLeave } = useCursor('grab', 'crosshair')
</script>

<Mesh
  interactive
  on:pointerenter={onPointerEnter}
  geometry={new BoxBufferGeometry(1, 1, 1)}
  material={new MeshBasicMaterial()}
/>
```

### Renaming Event Handlers

You can rename the event handlers to resolve naming conflicts. Additionally Svelte allows binding multiple event handlers to the same event:

```svelte
<script lang="ts">
  import { Mesh } from '@threlte/core'
  import { useCursor } from '@threlte/extras'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'

  const { onPointerEnter: cursorEnter, onPointerLeave: cursorLeave } = useCursor()

  const onPointerEnter = () => {
    console.log('Pointer entered!')
  }
  const onPointerLeave = () => {
    console.log('Pointer left!')
  }
</script>

<Mesh
  interactive
  on:pointerenter={cursorEnter}
  on:pointerenter={onPointerEnter}
  geometry={new BoxBufferGeometry(1, 1, 1)}
  material={new MeshBasicMaterial()}
/>
```

### Store Usage

If you want to implement custom logic, you can use the returned svelte store to set the hovering state:

```svelte
<script lang="ts">
  import { Mesh } from '@threlte/core'
  import { useCursor } from '@threlte/extras'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'

  const { hovering } = useCursor()
</script>

<Mesh
  interactive
  on:pointerenter={() => ($hovering = true)}
  on:pointerleave={() => ($hovering = false)}
  geometry={new BoxBufferGeometry(1, 1, 1)}
  material={new MeshBasicMaterial()}
/>
```

### Change the Cursor Style

Provide svelte stores to change the cursor style also while hovering:

```svelte
<script lang="ts">
  import { Mesh } from '@threlte/core'
  import { useCursor } from '@threlte/extras'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
  import { writable } from 'svelte/store'

  const onPointerOverCursor = writable('grab')

  const { onPointerEnter, onPointerLeave } = useCursor(onPointerOverCursor)

  // somewhere in your application …
  onPointerOverCursor.set('grabbing')
</script>

<Mesh
  interactive
  on:pointerenter={onPointerEnter}
  geometry={new BoxBufferGeometry(1, 1, 1)}
  material={new MeshBasicMaterial()}
/>
```
