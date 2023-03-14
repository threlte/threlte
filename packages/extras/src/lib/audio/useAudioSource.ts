import { useLoader } from '@threlte/core'
import { writable } from 'svelte/store'
import { Audio, AudioLoader, PositionalAudio } from 'three'

export type AudioSource =
  | string
  | AudioBuffer
  | HTMLMediaElement
  | AudioBufferSourceNode
  | MediaStream

export const useAudioSource = <T extends Audio<GainNode> | PositionalAudio>(audio: T) => {
  const loader = useLoader(AudioLoader)

  const loaded = writable(false)

  const setSource = async (source: AudioSource) => {
    loaded.set(false)
    if (typeof source === 'string') {
      const audioBuffer = await loader.load(source)
      audio.setBuffer(audioBuffer)
    } else if (source instanceof AudioBuffer) {
      audio.setBuffer(source)
    } else if (source instanceof HTMLMediaElement) {
      audio.setMediaElementSource(source)
    } else if (source instanceof AudioBufferSourceNode) {
      audio.setNodeSource(source)
    } else if (source instanceof MediaStream) {
      audio.setMediaStreamSource(source)
    }
    loaded.set(true)
  }

  return {
    setSource,
    loaded
  }
}
