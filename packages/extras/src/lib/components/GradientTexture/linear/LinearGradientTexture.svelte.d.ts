import type { CanvasTexture } from 'three'
import type { GradientStop } from '../types'
import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'

export type LinearGradientTextureProps = Props<CanvasTexture> & {
  /**
   * x-axis coordinate of the gradient's start point
   */
  startX?: number
  /**
   * y-axis coordinate of the gradient's start point
   */
  startY?: number
  /**
   * x-axis coordinate of the gradient's end point
   */
  endX?: number
  /**
   * y-axis coordinate of the gradient's end point
   */
  endY?: number
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

export default class LinearGradientTexture extends SvelteComponent<LinearGradientTextureProps> {}
