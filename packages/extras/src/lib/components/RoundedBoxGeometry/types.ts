import type { OmitProps, Props } from '@threlte/core'
import type { ExtrudeGeometry } from 'three'

export interface RoundedBoxGeometryProps extends OmitProps<Props<ExtrudeGeometry>, 'args'> {
  /**
   * The width, height and depth of the box. Missing values are `1`.
   * @default [1, 1, 1]
   */
  args?: [width?: number, height?: number, depth?: number] | []

  /**
   * The radius of the rounded edges and corners.
   * @default 0.05
   */
  radius?: number

  /**
   * The number of segments used to round each edge. Higher values are
   * smoother.
   * @default 4
   */
  smoothness?: number

  /**
   * Normals are smoothed everywhere except where faces meet at a sharper
   * angle than this, in radians.
   * @default 0.4
   */
  creaseAngle?: number

  /**
   * The number of segments along the box's depth.
   * @default 1
   */
  steps?: number
}
