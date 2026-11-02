import type { OmitProps, Props } from '@threlte/core'
import type { PositionalAudio as ThreePositionalAudio } from 'three'
import type { AudioProps as CommonAudioProps } from '../utils/useAudio.svelte.js'

export interface PositionalAudioProps
  extends OmitProps<Props<ThreePositionalAudio>, keyof CommonAudioProps>, CommonAudioProps {
  /**
   * The `id` of the `<AudioListener>` to play through.
   * @default 'default'
   */
  id?: string

  /**
   * The distance at which the volume starts to fall off.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance
   * @default 1
   */
  refDistance?: number

  /**
   * How quickly the volume falls off with distance.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/rolloffFactor
   * @default 1
   */
  rolloffFactor?: number

  /**
   * The formula used to reduce the volume with distance.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel
   * @default 'inverse'
   */
  distanceModel?: 'linear' | 'inverse' | 'exponential'

  /**
   * The distance beyond which the volume stops falling off. Only used by the
   * `'linear'` distance model.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance
   * @default 10000
   */
  maxDistance?: number

  /**
   * Makes the sound directional, pointing along the object's forward axis.
   * Inside `coneInnerAngle` (degrees) the volume is unchanged, outside
   * `coneOuterAngle` it is multiplied by `coneOuterGain`, and it blends in
   * between. Omnidirectional when not set.
   */
  directionalCone?: {
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
  }
}
