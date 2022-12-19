---
title: HierarchicalObject
---

!!!module_summary title=HierarchicalObject|sourcePath=internal/HierarchicalObject.svelte|name=HierarchicalObject|from=core|type=component

On initialization, the component `<HierarchicalObject>` forwards a provided `THREE.Object3D` to a parent `<HierarchicalObject>` component. The parent `<HierarchicalObject>` receives this object in the callback `onChildMount` to e.g. add the object to the scene graph, create a list of all child objects or use the child objects and act on their geometries.

The component [`<SceneGraphObject>`](/core/scene-graph-object) in turn uses this component to add and remove objects to and from the scene graph.

:::admonition type="info"
This is a **trait component**. Trait components are mostly used internally and make certain aspects of three.js objects accessible and reactive and interact with Threlte systems.
:::

!!!

### Basic Example

In this example the component is responsible for

- forwarding the mesh to the parent `<HierarchicalObject>`
- adding children to the scene graph (i.e. as children to the mesh)
- removing children from the scene graph

:::admonition type="tip"
You most likely want to use a [`<MeshInstance>`](/core/mesh-instance) component in this scenario. The component `<HierarchicalObject>` is part of the component [`<Object3DInstance>`](/core/object3d-instance), which the component `<MeshInstance>` is extending.
:::

```svelte
<script>
	import { HierarchicalObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()
</script>

<HierarchicalObject
	object={mesh}
	onChildMount={(child) => mesh.add(child)}
	onChildDestroy={(child) => mesh.remove(child)}
/>
```

### Collecting children via methods

```svelte
<script>
	import { HierarchicalObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()

	let children = []

	$: console.log(`This component has ${children.length} children`)
</script>

<HierarchicalObject
	object={mesh}
	onChildMount={(child) => {
		children.push(child)
		children = children
	}}
	onChildDestroy={(child) => {
		const index = children.findIndex((c) => c.uuid === child.uuid)
		if (index !== -1) {
			children.splice(index, 1)
			children = children
		}
	}}
/>
```

### Collecting children via binding

The component `<HierarchicalObject>` also provides a useful binding to collect all children.

```svelte
<script>
	import { HierarchicalObject } from '@threlte/core'
	import { Mesh } from 'three'

	const mesh = new Mesh()

	let children = []

	$: console.log(`This component has ${children.length} children`)
</script>

<HierarchicalObject	object={mesh}	bind:children />
```

### Properties

```ts
// optional
object: Object3D | undefined = undefined
onChildMount: ((child: Object3D) => void) | undefined = undefined
onChildDestroy: ((child: Object3D) => void) | undefined = undefined
```

### Bindings

```ts
children: Object3D[]
```
