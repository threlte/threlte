---
title: InteractiveObject
---

!!!module_summary title=InteractiveObject|sourcePath=internal/InteractiveObject.svelte|name=InteractiveObject|from=core|type=component

Provides access to the interactivity system of Threlte.

:::admonition type="info"
This is a **trait component**. Trait components are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with Threlte systems.
:::

!!!

### Basic Example

```svelte
<script>
	import { InteractiveObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()

	const onClick = () => {
		console.log('Mesh has been clicked!')
	}
</script>

<InteractiveObject
	object={mesh}
	interactive
	on:click={onClick}
/>
```

### Properties

```ts
// required
object: Object3D
interactive: boolean = false
ignorePointer: boolean = false
```

### Events

```ts
click: ThreltePointerEvent
contextmenu: ThreltePointerEvent
pointerup: ThreltePointerEvent
pointerdown: ThreltePointerEvent
pointerenter: ThreltePointerEvent
pointerleave: ThreltePointerEvent
pointermove: ThreltePointerEvent
```
