---
title: AudioListener
---

!!!module_summary title=AudioListener|sourcePath=audio/AudioListener.svelte|name=AudioListener|from=extras|type=component|relatedDocs={[{name:"three.js AudioListener reference",url:"https://threejs.org/docs/#api/en/audio/AudioListener"}]}

The `<AudioListener>` represents a virtual listener of the all positional and non-positional audio effects in the scene.
An application usually creates a single `<AudioListener>` component. It is a mandatory component for audio components like `<Audio>` and `<PositionalAudio>`.
In most cases, the listener component is a child of the camera, so the 3D transformation of the camera represents the 3D transformation of the listener.
!!!

### Examples

```svelte
<script>
  import { T, Canvas } from '@threlte/core'
  import { AudioListener } from '@threlte/extras'
</script>

<Canvas>
  <T.PerspectiveCamera makeDefault position={[3, 3, 3]} lookAt={[0, 0, 0]}>
    <AudioListener />
  </T.PerspectiveCamera>
</Canvas>
```

You may pass an `id` to the `<AudioListener>` component in order to connect `<Audio>` and `<PositionalAudio>` components to specific `<AudioListener>` components:

```svelte
<script>
  import { T, Canvas } from '@threlte/core'
  import { Audio, AudioListener } from '@threlte/extras'
</script>

<Canvas>
  <T.PerspectiveCamera makeDefault position={[3, 3, 3]} lookAt={[0, 0, 0]}>
    <AudioListener id="left-ear" position={{ x: -1 }} />
    <AudioListener id="right-ear" position={{ x: 1 }} />
  </T.PerspectiveCamera>

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
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
id: string | undefined = undefined
masterVolume: number | undefined = undefined
```

### Bindings

```ts
listener: THREE.AudioListener
resumeContext: () => Promise<void>
```
