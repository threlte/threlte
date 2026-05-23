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
   * width of the texture's canvas
   * @default 1024
   */
  width?: number

  /**
   * height of the texture's canvas
   * @default 1024
   */
  height?: number

  /**
   * stop offsets for the gradient. @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
   * @default [ { color: 'black', offset: 0, }, { color: 'white', offset: 1 } ]
   */
  stops?: ColorStop[]
}
