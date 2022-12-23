---
title: TransformableObject
---

!!!module_summary title=TransformableObject|sourcePath=internal/TransformableObject.svelte|name=TransformableObject|from=core|type=component

Provides reactive access to the basic transforms (`position`, `rotation`, `scale`) of a `THREE.Object3D`. Use the property `lookAt` to orient the object towards another object or a position.

:::admonition type="info"
This is a **trait component**. Trait components are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with Threlte systems.
:::

!!!

### Basic Example

<!-- :::admonition type="tip"
You most likely want to use a [`<MeshInstance>`](/core/mesh-instance) component in this scenario. The component `<TransformableObject>` is part of the component [`<Object3DInstance>`](/core/object3d-instance), which the component `<MeshInstance>` is extending.
::: -->

```svelte
<script>
	import { TransformableObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()

	const onTransform = () => {
		console.log('Mesh has been transformed!')
	}
</script>

<TransformableObject
	object={mesh}
	position={{ z: 0 }}
	scale={1.5}
	on:transform={onTransform}
/>
```

### Properties

```ts
// optional
object: Object3D
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
```

### Events

```ts
transform: void
```
