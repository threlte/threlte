import { createRawEventDispatcher, currentWritable, useLoader, watch } from '@threlte/core'
import { onDestroy } from 'svelte'
import { AudioLoader, type Audio, type PositionalAudio } from 'three'

type AudioSource = string | AudioBuffer | HTMLMediaElement | AudioBufferSourceNode | MediaStream
type AudioVolume = number | undefined
type AudioPlaybackRate = number | undefined

export type AudioProps = {
  src: AudioSource
  autoplay?: boolean
  loop?: boolean
  volume?: AudioVolume
  playbackRate?: AudioPlaybackRate
  detune?: number
}

export type AudioEvents = {
  load: AudioBuffer | void
  progress: ProgressEvent<EventTarget>
  error: ErrorEvent
}

/**
 * This hook handles basic audio functionality.
 * It’s used by the <Audio> and <PositionalAudio> components.
 */
export const useAudio = <T extends Audio<GainNode> | PositionalAudio>(audio: T) => {
  const loaded = currentWritable(false)
  const autoplay = currentWritable(false)
  const shouldPlay = currentWritable(false)
  let audioDestroyed = false

  const loader = useLoader(AudioLoader)

  const dispatch = createRawEventDispatcher<AudioEvents>()

  const setSrc = async (source: AudioProps['src']) => {
    loaded.set(false)
    try {
      if (typeof source === 'string') {
        const audioBuffer = await loader.load(source, {
          onProgress(event) {
            dispatch('progress', event)
          }
        })
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
      audio.source?.buffer ? dispatch('load', audio.source.buffer) : dispatch('load')
    } catch (error) {
      dispatch('error', error as ErrorEvent)
    }
  }

  const setVolume = (volume: AudioProps['volume']) => {
    audio.setVolume(volume ?? 1)
  }

  const setPlaybackRate = (playbackRate: AudioProps['playbackRate']) => {
    audio.setPlaybackRate(playbackRate ?? 1)
  }

  const play = async (delay?: number | any) => {
    // source is not loaded yet, so we should play it after it's loaded
    if (!loaded.current) {
      shouldPlay.set(true)
      return
    }
    if (audio.context.state !== 'running') {
      await audio.context.resume()
      if (audioDestroyed) {
        return
      }
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

  const setAutoPlay = (value?: AudioProps['autoplay']) => {
    autoplay.set(value ?? false)
  }

  const setDetune = (value?: AudioProps['detune']) => {
    if (audio.source && audio.source.detune) {
      audio.setDetune(value ?? 0)
    }
  }

  const setLoop = (value?: AudioProps['loop']) => {
    audio.setLoop(value ?? false)
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
    try {
      audioDestroyed = true
      stop()
    } catch (error) {
      console.warn('Error while destroying audio', error)
    }
  })

  return {
    setVolume,
    setSrc,
    setPlaybackRate,
    setAutoPlay,
    setDetune,
    setLoop,
    play,
    pause,
    stop
  }
}
