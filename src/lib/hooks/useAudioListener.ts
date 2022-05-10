import type { AudioListener } from 'three'
import { useThrelteAudio } from './useThrelteAudio'

export function useAudioListener(id?: string): { listener: AudioListener; context: AudioContext }
export function useAudioListener<T extends unknown>(
  callback: (args: { listener: AudioListener; context: AudioContext }) => T,
  id?: string
): T
export function useAudioListener<T extends unknown>(
  callbackOrId: ((args: { listener: AudioListener; context: AudioContext }) => T) | string,
  id?: string
): T | { listener: AudioListener; context: AudioContext } {
  const audioCtx = useThrelteAudio()
  if (!audioCtx) {
    throw new Error(
      'No threlte audio context found, "useAudioListener" can only be used in a child component of <Canvas>'
    )
  }
  if (typeof callbackOrId === 'string') {
    const listener = audioCtx.getAudioListener(callbackOrId)
    if (!listener) throw new Error('No AudioListener found.')
    return {
      listener,
      context: listener.context
    }
  } else {
    const listener = audioCtx.getAudioListener(id)
    if (!listener) throw new Error('No AudioListener found.')
    return callbackOrId({
      listener,
      context: listener.context
    })
  }
}
