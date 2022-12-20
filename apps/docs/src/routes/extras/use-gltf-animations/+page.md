---
title: useGltfAnimations
---

<script lang="ts">
import Example from '$examples/extras/use-gltf-animations/App.svelte'
</script>

!!!module_summary title=useGltfAnimations|sourcePath=hooks/useGltfAnimations.ts|name=useGltfAnimations|from=extras|type=hook|needsContext=true
Convenience hook to use animations loaded with a `<GLTF>` threlte component.

<ExampleWrapper playgroundHref="/extras/use-gltf-animations">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/use-gltf-animations/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/use-gltf-animations/Scene.svelte)

</div>
</ExampleWrapper>

<small>Model: [Littlest Tokyo](https://artstation.com/artwork/1AGwX) by [Glen Fox](https://artstation.com/glenatron), CC Attribution.</small>

!!!

### Examples <!-- omit in toc -->

#### Basic Example

```svelte
<script lang="ts">
  import { GLTF, useGltfAnimations } from '@threlte/extras'
  // `useGltfAnimations` returns stores that populate
  // when the `<GLTF>` component finished loading.
  const { gltf, actions, mixer } = useGltfAnimations<'All Animations'>(({ actions, mixer }) => {
    // Either play your animations as soon as they are loaded
    mixer.timeScale = 0.5
    actions['All Animations']?.play()
  })

  // Or play them whenever you need
  export const triggerAnimation = () => {
    if ($mixer) $mixer.timeScale = 0.5
    $actions['All Animations']?.play()
  }
</script>

<!-- Bind the store `gltf` -->
<GLTF url={'/Bengal.glb'} bind:gltf={$gltf} />
```

#### Using the `useGltf` Hook

Sometimes you might want to use the hook [`useGltf`](/extras/use-gltf) to reuse parts of a model or use the embedded camera. In this case, the hook `useGltf` returns an object with a property `gltf` which you can pass as the first argument to the hook `useGltfAnimations`.

```svelte
<script lang="ts">
  import { Object3DInstance } from '@threlte/core'
  import { useGltfAnimations, useGltf } from '@threlte/extras'

  // In this example, the useGltf hook returns a Writable<THREE.GLTF> store
  const { gltf } = useGltf('/path/to/model.glb')

  // Provide that store to the hook useGltfAnimations
  useGltfAnimations<'All Animations'>(gltf, ({ actions }) => {
    actions['All Animations']?.play()
  })
</script>

{#if $gltf}
  <Object3DInstance object={$gltf.scene} />
{/if}
```

#### Applying animations to a different root

Sometimes you want to apply the animations to a different root than the GLTF scene.

```svelte
<script>
  import { useGltfAnimations, useGltf } from '@threlte/extras'
	import { Scene } from 'three'

  const { gltf } = useGltf('/path/to/model.glb')

	const scene = new Scene()

  useGltfAnimations(gltf, ({ actions }) => {
    actions.someAction?.play()
  }, scene)
</script>

<Three type={scene}>
	<!-- … -->
</Three>
```
