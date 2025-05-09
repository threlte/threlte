import type { GradientStop } from './types'
import { Color } from 'three'

/**
 * applies `gradient` to `context`
 */
export const applyGradient = (
  context: OffscreenCanvasRenderingContext2D,
  gradient: CanvasGradient
) => {
  context.save()
  const lastFillStyle = context.fillStyle
  context.fillStyle = gradient
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  context.fillStyle = lastFillStyle
  context.restore()
}

const color = new Color()

/**
 * adds each `stop` of `stops` to the gradient
 */
export const addStops = (gradient: CanvasGradient, stops: GradientStop[] = []): CanvasGradient => {
  for (const stop of stops) {
    gradient.addColorStop(stop.offset, color.set(stop.color).getStyle())
  }
  return gradient
}
