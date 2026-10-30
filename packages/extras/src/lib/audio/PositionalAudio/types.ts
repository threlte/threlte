import type { OmitProps, Props } from '@threlte/core'
import type { PositionalAudio as ThreePositionalAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio.svelte.js'

export interface PositionalAudioProps
  extends OmitProps<Props<ThreePositionalAudio>, keyof CommonAudioProps>, CommonAudioProps {
  id?: string
  refDistance?: number
  rolloffFactor?: number
  distanceModel?: 'linear' | 'inverse' | 'exponential'
  maxDistance?: number
  directionalCone?: {
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
  }
}
