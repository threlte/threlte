import type { Props } from '@threlte/core'
import type { ColorRepresentation, Points } from 'three'

export interface SparklesProps extends Props<Points> {
  /**
   * The number of particles.
   * @default 100
   */
  count?: number

  /**
   * How fast the particles move. A number applies to every particle, and a
   * `Float32Array` sets one value per particle.
   * @default a random value per particle, between 0 and 1
   */
  speed?: number | Float32Array

  /**
   * The opacity of the particles. A number applies to every particle, and a
   * `Float32Array` sets one value per particle.
   * @default a random value per particle, between 0 and 1
   */
  opacity?: number | Float32Array

  /**
   * The color of the particles. A `Float32Array` sets an RGB triplet per
   * particle.
   * @default 'white'
   */
  color?: ColorRepresentation | Float32Array

  /**
   * The size of the particles. A number applies to every particle, and a
   * `Float32Array` sets one value per particle.
   * @default a random value between 0 and 1, shared by every particle
   */
  size?: number | Float32Array

  /**
   * The size of the box the particles are spread across. A number sets all
   * three sides.
   * @default 1
   */
  scale?: number | [number, number, number]

  /**
   * How far the particles drift from their position. A number or tuple
   * applies to every particle, and a `Float32Array` sets an xyz triplet per
   * particle.
   * @default a random value per particle and axis, between 0 and 1
   */
  noise?: number | [number, number, number] | Float32Array

  /** Not supported. `<Sparkles>` creates its own material. */
  material?: never

  /** Not supported. `<Sparkles>` creates its own geometry. */
  geometry?: never
}
