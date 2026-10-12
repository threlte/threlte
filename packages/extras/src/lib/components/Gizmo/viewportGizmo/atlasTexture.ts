import {
  CanvasTexture,
  Color,
  RepeatWrapping,
  SRGBColorSpace,
  type ColorRepresentation,
  type Texture
} from 'three'
import { axisKeys } from './constants.js'
import type { ResolvedBorder, ResolvedOptions } from './options.js'

type AtlasCell = {
  radius: number
  label?: string
  color: ColorRepresentation
  labelColor?: ColorRepresentation
  border?: ResolvedBorder
  hover: {
    color?: ColorRepresentation
    labelColor?: ColorRepresentation
    border?: ResolvedBorder
  }
}

export type AtlasUserData = {
  offsetX: number
  offsetY: number
  cellHeight: number
}

/**
 * Draws every indicator state into a single canvas: one row per indicator, the
 * resting state in the left column and the hovered state in the right. Sprites
 * then pick their state by shifting the texture offset rather than swapping
 * materials.
 */
export const atlasTexture = (options: ResolvedOptions, padding = 2): Texture => {
  const color = new Color()
  const gutter = padding * 2
  const { isSphere, resolution, radius, font, corners, edges } = options

  const cells: AtlasCell[] = axisKeys.map((key) => ({ ...options[key], radius }))

  if (isSphere && corners.enabled) {
    cells.push(corners)
  }

  if (isSphere && edges.enabled) {
    cells.push(edges)
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  canvas.width = resolution * 2 + gutter * 2
  canvas.height = resolution * cells.length + gutter * cells.length

  const [labelFont, baselineOffset] = resolveLabelFont()

  cells.forEach((cell, index) => {
    const { label, color: fill, labelColor, border, hover } = cell
    const y = resolution * index + index * gutter + padding

    drawCell(padding, y, resolution, cell.radius, label, border, fill, labelColor)
    drawCell(
      resolution + padding * 3,
      y,
      resolution,
      cell.radius,
      label,
      hover.border ?? border,
      hover.color ?? fill,
      hover.labelColor ?? labelColor
    )
  })

  const offsetX = padding / (resolution * 2)
  const offsetY = padding / (resolution * 6)
  const cellHeight = 1 / cells.length

  const texture = new CanvasTexture(canvas)
  texture.repeat.set(0.5 - 2 * offsetX, cellHeight - 2 * offsetY)
  texture.offset.set(offsetX, 1 - offsetY)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.userData = { offsetX, offsetY, cellHeight } satisfies AtlasUserData

  return texture

  function drawCell(
    x: number,
    y: number,
    size: number,
    cellRadius: number,
    label: string | undefined,
    border: ResolvedBorder | undefined,
    fill: ColorRepresentation | undefined,
    labelColor: ColorRepresentation | undefined
  ) {
    let cornerRadius = cellRadius * (size / 2)

    if (fill !== undefined && fill !== '') {
      tracePath(x, y, size, cornerRadius)
      context.fillStyle = color.set(fill).getStyle()
      context.fill()
    }

    if (border?.size) {
      const inset = (border.size * size) / 2

      x += inset
      y += inset
      size -= border.size * size
      cornerRadius = Math.max(0, cornerRadius - inset)

      tracePath(x, y, size, cornerRadius)
      context.strokeStyle = color.set(border.color).getStyle()
      context.lineWidth = border.size * size
      context.stroke()
    }

    if (label) {
      context.font = labelFont
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = color.set(labelColor ?? 0).getStyle()
      context.fillText(
        label,
        x + size / 2,
        y + (size + padding) / 2 + (isSphere ? baselineOffset : 0)
      )
    }
  }

  function tracePath(x: number, y: number, size: number, cornerRadius: number) {
    context.beginPath()
    context.moveTo(x + cornerRadius, y)
    context.lineTo(x + size - cornerRadius, y)
    context.arcTo(x + size, y, x + size, y + cornerRadius, cornerRadius)
    context.lineTo(x + size, y + size - cornerRadius)
    context.arcTo(x + size, y + size, x + size - cornerRadius, y + size, cornerRadius)
    context.lineTo(x + cornerRadius, y + size)
    context.arcTo(x, y + size, x, y + size - cornerRadius, cornerRadius)
    context.lineTo(x, y + cornerRadius)
    context.arcTo(x, y, x + cornerRadius, y, cornerRadius)
    context.closePath()
  }

  /**
   * Shrinks the font until the longest label fits the cell, then returns the
   * baseline nudge that keeps sphere labels optically centered.
   */
  function resolveLabelFont(): [string, number] {
    const longestLabel = [...cells].sort(
      (a, b) => (a.label?.length ?? 0) - (b.label?.length ?? 0)
    ).pop()?.label
    const { family, weight } = font
    const available = isSphere ? Math.sqrt(Math.pow(resolution * 0.7, 2) / 2) : resolution

    let size = available
    let width = 0
    let descent = 0

    do {
      context.font = `${weight} ${size}px ${family}`
      const metrics = context.measureText(longestLabel ?? '')
      width = metrics.width
      descent = metrics.fontBoundingBoxDescent
      size -= 1
    } while (width > available && size > 0)

    const descentRatio = available / descent
    const fitted = Math.floor(size * Math.min(available / width, descentRatio))

    return [`${weight} ${fitted}px ${family}`, descentRatio]
  }
}

/** Shifts an atlas-backed texture between its resting and hovered column. */
export const setAtlasHover = (texture: Texture, hovered: boolean) => {
  texture.offset.x = (hovered ? 0.5 : 0) + (texture.userData as AtlasUserData).offsetX
}

/** Points an atlas-backed texture at the row belonging to `index`. */
export const setAtlasRow = (texture: Texture, index: number) => {
  const { offsetY, cellHeight } = texture.userData as AtlasUserData
  texture.offset.y = 1 - (index + 1) * cellHeight + offsetY
}
