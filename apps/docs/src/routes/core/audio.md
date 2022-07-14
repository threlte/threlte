---
title: Audio
---

!!!module_summary title=Audio|sourcePath=audio/Audio.svelte|name=Audio|from=core|type=component
Create a non-positional (global) audio object.
This uses the [Web Audio API](https://developer.mozilla.org/en-US/Web/API/Web_Audio_API).

:::admonition type="tip"
You need to have an `<AudioListener>` component in your scene in order to use `<Audio>`and `<PositionalAudio>`components.
:::
!!!

### Example

```svelte
<script>
  import { Canvas, PerspectiveCamera, AudioListener, Audio } from 'threlte'
</script>

<Canvas>
  <PerspectiveCamera position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }}>
    <AudioListener />
  </PerspectiveCamera>

  <Audio source={'/audio/track.mp3'} />
</Canvas>
```

### Properties

```ts
// optional
viewportAware: boolean = false
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
autoplay: boolean | undefined = undefined
detune: number | undefined = undefined
source: string | AudioBuffer | HTMLMediaElement | AudioBufferSourceNode | MediaStream | undefined = undefined
volume: number | undefined = undefined
loop: boolean | undefined = undefined
filters: BiquadFilterNode[] | BiquadFilterNode | undefined = undefined
playbackRate: number | undefined = undefined
id: string | undefined = undefined
```

### Bindings

```ts
audio: THREE.Audio
inViewport: boolean
play: (delay?: number) => Promise<THREE.Audio>
pause: () => THREE.Audio
stop: () => THREE.Audio
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
load: AudioBuffer
progress: ProgressEvent<EventTarget>
error: ErrorEvent
```
