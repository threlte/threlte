import type { Props } from '@threlte/core'
import type { Points } from 'three'

export interface StarsProps extends Props<Points> {
  /**
   * The minimum distance of the stars from the center.
   * @default 50
   */
  radius?: number

  /**
   * The thickness of the shell the stars are spread across, so they sit
   * between `radius` and `radius + depth` from the center.
   * @default 50
   */
  depth?: number

  /**
   * The number of stars.
   * @default 5000
   */
  count?: number

  /**
   * The size of the stars. Each star gets a random size between half and all
   * of it.
   * @default 6
   */
  factor?: number

  /**
   * The saturation of the stars' colors, which run through every hue.
   * @default 1
   */
  saturation?: number

  /**
   * The lightness of the stars' colors.
   * @default 0.8
   */
  lightness?: number

  /**
   * Fades each star out toward its edges, drawing a soft glow instead of a
   * hard shape.
   * @default true
   */
  fade?: boolean

  /**
   * How fast the stars twinkle. `0` keeps them still.
   * @default 0
   */
  speed?: number

  /**
   * The opacity of the stars.
   * @default 1
   */
  opacity?: number

  /**
   * Renders each point as an antialiased circle instead of a square.
   * Combine with `fade` for a soft halo, or disable `fade` for crisp filled discs.
   *
   * @default false
   */
  rounded?: boolean
}
