---
title: Pass
---

!!!module_summary title=Pass|sourcePath=effects/Pass.svelte|name=Pass|from=core|type=component|relatedDocs={[{name:"three.js post-processing tutorial",url:"https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing"}]}

By default, threlte will render using the regular WebGLRenderer. If any Pass is added to the scene, the `EffectComposer` will take over the rendering. A default `RenderPass` is added automatically and rendered before any `<Pass>`.
!!!

### Example

```svelte
<script>
  import { Pass } from '@threlte/core'
  import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
</script>

<Pass pass={new GlitchPass()}>
```

### Properties

```ts
// required
pass: THREE.Pass
```
