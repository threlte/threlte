import type { CanvasTexture } from 'three'
import type { ColorStop, RadialGradientOuterRadius } from '../types.js'
import type { Props } from '@threlte/core'

export type RadialGradientTextureProps = Props<CanvasTexture> & {
  /**
   * inner radius of the gradient
   * @default 0
   */
  innerRadius?: number
  /**
   * outer radius of the gradient
   * @default 'auto'
   */
  outerRadius?: RadialGradientOuterRadius
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
