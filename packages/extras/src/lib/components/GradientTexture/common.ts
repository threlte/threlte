import type { GradientStop } from './types'
import { Color } from 'three'

export const applyGradient = (
  context: OffscreenCanvasRenderingContext2D,
  gradient: CanvasGradient
) => {
  context.save()
  let lastFillStyle = context.fillStyle
  context.fillStyle = gradient
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  context.fillStyle = lastFillStyle
  context.restore()
}

const color = new Color()

export const applyStops = (
  gradient: CanvasGradient,
  stops: GradientStop[] = []
): CanvasGradient => {
  for (const stop of stops) {
    gradient.addColorStop(stop.offset, color.set(stop.color).getStyle())
  }
  return gradient
}
