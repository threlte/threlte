import type { CanvasTexture } from 'three'
import type { GradientStop, RadialGradientOuterRadius } from '../types'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type RadialGradientTextureProps = Props<CanvasTexture> & {
  innerRadius?: number
  outerRadius?: RadialGradientOuterRadius
  /**
   * height of the underlying canvas
   */
  width?: number
  /**
   * width of the underlying canvas
   */
  height?: number
  /**
   * stop offsets for the gradient. @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
   */
  stops?: GradientStop[]
}

export default class RadialGradientTexture extends SvelteComponent<RadialGradientTextureProps> {}
