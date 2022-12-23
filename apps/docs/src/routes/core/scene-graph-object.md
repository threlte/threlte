---
title: SceneGraphObject
---

!!!module_summary title=SceneGraphObject|sourcePath=internal/SceneGraphObject.svelte|name=SceneGraphObject|from=core|type=component

This component is extending the component [`<HierarchicalObject>`](/core/hierarchical-object) and conveniently provides methods to add and remove children to the scene graph.

:::admonition type="info"
This is a **trait component**. Trait components are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with Threlte systems.
:::

!!!

### Basic Example

In this example the component is responsible for

- forwarding the mesh to the parent [`<HierarchicalObject>`](/core/hierarchical-object)
- adding children to the scene graph, i.e. as children to the mesh
- removing children from the scene graph

<!-- :::admonition type="tip"
You most likely want to use a [`<MeshInstance>`](/core/mesh-instance) component in this scenario. The component `<SceneGraphObject>` is part of the component [`<Object3DInstance>`](/core/object3d-instance), which the component `<MeshInstance>` is extending.
::: -->

```svelte
<script>
	import { SceneGraphObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()
</script>

<SceneGraphObject	object={mesh} />
```

### Properties

```ts
// required
object: Object3D
```
