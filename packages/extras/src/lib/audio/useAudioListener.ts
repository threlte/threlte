import type { AudioListener } from 'three'
import { useThrelteAudio } from './useThrelteAudio.js'

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
export function useAudioListener<T>(
  callback: (args: { listener: AudioListener; context: AudioContext }) => T,
  id?: string
): T
export function useAudioListener<T>(
  callbackOrId?: ((args: { listener: AudioListener; context: AudioContext }) => T) | string,
  id?: string
): T | { listener: AudioListener; context: AudioContext } {
  const { getAudioListener } = useThrelteAudio()

  if (typeof callbackOrId === 'function') {
    const listener = getAudioListener(id)
    if (!listener) throw new Error('No AudioListener found.')
    return callbackOrId({
      listener,
      context: listener.context
    })
  }

  const listener = getAudioListener(callbackOrId)
  if (!listener) throw new Error('No AudioListener found.')
  return {
    listener,
    context: listener.context
  }
}
