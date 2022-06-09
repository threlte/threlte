---
title: useGltfAnimations
---

<script lang="ts">
import Wrapper from '$examples/use-gltf-animations/Wrapper.svelte'
</script>

!!!module_summary title=useGltfAnimations|sourcePath=extras/hooks/useGltfAnimations.ts|name=useGltfAnimations|from=threlte/extras|type=hook|needsContext=true
Convenience hook to use animations loaded with a `<GLTF>` threlte component.

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../../../examples/use-gltf-animations/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../../examples/use-gltf-animations/Scene.svelte)
&&&

<small>Model: [Littlest Tokyo](https://artstation.com/artwork/1AGwX) by [Glen Fox](https://artstation.com/glenatron), CC Attribution.</small>

!!!

### Examples <!-- omit in toc -->

```svelte
<script lang="ts">
  import { GLTF } from 'threlte'
  import { useGltfAnimations } from 'threlte/extras'

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
