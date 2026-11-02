import type { Props } from '@threlte/core'
import type { ColorRepresentation, LineSegments } from 'three'

export interface EdgesProps extends Props<LineSegments> {
  /**
   * An edge of the parent mesh's geometry is only drawn when the angle
   * between the faces that share it exceeds this many degrees.
   * @default 1
   */
  thresholdAngle?: number

  /**
   * The color of the lines.
   * @default '#ffffff'
   */
  color?: ColorRepresentation
}
