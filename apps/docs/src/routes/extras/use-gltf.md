---
title: useGltf
---

<script lang="ts">
import Example from '$examples/extras/use-gltf/App.svelte'
</script>

!!!module_summary title=useGltf|sourcePath=hooks/useGltf.ts|name=useGltf|from=extras|type=hook|relatedDocs={[{name:"three.js GLTFLoader reference",url:"https://threejs.org/docs/examples/en/loaders/GLTFLoader.html"}]}
A Hook to load glTF files and use separate object nodes and materials of it.

Use the component [`<GLTF>`](/extras/gltf) if you want to use a model in its entirety.

<ExampleWrapper playgroundHref="/extras/use-gltf">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/use-gltf/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/use-gltf/Scene.svelte)

</div>
</ExampleWrapper>

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

## Examples <!-- omit in toc -->

### Basic Example

`gltf` is a store which gets populated as soon as the model loaded.

```svelte
<script lang="ts">
  import { Object3DInstance, Mesh } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { MeshBasicMaterial } from 'three'

  const { gltf } = useGltf('/path/to/model.glb')
</script>

<!-- Use an object node entirely -->
{#if $gltf}
  <Object3DInstance object={$gltf.nodes['node-name']} />
{/if}

<!-- or only the geometry -->
{#if $gltf}
  <Mesh geometry={$gltf.nodes['node-name'].geometry} material={new MeshBasicMaterial()} />
{/if}
```

### DRACO decoding

Use a DRACO decoder for compressed glTF files, defaults to CDN loaded DRACO binaries.

```svelte
<script lang="ts">
  import { useGltf } from '@threlte/extras'

  const { gltf } = useGltf('/path/to/model.glb', {
    useDraco: true
  })
</script>

{#if $gltf}
  <Object3DInstance object={$gltf.nodes['node-name']} />
{/if}
```

You can also provide custom DRACO decoder binaries.

```svelte
<script lang="ts">
  import { useGltf } from '@threlte/extras'

  const { gltf } = useGltf('/path/to/model.glb', {
    useDraco: '/custom/draco/decoders/path'
  })
</script>

{#if $gltf}
  <Object3DInstance object={$gltf.nodes['node-name']} />
{/if}
```

### Nodes and Materials

The hook provides a map of all objects and materials in the loaded glTF.

```svelte
<script lang="ts">
  import { useGltf } from '@threlte/extras'

  const { gltf } = useGltf('/path/to/model.glb')
  $: nodes: $gltf?.nodes
	$: materials: $gltf?.materials
</script>
```

Provide types to use your IDEs autocompletion. Use [gltfjsx](https://github.com/pmndrs/gltfjsx) to extract types from glTF files.

```svelte
<script lang="ts">
  import { useGltf } from '@threlte/extras'

  const { gltf } = useGltf<{
		nodes: {
			MeshA: THREE.Mesh
			MeshB: THREE.Mesh
			Object3DA: THREE.Object3D
		}
		materials: {
			MaterialA: THREE.MeshStandardMaterial
			MaterialB: THREE.MeshBasicMaterial
		}
	}>('/path/to/model.glb')

  $: if ($gltf) {
    const objectA = $gltf.nodes['MeshA'] // -> THREE.Mesh
    const materialA = $gltf.materials['MaterialA'] // -> THREE.MeshStandardMaterial
  }
</script>
```
