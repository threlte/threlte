---
title: PositionalAudioHelper
---

!!!module_summary title=PositionalAudioHelper|sourcePath=helpers/PositionalAudioHelper.svelte|name=PositionalAudioHelper|from=core|type=component|relatedDocs={[{name:"three.js PositionalAudioHelper reference",url:"https://threejs.org/docs/examples/en/helpers/PositionalAudioHelper.html"}]}

:::deprecated moveToExtras=true
:::

This helper displays the directional cone of a [`<PositionalAudio>`](/core/positional-audio) component and needs to be a direct child it.
!!!

### Example

```svelte
<script>
  import { PositionalAudio, PositionalAudioHelper } from '@threlte/core'
</script>

<PositionalAudio
  directionalCone={{
    coneInnerAngle: 90,
    coneOuterAngle: 220,
    coneOuterGain: 0.3
  }}
  source={'/audio/some-track.mp3'}
>
  <PositionalAudioHelper />
</PositionalAudio>
```

### Properties

```ts
// required
pass: THREE.Pass
```
