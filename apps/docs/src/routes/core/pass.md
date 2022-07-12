---
title: Pass
---

!!!module_summary title=Pass|sourcePath=effects/Pass.svelte|name=Pass|from=threlte|type=component
By default, threlte will render using the regular WebGLRenderer. If any Pass is added to the scene, the `EffectComposer` will take over the rendering. A default `RenderPass` is added automatically and rendered before any `<Pass>`.
!!!

### Example

```svelte
<script>
  import { Pass } from 'threlte'
  import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
</script>

<Pass pass={new GlitchPass()}>
```

### Properties

```ts
// required
pass: THREE.Pass
```
