import type { CanvasTexture } from 'three'
import type { ColorStop, RadialGradientOuterRadius } from '../types.js'
import type { Props } from '@threlte/core'

export interface RadialGradientTextureProps extends Props<CanvasTexture<OffscreenCanvas>> {
  /**
   * The radius of the circle the gradient starts at, in canvas pixels,
   * centered on the canvas.
   * @default 0
   */
  innerRadius?: number

  /**
   * The radius of the circle the gradient ends at, in canvas pixels.
   * `'auto'` reaches the canvas corners.
   * @default 'auto'
   */
  outerRadius?: RadialGradientOuterRadius

  /**
   * The width of the canvas the gradient is drawn on, in pixels.
   * @default 1024
   */
  width?: number

  /**
   * The height of the canvas the gradient is drawn on, in pixels.
   * @default 1024
   */
  height?: number

  /**
   * The colors of the gradient, each at an `offset` from `0` (inner circle)
   * to `1` (outer circle).
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop
   * @default [{ offset: 0, color: 'black' }, { offset: 1, color: 'white' }]
   */
  stops?: ColorStop[]
}
