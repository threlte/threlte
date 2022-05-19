---
title: <PositionalAudio>
---

# \<PositionalAudio>

Creates a positional audio entity.

<!-- <script lang="ts">
import TurntableScene from '$examples/Turntable/Scene.svelte'
import ThrelteWrapper from '$examples/ThrelteWrapper.svelte'
</script>

# Audio

<ThrelteWrapper>
  <TurntableScene />
</ThrelteWrapper> -->

<small>Music by [le grisch](https://legrisch.com)</small>  
[Source](https://github.com/grischaerbe/threlte/tree/main/src/examples/Turntable)

:::admonition type="tip"
You need to have an `<AudioListener>` component in your scene in order to use `<Audio>`and `<PositionalAudio>`components.
:::

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
