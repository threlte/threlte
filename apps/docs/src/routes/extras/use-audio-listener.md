---
title: useAudioListener
---

!!!module_summary title=useAudioListener|sourcePath=audio/useAudioListener.ts|name=useAudioListener|from=extras|type=hook|needsContext=true

Components like `<Audio>` and `<PositionalAudio>` use the Web Audio API and therefore you may find yourself in situations where the `AudioContext` is important to create e.g. a `BiquadFilterNode`.
!!!

### Examples <!-- omit in toc -->

```ts
import { useAudioListener } from '@threlte/extras'

// Retrieve a THREE.AudioListener which hasn't
// been assigned an id: <AudioListener />
const { context, listener } = useAudioListener()
// -> { context: AudioContext, listener: THREE.AudioListener }

// Retrieve a THREE.AudioListener which has
// been assigned an id: <AudioListener id="left-ear" />
const { context, listener } = useAudioListener('left-ear')
// -> { context: AudioContext, listener: THREE.AudioListener }

// Use a THREE.AudioListener and the underlying
// AudioContext to construct e.g. a filter. You
// may also pass a listener id as the second argument.
const filter = useAudioListener(({ context }) => {
	return context.createBiquadFilter()
})
// -> BiquadFilterNode
```
