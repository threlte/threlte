import type { CanvasTexture } from 'three'
import type { ColorStop } from '../types.js'
import type { Props } from '@threlte/core'

export interface LinearGradientTextureProps extends Props<CanvasTexture<OffscreenCanvas>> {
  /**
   * The x coordinate of the gradient's start point, in canvas pixels.
   * @default 0
   */
  startX?: number

  /**
   * The y coordinate of the gradient's start point, in canvas pixels.
   * @default 0
   */
  startY?: number

  /**
   * The x coordinate of the gradient's end point, in canvas pixels.
   * @default 0
   */
  endX?: number

  /**
   * The y coordinate of the gradient's end point, in canvas pixels. The
   * default runs the gradient from top to bottom.
   * @default height
   */
  endY?: number

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
   * The colors of the gradient, each at an `offset` from `0` (start) to `1`
   * (end).
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop
   * @default [{ offset: 0, color: 'black' }, { offset: 1, color: 'white' }]
   */
  stops?: ColorStop[]
}
