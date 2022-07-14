---
title: PositionalAudioHelper
---

!!!module_summary title=PositionalAudioHelper|sourcePath=helpers/PositionalAudioHelper.svelte|name=PositionalAudioHelper|from=core|type=component
This helper displays the directional cone of a [`<PositionalAudio>`](/components/43-positional-audio) component and needs to be a direct child it.
!!!

### Example

```svelte
<script>
  import { PositionalAudio, PositionalAudioHelper } from 'threlte'
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
