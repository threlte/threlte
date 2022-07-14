---
title: useThrelteAudio
---

!!!module_summary title=useThrelteAudio|sourcePath=hooks/useThrelteAudio.ts|name=useThrelteAudio|from=core|type=hook|needsContext=true
This hook lets you consume the audio context. Although it can be useful, this is mostly used internally.
!!!

### Types

```ts
const {
	audioListeners, // Map<string, AudioListener>
	getAudioListener, // (id?: string) => AudioListener | undefined
	addAudioListener, // (listener: AudioListener, id?: string) => void
	removeAudioListener // (id?: string) => void
} = useThrelteAudio()
```
