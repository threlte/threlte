import { useLoader } from '@threlte/core'
import { AudioLoader, type Audio, type PositionalAudio } from 'three'

type AudioSource = string | AudioBuffer | HTMLMediaElement | AudioBufferSourceNode | MediaStream

export interface AudioProps {
  /**
   * The audio to play: a URL (loaded with three's `AudioLoader`), a decoded
   * `AudioBuffer`, an `<audio>` or `<video>` element, an
   * `AudioBufferSourceNode`, or a `MediaStream` such as a microphone.
   */
  src: AudioSource

  /**
   * Starts playing as soon as `src` has loaded, resuming the audio context
   * if needed.
   * @default false
   */
  autoplay?: boolean

  /**
   * Restarts playback when the end is reached.
   * @default false
   */
  loop?: boolean

  /**
   * The gain, where `1` is the original volume and `0` is silent. Values
   * above `1` amplify and can clip.
   * @default 1
   */
  volume?: number

  /**
   * Playback speed, where `1` is normal speed. Also shifts the pitch.
   * @default 1
   */
  playbackRate?: number

  /**
   * Pitch shift in cents, where `100` is one semitone. Only applies once a
   * source is playing.
   * @default 0
   */
  detune?: number

  /** Called when `src` has loaded, with its buffer when it has one. */
  onload?: (buffer: AudioBuffer | null) => void

  /** Called when `src` fails to load. */
  onerror?: (event: ErrorEvent) => void

  /** Called with loading progress while a URL `src` downloads. */
  onprogress?: (event: ProgressEvent) => void
}

/**
 * This hook handles basic audio functionality.
 * It’s used by the <Audio> and <PositionalAudio> components.
 */
export const useAudio = <T extends Audio<GainNode> | PositionalAudio>(
  audio: () => T | undefined,
  src: () => AudioSource,
  autoplay: () => boolean,
  loop: () => boolean,
  volume: () => number,
  playbackRate: () => number,
  detune: () => number,
  props: () => {
    onload?: (buffer: AudioBuffer | null) => void
    onerror?: (event: ErrorEvent) => void
    onprogress?: (event: ProgressEvent) => void
  }
) => {
  let loaded = $state(false)
  let shouldPlay = $state(false)
  let audioDestroyed = false

  // @Todo: replace with an AbortController
  let audioEpoch = 0

  const isCurrentAudio = (currentAudio: T, epoch: number) => {
    return !audioDestroyed && epoch === audioEpoch && currentAudio === audio()
  }

  const stopAudio = (currentAudio: T | undefined) => {
    if (!currentAudio) return

    if (!currentAudio.source) {
      return currentAudio
    }

    return currentAudio.stop()
  }

  $effect(() => {
    const currentAudio = audio()
    audioEpoch += 1

    return () => {
      audioEpoch += 1
      try {
        stopAudio(currentAudio)
      } catch (error) {
        console.warn('Error while destroying audio', error)
      }
    }
  })

  $effect(() => {
    audio()?.setVolume(volume())
  })

  $effect(() => {
    audio()?.setPlaybackRate(playbackRate())
  })

  $effect(() => {
    const currentAudio = audio()
    if (currentAudio?.source && currentAudio.detune) {
      currentAudio.setDetune(detune())
    }
  })

  $effect(() => {
    audio()?.setLoop(loop())
  })

  $effect(() => {
    if (!loaded) {
      if (audio()?.isPlaying) stop()
      return
    }

    if (autoplay() || shouldPlay) {
      play()
    }
  })

  $effect(() => {
    audioEpoch += 1
    setSrc(src())
  })

  const loader = useLoader(AudioLoader)

  const setSrc = async (source: AudioProps['src']) => {
    loaded = false

    const currentAudio = audio()
    const epoch = audioEpoch

    if (!currentAudio) return

    const { onload, onprogress, onerror } = props()

    if (!isCurrentAudio(currentAudio, epoch)) return

    try {
      if (typeof source === 'string') {
        const audioBuffer = await loader.load(source, {
          onProgress(event) {
            onprogress?.(event)
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

      onload?.(currentAudio.buffer)
    } catch (error) {
      onerror?.(error as ErrorEvent)
    }
  }

  const play = async (delay?: number) => {
    // source is not loaded yet, so we should play it after it's loaded
    if (!loaded) {
      shouldPlay = true
      return
    }

    const currentAudio = audio()
    const epoch = audioEpoch

    if (!currentAudio) return

    if (currentAudio.context.state !== 'running') {
      await currentAudio.context.resume()

      if (!isCurrentAudio(currentAudio, epoch)) {
        return
      }
    }

    return currentAudio.play(delay)
  }

  const pause = () => {
    return audio()?.pause()
  }

  const stop = () => {
    return stopAudio(audio())
  }

  $effect(() => {
    return () => {
      audioDestroyed = true
    }
  })

  return {
    play,
    pause,
    stop
  }
}
