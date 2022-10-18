---
title: Environment
---

<script lang="ts">
import Wrapper from '$examples/environment/Wrapper.svelte'
</script>



!!!module_summary title=Environment|sourcePath=components/Environment/Environment.svelte|name=Environment|from=extras|type=component|relatedDocs={[{name:"three.js Scene environment reference",url:"https://threejs.org/docs/#api/en/scenes/Scene.environment"}]}

Scene environment map implementation with included loaders and ground projected environment.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/environment/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/environment/Scene.svelte)
&&&


### Usage

Pass absolute path to `path`. For example, if you are using sveltekit and you put your files in `static/envmap/hdr` then path will be `/envmap/hdr/`

The component decides whether to use **cubic** or **equirectangular** map based on the `files` prop. Provide a string array for cubic or a string for equirectangular.



```svelte
<!-- Cubic jpg envmap -->
<Environment
  path = '/envmap/bridge_cube/'
  files= {['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']}
  isBackground={true}
  format="ldr"
  groundProjection={{ radius: 200, height: 5, scalar: 100 }}
/>

<!-- Equirectangular jpg envmap -->
<Environment
  path = '/envmap/'
  files='pisa_1k.jpg'
  isBackground={true}
  format="ldr"
/>

<!-- Cubic hdr envmap -->
<Environment
  path = '/envmap/pisaHdr/'
  files={[['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr']]}
  isBackground={true}
  format="hdr"
  groundProjection={{ radius: 200, height: 5, scalar: 100 }}
/>

<!-- Equirectangular hdr envmap -->
<Environment
  path = '/envmap/'
  files='shanghai_riverside_1k.hdr'
  isBackground={true}
  format="hdr"
  groundProjection={{ radius: 200, height: 5, scalar: 100 }}
/>
```


### Properties

```ts
// required
files: string | string[] = ''
format: 'ldr' | 'hdr' = 'ldr'

// optional
path: string | undefined = undefined
isBackground: boolean = undefined
groundProjection: {
	radius: number
	height: number
	scalar: number
} = undefined
encoding: THREE.TextureEncoding = undefined
```
