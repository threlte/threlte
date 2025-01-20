import type { Props } from '@threlte/core'
import type { Group, ColorRepresentation } from 'three'

export type ContactShadowsProps = Props<Group> & {
  /**
   * @default 1
   */
  opacity?: number

  /**
   * @default 1
   */
  width?: number

  /**
   * @default 1
   */
  height?: number

  /**
   * @default 1
   */
  blur?: number

  /**
   * @default 10
   */
  far?: number

  /**
   * @default true
   */
  smooth?: boolean

  /**
   * @default 512
   */
  resolution?: number

  /**
   * @default Infinity
   */
  frames?: number

  /**
   * @default 10
   */
  scale?: number | [x: number, y: number]

  /**
   * @default '#000000'
   */
  color?: ColorRepresentation

  /**
   * @default false
   */
  depthWrite?: boolean
}
