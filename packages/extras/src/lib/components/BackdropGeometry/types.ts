import type { Props } from '@threlte/core'
import type { PlaneGeometry } from 'three'

export interface BackdropGeometryProps extends Props<PlaneGeometry> {
  /**
   * How far the flat floor extends in front of the curve. The backdrop itself
   * is one unit wide, deep and tall, so scale the mesh to resize it.
   * @default 1
   */
  length?: number

  /**
   * The number of segments along each axis. More segments make the curve
   * smoother.
   * @default 20
   */
  segments?: number
}
