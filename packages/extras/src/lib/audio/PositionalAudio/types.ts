import type { Props } from '@threlte/core'
import type { PositionalAudio as ThreePositionalAudio } from 'three'

export type PositionalAudioProps = Props<ThreePositionalAudio> & {
  src: string | AudioBuffer | HTMLMediaElement | AudioBufferSourceNode | MediaStream
  autoplay?: boolean
  loop?: boolean
  volume?: number
  playbackRate?: number
  detune?: number
  /** The id of the AudioListener this Audio will be attached to.
   * @default default
   */
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
