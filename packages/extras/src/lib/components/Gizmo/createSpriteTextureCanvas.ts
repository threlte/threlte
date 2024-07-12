import { Color, type ColorRepresentation } from 'three'

const color = new Color()

const size = 64 * window.devicePixelRatio
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')!
canvas.width = size
canvas.height = size

export const createTextureUrl = (
  colorRepresentation: ColorRepresentation,
  label = '',
  font = 'system-ui'
) => {
  color.set(colorRepresentation)

  context.clearRect(0, 0, size, size)
  context.beginPath()
  context.arc(size / 2, size / 2, size / 4, 0, 2 * Math.PI)
  context.closePath()
  context.fillStyle = color.convertSRGBToLinear().getStyle()
  context.fill()

  if (label) {
    const textSize = Math.abs(size * (24 / 64))
    context.font = `${textSize}px ${font}`
    context.textAlign = 'center'
    context.fillStyle = '#000000'
    const textY = size * (41 / 64)
    context.fillText(label, size / 2, textY)
  }

  return canvas.toDataURL('image/png')
}
