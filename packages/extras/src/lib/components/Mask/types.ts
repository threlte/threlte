import type { Props } from '@threlte/core'
import type { Mesh } from 'three'

export interface MaskProps extends Props<Mesh> {
  /**
   * The stencil value this mask writes. Objects using `useMask` with the same
   * id are clipped to it, and several masks may share an id to form a
   * compound mask.
   * @default 1
   */
  id?: number

  /**
   * Draws the mask's own material to the color buffer. When `false`, the
   * mask itself is invisible.
   * @default false
   */
  colorWrite?: boolean

  /**
   * Writes the mask's depth to the depth buffer, so it can hide objects
   * behind it.
   * @default false
   */
  depthWrite?: boolean
}
