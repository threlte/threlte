import type { CanvasTexture } from 'three'
import type { GradientStop, RadialGradientOuterRadius } from '../types'
import type { Props } from '@threlte/core'
import { Component } from 'svelte'

export type RadialGradientTextureProps = Props<CanvasTexture> & {
  /**
   * inner radius of the gradient
   */
  innerRadius?: number
  /**
   * outer radius of the gradient
   */
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

declare const RadialGradientTexture: Component<RadialGradientTextureProps>
