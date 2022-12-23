---
title: ViewportAwareObject
---

!!!module_summary title=ViewportAwareObject|sourcePath=internal/ViewportAwareObject.svelte|name=ViewportAwareObject|from=core|type=component

Provides information on the visibility of the object relative to the viewport through the means of the events `viewportenter` and `viewportleave` or the binding `inViewport`.

:::admonition type="info"
This is a **trait component**. Trait components are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with Threlte systems.
:::

!!!

### Basic Example

<!-- :::admonition type="tip"
You most likely want to use a [`<MeshInstance>`](/core/mesh-instance) component in this scenario. The component `<ViewportAwareObject>` is part of the component [`<Object3DInstance>`](/core/object3d-instance), which the component `<MeshInstance>` is extending.
::: -->

```svelte
<script>
	import { ViewportAwareObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()

	const onViewportEnter = () => {
		console.log('Mesh has entered the viewport!')
	}

	const onViewportLeave = () => {
		console.log('Mesh has entered the viewport!')
	}
</script>

<ViewportAwareObject
	object={mesh}
	viewportAware
	on:viewportenter={onViewportEnter}
	on:viewportleave={onViewportLeave}
/>
```

### Properties

```ts
// required
object: Object3D
viewportAware: boolean = false
```

### Bindings

```ts
inViewport: boolean
```
