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
   * outer radius of the gradient. if set to 'auto', becomes the radius of the circle that circumscribes the canvas
   * @default 'auto'
   */
  outerRadius?: RadialGradientOuterRadius
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
   * @default [ { color: 'black', offset: 0  }, { color: 'white', offset: 1 } ]
   */
  stops?: ColorStop[]
}
