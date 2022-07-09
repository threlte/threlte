import { getContext } from 'svelte'
import type { ThrelteAudioContext } from '../types/types'

export const useThrelteAudio = (): ThrelteAudioContext => {
  return getContext<ThrelteAudioContext>('threlte-audio-context')
}
