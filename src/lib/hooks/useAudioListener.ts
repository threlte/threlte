import type { AudioListener } from 'three'
import { useThrelteAudio } from './useThrelteAudio'

/**
 * Convenience Hook to get a THREE.AudioListener
 * @param id
 */
export function useAudioListener(id?: string): { listener: AudioListener; context: AudioContext }
/**
 * Convenience hook to operate on a requested THREE.AudioListener and return
 * a dependency such as a filter.
 * ### Example
 * ```
 * const filter = useAudioListener(({ listener, context }) => {
 *   return context.createBiquadFilter()
 * })
 * ```
 * @param callback
 * @param id
 */
export function useAudioListener<T extends unknown>(
  callback: (args: { listener: AudioListener; context: AudioContext }) => T,
  id?: string
): T
export function useAudioListener<T extends unknown>(
  callbackOrId?: ((args: { listener: AudioListener; context: AudioContext }) => T) | string,
  id?: string
): T | { listener: AudioListener; context: AudioContext } {
  const audioCtx = useThrelteAudio()
  if (!audioCtx) {
    throw new Error(
      'No threlte audio context found, "useAudioListener" can only be used in a child component of <Canvas>'
    )
  }
  if (callbackOrId && typeof callbackOrId === 'string') {
    const listener = audioCtx.getAudioListener(callbackOrId)
    if (!listener) throw new Error('No AudioListener found.')
    return {
      listener,
      context: listener.context
    }
  } else if (callbackOrId && typeof callbackOrId === 'function') {
    const listener = audioCtx.getAudioListener(id)
    if (!listener) throw new Error('No AudioListener found.')
    return callbackOrId({
      listener,
      context: listener.context
    })
  } else {
    const listener = audioCtx.getAudioListener()
    if (!listener) throw new Error('No AudioListener found.')
    return {
      listener,
      context: listener.context
    }
  }
}
