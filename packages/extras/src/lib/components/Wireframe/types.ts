import { type ColorRepresentation } from 'three'

export interface WireframeProps {
  /**
   * Hides the diagonal edge shared by each pair of triangles, so quads are
   * drawn as quads.
   * @default false
   */
  simplify?: boolean

  /**
   * The opacity of the faces between the lines, mixed in by `fillMix`.
   * @default 0
   */
  fillOpacity?: number

  /**
   * How much the faces take on `fill` and `fillOpacity` instead of the
   * material's own color and opacity, from `0` to `1`.
   * @default 0
   */
  fillMix?: number

  /**
   * The opacity of the lines.
   * @default 1
   */
  strokeOpacity?: number

  /**
   * The thickness of the lines, in approximate screen pixels.
   * @default 1
   */
  thickness?: number

  /**
   * Draws the lines of back faces in `backfaceStroke`.
   * @default false
   */
  colorBackfaces?: boolean

  /**
   * Centers the dashes on the corners of each triangle instead of on the
   * middle of each edge.
   * @default true
   */
  dashInvert?: boolean

  /**
   * Draws the lines as dashes.
   * @default false
   */
  dash?: boolean

  /**
   * The number of dashes along each edge.
   * @default 4
   */
  dashRepeats?: number

  /**
   * The length of each dash, as a fraction of the space it repeats over,
   * from `0` to `1`.
   * @default 0.5
   */
  dashLength?: number

  /**
   * Thins each line toward the middle of its edge.
   * @default false
   */
  squeeze?: boolean

  /**
   * The thickness multiplier at the middle of each edge when `squeeze` is
   * enabled.
   * @default 0.2
   */
  squeezeMin?: number

  /**
   * The thickness multiplier at the ends of each edge when `squeeze` is
   * enabled.
   * @default 1
   */
  squeezeMax?: number

  /**
   * The color of the lines.
   * @default '#ff0000'
   */
  stroke?: ColorRepresentation

  /**
   * The color of the lines on back faces, when `colorBackfaces` is enabled.
   * @default '#0000ff'
   */
  backfaceStroke?: ColorRepresentation

  /**
   * The color of the faces between the lines, mixed in by `fillMix`.
   * @default '#00ff00'
   */
  fill?: ColorRepresentation
}
