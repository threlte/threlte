---
title: DisposableObject
---

!!!module_summary title=DisposableObject|sourcePath=internal/DisposableObject.svelte|name=DisposableObject|from=core|type=component

Depending on the provided property `dispose` and the parent components dispose strategy, this component will call `dispose` on the provided `object` and all properties of `object` that have a method `dispose`.

!!!

### Basic Example

Automatically disposes the geometry.

```svelte
<script>
	import { DisposableObject } from '@threlte/core'
	import { BoxBufferGeometry } from 'three'

	const cube = new BoxBufferGeometry(1, 1, 1)
</script>

<DisposableObject object={cube} />
```

Automatically disposes the material and associated textures.

```svelte
<script>
	import { DisposableObject, useTexture } from '@threlte/core'
	import { MeshStandardMaterial } from 'three'

	const textures = useTexture({
		map: '/map.jpg',
		normalMap: '/normalMap.jpg',
	})
	const material = new MeshStandardMaterial({ ...textures })
</script>

<DisposableObject object={material} />
```

Opt out of disposal, this is valid for the whole following tree.

```svelte
<script>
	import { DisposableObject } from '@threlte/core'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

	const cube = new BoxBufferGeometry(1, 1, 1)
	const material = new MeshStandardMaterial()
	const texture = useTexture('/texture.jpg',)
</script>

<!-- the material is not being disposed -->
<DisposableObject dispose={false} object={material}>

	<!--
		the geometry is also not being disposed: as the
		flag "dispose" is not provided, it's inheriting
		the dispose strategy from the upstream parent.
	-->
	<DisposableObject object={cube} />

	<!--
		The texture will be disposed:
		the flag "dispose" is provided.
	-->
	<DisposableObject dispose object={texture} />

</DisposableObject />
```

### Properties

```ts
// optional
dispose: boolean = true // internally uses "undefined" as default value, de-facto the default value is "true"
object: Object3D | undefined = undefined
```
