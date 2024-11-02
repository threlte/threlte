import type { Props } from '@threlte/core'
import type { Points } from 'three'

export type StarsProps = Props<Points> & {
  /**
   * @default 50
   */
  radius?: number

  /**
   * @default 50
   */
  depth?: number

  /**
   * @default 5000
   */
  count?: number

  /**
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

  /**
   * @default true
   */
  fade?: boolean

  /**
   * @default 1
   */
  speed?: number

  /**
   * @default 1.0
   */
  opacity?: number
}
