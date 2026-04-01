import { useLoader } from '@threlte/core'
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
export const useAudio = <T extends Audio<GainNode> | PositionalAudio>(
  audio: () => T,
  src: () => AudioProps['src'],
  props: {
    onprogress?: (event: ProgressEvent) => void
    onload?: (event: AudioBuffer | null) => void
    onerror?: (event: ErrorEvent) => void
  }
) => {
  let loaded = $state(false)
  let shouldPlay = $state(false)
  let audioDestroyed = false

  const loader = useLoader(AudioLoader)

  const play = async (delay?: number) => {
    const currentAudio = audio()

    // source is not loaded yet, so we should play it after it's loaded
    if (!loaded) {
      shouldPlay = true
      return
    }

    if (currentAudio.context.state !== 'running') {
      await currentAudio.context.resume()
      if (audioDestroyed) {
        return
      }
    }

    return currentAudio.play(delay)
  }

  $effect(() => {
    const load = async () => {
      const source = src()
      const currentAudio = audio()

      loaded = false
      try {
        if (typeof source === 'string') {
          const audioBuffer = await loader.load(source, {
            onProgress(event) {
              props.onprogress?.(event)
            }
          })
          currentAudio.setBuffer(audioBuffer)
        } else if (source instanceof AudioBuffer) {
          currentAudio.setBuffer(source)
        } else if (source instanceof HTMLMediaElement) {
          currentAudio.setMediaElementSource(source)
        } else if (source instanceof AudioBufferSourceNode) {
          currentAudio.setNodeSource(source)
        } else if (source instanceof MediaStream) {
          currentAudio.setMediaStreamSource(source)
        }

        loaded = true

        props.onload?.(currentAudio.buffer)
      } catch (error) {
        props.onerror?.(error as ErrorEvent)
      }
    }

    load()
  })

  $effect.pre(() => {
    const currentAudio = audio()

    if (!loaded) {
      if (currentAudio.isPlaying) {
        currentAudio.stop()
      }
      return
    }

    if (shouldPlay) {
      play()
    }
  })

  $effect(() => {
    return () => {
      try {
        audioDestroyed = true
        stop()
      } catch (error) {
        console.warn('Error while destroying audio', error)
      }
    }
  })

  return play
}
