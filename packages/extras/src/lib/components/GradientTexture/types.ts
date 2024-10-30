import type { ColorRepresentation } from 'three'

export type GradientStop = {
  color: ColorRepresentation
  offset: number
}

export type RadialGradientOuterRadius = number | 'auto'
