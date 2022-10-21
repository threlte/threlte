---
title: Environment
---

<script lang="ts">
import Example from '$examples/extras/environment/App.svelte'
</script>

!!!module_summary title=Environment|sourcePath=components/Environment/Environment.svelte|name=Environment|from=extras|type=component|relatedDocs={[{name:"three.js Scene environment reference",url:"https://threejs.org/docs/#api/en/scenes/Scene.environment"}]}

Scene environment map implementation with included loaders and ground projected environment.

<ExampleWrapper playgroundHref="/extras/environment">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/environment/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/environment/Scene.svelte)

</div>
</ExampleWrapper>

!!!

### Usage

Pass absolute path to `path`. For example, if you are using sveltekit and you put your files in `static/envmap/hdr` then path will be `/envmap/hdr/`

The component decides whether to use **cubic** or **equirectangular** map based on the `files` prop. Provide a string array for cubic or a string for equirectangular.

Currently supported formats are 'ldr' (.jpg, .png, etc.) and 'hdr' .hdr. Format is inferred based on file extension but it can be provided in `format` prop.

```svelte
<!-- Cubic jpg envmap -->
<Environment
  path = '/envmap/bridge_cube/'
  files= {['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']}
  isBackground={true}
  format="ldr"
  groundProjection={{ radius: 200, height: 5, scale: {x: 100, y: 100, z: 100}}}
/>

<!-- Equirectangular jpg envmap -->
<Environment
  path = '/envmap/'
  files='pisa_1k.jpg'
  isBackground={true}
/>

<!-- Cubic hdr envmap -->
<Environment
  path = '/envmap/pisaHdr/'
  files={[['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr']]}
  isBackground={true}
  groundProjection={{ radius: 200, height: 5, scale: {x: 100,y: 100,z: 100} }}
/>

<!-- Equirectangular hdr envmap -->
<Environment
  path = '/envmap/'
  files='shanghai_riverside_1k.hdr'
  isBackground={true}
  format="hdr"
  groundProjection={{ radius: 200, height: 5, scale: {x: 100,y: 100,z: 100} }}
/>
```

### Properties

```ts
// required
files: string | string[] = ''

// optional
format: 'ldr' | 'hdr' = undefined
path: string | undefined = undefined
isBackground: boolean = undefined
groundProjection: {
	radius: number
	height: number
	scale: Scale
} = undefined
encoding: THREE.TextureEncoding = undefined
```
