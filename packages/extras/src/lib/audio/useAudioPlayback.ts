import { watch } from '@threlte/core'
import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import type { PositionalAudio, Audio } from 'three'

export const useAudioPlayback = <T extends Audio<GainNode> | PositionalAudio>(audio: T) => {
  const loaded = writable(false)
  const autoplay = writable(false)
  const shouldPlay = writable(false)

  const play = async (delay?: number | any) => {
    if (audio.context.state !== 'running') {
      await audio.context.resume()
    }
    return audio.play(delay)
  }

  const pause = () => {
    return audio.pause()
  }

  const stop = () => {
    if (!audio.source) return audio
    return audio.stop()
  }

  const setAutoPlay = (value?: boolean) => {
    autoplay.set(value ?? false)
  }

  const setLoaded = (value: boolean) => {
    loaded.set(value)
  }

  watch([loaded, autoplay, shouldPlay], ([loaded, autoplay, shouldPlay]) => {
    if (!loaded) {
      if (audio.isPlaying) stop()
      return
    }
    if (autoplay || shouldPlay) {
      play()
    }
  })

  onDestroy(() => {
    if (audio.isPlaying) stop()
    if (audio.source) audio.disconnect()
  })

  return {
    play,
    pause,
    stop,
    setAutoPlay,
    setLoaded
  }
}
