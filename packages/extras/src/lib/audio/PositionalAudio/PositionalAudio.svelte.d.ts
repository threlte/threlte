import type { Events, Props } from '@threlte/core'
import type { Snippet, SvelteComponent } from 'svelte'
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
    children: PositionalAudioSnippet
  }

export type PositionalAudioEvents = Events<ThreePositionalAudio> & AudioEvents

export type PositionalAudioSnippet = Snippet<[{ ref: ThreePositionalAudio }]>

export default class PositionalAudio extends SvelteComponent<
  PositionalAudioProps,
  PositionalAudioEvents
> {}
