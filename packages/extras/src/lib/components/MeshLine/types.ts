import type { OmitProps, Props } from '@threlte/core'
import type { BufferGeometry, Vector3 } from 'three'
import type { ShaderMaterial, ColorRepresentation, Texture } from 'three'

export interface MeshLineGeometryProps extends Props<BufferGeometry> {
  /**
   * The points the line passes through, in order.
   * @default []
   */
  points?: Vector3[]

  /**
   * How the line's width varies along its length. `'taper'` thins both ends,
   * and `'custom'` uses `shapeFunction`.
   * @default 'none'
   */
  shape?: 'none' | 'taper' | 'custom'

  /**
   * Returns the width multiplier at a point along the line, from `0` (start)
   * to `1` (end). Only used when `shape` is `'custom'`.
   * @default () => 1
   */
  shapeFunction?: (p: number) => number
}

export interface MeshLineMaterialOptions {
  /**
   * The opacity of the line. Values below `1` need `transparent` set.
   * @default 1
   */
  opacity?: number

  /**
   * The color of the line.
   * @default '#ffffff'
   */
  color?: ColorRepresentation

  /**
   * Shifts the dash pattern along the line. Animate it to move the dashes.
   * @default 0
   */
  dashOffset?: number

  /**
   * The length of one dash and its gap, as a fraction of the line's length.
   * `0` draws a solid line.
   * @default 0
   */
  dashArray?: number

  /**
   * The share of each dash cycle that is a gap, from `0` (no gap) to `1` (no
   * dash).
   * @default 0
   */
  dashRatio?: number

  /**
   * Makes the line thinner with distance from the camera. When `false`,
   * `width` is a constant size on screen.
   * @default true
   */
  attenuate?: boolean

  /**
   * The width of the line. In world units when `attenuate` is `true`,
   * otherwise in screen pixels.
   * @default 1
   */
  width?: number

  /**
   * Thins the line where consecutive points are close together on screen,
   * which hides artifacts at sharp turns. `0` disables it.
   * @default 0
   */
  scaleDown?: number

  /**
   * A texture whose red channel sets the line's alpha along its length.
   */
  alphaMap?: Texture | undefined
}

export interface MeshLineMaterialProps
  extends
    OmitProps<Props<ShaderMaterial>, 'uniforms' | 'fragmentShader' | 'vertexShader'>,
    MeshLineMaterialOptions {}
