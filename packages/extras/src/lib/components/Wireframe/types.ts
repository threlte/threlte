import { type ColorRepresentation } from 'three'

export interface WireframeProps {
  simplify?: boolean
  fillOpacity?: number
  fillMix?: number
  strokeOpacity?: number
  thickness?: number
  colorBackfaces?: boolean
  dashInvert?: boolean
  dash?: boolean
  dashRepeats?: number
  dashLength?: number
  squeeze?: boolean
  squeezeMin?: number
  squeezeMax?: number
  stroke?: ColorRepresentation
  backfaceStroke?: ColorRepresentation
  fill?: ColorRepresentation
}
