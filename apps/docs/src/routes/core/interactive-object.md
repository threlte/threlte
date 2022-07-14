---
title: InteractiveObject
---

!!!module_summary title=InteractiveObject|sourcePath=internal/InteractiveObject.svelte|name=InteractiveObject|from=core|type=component

Provides access to the interactivity system of Threlte.

:::admonition type="info"
This is a **trait component**. They are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with threlte systems.
:::

!!!

### Basic Example

:::admonition type="tip"
You most likely want to use a [`<MeshInstance>`](/core/mesh-instance) component in this scenario. The component `<InteractiveObject>` is part of the component [`<Object3DInstance>`](/core/object3d-instance), which the component `<MeshInstance>` is extending.
:::

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
