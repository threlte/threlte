---
title: AudioInstance
---

!!!module_summary title=AudioInstance|sourcePath=instances/AudioInstance.svelte|name=AudioInstance|from=threlte|type=component
This component lets you use any manually instantiated object that extends `THREE.Audio` in threlte.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { AudioInstance, useAudioListener } from 'threlte'
  import { Audio } from 'three'

  export let buffer: AudioBuffer

  const { listener } = useAudioListener()
  const audio = new Audio(listener)
  audio.setBuffer(buffer)
</script>

<AudioInstance {audio} />
```

### Properties <!-- omit in toc -->

```ts
// required
audio: THREE.Audio | THREE.PositionalAudio

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

### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
play: (delay?: number) => Promise<THREE.Audio | THREE.PositionalAudio>
pause: () => THREE.Audio | THREE.PositionalAudio
stop: () => THREE.Audio | THREE.PositionalAudio
```

### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
load: AudioBuffer
progress: ProgressEvent<EventTarget>
error: ErrorEvent
```
