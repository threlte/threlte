---
title: Disposables
---

!!!module_summary title=Disposables|sourcePath=components/Disposables/Disposables.svelte|name=Disposables|from=extras|type=component

This component switches of the automatic disposal of three.js objects for all child components (direct or indirect). The property `disposables` accepts three.js objects like meshes, material, textures and geometries that upon unmounting of the component will be **deeply disposed**.

!!!

### Example

The meshes can be mounted and unmounted _without_ the map, material and geometry being disposed. If the component `<Disposables>` is being unmounted, map, material and geometry will be disposed.

```svelte
<script>
	import { Mesh, useTexture } from '@threlte/core'
	import { Disposables } from '@threlte/extras'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

	const texture = useTexture('/some/texture')
	const material = new MeshStandardMaterial({	map: texture })
	const geometry = new BoxBufferGeometry(1, 1, 1)
</script>

<!--
	*Theoretically* the texture would not need to be part of the property
	"disposables" as it's a property of "material" and therefore gets
	 disposed anyway. Leaving it in for the sake of completeness.
-->
<Disposables disposables={[texture, geometry, material]}>
	<Mesh {geometry} {material} position={{ x: 2 }}>
		<Mesh {geometry} {material} position={{ y: 2 }}>
			<Mesh {geometry} {material} position={{ x: 2 }} />
		</Mesh>
	</Mesh>
<Disposables/>
```

### Properties

`disposables` accepts an array of three.js objects that have a `dispose` method.

```ts
// required
disposables: ({
		dispose?: () => void),
		type?: string
	} & Record<string, any>)[]
```
