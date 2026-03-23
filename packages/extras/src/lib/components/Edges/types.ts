import type { Props } from '@threlte/core'
import type { ColorRepresentation, LineSegments } from 'three'

export type EdgesProps = Props<LineSegments> & {
  /**
   * @default 1
   */
  thresholdAngle?: number
  /**
   * @default '#ffffff'
   */
  color?: ColorRepresentation
}
