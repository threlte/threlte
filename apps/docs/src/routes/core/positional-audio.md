---
title: PositionalAudio
---

<script lang="ts">
import Example from '$examples/core/positional-audio/App.svelte'
</script>

!!!module_summary title=PositionalAudio|sourcePath=audio/PositionalAudio.svelte|name=PositionalAudio|from=core|type=component|relatedDocs={[{name:"three.js PositionalAudio reference",url:"https://threejs.org/docs/#api/en/audio/PositionalAudio"}]}

:::deprecated moveToExtras=true
:::

Creates a positional audio entity.
This uses the [Web Audio API](https://developer.mozilla.org/en-US/Web/API/Web_Audio_API).

:::admonition type="tip"
You need to have an `<AudioListener>` component in your scene in order to use `<Audio>`and `<PositionalAudio>`components.
:::

<ExampleWrapper playgroundHref="/core/positional-audio">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/positional-audio/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/positional-audio/Scene.svelte)
@[code svelte|title=Turntable.svelte](../../examples/core/positional-audio/Turntable.svelte)
@[code svelte|title=Disc.svelte](../../examples/core/positional-audio/Disc.svelte)
@[code svelte|title=Button.svelte](../../examples/core/positional-audio/Button.svelte)
@[code svelte|title=Speaker.svelte](../../examples/core/positional-audio/Speaker.svelte)

</div>
</ExampleWrapper>

<small>Music: <a href="https://legrisch.com" target="_blank">legrisch</a></small>

!!!

### Example

```svelte
<script>
  import { T, Canvas, AudioListener, PositionalAudio } from '@threlte/core'
  import Car from './Car.svelte'
</script>

<Canvas>
  <T.PerspectiveCamera position={[3, 3, 3]} lookAt={[0, 0, 0]}>
    <AudioListener />
  </T.PerspectiveCamera>

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
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
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
