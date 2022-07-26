---
title: Disposal
---

# Disposal

Freeing resources is a [manual chore in three.js](https://threejs.org/docs/index.html#manual/en/introduction/How-to-dispose-of-objects), but Svelte is aware of component lifecycles, hence Threlte will attempt to free resources for you by calling `dispose`, if present, on all unmounted objects and recursively on all properties that can be disposed.

```svelte
<script>
	import { Mesh, useTexture } from '@threlte/core'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

	const map = useTexture('/some/texture')
	const material = new MeshStandardMaterial({	map })
</script>

<!--
	The geometry, material and the associated texture will
	be disposed as soon as the <Mesh> component unmounts.
-->
<Mesh
	geometry={new BoxBufferGeometry(1, 1, 1)}
	{material}
/>
```

:::admonition type="info"
Be aware that calling `dispose` on a three.js buffer, material or geometry is merely deallocating it from the GPU memory. If an object is used after it's disposed it will be allocated again, resulting in a performance drop for a single frame. It will **not produce a runtime error**.
:::

You can switch off automatic disposal by placing `dispose={false}` onto components, it is now valid for the entire tree.

```svelte
<script>
	import { Mesh, useTexture } from '@threlte/core'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

	const map = useTexture('/some/texture')
	const material = new MeshStandardMaterial({	map })
</script>

<!-- will not be disposed -->
<Mesh
	dispose={false}
	geometry={new BoxBufferGeometry(1, 1, 1)}
	{material}
>
	<!-- will also not be disposed -->
	<Mesh
		geometry={new BoxBufferGeometry(2, 2, 2)}
		{material}
	>
		<!-- will be disposed -->
		<Mesh
			dispose
			geometry={new BoxBufferGeometry(2, 2, 2)}
			material={new MeshStandardMaterial()}
		/>
	</Mesh>
</Mesh>
```

Sometimes it's useful to manage the disposal of objects yourself. This is especially true of objects are shared across separately mounted component trees. Use the component [`<Disposables>`](/extras/disposables) to automatically opt-out of automatic disposal and provide objects that should be disposed on unmounting of the component.

```svelte
<script>
	import { Mesh, useTexture } from '@threlte/core'
	import { Disposables } from '@threlte/extras'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

	const map = useTexture('/some/texture')
	const material = new MeshStandardMaterial({	map })
	const geometry = new BoxBufferGeometry(1, 1, 1)
</script>

<Disposables disposables={[map, geometry, material]}>
	<Mesh {geometry} {material} position={{ x: 2 }}>
		<Mesh {geometry} {material} position={{ y: 2 }}>
			<Mesh {geometry} {material} position={{ x: 2 }} />
		</Mesh>
	</Mesh>
<Disposables/>
```
