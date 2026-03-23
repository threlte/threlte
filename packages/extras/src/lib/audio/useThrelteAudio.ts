import { useThrelteUserContext } from '@threlte/core'
import type { AudioListener } from 'three'

export type ThrelteAudioContext = {
  audioListeners: Map<string, AudioListener>
  getAudioListener: (id?: string) => AudioListener | undefined
  addAudioListener: (listener: AudioListener, id?: string) => void
  removeAudioListener: (id?: string) => void
}

const audioListeners = new Map()

const audioCtx: ThrelteAudioContext = {
  audioListeners,
  addAudioListener: (listener, id = 'default') => {
    if (audioListeners.has(id)) {
      console.warn(`An AudioListener with the id "${id}" has already been added, aborting.`)
      return
    }
    audioListeners.set(id, listener)
  },
  removeAudioListener: (id = 'default') => {
    if (!audioListeners.has(id)) {
      console.warn(`No AudioListener with the id "${id}" found, aborting.`)
      return
    }
    audioListeners.delete(id)
  },
  getAudioListener: (id = 'default') => {
    if (!audioListeners.has(id)) {
      console.warn(`No AudioListener with the id "${id}" found, aborting.`)
      return
    }
    return audioListeners.get(id)
  }
}

export function useThrelteAudio(): ThrelteAudioContext {
  return useThrelteUserContext<ThrelteAudioContext>('threlte-audio', audioCtx)
}
