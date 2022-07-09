---
title: GLTF
---

<script lang="ts">
import Wrapper from '$examples/gltf/Wrapper.svelte'
</script>

!!!module_summary title=GLTF|sourcePath=objects/GLTF.svelte|name=GLTF|from=threlte|type=component
To use DRACO compression, provide a path to the DRACO decoder.
To use KTX2 compressed textures, provide a path to the KTX2 transcoder.

Change the property `url` to load new 3D content. The new content will be swapped as soon as loading is finished.

Use the hook [`useGltf`](/hooks/08-use-gltf) to reuse a glTF model or to use parts of it.

:::admonition type="tip"
See the hook [`useGltfAnimations`](/hooks/09-use-gltf-animations) on how to use animations of glTF Files.
:::

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../../examples/gltf/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../examples/gltf/Scene.svelte)
&&&

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
  import { GLTF } from 'threlte'
</script>

<GLTF castShadow receiveShadow url={'/models/flower.glb'} position={{ y: 1 }} scale={3} />
```

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
dracoDecoderPath: string | undefined = undefined
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
