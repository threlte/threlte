import type { Props } from '@threlte/core'
import type { Audio, PositionalAudio as ThreePositionalAudio } from 'three'
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

    pause?: () => Audio<GainNode> | ThreePositionalAudio
    play?: () => Promise<Audio<GainNode> | ThreePositionalAudio | undefined>
    stop?: () => Audio<GainNode> | ThreePositionalAudio
  }
