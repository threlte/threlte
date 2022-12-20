---
title: GLTF
---

<script lang="ts">
import Example from '$examples/extras/gltf/App.svelte'
</script>

!!!module_summary title=GLTF|sourcePath=components/GLTF/GLTF.svelte|name=GLTF|from=extras|type=component|relatedDocs={[{name:"three.js GLTFLoader reference",url:"https://threejs.org/docs/examples/en/loaders/GLTFLoader.html"}]}
To use DRACO compression, provide a path to the DRACO decoder.
To use KTX2 compressed textures, provide a path to the KTX2 transcoder.

Change the property `url` to load new 3D content. The new content will be swapped as soon as loading is finished.

Use the hook [`useGltf`](/extras/use-gltf) to reuse a glTF model or to use parts of it.

:::admonition type="tip"
See the hook [`useGltfAnimations`](/extras/use-gltf-animations) on how to use animations of glTF Files.
:::

<ExampleWrapper playgroundHref="/extras/gltf">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/gltf/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/gltf/Scene.svelte)

</div>
</ExampleWrapper>

<small>Model: Battle Damaged Sci-fi Helmet by [theblueturtle\_](https://sketchfab.com/theblueturtle_)</small>

!!!

### Interaction

The `<GLTF>` component supports interaction:

```svelte
<GLTF
  url="/models/helmet/DamagedHelmet.gltf"
  interactive
  on:click={() => {
    console.log('User clicked!')
  }}
/>
```

### Example

```svelte
<script>
  import { GLTF } from '@threlte/extras'
</script>

<GLTF castShadow receiveShadow url={'/models/flower.glb'} position={{ y: 1 }} scale={3} />
```

### Compression

The `<GLTF>` component supports compressed glTF files.

#### DRACO

You can set `useDraco` to `true` to use DRACO compression and Threlte will load a default DRACO decoder from Google servers, specifically `https://www.gstatic.com/draco/v1/decoders/`.

Or you can set `useDraco` to your own DRACO decoder path as a `string`.

#### Meshopt

You can set `useMeshopt` to `true` to use meshopt compression and Threlte will load a default meshopt decoder from Three, specifically `https://github.com/mrdoob/three.js/blob/dev/examples/jsm/libs/meshopt_decoder.module.js`.

### Properties

```ts
// required
url: string

// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
dispose: boolean | undefined = undefined
d̶r̶a̶c̶o̶D̶e̶c̶o̶d̶e̶r̶P̶a̶t̶h̶: string | undefined = undefined // Deprecated - use `useDraco` instead
useDraco: string | boolean = false
useMeshopt: boolean = false
ktxTranscoderPath: string | undefined = undefined
ignorePointer: boolean = false
interactive: boolean = false
```

### Bindings

```ts
gltf: THREE.GLTF | undefined
scene: THREE.Group | undefined
animations: THREE.AnimationClip[] | undefined
asset:
  | {
      copyright?: string | undefined;
      generator?: string | undefined;
      version?: string | undefined;
      minVersion?: string | undefined;
      extensions?: any;
      extras?: any;
    }
  | undefined
cameras: THREE.Camera[] | undefined
scenes: THREE.Group[] | undefined
userData: any
parser: THREE.GLTFParser | undefined
materials: Record<string, THREE.Material>
nodes: Record<string, THREE.Object3D>
```

### Events

```ts
load: GLTF // The content finished loading
unload: undefined // New content finished loading and the old content is unloaded and disposed
error: string // An error occured while loading and parsing
viewportenter: undefined
viewportleave: undefined
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```
