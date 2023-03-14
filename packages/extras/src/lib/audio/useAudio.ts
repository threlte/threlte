import type { PositionalAudio, Audio } from 'three'

export type AudioVolume = number | undefined

export const useAudioVolume = <T extends Audio<GainNode> | PositionalAudio>(audio: T) => {
  const setVolume = (volume: AudioVolume) => {
    audio.setVolume(volume ?? 1)
  }

  return {
    setVolume
  }
}

export type AudioPlaybackRate = number | undefined

export const useAudioPlaybackRate = <T extends Audio<GainNode> | PositionalAudio>(audio: T) => {
  const setPlaybackRate = (playbackRate: AudioPlaybackRate) => {
    audio.setPlaybackRate(playbackRate ?? 1)
  }

  return {
    setPlaybackRate
  }
}
