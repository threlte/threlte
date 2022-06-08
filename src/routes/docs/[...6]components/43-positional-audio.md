---
title: PositionalAudio
---

!!!module_summary title=PositionalAudio|sourcePath=audio/PositionalAudio.svelte|name=PositionalAudio|from=threlte|type=component|divider=false
Creates a positional audio entity.  
This uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

:::admonition type="tip"
You need to have an `<AudioListener>` component in your scene in order to use `<Audio>`and `<PositionalAudio>`components.
:::
!!!

<script lang="ts">
import Wrapper from '$examples/audio/Wrapper.svelte'
</script>

<ExampleWrapper>
  <Wrapper /> 
</ExampleWrapper>

<p class="!mb-0">
  <small>Music: <a href="https://legrisch.com" target="_blank">legrisch</a></small>
</p>

<details>
  <summary>Show code</summary>

@[code svelte|title=Wrapper.svelte](../../../examples/audio/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../examples/audio/Scene.svelte)
@[code svelte|title=Turntable.svelte](../../../examples/audio/Turntable.svelte)
@[code svelte|title=Disc.svelte](../../../examples/audio/Disc.svelte)
@[code svelte|title=Button.svelte](../../../examples/audio/Button.svelte)
@[code svelte|title=Speaker.svelte](../../../examples/audio/Speaker.svelte)

</details>

---

### Example

```svelte
<script>
  import { Canvas, PerspectiveCamera, AudioListener, PositionalAudio } from 'threlte'
  import Car from '$components/Car.svelte'
</script>

<Canvas>
  <PerspectiveCamera position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }}>
    <AudioListener />
  </PerspectiveCamera>

  <Car>
    <PositionalAudio autostart loop refDistance={10} volume={0.2} source={'/audio/car-noise.mp3'} />
  </Car>
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
directionalCone:
  | {
      coneInnerAngle: number
      coneOuterAngle: number
      coneOuterGain: number
    }
  | undefined = undefined
refDistance: number | undefined = undefined
rolloffFactor: number | undefined = undefined
distanceModel: string | undefined = undefined
maxDistance: number | undefined = undefined
```

### Bindings

```ts
audio: THREE.PositionalAudio
inViewport: boolean
play: (delay?: number) => Promise<THREE.PositionalAudio>
pause: () => THREE.PositionalAudio
stop: () => THREE.PositionalAudio
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
load: AudioBuffer
progress: ProgressEvent<EventTarget>
error: ErrorEvent
```
