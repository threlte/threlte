import type { Props } from '@threlte/core'
import type { ExtrudeGeometry } from 'three'

export type RoundedBoxGeometryProps = Omit<Props<ExtrudeGeometry>, 'args'> & {
  /** [Width, height, depth]
   * @default [1,1,1]
   */
  args?: [width?: number, height?: number, depth?: number]

  /** Radius of the rounded corners.
   * @default 0.05
   */
  radius?: number

  /** The number of curve segments.
   * @default 4
   */
  smoothness?: number

  /** Smooth normals everywhere except faces that meet at an angle greater than the crease angle.
   * @default 0.4
   */
  creaseAngle?: number

  /** Number of points used for subdividing segments along the depth of the extruded spline.
   * @default 1
   */
  steps?: number
}
