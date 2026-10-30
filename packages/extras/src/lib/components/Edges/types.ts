import type { Props } from '@threlte/core'
import type { ColorRepresentation, LineSegments } from 'three'

export interface EdgesProps extends Props<LineSegments> {
  /**
   * @default 1
   */
  thresholdAngle?: number
  /**
   * @default '#ffffff'
   */
  color?: ColorRepresentation
}
