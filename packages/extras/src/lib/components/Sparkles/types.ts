import type { Props } from '@threlte/core'
import type { ColorRepresentation, Points } from 'three'

export interface SparklesProps extends Props<Points> {
  /**
   * Number of particles.
   *
   * @default 100
   */
  count?: number

  /**
   * Speed of particles.
   *
   * @default 1
   */
  speed?: number | Float32Array

  /**
   * Opacity of particles.
   *
   * @default 1
   */
  opacity?: number | Float32Array

  /**
   * Color of particles.
   */
  color?: ColorRepresentation | Float32Array

  /**
   * Size of particles.
   *
   * @default randomized between 0 and 1
   */
  size?: number | Float32Array

  /**
   * The space the particles occupy
   *
   * @default 1
   */
  scale?: number | [number, number, number]

  /**
   * Movement factor
   *
   * @default 1
   */
  noise?: number | [number, number, number] | Float32Array

  material?: never
  geometry?: never
}
