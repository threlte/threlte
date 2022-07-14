---
title: LayerableObject
---

!!!module_summary title=LayerableObject|sourcePath=internal/LayerableObject.svelte|name=LayerableObject|from=core|type=component

Assignes the layers provided by a parent [`<Layers>`](/core/layers) component to a `THREE.Object3D`.

:::admonition type="info"
This is a **trait component**. Trait components are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with Threlte systems.
:::

!!!

### Basic Example

:::admonition type="tip"
You most likely want to use a [`<MeshInstance>`](/core/mesh-instance) component in this scenario. The component `<LayerableObject>` is part of the component [`<Object3DInstance>`](/core/object3d-instance), which the component `<MeshInstance>` is extending.
:::

```svelte title="Parent.svelte"
<script>
	import { Layers } from '@threlte/core'
</script>

<Layers layers={3}>
	<Child />
</Layers>
```

```svelte title="Child.svelte"
<script>
	import { LayerableObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()
</script>

<!-- The mesh is assigned to layer 3 -->
<LayerableObject object={mesh} />
```

### Properties

```ts
// required
object: Object3D
```
