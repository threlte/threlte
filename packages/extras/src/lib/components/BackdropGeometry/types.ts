import type { Props } from '@threlte/core'
import type { PlaneGeometry } from 'three'

export interface BackdropGeometryProps extends Props<PlaneGeometry> {
  /**
   * Length of the flat floor section before the curve
   * @default 1
   */
  length?: number

  /**
   * Number of segments
   * @default 20
   */
  segments?: number
}
