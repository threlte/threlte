import type { ColorStop } from './types.js'

/**
 * adds each `stop` of `stops` to the gradient
 */
export const addStops = (gradient: CanvasGradient, stops: ColorStop[] = []): CanvasGradient => {
  for (const { color, offset } of stops) {
    gradient.addColorStop(offset, color)
  }
  return gradient
}
