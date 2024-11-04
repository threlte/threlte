import type { Props } from '@threlte/core'
import type { ColorRepresentation, Group } from 'three'

export type OutlinesProps = Props<Group> & {
  /**
   * Outline color
   * @default black
   */
  color?: ColorRepresentation

  /**
   * Line thickness is independent of zoom
   * @default false
   */
  screenspace?: boolean

  /**
   * Outline opacity
   * @default 1
   */
  opacity?: number

  /**
   * Outline transparency
   * @default false
   */
  transparent?: boolean

  /**
   * Outline thickness
   * @default 0.05
   */
  thickness?: number

  /**
   * @default true
   */
  toneMapped?: boolean

  /**
   * Geometry crease angle (0 === no crease)
   * @default Math.PI
   */
  angle?: number

  /**
   * @default false
   */
  polygonOffset?: boolean

  /**
   * @default 0
   */
  polygonOffsetFactor?: number

  /**
   * @default 0
   */
  renderOrder?: number
}
