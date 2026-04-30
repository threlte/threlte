import type { Props } from '@threlte/core'
import type { Points } from 'three'

export type StarsProps = Props<Points> & {
  /** Minimum distance of points to center
   * @default 50
   */
  radius?: number

  /** Radius + depth = maximum distance of points from center
   * @default 50
   */
  depth?: number

  /** Number of stars
   * @default 5000
   */
  count?: number

  /** Size of stars
   * @default 6
   */
  factor?: number

  /**
   * @default 1.0
   */
  saturation?: number

  /**
   * @default 0.8
   */
  lightness?: number

  /** If stars should fade at the edges (shows blurry circles instead of squares)
   * @default true
   */
  fade?: boolean

  /** Speed of blinking animation
   * @default 1
   */
  speed?: number

  /**
   * @default 1.0
   */
  opacity?: number
}
