---
title: AudioListener
---

!!!module_summary title=AudioListener|sourcePath=audio/AudioListener.svelte|name=AudioListener|from=threlte|type=component
The `<AudioListener>` represents a virtual listener of the all positional and non-positional audio effects in the scene.
An application usually creates a single `<AudioListener>` component. It is a mandatory component for audio components like `<Audio>` and `<PositionalAudio>`.
In most cases, the listener component is a child of the camera, so the 3D transformation of the camera represents the 3D transformation of the listener.
!!!

### Examples

```svelte
<script>
  import { Canvas, PerspectiveCamera, AudioListener } from 'threlte'
</script>

<Canvas>
  <PerspectiveCamera position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }}>
    <AudioListener />
  </PerspectiveCamera>
</Canvas>
```

You may pass an `id` to the `<AudioListener>` component in order to connect `<Audio>` and `<PositionalAudio>` components to specific `<AudioListener>` components:

```svelte
<script>
  import { Canvas, PerspectiveCamera, AudioListener, Audio } from 'threlte'
</script>

<Canvas>
  <PerspectiveCamera position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }}>
    <AudioListener id="left-ear" position={{ x: -1 }} />
    <AudioListener id="right-ear" position={{ x: 1 }} />
  </PerspectiveCamera>

  <Audio id="left-ear" source={'audio/left-track.mp3'} />
  <Audio id="right-ear" source={'audio/right-track.mp3'} />
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
id: string | undefined = undefined
masterVolume: number | undefined = undefined
```

### Bindings

```ts
listener: THREE.AudioListener
resumeContext: () => Promise<void>
```
