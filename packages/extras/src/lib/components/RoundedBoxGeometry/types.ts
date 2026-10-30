import type { OmitProps, Props } from '@threlte/core'
import type { ExtrudeGeometry } from 'three'

export interface RoundedBoxGeometryProps extends OmitProps<Props<ExtrudeGeometry>, 'args'> {
  /**
   * @default []
   */
  args?: [width?: number, height?: number, depth?: number] | []

  /**
   * @default 0.05
   */
  radius?: number

  /**
   * @default 4
   */
  smoothness?: number

  /**
   * @default 0.4
   */
  creaseAngle?: number

  /**
   * @default 1
   */
  steps?: number
}
