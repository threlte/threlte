import type { ColorStop } from './types.js'

/**
 * applies `gradient` to `context`
 */
export const fillGradient = (
  context: OffscreenCanvasRenderingContext2D,
  gradient: CanvasGradient
) => {
  context.fillStyle = gradient
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

/**
 * adds each `stop` of `stops` to the gradient
 */
export const addStops = (gradient: CanvasGradient, stops: ColorStop[] = []): CanvasGradient => {
  for (const { color, offset } of stops) {
    gradient.addColorStop(offset, color)
  }
  return gradient
}
