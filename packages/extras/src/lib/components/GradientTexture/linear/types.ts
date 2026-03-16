import type { CanvasTexture } from 'three'
import type { ColorStop } from '../types.js'
import type { Props } from '@threlte/core'

export type LinearGradientTextureProps = Props<CanvasTexture> & {
  /**
   * x-axis coordinate of the gradient's start point
   * @default 0
   */
  startX?: number

  /**
   * y-axis coordinate of the gradient's start point
   * @default 0
   */
  startY?: number

  /**
   * x-axis coordinate of the gradient's end point
   * @default 0
   */
  endX?: number

  /**
   * y-axis coordinate of the gradient's end point
   * @default height
   */
  endY?: number

  /**
   * height of the underlying canvas
   * @default 1024
   */
  width?: number

  /**
   * width of the underlying canvas
   * @default 1024
   */
  height?: number

  /**
   * stop offsets for the gradient. @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
   * @default [ { offset: 0, color: 'black' }, { offset: 1, color: 'white' } ]
   */
  stops?: ColorStop[]
}
