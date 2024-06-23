import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { PositionalAudio as ThreePositionalAudio } from 'three'
import type { AudioProps } from '../utils/useAudio'

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

export default class PositionalAudio extends SvelteComponent<PositionalAudioProps> {}
