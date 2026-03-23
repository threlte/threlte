import type { Props } from '@threlte/core'
import type { PositionalAudio as ThreePositionalAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio.js'

export type PositionalAudioProps = Props<ThreePositionalAudio> &
  CommonAudioProps & {
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
