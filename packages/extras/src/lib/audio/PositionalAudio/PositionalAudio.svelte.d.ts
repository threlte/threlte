import type { Events, Props, Slots } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { PositionalAudio as ThreePositionalAudio } from 'three'
import type { AudioProps, AudioEvents } from '../utils/useAudio'

export type PositionalAudioProps = Props<ThreePositionalAudio> &
  AudioProps & {
    id?: string
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

export type PositionalAudioEvents = Events<ThreePositionalAudio> & AudioEvents

export type PositionalAudioSlots = Slots<ThreePositionalAudio>

export default class PositionalAudio extends SvelteComponent<
  PositionalAudioProps,
  PositionalAudioEvents,
  PositionalAudioSlots
> {}
