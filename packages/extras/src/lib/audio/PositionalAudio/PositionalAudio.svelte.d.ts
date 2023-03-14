import type { Props, Events, Slots } from '@threlte/core'
import type { SvelteComponentTyped } from 'svelte'
import type { PositionalAudio as ThreePositionalAudio } from 'three'
import type { AudioSource } from '../useAudioSource'
import type { AudioVolume, AudioPlaybackRate } from '../useAudio'

export type PositionalAudioProps = Omit<Props<ThreePositionalAudio>, 'source'> & {
  source: AudioSource
  id?: string
  volume?: AudioVolume
  playbackRate?: AudioPlaybackRate
  autoplay?: boolean
  loop?: boolean

  refDistance?: number
  rolloffFactor?: number
  distanceModel?: string
  maxDistance?: number
  directionalCone?: {
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
  }
}

export type PositionalAudioEvents = Events<ThreePositionalAudio>

export type PositionalAudioSlots = Slots<ThreePositionalAudio>

export default class PositionalAudio extends SvelteComponentTyped<
  PositionalAudioProps,
  PositionalAudioEvents,
  PositionalAudioSlots
> {}
